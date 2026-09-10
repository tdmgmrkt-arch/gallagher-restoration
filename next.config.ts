import type { NextConfig } from "next";

const LEGACY_CITY_SLUGS = [
  "lake-elsinore",
  "san-jacinto",
  "nuevo",
  "murrieta",
  "hemet",
  "wildomar",
  "perris",
  "winchester",
  "sun-city",
  "temecula",
  "corona",
  "canyon-lake",
];

// Legacy WordPress posts. Every one of these was migrated to /news/<same-slug>,
// so the slug is reused verbatim on both sides — do not "tidy" this list into
// the kills below, these are real content pages that hold rankings.
const LEGACY_POSTS = [
  "what-is-water-fire-and-mold-restoration",
  "the-basics-of-water-damage",
  "fire-damage-the-basics",
  "most-common-fire-damage-in-a-home",
  "how-to-prepare-your-southern-california-home-for-winter",
  "how-gallagher-restoration-can-save-turkey-day",
  "the-passion-behind-gallagher-restoration",
  "qualified-experts-for-you-needs",
];

// Genuinely contentless on the old site — nothing to preserve, send them home.
// /gallagher-restoration-canyon-lake is NOT here: it was a real city page and
// now points at /canyon-lake-ca (the -ca variant is handled by LEGACY_CITY_SLUGS).
const WORDPRESS_KILLS = [
  "/sample-page",
  "/gallagher-restoration-draft",
  "/portfolio",
  "/gallagher-restoration-youtube",
];

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      ...LEGACY_CITY_SLUGS.map((slug) => ({
        source: `/gallagher-restoration-${slug}-ca`,
        destination: `/${slug}-ca`,
        permanent: true,
      })),
      ...LEGACY_POSTS.map((slug) => ({
        source: `/${slug}`,
        destination: `/news/${slug}`,
        permanent: true,
      })),
      // Old city page that predates the -ca suffix convention.
      {
        source: "/gallagher-restoration-canyon-lake",
        destination: "/canyon-lake-ca",
        permanent: true,
      },
      // WordPress blog taxonomy. Wildcarded rather than enumerated so any
      // category/tag that was never in the sitemap still lands somewhere real.
      { source: "/category/:path*", destination: "/news", permanent: true },
      { source: "/tag/:path*", destination: "/news", permanent: true },
      { source: "/author/:path*", destination: "/about", permanent: true },
      // /news is page 1 of the article index — keep a single canonical URL for it.
      { source: "/news/page/1", destination: "/news", permanent: true },
      { source: "/menifee", destination: "/menifee-ca", permanent: true },
      { source: "/santa-clarita", destination: "/santa-clarita-ca", permanent: true },
      {
        source: "/water-damage-remediation",
        destination: "/water-damage-restoration",
        permanent: true,
      },
      ...WORDPRESS_KILLS.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
