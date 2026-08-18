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
      <div className="relative mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
        <Reveal>
          <div>
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
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-[rgba(255,255,255,0.1)] bg-[#121413] p-[clamp(26px,3.2vw,44px)]">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
