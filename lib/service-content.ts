import fs from "node:fs";
import path from "node:path";

export type ServiceCategory =
  | "water"
  | "fire"
  | "mold"
  | "sewage"
  | "property"
  | "wildfire"
  | "reconstruction";

export type ServiceContent = {
  slug: string;
  category: ServiceCategory;
  /** If this leaf sits under a parent hub, the parent's slug. Water leaves point to water-damage-restoration, etc. */
  parentSlug?: string;

  /** 50-60 chars. Includes primary keyword. */
  metaTitle: string;
  /** 150-160 chars. Primary keyword + differentiator + CTA. */
  metaDescription: string;

  /** Small mono-caps kicker above the H1. */
  heroEyebrow: string;
  /** H1 — target keyword or close variant. */
  heroTitle: string;
  /** Optional trailing accent phrase (rendered in green). */
  heroAccent?: string;
  /** 2-3 sentences, primary keyword + SoCal + differentiator. */
  heroIntro: string;

  /** Optional above-the-fold cross-links to related/sibling services for intent forks. */
  crossLinks?: { label: string; href: string; note?: string }[];

  /** 3 stat tiles rendered in the proximity/proof band. */
  proofStrip: { label: string; value: string; hint?: string }[];

  whatItIs: {
    eyebrow: string;
    heading: string;
    body: string;
  };

  process: {
    eyebrow: string;
    heading: string;
    steps: { kicker: string; title: string; body: string }[];
  };

  signs: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: { title: string; body: string }[];
  };

  whyUs: {
    eyebrow: string;
    heading: string;
    body: string;
  };

  pricing: {
    eyebrow: string;
    heading: string;
    body: string;
  };

  faqs: { q: string; a: string }[];

  /** Slugs of 2-4 related services for the cross-link block. */
  relatedServices: string[];
};

const contentDir = path.join(process.cwd(), "content", "services");



function loadAll(): Record<string, ServiceContent> {
  if (!fs.existsSync(contentDir)) return {};
  const out: Record<string, ServiceContent> = {};
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    out[slug] = JSON.parse(raw) as ServiceContent;
  }
  return out;
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = loadAll();

export const SERVICE_SLUGS = Object.keys(SERVICE_CONTENT);
