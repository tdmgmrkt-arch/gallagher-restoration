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

const WORDPRESS_KILLS = [
  "/sample-page",
  "/gallagher-restoration-draft",
  "/gallagher-restoration-canyon-lake",
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
      { source: "/menifee", destination: "/menifee-ca", permanent: true },
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
