import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CityPage } from "@/components/pages/CityPage";
import { CountyPage } from "@/components/pages/CountyPage";
import { ServicePage } from "@/components/pages/ServicePage";
import { CITY_CONTENT, CITY_SLUGS } from "@/lib/city-content";
import { COUNTY_CONTENT, COUNTY_SLUGS } from "@/lib/county-content";
import { SERVICE_CONTENT, SERVICE_SLUGS } from "@/lib/service-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SERVICE_SLUGS.map((slug) => ({ slug })),
    ...CITY_SLUGS.map((slug) => ({ slug })),
    ...COUNTY_SLUGS.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const service = SERVICE_CONTENT[slug];
  if (service) {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      alternates: { canonical: `/${slug}` },
    };
  }

  const city = CITY_CONTENT[slug];
  if (city) {
    return {
      title: city.metaTitle,
      description: city.metaDescription,
      alternates: { canonical: `/${slug}` },
    };
  }

  const county = COUNTY_CONTENT[slug];
  if (county) {
    return {
      title: county.metaTitle,
      description: county.metaDescription,
      alternates: { canonical: `/${slug}` },
    };
  }

  return {};
}

export default async function SlugDispatcher({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;

  const service = SERVICE_CONTENT[slug];
  if (service) return <ServicePage content={service} />;

  const city = CITY_CONTENT[slug];
  if (city) return <CityPage content={city} />;

  const county = COUNTY_CONTENT[slug];
  if (county) return <CountyPage content={county} />;

  notFound();
}
