import { Container } from "@/components/ui/container";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export function Cta({
  eyebrow = "Next step",
  title = "Bring us your hardest decision.",
  body = "A 45-minute briefing with two of our principals. You leave with a point of view on where your analytics estate is leaking value — whether or not you engage us.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--hairline)] py-28 md:py-36">
      <div
        aria-hidden="true"
        className="grid-veil pointer-events-none absolute inset-0 opacity-60"
      />
      {/* A single lit hairline instead of a bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-[32rem] max-w-[70%] bg-gradient-to-r from-transparent via-basil-400/50 to-transparent"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display mt-6 text-[clamp(2.25rem,5.6vw,4rem)] text-balance text-bright">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-dim">
            {body}
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Book a briefing
              <ArrowRight />
            </Button>
            <Button
              href={`mailto:${siteConfig.contact.email}`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {siteConfig.contact.email}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
