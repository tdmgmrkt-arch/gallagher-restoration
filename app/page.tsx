import { Hero } from "@/components/sections/Hero";
import { WildfireBanner } from "@/components/sections/WildfireBanner";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { TeamBand } from "@/components/sections/TeamBand";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ADDRESS, COMPANY, FAQS, GBP, PHONE, REVIEWS, SOCIAL_URLS } from "@/lib/site";
import { CITY_COORDS } from "@/lib/city-coords";
import { getGoogleReviews } from "@/lib/google-reviews";

const HQ_COORDS = CITY_COORDS["canyon-lake-ca"];

export default async function Home() {
  const liveReviews = await getGoogleReviews();
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://gallagherrestoration.com/#business",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    description:
      "24/7 water, fire, mold, and property damage restoration across Southern California. On-site within 60 minutes.",
    url: "https://gallagherrestoration.com",
    telephone: PHONE.display,
    image: "https://gallagherrestoration.com/gallagher_fleet_rear.webp",
    sameAs: SOCIAL_URLS,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `California Contractors State License Board (CSLB) #${COMPANY.cslbLicense}`,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "California Contractors State License Board",
        url: "https://www.cslb.ca.gov",
      },
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CSLB License",
      value: COMPANY.cslbLicense,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    hasMap: GBP.mapsUrl,
    geo: HQ_COORDS
      ? {
          "@type": "GeoCoordinates",
          latitude: HQ_COORDS[0],
          longitude: HQ_COORDS[1],
        }
      : undefined,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Riverside County" },
      { "@type": "AdministrativeArea", name: "San Bernardino County" },
      { "@type": "AdministrativeArea", name: "Orange County" },
      { "@type": "AdministrativeArea", name: "San Diego County" },
      { "@type": "AdministrativeArea", name: "Los Angeles County" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: liveReviews.ratingValue,
      reviewCount: liveReviews.reviewCount,
      bestRating: REVIEWS.bestRating,
      worstRating: REVIEWS.worstRating,
    },
    founder: { "@id": "https://gallagherrestoration.com/#aaron-gallagher" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Restoration Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Water Damage Restoration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fire & Smoke Damage Restoration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mold Remediation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Storm & Wind Damage Restoration",
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://gallagherrestoration.com/#faqpage",
    url: "https://gallagherrestoration.com/#faqs",
    inLanguage: "en-US",
    about: { "@id": "https://gallagherrestoration.com/#business" },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <WildfireBanner />
      <ServiceAreas />
      <Services />
      <About />
      <TeamBand />
      <Process />
      <Testimonials />
      <NewsGrid />
      <Faq />
      <FinalCta />
    </>
  );
}
