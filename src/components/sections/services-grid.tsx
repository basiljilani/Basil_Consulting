import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { featuredServices } from "@/lib/services";

export function ServicesGrid() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Capabilities"
        title={
          <>
            Six disciplines.
            <br />
            <span className="text-faint">One decision layer.</span>
          </>
        }
        lede="We are not a staffing shop. Each capability is a production system we design, build and hand over — instrumented so its value is measurable long after we leave."
      />

      <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service) => (
          <StaggerItem key={service.slug} className="flex">
            <ServiceCard service={service} className="w-full" />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button href="/services" variant="secondary" size="lg">
          View all nine capabilities
          <ArrowRight />
        </Button>
      </Reveal>
    </Section>
  );
}
