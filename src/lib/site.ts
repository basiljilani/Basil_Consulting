/**
 * Single source of truth for brand, contact and SEO metadata.
 * Change the domain here (or set NEXT_PUBLIC_SITE_URL) and every
 * canonical URL, sitemap entry and JSON-LD block follows.
 */

export const siteConfig = {
  name: "Basil Consulting",
  legalName: "Basil Consulting Ltd.",
  shortName: "Basil",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://basilconsulting.net",
  locale: "en_US",

  tagline: "The future of business analytics",
  description:
    "Basil Consulting builds decision intelligence for enterprises — AI forecasting, real-time data platforms and autonomous analytics that turn raw data into compounding advantage.",

  // Used verbatim in <title> templates and OG cards
  seoTitle: "Basil Consulting — Decision Intelligence & AI Analytics",

  keywords: [
    "business analytics consulting",
    "decision intelligence",
    "AI analytics consulting",
    "predictive analytics",
    "data platform engineering",
    "modern data stack",
    "MLOps consulting",
    "generative AI consulting",
    "data governance",
    "fractional CDO",
  ],

  contact: {
    email: "info@basilconsulting.net",
    phone: "+1 (415) 555-0142",
    address: {
      street: "One Market Street, Suite 3600",
      city: "San Francisco",
      region: "CA",
      postalCode: "94105",
      country: "US",
    },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/basil-consulting",
    x: "https://x.com/basilconsulting",
    github: "https://github.com/basil-consulting",
  },

  founded: "2019",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Capabilities",
    items: [
      { label: "Decision Intelligence", href: "/services/decision-intelligence" },
      { label: "Predictive Analytics", href: "/services/predictive-analytics" },
      { label: "Data Platform Engineering", href: "/services/data-platform-engineering" },
      { label: "Generative AI & Agents", href: "/services/generative-ai-agents" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Approach", href: "/approach" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
