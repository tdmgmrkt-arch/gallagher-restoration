export const PHONE = {
  display: "(951) 541-0034",
  href: "tel:9515410034",
  digits: "951-541-0034",
};

export const COMPANY = {
  name: "Gallagher Restoration Co.",
  legalName: "Gallagher Restoration Inc",
  city: "Canyon Lake, CA",
  tagline: "24/7 Water, Fire, Mold & Property Damage Restoration",
  cslbLicense: "1061640",
};

export const ADDRESS = {
  street: "31672 Railroad Canyon Rd",
  locality: "Canyon Lake",
  region: "CA",
  postalCode: "92587",
  country: "US",
  fullDisplay: "31672 Railroad Canyon Rd, Canyon Lake, CA 92587",
};

export const GBP = {
  placeId: "ChIJaaW5Mkad3IARJlYjTmKj-IM",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJaaW5Mkad3IARJlYjTmKj-IM",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Gallagher+Restoration&destination_place_id=ChIJaaW5Mkad3IARJlYjTmKj-IM",
  embedSrc:
    "https://maps.google.com/maps?q=31672+Railroad+Canyon+Rd+Canyon+Lake+CA+92587&hl=en&z=14&t=m&output=embed",
  reviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJaaW5Mkad3IARJlYjTmKj-IM",
};

/**
 * All company offices. Canyon Lake is the corporate HQ and the only location with a
 * verified Google Business Profile; the other two are satellite offices.
 *
 * Satellite street addresses are intentionally NOT published. Both are residential
 * (Huntington Beach is "125 16th St Apt 1"; Carlsbad is "4623 Buckingham Ln") and
 * neither has its own GBP listing, so a street number buys no ranking signal while
 * risking a suspension and NAP inconsistency on the one profile that does. Add
 * `street`/`postalCode` here only if a staffed commercial location and a verified
 * Google Business Profile are established for that office.
 */
export const OFFICES = [
  {
    id: "canyon-lake",
    kind: "hq",
    role: "Corporate Headquarters",
    locality: "Canyon Lake",
    region: "CA",
    street: ADDRESS.street,
    postalCode: ADDRESS.postalCode,
    countySlug: "riverside-county",
    citySlug: "canyon-lake-ca",
    directionsUrl: GBP.directionsUrl,
  },
  {
    id: "huntington-beach",
    kind: "satellite",
    role: "Orange County Office",
    locality: "Huntington Beach",
    region: "CA",
    countySlug: "orange-county",
    citySlug: "huntington-beach-ca",
  },
  {
    id: "carlsbad",
    kind: "satellite",
    role: "North County San Diego Office",
    locality: "Carlsbad",
    region: "CA",
    countySlug: "san-diego-county",
    citySlug: "carlsbad-ca",
  },
] as const satisfies readonly Office[];

export type Office = {
  id: string;
  kind: "hq" | "satellite";
  role: string;
  locality: string;
  region: string;
  street?: string;
  postalCode?: string;
  countySlug: string;
  citySlug: string;
  directionsUrl?: string;
};

// Manually maintained until GBP API access lands. Reflects visible GBP totals.
export const REVIEWS = {
  ratingValue: 5.0,
  reviewCount: 61,
  bestRating: 5,
  worstRating: 1,
  source: "Google",
  asOf: "2026-08-19",
};

export const SOCIAL_URLS = [
  "https://www.facebook.com/GallagherRestorationCo",
  "https://www.instagram.com/gallagher1restoration/",
  "https://www.google.com/maps/place/?q=place_id:ChIJaaW5Mkad3IARJlYjTmKj-IM",
];

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "FAQs", href: "/faqs" },
] as const;

export const COUNTIES = [
  { index: "01", name: "Riverside", second: "County", slug: "riverside-county" },
  { index: "02", name: "San Bernardino", second: "County", slug: "san-bernardino-county" },
  { index: "03", name: "Orange", second: "County", slug: "orange-county" },
  { index: "04", name: "San Diego", second: "County", slug: "san-diego-county" },
  { index: "05", name: "Los Angeles", second: "County", slug: "los-angeles-county" },
] as const;

export const WATER_SERVICES = [
  "Emergency Water Removal",
  "Water Damage Clean-Up",
  "Water Damage Remediation",
  "Ceiling Water Damage",
  "Water Damage Repair",
  "Water Dry-Out",
  "Water Extraction Services",
  "Roof Water Damage Repair",
] as const;

export const FIRE_SERVICES = ["Fire Damage Restoration", "Smoke Clean-Up"] as const;

export const MOLD_SERVICES = [
  "Mold Remediation",
  "Mold Testing",
  "Mold Inspection Services",
] as const;

export const PROCESS_STEPS = [
  {
    index: "01",
    kicker: "Contact Us",
    title: "Immediate Response",
    accent: true,
  },
  {
    index: "02",
    kicker: "Damage Assessment",
    title: "Inspect & Assess",
    accent: false,
  },
  {
    index: "03",
    kicker: "Clean & Restore",
    title: "Containment & Mitigation",
    accent: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Carri B.",
    quote:
      "We had a water leak inside our bathroom, and it was the first we've ever had. Aaron walked us step by step through how to handle the situation. He was very informative, patient, and willing to help us any way he could.",
  },
  {
    name: "Alicia D.",
    quote:
      "Gallagher Restoration to the rescue! A huge thank you to Aaron and his team for saving us once again. As soon as I call, they are there. They've definitely earned our trust.",
  },
  {
    name: "Tim K.",
    quote:
      "Gallagher Restoration did an amazing job remodeling our master bath and moving our laundry from the garage to inside. Aaron did a great job communicating with us during the process. I would highly recommend Gallagher Restoration.",
  },
  {
    name: "Natalie C.",
    quote:
      "I cannot express how thankful we are for all of your amazing and hard work. Not only did they finish the job on time, but Aaron's team was such a pleasure to work with.",
  },
] as const;

/**
 * Blog post index — kept in sync with content/blog/*.json.
 * Full article bodies live in content/blog/*.json and are loaded via
 * lib/blog-content.ts on the server. Do NOT import blog-content here —
 * lib/site.ts is pulled into client bundles.
 * Sorted newest first.
 */
export const POSTS = [
  {
    slug: "can-insurance-choose-my-restoration-company",
    title: "Can Your Insurance Company Make You Use Their Restoration Contractor?",
    excerpt:
      "Adjusters recommend a preferred vendor and most homeowners assume it is required. In California it is not. Here is what the preferred-vendor arrangement actually is, and how to choose well.",
    image: "/reconstruction-hero.webp",
    imageAlt:
      "Contractor and homeowner reviewing a restoration scope of work on a California property",
    category: "Insurance",
    datePublished: "2026-09-06",
    dateModified: "2026-09-06",
  },
  {
    slug: "sewage-backup-in-your-home-what-to-do",
    title: "Sewage Backup in Your Home: What to Do in the First Hour",
    excerpt:
      "A sewage backup is a biohazard, not a plumbing inconvenience. Here is what to do immediately, what has to be thrown away, what it costs, and why most California policies do not cover it by default.",
    image: "/sewage-clean-up-services-hero.webp",
    imageAlt:
      "Restoration crew in protective equipment performing sewage cleanup inside a home",
    category: "Sewage",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "wildfire-ash-cleanup-inside-your-home",
    title: "Wildfire Ash Inside Your Home: Why Cleaning It Wrong Makes It Worse",
    excerpt:
      "Your house did not burn \u2014 but ash and smoke got in. Structural ash is not campfire ash, a broom is the wrong tool, and the insurance conversation is different. Here is how to handle it.",
    image: "/fire-hero.webp",
    imageAlt:
      "Wildfire ash settled on surfaces inside a Southern California home after a nearby fire",
    category: "Wildfire",
    datePublished: "2026-08-28",
    dateModified: "2026-08-28",
  },
  {
    slug: "mold-remediation-cost-california",
    title: "Mold Remediation Cost in California: 2026 Pricing Guide",
    excerpt:
      "Mold remediation in Southern California typically costs $1,500\u2013$6,000 for most residential jobs. Here is what drives the price up or down \u2014 and how to get an honest estimate.",
    image: "/mold-remediation-hero.webp",
    imageAlt:
      "Mold remediation technician inspecting a Southern California home for moisture damage and mold growth",
    category: "Mold",
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
  },
  {
    slug: "how-to-get-smoke-smell-out-of-house",
    title: "How to Get Smoke Smell Out of a House (and Why DIY Usually Fails)",
    excerpt:
      "Smoke odor is not a smell sitting on your walls \u2014 it is residue that has bonded to porous material and migrated into wall cavities. Here is what actually removes it, and why the ozone machine you were about to rent is a bad idea.",
    image: "/smoke-clean-up-hero.webp",
    imageAlt:
      "Technician performing smoke and soot cleanup on interior surfaces after a residential fire",
    category: "Fire",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
  },
  {
    slug: "what-to-do-after-a-house-fire",
    title: "What to Do After a House Fire: The First 72 Hours",
    excerpt:
      "The fire department leaves and the house is quiet. What happens in the next three days shapes your insurance claim, what can be salvaged, and how long you are displaced. Here is the sequence that matters.",
    image: "/fire-damage-restoration-hero.webp",
    imageAlt:
      "Fire-damaged residential interior awaiting restoration and board-up in Southern California",
    category: "Fire",
    datePublished: "2026-08-18",
    dateModified: "2026-08-18",
  },
  {
    slug: "slab-leak-signs-southern-california",
    title: "Slab Leak Warning Signs Every Southern California Homeowner Should Know",
    excerpt:
      "Most Inland Empire homes sit on a concrete slab, which means a failed water line can run for months before anything shows. These are the signs that show up first \u2014 and what a slab leak actually costs.",
    image: "/emergency-water-removal-hero.webp",
    imageAlt:
      "Restoration technician checking flooring for moisture from a suspected slab leak",
    category: "Water",
    datePublished: "2026-08-14",
    dateModified: "2026-08-14",
  },
  {
    slug: "is-black-mold-dangerous",
    title: "Is Black Mold Actually Dangerous? What the Research Says",
    excerpt:
      "\u201cToxic black mold\u201d is the most searched and least useful term in the mold world. Here is what public health agencies actually say about health effects, why color tells you almost nothing, and what genuinely matters.",
    image: "/mold-hero.webp",
    imageAlt:
      "Dark mold growth on a damp interior wall surface in a Southern California home",
    category: "Mold",
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
  },
  {
    slug: "signs-of-mold-behind-walls",
    title: "7 Signs of Mold Behind Your Walls (Before You Ever See It)",
    excerpt:
      "Most household mold grows where you cannot see it \u2014 inside wall cavities, under flooring, above ceilings. These are the seven signals that show up first, and the two that mean stop and call someone.",
    image: "/mold-inspection-hero.webp",
    imageAlt:
      "Technician using a moisture meter to check for hidden mold inside a wall cavity",
    category: "Mold",
    datePublished: "2026-08-06",
    dateModified: "2026-08-06",
  },
  {
    slug: "water-damage-categories-explained",
    title: "Clean, Gray, and Black Water: The 3 Categories of Water Damage",
    excerpt:
      "Category 1, 2, and 3 water are not about how dirty the water looks. They determine what can be dried and saved versus what has to be cut out and thrown away \u2014 and Category 1 does not stay Category 1 for long.",
    image: "/water-extraction-hero.webp",
    imageAlt:
      "Restoration technician extracting contaminated water from a flooded Southern California home",
    category: "Water",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
  },
  {
    slug: "air-conditioner-leaking-water-damage-ceiling",
    title: "Why Your AC Is Leaking Water Into the Ceiling \u2014 and What It Costs to Ignore",
    excerpt:
      "A clogged condensate line is the most common summer water loss in Southern California. It starts as a small stain on the ceiling and ends as an attic mold job. Here is how to catch it early.",
    image: "/ceiling-water-damage-hero.webp",
    imageAlt:
      "Water stain spreading across a ceiling below an attic air handler in a Southern California home",
    category: "Water",
    datePublished: "2026-07-29",
    dateModified: "2026-07-29",
  },
  {
    slug: "does-homeowners-insurance-cover-water-damage-california",
    title: "Does Homeowners Insurance Cover Water Damage in California?",
    excerpt:
      "Sudden and accidental water damage is usually covered. Gradual leaks, flood, and sewer backup usually are not. Here is where California policies draw the line \u2014 and how good claims get denied on a technicality.",
    image: "/property-damage-management-hero.webp",
    imageAlt:
      "Homeowner reviewing water damage documentation with a restoration technician in Southern California",
    category: "Insurance",
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
  },
  {
    slug: "how-long-does-water-damage-restoration-take",
    title: "How Long Does Water Damage Restoration Take?",
    excerpt:
      "Most Southern California water damage jobs dry in three to five days \u2014 but drying is only the first half. Here is a realistic phase-by-phase timeline, and the seven things that stretch it out.",
    image: "/water-dry-out-hero.webp",
    imageAlt:
      "Air movers and a dehumidifier running during structural drying in a Southern California home",
    category: "Water",
    datePublished: "2026-07-21",
    dateModified: "2026-07-21",
  },
  {
    slug: "qualified-experts-for-you-needs",
    title: "Qualified Experts for Your Needs",
    excerpt:
      "The people who make Gallagher Restoration what it is \u2014 IICRC- and ANSI-certified technicians who treat every property like their own.",
    image: "/blog/qualified-experts.jpg",
    imageAlt:
      "Gallagher Restoration certified restoration technicians on a Southern California job site",
    category: "Company",
    datePublished: "2025-02-19",
    dateModified: "2025-02-19",
  },
  {
    slug: "the-passion-behind-gallagher-restoration",
    title: "The Passion Behind Gallagher Restoration",
    excerpt:
      "How a Canyon Lake upbringing, a chance opportunity, and a lifelong commitment to community shaped the company Aaron Gallagher built.",
    image: "/blog/passion-behind.jpg",
    imageAlt:
      "Aaron Gallagher \u2014 founder of Gallagher Restoration \u2014 in Canyon Lake, California",
    category: "Company",
    datePublished: "2025-01-23",
    dateModified: "2025-01-23",
  },
  {
    slug: "how-gallagher-restoration-can-save-turkey-day",
    title: "How Gallagher Restoration Can Save Turkey Day",
    excerpt:
      "Thanksgiving is one of the most common days for household emergencies. Here is what usually goes wrong \u2014 and how to keep the holiday on track.",
    image: "/blog/turkey-day.jpg",
    imageAlt:
      "Thanksgiving dinner table setting representing holiday household emergency preparedness",
    category: "Seasonal",
    datePublished: "2024-11-27",
    dateModified: "2024-11-27",
  },
  {
    slug: "how-to-prepare-your-southern-california-home-for-winter",
    title: "Winterize Your SoCal Home: Stop Water Damage",
    excerpt:
      "SoCal winters are mild \u2014 but rain, wind, and colder temps still cause real damage. Eight practical steps to winterize your Southern California home.",
    image: "/blog/winter-prep.jpg",
    imageAlt:
      "Southern California home exterior prepared for the winter rainy season",
    category: "Seasonal",
    datePublished: "2024-10-18",
    dateModified: "2024-10-18",
  },
  {
    slug: "most-common-fire-damage-in-a-home",
    title: "Most Common Fire Damage in a Home",
    excerpt:
      "Cooking is the leading cause of home fires and injury. Here is what starts kitchen fires \u2014 and how homeowners keep them from starting in the first place.",
    image: "/blog/most-common-fire.jpg",
    imageAlt:
      "Editorial illustration of a residential kitchen with warm cooking-related fire risk imagery",
    category: "Fire",
    datePublished: "2024-08-22",
    dateModified: "2024-08-22",
  },
  {
    slug: "fire-damage-the-basics",
    title: "Fire Damage \u2014 The Basics",
    excerpt:
      "Understand the fundamentals of fire damage, smoke damage, and the professional restoration process.",
    image: "/blog/fire-damage-basics.jpg",
    imageAlt:
      "Fire damage restoration basics editorial hero image",
    category: "Fire",
    datePublished: "2024-08-01",
    dateModified: "2024-08-01",
  },
  {
    slug: "what-is-water-fire-and-mold-restoration",
    title: "What Is Water, Fire, and Mold Restoration?",
    excerpt:
      "An overview of the three most common categories of restoration work and what to expect when you call a professional.",
    image: "/blog/what-is-water-fire-mold.jpg",
    imageAlt:
      "Technician performing emergency water removal in a Southern California home",
    category: "Company",
    datePublished: "2024-07-11",
    dateModified: "2024-07-11",
  },
  {
    slug: "the-basics-of-water-damage",
    title: "The Basics of Water Damage",
    excerpt:
      "A homeowner's introduction to water damage \u2014 how it starts, why it spreads fast, and what a professional restoration process actually looks like.",
    image: "/blog/basics-water-damage.jpg",
    imageAlt:
      "Water pooled across the floor of a flooded Southern California home interior",
    category: "Water",
    datePublished: "2024-06-26",
    dateModified: "2024-06-26",
  },
] as const;

export const FAQS = [
  {
    q: "How quickly can someone get to my property?",
    a: "Our 24-hour emergency restoration team is available 7 days a week and can be at your location within 60 minutes.",
  },
  {
    q: "Which areas do you service?",
    a: "We provide restoration and emergency response services throughout Southern California, including Riverside, San Bernardino, Orange, San Diego, and Los Angeles counties.",
  },
  {
    q: "What types of damage do you handle?",
    a: "Water, fire and smoke, mold, sewage, and wildfire damage \u2014 along with management and coordination of the wider property damage restoration process.",
  },
  {
    q: "What happens after I call?",
    a: "Three steps: we take your call and dispatch immediately, inspect and assess the extent of the damage, then contain the damage and begin cleanup and restoration.",
  },
  {
    q: "Why does water damage need immediate attention?",
    a: "Water damage restoration is time-sensitive. Delays can lead to secondary issues such as mold growth, structural damage, and additional property loss.",
  },
] as const;

export const FAQ_CATEGORIES = [
  {
    eyebrow: "General",
    title: "About Gallagher Restoration",
    intro:
      "The questions Southern California homeowners ask most often before they call. If yours isn\u2019t here, our team answers the phone 24/7.",
    items: FAQS,
  },
  {
    eyebrow: "Water Damage",
    title: "Water Damage Questions",
    intro:
      "Burst pipes, appliance failures, roof leaks, flooding \u2014 the questions we hear most often after a water event.",
    items: [
      {
        q: "What are common causes of water damage in a home?",
        a: "Common causes include leaks from plumbing fixtures, burst pipes, roof leaks, flooding, appliance malfunctions, and sewer backups.",
      },
      {
        q: "How can I prevent water damage in my home?",
        a: "Regularly inspect and maintain your plumbing, roof, and gutters. Install water leak detection systems, sump pumps, and backflow preventers. Keep your home well-insulated and properly ventilated.",
      },
      {
        q: "What should I do if I discover water damage in my home?",
        a: "First, turn off the water source if possible. Then, document the damage with photos, and contact a water damage restoration professional or your insurance company to assess the situation.",
      },
      {
        q: "Is water damage covered by homeowners insurance?",
        a: "It depends on the cause of the damage and your insurance policy. Typically, sudden and accidental water damage (e.g., burst pipes) is covered, while gradual damage (e.g., long-term leaks) may not be.",
      },
      {
        q: "How can I mitigate the damage while waiting for professionals to arrive?",
        a: "Remove standing water with a wet-dry vacuum or mop. Place furniture on blocks or foil to prevent further damage. Increase ventilation by opening windows and using fans or dehumidifiers.",
      },
      {
        q: "What is the water damage restoration process?",
        a: "The process generally involves water extraction, drying, dehumidification, cleaning, sanitizing, and repairing or replacing damaged materials.",
      },
      {
        q: "Can I perform water damage cleanup on my own?",
        a: "For small, manageable incidents, you may be able to clean up minor water damage yourself. However, extensive damage or potential health risks may require professional assistance.",
      },
      {
        q: "How can I prevent mold growth after water damage?",
        a: "Ensure thorough drying of affected areas within 24\u201348 hours. Use dehumidifiers and fans, and consider applying antimicrobial agents. Address any structural damage promptly.",
      },
      {
        q: "What long-term effects can water damage have on a home?",
        a: "Untreated water damage can lead to mold growth, structural damage, compromised indoor air quality, and decreased property value if not properly remediated.",
      },
      {
        q: "Are there any health risks associated with water damage?",
        a: "Yes, mold and bacteria can thrive in moist environments, leading to potential health issues such as respiratory problems and allergies. It\u2019s crucial to address water damage promptly.",
      },
      {
        q: "How can I prevent water damage during extreme weather events?",
        a: "Install storm-resistant roofing, seal windows and doors, and consider a sump pump or a generator for power outages. Keep gutters and downspouts clear to prevent overflow.",
      },
      {
        q: "Can water damage affect the electrical system in my home?",
        a: "Yes, water damage can cause electrical hazards. If you suspect water damage near electrical components, turn off the power and consult an electrician.",
      },
    ],
  },
  {
    eyebrow: "Fire Damage",
    title: "Fire Damage Questions",
    intro:
      "What to do in the hours and days after a house fire \u2014 from safety to insurance to living through restoration.",
    items: [
      {
        q: "What should I do immediately after a fire in my home?",
        a: "Ensure everyone\u2019s safety and call 911 if necessary. Contact your insurance company to report the fire. Do not enter the damaged area until it\u2019s deemed safe by authorities.",
      },
      {
        q: "Is it safe to re-enter my home after a fire?",
        a: "Wait for the fire department to declare it safe before re-entering. Be cautious of structural damage, electrical hazards, and lingering smoke.",
      },
      {
        q: "How can I assess the extent of the fire damage?",
        a: "Hire a professional fire damage restoration company to assess the damage thoroughly.",
      },
      {
        q: "Will my insurance cover the fire damage?",
        a: "Most homeowners\u2019 insurance policies cover fire damage, but check your policy and contact your insurance provider to confirm.",
      },
      {
        q: "What should I document for insurance purposes?",
        a: "Document all damaged items and structural damage with photos or videos. Keep records of communication with insurance companies, adjusters, and contractors.",
      },
      {
        q: "How do I begin the fire damage cleanup and restoration process?",
        a: "Contact a reputable fire damage restoration company to assess and start the cleanup and restoration process.",
      },
      {
        q: "How long does the fire damage restoration process take?",
        a: "The timeline varies based on the extent of the damage but can range from weeks to months.",
      },
      {
        q: "Can I salvage any of my belongings after a fire?",
        a: "Some items may be salvageable, but it depends on the extent of the damage. Consult with professionals for guidance.",
      },
      {
        q: "What health risks are associated with fire damage?",
        a: "Smoke and soot can pose health risks, including respiratory issues. Consult a healthcare professional if you experience symptoms.",
      },
      {
        q: "How can I prevent future fires in my home?",
        a: "Install smoke detectors and carbon monoxide detectors. Maintain heating systems, chimneys, and electrical systems. Create and practice a fire escape plan with your family.",
      },
      {
        q: "What should I do about smoke odor in my home?",
        a: "Professionals can use specialized equipment to remove smoke odors. You may need to discard heavily affected items.",
      },
      {
        q: "How can I ensure the safety of my home after restoration?",
        a: "Follow the recommendations of fire restoration experts. Keep up with maintenance and safety measures.",
      },
      {
        q: "Can I live in my home during the restoration process?",
        a: "In some cases, it may be possible to live in a partially restored home, but it depends on the extent of the damage.",
      },
      {
        q: "What can I do to emotionally cope with the aftermath of a house fire?",
        a: "Seek support from friends, family, or professionals. Consider counseling or therapy to address trauma and stress.",
      },
      {
        q: "How do I find a reputable fire damage restoration company?",
        a: "Ask for recommendations from your insurance provider, friends, or family. Check online reviews and verify their credentials and licenses.",
      },
    ],
  },
] as const;

export const SERVICE_OPTIONS = [
  "Water Damage",
  "Fire & Smoke Damage",
  "Mold",
  "Sewage Clean-Up",
  "Wildfire Damage",
  "Other Property Damage",
] as const;

/**
 * Full service catalog — parent verticals + leaf pages.
 * `slug` is the canonical URL path (matches the WordPress sitemap).
 */
export const SERVICE_CATEGORIES = [
  {
    slug: "water-damage-restoration",
    kicker: "Water Damage",
    title: "Water Damage Restoration",
    summary:
      "Water damage restoration is a time-sensitive process. Delays can lead to secondary issues such as mold growth, structural damage, and additional property loss.",
    leaves: [
      { slug: "emergency-water-removal", label: "Emergency Water Removal" },
      { slug: "water-damage-clean-up", label: "Water Damage Clean-Up" },
      { slug: "water-damage-remediation", label: "Water Damage Remediation" },
      { slug: "ceiling-water-damage", label: "Ceiling Water Damage" },
      { slug: "water-damage-repair", label: "Water Damage Repair" },
      { slug: "water-dry-out", label: "Water Dry-Out" },
      { slug: "water-extraction", label: "Water Extraction Services" },
      { slug: "roof-water-damage", label: "Roof Water Damage Repair" },
      { slug: "pipe-burst-flooding-and-remediation", label: "Pipe Burst Flooding & Remediation" },
    ],
  },
  {
    slug: "fire-damage-restoration",
    kicker: "Fire Damage",
    title: "Fire & Smoke Damage Restoration",
    summary:
      "Professional fire damage restoration helps address the immediate and long-term effects of fire, smoke, and related property damage.",
    leaves: [
      { slug: "fire-damage-restoration", label: "Fire Damage Restoration" },
      { slug: "smoke-clean-up", label: "Smoke Clean-Up" },
    ],
  },
  {
    slug: "mold-remediation",
    kicker: "Mold",
    title: "Mold Remediation",
    summary:
      "Effective mold remediation begins by identifying affected areas and locating the source of excess moisture, then containing, removing, and restoring damaged materials.",
    leaves: [
      { slug: "mold-remediation", label: "Mold Remediation" },
      { slug: "mold-testing-services", label: "Mold Testing" },
      { slug: "mold-inspection-services", label: "Mold Inspection Services" },
    ],
  },
  {
    slug: "wildfire",
    kicker: "Wildfire",
    title: "Wildfire Damage Assistance",
    summary:
      "When wildfire threatens your property, our experienced restoration team provides fast, professional assistance to help protect and restore your home.",
    leaves: [
      { slug: "wildfire", label: "Wildfire Damage" },
      { slug: "wildfire-altadena", label: "Altadena Wildfire Response" },
      { slug: "wildfire-palisades", label: "Palisades Wildfire Response" },
    ],
  },
  {
    slug: "sewage-clean-up-services",
    kicker: "Sewage",
    title: "Sewage Clean-Up",
    summary:
      "Professional sewage cleanup and property restoration services for contaminated water emergencies.",
    leaves: [{ slug: "sewage-clean-up-services", label: "Sewage Clean-Up Services" }],
  },
  {
    slug: "property-damage-management",
    kicker: "Property Damage",
    title: "Property Damage Management",
    summary:
      "Professional management and coordination of the restoration process following property damage.",
    leaves: [{ slug: "property-damage-management", label: "Property Damage Management" }],
  },
  {
    slug: "reconstruction",
    kicker: "Reconstruction",
    title: "Reconstruction",
    summary:
      "Full reconstruction services after mitigation is complete — restoring your property from the studs out.",
    leaves: [{ slug: "reconstruction", label: "Reconstruction Services" }],
  },
] as const;

/**
 * Cities we service, grouped by county. Slugs match the canonical URL scheme
 * (`/{slug}/`, e.g. `/canyon-lake-ca`). Legacy `/gallagher-restoration-{slug}/`
 * URLs 301 to these via next.config.ts.
 */
export const CITIES_BY_COUNTY = {
  "riverside-county": [
    { slug: "canyon-lake-ca", name: "Canyon Lake", isHq: true },
    { slug: "corona-ca", name: "Corona" },
    { slug: "hemet-ca", name: "Hemet" },
    { slug: "lake-elsinore-ca", name: "Lake Elsinore" },
    { slug: "menifee-ca", name: "Menifee" },
    { slug: "murrieta-ca", name: "Murrieta" },
    { slug: "nuevo-ca", name: "Nuevo" },
    { slug: "perris-ca", name: "Perris" },
    { slug: "san-jacinto-ca", name: "San Jacinto" },
    { slug: "sun-city-ca", name: "Sun City" },
    { slug: "temecula-ca", name: "Temecula" },
    { slug: "winchester-ca", name: "Winchester" },
    { slug: "wildomar-ca", name: "Wildomar" },
  ],
  "san-bernardino-county": [
    { slug: "rancho-cucamonga-ca", name: "Rancho Cucamonga" },
    { slug: "san-bernardino-ca", name: "San Bernardino" },
    { slug: "fontana-ca", name: "Fontana" },
    { slug: "ontario-ca", name: "Ontario" },
    { slug: "victorville-ca", name: "Victorville" },
    { slug: "chino-ca", name: "Chino" },
  ],
  "orange-county": [
    { slug: "anaheim-ca", name: "Anaheim" },
    { slug: "santa-ana-ca", name: "Santa Ana" },
    { slug: "irvine-ca", name: "Irvine" },
    { slug: "huntington-beach-ca", name: "Huntington Beach" },
  ],
  "san-diego-county": [
    { slug: "san-diego-ca", name: "San Diego" },
    { slug: "vista-ca", name: "Vista" },
    { slug: "carlsbad-ca", name: "Carlsbad" },
    { slug: "escondido-ca", name: "Escondido" },
    { slug: "oceanside-ca", name: "Oceanside" },
    { slug: "chula-vista-ca", name: "Chula Vista" },
  ],
  "los-angeles-county": [
    { slug: "los-angeles-ca", name: "Los Angeles" },
    { slug: "santa-clarita-ca", name: "Santa Clarita" },
    { slug: "pomona-ca", name: "Pomona" },
    { slug: "torrance-ca", name: "Torrance" },
    { slug: "glendale-ca", name: "Glendale" },
  ],
} as const;
