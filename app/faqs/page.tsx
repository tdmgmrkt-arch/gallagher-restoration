import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqCategorized } from "@/components/sections/FaqCategorized";
import { FinalCta } from "@/components/sections/FinalCta";
import { FAQ_CATEGORIES } from "@/lib/site";

const FAQ_LAST_UPDATED = "2026-08-18";

export const metadata: Metadata = {
  title: "Restoration FAQs | Gallagher Restoration Co.",
  description:
    "Answers to the most common questions about our 24/7 water, fire, mold, and property damage restoration services in Southern California.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://gallagherrestoration.com/faqs#faqpage",
    url: "https://gallagherrestoration.com/faqs",
    name: "Water & Fire Damage Restoration FAQs — Southern California",
    inLanguage: "en-US",
    datePublished: FAQ_LAST_UPDATED,
    dateModified: FAQ_LAST_UPDATED,
    isPartOf: { "@id": "https://gallagherrestoration.com/#website" },
    about: { "@id": "https://gallagherrestoration.com/#business" },
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ),
  };

  return (
    <>
      <PageHero
        eyebrow="Restoration FAQs"
        title="Water & Fire Damage Restoration FAQs \u2014"
        accent="Southern California"
        intro="Emergencies are stressful and answers matter. Here are the questions Southern California homeowners ask us most often — grouped by damage type — and if yours isn't listed, our team answers the phone 24 hours a day, 7 days a week."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
        backgroundImage="/faqs-hero.webp"
        backgroundAlt="Gallagher Restoration crew member explaining a moisture-reading diagram to a homeowner"
        backgroundPosition="center 52%"
      />
      <FaqCategorized />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
