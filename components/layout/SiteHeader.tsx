"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CITIES_BY_COUNTY,
  COUNTIES,
  NAV,
  PHONE,
  SERVICE_CATEGORIES,
} from "@/lib/site";

type MenuKey = "services" | "service-areas" | null;

const MENU_TRIGGERS: Record<string, MenuKey> = {
  "/services": "services",
  "/service-areas": "service-areas",
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(null);
    setMenuOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled((window.scrollY || 0) > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (activeMenu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeMenu]);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <>
      <header
        className={[
          "sticky top-0 z-[60] border-b backdrop-blur-[14px] transition-[background-color,border-color,box-shadow] duration-[400ms]",
          scrolled || activeMenu !== null
            ? "border-[rgba(255,255,255,0.10)] bg-[rgba(8,9,8,0.94)] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            : "border-[rgba(255,255,255,0.07)] bg-[rgba(11,12,11,0.72)]",
        ].join(" ")}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-[86px] max-w-[1300px] items-center justify-between gap-7 px-[clamp(20px,5vw,56px)]">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Gallagher Restoration Co. \u2014 home">
            <Image
              src="/gallagher_badge_logo.webp"
              alt="Gallagher Restoration Co."
              width={232}
              height={194}
              priority
              className="block h-[58px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-stretch gap-[clamp(14px,2vw,30px)] nav:flex">
            {NAV.map((item) => {
              const triggerKey = MENU_TRIGGERS[item.href] ?? null;
              const isActive = triggerKey !== null && activeMenu === triggerKey;
              const commonClass =
                "relative flex items-center gap-[6px] text-[14px] font-medium tracking-[-0.01em] transition-colors";
              if (triggerKey) {
                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => openMenu(triggerKey)}
                    className="flex items-stretch"
                  >
                    <Link
                      href={item.href}
                      className={[
                        commonClass,
                        isActive ? "text-[#8ECE34]" : "text-[#C6CABF] hover:text-[#8ECE34]",
                      ].join(" ")}
                      aria-expanded={isActive}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={[
                          "block h-[6px] w-[6px] border-b border-r border-current transition-transform duration-[240ms]",
                          isActive ? "rotate-[225deg]" : "rotate-45",
                        ].join(" ")}
                      />
                      <span
                        aria-hidden="true"
                        className={[
                          "pointer-events-none absolute -bottom-[6px] left-0 right-0 h-[2px] bg-[#8ECE34] transition-transform duration-[240ms] origin-left",
                          isActive ? "scale-x-100" : "scale-x-0",
                        ].join(" ")}
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => openMenu(null)}
                  className={[commonClass, "text-[#C6CABF] hover:text-[#8ECE34]"].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href={PHONE.href}
            onMouseEnter={() => openMenu(null)}
            className="hidden shrink-0 items-center gap-[10px] rounded-[2px] bg-[#8ECE34] px-[22px] py-[15px] text-[14px] font-bold tracking-[-0.01em] text-[#0B0C0B] transition-[transform,box-shadow,background-color] duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-[2px] hover:bg-[#A6E053] hover:shadow-[0_14px_34px_rgba(142,206,52,0.28)] nav:inline-flex"
          >
            <span className="gr-pulse block h-[7px] w-[7px] rounded-full bg-[#0B0C0B]" />
            Call Now &mdash; {PHONE.display}
          </Link>

          {/* Mobile controls */}
          <div className="flex items-center gap-[10px] nav:hidden">
            <Link
              href={PHONE.href}
              className="inline-flex items-center gap-2 rounded-[2px] bg-[#8ECE34] px-4 py-[13px] text-[13px] font-bold text-[#0B0C0B] transition-colors hover:bg-[#A6E053]"
            >
              Call Now
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-[46px] w-[46px] flex-col items-center justify-center gap-[5px] rounded-[2px] border border-[rgba(255,255,255,0.18)] bg-transparent p-0"
            >
              <span className="block h-[1.5px] w-[18px] bg-[#F4F5F1]" />
              <span className="block h-[1.5px] w-[18px] bg-[#F4F5F1]" />
            </button>
          </div>
        </div>

        {/* Mega menu panel — full width, drops from header */}
        <div
          className={[
            "absolute inset-x-0 top-full hidden overflow-hidden border-t border-b border-t-[rgba(142,206,52,0.22)] border-b-[rgba(255,255,255,0.09)] bg-[rgba(22,24,22,0.985)] shadow-[0_28px_60px_rgba(0,0,0,0.55)] backdrop-blur-[18px] transition-[opacity,transform,visibility] duration-[280ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] nav:block",
            activeMenu
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-[6px] opacity-0",
          ].join(" ")}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {activeMenu === "services" ? <ServicesMega /> : null}
          {activeMenu === "service-areas" ? <ServiceAreasMega /> : null}
        </div>
      </header>

      {/* Full-page backdrop below header when a mega menu is open */}
      <div
        aria-hidden="true"
        onClick={() => setActiveMenu(null)}
        className={[
          "fixed inset-0 top-[86px] z-[50] hidden bg-black/55 backdrop-blur-[2px] transition-opacity duration-[240ms] nav:block",
          activeMenu ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {menuOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex flex-col bg-[#0B0C0B] px-[clamp(20px,5vw,56px)] py-7"
        >
          <div className="mb-9 flex items-center justify-between">
            <Image
              src="/gallagher_badge_logo.webp"
              alt="Gallagher Restoration Co."
              width={216}
              height={181}
              className="block h-[54px] w-auto"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-[2px] border border-[rgba(255,255,255,0.18)] bg-transparent text-[22px] leading-none text-[#F4F5F1]"
            >
              &times;
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {NAV.map((item) => {
              const triggerKey = MENU_TRIGGERS[item.href] ?? null;
              if (!triggerKey) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-[rgba(255,255,255,0.07)] py-[14px] text-[26px] font-bold tracking-[-0.03em] text-[#F4F5F1]"
                  >
                    {item.label}
                  </Link>
                );
              }
              const isOpen = mobileSection === triggerKey;
              return (
                <div key={item.href} className="border-b border-[rgba(255,255,255,0.07)]">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 py-[14px] text-[26px] font-bold tracking-[-0.03em] text-[#F4F5F1]"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileSection(isOpen ? null : triggerKey)}
                      aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      aria-expanded={isOpen}
                      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-[rgba(255,255,255,0.18)] text-[20px] leading-none text-[#8ECE34]"
                    >
                      {isOpen ? "\u2212" : "+"}
                    </button>
                  </div>
                  {isOpen ? (
                    <div className="pb-4">
                      {triggerKey === "services"
                        ? SERVICE_CATEGORIES.map((cat) => (
                            <div key={cat.slug} className="mt-3">
                              <Link
                                href={`/${cat.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]"
                              >
                                {cat.kicker}
                              </Link>
                              <div className="mt-2 flex flex-col gap-1">
                                {cat.leaves.map((leaf) => (
                                  <Link
                                    key={leaf.slug}
                                    href={`/${leaf.slug}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="py-[6px] text-[15px] text-[#C6CABF]"
                                  >
                                    {leaf.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        : COUNTIES.map((county) => {
                            const cities =
                              CITIES_BY_COUNTY[county.slug as keyof typeof CITIES_BY_COUNTY] ?? [];
                            return (
                              <div key={county.slug} className="mt-3">
                                <Link
                                  href={`/${county.slug}`}
                                  onClick={() => setMenuOpen(false)}
                                  className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]"
                                >
                                  {county.index} &middot; {county.name} {county.second}
                                </Link>
                                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                                  {cities.map((city) => (
                                    <Link
                                      key={city.slug}
                                      href={`/${city.slug}`}
                                      onClick={() => setMenuOpen(false)}
                                      className="py-[6px] text-[14px] text-[#C6CABF]"
                                    >
                                      {city.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <Link
            href={PHONE.href}
            className="mt-4 flex items-center justify-center gap-[10px] rounded-[2px] bg-[#8ECE34] p-5 text-[17px] font-bold text-[#0B0C0B]"
          >
            Call Now &mdash; {PHONE.display}
          </Link>
        </div>
      ) : null}
    </>
  );
}

function MegaLeftCard({
  kicker,
  title,
  body,
  image,
  imageAlt,
}: {
  kicker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(22px,2.2vw,30px)]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 420px, 100vw"
        className="pointer-events-none select-none object-cover opacity-[0.32]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(18,20,19,0.85)] via-[rgba(18,20,19,0.6)] to-[rgba(18,20,19,0.9)]"
      />
      <div className="relative z-[1] flex h-full flex-col">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
          {kicker}
        </div>
        <h3 className="mt-4 text-[clamp(22px,2vw,28px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#F4F5F1] text-balance">
          {title}
        </h3>
        <p className="mt-4 text-[14px] leading-[1.7] text-[#9CA098] text-pretty">{body}</p>
        <div className="mt-auto pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7E837A]">
            24/7 Emergency
          </div>
          <Link
            href={PHONE.href}
            className="mt-2 inline-flex items-center gap-[10px] rounded-[2px] border border-[rgba(142,206,52,0.35)] bg-[rgba(11,12,11,0.55)] px-4 py-3 text-[15px] font-bold text-[#8ECE34] backdrop-blur-[4px] transition-colors hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.12)]"
          >
            <span className="gr-pulse block h-[7px] w-[7px] rounded-full bg-[#8ECE34]" />
            {PHONE.display}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServicesMega() {
  return (
    <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] py-[clamp(28px,3vw,44px)]">
      <div className="grid grid-cols-12 gap-[clamp(20px,2.4vw,32px)]">
        <div className="col-span-4">
          <MegaLeftCard
            kicker="Full Service"
            title="Water, Fire, Mold &mdash; one crew, start to finish."
            body="Emergency response in Southern California with certified crews on site typically within 60 minutes. Mitigation through full reconstruction under one point of contact."
            image="/gallagher_team_fleet.webp"
            imageAlt=""
          />
        </div>
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(20px,2.2vw,28px)] xl:grid-cols-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="flex flex-col">
                <Link
                  href={`/${cat.slug}`}
                  className="group flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.09)] pb-2"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    {cat.kicker}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[13px] text-[#7E837A] transition-transform duration-[240ms] group-hover:translate-x-[3px] group-hover:text-[#8ECE34]"
                  >
                    &rarr;
                  </span>
                </Link>
                <ul className="mt-3 flex flex-col gap-[6px]">
                  {cat.leaves.map((leaf) => (
                    <li key={leaf.slug}>
                      <Link
                        href={`/${leaf.slug}`}
                        className="group flex items-center gap-[10px] text-[14px] leading-[1.4] text-[#C6CABF] transition-colors hover:text-[#8ECE34]"
                      >
                        <span
                          aria-hidden="true"
                          className="block h-[1px] w-[10px] bg-[rgba(255,255,255,0.2)] transition-all duration-[220ms] group-hover:w-[16px] group-hover:bg-[#8ECE34]"
                        />
                        {leaf.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[clamp(22px,2.4vw,30px)] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.09)] pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7E837A]">
          Not sure what you need? &nbsp; We&apos;ll assess on site &mdash; free.
        </p>
        <Link
          href="/services"
          className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
        >
          Browse all services &rarr;
        </Link>
      </div>
    </div>
  );
}

function ServiceAreasMega() {
  return (
    <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] py-[clamp(28px,3vw,44px)]">
      <div className="grid grid-cols-12 gap-[clamp(20px,2.4vw,32px)]">
        <div className="col-span-4">
          <MegaLeftCard
            kicker="5-County Coverage"
            title="Southern California, dispatched in 60 minutes."
            body="Headquartered in Canyon Lake and serving 34 cities across Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties."
            image="/gallagher_fleet_rear.webp"
            imageAlt=""
          />
        </div>
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(20px,2.2vw,28px)] xl:grid-cols-3">
            {COUNTIES.map((county) => {
              const cities =
                CITIES_BY_COUNTY[county.slug as keyof typeof CITIES_BY_COUNTY] ?? [];
              return (
                <div key={county.slug} className="flex flex-col">
                  <Link
                    href={`/${county.slug}`}
                    className="group flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.09)] pb-2"
                  >
                    <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                      <span className="text-[#7E837A]">{county.index}</span> &nbsp; {county.name}{" "}
                      {county.second}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[13px] text-[#7E837A] transition-transform duration-[240ms] group-hover:translate-x-[3px] group-hover:text-[#8ECE34]"
                    >
                      &rarr;
                    </span>
                  </Link>
                  <ul className="mt-3 flex flex-col gap-[6px]">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/${city.slug}`}
                          className="group flex items-center gap-[10px] text-[14px] leading-[1.4] text-[#C6CABF] transition-colors hover:text-[#8ECE34]"
                        >
                          <span
                            aria-hidden="true"
                            className="block h-[1px] w-[10px] bg-[rgba(255,255,255,0.2)] transition-all duration-[220ms] group-hover:w-[16px] group-hover:bg-[#8ECE34]"
                          />
                          {city.name}
                          {"isHq" in city && city.isHq ? (
                            <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8ECE34]">
                              HQ
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-[clamp(22px,2.4vw,30px)] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.09)] pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7E837A]">
          City not listed? &nbsp; Call us &mdash; we dispatch beyond our five-county core.
        </p>
        <Link
          href="/service-areas"
          className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
        >
          See all service areas &rarr;
        </Link>
      </div>
    </div>
  );
}
