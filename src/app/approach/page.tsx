import type { Metadata } from "next";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Approach } from "@/components/sections/approach";
import { Cta } from "@/components/sections/cta";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Approach", href: "/approach" },
];

export const metadata: Metadata = {
  title: "Our Approach — How We Deliver Analytics Programmes",
  description:
    "Five phases from diagnosis to capability transfer. How Basil Consulting delivers decision intelligence programmes that reach production and stay there.",
  alternates: { canonical: "/approach" },
  openGraph: {
    title: "Our Approach — Basil Consulting",
    description:
      "Five phases from diagnosis to capability transfer, and the principles behind them.",
    url: "/approach",
  },
};

const PRINCIPLES = [
  {
    title: "Decisions before dashboards",
    body: "We start from the decision and work backwards to the data. A metric that changes nobody's behaviour is a cost, not an asset — and most estates are carrying a great many of them.",
  },
  {
    title: "Production or it did not happen",
    body: "Pilots are cheap and prove almost nothing. We scope the first increment to reach live users inside eight weeks, because the operating model only reveals its flaws under real load.",
  },
  {
    title: "Small senior pods",
    body: "Four to seven people, all of whom write code or make architectural calls. No leverage pyramid, no bench to feed, nobody learning your domain at your expense.",
  },
  {
    title: "Evidence your CFO accepts",
    body: "Benefit claims are measured counterfactually and reconciled with finance. If we cannot attribute the lift credibly, we report that rather than dress it up.",
  },
  {
    title: "Your environment, your IP",
    body: "We build in your cloud, your repos, your standards. No Basil-hosted runtime, no proprietary platform, no licence that quietly becomes permanent.",
  },
  {
    title: "Designed to be left",
    body: "Runbooks, decision records, paired delivery and named owners. Success is measured by what still runs — and still gets improved — twelve months after we go.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Most analytics programmes fail at the handover, not the build"
        lede="The hard part was never the model. It is the operating change around it — ownership, measurement, trust and the discipline to retire what stopped earning. Our method is built around that reality."
        crumbs={CRUMBS}
      />

      <Section className="border-t border-[var(--hairline)]">
        <SectionHeading
          eyebrow="Principles"
          title="Six commitments we hold to"
          lede="These are not aspirations. Each one is a constraint we have turned down work over."
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, i) => (
            <StaggerItem
              key={principle.title}
              className="group relative bg-void p-8 transition-colors duration-500 hover:bg-elev-1"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-basil-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-bright">
                {principle.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-faint">
                {principle.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Approach />

      <Cta
        eyebrow="Start here"
        title="Three weeks to a straight answer."
        body="The diagnosis phase runs standalone at a fixed fee. You get the decision inventory, the value-at-stake model and a costed sequence — with no obligation to run the build with us."
      />

      <BreadcrumbJsonLd items={CRUMBS} />
    </>
  );
}
