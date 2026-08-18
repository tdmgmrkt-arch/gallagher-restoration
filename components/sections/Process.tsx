import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PHONE } from "@/lib/site";

type Step = {
  index: string;
  kicker: string;
  title: string;
  body: React.ReactNode;
  accent?: boolean;
};

const STEPS: Step[] = [
  {
    index: "01",
    kicker: "Contact Us",
    title: "Immediate Response",
    accent: true,
    body: (
      <>
        Call our 24/7 emergency hotline at{" "}
        <Link
          href={PHONE.href}
          className="border-b border-[rgba(142,206,52,0.55)] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
        >
          {PHONE.digits}
        </Link>{" "}
        to get immediate assistance.
      </>
    ),
  },
  {
    index: "02",
    kicker: "Damage Assessment",
    title: "Inspect & Assess",
    body: (
      <>
        We conduct a thorough inspection to evaluate the extent of the damage and identify areas requiring immediate attention.
      </>
    ),
  },
  {
    index: "03",
    kicker: "Clean & Restore",
    title: "Containment & Mitigation",
    body: (
      <>
        We implement immediate measures to contain the damage, prevent further deterioration, and begin the cleanup and restoration process.
      </>
    ),
  },
];

export function Process() {
  return (
    <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,132px)]">
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        <Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
            <div>
              <Eyebrow>Emergency Services in Three Easy Steps</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
                What Happens When You Call Gallagher?
              </h2>
            </div>
            <p className="max-w-[52ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
              Our restoration professionals respond quickly to water, fire, and property damage emergencies and guide you through the restoration process from the initial call through cleanup and recovery.
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(44px,5vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,2.6vw,36px)]">
          {STEPS.map((s, i) => (
            <Reveal key={s.index} delay={i * 90}>
              <div
                className={[
                  "pt-7",
                  s.accent ? "border-t-2 border-[#8ECE34]" : "border-t-2 border-[rgba(255,255,255,0.12)]",
                ].join(" ")}
              >
                <div className="flex items-baseline gap-[14px]">
                  <span
                    className={[
                      "text-[clamp(34px,3.6vw,50px)] font-extrabold leading-none tracking-[-0.05em]",
                      s.accent ? "text-[#8ECE34]" : "text-[#2C302B]",
                    ].join(" ")}
                  >
                    {s.index}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
                    {s.kicker}
                  </span>
                </div>
                <h3 className="mt-6 text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.025em]">
                  {s.title}
                </h3>
                <p className="mt-[14px] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
