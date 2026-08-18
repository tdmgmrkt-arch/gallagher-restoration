import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { COMPANY, PHONE, SERVICE_CATEGORIES } from "@/lib/site";
import type { ServiceContent } from "@/lib/service-content";
import { SERVICE_CONTENT } from "@/lib/service-content";

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

export function ServicePage({ content }: { content: ServiceContent }) {
  const parentSlug = content.parentSlug ?? findParentSlug(content.slug);
  const parentTitle = parentSlug
    ? SERVICE_CATEGORIES.find((c) => c.slug === parentSlug)?.title ?? "Services"
    : null;
  const categoryLabel = CATEGORY_LABEL[content.category];

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    ...(parentSlug && parentTitle
      ? [{ label: parentTitle, href: `/${parentSlug}` }]
      : []),
    { label: content.heroTitle },
  ];

  const related = content.relatedServices
    .map((s) => ({ slug: s, label: labelForSlug(s), exists: Boolean(SERVICE_CONTENT[s]) }))
    .filter((r) => r.exists);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.heroTitle,
    serviceType: `${categoryLabel} Damage Restoration`,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      telephone: PHONE.display,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Canyon Lake",
        addressRegion: "CA",
        addressCountry: "US",
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
        backgroundImage={CATEGORY_HERO[content.category].src}
        backgroundAlt={CATEGORY_HERO[content.category].alt}
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

      {/* What it is */}
      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>{content.whatItIs.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              {content.whatItIs.heading}
            </h2>
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
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)]">
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

          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(18px,2vw,26px)]">
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
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_78%_0%,rgba(142,206,52,0.08),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>{content.whyUs.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              {content.whyUs.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[16px] leading-[1.8] text-[#C2C6BC] text-pretty">
              {content.whyUs.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)]">
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
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 ? (
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
          <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,56px)]">
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
      <Faq hideHeader />
      <FinalCta />
    </>
  );
}
