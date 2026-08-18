"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQS, PHONE } from "@/lib/site";

const PREP_ITEMS = [
  "Property address & how to access it",
  "Type of damage (water, fire, mold, other)",
  "When it started or was first noticed",
  "Your insurance carrier, if filing a claim",
  "Photos or short video — only if safe to capture",
] as const;

export function Faq({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faqs" className="bg-[#0B0C0B] py-[clamp(72px,9vw,132px)]">
      <div
        className={[
          "mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]",
          hideHeader
            ? ""
            : "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-[clamp(32px,5vw,80px)]",
        ].join(" ")}
      >
        {hideHeader ? null : (
          <Reveal className="h-full">
            <div className="flex h-full flex-col">
              <div>
                <Eyebrow>Common Questions</Eyebrow>
                <h2 className="mt-5 max-w-[14ch] text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
                  Answers Before You Call
                </h2>
                <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.75] text-[#8F948A] text-pretty">
                  Still not sure? Our team answers the phone 24 hours a day, 7 days a week.
                </p>
              </div>

              <div className="mt-[clamp(32px,4vw,52px)] border-t border-[rgba(255,255,255,0.09)] pt-[clamp(24px,3vw,36px)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  What to Have Ready
                </div>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {PREP_ITEMS.map((item) => (
                    <li key={item} className="grid grid-cols-[auto_1fr] items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] block h-[6px] w-[6px] shrink-0 rotate-45 bg-[#8ECE34]"
                      />
                      <span className="text-[14px] leading-[1.6] text-[#C2C6BC] text-pretty">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-4 lg:mt-auto lg:pt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7E837A]">
                  Ready to Talk to Someone?
                </div>
                <Link
                  href={PHONE.href}
                  className="inline-flex w-fit items-center gap-[10px] rounded-[2px] border border-[rgba(255,255,255,0.18)] px-[26px] py-4 text-[15px] font-semibold text-[#F4F5F1] transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.07)] hover:text-[#8ECE34]"
                >
                  Call {PHONE.display}
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <div className={hideHeader ? "mx-auto max-w-[860px]" : ""}>
            {FAQS.map((f, i) => {
              const isOpen = openIndex === i;
              const isLast = i === FAQS.length - 1;
              return (
                <div
                  key={f.q}
                  className={[
                    "border-t border-[rgba(255,255,255,0.1)]",
                    isLast ? "border-b border-[rgba(255,255,255,0.1)]" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 bg-transparent py-[26px] text-left text-[clamp(17px,1.6vw,21px)] font-semibold tracking-[-0.02em] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
                  >
                    <span>{f.q}</span>
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center border border-[rgba(255,255,255,0.18)] text-[16px] leading-none text-[#8ECE34]">
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="max-w-[58ch] pb-7 text-[15px] leading-[1.8] text-[#9CA098] text-pretty">
                      {f.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
