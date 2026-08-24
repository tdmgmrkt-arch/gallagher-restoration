import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "24/7 Water, Fire & Mold Restoration SoCal | Gallagher",
  description:
    "24/7 water, fire & mold damage restoration across Southern California. IICRC-trained crews on-site within 60 min. Call (951) 541-0034.",
  metadataBase: new URL("https://gallagherrestoration.com"),
  openGraph: {
    title: "Gallagher Restoration Co.",
    description:
      "24/7 water, fire, mold, and property damage restoration in Southern California. Crews on site within 60 minutes.",
    type: "website",
    locale: "en_US",
    url: "https://gallagherrestoration.com",
    siteName: "Gallagher Restoration Co.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gallagher Restoration Co. — 24/7 water, fire, and mold restoration serving Southern California",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallagher Restoration Co.",
    description:
      "24/7 water, fire, mold, and property damage restoration in Southern California. Crews on site within 60 minutes.",
    images: ["/og-image.jpg"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://gallagherrestoration.com/#website",
  url: "https://gallagherrestoration.com",
  name: "Gallagher Restoration Co.",
  publisher: { "@id": "https://gallagherrestoration.com/#business" },
  inLanguage: "en-US",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://gallagherrestoration.com/#organization",
  name: "Gallagher Restoration Co.",
  legalName: "Gallagher Restoration Inc",
  url: "https://gallagherrestoration.com",
  logo: "https://gallagherrestoration.com/gallagher_badge_logo.webp",
  telephone: "(951) 541-0034",
  areaServed: "Southern California",
  sameAs: [
    "https://www.facebook.com/GallagherRestorationCo",
    "https://www.instagram.com/gallagher1restoration/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCallBar />
      </body>
    </html>
  );
}
