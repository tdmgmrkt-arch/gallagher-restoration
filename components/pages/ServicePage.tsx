import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { TrustMarks } from "@/components/ui/TrustMarks";
import { COMPANY, PHONE, SERVICE_CATEGORIES, SOCIAL_URLS } from "@/lib/site";
import { CITY_COORDS } from "@/lib/city-coords";
import { getGoogleReviews } from "@/lib/google-reviews";
import type { ServiceContent } from "@/lib/service-content";
import { SERVICE_CONTENT } from "@/lib/service-content";

const HQ_COORDS = CITY_COORDS["canyon-lake-ca"];

const CATEGORY_LABEL: Record<ServiceContent["category"], string> = {
  water: "Water",
  fire: "Fire & Smoke",
  mold: "Mold",
  sewage: "Sewage",
  property: "Property Damage",
  wildfire: "Wildfire",
  reconstruction: "Reconstruction",
};

const CATEGORY_HERO: Record<ServiceContent["category"], { src: string; alt: string }> = {
  water: { src: "/water-hero.webp", alt: "Soft caustic light patterns rippling across a plaster wall" },
  fire: { src: "/fire-hero.webp", alt: "Glowing wood embers with warm orange heat mapping through the char" },
  mold: { src: "/mold-hero.webp", alt: "Condensation beads on a cool window pane catching soft daylight" },
  sewage: { src: "/water-hero.webp", alt: "Soft caustic light patterns rippling across a plaster wall" },
  wildfire: { src: "/fire-hero.webp", alt: "Glowing wood embers with warm orange heat mapping through the char" },
  property: { src: "/gallagher_team_fleet.webp", alt: "Gallagher Restoration team standing with the company fleet" },
  reconstruction: { src: "/gallagher_team_fleet.webp", alt: "Gallagher Restoration team standing with the company fleet" },
};

const SLUG_HERO: Record<string, { src: string; alt: string }> = {
  "emergency-water-removal": {
    src: "/emergency-water-removal-hero.webp",
    alt: "Emergency water extraction underway in a Southern California home",
  },
  "water-damage-clean-up": {
    src: "/water-damage-clean-up-hero.webp",
    alt: "Water damage cleanup in progress inside a residential interior",
  },
  "ceiling-water-damage": {
    src: "/ceiling-water-damage-hero.webp",
    alt: "Ceiling water damage staining and sagging drywall in a home",
  },
  "water-dry-out": {
    src: "/water-dry-out-hero.webp",
    alt: "Air movers and dehumidifiers drying a water-damaged room",
  },
  "roof-water-damage": {
    src: "/roof-water-damage-hero.webp",
    alt: "Roof water damage and interior leak on a Southern California home",
  },
  "mold-remediation": {
    src: "/mold-remediation-hero.webp",
    alt: "Mold remediation containment set up inside a residential space",
  },
  "mold-inspection-services": {
    src: "/mold-inspection-hero.webp",
    alt: "Mold inspection of a residential wall cavity",
  },
  wildfire: {
    src: "/wildfire-hero.webp",
    alt: "Wildfire smoke and ash impacting a Southern California home exterior",
  },
  "property-damage-management": {
    src: "/property-damage-management-hero.webp",
    alt: "Property damage assessment and management on-site at a residence",
  },
  "fire-damage-restoration": {
    src: "/fire-damage-restoration-hero.webp",
    alt: "Fire damage restoration underway inside a Southern California home",
  },
  reconstruction: {
    src: "/reconstruction-hero.webp",
    alt: "Reconstruction of a Southern California home interior after damage remediation",
  },
  "water-damage-repair": {
    src: "/water-damage-repair-hero.webp",
    alt: "Water damage repair in progress inside a residential interior",
  },
  "water-extraction": {
    src: "/water-extraction-hero.webp",
    alt: "Truck-mount water extraction underway in a residential space",
  },
  "sewage-clean-up-services": {
    src: "/sewage-clean-up-services-hero.webp",
    alt: "Sewage cleanup and sanitation completed inside a residential space",
  },
  "wildfire-palisades": {
    src: "/wildfire-palisades-hero.webp",
    alt: "Pacific Palisades neighborhood in the recovery phase after a wildfire",
  },
  "water-damage-remediation": {
    src: "/water-damage-remediation-hero.webp",
    alt: "Water damage remediation tools and documentation laid out in an editorial flat-lay",
  },
  "pipe-burst-flooding-and-remediation": {
    src: "/pipe-burst-flooding-and-remediation-hero.webp",
    alt: "Modern Southern California home entry at dawn with water seeping from a burst interior pipe",
  },
  "smoke-clean-up": {
    src: "/smoke-clean-up-hero.webp",
    alt: "Homeowner inspecting a freshly cleaned family photograph after smoke damage restoration",
  },
  "mold-testing-services": {
    src: "/mold-testing-services-hero.webp",
    alt: "Thermal imaging camera revealing hidden moisture behind a residential wall during mold testing",
  },
  "wildfire-altadena": {
    src: "/wildfire-altadena-hero.webp",
    alt: "Modern Altadena hillside home intact at blue hour after a wildfire event",
  },
};

function findParentSlug(slug: string): string | undefined {
  for (const cat of SERVICE_CATEGORIES) {
    if (cat.slug === slug) return undefined;
    if (cat.leaves.some((l) => l.slug === slug)) return cat.slug;
  }
  return undefined;
}

function labelForSlug(slug: string): string {
  for (const cat of SERVICE_CATEGORIES) {
    if (cat.slug === slug) return cat.title;
    const leaf = cat.leaves.find((l) => l.slug === slug);
    if (leaf) return leaf.label;
  }
  return slug;
}

export async function ServicePage({ content }: { content: ServiceContent }) {
  const { ratingValue, reviewCount } = await getGoogleReviews();
  const parentSlug = content.parentSlug ?? findParentSlug(content.slug);
  const parentTitle = parentSlug
    ? SERVICE_CATEGORIES.find((c) => c.slug === parentSlug)?.title ?? "Services"
    : null;
  const categoryLabel = CATEGORY_LABEL[content.category];
  const hero = SLUG_HERO[content.slug] ?? CATEGORY_HERO[content.category];

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    ...(parentSlug && parentTitle
      ? [{ label: parentTitle, href: `/${parentSlug}` }]
      : []),
    { label: content.heroTitle },
  ];

  const isHub = SERVICE_CATEGORIES.some((c) => c.slug === content.slug);
  const hubCategory = isHub
    ? SERVICE_CATEGORIES.find((c) => c.slug === content.slug)
    : null;
  const hubLeaves = hubCategory
    ? hubCategory.leaves
        .filter((l) => l.slug !== content.slug)
        .map((l) => ({ slug: l.slug, label: l.label, exists: Boolean(SERVICE_CONTENT[l.slug]) }))
        .filter((r) => r.exists)
    : [];

  const related = content.relatedServices
    .map((s) => ({ slug: s, label: labelForSlug(s), exists: Boolean(SERVICE_CONTENT[s]) }))
    .filter((r) => r.exists);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.heroTitle,
    serviceType: labelForSlug(content.slug),
    category: `${categoryLabel} Damage Restoration`,
    provider: {
      "@type": "EmergencyService",
      "@id": "https://gallagherrestoration.com/#business",
      name: COMPANY.name,
      telephone: PHONE.display,
      url: "https://gallagherrestoration.com",
      sameAs: SOCIAL_URLS,
      address: {
        "@type": "PostalAddress",
        streetAddress: "31672 Railroad Canyon Rd",
        addressLocality: "Canyon Lake",
        addressRegion: "CA",
        postalCode: "92587",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: HQ_COORDS[0],
        longitude: HQ_COORDS[1],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Riverside County" },
      { "@type": "AdministrativeArea", name: "San Bernardino County" },
      { "@type": "AdministrativeArea", name: "Orange County" },
      { "@type": "AdministrativeArea", name: "San Diego County" },
      { "@type": "AdministrativeArea", name: "Los Angeles County" },
    ],
    description: content.metaDescription,
    url: `https://gallagherrestoration.com/${content.slug}`,
  };

  const faqJsonLd = content.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://gallagherrestoration.com/${content.slug}#faqpage`,
        url: `https://gallagherrestoration.com/${content.slug}`,
        inLanguage: "en-US",
        datePublished: "2026-08-18",
        dateModified: "2026-08-18",
        about: { "@id": "https://gallagherrestoration.com/#business" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
        crumbs={crumbs}
        backgroundImage={hero.src}
        backgroundAlt={hero.alt}
        subtleBackground
      />

      <TrustMarks />

      {content.crossLinks && content.crossLinks.length > 0 ? (
        <section className="border-b border-[rgba(255,255,255,0.07)] bg-[#0B0C0B]">
          <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-[clamp(14px,2vw,28px)] px-[clamp(20px,5vw,56px)] py-[clamp(18px,2.4vw,30px)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
              Looking for something else?
            </span>
            <div className="flex flex-wrap gap-[10px]">
              {content.crossLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-[10px] border border-[rgba(255,255,255,0.09)] bg-[#121413] px-[16px] py-[10px] text-[14px] leading-tight text-[#C6CABF] transition-colors hover:border-[#8ECE34] hover:text-[#F4F5F1]"
                >
                  <span className="font-medium">{link.label}</span>
                  {link.note ? (
                    <span className="hidden text-[12px] text-[#8F948A] sm:inline">
                      &mdash; {link.note}
                    </span>
                  ) : null}
                  <span className="font-mono text-[#8ECE34]">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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

      {/* What it is */}
      <section className="bg-[#0B0C0B] py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.whatItIs.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.whatItIs.heading}
              </h2>
              <div className="mt-auto pt-10">
                <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                  24/7 &middot; Same-day response across SoCal
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.whatItIs.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>{content.process.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              {content.process.heading}
            </h2>
          </Reveal>

          <div className="mt-[clamp(36px,4.5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(18px,2vw,26px)]">
            {content.process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div
                  id={`step-${i + 1}`}
                  className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)]"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {step.kicker}
                  </div>
                  <h3 className="mt-5 text-[clamp(19px,1.7vw,23px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#F4F5F1]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#9CA098] text-pretty">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signs / When to call */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>{content.signs.eyebrow}</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  {content.signs.heading}
                </h2>
              </div>
              {content.signs.intro ? (
                <p className="max-w-[54ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {content.signs.intro}
                </p>
              ) : null}
            </div>
          </Reveal>

          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[clamp(18px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-3">
            {content.signs.items.map((item, i) => (
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
            <Reveal delay={content.signs.items.length * 60}>
              <a
                href={PHONE.href}
                className="group flex h-full flex-col justify-between border-l-2 border-[#8ECE34] bg-[radial-gradient(90%_120%_at_100%_0%,rgba(142,206,52,0.12),transparent_70%)] p-[clamp(22px,2.4vw,32px)] transition-colors hover:bg-[#121413]"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  Not sure?
                </div>
                <h3 className="mt-5 text-[clamp(17px,1.5vw,21px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F1]">
                  Call {PHONE.display} &mdash; we&apos;ll tell you if it&rsquo;s an emergency.
                </h3>
                <span className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                  Call now &rarr;
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_78%_0%,rgba(142,206,52,0.08),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>{content.whyUs.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.whyUs.heading}
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
              {content.whyUs.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Reveal>
              <div className="flex h-full flex-col">
                <Eyebrow>{content.pricing.eyebrow}</Eyebrow>
                <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  {content.pricing.heading}
                </h2>
                <div className="mt-auto pt-10">
                  <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                  <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ECE34]">
                    Insurance-Billed &middot; No Deductible Games
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
                {content.pricing.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hub sub-services (only on hub pages) */}
      {isHub && hubLeaves.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(56px,7vw,104px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-8">
                <div>
                  <Eyebrow>{hubCategory?.kicker} Services</Eyebrow>
                  <h2 className="mt-6 max-w-[24ch] text-[clamp(26px,3.2vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
                    Every {hubCategory?.kicker.toLowerCase()} service under one crew.
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
                >
                  All services &rarr;
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(14px,1.6vw,20px)]">
              {hubLeaves.map((r, i) => (
                <Reveal key={r.slug} delay={i * 50}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full flex-col justify-between border border-[rgba(255,255,255,0.13)] bg-[#121413] p-5 transition-colors hover:border-[#8ECE34]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[10px] block h-[1px] w-[14px] flex-none bg-[#8ECE34]"
                      />
                      <span className="text-[15px] font-medium leading-[1.35] text-[#D4D8CE] transition-colors group-hover:text-[#F4F5F1]">
                        {r.label}
                      </span>
                    </div>
                    <span className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                      Learn more &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related services */}
      {!isHub && related.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(48px,6vw,88px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-7">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    Related Services
                  </div>
                  <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                    Also handled by the same crew
                  </h3>
                </div>
                <Link
                  href="/services"
                  className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
                >
                  All services &rarr;
                </Link>
              </div>
            </Reveal>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(14px,1.6vw,20px)]">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 60}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full items-center gap-4 border border-[rgba(255,255,255,0.13)] p-5 transition-colors hover:border-[#8ECE34]"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-[1px] w-[14px] bg-[#8ECE34]"
                    />
                    <span className="text-[14px] font-medium text-[#D4D8CE] transition-colors group-hover:text-[#8ECE34]">
                      {r.label}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Per-service FAQs */}
      {content.faqs.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <Eyebrow>Frequently Asked</Eyebrow>
              <h2 className="mt-6 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                {content.heroTitle}
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
