import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Buttons";

const STATS = [
  { value: "15", suffix: "+", label: "Years in Southern California" },
  { value: "60", suffix: "min", label: "On-Site Response Time" },
  { value: "24", suffix: "/7", label: "Emergency Availability" },
  { value: "5", suffix: "", label: "Counties Serviced" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#08090A]">
      <Parallax
        factor={0.14}
        className="absolute -top-[8%] -bottom-[14%] left-0 right-0"
      >
        <video
          src="/gallagher-hero-vid-2.webm"
          poster="/gallagher_fleet_rear.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_75%] [filter:saturate(0.75)_contrast(1.08)_brightness(0.62)]"
        />
      </Parallax>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(98deg,rgba(8,9,8,0.85)_0%,rgba(8,9,8,0.7)_28%,rgba(8,9,8,0.35)_52%,rgba(8,9,8,0)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.35)_0%,rgba(8,9,8,0)_22%,rgba(8,9,8,0)_62%,rgba(8,9,8,0.6)_92%,#0B0C0B_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_15%_92%,rgba(142,206,52,0.12),transparent_72%)]" />

      <div className="relative mx-auto flex min-h-[clamp(600px,80vh,860px)] max-w-[1300px] flex-col justify-end px-[clamp(20px,5vw,56px)] pb-[clamp(48px,6vh,80px)] pt-[clamp(72px,11vh,132px)]">
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
            <p className="mt-[24px] max-w-[54ch] text-[clamp(15px,1.2vw,18px)] leading-[1.65] text-[#C2C6BC] text-pretty">
              Gallagher Restoration Co. is a family-owned 24/7 water, fire, and mold damage restoration company serving Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties for over 15 years. Our crews arrive on-site within 60 minutes and bill your insurance directly.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-[12px] max-w-[54ch] text-[clamp(14px,1.1vw,16px)] leading-[1.65] text-[#9CA098] text-pretty">
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
