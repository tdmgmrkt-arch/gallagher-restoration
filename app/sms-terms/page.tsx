import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection } from "@/components/ui/LegalSection";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ADDRESS, COMPANY, EMAIL, SMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMS Messaging Terms and Conditions | Gallagher Restoration Co.",
  description:
    "Terms and conditions for customer care text messages from Gallagher Restoration Inc. — what we send, how you opt in, message frequency, rates, and STOP and HELP instructions. We do not send marketing or promotional messages.",
  alternates: { canonical: SMS.termsPath },
  robots: { index: true, follow: true },
};

/**
 * The registered entity, not the trading name.
 *
 * Carrier registration and the client's own legal copy both name the Inc., so
 * these two pages use it while the rest of the site keeps the "Co." brand
 * name. The trailing period is part of the abbreviation and reads correctly
 * mid-sentence as well as at the end of one.
 */
const LEGAL_ENTITY = `${COMPANY.legalName}.`;

export default function SmsTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="SMS Messaging"
        accent="Terms"
        intro={`The terms that govern customer care text messages from ${LEGAL_ENTITY}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "SMS Terms" }]}
        backgroundImage="/terms-hero.webp"
        backgroundAlt=""
      />

      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
              Effective {SMS.effectiveDate}
            </div>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty">
              By opting in to receive SMS text messages from {LEGAL_ENTITY} (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to these SMS Messaging Terms
              and Conditions. SMS consent is not a condition of purchasing restoration
              services.
            </p>
          </Reveal>

          <LegalSection title="Messages We Send">
            <p>
              {LEGAL_ENTITY} sends customer care text messages to customers with an active or
              recently completed service job. Messages include appointment confirmations,
              technician arrival notices, job status updates, scheduling changes, document
              requests, and billing reminders.{" "}
              <strong className="text-[#F4F5F1]">
                We do not send marketing or promotional messages.
              </strong>
            </p>
          </LegalSection>

          <LegalSection title="How You Opt In">
            <p>
              You opt in by providing your mobile number and agreeing to receive text
              messages when scheduling service or signing your work authorization.
            </p>
          </LegalSection>

          <LegalSection title="Message Frequency">
            <p>Message frequency varies based on your job.</p>
          </LegalSection>

          <LegalSection title="Message and Data Rates">
            <p>Message and data rates may apply.</p>
          </LegalSection>

          <LegalSection title="Opt-Out Instructions">
            <p>
              Reply <strong className="text-[#F4F5F1]">STOP</strong> at any time to stop
              receiving messages. You will receive one final message confirming you have
              been unsubscribed.
            </p>
            <p>
              Opting out of texts does not cancel any existing service agreement; we may
              contact you through other appropriate channels.
            </p>
          </LegalSection>

          <LegalSection title="Help and Support">
            <p>
              Reply <strong className="text-[#F4F5F1]">HELP</strong> for assistance or
              contact us at <a href={SMS.supportHref}>{SMS.supportNumber}</a>.
            </p>
          </LegalSection>

          <LegalSection title="Delivery and Carrier Limitations">
            <p>Carriers are not liable for delayed or undelivered messages.</p>
            <p>
              Wireless carriers and third-party messaging providers may delay or fail to
              deliver messages. {LEGAL_ENTITY} is not responsible for carrier charges or
              delivery failures outside our reasonable control.
            </p>
          </LegalSection>

          <LegalSection title="Privacy">
            <p>
              For information on how we handle your data, see our{" "}
              <Link href={SMS.privacyPath}>SMS Messaging Privacy Policy</Link>. Our general{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> covers everything outside
              the messaging program.
            </p>
          </LegalSection>

          <LegalSection title="Contact Information">
            <p>
              {LEGAL_ENTITY}
              <br />
              {ADDRESS.fullDisplay}
              <br />
              Phone: <a href={SMS.supportHref}>{SMS.supportNumber}</a>
              <br />
              Email: <a href={EMAIL.href}>{EMAIL.address}</a>
              <br />
              Website: <Link href="/">gallagherrestoration.com</Link>
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}
