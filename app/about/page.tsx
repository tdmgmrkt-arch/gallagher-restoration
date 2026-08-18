import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TeamBand } from "@/components/sections/TeamBand";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "About Gallagher Restoration Co. | Family-Owned Restoration in Southern California",
  description:
    "Family-owned restoration company serving Southern California for over 15 years. Learn about the Gallagher family, our values, and how we help homeowners recover from disaster.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    kicker: "01",
    title: "Family",
    body: "Gallagher Restoration was built by the Gallagher family and is run the same way we would treat our own home — with care, urgency, and respect.",
  },
  {
    kicker: "02",
    title: "Loyalty",
    body: "Our customers trust us because we show up, communicate clearly, and stand behind our work long after the emergency is over.",
  },
  {
    kicker: "03",
    title: "Respect",
    body: "Every property we enter belongs to someone — a family, a business, a life in progress. We treat it that way from the first minute we arrive.",
  },
];

const NUMBERS = [
  { value: "15", suffix: "+", label: "Years in Southern California" },
  { value: "60", suffix: "min", label: "Typical On-Site Response" },
  { value: "24", suffix: "/7", label: "Emergency Availability" },
  { value: "5", suffix: "", label: "Counties Serviced" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Family. Loyalty. Respect."
        title="The Story Behind"
        accent="Gallagher Restoration"
        intro="For more than 15 years, the Gallagher family has responded to water, fire, mold, and wildfire emergencies across Southern California — one home, one family, one crisis at a time."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        backgroundImage="/about-hero.webp"
        backgroundAlt="The Gallagher family in front of a Gallagher Restoration service van at dusk"
        backgroundPosition="center 60%"
      />

      <section className="bg-[#0B0C0B] py-[clamp(72px,9vw,132px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="group relative">
              <div
                className="absolute -left-[14px] -top-[14px] h-[120px] w-[120px] border-l-2 border-t-2 border-[#8ECE34]"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden bg-[#121413]">
                <Image
                  src="/gallagher_family.webp"
                  alt="The Gallagher family in front of a company van"
                  width={1200}
                  height={1500}
                  sizes="(min-width: 980px) 50vw, 100vw"
                  className="block aspect-[4/5] w-full object-cover object-[center_22%] [filter:saturate(0.9)_contrast(1.04)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div
                className="absolute -bottom-[14px] -right-[14px] h-[120px] w-[120px] border-b-2 border-r-2 border-[#8ECE34]"
                aria-hidden="true"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <Eyebrow>Who We Are</Eyebrow>
              <h2 className="mt-[22px] max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
                A family that shows up when it matters most.
              </h2>
              <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#C2C6BC] text-pretty">
                Gallagher Restoration is a family-owned and operated restoration company based in
                Canyon Lake, California. What started as a small crew answering emergency calls has
                grown into a full-service restoration team responding across five counties — but
                the way we work has stayed exactly the same.
              </p>
              <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.75] text-[#8F948A] text-pretty">
                Aaron Gallagher leads every job the way he would treat his own home: fast, honest,
                and grounded in doing the right thing for the customer. That&apos;s why our
                neighbors keep calling us back and referring us to their friends.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[rgba(255,255,255,0.1)] pb-9">
              <div>
                <Eyebrow>What Drives Us</Eyebrow>
                <h2 className="mt-5 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.03] tracking-[-0.035em]">
                  Our Core Values
                </h2>
              </div>
              <p className="max-w-[44ch] text-[15px] leading-[1.7] text-[#8F948A] text-pretty">
                Three principles have guided every job Gallagher Restoration has ever taken on.
              </p>
            </div>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,2.4vw,32px)]">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(28px,3.2vw,44px)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-1 hover:border-[rgba(142,206,52,0.35)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {v.kicker}
                  </div>
                  <h3 className="mt-6 text-[clamp(22px,2.2vw,30px)] font-bold tracking-[-0.025em]">
                    {v.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
            {NUMBERS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 80}
                className={[
                  "py-[clamp(24px,3vw,38px)] pr-6",
                  i === 0 ? "" : "pl-[clamp(0px,2vw,32px)]",
                  i < NUMBERS.length - 1 ? "border-r border-[rgba(255,255,255,0.08)]" : "",
                ].join(" ")}
              >
                <div className="text-[clamp(30px,3.4vw,44px)] font-extrabold leading-none tracking-[-0.04em] text-[#F4F5F1]">
                  {s.value}
                  {s.suffix ? <span className="text-[#8ECE34]">{s.suffix}</span> : null}
                </div>
                <div className="mt-[10px] font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamBand />
      <Process />
      <Testimonials />
      <FinalCta />
    </>
  );
}
