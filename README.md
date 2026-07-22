# Basil Consulting

Marketing site for Basil Consulting — decision intelligence and AI analytics.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · three.js · Motion.

```bash
npm install
cp .env.example .env.local   # set your real origin
npm run dev                  # http://localhost:3000
```

## Structure

```
src/
├── app/
│   ├── layout.tsx              # shell, fonts, global metadata, Organization JSON-LD
│   ├── page.tsx                # homepage composition
│   ├── globals.css             # design tokens, utilities, keyframes
│   ├── opengraph-image.tsx     # social card, generated at build time
│   ├── sitemap.ts / robots.ts / manifest.ts
│   ├── services/               # index + [slug] detail (statically generated)
│   ├── approach/ about/ contact/
│   └── api/contact/route.ts    # form endpoint (validation done, delivery TODO)
├── components/
│   ├── layout/                 # header (scroll-reveal), footer, logo
│   ├── three/                  # WebGL hero: shaders, manifold, lazy loader
│   ├── sections/               # page-level composed sections
│   ├── ui/                     # primitives: button, container, reveal, card…
│   └── seo/json-ld.tsx         # Organization, Service, Breadcrumb, FAQ schemas
├── hooks/
└── lib/                        # site config, service catalogue, FAQ, utils
```

## Editing content

Almost all copy is data, not markup:

| What | Where |
| --- | --- |
| Brand, contact details, nav, social | `src/lib/site.ts` |
| The nine services (copy, pricing, stack) | `src/lib/services.ts` |
| FAQ (also feeds FAQPage JSON-LD) | `src/lib/faq.ts` |
| Platform logos in the marquee | `src/lib/brand-marks.ts` |
| Delivery phases | `src/components/sections/approach.tsx` |
| Metrics, industries, testimonial | the matching file in `src/components/sections/` |

Adding a service to `src/lib/services.ts` automatically creates its detail page,
adds it to the services grid, the contact form's dropdown and the sitemap. Set
`featured: true` to surface it on the homepage.

## Performance model

The site is built so the first paint never depends on JavaScript.

- **Hero entrance animations are CSS, not JS.** The `<h1>` is the LCP element,
  so it reaches final opacity at first paint instead of waiting for hydration.
- **three.js is fully code-split** (~230 KB gz) and loaded on `requestIdleCallback`
  after first paint. It is never downloaded at all under `prefers-reduced-motion`
  or when WebGL is unavailable — a static CSS aurora stands in.
- **The WebGL loop pauses** when the hero scrolls out of view or the tab is hidden.
- **Scroll reveals degrade safely.** Sections ship visible and are only hidden
  once JS confirms they are still below the fold, so with JS disabled — or for a
  crawler that renders without scrolling — the entire page is legible.
- Point-cloud density and DPR step down automatically on low-core / touch devices.

Initial JS is ~240 KB gz, most of which is the React + Next runtime.

## SEO

Per-route `metadata` with canonicals and OG tags, a generated `sitemap.xml` and
`robots.txt`, a build-time OG image, and JSON-LD for Organization, WebSite,
Service, BreadcrumbList and FAQPage.

Set `NEXT_PUBLIC_SITE_URL` in production — canonicals, the sitemap and every
JSON-LD `@id` are derived from it.

## Before launch

- [ ] Confirm `NEXT_PUBLIC_SITE_URL` — defaults to `https://basilconsulting.net`
- [ ] Replace the placeholder phone number and San Francisco address in `src/lib/site.ts`
      (the email, `info@basilconsulting.net`, is real)
- [ ] Replace the placeholder social URLs in `src/lib/site.ts`
- [ ] Wire up email delivery in `src/app/api/contact/route.ts` — it currently
      validates submissions and then discards them
- [ ] Replace the placeholder testimonial in `src/components/sections/testimonial.tsx`
      with a real, approved client quote
- [ ] Substantiate or revise the metrics in `src/components/sections/metrics.tsx`
      and the firm facts in `src/app/about/page.tsx`
- [ ] Add a real favicon (`src/app/favicon.ico`)

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```
