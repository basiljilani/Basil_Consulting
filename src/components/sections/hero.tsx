import { Container } from "@/components/ui/container";
import { Button, ArrowRight } from "@/components/ui/button";
import { LazyHeroScene } from "@/components/three/lazy-hero-scene";

/**
 * The abstract point-cloud scene is the only thing that moves here. The type,
 * the pill and the buttons are all static — no entrance animation, no scroll
 * parallax — which also lets this stay a server component.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* 3D layer */}
      <div className="absolute inset-0">
        <LazyHeroScene />
      </div>

      {/* Type bed — carves a dark clearing through the point cloud so the
          headline keeps its contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_42%_at_50%_54%,#000_46%,rgba(0,0,0,0.88)_66%,transparent_88%)] md:bg-[radial-gradient(ellipse_54%_46%_at_50%_53%,#000_44%,rgba(0,0,0,0.82)_64%,transparent_86%)]"
      />

      {/* Keeps the cloud from tangling with the transparent header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void via-void/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Type steps down below sm so the label stays on one line at 320px */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white/[0.03] px-3 py-1.5 sm:gap-2.5 sm:px-4">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-basil-400" />
            <span className="font-mono text-[0.625rem] tracking-[0.1em] text-dim uppercase sm:text-[0.6875rem] sm:tracking-[0.16em]">
              The future of business analytics
            </span>
          </div>

          {/* The clamp floor is set so the longest line ("Where data stops")
              still fits a 320px screen — a larger floor forced a ragged
              five-line break there. The `min(…, 11vh)` term additionally caps
              the size by viewport HEIGHT, so a landscape phone doesn't get a
              headline tall enough to push the CTAs below the fold. */}
          <h1 className="display mt-6 text-[clamp(1.9rem,min(8.4vw,11vh),5.25rem)] text-balance text-bright sm:mt-8">
            Where data stops
            <br />
            reporting and
            <br />
            <span className="text-gradient">starts deciding.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-[1rem] leading-relaxed text-pretty text-dim sm:mt-8 sm:text-[1.0625rem] md:text-lg">
            We build the decision layer for enterprise — AI forecasting, real-time data
            platforms and autonomous agents that turn analytics from a monthly report into
            a compounding advantage.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-11 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Book a briefing
              <ArrowRight />
            </Button>
            <Button
              href="/services"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore capabilities
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
