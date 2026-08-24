import Image from "next/image";
import Link from "next/link";
import { ADDRESS, COMPANY, GBP, NAV, PHONE, SOCIAL_URLS } from "@/lib/site";
import { GoogleReviewBadge } from "@/components/ui/GoogleReviewBadge";

const FOOTER_NAV = [{ label: "Home", href: "/" }, ...NAV];

const SOCIALS = [
  { label: "Facebook", href: SOCIAL_URLS[0] },
  { label: "Instagram", href: SOCIAL_URLS[1] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.09)] bg-[#08090A] pt-[clamp(56px,7vw,96px)]">
      <div className="mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(32px,4vw,64px)] px-[clamp(20px,5vw,56px)]">
        <div>
          <Image
            src="/gallagher_badge_logo.webp"
            alt={COMPANY.name}
            width={304}
            height={254}
            className="block h-[76px] w-auto"
          />
          <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.7] text-[#8F948A] text-pretty">
            {COMPANY.tagline}
          </p>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
            Licensed &middot; Insured &middot; IICRC-Trained
          </div>
          <div className="mt-2 text-[13px] text-[#C6CABF]">
            CSLB License #{COMPANY.cslbLicense}
          </div>
          <div className="mt-5 flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#C6CABF] transition-colors hover:text-[#8ECE34]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5E635B]">
            Navigation
          </div>
          <div className="mt-[22px] flex flex-col gap-3">
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] text-[#C6CABF] transition-colors hover:text-[#8ECE34]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5E635B]">
            Contact
          </div>
          <div className="mt-[22px] flex flex-col gap-[18px]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7E837A]">
                Phone
              </div>
              <Link
                href={PHONE.href}
                className="mt-2 inline-block text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.03em] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
              >
                {PHONE.display}
              </Link>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7E837A]">
                Location
              </div>
              <div className="mt-2 text-[16px] leading-[1.55] text-[#C6CABF]">
                {ADDRESS.street}
                <br />
                {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
              </div>
              <a
                href={GBP.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5E635B]">
            Emergency Service
          </div>
          <p className="mt-[22px] text-[15px] leading-[1.7] text-[#8F948A] text-pretty">
            Crews available 7 days a week, on site within 60 minutes.
          </p>
          <Link
            href={PHONE.href}
            className="mt-[22px] inline-flex items-center gap-[10px] rounded-[2px] bg-[#8ECE34] px-6 py-4 text-[15px] font-bold text-[#0B0C0B] transition-[transform,box-shadow,background-color] duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] hover:shadow-[0_14px_34px_rgba(142,206,52,0.26)]"
          >
            Get Help 24/7
          </Link>
          <div className="mt-[22px]">
            <GoogleReviewBadge variant="footer" />
          </div>
        </div>
      </div>

      <div className="mt-[clamp(48px,6vw,80px)] border-t border-[rgba(255,255,255,0.07)]">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4 px-[clamp(20px,5vw,56px)] py-[26px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#5E635B]">
          <span>&copy; {new Date().getFullYear()} {COMPANY.name}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#8ECE34]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-[#8ECE34]"
            >
              Terms of Service
            </Link>
            <span className="text-[#3F4340]">Water &middot; Fire &middot; Mold &middot; Property Damage</span>
          </div>
        </div>
      </div>

      {/* Reserved space for the mobile sticky call bar */}
      <div className="h-[76px] nav:hidden" aria-hidden="true" />
    </footer>
  );
}
