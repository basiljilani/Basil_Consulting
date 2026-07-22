import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const INDUSTRIES = [
  {
    name: "Financial Services",
    application: "Risk modelling, capital allocation and model risk management under supervisory scrutiny.",
  },
  {
    name: "Manufacturing & Industrial",
    application: "Demand sensing, predictive maintenance and multi-echelon inventory optimisation.",
  },
  {
    name: "Retail & Consumer",
    application: "Assortment, price elasticity and customer lifetime value across every channel.",
  },
  {
    name: "Healthcare & Life Sciences",
    application: "Trial analytics, capacity forecasting and evidence generation on governed data.",
  },
  {
    name: "Energy & Utilities",
    application: "Load forecasting, asset reliability and trading decision support in real time.",
  },
  {
    name: "Logistics & Supply Chain",
    application: "Network optimisation, ETA prediction and exception handling at scale.",
  },
  {
    name: "Technology & SaaS",
    application: "Product analytics, expansion propensity and usage-based pricing intelligence.",
  },
  {
    name: "Private Equity",
    application: "Diligence analytics and value-creation programmes across the portfolio.",
  },
];

export function Industries() {
  return (
    <Section className="border-t border-[var(--hairline)]">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Sectors"
            title={
              <>
                Domain depth,
                <br />
                <span className="text-faint">not generic playbooks</span>
              </>
            }
            lede="Forecasting a utility's load curve and forecasting a retailer's assortment are not the same problem. We staff engagements with people who have shipped in your sector before."
          />
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <StaggerItem
              key={industry.name}
              className="group relative bg-void p-7 transition-colors duration-500 hover:bg-elev-1"
            >
              <h3 className="text-[0.9375rem] font-medium text-bright">{industry.name}</h3>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-faint">
                {industry.application}
              </p>
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px scale-y-0 bg-basil-400 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
