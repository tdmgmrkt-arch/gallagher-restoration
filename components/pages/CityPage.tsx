import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CityMap } from "@/components/ui/CityMap";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { COMPANY, PHONE, SERVICE_CATEGORIES, CITIES_BY_COUNTY } from "@/lib/site";
import { CITY_COORDS } from "@/lib/city-coords";
import type { CityContent } from "@/lib/city-content";

type CountyKey = keyof typeof CITIES_BY_COUNTY;

function getNearbyCities(slug: string, countySlug: string, limit = 6) {
  const siblings = (CITIES_BY_COUNTY[countySlug as CountyKey] ?? []).filter(
    (c) => c.slug !== slug
  );
  return siblings.slice(0, limit);
}

export function CityPage({ content }: { content: CityContent }) {
  const nearby = getNearbyCities(content.slug, content.countySlug);

  const cityCoords = CITY_COORDS[content.slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://gallagherrestoration.com/#business",
    name: COMPANY.name,
    telephone: PHONE.display,
    url: `https://gallagherrestoration.com/${content.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Canyon Lake",
      addressRegion: "CA",
      postalCode: "92587",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: content.name, containedInPlace: content.countyName },
      { "@type": "AdministrativeArea", name: content.countyName },
    ],
    ...(cityCoords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: cityCoords[0],
            longitude: cityCoords[1],
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
        backgroundImage={`/location-page-heros/${content.slug.replace(/-ca$/, "")}.webp`}
        backgroundAlt={`${content.name}, California`}
        backgroundPosition="center 65%"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: content.countyName, href: `/${content.countySlug}` },
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

      {/* Local hook */}
      <section className="relative overflow-hidden bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_78%_0%,rgba(142,206,52,0.08),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-[clamp(36px,5vw,64px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal>
            <div className="flex flex-col">
              <Eyebrow>{content.isHq ? "Our Home Base" : "On the Ground"}</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.isHq ? `${content.name} is home.` : `We know ${content.name}.`}
              </h2>
              <p className="mt-7 max-w-[54ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
                {content.localHook}
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <CityMap activeSlug={content.slug} activeName={content.name} />
          </Reveal>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>{content.neighborhoods.eyebrow}</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  {content.neighborhoods.heading}
                </h2>
              </div>
              {content.neighborhoods.intro ? (
                <p className="max-w-[54ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {content.neighborhoods.intro}
                </p>
              ) : null}
            </div>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(18px,2vw,26px)]">
            {content.neighborhoods.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 60}>
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(22px,2.4vw,32px)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    Neighborhood
                  </div>
                  <h3 className="mt-4 text-[clamp(18px,1.6vw,22px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#F4F5F1]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#9CA098] text-pretty">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Common damage */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>{content.commonDamage.eyebrow}</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  {content.commonDamage.heading}
                </h2>
              </div>
              {content.commonDamage.intro ? (
                <p className="max-w-[54ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {content.commonDamage.intro}
                </p>
              ) : null}
            </div>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[clamp(18px,2vw,26px)] sm:grid-cols-2">
            {content.commonDamage.items.map((item, i) => (
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
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(28px,4vw,64px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.howWeWork.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.howWeWork.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div
                  aria-hidden="true"
                  className="h-[2px] w-[36px] bg-[#8ECE34]"
                />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8F948A]">
                  24/7 &middot; Every call answered by our team
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.howWeWork.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>Restoration Services in {content.name}</Eyebrow>
                <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  Everything we do &mdash; available in {content.name}.
                </h2>
              </div>
              <p className="max-w-[52ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                One crew, start to finish. From emergency mitigation through full reconstruction, every service below is dispatched to {content.name} 24/7.
              </p>
            </div>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[clamp(18px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 60}>
                <Link
                  href={`/${cat.slug}`}
                  className="group flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(22px,2.4vw,32px)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:border-[rgba(142,206,52,0.35)]"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {cat.kicker}
                  </div>
                  <h3 className="mt-5 text-[clamp(20px,1.8vw,24px)] font-bold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1]">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#9CA098] text-pretty">
                    {cat.summary}
                  </p>
                  <span className="mt-auto pt-6 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                    Learn more &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={SERVICE_CATEGORIES.length * 60}>
              <Link
                href="/services"
                className="group relative flex h-full flex-col justify-between overflow-hidden border border-[rgba(142,206,52,0.28)] bg-[radial-gradient(90%_120%_at_100%_0%,rgba(142,206,52,0.12),transparent_70%)] p-[clamp(22px,2.4vw,32px)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:border-[#8ECE34]"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    Full Catalog
                  </div>
                  <h3 className="mt-5 text-[clamp(20px,1.8vw,24px)] font-bold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1]">
                    See every service we run in {content.name}.
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#9CA098] text-pretty">
                    Twenty specific services across seven verticals &mdash; one crew, one point of contact.
                  </p>
                </div>
                <span className="mt-6 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                  All services &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_22%_100%,rgba(142,206,52,0.10),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(28px,4vw,64px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.whyChoose.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.whyChoose.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div
                  aria-hidden="true"
                  className="h-[2px] w-[36px] bg-[#8ECE34]"
                />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8F948A]">
                  Licensed CSLB #1061640 &middot; Insured &middot; Direct Insurance Billing
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.whyChoose.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      {content.pricing ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <Eyebrow>{content.pricing.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.pricing.heading}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
                {content.pricing.body}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Notable work */}
      {content.notableWork ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(48px,6vw,88px)]">
          <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="border-l-2 border-[#8ECE34] bg-[#121413] p-[clamp(28px,3vw,44px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  Track Record in {content.name}
                </div>
                <p className="mt-4 text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
                  {content.notableWork}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Nearby cities */}
      {nearby.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(48px,6vw,88px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-7">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    Nearby Coverage
                  </div>
                  <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                    Also serving across {content.countyName}
                  </h3>
                </div>
                <Link
                  href={`/${content.countySlug}`}
                  className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
                >
                  All {content.countyName} cities &rarr;
                </Link>
              </div>
            </Reveal>
            <div className="mt-7 flex flex-wrap gap-3">
              {nearby.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center gap-3 rounded-[2px] border border-[rgba(255,255,255,0.13)] px-5 py-[12px] text-[14px] text-[#D4D8CE] transition-colors hover:border-[#8ECE34] hover:text-[#8ECE34]"
                  >
                    <span aria-hidden="true" className="block h-[1px] w-[10px] bg-[#8ECE34]" />
                    {c.name}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Per-city FAQs */}
      {content.faqs.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
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
