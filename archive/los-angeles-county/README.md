# Archived — Los Angeles County

Removed from the live site on **2026-10-19** at the client's request. Gallagher
Restoration Co. no longer advertises coverage in Los Angeles County; the service
area is now **four counties**: Riverside, San Bernardino, Orange, San Diego.

Nothing here is deleted or web-accessible. This directory sits outside `content/`
and `public/`, so the content loaders in `lib/city-content.ts`,
`lib/county-content.ts`, and `lib/service-content.ts` never read it, no route is
generated for it, and nothing in it is served by Next.

## What's in here

| File | Was served at |
|---|---|
| `content/counties/los-angeles-county.json` | `/los-angeles-county` |
| `content/cities/los-angeles-ca.json` | `/los-angeles-ca` |
| `content/cities/santa-clarita-ca.json` | `/santa-clarita-ca` |
| `content/cities/pomona-ca.json` | `/pomona-ca` |
| `content/cities/torrance-ca.json` | `/torrance-ca` |
| `content/cities/glendale-ca.json` | `/glendale-ca` |
| `content/services/wildfire-palisades.json` | `/wildfire-palisades` |
| `content/services/wildfire-altadena.json` | `/wildfire-altadena` |
| `public/wildfire-palisades-hero.webp` | hero image for `/wildfire-palisades` |
| `public/wildfire-altadena-hero.webp` | hero image for `/wildfire-altadena` |

The two wildfire pages were Jan-2025 event-response pages (Palisades Fire,
Eaton Fire). Both are entirely LA County geography, which is why they came down
with the county rather than staying as standalone service pages.

## How to restore

Moving the JSON back into `content/` is enough to re-create the routes — the
loaders use `readdirSync`, and `generateStaticParams` plus `app/sitemap.ts` pick
up the slugs automatically. The images have to go back to `public/` for the two
service heroes to render. But the *routes* are only half of it; these edits were
unwound by hand and have to be redone by hand:

- `lib/site.ts` — `COUNTIES` (the `05` Los Angeles entry), the
  `los-angeles-county` block in `CITIES_BY_COUNTY`, the two wildfire leaves in
  the wildfire `SERVICE_CATEGORIES` entry, and the service-area FAQ answer.
- `lib/city-coords.ts` — coordinates for the five cities and the county.
- `app/page.tsx` and `components/pages/ServicePage.tsx` — the
  `areaServed` LocalBusiness/Service schema arrays.
- `components/pages/ServicePage.tsx` — `wildfire-palisades` /
  `wildfire-altadena` entries in the hero-image map.
- `next.config.ts` — **delete the `REMOVED_LA_*` redirects**, or the restored
  pages will 301 away and be unreachable.
- Counts and copy, which were all changed from five/5 to four/4:
  `components/sections/Hero.tsx`, `app/about/page.tsx`,
  `app/service-areas/page.tsx`, `app/terms-of-service/page.tsx`,
  `components/layout/SiteHeader.tsx` (also "34 cities" → "29 cities"),
  `public/llms.txt`, `public/ai-actions.json`, the `"5 counties"` proof-strip
  values and meta descriptions across `content/services/*.json`, and the
  internal links in `content/blog/*.json`.

`git log -- archive/los-angeles-county` and the removal commit's diff are the
authoritative record of exactly what changed.
