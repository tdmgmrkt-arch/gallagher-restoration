"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ_CATEGORIES } from "@/lib/site";

type OpenKey = `${number}-${number}` | null;

export function FaqCategorized() {
  const [openKey, setOpenKey] = useState<OpenKey>("0-0");

  return (
    <section id="faqs" className="bg-[#0B0C0B] py-[clamp(72px,9vw,132px)]">
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] space-y-[clamp(56px,7vw,96px)]">
        {FAQ_CATEGORIES.map((cat, ci) => (
          <Reveal key={cat.title} delay={ci === 0 ? 0 : 60}>
            <div>
              <div className="mb-8">
                <Eyebrow>{cat.eyebrow}</Eyebrow>
                <h2 className="mt-5 max-w-[22ch] text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#F4F5F1] text-balance">
                  {cat.title}
                </h2>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-[#8F948A] text-pretty">
                  {cat.intro}
                </p>
              </div>

              <div>
                {cat.items.map((f, i) => {
                  const key = `${ci}-${i}` as const;
                  const isOpen = openKey === key;
                  const isLast = i === cat.items.length - 1;
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
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-center justify-between gap-6 bg-transparent py-[22px] text-left text-[clamp(16px,1.5vw,20px)] font-semibold tracking-[-0.02em] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
                      >
                        <span>{f.q}</span>
                        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center border border-[rgba(255,255,255,0.18)] text-[16px] leading-none text-[#8ECE34]">
                          {isOpen ? "\u2212" : "+"}
                        </span>
                      </button>
                      {isOpen ? (
                        <p className="max-w-[62ch] pb-6 text-[15px] leading-[1.8] text-[#9CA098] text-pretty">
                          {f.a}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
