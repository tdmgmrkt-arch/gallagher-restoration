"use server";

export type LeadPayload = {
  name: string;
  phone: string;
  damageType: string;
  address: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!payload.name.trim() || !payload.phone.trim()) {
    return { ok: false, error: "Name and phone are required." };
  }

  const envelope = {
    source: "gallagherrestoration.com",
    form: "homepage_contact",
    submittedAt: new Date().toISOString(),
    ...payload,
  };

  if (!GHL_WEBHOOK_URL) {
    console.log("[submitLead] no GHL_WEBHOOK_URL configured", envelope);
    return { ok: true };
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
    return { ok: true };
  } catch (err) {
    console.error("[submitLead] webhook failed", err);
    return { ok: false, error: "Could not reach our system. Please call us instead." };
  }
}
