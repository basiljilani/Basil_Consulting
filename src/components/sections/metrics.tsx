import { Section } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

const METRICS = [
  {
    value: 2.4,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    label: "Value unlocked",
    note: "Cumulative client-attributed impact across engagements since 2019.",
  },
  {
    value: 94,
    suffix: "%",
    label: "Programmes to production",
    note: "Our engagements that reach live production use, not pilot purgatory.",
  },
  {
    value: 31,
    suffix: "%",
    label: "Median forecast lift",
    note: "Average error reduction against the incumbent baseline at handover.",
  },
  {
    value: 11,
    suffix: " wks",
    label: "Median time to first value",
    note: "From kickoff to a decision measurably improved in production.",
  },
];

export function Metrics() {
  return (
    <Section className="border-b border-[var(--hairline)]">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric, i) => (
          <Reveal
            key={metric.label}
            delay={i * 0.08}
            className="group relative bg-void p-8 transition-colors duration-500 hover:bg-elev-1"
          >
            {/* Top edge lights up on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-basil-400 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            />
            <div className="display text-[clamp(2.5rem,5vw,3.25rem)] text-bright tabular-nums">
              <Counter
                to={metric.value}
                decimals={metric.decimals ?? 0}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </div>
            <div className="mt-4 text-sm font-medium text-bright">{metric.label}</div>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-faint">{metric.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
