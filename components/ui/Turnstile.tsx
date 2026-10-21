"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile — the invisible challenge layer for the lead form.
 *
 * Chosen over reCAPTCHA: free at any volume (reCAPTCHA Enterprise bills past
 * 10k assessments/month), no visible puzzle for the overwhelming majority of
 * visitors, and no Google-cookie disclosure to add to the privacy policy.
 *
 * Entirely env-gated. With no NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time the
 * constant below is undefined, this component renders null, and Next drops the
 * Cloudflare script from the bundle — so the form keeps working untouched until
 * the keys are actually added. The free guard layers do not depend on it.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** True when both the widget and the server-side check are live. */
export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

/** Global the Cloudflare script calls once its API object is ready. */
const READY_CALLBACK = "__grTurnstileReady";

const SCRIPT_SRC =
  `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${READY_CALLBACK}`;

type RenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  action?: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
};

type TurnstileApi = {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    [READY_CALLBACK]?: () => void;
  }
}

/**
 * Load the script once per page, no matter how many forms mount.
 *
 * Several pages render two LeadForms (the Newport landing page has a hero and a
 * footer form), and a second <script> tag for the same src would re-initialise
 * the API underneath an already-rendered widget.
 */
let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Resolve from Cloudflare's own onload hook rather than the script tag's:
    // with render=explicit the tag fires before window.turnstile is assigned.
    window[READY_CALLBACK] = () => resolve();

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      // Cleared so a later mount can retry — a blocked request on one
      // navigation should not disable the widget for the whole session.
      scriptPromise = null;
      reject(new Error("turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

type TurnstileWidgetProps = {
  /** Called with a fresh token, or "" whenever the current one stops counting. */
  onToken: (token: string) => void;
  /**
   * Bump to discard the solved challenge and request a new one. Turnstile
   * tokens are single-use, so without this a second submit after a failed one
   * would replay a spent token and be rejected.
   */
  resetKey: number;
};

export function TurnstileWidget({ onToken, resetKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Held in a ref so a new onToken identity each render cannot re-run the
  // mount effect and tear down a challenge the visitor has already solved.
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) return;

    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          size: "flexible",
          action: "lead-form",
          callback: (token) => onTokenRef.current(token),
          // Both clear the token rather than keeping a stale one, so the
          // server sees "no token" and the visitor gets a retryable error
          // instead of a submission that silently never arrives.
          "error-callback": () => onTokenRef.current(""),
          "expired-callback": () => onTokenRef.current(""),
        });
      })
      .catch((err) => {
        console.error("[turnstile]", err);
      });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      widgetIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Skip the initial render — there is nothing to reset yet.
    if (resetKey === 0) return;
    const widgetId = widgetIdRef.current;
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
      onTokenRef.current("");
    }
  }, [resetKey]);

  if (!SITE_KEY) return null;

  return <div ref={containerRef} className="mt-4 min-h-[65px]" />;
}
