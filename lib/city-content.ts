import fs from "node:fs";
import path from "node:path";

export type CityContent = {
  slug: string;
  name: string;
  countySlug: string;
  countyName: string;
  isHq?: boolean;

  /** Drive time from Canyon Lake HQ (minutes). 0 = HQ. */
  proximityMinutes: number;
  /** Approximate miles from Canyon Lake HQ. */
  proximityMiles?: number;
  /** Freeway or highway route used for dispatch. */
  route?: string;

  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitle: string;
  heroAccent?: string;
  heroIntro: string;

  proofStrip: { label: string; value: string; hint?: string }[];

  /** ~150-word paragraph on our relationship to the city. */
  localHook: string;

  neighborhoods: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: { name: string; body: string }[];
  };

  commonDamage: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: { title: string; body: string }[];
  };

  howWeWork: { eyebrow: string; heading: string; body: string };

  whyChoose: { eyebrow: string; heading: string; body: string };

  pricing?: { eyebrow: string; heading: string; body: string };

  /** Optional ~40-word paragraph on notable local track record. */
  notableWork?: string;

  faqs: { q: string; a: string }[];
};

const contentDir = path.join(process.cwd(), "content", "cities");

function loadAll(): Record<string, CityContent> {
  if (!fs.existsSync(contentDir)) return {};
  const out: Record<string, CityContent> = {};
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    out[slug] = JSON.parse(raw) as CityContent;
  }
  return out;
}

export const CITY_CONTENT: Record<string, CityContent> = loadAll();
export const CITY_SLUGS = Object.keys(CITY_CONTENT);
