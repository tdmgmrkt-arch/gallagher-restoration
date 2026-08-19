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

const AARON_BIO_SHORT =
  "Aaron Gallagher grew up in Canyon Lake, California, and got his start in restoration through a chance opportunity with a friend that quickly turned into a career. Self-taught in contents restoration and emergency response, he founded Gallagher Restoration and has spent 15+ years responding to water, fire, mold, and wildfire emergencies across five Southern California counties.";

const founderJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://gallagherrestoration.com/#aaron-gallagher",
  name: "Aaron Gallagher",
  givenName: "Aaron",
  familyName: "Gallagher",
  jobTitle: "Founder & Owner",
  description: AARON_BIO_SHORT,
  url: "https://gallagherrestoration.com/about#founder",
  image: "https://gallagherrestoration.com/aaron.webp",
  worksFor: { "@id": "https://gallagherrestoration.com/#business" },
  homeLocation: {
    "@type": "Place",
    name: "Canyon Lake, California",
  },
  knowsAbout: [
    "Water damage restoration",
    "Fire and smoke damage restoration",
    "Mold remediation",
    "Wildfire restoration",
    "Contents restoration",
    "Emergency property response",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
      />
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
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(255,255,255,0.07)] pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
                <span>Licensed &middot; Insured</span>
                <span className="text-[#C6CABF]">CSLB #1061640</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="founder"
        className="scroll-mt-24 border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,132px)]"
      >
        <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="group relative order-2 lg:order-1">
              <div
                className="absolute -left-[14px] -top-[14px] h-[120px] w-[120px] border-l-2 border-t-2 border-[#8ECE34]"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden bg-[#121413]">
                <Image
                  src="/aaron.webp"
                  alt="Aaron Gallagher — founder and owner of Gallagher Restoration — in front of the company fleet in Canyon Lake, California"
                  width={1440}
                  height={1800}
                  sizes="(min-width: 980px) 50vw, 100vw"
                  className="block aspect-[4/5] w-full object-cover object-[center_28%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div
                className="absolute -bottom-[14px] -right-[14px] h-[120px] w-[120px] border-b-2 border-r-2 border-[#8ECE34]"
                aria-hidden="true"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="order-1 lg:order-2">
              <Eyebrow>Meet the Founder</Eyebrow>
              <h2 className="mt-[22px] max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
                Aaron Gallagher — Founder &amp; Owner
              </h2>
              <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#C2C6BC] text-pretty">
                Aaron grew up in Canyon Lake, California, in a close-knit lake community where
                teamwork, hard work, and looking out for your neighbors weren&apos;t slogans —
                they were how the town operated. A childhood spent on sports fields, in the ocean,
                and on skateboards taught him resilience and camaraderie long before he ever ran
                a company.
              </p>
              <p className="mt-5 max-w-[54ch] text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#C2C6BC] text-pretty">
                He got his start in restoration through a chance opportunity with a friend, and a
                first job turned into a calling. Aaron trained himself in contents restoration and
                emergency response, driven by what the work actually meant to the people on the
                other end of the phone: not a damaged wall, but a family whose life had just been
                upended. That perspective became the foundation of Gallagher Restoration.
              </p>
              <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.75] text-[#8F948A] text-pretty">
                Fifteen-plus years later, Aaron leads an IICRC- and ANSI-certified crew responding
                to water, fire, mold, and wildfire emergencies across five Southern California
                counties. He credits the company&apos;s growth to the technicians and staff who
                share his standard for the work — and to the community that raised him, which he
                supports through youth sports sponsorships, school donations, and partnerships
                that help families through tragedy.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[rgba(255,255,255,0.07)] pt-6">
                {[
                  { label: "Hometown", value: "Canyon Lake, CA" },
                  { label: "In Restoration", value: "15+ Years" },
                  { label: "Certifications", value: "IICRC · ANSI" },
                  { label: "License", value: "CSLB #1061640" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7E837A]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-[14px] font-semibold text-[#F4F5F1]">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="/news/the-passion-behind-gallagher-restoration"
                className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
              >
                Read Aaron&apos;s Full Story &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
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
