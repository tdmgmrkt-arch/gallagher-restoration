import { Hero } from "@/components/sections/Hero";
import { WildfireBanner } from "@/components/sections/WildfireBanner";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { TeamBand } from "@/components/sections/TeamBand";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WildfireBanner />
      <ServiceAreas />
      <Services />
      <About />
      <TeamBand />
      <Process />
      <Testimonials />
      <NewsGrid />
      <Faq />
      <FinalCta />
    </>
  );
}
