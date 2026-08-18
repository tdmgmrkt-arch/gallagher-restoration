import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonGhost } from "@/components/ui/Buttons";

const PROOF = [
  { value: "15", suffix: "+", label: "Years Together" },
  { value: "24", suffix: "/7", label: "On-Call Crew" },
  { value: "1", suffix: "hr", label: "On-Site Response" },
];

export function TeamBand() {
  return (
    <section className="relative overflow-hidden bg-[#08090A]">
      <Parallax factor={0.08} className="absolute -top-[8%] -bottom-[10%] left-0 right-0">
        <Image
          src="/gallagher_team_fleet.webp"
          alt="The Gallagher Restoration team and fleet"
          fill
          sizes="100vw"
          className="object-cover object-[center_62%] [filter:saturate(0.82)_contrast(1.05)_brightness(0.9)]"
        />
      </Parallax>

      {/* Original top→bottom blend that feathers into surrounding sections */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0B0C0B_0%,rgba(8,9,8,0.55)_22%,rgba(8,9,8,0.7)_58%,rgba(8,9,8,0.96)_100%)]" />
      {/* Subtle accent glow anchoring the copy */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_12%_88%,rgba(142,206,52,0.10),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[clamp(560px,74vh,780px)] max-w-[1300px] flex-col justify-end px-[clamp(20px,5vw,56px)] pb-[clamp(56px,6vw,88px)] pt-[clamp(120px,20vw,260px)]">
        <div className="max-w-[640px]">
          <Reveal>
            <Eyebrow>The Crew Behind Every Call</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-[22px] max-w-[20ch] text-[clamp(30px,4.2vw,56px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              The <span className="text-[#8ECE34]">Team</span> Behind Gallagher Restoration
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-[24px] text-[clamp(15px,1.2vw,17px)] leading-[1.75] text-[#C2C6BC] text-pretty">
              Our company is built around a diverse and dedicated team of restoration professionals, each bringing their own skills and expertise to every project.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-[14px] text-[clamp(14px,1.15vw,16px)] leading-[1.75] text-[#9CA098] text-pretty">
              From experienced leadership to our restoration crews in the field, our team is united by a shared commitment to professionalism, quality workmanship, and taking care of our customers.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-[36px] flex flex-wrap items-center gap-x-[clamp(24px,3vw,40px)] gap-y-[18px] border-t border-[rgba(255,255,255,0.09)] pt-[26px]">
              {PROOF.map((p) => (
                <div key={p.label} className="flex items-baseline gap-[10px]">
                  <div className="text-[clamp(24px,2.6vw,32px)] font-extrabold leading-none tracking-[-0.035em] text-[#F4F5F1]">
                    {p.value}
                    <span className="text-[#8ECE34]">{p.suffix}</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7E837A]">
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-[28px]">
              <ButtonGhost href="/about">Meet the team</ButtonGhost>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
