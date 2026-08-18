import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadForm } from "@/components/sections/LeadForm";
import { PHONE, COMPANY, COUNTIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Gallagher Restoration Co. | 24/7 Emergency Response",
  description:
    "Call (951) 541-0034 or request service online. Gallagher Restoration answers 24/7 and dispatches crews across Southern California within 60 minutes.",
  alternates: { canonical: "/contact-us" },
};

const CONTACT_BLOCKS = [
  {
    kicker: "Emergency Line",
    label: "24/7 Phone",
    value: PHONE.display,
    href: PHONE.href,
    hint: "Answered around the clock, holidays included.",
  },
  {
    kicker: "Headquarters",
    label: "Based In",
    value: COMPANY.city,
    hint: "Serving Southern California from Canyon Lake.",
  },
  {
    kicker: "Response Time",
    label: "On-Site In",
    value: "60 minutes",
    hint: "Typical arrival across our five-county service area.",
  },
];

const EXPECT_STEPS = [
  {
    kicker: "Step 01",
    title: "You call — a real person answers.",
    body: "Any hour, any day, any holiday. Our team picks up, takes down what happened, and dispatches a crew right away.",
  },
  {
    kicker: "Step 02",
    title: "A Gallagher crew arrives on site.",
    body: "Typically within 60 minutes across our five-county area. We contain the damage before it spreads.",
  },
  {
    kicker: "Step 03",
    title: "We handle mitigation and restoration.",
    body: "From water extraction and drying to full reconstruction — one team, one point of contact through the entire process.",
  },
];

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        eyebrow="24/7 Emergency Response"
        title="Contact"
        accent="Gallagher Restoration"
        intro="Water, fire, mold, or wildfire damage doesn't wait — and neither do we. Call our emergency line for immediate dispatch, or send us the details below and we'll be in touch right away."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        backgroundImage="/contact-hero.webp"
        backgroundAlt="Gallagher Restoration crew responding to an emergency call"
        backgroundPosition="center 55%"
      />

      {/* Horizontal 3-up: contact info blocks span full width above the form */}
      <section className="border-b border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
            {CONTACT_BLOCKS.map((b, i) => {
              const content = (
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:border-[rgba(142,206,52,0.35)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {b.kicker}
                  </div>
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                    {b.label}
                  </div>
                  <div className="mt-2 text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.03em] text-[#F4F5F1]">
                    {b.value}
                  </div>
                  <p className="mt-auto pt-4 text-[14px] leading-[1.7] text-[#8F948A] text-pretty">
                    {b.hint}
                  </p>
                </div>
              );
              return (
                <Reveal key={b.kicker} delay={i * 90}>
                  {b.href ? (
                    <Link href={b.href} className="block h-full">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two-column: story/steps on left, form on right */}
      <section className="relative overflow-hidden bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_22%_100%,rgba(142,206,52,0.10),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <div>
            <Reveal>
              <Eyebrow>What Happens Next</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                A real person, a real crew, on the way.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                Every call is answered by a real member of our team &mdash; not a machine, not an overseas call center. Here&apos;s exactly what to expect after you reach out.
              </p>
            </Reveal>

            <div className="mt-[clamp(28px,3.4vw,40px)] flex flex-col">
              {EXPECT_STEPS.map((s, i) => {
                const isLast = i === EXPECT_STEPS.length - 1;
                return (
                  <Reveal key={s.kicker} delay={i * 100}>
                    <div
                      className={[
                        "grid grid-cols-[auto_1fr] items-start gap-x-[clamp(20px,2.4vw,32px)] gap-y-2 py-[clamp(22px,2.4vw,32px)]",
                        isLast ? "" : "border-b border-[rgba(255,255,255,0.09)]",
                      ].join(" ")}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                        {s.kicker}
                      </span>
                      <h3 className="text-[clamp(18px,1.8vw,22px)] font-bold leading-[1.2] tracking-[-0.025em] text-[#F4F5F1]">
                        {s.title}
                      </h3>
                      <span aria-hidden="true" />
                      <p className="text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                        {s.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={140}>
            <div className="border border-[rgba(255,255,255,0.1)] bg-[#121413] p-[clamp(26px,3.2vw,44px)] lg:sticky lg:top-[120px]">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-7">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  Coverage Map
                </div>
                <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                  Counties we cover
                </h3>
              </div>
              <Link
                href="/service-areas"
                className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
              >
                See all service areas &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="mt-7 flex flex-wrap gap-3">
            {COUNTIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  href={`/${c.slug}`}
                  className="inline-flex items-center gap-3 rounded-[2px] border border-[rgba(255,255,255,0.13)] px-5 py-[12px] text-[14px] text-[#D4D8CE] transition-colors hover:border-[#8ECE34] hover:text-[#8ECE34]"
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[#8ECE34]">
                    {c.index}
                  </span>
                  {c.name} {c.second}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
