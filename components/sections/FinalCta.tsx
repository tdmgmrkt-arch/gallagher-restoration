import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { LeadForm } from "@/components/sections/LeadForm";
import { PHONE } from "@/lib/site";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,140px)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_22%_100%,rgba(142,206,52,0.13),transparent_72%)]" />
      <div className="relative mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
        <Reveal className="h-full">
          <div className="flex h-full flex-col">
            <Eyebrow pulse>Available 24 Hours a Day, 7 Days a Week</Eyebrow>
            <h2 className="mt-6 max-w-[16ch] text-[clamp(32px,4.6vw,62px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
              Property Damage? Gallagher Restoration Is Ready to Help.
            </h2>
            <p className="mt-[26px] max-w-[50ch] text-[clamp(15px,1.25vw,18px)] leading-[1.75] text-[#9CA098] text-pretty">
              When water, fire, mold, or another emergency damages your property, getting professional help quickly matters. Contact Gallagher Restoration for fast, experienced restoration services throughout Southern California.
            </p>
            <div className="mt-9">
              <ButtonPrimary href={PHONE.href} size="lg" dot>
                Call Now: {PHONE.display}
              </ButtonPrimary>
            </div>

            <div className="relative mt-[clamp(28px,3.4vw,40px)] hidden min-h-[240px] flex-1 overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] md:block">
              <Image
                src="/gallagher-cs-rep.webp"
                alt="Gallagher Restoration customer service representative answering the 24/7 emergency line"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[center_30%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,12,11,0.7)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-[clamp(20px,2.4vw,32px)]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    A Real Person, 24/7
                  </div>
                  <p className="mt-2 max-w-[28ch] text-[15px] leading-[1.55] font-medium text-[#F4F5F1] text-pretty">
                    Every call answered by our team &mdash; never a machine, never outsourced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="h-full">
          <div className="h-full border border-[rgba(255,255,255,0.1)] bg-[#121413] p-[clamp(26px,3.2vw,44px)]">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
