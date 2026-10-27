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

export default function SmsPrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="SMS Messaging"
        accent="Privacy Policy"
        intro={`How ${COMPANY.name} collects, uses, and protects the information tied to our text messaging program.`}
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
              {COMPANY.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
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

          <LegalSection title="Sharing and Disclosure">
            <p>
              We do not sell or share mobile phone numbers or SMS opt-in consent data with
              third parties or affiliates for their marketing or promotional purposes. We may
              share information with service providers that help us operate our messaging and
              business systems, subject to appropriate confidentiality and data protection
              requirements, or when legally required. SMS consent information is not shared
              for third-party marketing.
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
              {COMPANY.name}
              <br />
              {ADDRESS.fullDisplay}
              <br />
              SMS support number:{" "}
              <a href={SMS.supportHref}>{SMS.supportNumber}</a>
              <br />
              Business phone:{" "}
              <a href={SMS.supportHref}>{SMS.supportNumber}</a>
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
