"use client";

import Script from "next/script";
import { useEffect } from "react";
import { PHONE, TRACKING } from "@/lib/site";

type ForwardingNumber = { formattedNumber: string; mobileNumber: string };
type Gtag = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Gtag;
    __grForwardingNumber?: ForwardingNumber;
  }
}

const FORWARDING_EVENT = "gr:forwarding-number";

/** "tel:9515410034" -> "9515410034". The one place the number is read from. */
const PHONE_DIGITS = PHONE.href.replace(/\D/g, "");

/**
 * Matches the business number in rendered text across every format the site
 * uses — "(951) 541-0034" (PHONE.display) and "951-541-0034" (PHONE.digits in
 * Process.tsx) — plus an optional country code. Built from PHONE so a number
 * change can't silently desync call tracking from the rest of the site.
 */
const PHONE_TEXT_PATTERN = new RegExp(
  `(?:\\+?1[\\s.-]?)?\\(?${PHONE_DIGITS.slice(0, 3)}\\)?[\\s.-]?` +
    `${PHONE_DIGITS.slice(3, 6)}[\\s.-]?${PHONE_DIGITS.slice(6)}`,
  "g",
);

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  return window.gtag;
}

/**
 * Fire the Google Ads lead conversion. Call ONLY after submitLead reports
 * success — never on button click, form onSubmit, or a rejected submission.
 *
 * `submissionId` must be the server-generated id returned by submitLead. It is
 * the transaction id Google uses to deduplicate repeat reports of the same
 * lead, so it has to be stable across retries — which a client-generated UUID
 * is not. Never pass a name, email, phone or address as the id.
 */
export function trackLeadConversion(submissionId: string): void {
  if (typeof window === "undefined" || !submissionId) return;
  const gtag = ensureGtag();
  gtag("event", "conversion", {
    send_to: TRACKING.adsLeadConversion,
    transaction_id: submissionId,
  });
  // GA4 equivalent, so lead volume is visible in Analytics reporting too.
  gtag("event", "generate_lead", {
    send_to: TRACKING.ga4,
    transaction_id: submissionId,
  });
}

/** Mount ONCE, in the root layout. */
export default function GoogleTracking() {
  useEffect(() => {
    let frame: number | null = null;
    let stopped = false;

    // Google only supplies a forwarding number for ad clicks, so for ordinary
    // traffic this stays undefined and the whole routine is a cheap no-op.
    const applyForwardingNumber = () => {
      const number = window.__grForwardingNumber;
      if (!number || !document.body) return;

      // Clickable destinations, including the "Call Now" buttons.
      document
        .querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')
        .forEach((a) => {
          const digits = (a.getAttribute("href") || "").replace(/\D/g, "");
          if (digits !== PHONE_DIGITS && digits !== `1${PHONE_DIGITS}`) return;
          const next = `tel:${number.mobileNumber}`;
          if (a.getAttribute("href") !== next) a.setAttribute("href", next);
        });

      // Visible instances. `script` is excluded so the six JSON-LD blocks that
      // carry `telephone: PHONE.display` keep the real NAP number — rewriting
      // structured data with a forwarding number would corrupt local SEO.
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (
          node.parentElement?.closest(
            "script,style,noscript,textarea,input,pre,code,[contenteditable]",
          )
        ) {
          continue;
        }
        const before = node.nodeValue || "";
        const after = before.replace(PHONE_TEXT_PATTERN, () => number.formattedNumber);
        if (after !== before) node.nodeValue = after;
      }
    };

    const scheduleUpdate = () => {
      if (stopped || frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        if (!stopped) applyForwardingNumber();
      });
    };

    // React re-renders and client-side navigations recreate the original phone
    // links, so reapply Google's cached number — without requesting a new one.
    // attributeFilter keeps Parallax/reveal style churn from triggering this.
    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href"],
    });
    window.addEventListener(FORWARDING_EVENT, scheduleUpdate);
    scheduleUpdate();

    // Call intent for organic traffic. Google's website-call conversion only
    // fires on ad clicks, which would leave the ~95% of visits that aren't paid
    // completely unmeasured. This is a GA4 event only — not an Ads conversion,
    // so it can't inflate campaign numbers.
    const onTelClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      ensureGtag()("event", "phone_call_click", {
        send_to: TRACKING.ga4,
        link_location: link.closest("[data-call-source]")?.getAttribute("data-call-source") ?? "page",
      });
    };
    document.addEventListener("click", onTelClick, { capture: true });

    return () => {
      stopped = true;
      observer.disconnect();
      window.removeEventListener(FORWARDING_EVENT, scheduleUpdate);
      document.removeEventListener("click", onTelClick, { capture: true });
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Script
        id="gr-gtag-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4}`}
        strategy="afterInteractive"
      />
      <Script id="gr-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${TRACKING.ga4}');
          window.gtag('config', '${TRACKING.adsId}');
          window.gtag('config', '${TRACKING.adsCallConversion}', {
            phone_conversion_number: '${PHONE.display}',
            phone_conversion_callback: function(formattedNumber, mobileNumber) {
              window.__grForwardingNumber = {
                formattedNumber: formattedNumber,
                mobileNumber: mobileNumber
              };
              window.dispatchEvent(new Event('${FORWARDING_EVENT}'));
            }
          });
        `}
      </Script>
    </>
  );
}
