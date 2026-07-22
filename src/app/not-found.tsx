import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button, ArrowRight } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="grid-veil pointer-events-none absolute inset-0" />

      <Container className="relative text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,10vw,7rem)] text-bright">
          No signal here.
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-dim">
          The page you were looking for has moved or never existed. The capabilities index is
          usually the fastest way back.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
            <ArrowRight />
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Browse capabilities
          </Button>
        </div>
      </Container>
    </section>
  );
}
