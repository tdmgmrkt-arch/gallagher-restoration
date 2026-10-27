"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { submitLead } from "@/app/actions";
import { trackLeadConversion } from "@/components/layout/GoogleTracking";
import { TURNSTILE_ENABLED, TurnstileWidget } from "@/components/ui/Turnstile";
import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
  TURNSTILE_FIELD,
} from "@/lib/form-fields";
import { INSURANCE_OPTIONS, SERVICE_OPTIONS, SMS, TIMING_OPTIONS } from "@/lib/site";

const INPUT =
  "rounded-[2px] border border-[rgba(255,255,255,0.13)] bg-[#0E100E] px-[15px] py-[14px] font-sans text-[15px] text-[#F4F5F1] outline-none transition-colors duration-300 placeholder:text-[#5E635B] focus:border-[#8ECE34]";
const INPUT_LG =
  "rounded-[2px] border border-[rgba(255,255,255,0.13)] bg-[#0E100E] px-[16px] py-[18px] font-sans text-[16px] text-[#F4F5F1] outline-none transition-colors duration-300 placeholder:text-[#5E635B] focus:border-[#8ECE34]";
const LABEL =
  "font-mono text-[10px] uppercase tracking-[0.13em] text-[#7E837A]";

type LeadFormProps = {
  variant?: "compact" | "full";
  /**
   * Lead source sent to GHL so a campaign landing page's leads can be routed
   * and measured separately from site-wide form fills. Leave unset on the
   * standard site forms — `submitLead` falls back to the default source.
   */
  formId?: string;
};

const CALLBACK_STEPS = [
  { n: "01", text: "We call you back within 60 seconds." },
  { n: "02", text: "Certified tech dispatched to your property." },
  { n: "03", text: "Free damage assessment — we handle insurance." },
];

/**
 * The honeypot.
 *
 * Positioned off-screen rather than `display:none` — the better form-filling
 * bots skip hidden fields, but they do fill one that is in the layout and
 * named `website`. `aria-hidden` keeps it away from screen readers and
 * `tabIndex={-1}` out of the tab order, so no human ever reaches it; anything
 * typed in it is a bot, and `lib/spam-guard` drops the submission.
 */
function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label htmlFor={HONEYPOT_FIELD}>Website</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

/**
 * SMS opt-in.
 *
 * Unchecked by default and never required: carrier A2P 10DLC rules and the
 * TCPA both forbid making messaging consent a condition of service, so a
 * visitor who leaves it alone still gets their crew dispatched. The exact
 * sentence shown here is mirrored as plain text in `SMS.consentText` and sent
 * to GHL with the lead, so the CRM record proves what was agreed to.
 */
function SmsConsentField() {
  return (
    <label className="mt-6 flex cursor-pointer items-start gap-3">
      <input
        name="smsConsent"
        type="checkbox"
        value="yes"
        className="mt-[3px] h-[16px] w-[16px] shrink-0 cursor-pointer accent-[#8ECE34]"
      />
      <span className="text-[12px] leading-[1.65] text-[#8F948A] text-pretty">
        By checking this box, you agree to receive text messages from Gallagher Restoration
        Co. about your project, including scheduling, technician arrivals, and status
        updates, at the number provided. Consent is not a condition of purchase. Message and
        data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for
        help. See our{" "}
        <Link
          href={SMS.termsPath}
          className="text-[#C6CABF] underline underline-offset-2 transition-colors hover:text-[#8ECE34]"
        >
          SMS Terms
        </Link>{" "}
        and{" "}
        <Link
          href={SMS.privacyPath}
          className="text-[#C6CABF] underline underline-offset-2 transition-colors hover:text-[#8ECE34]"
        >
          SMS Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}

export function LeadForm({ variant = "compact", formId }: LeadFormProps) {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState("");
  /** Bumped after a failed submit to swap the spent Turnstile token. */
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  /**
   * When this form became fillable, used server-side to measure time-to-fill.
   *
   * A ref initialised on first render, not state: the value must never change
   * across re-renders, and reading the clock during render is fine here because
   * the form is client-only and the stamp is deliberately per-visitor.
   */
  const renderedAtRef = useRef<number | null>(null);
  renderedAtRef.current ??= Date.now();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      damageType: String(fd.get("damageType") || SERVICE_OPTIONS[0]),
      address: String(fd.get("address") || ""),
      description: String(fd.get("description") || ""),
      timing: String(fd.get("timing") || ""),
      insurance: String(fd.get("insurance") || ""),
      smsConsent: fd.get("smsConsent") === "yes" ? "yes" : "no",
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) || ""),
      [RENDERED_AT_FIELD]: String(renderedAtRef.current ?? ""),
      [TURNSTILE_FIELD]: turnstileToken,
      ...(formId ? { form: formId } : {}),
    };
    setError(null);
    startTransition(async () => {
      const res = await submitLead(payload);
      if (res.ok) {
        // Only here — the server confirmed the lead was accepted. Not on click,
        // not on submit, not on a rejected or failed submission. `track: false`
        // means the guard filtered it as spam: show the visitor the same
        // confirmation, but keep it out of the Google Ads conversion count.
        if (res.track !== false) trackLeadConversion(res.submissionId);
        setSent(true);
      } else {
        setError(res.error);
        // Turnstile tokens are single-use, so the one just spent cannot be
        // replayed on the retry this error invites.
        if (TURNSTILE_ENABLED) setTurnstileResetKey((key) => key + 1);
      }
    });
  }

  if (sent) {
    return (
      <div className="flex min-h-[340px] flex-col items-start justify-center gap-4">
        <span className="block h-[14px] w-[14px] bg-[#8ECE34]" aria-hidden="true" />
        <h3 className="text-[clamp(22px,2.2vw,30px)] font-bold tracking-[-0.03em]">
          Request received.
        </h3>
        <p className="max-w-[38ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
          A member of our team will contact you shortly. For an active emergency, please call{" "}
          <a href="tel:9515410034" className="text-[#8ECE34] transition-colors hover:text-[#A6E053]">
            (951) 541-0034
          </a>{" "}
          so we can dispatch a crew now.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={onSubmit} noValidate className="relative">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
          Request A Callback
        </div>
        <h3 className="mt-4 text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.03em]">
          Get help in 60 seconds
        </h3>

        <label className="mt-7 flex flex-col gap-[9px]">
          <span className={LABEL}>Name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
            className={INPUT_LG}
          />
        </label>

        <label className="mt-4 flex flex-col gap-[9px]">
          <span className={LABEL}>Phone</span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="(000) 000-0000"
            autoComplete="tel"
            className={INPUT_LG}
          />
        </label>

        {/*
          Email is collected here, not just on the full variant. `submitLead`
          requires it, so without this field every compact submission failed —
          and the confirmation auto-responder has no address to send to. Three
          fields is still inside the "60 seconds" promise above.
        */}
        <label className="mt-4 flex flex-col gap-[9px]">
          <span className={LABEL}>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            className={INPUT_LG}
          />
        </label>

        <HoneypotField />
        <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileResetKey} />

        <SmsConsentField />

        <button
          type="submit"
          disabled={pending}
          className="mt-6 flex w-full items-center justify-center gap-[10px] rounded-[2px] border-0 bg-[#8ECE34] p-[20px] font-sans text-[17px] font-bold text-[#0B0C0B] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending…" : "Call Me Back"}
        </button>

        {error ? (
          <p className="mt-4 text-[13px] leading-[1.6] text-[#E5A2A2]">{error}</p>
        ) : null}

        <div className="mt-8 border-t border-[rgba(255,255,255,0.09)] pt-7">
          <div className={LABEL}>What happens next</div>
          <ol className="mt-4 flex flex-col gap-3">
            {CALLBACK_STEPS.map((s) => (
              <li key={s.n} className="flex items-start gap-3">
                <span className="mt-[2px] font-mono text-[11px] font-bold tracking-[0.12em] text-[#8ECE34]">
                  {s.n}
                </span>
                <span className="text-[14px] leading-[1.55] text-[#C2C6BC]">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[rgba(255,255,255,0.07)] pt-5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#7E837A]">
          <span className="text-[#C6CABF]">IICRC</span>
          <span className="text-[#3F4340]">/</span>
          <span className="text-[#C6CABF]">ANSI Certified</span>
          <span className="text-[#3F4340]">/</span>
          <span className="text-[#C6CABF]">CSLB #1061640</span>
        </div>

        <a
          href="tel:9515410034"
          className="mt-5 flex items-center justify-between gap-3 rounded-[2px] border border-[rgba(142,206,52,0.35)] bg-[rgba(142,206,52,0.08)] px-4 py-4 transition-colors hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.14)]"
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.13em] text-[#8ECE34]">
              Active Emergency?
            </span>
            <span className="mt-1 block text-[15px] font-bold text-[#F4F5F1]">
              Call (951) 541-0034
            </span>
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-[13px] font-bold text-[#8ECE34]"
          >
            &rarr;
          </span>
        </a>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
        Request Service
      </div>
      <h3 className="mt-4 text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.03em]">
        Tell us what happened
      </h3>

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <label className="flex flex-col gap-[9px]">
          <span className={LABEL}>Name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
            className={INPUT}
          />
        </label>
        <label className="flex flex-col gap-[9px]">
          <span className={LABEL}>Phone</span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="(000) 000-0000"
            autoComplete="tel"
            className={INPUT}
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-[9px]">
        <span className={LABEL}>Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className={INPUT}
        />
      </label>

      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <label className="flex flex-col gap-[9px]">
          <span className={LABEL}>Type of Damage</span>
          <select name="damageType" className={`${INPUT} appearance-none`} defaultValue={SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-[9px]">
          <span className={LABEL}>When did it happen?</span>
          <select name="timing" className={`${INPUT} appearance-none`} defaultValue="">
            <option value="">Select (optional)</option>
            {TIMING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-[9px]">
        <span className={LABEL}>Property Address</span>
        <input
          name="address"
          type="text"
          placeholder="City or full address"
          autoComplete="street-address"
          className={INPUT}
        />
      </label>

      <label className="mt-4 flex flex-col gap-[9px]">
        <span className={LABEL}>Insurance Status</span>
        <select name="insurance" className={`${INPUT} appearance-none`} defaultValue="">
          <option value="">Select (optional)</option>
          {INSURANCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 flex flex-col gap-[9px]">
        <span className={LABEL}>Describe the damage</span>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="What happened, what's affected, anything urgent we should know…"
          className={`${INPUT} resize-y min-h-[110px]`}
        />
      </label>

      <HoneypotField />
      <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileResetKey} />

      <SmsConsentField />

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-[10px] rounded-[2px] border-0 bg-[#8ECE34] p-[18px] font-sans text-[16px] font-bold text-[#0B0C0B] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Request Service"}
      </button>

      {error ? (
        <p className="mt-4 text-[13px] leading-[1.6] text-[#E5A2A2]">{error}</p>
      ) : null}

      <p className="mt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.14em] text-[#5E635B]">
        Active emergency? Call (951) 541-0034 for fastest response.
      </p>
    </form>
  );
}
