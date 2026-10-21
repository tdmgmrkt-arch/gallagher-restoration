"use server";

import { randomUUID } from "node:crypto";

import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
  TURNSTILE_FIELD,
} from "@/lib/form-fields";
import { screenSubmission } from "@/lib/spam-guard";

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
  /**
   * Anti-bot fields added by LeadForm and consumed by `lib/spam-guard`. None of
   * them is ever forwarded to GHL — the envelope below is built as an explicit
   * allowlist so a new guard field can never leak into the CRM by accident.
   */
  [HONEYPOT_FIELD]?: string;
  [RENDERED_AT_FIELD]?: string;
  [TURNSTILE_FIELD]?: string;
};

/** Lead source used when a form does not identify itself. */
const DEFAULT_FORM_ID = "homepage_contact";

export type LeadResult =
  | {
      ok: true;
      submissionId: string;
      /**
       * False when the submission was filtered as spam. The browser is still
       * told it succeeded — a bot shown an error just retries around the check
       * — but the caller must not fire the Google Ads conversion, or filtered
       * bots would inflate the campaign's reported lead volume.
       */
      track?: boolean;
    }
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

/**
 * Loose on purpose — this is a typo catcher, not the spam check.
 *
 * `lib/spam-guard` runs the strict pattern and scores a malformed address as a
 * spam signal. Here we only want to tell a real visitor who typed "name@gmail"
 * to fix it, rather than accepting a lead nobody can reply to.
 */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** NANP is 10 digits; 11 allows a leading 1, and a little slack above that. */
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const name = payload.name.trim();
  const phone = payload.phone.trim();
  const email = payload.email.trim();

  if (!name || !phone) {
    return { ok: false, error: "Name and phone are required." };
  }
  if (!email) {
    return { ok: false, error: "Email is required." };
  }
  if (!EMAIL_SHAPE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Validated here rather than left to the spam guard so a visitor who fat
  // fingers their number is told to fix it, instead of a job arriving with a
  // phone we cannot call back.
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < PHONE_MIN_DIGITS || phoneDigits.length > PHONE_MAX_DIGITS) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  // Description is NOT required: the compact variant does not collect one, and
  // rejecting a lead that has a name, a phone and an email because it lacks a
  // free-text field the form never showed is how you lose jobs. The full
  // variant still asks for it. (This previously rejected every compact
  // submission on the site — the form could not be submitted at all.)

  const formId = payload.form?.trim() || DEFAULT_FORM_ID;

  // Only the fields GHL is meant to receive. An allowlist rather than a
  // `...rest` spread, so the honeypot, the render timestamp and the Turnstile
  // token cannot reach the CRM — and neither can any guard field added later.
  const lead = {
    name,
    phone,
    email,
    damageType: payload.damageType,
    address: payload.address.trim(),
    description: payload.description.trim(),
    timing: payload.timing ?? "",
    insurance: payload.insurance ?? "",
  };

  const verdict = await screenSubmission(
    lead,
    {
      [HONEYPOT_FIELD]: payload[HONEYPOT_FIELD],
      [RENDERED_AT_FIELD]: payload[RENDERED_AT_FIELD],
      [TURNSTILE_FIELD]: payload[TURNSTILE_FIELD],
    },
    { formId },
  );

  if (verdict.action === "reject") {
    return { ok: false, error: verdict.message };
  }

  // Generated here, not in the browser, so it survives a retry or a double
  // submit — that stability is the whole point of a transaction id. It is also
  // sent to GHL, so one id reconciles a Google Ads conversion with a contact
  // record. Carries no personal data.
  const submissionId = randomUUID();

  if (verdict.action === "drop") {
    // Looks exactly like a success to the caller, minus the conversion. The
    // reason is already in the server log, written by the guard.
    return { ok: true, submissionId, track: false };
  }

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
