import { COMPANY, OFFICES, PHONE } from "@/lib/site";

const BASE_URL = "https://gallagherrestoration.com";

/**
 * Satellite offices as schema.org sub-entities of the main Organization.
 *
 * Deliberately minimal: no `aggregateRating` (the 61 Google reviews belong to the
 * Canyon Lake profile alone), no `geo`, no `hasMap`, and no `streetAddress` — see
 * the OFFICES comment in lib/site.ts for why the street addresses stay unpublished.
 * `PostalAddress` treats `streetAddress` as optional, so locality/region/country
 * validates clean on its own.
 */
export function officeNodes() {
  return OFFICES.filter((o) => o.kind === "satellite").map((o) => ({
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#office-${o.id}`,
    name: `${COMPANY.name} — ${o.role}`,
    telephone: PHONE.display,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: o.locality,
      addressRegion: o.region,
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: o.locality },
  }));
}
