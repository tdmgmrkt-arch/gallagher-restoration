"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/actions";
import { SERVICE_OPTIONS } from "@/lib/site";

const INPUT =
  "rounded-[2px] border border-[rgba(255,255,255,0.13)] bg-[#0E100E] px-[15px] py-[14px] font-sans text-[15px] text-[#F4F5F1] outline-none transition-colors duration-300 placeholder:text-[#5E635B] focus:border-[#8ECE34]";
const LABEL =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E837A]";

export function LeadForm() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      damageType: String(fd.get("damageType") || SERVICE_OPTIONS[0]),
      address: String(fd.get("address") || ""),
    };
    setError(null);
    startTransition(async () => {
      const res = await submitLead(payload);
      if (res.ok) {
        setSent(true);
      } else {
        setError(res.error);
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

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
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
        <span className={LABEL}>Type of Damage</span>
        <select name="damageType" className={`${INPUT} appearance-none`} defaultValue={SERVICE_OPTIONS[0]}>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>

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

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-[10px] rounded-[2px] border-0 bg-[#8ECE34] p-[18px] font-sans text-[16px] font-bold text-[#0B0C0B] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending\u2026" : "Request Service"}
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
