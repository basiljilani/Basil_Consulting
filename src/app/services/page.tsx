import type { Metadata } from "next";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/ui/service-card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Cta } from "@/components/sections/cta";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { services } from "@/lib/services";

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export const metadata: Metadata = {
  title: "Services — Decision Intelligence, AI & Data Platform Consulting",
  description:
    "Nine consulting capabilities spanning decision intelligence, predictive analytics, lakehouse engineering, generative AI, MLOps, governance and fractional CDO leadership.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Basil Consulting",
    description:
      "Nine capabilities spanning decision intelligence, predictive analytics, data platform engineering, generative AI, MLOps and data governance.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Nine ways we turn an analytics estate into an operating advantage"
        lede="Every engagement below ends with a production system, a measurement harness and a named internal owner. Pick the one that matches your constraint — or bring us the problem and we will tell you which it is."
        crumbs={CRUMBS}
      />

      <Section topPad={false}>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="flex">
              <ServiceCard service={service} className="w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Cta
        eyebrow="Not sure which"
        title="Start with the diagnosis."
        body="Three weeks, fixed fee. We map your recurring decisions, put a value on each, and tell you which capability earns its keep first — including when the answer is none of them."
      />

      <BreadcrumbJsonLd items={CRUMBS} />
    </>
  );
}
