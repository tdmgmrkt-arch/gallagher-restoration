import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection } from "@/components/ui/LegalSection";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ADDRESS, COMPANY, EMAIL, SMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMS Messaging Privacy Policy | Gallagher Restoration Co.",
  description:
    "How Gallagher Restoration Co. collects, uses, and protects the information tied to our SMS messaging program. Mobile numbers and opt-in consent are never sold or shared for third-party marketing.",
  alternates: { canonical: SMS.privacyPath },
  robots: { index: true, follow: true },
};

/** See the note on the matching constant in app/sms-terms/page.tsx. */
const LEGAL_ENTITY = `${COMPANY.legalName}.`;

export default function SmsPrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="SMS Messaging"
        accent="Privacy Policy"
        intro={`How ${LEGAL_ENTITY} collects, uses, and protects the information tied to our text messaging program.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "SMS Privacy Policy" }]}
        backgroundImage="/privacy-hero.webp"
        backgroundAlt=""
      />

      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
              Effective {SMS.effectiveDate}
            </div>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty">
              {LEGAL_ENTITY} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              respects your privacy. This policy describes how we collect, use, and protect
              personal information in connection with our SMS messaging program.
            </p>
          </Reveal>

          <LegalSection title="Information We Collect">
            <p>
              When you opt in to SMS messaging or communicate with us, we may collect your
              phone number, name, email address, basic contact information, consent and
              opt-in records, and SMS messaging history. We may also use relevant
              appointment and restoration-project details to respond to your requests.
            </p>
          </LegalSection>

          <LegalSection title="How We Collect Information">
            <p>
              We collect information directly from you when you submit a form, request
              service, communicate with our team, or consent to receive texts. We may also
              collect information through interactions with our website and customer
              communication systems.
            </p>
          </LegalSection>

          <LegalSection title="How We Use Information">
            <p>
              We use this information to send messages you have opted in to receive,
              coordinate restoration services, schedule appointments, provide project and
              technician updates, respond to questions, maintain consent records, and
              operate our business. Promotional messages, if offered, are sent only with
              appropriate consent.
            </p>
          </LegalSection>

          <LegalSection title="SMS Data Privacy">
            <p>
              Mobile phone numbers and SMS consent information collected for text messaging
              will not be sold, rented, transferred, or shared with any third parties or
              external organizations, including service providers, except where strictly
              required by law. Text messaging originator opt-in data and consent will not be
              shared with any third parties.
            </p>
          </LegalSection>

          <LegalSection title="Access Controls and Safeguards">
            <p>
              We maintain internal access controls and safeguards designed to prevent
              unauthorized access, use, or sharing of user data. Access to customer contact
              information is limited to employees who need it to provide service.
            </p>
          </LegalSection>

          <LegalSection title="Opt-Out and Choices">
            <p>
              You may opt out of SMS messages at any time by replying{" "}
              <strong className="text-[#F4F5F1]">STOP</strong>. Reply{" "}
              <strong className="text-[#F4F5F1]">HELP</strong> for assistance. For additional
              information, see our{" "}
              <Link href={SMS.termsPath}>SMS Messaging Terms and Conditions</Link>.
            </p>
          </LegalSection>

          <LegalSection title="Data Security">
            <p>
              We use reasonable administrative, technical, and organizational measures
              designed to protect personal information from unauthorized access, use, or
              disclosure. No transmission or storage method is completely secure.
            </p>
          </LegalSection>

          <LegalSection title="Policy Updates">
            <p>
              We may update this policy from time to time. We will post the revised policy
              with an updated effective date and provide additional notice when required by
              law.
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
