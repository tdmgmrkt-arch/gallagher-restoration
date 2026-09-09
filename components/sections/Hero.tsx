import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Buttons";
import { GoogleReviewBadge } from "@/components/ui/GoogleReviewBadge";

const STATS = [
  { value: "15", suffix: "+", label: "Years in Southern California" },
  { value: "60", suffix: "min", label: "On-Site Response Time" },
  { value: "24", suffix: "/7", label: "Emergency Availability" },
  { value: "5", suffix: "", label: "Counties Serviced" },
];

export function Hero() {
  return (
    <section id="top" className="relative bg-[#08090A]">
      {/* The background is scoped to this band, NOT the whole section — when it
          spanned the stats strip too, the extra height forced a much tighter
          crop and pushed the subject down out of the content's sightline. */}
      <div className="relative overflow-hidden">
      <Parallax
        factor={0.08}
        className="absolute -top-[5%] -bottom-[8%] left-0 right-0"
      >
        {/* Art-directed: cropping the 16:9 plate down to phone aspect zooms past
            the point where the crew and van read, so small screens get a purpose-
            shot 9:16 plate whose blank upper wall sits behind the copy.
            <picture> (not next/image) so only one of the two is ever fetched. */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/gallagher-alt-hero-3.webp" />
          <img
            src="/gallagher-mobile-hero.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_center] [filter:saturate(1)_contrast(1.02)_brightness(0.98)] md:object-[100%_70%] md:[filter:saturate(1)_contrast(1.01)_brightness(0.94)]"
          />
        </picture>
      </Parallax>
      {/* Desktop scrim runs left-to-right (text column is left, subject is right).
          On phones the text spans the full width, so a horizontal scrim would black
          out the subject — small screens get a top-down scrim instead. */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(8,9,8,0.90)_0%,rgba(8,9,8,0.87)_22%,rgba(8,9,8,0.82)_44%,rgba(8,9,8,0.60)_60%,rgba(8,9,8,0.28)_78%,rgba(8,9,8,0.15)_100%)] md:block" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.95)_0%,rgba(8,9,8,0.93)_52%,rgba(8,9,8,0.74)_64%,rgba(8,9,8,0.26)_78%,rgba(8,9,8,0)_90%)] md:hidden" />
      {/* Bottom blend into the stats strip. Mobile keeps it shallow so it doesn't
          undo the lighter lower frame the crew needs to read against. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0)_0%,rgba(8,9,8,0)_84%,rgba(8,9,8,0.45)_95%,#0B0C0B_100%)] md:bg-[linear-gradient(180deg,rgba(8,9,8,0)_0%,rgba(8,9,8,0)_80%,rgba(8,9,8,0.30)_93%,rgba(8,9,8,0.62)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_15%_92%,rgba(142,206,52,0.12),transparent_72%)]" />

      {/* Phones anchor the copy to the TOP of the band so it lands on the blank
          upper wall of the portrait plate and leaves the lower frame to the crew.
          Desktop keeps the original bottom-anchored composition. */}
      <div className="relative mx-auto flex min-h-[clamp(600px,80vh,860px)] max-w-[1300px] flex-col justify-start px-[clamp(20px,5vw,56px)] pb-[clamp(48px,6vh,80px)] pt-[64px] md:justify-end md:pt-[clamp(72px,11vh,132px)]">
        <div className="max-w-[680px]">
          <Reveal>
            <Eyebrow>Immediate Response &middot; Experienced Team &middot; Peace of Mind</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-[22px] max-w-[15ch] text-[clamp(38px,5.4vw,72px)] font-extrabold leading-[1.0] tracking-[-0.035em] text-balance">
              Water &amp; Fire Damage <span className="text-[#8ECE34]">Restoration</span> Company
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-[24px] max-w-[54ch] text-[clamp(15px,1.35vw,19px)] leading-[1.65] text-[#C2C6BC] text-pretty md:hidden">
              Family-owned water, fire &amp; mold restoration. Available 24/7 across Southern California. On-site within 60 minutes.
            </p>
            <p className="mt-[24px] hidden max-w-[54ch] text-[clamp(15px,1.35vw,19px)] leading-[1.65] text-[#C2C6BC] text-pretty md:block">
              Gallagher Restoration Co. is a family-owned 24/7 water, fire, and mold damage restoration company serving Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties for over 15 years. Our crews arrive on-site within 60 minutes and bill your insurance directly.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-[12px] max-w-[54ch] text-[clamp(15px,1.35vw,18px)] leading-[1.65] text-[#9CA098] text-pretty">
              Emergency dispatch is answered by a real person day and night&mdash;never a call center.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-[32px] flex flex-wrap gap-[14px]">
              <ButtonPrimary href="tel:9515410034" size="lg" dot>
                Call Now
              </ButtonPrimary>
              <ButtonGhost href="/services">View Our Services</ButtonGhost>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-[22px]">
              <GoogleReviewBadge variant="hero" />
            </div>
          </Reveal>
        </div>
      </div>
      </div>

      <div className="relative border-t border-[rgba(255,255,255,0.09)] bg-[rgba(8,9,8,0.55)] backdrop-blur-[8px]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] px-[clamp(20px,5vw,56px)]">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={[
                "py-[clamp(24px,3vw,38px)] pr-6",
                i === 0 ? "" : "pl-[clamp(0px,2vw,32px)]",
                i < STATS.length - 1 ? "border-r border-[rgba(255,255,255,0.07)]" : "",
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
  );
}
