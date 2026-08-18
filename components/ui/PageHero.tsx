import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  crumbs,
  backgroundImage,
  backgroundAlt,
  backgroundPosition = "center",
  subtleBackground = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  crumbs?: Crumb[];
  backgroundImage?: string;
  backgroundAlt?: string;
  backgroundPosition?: string;
  subtleBackground?: boolean;
}) {
  const breadcrumbJsonLd =
    crumbs && crumbs.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href
              ? {
                  item: c.href.startsWith("http")
                    ? c.href
                    : `https://gallagherrestoration.com${c.href === "/" ? "" : c.href}`,
                }
              : {}),
          })),
        }
      : null;

  return (
    <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.07)] bg-[#08090A]">
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={backgroundAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className={
            subtleBackground
              ? "absolute inset-0 object-cover [filter:saturate(0.9)_contrast(1.05)]"
              : "absolute inset-0 object-cover [filter:saturate(0.85)_contrast(1.05)_brightness(0.85)]"
          }
          style={{ objectPosition: backgroundPosition }}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_15%_35%,rgba(142,206,52,0.10),transparent_72%)]" />
      <div
        className={
          backgroundImage
            ? subtleBackground
              ? "pointer-events-none absolute inset-0 bg-[linear-gradient(98deg,rgba(8,9,8,0.85)_0%,rgba(8,9,8,0.62)_38%,rgba(8,9,8,0.18)_70%,rgba(8,9,8,0.32)_100%)]"
              : "pointer-events-none absolute inset-0 bg-[linear-gradient(98deg,rgba(8,9,8,0.94)_0%,rgba(8,9,8,0.82)_38%,rgba(8,9,8,0.55)_70%,rgba(8,9,8,0.75)_100%)]"
            : "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.9)_0%,rgba(8,9,8,0.7)_40%,#0B0C0B_100%)]"
        }
      />
      {backgroundImage ? (
        <div
          className={
            subtleBackground
              ? "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.35)_0%,rgba(8,9,8,0)_30%,rgba(8,9,8,0.25)_75%,#0B0C0B_100%)]"
              : "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.55)_0%,rgba(8,9,8,0)_30%,rgba(8,9,8,0.45)_75%,#0B0C0B_100%)]"
          }
        />
      ) : null}
      <div className="relative mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] pb-[clamp(56px,7vw,96px)] pt-[clamp(88px,11vw,160px)]">
        {crumbs && crumbs.length > 0 ? (
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]"
            >
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <span key={`${c.label}-${i}`} className="flex items-center gap-[10px]">
                    {c.href && !isLast ? (
                      <Link href={c.href} className="transition-colors hover:text-[#8ECE34]">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-[#C6CABF]" : ""}>{c.label}</span>
                    )}
                    {!isLast ? <span className="text-[#3F4340]">/</span> : null}
                  </span>
                );
              })}
            </nav>
          </Reveal>
        ) : null}

        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(38px,5.6vw,74px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
            {title}
            {accent ? <span className="text-[#8ECE34]"> {accent}</span> : null}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={160}>
            <p className="mt-8 max-w-[64ch] text-[clamp(16px,1.3vw,19px)] leading-[1.7] text-[#C2C6BC] text-pretty">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
