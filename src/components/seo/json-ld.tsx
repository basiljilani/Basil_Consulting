import { siteConfig } from "@/lib/site";
import type { Service } from "@/lib/services";

/**
 * Structured data. Rendered server-side into the document so crawlers see it
 * without executing JS. Kept in one place so the @id graph stays consistent.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema.org payload is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "ProfessionalService"],
            "@id": ORG_ID,
            name: siteConfig.name,
            legalName: siteConfig.legalName,
            url: siteConfig.url,
            description: siteConfig.description,
            foundingDate: siteConfig.founded,
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.contact.address.street,
              addressLocality: siteConfig.contact.address.city,
              addressRegion: siteConfig.contact.address.region,
              postalCode: siteConfig.contact.address.postalCode,
              addressCountry: siteConfig.contact.address.country,
            },
            sameAs: Object.values(siteConfig.social),
            knowsAbout: siteConfig.keywords,
            areaServed: "Worldwide",
          },
          {
            "@type": "WebSite",
            "@id": SITE_ID,
            url: siteConfig.url,
            name: siteConfig.name,
            description: siteConfig.description,
            publisher: { "@id": ORG_ID },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: Service }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        serviceType: service.short,
        description: service.summary,
        url: `${siteConfig.url}/services/${service.slug}`,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} deliverables`,
          itemListElement: service.deliverables.map((d, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: d },
          })),
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.href}`,
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
