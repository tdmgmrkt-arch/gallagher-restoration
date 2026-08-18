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

const nextConfig: NextConfig = {
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
