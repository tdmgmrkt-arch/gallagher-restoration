import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Buttons";

export function WildfireBanner() {
  return (
    <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,110px)]">
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        <Reveal>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(28px,4vw,56px)] border border-[rgba(255,255,255,0.09)] bg-[linear-gradient(120deg,#131614_0%,#101210_55%,rgba(142,206,52,0.08)_100%)] p-[clamp(32px,5vw,64px)]">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8ECE34]" aria-hidden="true" />
            <div>
              <Eyebrow>24/7 Wildfire Damage Assistance</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-[clamp(28px,3.4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
                Protect Your Home from Wildfires. We&apos;re Here to Help, 24/7.
              </h2>
            </div>
            <div>
              <p className="max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-[1.75] text-[#9CA098] text-pretty">
                When wildfire threatens your property, Gallagher Restoration is ready to respond. Our experienced restoration team provides fast, professional assistance to help protect and restore your home.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3">
                <ButtonPrimary href="/wildfire" size="md">Learn More</ButtonPrimary>
                <ButtonGhost href="tel:9515410034">Call Now</ButtonGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
