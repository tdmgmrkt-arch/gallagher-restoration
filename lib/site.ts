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
    title: "How to Prepare Your Southern California Home for Winter",
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
    imageAlt: "Fire damage restoration basics editorial hero image",
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
    { slug: "santa-clarita", name: "Santa Clarita" },
    { slug: "pomona-ca", name: "Pomona" },
    { slug: "torrance-ca", name: "Torrance" },
    { slug: "glendale-ca", name: "Glendale" },
  ],
} as const;
