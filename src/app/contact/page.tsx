import type { Metadata } from "next";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata: Metadata = {
  title: "Contact — Book an Analytics Briefing",
  description:
    "Book a 45-minute briefing with two Basil Consulting principals. Tell us the decision you keep getting wrong and we will give you a straight answer.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Basil Consulting",
    description: "Book a 45-minute briefing with two principals.",
    url: "/contact",
  },
};

const EXPECTATIONS = [
  {
    step: "01",
    title: "You write two paragraphs",
    body: "The decision that keeps going wrong, what you have already tried, and roughly what it costs. That is enough for us to be useful.",
  },
  {
    step: "02",
    title: "We reply within a day",
    body: "A principal reads it — not an SDR. The reply is usually a question that sharpens the problem, or an honest referral elsewhere.",
  },
  {
    step: "03",
    title: "Forty-five minutes, two principals",
    body: "A working session, not a pitch. You leave with a point of view on where the value is leaking, whether or not we ever work together.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Bring us your hardest decision"
        lede="No discovery call, no qualification script. Two principals, forty-five minutes, and a straight answer on whether this is a problem we are the right people for."
        crumbs={CRUMBS}
      />

      <Section topPad={false}>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left rail */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-8 space-y-8">
                {EXPECTATIONS.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-basil-400">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-[0.9375rem] font-medium text-bright">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-faint">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-12 border-t border-[var(--hairline)] pt-8">
                <h2 className="eyebrow">Direct</h2>
                <ul className="mt-5 space-y-0.5 text-[0.9375rem]">
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="inline-block py-1.5 text-dim transition-colors hover:text-basil-300"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-block py-1.5 text-dim transition-colors hover:text-basil-300"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                  <li className="pt-3 text-[0.875rem] leading-relaxed text-faint">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                    {siteConfig.contact.address.postalCode}
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <BreadcrumbJsonLd items={CRUMBS} />
    </>
  );
}
