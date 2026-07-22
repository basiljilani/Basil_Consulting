import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { footerNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--hairline)] bg-ink">
      {/* Single lit hairline along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-1/2 h-px w-[36rem] max-w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-basil-400/50 to-transparent"
      />

      <Container className="relative py-20">
        {/* Two columns from sm so tablets don't get one very tall stack */}
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-14">
          <div className="max-w-xs">
            <Logo size="footer" />
            <p className="mt-5 text-sm leading-relaxed text-faint">
              Decision intelligence for enterprises that intend to compound their data
              advantage rather than report on it.
            </p>
            {/* min-h/min-w keep these above the 24px WCAG 2.2 target size —
                "X" is only a few pixels wide as bare text. */}
            <div className="mt-5 flex items-center gap-1">
              {Object.entries(siteConfig.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs capitalize text-faint transition-colors hover:bg-white/5 hover:text-basil-400"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-medium tracking-[0.14em] text-faint uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1.5 text-sm text-dim transition-colors duration-200 hover:text-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-medium tracking-[0.14em] text-faint uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-0.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-block py-1.5 text-dim transition-colors hover:text-bright"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-block py-1.5 text-dim transition-colors hover:text-bright"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="pt-3 leading-relaxed text-faint">
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                {siteConfig.contact.address.postalCode}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
            Built for the decision layer
          </p>
        </div>
      </Container>
    </footer>
  );
}
