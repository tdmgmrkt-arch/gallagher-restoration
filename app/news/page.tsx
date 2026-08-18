import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Resources | Gallagher Restoration Co.",
  description:
    "Restoration guides, seasonal preparation tips, and the story behind Gallagher Restoration — a Southern California family-owned restoration company.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="News & Resources"
        title="Restoration Guides,"
        accent="Straight from the Crew"
        intro="Practical guides on water, fire, mold, and seasonal preparation — plus the stories and people behind Gallagher Restoration."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
        backgroundImage="/news-hero.webp"
        backgroundAlt="Gallagher Restoration crew member reviewing damage documentation at dusk"
        backgroundPosition="center 48%"
      />

      <section className="bg-[#0B0C0B] py-[clamp(56px,7vw,110px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Link
              href={`/news/${featured.slug}`}
              className="group grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] border border-[rgba(255,255,255,0.09)] bg-[#121413] transition-[border-color] duration-[400ms] hover:border-[rgba(142,206,52,0.35)]"
            >
              <div className="relative overflow-hidden bg-[#0E100E]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={1200}
                  height={800}
                  sizes="(min-width: 980px) 50vw, 100vw"
                  className="block aspect-[16/10] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-[clamp(28px,3.4vw,52px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  Featured &middot; {featured.category}
                </div>
                <h2 className="mt-6 max-w-[24ch] text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-[#9CA098] text-pretty">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-[10px] font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                  Read the article
                  <span className="transition-transform duration-300 group-hover:translate-x-[6px]">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-[clamp(28px,3.4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/news/${p.slug}`}
                  className="group flex h-full flex-col border-t border-[rgba(255,255,255,0.14)] py-[26px] text-[#F4F5F1] transition-colors duration-[400ms] hover:border-[#8ECE34]"
                >
                  <div className="mb-6 overflow-hidden bg-[#121413]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={800}
                      height={450}
                      sizes="(min-width: 980px) 33vw, 100vw"
                      className="block aspect-[16/9] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {p.category}
                  </div>
                  <h3 className="mt-4 max-w-[26ch] text-[clamp(19px,1.8vw,23px)] font-bold leading-[1.25] tracking-[-0.025em]">
                    {p.title}
                  </h3>
                  <p className="mt-[14px] text-[15px] leading-[1.7] text-[#9CA098] text-pretty">
                    {p.excerpt}
                  </p>
                  <span className="mt-auto pt-[26px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]">
                    Read More &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
