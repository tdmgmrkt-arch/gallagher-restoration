import { COMPANY } from "@/lib/site";

type Variant = "band" | "inline";

const BADGES = [
  {
    kicker: "State-Licensed Contractor",
    heading: "CSLB",
    value: `#${COMPANY.cslbLicense}`,
    note: "California Contractors State License Board",
    href: `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=${COMPANY.cslbLicense}`,
  },
  {
    kicker: "Industry-Certified Training",
    heading: "IICRC",
    value: "Trained Team",
    note: "Institute of Inspection Cleaning and Restoration Certification",
    href: "https://iicrc.org",
  },
];

export function TrustMarks({ variant = "band" }: { variant?: Variant }) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
        <span className="inline-flex items-center gap-[8px] border border-[rgba(142,206,52,0.28)] bg-[rgba(142,206,52,0.05)] px-[10px] py-[6px] text-[#C6CABF]">
          <span className="text-[#8ECE34]">CSLB</span>
          <span className="text-[#F4F5F1]">#{COMPANY.cslbLicense}</span>
        </span>
        <span className="inline-flex items-center gap-[8px] border border-[rgba(142,206,52,0.28)] bg-[rgba(142,206,52,0.05)] px-[10px] py-[6px] text-[#C6CABF]">
          <span className="text-[#8ECE34]">IICRC</span>
          <span className="text-[#F4F5F1]">Trained Team</span>
        </span>
      </div>
    );
  }

  return (
    <section
      aria-label="Credentials"
      className="border-b border-[rgba(255,255,255,0.07)] bg-[#08090A]"
    >
      <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1px] bg-[rgba(255,255,255,0.06)] px-[clamp(20px,5vw,56px)]">
        {BADGES.map((b) => (
          <a
            key={b.heading}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-[clamp(18px,2vw,28px)] bg-[#08090A] py-[clamp(22px,2.6vw,32px)] transition-[background-color] duration-300 hover:bg-[#0E100E]"
          >
            <span
              aria-hidden="true"
              className="grid h-[52px] w-[52px] flex-none place-items-center border border-[rgba(142,206,52,0.3)] bg-[rgba(142,206,52,0.06)] font-mono text-[10px] uppercase tracking-[0.16em] text-[#8ECE34] transition-colors group-hover:border-[rgba(142,206,52,0.55)] group-hover:bg-[rgba(142,206,52,0.10)]"
            >
              <ShieldGlyph />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7E837A]">
                {b.kicker}
              </div>
              <div className="mt-[6px] flex items-baseline gap-[8px]">
                <span className="text-[18px] font-bold leading-none tracking-[-0.01em] text-[#F4F5F1]">
                  {b.heading}
                </span>
                <span className="font-mono text-[14px] font-medium text-[#8ECE34]">
                  {b.value}
                </span>
              </div>
              <div className="mt-[6px] text-[12px] leading-[1.55] text-[#8F948A]">
                {b.note}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="ml-auto flex-none font-mono text-[11px] uppercase tracking-[0.18em] text-[#5E635B] transition-colors group-hover:text-[#8ECE34]"
            >
              Verify &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ShieldGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path
        d="M12 2.5l8 3v6.2c0 4.4-3.2 8.4-8 9.8-4.8-1.4-8-5.4-8-9.8V5.5l8-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path
        d="M8.5 12.2l2.6 2.6L15.8 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
