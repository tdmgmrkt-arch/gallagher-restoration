import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection } from "@/components/ui/LegalSection";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ADDRESS, COMPANY, EMAIL, SMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMS Messaging Terms and Conditions | Gallagher Restoration Co.",
  description:
    "Terms and conditions for text messages from Gallagher Restoration Co. — message frequency, rates, STOP and HELP instructions, and carrier limitations.",
  alternates: { canonical: SMS.termsPath },
  robots: { index: true, follow: true },
};

export default function SmsTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="SMS Messaging"
        accent="Terms"
        intro={`The terms that govern text messages you receive from ${COMPANY.name}.`}
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
              By opting in to receive SMS text messages from {COMPANY.name}{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to these
              SMS Messaging Terms and Conditions. SMS consent is not a condition of
              purchasing restoration services.
            </p>
          </Reveal>

          <LegalSection title="SMS Messaging Service">
            <p>
              If you provide your mobile number and consent to SMS communication, we may send
              customer-care messages about restoration projects, appointment confirmations,
              scheduling, technician arrivals, project updates, service coordination, and
              responses to your inquiries. We will send promotional messages only if
              separately authorized where required.
            </p>
          </LegalSection>

          <LegalSection title="Message Frequency">
            <p>
              Message frequency varies depending on your project and communication needs. You
              may receive approximately 1&ndash;2 messages per month, but active projects may
              require more frequent updates.
            </p>
          </LegalSection>

          <LegalSection title="Message and Data Rates">
            <p>
              Message and data rates may apply according to your wireless carrier and mobile
              plan.
            </p>
          </LegalSection>

          <LegalSection title="Opt-Out Instructions">
            <p>
              Reply <strong className="text-[#F4F5F1]">STOP</strong> to any {COMPANY.name}{" "}
              text message to opt out of SMS communications. You may receive a final
              confirmation message. Opting out of texts does not cancel any existing service
              agreement; we may contact you through other appropriate channels.
            </p>
          </LegalSection>

          <LegalSection title="Help and Support">
            <p>
              Reply <strong className="text-[#F4F5F1]">HELP</strong> to a {COMPANY.name} text
              message for assistance. For additional support, contact {COMPANY.name} using
              the contact information listed below. SMS support number:{" "}
              <a href={SMS.supportHref}>{SMS.supportNumber}</a>.
            </p>
          </LegalSection>

          <LegalSection title="Privacy">
            <p>
              We handle personal information in accordance with our{" "}
              <Link href={SMS.privacyPath}>SMS Messaging Privacy Policy</Link>.
            </p>
          </LegalSection>

          <LegalSection title="Delivery and Carrier Limitations">
            <p>
              Wireless carriers and third-party messaging providers may delay or fail to
              deliver messages. {COMPANY.name} is not responsible for carrier charges or
              delivery failures outside our reasonable control.
            </p>
          </LegalSection>

          <LegalSection title="Contact Information">
            <p>
              {COMPANY.name}
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
