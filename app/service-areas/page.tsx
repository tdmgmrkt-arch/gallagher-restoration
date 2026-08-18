import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { COUNTIES, CITIES_BY_COUNTY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Gallagher Restoration Co.",
  description:
    "Emergency restoration coverage across Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties. Crews on-site within 60 minutes, 24/7.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Southern California Coverage"
        title="Service Areas Across"
        accent="5 Counties"
        intro="Gallagher Restoration is headquartered in Canyon Lake and dispatches 24/7 across Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties. Wherever the damage is, we can be on site within 60 minutes."
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        backgroundImage="/service-areas-hero.webp"
        backgroundAlt="Gallagher Restoration fleet lined up at Canyon Lake headquarters at dusk"
        backgroundPosition="center 55%"
      />

      <section className="bg-[#0B0C0B] pb-[clamp(48px,6vw,88px)] pt-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {COUNTIES.map((c, i) => (
                <Link
                  key={c.index}
                  href={`/${c.slug}`}
                  className={[
                    "group block h-full px-[clamp(20px,2.2vw,32px)] py-[clamp(28px,3vw,44px)] text-[#F4F5F1]",
                    "border-b border-[rgba(255,255,255,0.09)]",
                    i < COUNTIES.length - 1 ? "border-r border-[rgba(255,255,255,0.09)]" : "",
                    "transition-[background-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
                    "hover:-translate-y-1 hover:bg-[rgba(142,206,52,0.06)]",
                  ].join(" ")}
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#8ECE34]">
                    {c.index}
                  </span>
                  <div className="mt-[22px] text-[clamp(19px,1.8vw,24px)] font-bold leading-[1.15] tracking-[-0.025em]">
                    {c.name}
                    <br />
                    {c.second}
                  </div>
                  <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                    {CITIES_BY_COUNTY[c.slug]?.length ?? 0} Cities Served
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="flex flex-col gap-[clamp(56px,7vw,96px)]">
            {COUNTIES.map((c) => {
              const cities = CITIES_BY_COUNTY[c.slug] ?? [];
              return (
                <div key={c.slug} id={c.slug} className="scroll-mt-[120px]">
                  <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.1)] pb-8">
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                          County {c.index}
                        </div>
                        <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
                          {c.name} {c.second}
                        </h2>
                      </div>
                      <p className="max-w-[42ch] text-[15px] leading-[1.7] text-[#8F948A] text-pretty">
                        24/7 emergency response and full restoration services throughout {c.name}{" "}
                        {c.second}.
                      </p>
                    </div>
                  </Reveal>

                  <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                    {cities.map((city, i) => {
                      const isHq = "isHq" in city && city.isHq;
                      return (
                        <Reveal key={city.slug} delay={(i % 4) * 60}>
                          <Link
                            href={`/${city.slug}`}
                            className={[
                              "group flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.07)] px-3 py-5 text-[15px] transition-colors",
                              "hover:bg-[rgba(142,206,52,0.05)]",
                            ].join(" ")}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className="block h-[5px] w-[5px] shrink-0 bg-[#8ECE34]"
                                aria-hidden="true"
                              />
                              <span className="text-[#D4D8CE] transition-colors group-hover:text-[#F4F5F1]">
                                {city.name}
                              </span>
                              {isHq ? (
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8ECE34]">
                                  HQ
                                </span>
                              ) : null}
                            </span>
                            <span className="font-mono text-[11px] text-[#5E635B] transition-colors group-hover:text-[#8ECE34]">
                              &rarr;
                            </span>
                          </Link>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
