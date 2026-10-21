import { headers } from "next/headers";
import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
  TURNSTILE_FIELD,
} from "@/lib/form-fields";
import {
  SCORE_BLOCK_THRESHOLD,
  scoreContent,
  type GuardSubject,
} from "@/lib/spam-signals";

/**
 * Layered bot filtering for the lead form.
 *
 * Next.js already blocks the easy attack: Server Action requests have their
 * `Origin` compared against the `Host` and action IDs are encrypted per build,
 * so a script cannot POST to this action from off-site. What gets through is a
 * bot driving the real form — a headless browser, or a scripted fetch replaying
 * a scraped action id — which is what everything here is aimed at.
 *
 * The layers, cheapest and most certain first:
 *   1. honeypot      — a field no human can see or tab into
 *   2. time-to-fill  — nobody fills even three fields in under 2.5s
 *   3. content score — `lib/spam-signals`, tested by scripts/test-spam-signals.mjs
 *   4. rate limit    — per-IP, plus a site-wide circuit breaker
 *   5. Turnstile     — Cloudflare's invisible challenge, once keys are set
 *
 * Design rule throughout: a dropped real lead costs far more than a delivered
 * spam one. Anything that could plausibly fire on a genuine customer fails
 * open, loudly, in the logs.
 */

/** Minimum plausible time for a human to fill even the 3-field compact form. */
const MIN_FILL_MS = 2_500;

/** Rate limit: submissions allowed from one IP inside RATE_WINDOW_MS. */
const RATE_PER_IP = 5;

/** Circuit breaker: total submissions from all IPs inside RATE_WINDOW_MS. */
const RATE_GLOBAL = 60;

const RATE_WINDOW_MS = 10 * 60_000;

/** Hard cap on tracked IPs, so a distributed flood cannot grow the map. */
const RATE_MAX_TRACKED_IPS = 5_000;

const PHONE = "(951) 541-0034";

export type GuardVerdict =
  /** Forward to GHL. */
  | { action: "allow" }
  /**
   * Treat as spam: tell the browser the submission succeeded, but never
   * forward it and never count it as a conversion. The silent success matters
   * — a bot shown an error learns which field betrayed it and retries.
   */
  | { action: "drop"; reason: string }
  /**
   * Show the visitor a real error. Used only where a genuine human can
   * legitimately trip the check (a failed challenge, a rate limit), so they
   * get a next step instead of believing a lead was sent that never was.
   */
  | { action: "reject"; reason: string; message: string };

/** The guard-only fields a form adds alongside the real lead data. */
export type GuardFields = {
  [HONEYPOT_FIELD]?: string;
  [RENDERED_AT_FIELD]?: string;
  [TURNSTILE_FIELD]?: string;
};

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

type RateStore = { perIp: Map<string, number[]>; global: number[] };

/**
 * Held on globalThis so it survives module re-evaluation and dev HMR.
 *
 * This is per-instance memory, not shared state: on Vercel a flood spread
 * across cold starts will not all land in one counter. It still stops the
 * common case — one IP hammering a warm instance — at zero cost and with no
 * extra service to run. Move to Upstash/Redis only if the logs show floods
 * slipping past it.
 */
const rateStore: RateStore = ((globalThis as Record<string, unknown>)
  .__grLeadRateStore ??= { perIp: new Map(), global: [] }) as RateStore;

function withinWindow(timestamps: number[], now: number): number[] {
  const cutoff = now - RATE_WINDOW_MS;
  return timestamps.filter((at) => at > cutoff);
}

type RateResult = { limited: boolean; scope: "ip" | "global" | null };

function checkRateLimit(ip: string, now: number): RateResult {
  rateStore.global = withinWindow(rateStore.global, now);

  // Prune IPs whose window has fully expired, so idle keys do not accumulate.
  for (const [key, hits] of rateStore.perIp) {
    const live = withinWindow(hits, now);
    if (live.length === 0) rateStore.perIp.delete(key);
    else rateStore.perIp.set(key, live);
  }

  if (rateStore.global.length >= RATE_GLOBAL) {
    return { limited: true, scope: "global" };
  }

  const hits = rateStore.perIp.get(ip) ?? [];
  if (hits.length >= RATE_PER_IP) return { limited: true, scope: "ip" };

  // Record the attempt. Skipped once the map is at capacity so an IP-rotating
  // flood cannot grow it without bound; the global counter still catches that.
  if (rateStore.perIp.has(ip) || rateStore.perIp.size < RATE_MAX_TRACKED_IPS) {
    rateStore.perIp.set(ip, [...hits, now]);
  }
  rateStore.global.push(now);

  return { limited: false, scope: null };
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile
// ---------------------------------------------------------------------------

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileOutcome = { ok: boolean; reason?: string };

async function verifyTurnstile(token: string): Promise<TurnstileOutcome> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Not configured yet: skip the layer entirely. Layers 1-4 still run, so the
  // form is defended from the moment this ships.
  if (!secret) return { ok: true };
  if (!token) return { ok: false, reason: "turnstile-missing-token" };

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      // `remoteip` is deliberately not sent: behind Vercel's proxy a wrong
      // guess at the client IP would fail otherwise-valid challenges.
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) {
      // Cloudflare itself is unhealthy. Fail open — losing real leads to a
      // third-party outage is worse than passing a few spam ones.
      console.error("[spam-guard] turnstile siteverify HTTP", res.status);
      return { ok: true };
    }

    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success) return { ok: true };

    const codes = data["error-codes"] ?? [];
    // Our own misconfiguration, not the visitor's fault. Fail open and shout.
    if (
      codes.some(
        (code) =>
          code === "invalid-input-secret" || code === "missing-input-secret",
      )
    ) {
      console.error("[spam-guard] turnstile secret rejected", codes);
      return { ok: true };
    }
    return {
      ok: false,
      reason: `turnstile-failed:${codes.join(",") || "unknown"}`,
    };
  } catch (err) {
    console.error("[spam-guard] turnstile verify unreachable", err);
    return { ok: true };
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function clientIp(): Promise<string> {
  const incoming = await headers();
  // Vercel sets both; the first hop in x-forwarded-for is the real client.
  const forwarded = incoming.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return incoming.get("x-real-ip") ?? "unknown";
}

export async function screenSubmission(
  subject: GuardSubject,
  guard: GuardFields,
  context: { formId: string },
): Promise<GuardVerdict> {
  const now = Date.now();

  // One structured line per decision worth knowing about. This is the audit
  // trail: if a real customer ever reports a submission that vanished, the
  // reason is here. Only signal names are logged, never lead content.
  const log = (verdict: string, reason: string) => {
    console.warn(
      `[spam-guard] ${verdict} form=${context.formId} reason=${reason}`,
    );
  };

  // 1. Honeypot. A human can neither see nor tab to this field.
  if ((guard[HONEYPOT_FIELD] ?? "").trim()) {
    log("drop", "honeypot");
    return { action: "drop", reason: "honeypot" };
  }

  // 2. Time-to-fill. A missing or unparseable stamp is ignored rather than
  //    punished — it may just be a browser that blocked our script.
  const renderedAt = Number(guard[RENDERED_AT_FIELD]);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = now - renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      log("drop", `too-fast:${elapsed}ms`);
      return { action: "drop", reason: "too-fast" };
    }
  }

  // 3. Content heuristics.
  const { score, signals } = scoreContent(subject);
  if (score >= SCORE_BLOCK_THRESHOLD) {
    log("drop", `content:${score}:${signals.join("+")}`);
    return { action: "drop", reason: `content:${signals.join("+")}` };
  }
  if (signals.length > 0) {
    // Below threshold, so it was delivered — recorded so the thresholds can be
    // tuned against what actually arrives rather than against guesses.
    log("allow", `content-below-threshold:${score}:${signals.join("+")}`);
  }

  // 4. Rate limit.
  const rate = checkRateLimit(await clientIp(), now);
  if (rate.limited) {
    if (rate.scope === "global") {
      // A site-wide flood. Drop silently — an error would only tell the
      // flooder it had found the ceiling.
      log("drop", "rate-limit-global");
      return { action: "drop", reason: "rate-limit-global" };
    }
    log("reject", "rate-limit-ip");
    return {
      action: "reject",
      reason: "rate-limit-ip",
      message: `We have already received several requests from your connection. Please call ${PHONE} so we can help you right away.`,
    };
  }

  // 5. Turnstile, if configured.
  const turnstile = await verifyTurnstile((guard[TURNSTILE_FIELD] ?? "").trim());
  if (!turnstile.ok) {
    log("reject", turnstile.reason ?? "turnstile-failed");
    return {
      action: "reject",
      reason: turnstile.reason ?? "turnstile-failed",
      message: `We could not verify your browser. Please try again, or call ${PHONE} and we will take your details over the phone.`,
    };
  }

  return { action: "allow" };
}
