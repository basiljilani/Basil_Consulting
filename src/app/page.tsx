import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Metrics } from "@/components/sections/metrics";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Approach } from "@/components/sections/approach";
import { Industries } from "@/components/sections/industries";
import { Testimonial } from "@/components/sections/testimonial";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <Metrics />
      <ServicesGrid />
      <Approach />
      <Industries />
      <Testimonial />
      <Faq />
      <Cta />

      <FaqJsonLd items={faqItems} />
    </>
  );
}
