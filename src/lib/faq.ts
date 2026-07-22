/**
 * FAQ content lives here rather than in the client component, because the
 * homepage's server-rendered JSON-LD also needs it — values exported from a
 * "use client" module arrive on the server as client references, not data.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How is this different from a Big Four analytics practice?",
    answer:
      "We ship production systems rather than recommendations, and we are staffed accordingly — the people in your kickoff are the people writing the code. Engagements are small senior pods, typically four to seven people, with no pyramid to feed and no leverage model that pushes juniors onto your critical path.",
  },
  {
    question: "What does a typical engagement cost?",
    answer:
      "Fixed-scope builds start around $150k and most programme engagements land between $180k and $350k. Retained advisory and fractional CDO work is billed monthly from $28k. We price the outcome and the pod, not the hour, and a meaningful share is commonly linked to the measured result.",
  },
  {
    question: "Do you work inside our environment or your own?",
    answer:
      "Yours. We build in your cloud accounts, your repositories and your CI, against your security standards. Nothing we deliver depends on Basil-hosted infrastructure or a proprietary Basil platform — that dependency is exactly what makes consulting engagements hard to end.",
  },
  {
    question: "How quickly do we see something real?",
    answer:
      "Median time to first measurable value across our engagements is eleven weeks. The first production increment is typically live within six to eight weeks of kickoff, deliberately scoped small so the operating model gets tested early rather than at the end.",
  },
  {
    question: "What happens when the engagement ends?",
    answer:
      "You own everything: code, models, infrastructure definitions, runbooks and architecture decision records. The final phase is a paired handover to named internal owners, and we will happily stay on a light retainer — but the systems are designed to run without us.",
  },
  {
    question: "Can you work with our existing data team?",
    answer:
      "That is the usual arrangement. Most of our engagements are joint pods with the client's own engineers embedded throughout, which is also the fastest way to transfer capability. We are equally willing to lead or to augment, provided decision rights are clear from day one.",
  },
];
