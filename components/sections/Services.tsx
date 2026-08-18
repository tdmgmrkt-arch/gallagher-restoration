import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PHONE, SERVICE_CATEGORIES } from "@/lib/site";

const WATER = SERVICE_CATEGORIES.find((c) => c.slug === "water-damage-restoration")!;
const FIRE = SERVICE_CATEGORIES.find((c) => c.slug === "fire-damage-restoration")!;
const MOLD = SERVICE_CATEGORIES.find((c) => c.slug === "mold-remediation")!;
const SEWAGE = SERVICE_CATEGORIES.find((c) => c.slug === "sewage-clean-up-services")!;
const PROPERTY = SERVICE_CATEGORIES.find((c) => c.slug === "property-damage-management")!;
const RECON = SERVICE_CATEGORIES.find((c) => c.slug === "reconstruction")!;

type Leaf = { slug: string; label: string };

function LeafLink({ leaf }: { leaf: Leaf }) {
  return (
    <Link
      href={`/${leaf.slug}`}
      className="group/leaf flex items-center justify-between gap-3 border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] px-4 py-[13px] text-[14px] text-[#D4D8CE] transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:border-[rgba(142,206,52,0.4)] hover:bg-[rgba(142,206,52,0.06)] hover:text-[#F4F5F1]"
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block h-[5px] w-[5px] shrink-0 bg-[#8ECE34] transition-transform duration-[300ms] group-hover/leaf:scale-150"
        />
        {leaf.label}
      </span>
      <span
        aria-hidden="true"
        className="translate-x-[-4px] text-[#5E635B] opacity-0 transition-all duration-[300ms] group-hover/leaf:translate-x-0 group-hover/leaf:text-[#8ECE34] group-hover/leaf:opacity-100"
      >
        →
      </span>
    </Link>
  );
}

function LearnMore({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-[10px] font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
    >
      Explore This Service
      <span className="transition-transform duration-300 group-hover:translate-x-[6px]">→</span>
    </Link>
  );
}

function TopAccentBar() {
  return (
    <span className="absolute left-0 top-0 h-[2px] w-12 bg-[#8ECE34] transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:w-full" />
  );
}

function LowProfileCard({
  cat,
  index,
}: {
  cat: { slug: string; title: string; kicker: string; summary: string };
  index: string;
}) {
  return (
    <Link
      href={`/${cat.slug}`}
      className="group relative flex h-full items-start gap-5 overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.015)] p-[clamp(24px,2.6vw,36px)] transition-[background-color,border-color,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-1 hover:border-[rgba(142,206,52,0.4)] hover:bg-[rgba(142,206,52,0.04)]"
    >
      <TopAccentBar />
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8ECE34]">
          {index}
        </span>
        <span
          aria-hidden="true"
          className="block h-[10px] w-[10px] bg-[#8ECE34] transition-transform duration-[350ms] group-hover:rotate-45"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[clamp(18px,1.7vw,22px)] font-bold tracking-[-0.02em]">
            {cat.title}
          </h4>
          <span
            aria-hidden="true"
            className="mt-1 text-[#5E635B] transition-all duration-[300ms] group-hover:translate-x-1 group-hover:text-[#8ECE34]"
          >
            →
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-[1.7] text-[#9CA098] text-pretty">
          {cat.summary}
        </p>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,132px)]"
    >
      {/* Ambient accent glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_5%_0%,rgba(142,206,52,0.05),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-[clamp(24px,4vw,64px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <Eyebrow>What We Restore</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(36px,5vw,68px)] font-extrabold leading-none tracking-[-0.04em] text-balance">
                Our <span className="text-[#8ECE34]">Services</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-[56ch] text-[clamp(15px,1.2vw,17px)] leading-[1.75] text-[#9CA098] text-pretty">
              Our seasoned professionals are committed to swiftly and effectively mitigating the aftermath of water, fire, mold, and property damage emergencies using proven techniques and professional restoration equipment.
            </p>
          </Reveal>
        </div>

        {/* Water — hero panel */}
        <Reveal delay={60}>
          <div className="group relative mt-[clamp(40px,5vw,72px)] grid grid-cols-1 overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] transition-[border-color,box-shadow] duration-[400ms] hover:border-[rgba(142,206,52,0.35)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <TopAccentBar />

            <div className="border-b border-[rgba(255,255,255,0.07)] p-[clamp(28px,3.6vw,56px)] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                  <span className="block h-2 w-2 bg-[#8ECE34]" />
                  {WATER.kicker}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5E635B]">
                  01 / 06
                </span>
              </div>
              <h3 className="mt-[22px] max-w-[20ch] text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance">
                Water damage restoration is a{" "}
                <span className="text-[#8ECE34]">time-sensitive</span> process.
              </h3>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-[#9CA098] text-pretty">
                Delays can lead to secondary issues such as mold growth, structural damage, and additional property loss.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-[rgba(255,255,255,0.07)] pt-6">
                <span
                  aria-hidden="true"
                  className="gr-pulse block h-[9px] w-[9px] rounded-full bg-[#8ECE34]"
                />
                <Link
                  href={PHONE.href}
                  className="text-[14px] font-semibold text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
                >
                  Water emergency? Call{" "}
                  <span className="font-mono tracking-[0.02em] text-[#8ECE34]">
                    {PHONE.display}
                  </span>
                </Link>
              </div>
              <div className="mt-8">
                <LearnMore href={`/${WATER.slug}`} />
              </div>
            </div>

            <div className="p-[clamp(24px,3vw,44px)]">
              <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
                {WATER.leaves.map((leaf) => (
                  <LeafLink key={leaf.slug} leaf={leaf} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Fire + Mold cards */}
        <div className="mt-[clamp(20px,2.4vw,32px)] grid grid-cols-1 gap-[clamp(20px,2.4vw,32px)] md:grid-cols-2">
          {[FIRE, MOLD].map((cat, idx) => (
            <Reveal key={cat.slug} delay={idx * 90}>
              <div className="group relative flex h-full flex-col overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(28px,3.4vw,52px)] transition-[border-color,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-1 hover:border-[rgba(142,206,52,0.35)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
                <TopAccentBar />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    <span className="block h-2 w-2 bg-[#8ECE34]" />
                    {cat.kicker}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5E635B]">
                    {String(idx + 2).padStart(2, "0")} / 06
                  </span>
                </div>
                <h3 className="mt-[22px] max-w-[22ch] text-[clamp(22px,2.2vw,30px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance">
                  {cat.title}
                </h3>
                <p className="mt-[18px] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                  {cat.summary}
                </p>
                <div className="mt-7 grid grid-cols-1 gap-[8px]">
                  {cat.leaves.map((leaf) => (
                    <LeafLink key={leaf.slug} leaf={leaf} />
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <LearnMore href={`/${cat.slug}`} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Low-profile row: Sewage / Property Damage / Reconstruction */}
        <div className="mt-[clamp(20px,2.4vw,32px)] grid grid-cols-1 gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          <Reveal>
            <LowProfileCard cat={SEWAGE} index="04" />
          </Reveal>
          <Reveal delay={80}>
            <LowProfileCard cat={PROPERTY} index="05" />
          </Reveal>
          <Reveal delay={160}>
            <LowProfileCard cat={RECON} index="06" />
          </Reveal>
        </div>

        {/* Bottom CTA rail */}
        <Reveal delay={120}>
          <div className="mt-[clamp(32px,3.4vw,48px)] flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(255,255,255,0.09)] pt-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7E837A]">
              Something else?{" "}
              <Link
                href="/services"
                className="text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
              >
                Browse the full service directory →
              </Link>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7E837A]">
              <span
                aria-hidden="true"
                className="gr-pulse block h-[7px] w-[7px] rounded-full bg-[#8ECE34]"
              />
              <Link
                href={PHONE.href}
                className="text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
              >
                24/7 emergency line ·{" "}
                <span className="text-[#8ECE34]">{PHONE.display}</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
