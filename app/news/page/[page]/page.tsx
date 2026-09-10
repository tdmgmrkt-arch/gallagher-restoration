import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsIndex } from "@/components/sections/NewsIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { POST_PAGE_COUNT } from "@/lib/site";

export const dynamicParams = false;

/**
 * Page 1 is served from /news, so this route only generates 2..N.
 * next.config.ts permanently redirects /news/page/1 -> /news.
 */
export function generateStaticParams() {
  return Array.from({ length: Math.max(0, POST_PAGE_COUNT - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

function parsePage(raw: string): number | null {
  if (!/^[0-9]+$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 2 && n <= POST_PAGE_COUNT ? n : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/news/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  const n = parsePage(page);
  if (!n) return {};

  return {
    title: `News & Resources — Page ${n} of ${POST_PAGE_COUNT} | Gallagher Restoration Co.`,
    description: `Page ${n} of restoration guides from Gallagher Restoration — water, fire, mold, and insurance resources for Southern California homeowners.`,
    alternates: { canonical: `/news/page/${n}` },
  };
}

export default async function NewsArchivePage({
  params,
}: PageProps<"/news/page/[page]">) {
  const { page } = await params;
  const n = parsePage(page);
  if (!n) notFound();

  return (
    <>
      <PageHero
        eyebrow={`News & Resources — Page ${n}`}
        title="Restoration Guides,"
        accent="Straight from the Crew"
        intro="Practical guides on water, fire, mold, and seasonal preparation — plus the stories and people behind Gallagher Restoration."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: `Page ${n}` },
        ]}
        backgroundImage="/news-hero.webp"
        backgroundAlt="Gallagher Restoration crew member reviewing damage documentation at dusk"
        backgroundPosition="center 48%"
      />

      <NewsIndex page={n} />

      <FinalCta />
    </>
  );
}
