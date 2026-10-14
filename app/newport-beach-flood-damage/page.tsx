import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustMarks } from "@/components/ui/TrustMarks";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { COMPANY, EMAIL, PHONE, SOCIAL_URLS } from "@/lib/site";
import { CITY_COORDS } from "@/lib/city-coords";
import { getGoogleReviews } from "@/lib/google-reviews";

const SLUG = "newport-beach-flood-damage";
const PAGE_URL = `https://gallagherrestoration.com/${SLUG}`;

/**
 * Lead source for both forms on this page. GHL branches on it to send the
 * flood-specific auto-responder (ghl/email-templates/newport-flood-confirmation.html)
 * instead of the site-wide one, and it is how this campaign's cost-per-lead is
 * measured separately from ordinary site traffic. Changing it without changing
 * the matching GHL workflow branch silently drops leads into the default flow.
 */
const FORM_ID = "newport_beach_flood";
const HQ_COORDS = CITY_COORDS["canyon-lake-ca"];

/* ---------------------------------------------------------------------------
 * PPC landing page — Tropical Storm Rachel / Newport Beach flooding.
 *
 * Every event detail below is from public reporting on the October 9-12, 2026
 * storm and the City of Newport Beach local emergency declaration: the surf
 * and high tide overtopping the sand berms, 15-20 blocks of the Balboa
 * Peninsula flooded roughly between 6th and 21st, and the declaration issued
 * Saturday October 10. Do not add event detail that is not verifiable — this
 * page runs behind paid traffic and the claims have to hold up.
 *
 * Restoration claims (seawater as Category 3, porous material removal,
 * hygroscopic salt residue) track the IICRC S500 standard.
 * ------------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Newport Beach Flood Damage Restoration | 24/7 Response",
  description:
    "Saltwater flood cleanup for Newport Beach and the Balboa Peninsula after Tropical Storm Rachel. IICRC-trained crews, Orange County dispatch. Call (951) 541-0034.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: "Newport Beach Flood Damage Restoration | Gallagher Restoration",
    description:
      "Saltwater flood cleanup, dry-out, and rebuild for Newport Beach homes flooded by Tropical Storm Rachel. 24/7 Orange County dispatch.",
    url: PAGE_URL,
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
};

const HERO_INTRO =
  "High surf and tidal overflow from Tropical Storm Rachel pushed seawater over the sand berms and into the Balboa Peninsula on Friday, October 9 — flooding streets, garages, and homes several blocks in from the sand. The City of Newport Beach declared a local emergency the next day. Gallagher Restoration Co. runs saltwater flood work out of our Orange County office in Huntington Beach: IICRC-trained crews, a drying protocol built for seawater rather than for a broken pipe, and written documentation for your claim starting the first hour we are on site.";

const STATUS_TILES = [
  {
    label: "The Event",
    value: "Oct 9",
    hint: "Tropical Storm Rachel surf and high tide overtopped the sand berms",
  },
  {
    label: "Hardest Hit",
    value: "Balboa",
    hint: "Peninsula streets roughly between 6th and 21st — 15 to 20 blocks flooded",
  },
  {
    label: "City Status",
    value: "Emergency",
    hint: "Local emergency declared Saturday, October 10",
  },
  {
    label: "Our Dispatch",
    value: "24 / 7",
    hint: "Orange County office in Huntington Beach, answered by a person",
  },
];

const SALT_CARDS = [
  {
    title: "Seawater is Category 3 water",
    body:
      "Under the IICRC S500 standard, seawater and rising surface water sit in the same tier as sewage: grossly contaminated. Storm flooding carries sand, marine bacteria, street and fuel runoff, and whatever the overwhelmed storm drains pushed back up. Porous materials that took it on — drywall, insulation, carpet pad, particleboard cabinet boxes — come out rather than getting dried in place.",
  },
  {
    title: "The water leaves. The salt stays.",
    body:
      "This is the part that gets skipped. Chloride left behind in drywall, framing, and slab is hygroscopic — it pulls moisture back out of the air. A wall can hit dry standard on Tuesday and read wet again on Friday with no new water anywhere. Salt has to be flushed with clean water first, then dried, then verified.",
  },
  {
    title: "Chloride keeps corroding for years",
    body:
      "Residual salt quietly attacks fasteners, metal studs, joist hangers, outlet boxes, HVAC coils, and slab rebar long after the floor looks fine again. A fast cosmetic dry-out buys a few months and hands you a structural problem later. Where salt contamination is confirmed, the affected metal and hardware get addressed, not painted over.",
  },
  {
    title: "Anything that went under gets evaluated",
    body:
      "Outlets, subpanels, furnaces, water heaters, and ductwork below the waterline need evaluation before they are energized or run again. Saltwater-exposed electrical components are generally replaced rather than dried — the corrosion has already started inside the housing where you cannot see it.",
  },
];

const FIRST_STEPS = [
  {
    n: "01",
    title: "Treat standing water as live",
    body:
      "Do not wade into a flooded room if any circuit serving it may still be energized. Kill the breaker from a dry location, or leave it alone and tell us when we arrive.",
  },
  {
    n: "02",
    title: "Photograph before you move anything",
    body:
      "Wide shots of every affected room, then close-ups of damaged contents. Get the waterline on a wall in at least one frame. Do this before anything goes out to the curb.",
  },
  {
    n: "03",
    title: "Leave the HVAC off",
    body:
      "Running the system pulls humid, contaminated air through the whole duct network and spreads the problem into rooms the water never reached.",
  },
  {
    n: "04",
    title: "Skip the household wet-vac",
    body:
      "Shop vacuums are not rated for Category 3 water. They aerosolize it and put the contamination into the air you are breathing while you work.",
  },
  {
    n: "05",
    title: "Mark the waterline and the time",
    body:
      "A strip of painter's tape at the high-water mark, plus the date and time it peaked, is one of the more useful things you can hand an adjuster or an assistance program.",
  },
  {
    n: "06",
    title: "Call before you gut",
    body:
      "Once the drywall is in a dumpster, the evidence your claim rests on went with it. A free assessment and a written scope take a couple of hours and cost nothing.",
  },
];

const PROCESS_STEPS = [
  {
    kicker: "Step 01",
    title: "Assessment, moisture mapping, written scope",
    body:
      "A crew rolls from the Huntington Beach office and documents what actually happened: waterline height, moisture readings through walls and subfloor, thermal imaging for water tracked inside cavities, affected contents, and a line-item written scope. Free, no obligation, and it is the document everything downstream depends on.",
  },
  {
    kicker: "Step 02",
    title: "Extraction and controlled Category 3 removal",
    body:
      "Standing water out with truck-mount extraction, then controlled removal of the porous materials that took on seawater. Cut lines go above the measured moisture line rather than at an arbitrary height, and every removal is photographed and logged before it leaves the property.",
  },
  {
    kicker: "Step 03",
    title: "Salt flush, structural drying, daily verification",
    body:
      "Salt-contaminated surfaces are rinsed with clean water before drying begins — otherwise the chloride stays behind and keeps pulling moisture back in. Then air movers and LGR dehumidifiers, with moisture readings logged every day until materials reach dry standard and hold it.",
  },
  {
    kicker: "Step 04",
    title: "Antimicrobial, clearance, and rebuild",
    body:
      "Antimicrobial application, clearance verification, then the rebuild — drywall, insulation, paint, flooring, baseboard, cabinetry — handled by the same crew that did the mitigation. No handoff to a second contractor, no gap where the job sits open.",
  },
];

const INSURANCE_BODY =
  "Here is the straight version. A standard California homeowners policy generally excludes flood, and that exclusion typically covers storm surge and tidal overflow — which is what came over the berms on October 9. If you carry a separate NFIP or private flood policy, this event is what it exists for. If you do not, there may still be paths worth looking at: wind-driven rain, a sewer or drain backup if you carry that endorsement, and the assistance channels a declared local emergency can open. We are not your adjuster and we will not tell you what your policy covers — read it, or have your agent walk you through it. What we will do is document the loss to the standard a carrier or an assistance program actually requires: dated photos, moisture maps, a line-item written scope, and daily drying logs. That file is worth having whether or not a check is coming, and it has to be built before the demolition, not reconstructed after it. Where coverage does apply, we bill the carrier direct.";

const WHY_US_BODY =
  "Gallagher Restoration Co. is family-owned and has worked water, fire, mold, and storm losses across Southern California for more than 15 years. An event this size pulls in storm chasers — out-of-state crews who show up for a month, collect on the easy jobs, and are unreachable when a wall reads wet again in January. We are not going anywhere. Our Orange County office is in Huntington Beach, ten minutes up the coast, and headquarters is in Canyon Lake. CSLB licensed #1061640, insured, IICRC-trained technicians, and one crew from extraction through final paint. The phone is answered by a person at any hour.";

const FAQS = [
  {
    q: "Does homeowners insurance cover the Newport Beach flooding from Tropical Storm Rachel?",
    a: "Usually not on its own. Standard California homeowners policies generally exclude flood, and that exclusion normally extends to storm surge and tidal overflow, which is what caused the October 9 flooding on the Balboa Peninsula. A separate NFIP or private flood policy is what typically responds to this kind of loss. Other parts of your coverage may still apply depending on how water entered — wind-driven rain, and sewer or drain backup if you carry that endorsement, are both worth checking. Read your policy or ask your agent directly. Either way, document the loss now: Gallagher Restoration provides dated photos, moisture maps, a written line-item scope, and daily drying logs, and the on-site assessment is free.",
  },
  {
    q: "Why does saltwater flooding need different treatment than a burst pipe?",
    a: "Two reasons. First, seawater is Category 3 water under the IICRC S500 standard — grossly contaminated, the same tier as sewage — so porous materials that absorbed it are removed rather than dried in place. Second, the water evaporates but the salt does not. Chloride left in drywall, framing, and concrete is hygroscopic: it pulls moisture back out of the air, so a wall can test dry and then read wet again days later, and the same salt corrodes fasteners, metal studs, outlet boxes, and rebar for years. Salt-contaminated surfaces have to be flushed with clean water before drying, which a standard pipe-burst dry-out does not do.",
  },
  {
    q: "My house flooded a few days ago and seems dry. Do I still need an inspection?",
    a: "Yes. Surfaces dry long before the material behind them does, and wall cavities, subfloor, and insulation hold water you cannot see or smell yet. Mold can begin establishing within 24 to 48 hours in coastal humidity, and residual salt keeps re-wetting materials after the visible water is gone. A moisture inspection with meters and thermal imaging takes under an hour and tells you definitively whether there is still water in the structure.",
  },
  {
    q: "How fast can you get to Newport Beach or the Balboa Peninsula?",
    a: "We dispatch to Newport Beach from our Orange County office in Huntington Beach, roughly ten minutes up the coast, and typical arrival is within 60 minutes of the call. During a multi-day storm response we are running several jobs at once, so call as early as you can — we will tell you honestly where you fall in the queue rather than promise a window we cannot hold.",
  },
  {
    q: "Should I start tearing out wet drywall myself?",
    a: "Not before the loss is documented. Once materials are gone, so is the proof of how far the water went and what it reached, and that documentation is the foundation of any claim or assistance application. There is also a safety issue: Category 3 water means respiratory and contact exposure, and tearing into a wet wall without containment spreads it through the house. Call for the free assessment first, then removal happens as a documented step rather than as cleanup you cannot prove.",
  },
  {
    q: "What does Newport Beach flood restoration cost?",
    a: "It depends on how far the water traveled and how much porous material it reached. A flooded garage, or a single ground-floor room with limited drywall removal, typically runs in the low thousands. A ground floor taken several rooms deep — drywall and insulation out to the measured moisture line, cabinetry affected, structural drying over several days — commonly runs $8,000 to $25,000 or more, and that is before reconstruction. The on-site assessment and written scope cost nothing, and the scope is a real number you can take to an adjuster or compare against another bid. Get that in hand before you sign any restoration contract.",
  },
];

const CROSS_LINKS = [
  { label: "Water damage restoration", href: "/water-damage-restoration" },
  { label: "Emergency water removal", href: "/emergency-water-removal" },
  { label: "Mold remediation", href: "/mold-remediation" },
  { label: "Orange County", href: "/orange-county" },
];

export default async function NewportBeachFloodDamagePage() {
  const { ratingValue, reviewCount } = await getGoogleReviews();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Newport Beach Flood Damage Restoration",
    serviceType: "Flood Damage Restoration",
    category: "Water Damage Restoration",
    description:
      "Saltwater flood damage restoration for Newport Beach and the Balboa Peninsula after Tropical Storm Rachel: Category 3 extraction, salt flush, structural drying, and rebuild.",
    url: PAGE_URL,
    provider: {
      "@type": "EmergencyService",
      "@id": "https://gallagherrestoration.com/#business",
      name: COMPANY.name,
      telephone: PHONE.display,
      email: EMAIL.address,
      url: "https://gallagherrestoration.com",
      sameAs: SOCIAL_URLS,
      address: {
        "@type": "PostalAddress",
        streetAddress: "31672 Railroad Canyon Rd",
        addressLocality: "Canyon Lake",
        addressRegion: "CA",
        postalCode: "92587",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: HQ_COORDS[0],
        longitude: HQ_COORDS[1],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: "Newport Beach",
        address: {
          "@type": "PostalAddress",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      { "@type": "AdministrativeArea", name: "Orange County" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faqpage`,
    url: PAGE_URL,
    inLanguage: "en-US",
    datePublished: "2026-10-13",
    dateModified: "2026-10-13",
    about: { "@id": "https://gallagherrestoration.com/#business" },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gallagherrestoration.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Orange County",
        item: "https://gallagherrestoration.com/orange-county",
      },
      { "@type": "ListItem", position: 3, name: "Newport Beach Flood Damage" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — copy left, lead form right. The conversion unit sits above the fold. */}
      <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.07)] bg-[#08090A]">
        <Image
          src="/newportbeachflood.webp"
          alt="A flooded coastal residential street at sunrise — seawater standing over the roadway, sandbags stacked against garage doors, and kelp and storm debris washed up across the pavement"
          fill
          priority
          sizes="100vw"
          // q55, not the default 75. This is the LCP element and it sits under a
          // 0.74-0.93 scrim, so the detail quality buys is not visible — but the
          // bytes are: 157KB -> 114KB at w=1920, off the front of LCP.
          quality={55}
          className="absolute inset-0 object-cover object-[center_42%] [filter:saturate(0.92)_contrast(1.04)]"
        />
        {/*
          Two scrims, split by breakpoint. Below lg the copy runs the full width,
          so the horizontal scrim has to stay heavy or the headline ends up over
          the bright sunrise. At lg+ the copy is confined to the left column and
          the form card carries its own background, so the right side opens up
          and the photo actually reads.
        */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(98deg,rgba(8,9,8,0.9)_0%,rgba(8,9,8,0.84)_55%,rgba(8,9,8,0.74)_100%)] lg:bg-[linear-gradient(98deg,rgba(8,9,8,0.93)_0%,rgba(8,9,8,0.78)_40%,rgba(8,9,8,0.34)_70%,rgba(8,9,8,0.52)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,8,0.55)_0%,rgba(8,9,8,0.1)_26%,rgba(8,9,8,0.5)_78%,#0B0C0B_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_12%_30%,rgba(142,206,52,0.12),transparent_72%)]" />

        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-[clamp(36px,4.5vw,72px)] px-[clamp(20px,5vw,56px)] pb-[clamp(56px,7vw,96px)] pt-[clamp(76px,9vw,130px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(380px,0.75fr)]">
          <div>
            {/*
              Breadcrumb runs #9CA098, not PageHero's #7E837A. Over this photo
              #7E837A measures 3.67:1 — under AA. Same reason as the assessment
              label further down; both stay inside the brand grey ramp.
            */}
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#9CA098]"
              >
                <Link href="/" className="transition-colors hover:text-[#8ECE34]">
                  Home
                </Link>
                <span className="text-[#3F4340]">/</span>
                <Link
                  href="/orange-county"
                  className="transition-colors hover:text-[#8ECE34]"
                >
                  Orange County
                </Link>
                <span className="text-[#3F4340]">/</span>
                <span className="text-[#C6CABF]">Newport Beach Flood Damage</span>
              </nav>
            </Reveal>

            <Reveal>
              <Eyebrow pulse>
                Tropical Storm Rachel &middot; Balboa Peninsula Response
              </Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 max-w-[24ch] text-[clamp(36px,5.2vw,68px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
                Newport Beach flood damage restoration
                <span className="text-[#8ECE34]">
                  {" "}
                  &mdash; saltwater cleanup, dry-out, and rebuild.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              {/*
                56ch, not the 62ch used elsewhere on the page: at lg the right
                edge of a 62ch line lands in the bright sunrise gap between the
                palms, which drags this paragraph to 4.56:1. Pulling it in keeps
                it off the hot spot — and 56ch reads better in a hero anyway.
              */}
              <p className="mt-8 max-w-[56ch] text-[clamp(16px,1.4vw,20px)] leading-[1.72] text-[#C2C6BC] text-pretty">
                {HERO_INTRO}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap items-center gap-[clamp(14px,1.6vw,22px)]">
                <ButtonPrimary href={PHONE.href} size="lg" dot>
                  Call Now: {PHONE.display}
                </ButtonPrimary>
                {/*
                  #9CA098 rather than the usual muted #8F948A: this label sits over
                  the hero photo, where #8F948A measures 4.05:1 against the
                  brightest point of the scrimmed image — just under AA. #9CA098 is
                  already in use elsewhere on the page and measures 4.73:1 there.
                */}
                <span className="font-mono text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[#9CA098]">
                  Free on-site assessment
                  <br />
                  Answered 24/7 by a person
                </span>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 border-t border-[rgba(255,255,255,0.09)] pt-7">
                <TrustMarks variant="inline" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="border border-[rgba(255,255,255,0.12)] bg-[rgba(18,20,19,0.94)] p-[clamp(24px,2.6vw,36px)] shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
              <LeadForm formId={FORM_ID} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Event status band */}
      <section
        aria-label="Storm response status"
        className="border-b border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(44px,5.5vw,80px)]"
      >
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
            {STATUS_TILES.map((t, i) => (
              <Reveal key={t.label} delay={i * 80}>
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                    {t.label}
                  </div>
                  <div className="mt-4 text-[clamp(28px,3vw,42px)] font-extrabold tracking-[-0.03em] text-[#F4F5F1]">
                    {t.value}
                  </div>
                  <p className="mt-auto pt-4 text-[14px] leading-[1.7] text-[#8F948A] text-pretty">
                    {t.hint}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why saltwater is a different job */}
      <section className="bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,4vw,64px)]">
              <div>
                <Eyebrow>The Part That Gets Missed</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                  Ocean flooding is not a broken pipe.
                </h2>
              </div>
              <p className="max-w-[54ch] text-[15px] leading-[1.75] text-[#9CA098] text-pretty">
                A pipe burst is clean water on a clock. Seawater is a contaminated loss with a
                chemistry problem attached, and the two get handled differently from the first
                hour. If a crew quotes you a dry-out without mentioning salt, that is the
                conversation to have before anyone plugs in a fan.
              </p>
            </div>
          </Reveal>

          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[clamp(18px,2vw,26px)] md:grid-cols-2">
            {SALT_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="flex h-full flex-col border-l-2 border-[rgba(142,206,52,0.35)] bg-[#121413] p-[clamp(22px,2.4vw,32px)]">
                  <h3 className="text-[clamp(20px,2.3vw,27px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F1]">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.78] text-[#9CA098] text-pretty">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to do right now */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>Before We Get There</Eyebrow>
            <h2 className="mt-6 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              Six things to do in the next few hours.
            </h2>
          </Reveal>

          <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-[1px] bg-[rgba(255,255,255,0.07)] sm:grid-cols-2 lg:grid-cols-3">
            {FIRST_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="flex h-full flex-col bg-[#0E100E] p-[clamp(22px,2.4vw,32px)]">
                  <div className="font-mono text-[13px] font-bold tracking-[0.12em] text-[#8ECE34]">
                    {s.n}
                  </div>
                  <h3 className="mt-4 text-[clamp(18px,2vw,23px)] font-bold leading-[1.3] tracking-[-0.02em] text-[#F4F5F1]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#9CA098] text-pretty">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <a
              href={PHONE.href}
              className="group mt-[clamp(24px,3vw,36px)] flex flex-wrap items-center justify-between gap-6 border border-[rgba(142,206,52,0.35)] bg-[radial-gradient(70%_140%_at_0%_50%,rgba(142,206,52,0.12),transparent_72%)] p-[clamp(22px,2.6vw,34px)] transition-colors hover:border-[#8ECE34] hover:bg-[#121413]"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                  Not sure how bad it is?
                </div>
                <p className="mt-3 max-w-[48ch] text-[clamp(19px,2.2vw,26px)] font-bold leading-[1.3] tracking-[-0.025em] text-[#F4F5F1] text-pretty">
                  Call {PHONE.display}. We will walk the situation through with you on the phone
                  and tell you straight whether it needs a crew today.
                </p>
              </div>
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                Call now &rarr;
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>How The Job Runs</Eyebrow>
            <h2 className="mt-6 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              Assessment to final paint, one crew.
            </h2>
          </Reveal>

          <div className="mt-[clamp(36px,4.5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[clamp(18px,2vw,26px)]">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.kicker} delay={i * 80}>
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.6vw,36px)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                    {step.kicker}
                  </div>
                  <h3 className="mt-5 text-[clamp(20px,2.3vw,27px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#F4F5F1]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.78] text-[#9CA098] text-pretty">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance, stated honestly */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,116px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_80%_0%,rgba(142,206,52,0.08),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col">
              <Eyebrow>Insurance &amp; Documentation</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                What flood coverage actually does and does not do.
              </h2>
              <div className="mt-auto pt-10">
                <div className="h-[2px] w-[36px] bg-[#8ECE34]" />
                <div className="mt-5 font-mono text-[11px] uppercase leading-[1.8] tracking-[0.18em] text-[#8ECE34]">
                  Documented before demolition
                  <br />
                  Direct billing where coverage applies
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[64ch] text-[16px] leading-[1.82] text-[#C2C6BC] text-pretty">
              {INSURANCE_BODY}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why us — names the storm-chaser problem */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0B0C0B] py-[clamp(64px,8vw,116px)]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Reveal>
            <div>
              <Eyebrow>Why Gallagher</Eyebrow>
              <h2 className="mt-6 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
                Local before the storm, here after it.
              </h2>
              <p className="mt-8 max-w-[64ch] text-[16px] leading-[1.82] text-[#C2C6BC] text-pretty">
                {WHY_US_BODY}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative min-h-[300px] overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] lg:h-full">
              <Image
                src="/water-extraction-hero.webp"
                alt="Truck-mount water extraction underway inside a flooded residential space"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(11,12,11,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,2.4vw,32px)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8ECE34]">
                  Equipment on every job
                </div>
                <p className="mt-2 max-w-[30ch] text-[15px] font-medium leading-[1.55] text-[#F4F5F1] text-pretty">
                  Truck-mount extraction, LGR dehumidifiers, thermal imaging, and daily moisture
                  logs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <Eyebrow>Frequently Asked</Eyebrow>
            <h2 className="mt-6 max-w-[26ch] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance">
              Newport Beach flood damage
              <span className="text-[#8ECE34]">
                {" "}
                &mdash; what people are asking this week.
              </span>
            </h2>
          </Reveal>
          <div className="mt-[clamp(32px,4vw,56px)] divide-y divide-[rgba(255,255,255,0.09)] border-y border-[rgba(255,255,255,0.09)]">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <details className="group py-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[clamp(19px,2.1vw,26px)] font-semibold leading-[1.35] tracking-[-0.015em] text-[#F4F5F1] transition-colors hover:text-[#8ECE34]">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-[22px] w-[22px] flex-none items-center justify-center border border-[rgba(255,255,255,0.2)] font-mono text-[13px] text-[#8ECE34] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.8] text-[#9CA098] text-pretty">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Final CTA with the full lead form */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,140px)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_60%_at_22%_100%,rgba(142,206,52,0.13),transparent_72%)]" />
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-stretch gap-[clamp(36px,5vw,80px)] px-[clamp(20px,5vw,56px)]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col">
              <Eyebrow pulse>Newport Beach &middot; Dispatching 24/7</Eyebrow>
              <h2 className="mt-6 max-w-[20ch] text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
                Flooded on the Peninsula? Let us document it before anything gets torn out.
              </h2>
              <p className="mt-[26px] max-w-[52ch] text-[clamp(15px,1.4vw,20px)] leading-[1.75] text-[#9CA098] text-pretty">
                The on-site assessment, moisture mapping, and written scope cost nothing. You end
                up with a real file for your claim and a straight answer about what the work
                involves &mdash; whether you hire us or not.
              </p>
              <div className="mt-9">
                <ButtonPrimary href={PHONE.href} size="lg" dot>
                  Call Now: {PHONE.display}
                </ButtonPrimary>
              </div>

              <div className="mt-[clamp(28px,3.4vw,40px)] border-t border-[rgba(255,255,255,0.09)] pt-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7E837A]">
                  Looking for something else?
                </div>
                <div className="mt-4 flex flex-wrap gap-[10px]">
                  {CROSS_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-[10px] border border-[rgba(255,255,255,0.09)] bg-[#121413] px-[14px] py-[9px] text-[13px] leading-tight text-[#C6CABF] transition-colors hover:border-[#8ECE34] hover:text-[#F4F5F1]"
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="font-mono text-[#8ECE34]">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="h-full border border-[rgba(255,255,255,0.1)] bg-[#121413] p-[clamp(26px,3.2vw,44px)]">
              <LeadForm variant="full" formId={FORM_ID} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
