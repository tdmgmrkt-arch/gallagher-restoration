"use server";

import { randomUUID } from "node:crypto";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  damageType: string;
  address: string;
  description: string;
  timing?: string;
  insurance?: string;
};

export type LeadResult =
  | { ok: true; submissionId: string }
  | { ok: false; error: string };

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!payload.name.trim() || !payload.phone.trim()) {
    return { ok: false, error: "Name and phone are required." };
  }
  if (!payload.email.trim()) {
    return { ok: false, error: "Email is required." };
  }
  if (!payload.description.trim()) {
    return { ok: false, error: "Please briefly describe the damage." };
  }

  // Generated here, not in the browser, so it survives a retry or a double
  // submit — that stability is the whole point of a transaction id. It is also
  // sent to GHL, so one id reconciles a Google Ads conversion with a contact
  // record. Carries no personal data.
  const submissionId = randomUUID();

  const envelope = {
    source: "gallagherrestoration.com",
    form: "homepage_contact",
    submissionId,
    submittedAt: new Date().toISOString(),
    ...payload,
  };

  if (!GHL_WEBHOOK_URL) {
    console.log("[submitLead] no GHL_WEBHOOK_URL configured", envelope);
    return { ok: true, submissionId };
  }

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
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
