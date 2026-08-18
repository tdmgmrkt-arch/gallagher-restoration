import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY, PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Gallagher Restoration Co.",
  description:
    "Terms and conditions governing your use of the Gallagher Restoration Co. website and restoration services in Southern California.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "January 1, 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        accent="Service"
        intro={`The rules that govern your use of the ${COMPANY.name} website and the restoration services we provide.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        backgroundImage="/terms-hero.webp"
        backgroundAlt=""
      />

      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
              Effective {EFFECTIVE_DATE}
            </div>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
              {COMPANY.name} website and the restoration services we provide. By using our
              website, calling our emergency line, or engaging us to perform work, you agree
              to these Terms. If you do not agree, please do not use our website or services.
            </p>
          </Reveal>

          <LegalSection title="Scope of Services">
            <p>
              {COMPANY.name} provides emergency and scheduled restoration services including
              water damage mitigation, fire and smoke damage restoration, mold remediation,
              sewage cleanup, wildfire smoke and ash cleanup, structural drying, and
              reconstruction across Riverside, San Bernardino, Orange, San Diego, and Los
              Angeles counties in California.
            </p>
            <p>
              The specific work we perform for you will be described in a written estimate,
              scope of work, or authorization form that you sign before work begins. That
              document governs the details of your project; these Terms cover the general
              relationship.
            </p>
          </LegalSection>

          <LegalSection title="Authorization to Perform Work">
            <p>
              By signing our work authorization form or otherwise instructing us to begin
              services, you represent that you are the property owner or an authorized agent
              of the property owner, and you authorize {COMPANY.name} to perform the agreed
              scope of work.
            </p>
          </LegalSection>

          <LegalSection title="Emergency Response and Response Times">
            <p>
              We advertise a typical 60-minute crew arrival time across our core service area
              (Riverside County, western San Bernardino County, most of Orange County).
              Arrival times to farther locations in Los Angeles and San Diego counties are
              longer and honestly quoted at time of dispatch. Response times are estimates,
              not guarantees, and can be affected by traffic, weather, concurrent emergencies,
              and other factors outside our control.
            </p>
          </LegalSection>

          <LegalSection title="Estimates, Pricing, and Payment">
            <p>
              Emergency mitigation work is typically billed on a time-and-materials basis or
              per industry-standard pricing guides (such as Xactimate) used by insurance
              carriers. Reconstruction and larger projects are quoted with a written
              estimate.
            </p>
            <p>
              Payment terms are set out in your signed work authorization or estimate. Unless
              otherwise agreed in writing, invoices are due upon completion of work.
              Overdue balances may accrue interest at the maximum rate permitted by
              California law.
            </p>
            <p>
              If your loss is covered by insurance, you remain personally responsible for
              deductibles, non-covered items, and any charges your carrier declines to pay.
            </p>
          </LegalSection>

          <LegalSection title="Insurance Claim Coordination">
            <p>
              We work directly with most homeowner and commercial insurance carriers to
              document losses and support your claim. We are not, however, a party to your
              insurance policy, and we do not act as your public adjuster. Final coverage
              decisions are made by your carrier.
            </p>
          </LegalSection>

          <LegalSection title="Warranty">
            <p>
              We stand behind our workmanship. Warranty terms specific to your project are
              set out in your signed work authorization or estimate. This limited warranty
              does not cover damage caused by pre-existing conditions, subsequent water
              intrusion, acts of God, misuse, alterations by others, or normal wear and
              tear. Manufacturer warranties on installed products (flooring, cabinets,
              fixtures, etc.) pass through to you and are governed by the manufacturer&apos;s
              terms.
            </p>
          </LegalSection>

          <LegalSection title="Cancellation">
            <p>
              For non-emergency scheduled work, you may cancel by contacting us as early as
              possible. Fees may apply for work already performed, materials already ordered,
              or crews already dispatched. California&apos;s statutory right to cancel a home
              solicitation contract (three-day right of rescission) applies where required by
              law and will be disclosed in writing with your contract.
            </p>
          </LegalSection>

          <LegalSection title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, {COMPANY.name}&apos;s total liability
              arising out of or related to your project is limited to the amount you have
              paid us for the services in question. We are not liable for indirect,
              incidental, consequential, or punitive damages, including lost profits, lost
              use of the property, or diminished value, except where such limitation is not
              permitted by law.
            </p>
            <p>
              Nothing in these Terms limits liability for gross negligence, willful
              misconduct, or any other liability that cannot be limited under California
              law.
            </p>
          </LegalSection>

          <LegalSection title="Website Use">
            <p>
              The content on this website (text, images, logos, and design) is owned by or
              licensed to {COMPANY.name} and is provided for your personal, non-commercial
              informational use. You agree not to copy, reproduce, scrape, or redistribute
              site content without our written permission, except as permitted by fair use
              or applicable law.
            </p>
            <p>
              The website is provided &ldquo;as is&rdquo; without warranty of any kind.
              Information on the site is general and does not substitute for a professional
              on-site assessment of your specific damage situation.
            </p>
          </LegalSection>

          <LegalSection title="Third-Party Links">
            <p>
              Our website may link to third-party sites (insurance carriers, industry
              associations, review platforms). We are not responsible for the content,
              privacy practices, or accuracy of any third-party site.
            </p>
          </LegalSection>

          <LegalSection title="Governing Law and Disputes">
            <p>
              These Terms are governed by the laws of the State of California, without regard
              to conflict-of-laws principles. Any dispute arising out of or related to these
              Terms or our services will be brought in the state or federal courts located in
              Riverside County, California, and you consent to the jurisdiction of those
              courts. Where a signed work authorization contains a different dispute
              resolution provision (such as mediation or arbitration), that provision
              controls for the specific project it covers.
            </p>
          </LegalSection>

          <LegalSection title="Changes to These Terms">
            <p>
              We may update these Terms from time to time. The &ldquo;Effective&rdquo; date
              above reflects the most recent revision. Continued use of the website or our
              services after changes are posted means you accept the updated Terms.
            </p>
          </LegalSection>

          <LegalSection title="Contact Us">
            <p>Questions about these Terms?</p>
            <p>
              {COMPANY.name}
              <br />
              {COMPANY.city}
              <br />
              Phone:{" "}
              <Link
                href={PHONE.href}
                className="text-[#8ECE34] transition-colors hover:text-[#A6E053]"
              >
                {PHONE.display}
              </Link>
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mt-[clamp(40px,5vw,64px)] border-t border-[rgba(255,255,255,0.08)] pt-[clamp(28px,3.4vw,44px)]">
        <h2 className="text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1]">
          {title}
        </h2>
        <div className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-6 [&_ul]:[list-style:disc] [&_li]:leading-[1.7] [&_a]:text-[#8ECE34] [&_a:hover]:text-[#A6E053]">
          {children}
        </div>
      </div>
    </Reveal>
  );
}
