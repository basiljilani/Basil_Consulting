import { Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * PLACEHOLDER COPY — attributed by role only, no invented individuals.
 * Replace with real, approved client quotes before launch.
 */
const QUOTE = {
  text: "We had eleven dashboards describing the same problem and no mechanism for acting on any of them. Basil replaced the reporting conversation with a decision one — and brought the evidence to prove it was working.",
  role: "Group Chief Financial Officer",
  org: "FTSE 100 industrial manufacturer",
};

export function Testimonial() {
  return (
    <Section className="relative overflow-hidden border-t border-[var(--hairline)]">
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <svg
          viewBox="0 0 32 24"
          fill="none"
          aria-hidden="true"
          className="mx-auto h-7 w-9 text-basil-400/50"
        >
          <path
            d="M13 24V13.2C13 5.9 17.4 1.2 25.5 0l1 3.6C21.6 4.9 19.4 7.5 19.4 11H24v13h-11Zm-13 0V13.2C0 5.9 4.4 1.2 12.5 0l1 3.6C8.6 4.9 6.4 7.5 6.4 11H11v13H0Z"
            fill="currentColor"
          />
        </svg>

        <blockquote className="mt-8">
          <p className="text-[clamp(1.375rem,3.1vw,2.125rem)] leading-[1.35] font-medium tracking-[-0.025em] text-balance text-bright">
            {QUOTE.text}
          </p>
        </blockquote>

        <figcaption className="mt-9 flex flex-col items-center gap-1">
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-basil-400 to-transparent" />
          <span className="mt-4 text-sm font-medium text-bright">{QUOTE.role}</span>
          <span className="text-[0.8125rem] text-faint">{QUOTE.org}</span>
        </figcaption>
      </Reveal>
    </Section>
  );
}
