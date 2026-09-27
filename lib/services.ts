// Service catalogue. Each entry powers a card on the home page, a menu link, and its own
// landing page at /services/[slug] with SEO title, description and FAQ schema.

export type Service = {
  /** Icon/photo key (see components/ui/service-icons.ts). */
  key: string;
  slug: string;
  title: string;
  /** Page <h1>, written around the main search phrase for the service. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One sentence used on cards. */
  summary: string;
  intro: string;
  image: { src: string; alt: string };
  outcomes: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    key: "workflow-automation",
    slug: "ai-automations",
    title: "AI Workflow Automation",
    h1: "AI Workflow Automation Services",
    metaTitle: "AI Workflow Automation Services for Growing Teams",
    metaDescription:
      "AI workflow automation that drafts, classifies and routes work across your CRM, inbox and helpdesk. Live in 2 to 6 weeks, with human approval where it matters.",
    summary: "Hand-offs, approvals and updates that move on their own across the tools you already use.",
    intro:
      "We map where your team loses hours to copy-paste, triage and follow-ups, then build AI-driven workflows that do that work inside the tools you already run. Every automation ships with approvals, logs and a clear owner, so nothing runs unsupervised.",
    image: { src: "/services/workflow-automation.jpg", alt: "Server rack with neatly patched network cables powering automated workflows" },
    outcomes: [
      { title: "Hours back every week", body: "Repetitive intake, data entry and status updates run in the background instead of on someone's calendar." },
      { title: "Fewer dropped hand-offs", body: "Work is routed to the right person with context attached, so requests stop waiting in shared inboxes." },
      { title: "Audit-ready by default", body: "Every automated action is logged with inputs, outputs and the approval that allowed it." },
    ],
    deliverables: [
      "Workflow audit ranked by hours saved and build effort",
      "LLM steps that draft, classify, extract and route work",
      "Triggers across CRM, email, helpdesk, ERP and databases",
      "Human-in-the-loop approvals and exception queues",
      "Monitoring dashboard with volume, accuracy and time saved",
    ],
    stack: ["OpenAI", "Anthropic", "n8n", "Make", "Zapier", "Node.js", "Postgres"],
    faqs: [
      { q: "Which workflows are best to automate first?", a: "High-volume, rules-heavy work with a clear owner: lead intake, support triage, invoice matching, report assembly and scheduling. We rank candidates by hours saved against build effort during the audit." },
      { q: "Do we have to replace our current tools?", a: "No. Automations are built around your existing CRM, inbox and helpdesk. We only suggest a change when a tool is clearly blocking the result." },
    ],
  },
  {
    key: "agent-development",
    slug: "ai-agent-development",
    title: "AI Agent Development",
    h1: "AI Agent Development for Support, Sales and Operations",
    metaTitle: "AI Agent Development: Voice & Chat Agents",
    metaDescription:
      "Custom AI voice and chat agents that qualify leads, book appointments and resolve support tickets 24/7, grounded in your own documents and connected to your CRM.",
    summary: "Agents that answer customers, qualify enquiries and complete multi-step tasks around the clock.",
    intro:
      "We design voice and chat agents that work from your scripts, policies and live data. Each agent is tested against real conversations before it talks to a customer, and hands over to a person with full context whenever judgement is needed.",
    image: { src: "/services/agent-development.jpg", alt: "Developers collaborating on laptops while building an AI agent" },
    outcomes: [
      { title: "Every call and chat answered", body: "Enquiries after hours and at peak times get an accurate response instead of a voicemail or a queue." },
      { title: "Grounded, current answers", body: "Retrieval over your own documents and systems keeps replies accurate as policies and prices change." },
      { title: "Safe escalation", body: "Clear hand-off rules pass edge cases to your team with the transcript and customer record attached." },
    ],
    deliverables: [
      "Conversation design built from your scripts and policies",
      "Inbound and outbound voice or chat agents",
      "Retrieval (RAG) over your documents and knowledge base",
      "Calendar, CRM and phone system integrations",
      "Evaluation suite and escalation paths before launch",
    ],
    stack: ["OpenAI", "Anthropic", "Vapi", "Twilio", "LangGraph", "Pinecone", "Postgres"],
    faqs: [
      { q: "How do you stop an AI agent from making things up?", a: "Agents answer only from approved sources, are scored against an evaluation set of real conversations, and escalate when confidence is low or a question is out of scope." },
      { q: "Can the agent book appointments directly?", a: "Yes. We connect agents to your calendar and CRM so they can check availability, book, reschedule and log the outcome." },
    ],
  },
  {
    key: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software Development",
    h1: "Custom Software Development Services",
    metaTitle: "Custom Software Development Company",
    metaDescription:
      "Custom software development for internal tools, client portals and line-of-business systems. Clear specs, typed APIs and full documentation so the code is yours.",
    summary: "Software shaped around how your business runs, built to production standards from the first commit.",
    intro:
      "When off-the-shelf tools force your team into workarounds, we build software around the way your company actually operates. Discovery turns a messy process into a clear spec before any code is written, and you own everything we deliver.",
    image: { src: "/services/custom-software.jpg", alt: "Laptop showing application source code on a bright desk" },
    outcomes: [
      { title: "Fits your process", body: "Screens, permissions and data models follow how your team works, not how a vendor assumed it would." },
      { title: "Built to last", body: "Typed APIs, clean data models and automated tests keep the system easy to change for years." },
      { title: "No lock-in", body: "Documentation and a structured handover mean your team, or any team, can run and extend it." },
    ],
    deliverables: [
      "Discovery workshop and written specification",
      "Internal tools, portals and admin dashboards",
      "Typed REST or GraphQL APIs",
      "Role-based access, audit logs and reporting",
      "Documentation, handover and support plan",
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "Python", "Postgres", "AWS"],
    faqs: [
      { q: "Who owns the code?", a: "You do. Code, infrastructure and documentation are transferred to your accounts, and there are no licence fees for work we build for you." },
      { q: "How do you estimate a custom build?", a: "After a short discovery we give a fixed scope, timeline and price for the first release, then plan later phases once it is live." },
    ],
  },
  {
    key: "saas-mvp",
    slug: "saas-development",
    title: "SaaS MVP Development",
    h1: "SaaS MVP Development, From Idea to Paying Users",
    metaTitle: "SaaS MVP Development Agency",
    metaDescription:
      "SaaS MVP development in 8 to 12 weeks: multi-tenant architecture, billing, roles and cloud infrastructure that scales from first customer to enterprise.",
    summary: "From idea to a launch-ready product in weeks, with the foundations to scale afterwards.",
    intro:
      "We help founders and product teams get a focused SaaS MVP in front of paying users quickly, without cutting the corners that force a rebuild later. Weekly builds you can click through keep scope honest and decisions fast.",
    image: { src: "/services/saas-mvp.jpg", alt: "SaaS analytics dashboard with charts displayed on a laptop" },
    outcomes: [
      { title: "Launch in weeks", body: "A tightly scoped first release reaches real users in 8 to 12 weeks on average." },
      { title: "Ready to charge", body: "Subscriptions, trials, invoices and plan limits are built in from day one." },
      { title: "Scales without a rewrite", body: "Multi-tenant architecture and CI/CD mean growth adds servers, not rebuilds." },
    ],
    deliverables: [
      "Product scoping and MVP feature map",
      "Multi-tenant web app with roles and permissions",
      "Stripe billing, trials and usage limits",
      "Admin tooling, analytics and onboarding flows",
      "Cloud infrastructure with monitoring and backups",
    ],
    stack: ["Next.js", "tRPC", "Postgres", "Prisma", "Stripe", "Vercel", "AWS"],
    faqs: [
      { q: "How long does a SaaS MVP take?", a: "Most MVPs reach paying users in 8 to 12 weeks. Larger platforms are scoped in phases so you learn from real customers early." },
      { q: "Can you work with our existing prototype?", a: "Yes. We review what exists, keep what is solid and replace only what would block scaling or security." },
    ],
  },
  {
    key: "web-apps",
    slug: "web-development",
    title: "Web Application Development",
    h1: "Web Application and Website Development",
    metaTitle: "Web Application Development Services",
    metaDescription:
      "Fast, accessible websites and web apps built to convert and rank. Figma to production, Core Web Vitals in the green, technical SEO and analytics from launch.",
    summary: "Fast, accessible web apps with clean architecture and an interface people enjoy using.",
    intro:
      "We build marketing sites and web applications that load instantly, rank well and turn visitors into customers. Designs move from Figma to production pixel for pixel, with performance and accessibility checked on every release.",
    image: { src: "/services/web-apps.jpg", alt: "Laptop displaying a responsive web application dashboard" },
    outcomes: [
      { title: "Sub-second loads", body: "Core Web Vitals are enforced on every release, so speed does not erode as the site grows." },
      { title: "More qualified leads", body: "Conversion-first layouts and clear calls to action turn traffic into booked calls." },
      { title: "Found in search", body: "Technical SEO, structured data and clean markup are part of the build, not an afterthought." },
    ],
    deliverables: [
      "Responsive, pixel-accurate front-end builds",
      "Headless CMS so your team can publish",
      "Core Web Vitals and accessibility (WCAG AA) checks",
      "Technical SEO, schema markup and sitemaps",
      "Analytics, conversion tracking and A/B testing",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity", "Contentful", "Vercel"],
    faqs: [
      { q: "How long does a website take?", a: "Marketing websites usually launch 3 to 6 weeks after design approval. Web applications are scoped individually." },
      { q: "Will we be able to edit content ourselves?", a: "Yes. We connect a headless CMS so your team can publish pages and posts without a developer." },
    ],
  },
  {
    key: "mobile-apps",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    h1: "Mobile App Development for iOS and Android",
    metaTitle: "Mobile App Development Company for iOS & Android",
    metaDescription:
      "iOS and Android app development with offline-first data, push notifications and secure sign-in. We handle App Store and Google Play submission end to end.",
    summary: "Native-quality iOS and Android apps, from first prototype through to store release.",
    intro:
      "We design and build mobile apps that feel native, work offline and pass store review without drama. Native or cross-platform is chosen for your product and budget, not our preference.",
    image: { src: "/services/mobile-apps.jpg", alt: "Smartphone home screen with app icons on a white desk" },
    outcomes: [
      { title: "Native feel", body: "Smooth animations, platform conventions and accessibility on both iOS and Android." },
      { title: "Works anywhere", body: "Offline-first data sync keeps the app useful on poor connections and in the field." },
      { title: "Painless releases", body: "Automated builds and store submissions make updates routine instead of risky." },
    ],
    deliverables: [
      "UX flows and interactive prototypes",
      "Native (Swift/Kotlin) or cross-platform builds",
      "Offline sync, push notifications and secure auth",
      "Backend APIs and admin dashboard",
      "App Store and Google Play submission",
    ],
    stack: ["Swift", "Kotlin", "React Native", "Expo", "Firebase", "Supabase"],
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform suits most business apps and halves the build. We recommend native when you need heavy device features or maximum performance." },
      { q: "Do you publish the app for us?", a: "Yes. We prepare store listings, handle review feedback and set up automated release pipelines." },
    ],
  },
  {
    key: "devops-cloud",
    slug: "devops-cloud",
    title: "DevOps & Cloud",
    h1: "DevOps and Cloud Engineering Services",
    metaTitle: "DevOps & Cloud Engineering Services",
    metaDescription:
      "DevOps and cloud engineering on AWS, GCP and Azure: CI/CD pipelines, infrastructure as code, monitoring and cost controls that keep releases fast and bills predictable.",
    summary: "Automated pipelines, observable infrastructure and cloud costs that stay under control.",
    intro:
      "We set up the infrastructure and delivery pipelines that let your team ship several times a day with confidence. Everything is defined as code, monitored, and sized so your cloud bill grows with revenue rather than ahead of it.",
    image: { src: "/services/devops-cloud.jpg", alt: "Night view of Earth from orbit with city lights showing global cloud reach" },
    outcomes: [
      { title: "Ship daily, safely", body: "Automated tests and deployments replace manual release nights." },
      { title: "See problems first", body: "Logs, metrics and alerts catch issues before customers report them." },
      { title: "Lower cloud spend", body: "Right-sizing and budgets typically trim waste without touching performance." },
    ],
    deliverables: [
      "CI/CD pipelines with automated testing",
      "Infrastructure as code (Terraform)",
      "Containerisation and orchestration",
      "Monitoring, alerting and on-call runbooks",
      "Cloud cost review and optimisation",
    ],
    stack: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    faqs: [
      { q: "Can you take over our existing infrastructure?", a: "Yes. We start with an audit, document what exists, then move it to code and automation in small, reversible steps." },
      { q: "Which cloud providers do you support?", a: "AWS, Google Cloud and Azure, plus platforms like Vercel and Fly.io for smaller workloads." },
    ],
  },
  {
    key: "modernization",
    slug: "software-modernization",
    title: "Software Modernization",
    h1: "Legacy Software Modernization",
    metaTitle: "Legacy Software Modernization Services",
    metaDescription:
      "Modernize legacy software step by step without stopping the business. Re-platforming, API layers and data migration with zero-downtime cut-overs.",
    summary: "Legacy systems re-platformed step by step, without stopping the business that depends on them.",
    intro:
      "Old systems often hold the most important data and the least documentation. We modernize them in stages: wrap them with clean APIs, move one capability at a time, and retire the old code only when the new version has proved itself.",
    image: { src: "/services/modernization.jpg", alt: "Close-up of a circuit board representing legacy system hardware" },
    outcomes: [
      { title: "No big-bang risk", body: "Incremental migration keeps the business running at every stage." },
      { title: "Faster change", body: "Modern code and tests turn month-long changes into routine releases." },
      { title: "Unlocked data", body: "Clean APIs make legacy data available to new tools, reports and AI features." },
    ],
    deliverables: [
      "Legacy code and architecture assessment",
      "Modernization roadmap with risk ranking",
      "API layer around existing systems",
      "Incremental re-platforming and data migration",
      "Parallel runs and zero-downtime cut-over",
    ],
    stack: [".NET", "Java", "Node.js", "Python", "Postgres", "AWS"],
    faqs: [
      { q: "Do we need to rewrite everything?", a: "Rarely. Most value comes from replacing the parts that change often and wrapping the stable parts with APIs." },
      { q: "How do you avoid downtime?", a: "New components run alongside the old system and traffic moves over gradually, with a tested rollback at every step." },
    ],
  },
  {
    key: "ai-ml",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    h1: "AI and Machine Learning Development",
    metaTitle: "AI & Machine Learning Development Services",
    metaDescription:
      "AI and machine learning development: LLM features, retrieval pipelines, predictive models and evaluation that turn your data into reliable product features.",
    summary: "Models, retrieval and evaluation pipelines that turn your data into dependable product features.",
    intro:
      "We add AI to products and operations where it measurably helps: search, summarisation, classification, forecasting and recommendations. Every feature ships with an evaluation set, so quality is measured, not guessed.",
    image: { src: "/services/ai-ml.jpg", alt: "Three-dimensional AI lettering over an abstract neural network" },
    outcomes: [
      { title: "Useful AI features", body: "Search, summaries and predictions your users rely on, not demos." },
      { title: "Measured quality", body: "Evaluation suites track accuracy before and after every change." },
      { title: "Private by design", body: "Data stays in your accounts, with model choices that respect your compliance needs." },
    ],
    deliverables: [
      "AI opportunity assessment and data review",
      "LLM features with retrieval (RAG)",
      "Predictive and classification models",
      "Evaluation sets and quality dashboards",
      "Model-agnostic architecture and cost controls",
    ],
    stack: ["Python", "PyTorch", "OpenAI", "Anthropic", "LangChain", "pgvector", "AWS Bedrock"],
    faqs: [
      { q: "Do we need a lot of data to start?", a: "Not for most LLM features. Retrieval over your existing documents often delivers value on day one; custom models need more history." },
      { q: "Which AI models do you use?", a: "We stay model-agnostic and choose per task on accuracy, cost and data-residency requirements, so you can switch providers later." },
    ],
  },
  {
    key: "react-native",
    slug: "react-native-development",
    title: "React Native App Development",
    h1: "React Native App Development",
    metaTitle: "React Native App Development Company",
    metaDescription:
      "React Native app development: one codebase for iOS and Android with native performance, over-the-air updates and shared logic with your web app.",
    summary: "One codebase, two platforms. Cross-platform apps that feel at home on every device.",
    intro:
      "React Native lets one team ship to iOS and Android from a single codebase, often sharing logic with your web app. We build with Expo and native modules where needed, so the result feels native on both platforms.",
    image: { src: "/services/react-native.jpg", alt: "Hand holding a smartphone lit by blue light rings" },
    outcomes: [
      { title: "Half the build", body: "A shared codebase cuts cost and time compared with two native apps." },
      { title: "Instant fixes", body: "Over-the-air updates ship bug fixes without waiting for store review." },
      { title: "Shared logic", body: "Types, validation and API clients are reused across mobile and web." },
    ],
    deliverables: [
      "Expo-based React Native architecture",
      "Native modules for device features",
      "Over-the-air update pipeline",
      "Shared TypeScript packages with your web app",
      "Store submission and release automation",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Reanimated", "EAS", "Supabase"],
    faqs: [
      { q: "Does React Native feel as good as native?", a: "For most business and consumer apps, yes. We use native modules and profiling to keep animations and lists smooth." },
      { q: "Can you migrate our existing app to React Native?", a: "Yes. We can migrate screen by screen inside your current app, so users never see a disruptive rewrite." },
    ],
  },
  {
    key: "integrations",
    slug: "api-crm-integrations",
    title: "API & CRM Integrations",
    h1: "API and CRM Integration Services",
    metaTitle: "API & CRM Integration Services",
    metaDescription:
      "API and CRM integrations that connect HubSpot, Salesforce, billing, support and internal tools so data flows automatically, with monitoring and retry built in.",
    summary: "Your CRM, billing, support and internal tools connected so data flows without re-keying.",
    intro:
      "Disconnected tools mean re-keyed data, conflicting records and reports nobody trusts. We connect your CRM, billing, support and internal systems with reliable, monitored integrations and a single source of truth.",
    image: { src: "/services/integrations.jpg", alt: "Two colleagues working on connected laptops in an office" },
    outcomes: [
      { title: "One source of truth", body: "Customer, deal and billing data stay consistent across every tool." },
      { title: "No more re-keying", body: "Records sync automatically, removing hours of manual updates and errors." },
      { title: "Reliable syncs", body: "Retries, alerts and logs catch failures before they become data gaps." },
    ],
    deliverables: [
      "Integration map and data ownership rules",
      "CRM integrations (HubSpot, Salesforce, Pipedrive)",
      "Billing, support and ERP connectors",
      "Custom REST and webhook APIs",
      "Monitoring, retries and failure alerts",
    ],
    stack: ["HubSpot", "Salesforce", "Stripe", "Zendesk", "NetSuite", "Node.js", "Webhooks"],
    faqs: [
      { q: "Can you integrate tools without public APIs?", a: "Often, yes, through exports, database connections or browser automation. We assess reliability before recommending an approach." },
      { q: "What happens when a sync fails?", a: "Failed records are retried automatically and flagged in an alert channel with the error, so nothing silently goes missing." },
    ],
  },
  {
    key: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    h1: "UI/UX Design for Software Products",
    metaTitle: "UI/UX Design Agency for SaaS & Apps",
    metaDescription:
      "UI/UX design for SaaS, web and mobile products: user research, wireframes, prototypes and design systems that make complex software simple to use.",
    summary: "Research-led interfaces, design systems and prototypes that make complex products feel simple.",
    intro:
      "Good design makes complex software feel obvious. We start with how your users actually work, test ideas with clickable prototypes, and hand developers a design system that keeps every new screen consistent.",
    image: { src: "/services/ui-ux.jpg", alt: "Designer sketching app wireframes on a tablet with a stylus" },
    outcomes: [
      { title: "Easier onboarding", body: "Clear flows help new users reach value faster, with fewer support tickets." },
      { title: "Consistent product", body: "A shared design system keeps every new feature on-brand and accessible." },
      { title: "Faster development", body: "Developer-ready components and specs cut back-and-forth during builds." },
    ],
    deliverables: [
      "User interviews and journey mapping",
      "Wireframes and clickable prototypes",
      "High-fidelity UI in Figma",
      "Design system and component library",
      "Usability testing and accessibility review",
    ],
    stack: ["Figma", "FigJam", "Maze", "Storybook", "Tailwind CSS"],
    faqs: [
      { q: "Can you redesign an existing product?", a: "Yes. We audit the current experience, prioritise the highest-impact flows and redesign in stages so development can follow." },
      { q: "Do you design for accessibility?", a: "Every design is checked against WCAG AA for contrast, focus states, hit targets and screen-reader structure." },
    ],
  },
];

/** The first three render as large featured cards on the home page. */
export const featuredServices = services.slice(0, 3);
export const otherServices = services.slice(3);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
