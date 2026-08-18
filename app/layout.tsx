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
  title:
    "Gallagher Restoration Co. \u2014 Water, Fire & Mold Restoration | Southern California",
  description:
    "24/7 emergency water, fire, and mold damage restoration across Riverside, San Bernardino, Orange, and San Diego counties. On-site within 60 minutes. Call (951) 541-0034.",
  metadataBase: new URL("https://gallagherrestoration.com"),
  openGraph: {
    title: "Gallagher Restoration Co.",
    description:
      "24/7 water, fire, mold, and property damage restoration in Southern California. Crews on site within 60 minutes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCallBar />
      </body>
    </html>
  );
}
