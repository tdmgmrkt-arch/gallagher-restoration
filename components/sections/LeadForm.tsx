"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/actions";
import { SERVICE_OPTIONS } from "@/lib/site";

const INPUT =
  "rounded-[2px] border border-[rgba(255,255,255,0.13)] bg-[#0E100E] px-[15px] py-[14px] font-sans text-[15px] text-[#F4F5F1] outline-none transition-colors duration-300 placeholder:text-[#5E635B] focus:border-[#8ECE34]";
const INPUT_LG =
  "rounded-[2px] border border-[rgba(255,255,255,0.13)] bg-[#0E100E] px-[16px] py-[18px] font-sans text-[16px] text-[#F4F5F1] outline-none transition-colors duration-300 placeholder:text-[#5E635B] focus:border-[#8ECE34]";
const LABEL =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E837A]";

type LeadFormProps = {
  variant?: "compact" | "full";
};

const CALLBACK_STEPS = [
  { n: "01", text: "We call you back within 60 seconds." },
  { n: "02", text: "Certified tech dispatched to your property." },
  { n: "03", text: "Free damage assessment — we handle insurance." },
];

export function LeadForm({ variant = "compact" }: LeadFormProps) {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (variant === "compact") {
    return (
      <form onSubmit={onSubmit} noValidate>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
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

        <button
          type="submit"
          disabled={pending}
          className="mt-6 flex w-full items-center justify-center gap-[10px] rounded-[2px] border-0 bg-[#8ECE34] p-[20px] font-sans text-[17px] font-bold text-[#0B0C0B] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending\u2026" : "Call Me Back"}
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

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[rgba(255,255,255,0.07)] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E837A]">
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
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[#8ECE34]">
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
            <option value="Happening now">Happening now</option>
            <option value="Within last 24 hours">Within last 24 hours</option>
            <option value="1–7 days ago">1–7 days ago</option>
            <option value="More than a week ago">More than a week ago</option>
            <option value="Not sure">Not sure</option>
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
          <option value="Filing a claim">Filing an insurance claim</option>
          <option value="Paying out of pocket">Paying out of pocket</option>
          <option value="Not sure yet">Not sure yet</option>
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
