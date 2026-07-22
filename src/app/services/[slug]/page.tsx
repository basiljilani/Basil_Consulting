import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { ServiceGlyph } from "@/components/ui/service-glyph";
import { ServiceCard } from "@/components/ui/service-card";
import { Cta } from "@/components/sections/cta";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { getService, services, serviceSlugs } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    // The root template appends "— Basil Consulting", so keep this short enough
    // that the full string stays inside the ~60 char SERP cutoff.
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — Basil Consulting`,
      description: service.summary,
      url: `/services/${service.slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.short, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.title}
        lede={service.summary}
        crumbs={crumbs}
      >
        <span className="inline-flex text-basil-400">
          <ServiceGlyph name={service.glyph} className="h-14 w-14" />
        </span>
      </PageHero>

      <Section topPad={false}>
        <div className="grid gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
          {/* Main column */}
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-pretty text-dim">
                {service.description}
              </p>
            </Reveal>

            <div className="mt-16">
              <Reveal>
                <h2 className="eyebrow">What changes</h2>
              </Reveal>
              <Stagger className="mt-7 space-y-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)]">
                {service.outcomes.map((outcome) => (
                  <StaggerItem
                    key={outcome}
                    className="flex items-start gap-4 bg-void p-6 transition-colors duration-400 hover:bg-elev-1"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-basil-400"
                    >
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                      <path
                        d="m5 8.2 2.1 2.1L11 6.4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[0.9375rem] leading-relaxed text-bright">
                      {outcome}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="mt-16">
              <Reveal>
                <h2 className="eyebrow">What ships</h2>
              </Reveal>
              <Stagger className="mt-7 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item, i) => (
                  <StaggerItem
                    key={item}
                    className="panel rounded-xl p-5 transition-colors duration-400 hover:border-[color-mix(in_oklab,#4dfaa2_22%,transparent)]"
                  >
                    <span className="font-mono text-[0.6875rem] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-dim">{item}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="panel rounded-2xl p-7">
                <h2 className="eyebrow">Engagement</h2>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[0.75rem] tracking-wide text-faint uppercase">Model</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-bright">
                      {service.engagement.model}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] tracking-wide text-faint uppercase">
                      Typical duration
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-bright">
                      {service.engagement.timeline}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] tracking-wide text-faint uppercase">
                      Investment from
                    </dt>
                    <dd className="display mt-1.5 text-3xl text-basil-300">
                      {service.engagement.startingAt}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 border-t border-[var(--hairline)] pt-6">
                  <h3 className="text-[0.75rem] tracking-wide text-faint uppercase">
                    Typical stack
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-[var(--hairline)] bg-white/[0.02] px-3 py-1 text-[0.75rem] text-dim"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href="/contact" className="mt-8 w-full">
                  Discuss this engagement
                  <ArrowRight />
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Related */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)] text-bright">
              Frequently paired with
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-bright"
            >
              All capabilities
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <StaggerItem key={item.slug} className="flex">
              <ServiceCard service={item} className="w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Cta />

      <ServiceJsonLd service={service} />
      <BreadcrumbJsonLd items={crumbs} />
    </>
  );
}
