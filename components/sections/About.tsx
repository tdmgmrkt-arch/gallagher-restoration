import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonGhost } from "@/components/ui/Buttons";

export function About() {
  return (
    <section id="about" className="bg-[#0B0C0B] py-[clamp(72px,9vw,132px)]">
      <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
        <Reveal>
          <div className="group relative">
            <div className="absolute -left-[14px] -top-[14px] h-[120px] w-[120px] border-l-2 border-t-2 border-[#8ECE34]" aria-hidden="true" />
            <div className="relative overflow-hidden bg-[#121413]">
              <Image
                src="/gallagher_family.webp"
                alt="The Gallagher family in front of a company van"
                width={1200}
                height={1500}
                sizes="(min-width: 980px) 50vw, 100vw"
                className="block aspect-[4/5] w-full object-cover object-[center_22%] [filter:saturate(0.9)_contrast(1.04)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute -bottom-[14px] -right-[14px] h-[120px] w-[120px] border-b-2 border-r-2 border-[#8ECE34]" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>Family. Loyalty. Respect.</Eyebrow>
            <h2 className="mt-[22px] text-[clamp(34px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.04em]">
              Gallagher Restoration Co.
            </h2>
            <p className="mt-[26px] max-w-[52ch] text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#C2C6BC] text-pretty">
              This is Gallagher Restoration, where our commitment to excellence sets us apart in the restoration industry.
            </p>
            <p className="mt-4 max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-[1.75] text-[#8F948A] text-pretty">
              With a legacy built on family, loyalty, and respect, we have established a reputation for reliability when Southern California homeowners need help most.
            </p>
            <div className="mt-9">
              <ButtonGhost href="/about">About Gallagher Restoration</ButtonGhost>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
