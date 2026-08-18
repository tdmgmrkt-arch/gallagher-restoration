import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqCategorized } from "@/components/sections/FaqCategorized";
import { FinalCta } from "@/components/sections/FinalCta";
import { FAQ_CATEGORIES } from "@/lib/site";

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
