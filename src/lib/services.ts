/**
 * The service catalogue. Drives /services, /services/[slug], the homepage
 * grid, the footer, the sitemap and every Service JSON-LD block.
 */

export type Service = {
  slug: string;
  title: string;
  /** Short label for grids and nav */
  short: string;
  /** One line, used under the title in cards */
  tagline: string;
  /** 1–2 sentences for meta descriptions and card bodies */
  summary: string;
  /** Long-form intro on the detail page */
  description: string;
  /** Business results, not features */
  outcomes: string[];
  /** What actually ships */
  deliverables: string[];
  /** Technologies we work in */
  stack: string[];
  engagement: {
    model: string;
    timeline: string;
    startingAt: string;
  };
  /** Glyph key — see components/ui/service-glyph.tsx */
  glyph: GlyphKey;
  /** Featured on the homepage grid */
  featured: boolean;
};

export type GlyphKey =
  | "orbit"
  | "forecast"
  | "layers"
  | "spark"
  | "pipeline"
  | "shield"
  | "compass"
  | "flow"
  | "graph";

export const services: Service[] = [
  {
    slug: "decision-intelligence",
    title: "Decision Intelligence Systems",
    short: "Decision Intelligence",
    tagline: "Close the loop between insight and action",
    summary:
      "We build the layer where analytics stops being a report and starts being a decision — simulation, recommendation and automated action wired directly into operations.",
    description:
      "Most analytics programmes stall at the dashboard. Decision intelligence closes the gap: every model output is bound to a decision owner, a business rule and a measurable action. We map your highest-leverage recurring decisions, instrument them, then deploy simulation and recommendation engines that operators actually trust — with human override, full audit trail, and the counterfactual evidence to prove the lift.",
    outcomes: [
      "Cycle time on critical decisions cut by 40–70%",
      "Every recommendation traceable to its data, model version and owner",
      "Measurable P&L attribution per decision, not per dashboard",
      "Operators trust the system enough to stop second-guessing it",
    ],
    deliverables: [
      "Decision inventory and value-at-stake model",
      "Scenario simulation and what-if engine",
      "Recommendation service with confidence bounds and guardrails",
      "Human-in-the-loop review console with override capture",
      "Continuous A/B and counterfactual measurement harness",
    ],
    stack: ["Python", "dbt", "Ray", "Temporal", "Streamlit", "React"],
    engagement: {
      model: "Programme engagement · dedicated pod",
      timeline: "16–28 weeks",
      startingAt: "$280k",
    },
    glyph: "orbit",
    featured: true,
  },
  {
    slug: "predictive-analytics",
    title: "Predictive & Prescriptive Analytics",
    short: "Predictive Analytics",
    tagline: "Forecasts your finance team will sign off on",
    summary:
      "Demand, revenue, churn, risk and capacity forecasting engineered for accuracy under drift — and explainable enough to survive an audit committee.",
    description:
      "A forecast nobody believes is worse than no forecast. We build hierarchical, reconciled forecasting systems that hold up across product, region and time — with backtesting rigour, drift detection and explainability baked in from day one. Then we go a step further: prescriptive optimisation that tells you what to do about the forecast, under real constraints like inventory, headcount and working capital.",
    outcomes: [
      "15–35% reduction in forecast error versus incumbent baseline",
      "Working capital released through better demand and inventory planning",
      "Churn and risk identified early enough to intervene profitably",
      "Explainable drivers finance and audit can interrogate",
    ],
    deliverables: [
      "Hierarchical forecasting models with reconciliation",
      "Rigorous backtesting suite and champion/challenger framework",
      "Driver decomposition and explainability reporting",
      "Constrained optimisation for planning and allocation",
      "Drift monitoring with automated retraining triggers",
    ],
    stack: ["Python", "PyTorch", "Prophet", "XGBoost", "Optuna", "Snowflake"],
    engagement: {
      model: "Fixed-scope build · outcome-linked",
      timeline: "10–20 weeks",
      startingAt: "$180k",
    },
    glyph: "forecast",
    featured: true,
  },
  {
    slug: "data-platform-engineering",
    title: "Modern Data Platform Engineering",
    short: "Data Platform",
    tagline: "A lakehouse that scales past the pilot",
    summary:
      "Lakehouse architecture, streaming ingestion and governed semantic layers — the foundation everything else in your analytics estate depends on.",
    description:
      "AI ambitions die on bad foundations. We design and build production lakehouse platforms — ingestion, storage, transformation, orchestration, semantics and observability — as one coherent system rather than a stack of tools bolted together. Infrastructure as code throughout, cost controls from the first commit, and a semantic layer that gives every downstream consumer one definition of revenue.",
    outcomes: [
      "Single governed definition of every core business metric",
      "30–60% reduction in warehouse spend through modelling and tiering",
      "New data sources onboarded in days rather than quarters",
      "Pipeline reliability measured and enforced by SLA",
    ],
    deliverables: [
      "Lakehouse architecture and migration roadmap",
      "Batch and streaming ingestion frameworks",
      "dbt transformation layer with testing and CI",
      "Governed semantic layer and metric store",
      "Data observability, lineage and cost dashboards",
      "Infrastructure as code and environment promotion",
    ],
    stack: ["Snowflake", "Databricks", "dbt", "Airflow", "Kafka", "Terraform"],
    engagement: {
      model: "Platform build · phased delivery",
      timeline: "20–36 weeks",
      startingAt: "$320k",
    },
    glyph: "layers",
    featured: true,
  },
  {
    slug: "generative-ai-agents",
    title: "Generative AI & Autonomous Agents",
    short: "Generative AI",
    tagline: "Agents that do the work, not demos that impress",
    summary:
      "Retrieval systems, copilots and multi-step agents built on your proprietary data — with evaluation harnesses that keep them honest in production.",
    description:
      "The gap between a compelling GenAI demo and a system you can put in front of customers is evaluation, grounding and cost control. We build retrieval-augmented systems and autonomous agents against your proprietary corpus, then wrap them in the unglamorous infrastructure that makes them viable: eval suites, hallucination guardrails, human escalation paths, token economics and red-teaming.",
    outcomes: [
      "Analyst and support hours redeployed from retrieval to judgement",
      "Grounded answers with citations, not confident fabrication",
      "Per-query cost understood and actively managed",
      "Regression-tested prompts and models, versioned like code",
    ],
    deliverables: [
      "Retrieval architecture over proprietary corpora",
      "Agent orchestration with tool use and escalation",
      "Automated evaluation and regression harness",
      "Guardrails, red-teaming and safety review",
      "Cost telemetry and model routing strategy",
    ],
    stack: ["Claude", "LangGraph", "pgvector", "Pinecone", "FastAPI", "TypeScript"],
    engagement: {
      model: "Discovery sprint then build",
      timeline: "8–24 weeks",
      startingAt: "$150k",
    },
    glyph: "spark",
    featured: true,
  },
  {
    slug: "mlops-ai-infrastructure",
    title: "MLOps & AI Infrastructure",
    short: "MLOps",
    tagline: "From notebook to production, repeatably",
    summary:
      "Feature stores, model registries, CI/CD for models and production monitoring — the machinery that lets data science ship weekly instead of annually.",
    description:
      "Most enterprises have models that work and no way to deploy them. We install the operational spine: feature stores that guarantee training/serving parity, registries and lineage, automated deployment pipelines, shadow and canary rollout, and monitoring that catches drift before your customers do. The outcome is throughput — a data science function that ships continuously.",
    outcomes: [
      "Model deployment time reduced from months to days",
      "Training/serving skew eliminated by design",
      "Every production model versioned, monitored and rollback-ready",
      "Incidents detected by monitoring, not by the business",
    ],
    deliverables: [
      "Feature store with point-in-time correctness",
      "Model registry, lineage and approval workflow",
      "CI/CD pipelines for training and serving",
      "Canary, shadow and blue/green deployment patterns",
      "Drift, quality and latency monitoring with alerting",
    ],
    stack: ["MLflow", "Feast", "Kubernetes", "Ray", "Docker", "GitHub Actions"],
    engagement: {
      model: "Enablement build · team embedded",
      timeline: "12–24 weeks",
      startingAt: "$210k",
    },
    glyph: "pipeline",
    featured: true,
  },
  {
    slug: "data-governance-ai-assurance",
    title: "Data Governance & AI Assurance",
    short: "Governance & Assurance",
    tagline: "Move fast without regulatory surprise",
    summary:
      "Governance frameworks, model risk management and AI assurance aligned to the EU AI Act, GDPR, SOC 2 and sector regulation — designed to accelerate delivery, not block it.",
    description:
      "Governance fails when it is written as policy and enforced by committee. We implement it as infrastructure: catalogued and classified data, automated policy enforcement, lineage that answers regulator questions in minutes, and a model risk framework proportionate to actual risk tier. The result is a delivery organisation that ships faster because the guardrails are automatic.",
    outcomes: [
      "Audit and regulator evidence produced on demand",
      "Sensitive data classified, masked and access-controlled automatically",
      "Model risk tiering that unblocks low-risk work immediately",
      "Governance overhead reduced while coverage increases",
    ],
    deliverables: [
      "Data catalogue, classification and lineage implementation",
      "Automated policy enforcement and access controls",
      "Model risk management framework and registry",
      "EU AI Act and regulatory readiness assessment",
      "Governance operating model and RACI",
    ],
    stack: ["Collibra", "Immuta", "OpenLineage", "Unity Catalog", "Terraform"],
    engagement: {
      model: "Assessment then implementation",
      timeline: "10–22 weeks",
      startingAt: "$165k",
    },
    glyph: "shield",
    featured: true,
  },
  {
    slug: "customer-revenue-intelligence",
    title: "Customer & Revenue Intelligence",
    short: "Revenue Intelligence",
    tagline: "One customer record, every revenue signal",
    summary:
      "Identity resolution, Customer 360 and propensity modelling that turn fragmented commercial data into pipeline, retention and pricing decisions.",
    description:
      "Revenue teams operate on partial views stitched together in spreadsheets. We build the resolved customer graph — identity resolution across every source system, unified event history, and the propensity, lifetime value and next-best-action models that sit on top. Then we activate it where the work happens: CRM, marketing automation, support desk and pricing.",
    outcomes: [
      "Unified customer view across every commercial system",
      "Pipeline scored by conversion propensity, not rep optimism",
      "Retention risk surfaced early enough to act on",
      "Pricing and discount decisions grounded in elasticity data",
    ],
    deliverables: [
      "Identity resolution and customer graph",
      "Unified event and interaction history",
      "Propensity, LTV and churn model suite",
      "Next-best-action engine with CRM activation",
      "Commercial performance analytics",
    ],
    stack: ["Snowflake", "dbt", "Hightouch", "Salesforce", "Python", "Segment"],
    engagement: {
      model: "Build and activate",
      timeline: "14–24 weeks",
      startingAt: "$195k",
    },
    glyph: "graph",
    featured: false,
  },
  {
    slug: "process-intelligence-automation",
    title: "Process Intelligence & Automation",
    short: "Process Intelligence",
    tagline: "See how work actually flows, then fix it",
    summary:
      "Process mining across your operational systems to expose the real workflow — bottlenecks, rework and leakage — followed by targeted intelligent automation.",
    description:
      "Every organisation has a documented process and a real one. Process mining reconstructs the real one from system event logs: every variant, every loop, every handoff that costs a day. We quantify the cost of each deviation, then automate the highest-value paths with a mix of orchestration, decision services and document AI — and keep mining so improvements are measured, not asserted.",
    outcomes: [
      "True end-to-end cycle time and cost per process variant",
      "Rework loops and handoff delays quantified in currency",
      "Automation targeted where payback is provable",
      "Continuous conformance monitoring after go-live",
    ],
    deliverables: [
      "Event log extraction and process reconstruction",
      "Variant, bottleneck and conformance analysis",
      "Automation opportunity model with ROI ranking",
      "Document AI and decision service implementation",
      "Ongoing conformance and benefit tracking",
    ],
    stack: ["Celonis", "Camunda", "Python", "Temporal", "Claude", "Airflow"],
    engagement: {
      model: "Mining sprint then automation build",
      timeline: "12–20 weeks",
      startingAt: "$175k",
    },
    glyph: "flow",
    featured: false,
  },
  {
    slug: "data-strategy-fractional-cdo",
    title: "Data Strategy & Fractional CDO",
    short: "Strategy & Fractional CDO",
    tagline: "Executive ownership without the executive search",
    summary:
      "Board-level data strategy, operating model design and interim Chief Data Officer leadership for organisations building the function from the ground up.",
    description:
      "Some organisations need a strategy. Others need someone accountable for executing it. We do both: a hard-edged assessment of your data estate and ambition, a costed roadmap sequenced by value and dependency, and — where useful — an experienced operator embedded as fractional CDO to run the programme, build the team and hand over a functioning capability.",
    outcomes: [
      "Costed, sequenced roadmap the board can actually fund",
      "Operating model with clear ownership and decision rights",
      "Capability built in-house rather than rented indefinitely",
      "Investment case grounded in value, not technology fashion",
    ],
    deliverables: [
      "Data estate and maturity assessment",
      "Value-sequenced strategy and investment case",
      "Target operating model and org design",
      "Vendor and platform selection support",
      "Fractional CDO leadership and team build-out",
    ],
    stack: ["Executive advisory", "Operating model design", "Programme leadership"],
    engagement: {
      model: "Retained advisory · monthly",
      timeline: "6–18 months",
      startingAt: "$28k / month",
    },
    glyph: "compass",
    featured: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceSlugs(): string[] {
  return services.map((s) => s.slug);
}
