"use server";

import { randomUUID } from "node:crypto";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  damageType: string;
  address: string;
  /** Only the full variant collects this — treat it as optional server-side. */
  description: string;
  timing?: string;
  insurance?: string;
  /**
   * Which form produced this lead. GHL branches on it — routing the right
   * auto-responder, tagging the contact, and letting a campaign's cost-per-lead
   * be measured against the page that actually earned it. Omitted means the
   * site-wide form, so existing pages and workflows keep working untouched.
   * Add a new value here only alongside the matching GHL workflow branch.
   */
  form?: string;
};

/** Lead source used when a form does not identify itself. */
const DEFAULT_FORM_ID = "homepage_contact";

export type LeadResult =
  | { ok: true; submissionId: string }
  | { ok: false; error: string };

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

/**
 * Per-form webhook overrides, keyed by the payload's `form` value.
 *
 * A campaign landing page can post to its own GHL inbound webhook so its
 * workflow, tagging and reporting stay isolated from site-wide leads. Every
 * form without an entry here keeps using GHL_WEBHOOK_URL untouched.
 *
 * Falls back to GHL_WEBHOOK_URL when the override is unset — so forgetting the
 * var in Vercel degrades to "the lead arrives in the default flow" rather than
 * "the lead disappears." The envelope still carries `form`, so GHL can branch
 * on it either way.
 */
const FORM_WEBHOOK_URLS: Record<string, string | undefined> = {
  newport_beach_flood: process.env.GHL_WEBHOOK_URL_NEWPORT_FLOOD,
};

function webhookUrlFor(formId: string): string | undefined {
  return FORM_WEBHOOK_URLS[formId] || GHL_WEBHOOK_URL;
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!payload.name.trim() || !payload.phone.trim()) {
    return { ok: false, error: "Name and phone are required." };
  }
  if (!payload.email.trim()) {
    return { ok: false, error: "Email is required." };
  }
  // Description is NOT required: the compact variant does not collect one, and
  // rejecting a lead that has a name, a phone and an email because it lacks a
  // free-text field the form never showed is how you lose jobs. The full
  // variant still asks for it. (This previously rejected every compact
  // submission on the site — the form could not be submitted at all.)

  // Generated here, not in the browser, so it survives a retry or a double
  // submit — that stability is the whole point of a transaction id. It is also
  // sent to GHL, so one id reconciles a Google Ads conversion with a contact
  // record. Carries no personal data.
  const submissionId = randomUUID();

  const { form, ...lead } = payload;
  const formId = form?.trim() || DEFAULT_FORM_ID;

  const envelope = {
    source: "gallagherrestoration.com",
    // Set explicitly after the spread, not before it — `...payload` carrying a
    // `form` key would otherwise silently decide the lead source.
    form: formId,
    submissionId,
    submittedAt: new Date().toISOString(),
    ...lead,
  };

  const webhookUrl = webhookUrlFor(formId);

  if (!webhookUrl) {
    console.log("[submitLead] no webhook configured", envelope);
    return { ok: true, submissionId };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(envelope),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, error: `Webhook error (${res.status}).` };
    }
    return { ok: true, submissionId };
  } catch (err) {
    console.error("[submitLead] webhook failed", err);
    return { ok: false, error: "Could not reach our system. Please call us instead." };
  }
}
