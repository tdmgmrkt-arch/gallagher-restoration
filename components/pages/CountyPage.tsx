import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { COMPANY, PHONE, SERVICE_CATEGORIES, CITIES_BY_COUNTY } from "@/lib/site";
import { COUNTY_LABEL_COORDS } from "@/lib/city-coords";
import type { CountyContent } from "@/lib/county-content";

type CountyKey = keyof typeof CITIES_BY_COUNTY;

export function CountyPage({ content }: { content: CountyContent }) {
  const allCities: ReadonlyArray<{
    slug: string;
    name: string;
    isHq?: boolean;
  }> = CITIES_BY_COUNTY[content.slug as CountyKey] ?? [];

  const countyCoords = COUNTY_LABEL_COORDS[content.slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://gallagherrestoration.com/#business",
    name: COMPANY.name,
    telephone: PHONE.display,
    url: `https://gallagherrestoration.com/${content.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "31672 Railroad Canyon Rd",
      addressLocality: "Canyon Lake",
      addressRegion: "CA",
      postalCode: "92587",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: content.name },
      ...allCities.map((c) => ({
        "@type": "City",
        name: c.name,
        containedInPlace: content.name,
      })),
    ],
    ...(countyCoords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: countyCoords[0],
            longitude: countyCoords[1],
          },
        }
      : {}),
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "$$",
  };

  const faqJsonLd = content.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <PageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        accent={content.heroAccent}
        intro={content.heroIntro}
        backgroundImage={`/location-page-heros/${content.slug}.webp`}
        backgroundAlt={`${content.name}, California`}
        backgroundPosition="center 65%"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: content.name },
        ]}
      />

      {/* Proof strip */}
      <section className="border-b border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
            {content.proofStrip.map((p, i) => (
              <Reveal key={`${p.label}-${i}`} delay={i * 80}>
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {p.label}
                  </div>
                  <div className="mt-4 text-[clamp(28px,3vw,42px)] font-extrabold tracking-[-0.03em] text-[#F4F5F1]">
                    {p.value}
                  </div>
                  {p.hint ? (
                    <p className="mt-auto pt-4 text-[14px] leading-[1.7] text-[#8F948A] text-pretty">
                      {p.hint}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#0B0C0B] py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.overview.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.overview.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  {allCities.length}+ cities covered &middot; 24/7 dispatch
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.overview.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Top cities */}
      {content.topCities.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <Eyebrow>Priority Cities</Eyebrow>
              <h2 className="mt-6 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                Where {content.shortName} County calls us first.
              </h2>
            </Reveal>
            <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(18px,2vw,26px)]">
              {content.topCities.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <Link
                    href={`/${c.slug}`}
                    className="group flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(22px,2.4vw,32px)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:border-[rgba(142,206,52,0.35)]"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                      City
                    </div>
                    <h3 className="mt-5 text-[clamp(20px,1.8vw,24px)] font-bold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1]">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-[#9CA098] text-pretty">
                      {c.blurb}
                    </p>
                    <span className="mt-auto pt-6 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                      City page &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Local context */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_78%_0%,rgba(142,206,52,0.08),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.localContext.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.localContext.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  Climate-aware &middot; SoCal-native crews
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.localContext.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service lines */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>{content.serviceLines.eyebrow}</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  {content.serviceLines.heading}
                </h2>
              </div>
              {content.serviceLines.intro ? (
                <p className="max-w-[54ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {content.serviceLines.intro}
                </p>
              ) : null}
            </div>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[clamp(18px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-3">
            {content.serviceLines.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex h-full flex-col border-l-2 border-[rgba(142,206,52,0.35)] bg-[#121413] p-[clamp(22px,2.4vw,32px)]">
                  <h3 className="text-[clamp(17px,1.5vw,21px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F1]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#9CA098] text-pretty">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={content.serviceLines.items.length * 60}>
              <a
                href={PHONE.href}
                className="group flex h-full flex-col justify-between border-l-2 border-[#8ECE34] bg-[radial-gradient(90%_120%_at_100%_0%,rgba(142,206,52,0.12),transparent_70%)] p-[clamp(22px,2.4vw,32px)] transition-colors hover:bg-[#121413]"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  {content.shortName} County &middot; 24/7
                </div>
                <h3 className="mt-5 text-[clamp(17px,1.5vw,21px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F1]">
                  Call {PHONE.display} &mdash; live dispatch, no answering service.
                </h3>
                <span className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                  Call now &rarr;
                </span>
              </a>
            </Reveal>
          </div>

          {/* Full service catalog link grid */}
          <div className="mt-[clamp(32px,4vw,56px)] border-t border-[rgba(255,255,255,0.09)] pt-8">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
              Full Service Catalog
            </div>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="inline-flex items-center gap-3 rounded-[2px] border border-[rgba(255,255,255,0.13)] px-5 py-[12px] text-[14px] text-[#D4D8CE] transition-colors hover:border-[#8ECE34] hover:text-[#8ECE34]"
                >
                  <span aria-hidden="true" className="block h-[1px] w-[10px] bg-[#8ECE34]" />
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why local */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_22%_100%,rgba(142,206,52,0.10),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.whyLocal.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.whyLocal.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  Licensed CSLB #1061640 &middot; Insured &middot; Direct Insurance Billing
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.whyLocal.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* All cities grid */}
      {allCities.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-7">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    Every City We Serve
                  </div>
                  <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                    All {content.name} coverage
                  </h3>
                  {content.allCitiesIntro ? (
                    <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#9CA098] text-pretty">
                      {content.allCitiesIntro}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
            <div className="mt-7 flex flex-wrap gap-3">
              {allCities.map((c, i) => (
                <Reveal key={c.slug} delay={i * 40}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center gap-3 rounded-[2px] border border-[rgba(255,255,255,0.13)] px-5 py-[12px] text-[14px] text-[#D4D8CE] transition-colors hover:border-[#8ECE34] hover:text-[#8ECE34]"
                  >
                    <span aria-hidden="true" className="block h-[1px] w-[10px] bg-[#8ECE34]" />
                    {c.name}
                    {c.isHq ? (
                      <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#8ECE34]">
                        HQ
                      </span>
                    ) : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Per-county FAQs */}
      {content.faqs.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <Eyebrow>Frequently Asked</Eyebrow>
              <h2 className="mt-6 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.name}
                <span className="text-[#8ECE34]"> &mdash; questions we hear.</span>
              </h2>
            </Reveal>
            <div className="mt-[clamp(32px,4vw,56px)] divide-y divide-[rgba(255,255,255,0.09)] border-y border-[rgba(255,255,255,0.09)]">
              {content.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[clamp(17px,1.5vw,20px)] font-semibold leading-[1.35] tracking-[-0.015em] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]">
                      <span>{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-[22px] w-[22px] flex-none items-center justify-center border border-[rgba(255,255,255,0.2)] font-mono text-[13px] text-[#8ECE34] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-[70ch] text-[15px] leading-[1.8] text-[#9CA098] text-pretty">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials />
      <FinalCta />
    </>
  );
}
