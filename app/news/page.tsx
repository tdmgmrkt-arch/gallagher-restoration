import type { Metadata } from "next";

import { NewsIndex } from "@/components/sections/NewsIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "News & Resources | Gallagher Restoration Co.",
  description:
    "Restoration guides, seasonal preparation tips, and the story behind Gallagher Restoration — a Southern California family-owned restoration company.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Resources"
        title="Restoration Guides,"
        accent="Straight from the Crew"
        intro="Practical guides on water, fire, mold, and seasonal preparation — plus the stories and people behind Gallagher Restoration."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
        backgroundImage="/news-hero.webp"
        backgroundAlt="Gallagher Restoration crew member reviewing damage documentation at dusk"
        backgroundPosition="center 48%"
      />

      <NewsIndex page={1} />

      <FinalCta />
    </>
  );
}
