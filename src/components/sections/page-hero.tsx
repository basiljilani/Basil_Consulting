import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";

export type Crumb = { name: string; href: string };

/** Interior-page masthead. Lighter than the homepage hero — no WebGL. */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      <div aria-hidden="true" className="grid-veil pointer-events-none absolute inset-0" />

      <Container className="relative">
        {crumbs && crumbs.length > 0 && (
          <Reveal duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-faint">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i === crumbs.length - 1 ? (
                      <span className="text-dim">{crumb.name}</span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="inline-block py-1 transition-colors hover:text-bright"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.25rem)] text-balance text-bright">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-dim md:text-lg">
              {lede}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.24}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
