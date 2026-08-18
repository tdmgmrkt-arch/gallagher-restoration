"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQS, PHONE } from "@/lib/site";

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

              <div className="mt-10 flex flex-col gap-7 lg:mt-auto lg:pt-10">
                <div className="group relative hidden w-full max-w-110 overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] lg:block">
                  <span className="absolute left-0 top-0 z-10 h-[2px] w-16 bg-[#8ECE34] transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:w-full" />
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <Image
                      src="/gallagher-cs-rep.webp"
                      alt="Gallagher Restoration customer support representative"
                      fill
                      sizes="(max-width: 1024px) 0px, 440px"
                      className="object-cover object-[center_top] transition-transform duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,11,0)_40%,rgba(11,12,11,0.9)_100%)]"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                      <span className="gr-pulse block h-[8px] w-[8px] shrink-0 rounded-full bg-[#8ECE34]" />
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C2C6BC]">
                        Live Support · 24 / 7
                      </div>
                    </div>
                  </div>
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
