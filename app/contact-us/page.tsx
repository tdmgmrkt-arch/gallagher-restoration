import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadForm } from "@/components/sections/LeadForm";
import { PHONE, COMPANY, COUNTIES, ADDRESS, GBP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Gallagher Restoration Co. | 24/7 Emergency Response",
  description:
    "Call (951) 541-0034 or request service online. Gallagher Restoration answers 24/7 and dispatches crews across Southern California within 60 minutes.",
  alternates: { canonical: "/contact-us" },
};

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
      <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.07)] bg-[#08090A]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_50%,rgba(142,206,52,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] pb-[clamp(20px,2.4vw,32px)] pt-[clamp(56px,7vw,88px)]">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]"
            >
              <Link href="/" className="transition-colors hover:text-[#8ECE34]">
                Home
              </Link>
              <span className="text-[#3F4340]">/</span>
              <span className="text-[#C6CABF]">Contact Us</span>
            </nav>
          </Reveal>
          <Reveal delay={60}>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <Eyebrow>24/7 Emergency Response</Eyebrow>
                <h1 className="mt-4 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  Contact <span className="text-[#8ECE34]">{COMPANY.name}</span>
                </h1>
              </div>
              <a
                href={PHONE.href}
                className="group hidden items-center gap-[10px] font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-[#8ECE34] transition-transform hover:translate-x-[4px] md:inline-flex"
              >
                <span className="relative inline-flex h-[8px] w-[8px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ECE34] opacity-70" />
                  <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-[#8ECE34]" />
                </span>
                Or call now &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Horizontal 3-up: contact info blocks span full width above the form */}
      <section className="border-b border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(32px,4vw,56px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 items-stretch gap-[clamp(16px,2vw,24px)] md:grid-cols-2 lg:grid-cols-3">
            {/* Emergency Line — primary CTA */}
            <Reveal>
              <Link
                href={PHONE.href}
                className="group flex h-full flex-col border-l-2 border-[#8ECE34] bg-[radial-gradient(90%_120%_at_100%_0%,rgba(142,206,52,0.14),transparent_72%)] p-[clamp(20px,2.2vw,30px)] transition-colors hover:bg-[#121413]"
              >
                <div className="flex items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  <span className="relative inline-flex h-[8px] w-[8px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ECE34] opacity-70" />
                    <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-[#8ECE34]" />
                  </span>
                  Emergency Line
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                  24/7 Dispatch
                </div>
                <div className="mt-2 whitespace-nowrap text-[clamp(24px,2.7vw,34px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#F4F5F1] transition-colors group-hover:text-[#8ECE34]">
                  {PHONE.display}
                </div>
                <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.6] text-[#9CA098] text-pretty">
                  A real person picks up around the clock &mdash; holidays, weekends, 3 a.m.
                </p>
                <span className="mt-auto pt-5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ECE34] transition-transform group-hover:translate-x-[4px]">
                  Call now &rarr;
                </span>
              </Link>
            </Reveal>

            {/* Headquarters — secondary CTA */}
            <Reveal delay={90}>
              <Link
                href={GBP.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(20px,2.2vw,30px)] transition-[border-color,transform] duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:border-[rgba(142,206,52,0.35)]"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  Headquarters
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                  Canyon Lake HQ
                </div>
                <div className="mt-2 text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#F4F5F1]">
                  Canyon Lake, CA
                </div>
                <div className="mt-2 text-[14px] leading-[1.5] text-[#C6CABF]">
                  {ADDRESS.street}
                  <br />
                  <span className="text-[#8F948A]">
                    {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
                  </span>
                </div>
                <span className="mt-auto pt-5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ECE34] transition-transform group-hover:translate-x-[4px]">
                  Get directions &rarr;
                </span>
              </Link>
            </Reveal>

            {/* Response Time — stat tile */}
            <Reveal delay={180}>
              <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(20px,2.2vw,30px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  Response Time
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                  Typical Arrival
                </div>
                <div className="mt-1 flex items-baseline gap-[10px]">
                  <span className="text-[clamp(42px,5vw,64px)] font-extrabold leading-none tracking-[-0.045em] text-[#F4F5F1]">
                    60
                  </span>
                  <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em] text-[#8ECE34]">
                    minutes
                  </span>
                </div>
                <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.6] text-[#9CA098] text-pretty">
                  On-site across our five-county service area &mdash; often faster in Southwest Riverside.
                </p>
                <div className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  24 / 7 &middot; 365 Days a Year
                </div>
              </div>
            </Reveal>
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
              <LeadForm variant="full" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  Find Us
                </div>
                <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                  {ADDRESS.fullDisplay}
                </h3>
              </div>
              <a
                href={GBP.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
              >
                Get Directions &rarr;
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#0B0C0B]">
              <iframe
                title="Gallagher Restoration headquarters location on Google Maps"
                src="https://www.google.com/maps?q=31672+Railroad+Canyon+Rd,+Canyon+Lake,+CA+92587&hl=en&z=14&t=m&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.88)_hue-rotate(180deg)_brightness(0.95)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,transparent_60%,rgba(11,12,11,0.55)_100%)]" />
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
