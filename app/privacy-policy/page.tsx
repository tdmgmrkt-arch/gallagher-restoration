import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY, PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Gallagher Restoration Co.",
  description:
    "How Gallagher Restoration Co. collects, uses, and protects your personal information when you request service, call our emergency line, or use our website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "January 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        intro={`How we collect, use, and protect the information you share with ${COMPANY.name}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        backgroundImage="/privacy-hero.webp"
        backgroundAlt=""
      />

      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
              Effective {EFFECTIVE_DATE}
            </div>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty">
              {COMPANY.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects
              your privacy. This Privacy Policy explains what information we collect through
              our website, our emergency phone line, and our restoration services; how we use
              it; who we share it with; and the choices you have. By calling us, submitting a
              form on our website, or otherwise engaging our services, you agree to the
              practices described below.
            </p>
          </Reveal>

          <LegalSection title="Information We Collect">
            <p>
              <strong className="text-[#F4F5F1]">Information you provide directly.</strong>{" "}
              When you call our emergency line, submit our contact form, or engage us for
              restoration work, we may collect your name, phone number, email address,
              property address, insurance carrier and policy details (only if you choose to
              share them for claim coordination), a description of the damage, and any
              photos or documents you send us.
            </p>
            <p>
              <strong className="text-[#F4F5F1]">Information collected automatically.</strong>{" "}
              When you visit our website, we (and our third-party analytics providers) may
              collect standard log data such as your IP address, device and browser type,
              referring URL, pages viewed, and timestamps. We use cookies and similar
              technologies to remember preferences and measure site performance.
            </p>
            <p>
              <strong className="text-[#F4F5F1]">Information from third parties.</strong>{" "}
              If your insurance carrier or property manager engages us on your behalf, we may
              receive claim numbers, adjuster contact information, and loss details from
              them.
            </p>
          </LegalSection>

          <LegalSection title="How We Use Your Information">
            <ul>
              <li>Dispatch a restoration crew to your property.</li>
              <li>Assess damage, prepare estimates, and perform mitigation and reconstruction work.</li>
              <li>Coordinate with your insurance carrier or adjuster on claim documentation.</li>
              <li>Communicate with you about your project, scheduling, and follow-up.</li>
              <li>Process payments and maintain business records as required by law.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Send occasional service updates or seasonal safety information (you can opt out at any time).</li>
              <li>Comply with legal, tax, insurance, and licensing obligations.</li>
            </ul>
          </LegalSection>

          <LegalSection title="How We Share Your Information">
            <p>We do not sell your personal information. We share information only as needed to deliver our services:</p>
            <ul>
              <li>
                <strong className="text-[#F4F5F1]">Insurance carriers and adjusters</strong>{" "}
                — with your consent, to document the loss and support claim processing.
              </li>
              <li>
                <strong className="text-[#F4F5F1]">Subcontractors and trade partners</strong>{" "}
                — plumbers, electricians, roofers, or other specialists brought in to complete
                your project. They are bound by confidentiality expectations.
              </li>
              <li>
                <strong className="text-[#F4F5F1]">Service providers</strong> — hosting,
                analytics, form-processing, and CRM vendors that help us operate our website
                and communicate with you.
              </li>
              <li>
                <strong className="text-[#F4F5F1]">Legal and safety</strong> — when required by
                law, subpoena, court order, or to protect the rights, property, or safety of
                our team, our customers, or others.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Cookies and Analytics">
            <p>
              Our website uses cookies and similar technologies for site functionality,
              analytics, and performance measurement. You can control cookies through your
              browser settings; disabling them may affect how parts of the site work. We may
              use third-party analytics providers (such as Google Analytics) that collect
              aggregate usage data on our behalf.
            </p>
          </LegalSection>

          <LegalSection title="Data Retention">
            <p>
              We keep project and customer records for as long as needed to provide our
              services, respond to warranty questions, resolve disputes, and comply with
              tax, insurance, and legal requirements. Website analytics data is retained per
              our analytics provider&apos;s standard settings.
            </p>
          </LegalSection>

          <LegalSection title="Your Rights (California Residents)">
            <p>
              Under the California Consumer Privacy Act (CCPA) and the California Privacy
              Rights Act (CPRA), California residents have the right to:
            </p>
            <ul>
              <li>Know what personal information we have collected about you.</li>
              <li>Request deletion of your personal information, subject to legal retention requirements.</li>
              <li>Request correction of inaccurate personal information.</li>
              <li>Opt out of the sale or sharing of personal information (we do not sell your information).</li>
              <li>Non-discrimination for exercising these rights.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at the phone number below. We may
              need to verify your identity before responding.
            </p>
          </LegalSection>

          <LegalSection title="Security">
            <p>
              We use reasonable administrative, technical, and physical safeguards to protect
              the information we hold. No system is perfectly secure, and we cannot guarantee
              the security of information transmitted over the internet.
            </p>
          </LegalSection>

          <LegalSection title="Children">
            <p>
              Our services and website are not directed to children under 13, and we do not
              knowingly collect personal information from children.
            </p>
          </LegalSection>

          <LegalSection title="Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. The &ldquo;Effective&rdquo; date
              above reflects the most recent revision. Material changes will be posted on
              this page.
            </p>
          </LegalSection>

          <LegalSection title="Contact Us">
            <p>
              Questions about this Privacy Policy or how we handle your information?
            </p>
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
