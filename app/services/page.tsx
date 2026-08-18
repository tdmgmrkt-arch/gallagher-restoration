import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { SERVICE_CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restoration Services | Gallagher Restoration Co.",
  description:
    "Water, fire, mold, wildfire, sewage, and property damage restoration across Southern California. 24/7 emergency response, on-site within 60 minutes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Full Service Catalog"
        title="Restoration Services for"
        accent="Every Emergency"
        intro="From the first phone call to the final restored surface, Gallagher Restoration handles water, fire, mold, wildfire, sewage, and full property damage recovery across Southern California."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        backgroundImage="/services-hero.webp"
        backgroundAlt="Gallagher Restoration staging bay with service van and restoration equipment at dusk"
        backgroundPosition="center 60%"
      />

      <section className="bg-[#0B0C0B] py-[clamp(56px,7vw,110px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 gap-[clamp(20px,2.4vw,32px)]">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 80}>
                <article className="group grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] border border-[rgba(255,255,255,0.09)] bg-[#121413] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:border-[rgba(142,206,52,0.35)]">
                  <div className="border-b border-[rgba(255,255,255,0.07)] p-[clamp(28px,3.4vw,52px)] lg:border-b-0 lg:border-r">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                      {cat.kicker}
                    </div>
                    <h2 className="mt-[22px] max-w-[22ch] text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.12] tracking-[-0.03em]">
                      {cat.title}
                    </h2>
                    <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-[#9CA098] text-pretty">
                      {cat.summary}
                    </p>
                    <Link
                      href={`/${cat.slug}`}
                      className="mt-8 inline-flex items-center gap-[10px] font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
                    >
                      Explore {cat.kicker}
                      <span className="transition-transform duration-300 group-hover:translate-x-[6px]">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] content-start gap-x-[clamp(20px,3vw,40px)] p-[clamp(28px,3.4vw,52px)]">
                    {cat.leaves.map((leaf, j) => {
                      const isLast = j === cat.leaves.length - 1;
                      return (
                        <Link
                          key={leaf.slug}
                          href={`/${leaf.slug}`}
                          className={[
                            "flex items-center gap-3 py-[13px] text-[15px] text-[#D4D8CE] transition-colors hover:text-[#8ECE34]",
                            isLast ? "" : "border-b border-[rgba(255,255,255,0.07)]",
                          ].join(" ")}
                        >
                          <span
                            className="block h-[5px] w-[5px] shrink-0 bg-[#8ECE34]"
                            aria-hidden="true"
                          />
                          {leaf.label}
                        </Link>
                      );
                    })}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
