import fs from "node:fs";
import path from "node:path";

export type CountyContent = {
  slug: string;
  name: string;
  shortName: string;

  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitle: string;
  heroAccent?: string;
  heroIntro: string;

  proofStrip: { label: string; value: string; hint?: string }[];

  overview: { eyebrow: string; heading: string; body: string };

  topCities: { slug: string; name: string; blurb: string }[];

  localContext: { eyebrow: string; heading: string; body: string };

  serviceLines: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: { title: string; body: string }[];
  };

  whyLocal: { eyebrow: string; heading: string; body: string };

  faqs: { q: string; a: string }[];

  allCitiesIntro?: string;
};

const contentDir = path.join(process.cwd(), "content", "counties");

function loadAll(): Record<string, CountyContent> {
  if (!fs.existsSync(contentDir)) return {};
  const out: Record<string, CountyContent> = {};
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    out[slug] = JSON.parse(raw) as CountyContent;
  }
  return out;
}

export const COUNTY_CONTENT: Record<string, CountyContent> = loadAll();
export const COUNTY_SLUGS = Object.keys(COUNTY_CONTENT);
