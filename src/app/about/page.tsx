import type { Metadata } from "next";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { Cta } from "@/components/sections/cta";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const metadata: Metadata = {
  title: "About — The Team Behind the Decision Layer",
  description:
    "Basil Consulting is a senior-only analytics and AI engineering firm. Founded in 2019, we build decision intelligence systems that reach production and outlive the engagement.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Basil Consulting",
    description:
      "A senior-only analytics and AI engineering firm building decision intelligence that reaches production.",
    url: "/about",
  },
};

const FACTS = [
  { value: 2019, label: "Founded", raw: true },
  { value: 38, label: "Practitioners", suffix: "" },
  { value: 14, label: "Countries delivered in", suffix: "" },
  { value: 92, label: "Repeat engagement rate", suffix: "%" },
];

const DISCIPLINES = [
  {
    title: "Data & platform engineering",
    body: "Lakehouse architecture, streaming, orchestration and the unglamorous reliability work that decides whether anything above it survives.",
  },
  {
    title: "Applied machine learning",
    body: "Forecasting, optimisation and causal inference from people who have defended a model in front of a risk committee, not just a notebook.",
  },
  {
    title: "AI systems engineering",
    body: "Retrieval, agents, evaluation harnesses and cost control — the difference between a convincing demo and something you can put in front of customers.",
  },
  {
    title: "Analytics leadership",
    body: "Former CDOs and heads of data who have run the function from the inside and know which battles are worth having.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We were the people your last consultants handed over to"
        lede="Basil was founded by operators who spent years on the receiving end of analytics programmes — inheriting systems nobody could run, benefit cases nobody believed, and platforms that quietly stopped being used. We built the firm we wished had shown up."
        crumbs={CRUMBS}
      />

      <Section topPad={false}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.08} className="bg-void p-8">
              <div className="display text-[clamp(2.25rem,4.4vw,3rem)] text-bright tabular-nums">
                {fact.raw ? (
                  fact.value
                ) : (
                  <Counter to={fact.value} suffix={fact.suffix} />
                )}
              </div>
              <div className="mt-3 text-sm text-faint">{fact.label}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="The firm"
              title={
                <>
                  Senior only.
                  <br />
                  <span className="text-faint">By design.</span>
                </>
              }
            />
          </div>

          <Reveal>
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-pretty text-dim">
              <p>
                Every person Basil puts on an engagement has shipped production data systems
                for at least eight years. There is no analyst tier, no offshore delivery
                centre and no pyramid that needs filling — which means the economics only
                work if the work is genuinely hard. That is the filter we want.
              </p>
              <p>
                It also changes the conversation. Our people can disagree with your
                architecture in the first week, because they have built the alternative
                three times before. They can tell you the model is not the bottleneck. And
                they can say the engagement should be smaller than you asked for, which is
                something a leverage-based firm structurally cannot do.
              </p>
              <p>
                We stay deliberately small. Around{" "}
                <span className="text-bright">
                  <Counter to={38} /> practitioners
                </span>
                , a handful of concurrent engagements, and a hard preference for depth over
                logo count. Since{" "}
                <span className="text-bright">{siteConfig.founded}</span> that has produced a
                repeat rate we are more proud of than any revenue figure.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <SectionHeading
          eyebrow="Disciplines"
          title="Four practices, one delivery team"
          lede="We staff mixed pods rather than handing work between specialisms. The platform engineer and the ML engineer sit in the same standup because the seam between them is where programmes usually fail."
        />

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          {DISCIPLINES.map((discipline) => (
            <StaggerItem key={discipline.title} className="panel rounded-2xl p-8">
              <h3 className="text-lg font-medium tracking-[-0.02em] text-bright">
                {discipline.title}
              </h3>
              <p className="mt-3 leading-relaxed text-pretty text-dim">{discipline.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <StackMarquee />

      <Cta
        eyebrow="Work with us"
        title="Tell us what is not working."
        body="Bring the problem you have been circling for three quarters. Forty-five minutes with two principals, and a straight answer on whether we are the right people for it."
      />

      <BreadcrumbJsonLd items={CRUMBS} />
    </>
  );
}
