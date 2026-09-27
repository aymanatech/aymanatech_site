// Industry landing pages at /industries/[slug].

export type Industry = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  challenges: string[];
  solutions: { title: string; body: string }[];
  /** Service slugs most relevant to this industry. */
  services: string[];
  /** Case study slug to feature, if any. */
  caseStudy?: string;
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    h1: "AI Automation and Software for Healthcare",
    metaTitle: "Healthcare AI Automation & Software Development",
    metaDescription:
      "HIPAA-aware AI automation and software for clinics and healthcare providers: patient intake, appointment booking voice agents and secure patient portals.",
    summary: "Patient intake, scheduling and follow-ups that run themselves, built with privacy first.",
    intro:
      "Clinics lose hours every day to phone queues, incomplete forms and manual reminders. We build HIPAA-aware systems that take that load off front-desk teams while keeping patient data protected and every action logged.",
    challenges: [
      "Missed calls and after-hours booking requests",
      "Incomplete intake forms and insurance details",
      "Manual reminders, follow-ups and no-shows",
    ],
    solutions: [
      { title: "Voice agents for booking", body: "Agents answer calls around the clock, book and reschedule appointments, and answer common insurance questions." },
      { title: "Automated patient intake", body: "Forms are checked on submission and gaps are chased automatically before the appointment." },
      { title: "Secure patient portals", body: "Role-based access, audit logs and encryption for records, messages and documents." },
    ],
    services: ["ai-agent-development", "ai-automations", "custom-software-development"],
    caseStudy: "dental-voice-agent",
  },
  {
    slug: "finance-accounting",
    title: "Finance & Accounting",
    h1: "Automation and Software for Finance and Accounting Teams",
    metaTitle: "Finance & Accounting Automation Software",
    metaDescription:
      "Finance automation for accounting firms and finance teams: invoice matching, month-end close, document extraction and client portals with full audit trails.",
    summary: "Faster month-end close, accurate reconciliation and client portals with full audit trails.",
    intro:
      "Finance teams spend too much of each month matching, chasing and re-keying. We automate the repetitive parts of reconciliation and reporting, while keeping reviewers in control and every change traceable.",
    challenges: [
      "Slow month-end close and manual reconciliation",
      "Documents arriving by email in every format",
      "Client requests scattered across inboxes",
    ],
    solutions: [
      { title: "Invoice and bank matching", body: "Transactions are matched automatically and only true exceptions reach a reviewer." },
      { title: "Document extraction", body: "AI reads invoices, receipts and statements and posts clean data to your ledger." },
      { title: "Client portals", body: "Secure uploads, status tracking and messaging replace endless email threads." },
    ],
    services: ["ai-automations", "api-crm-integrations", "custom-software-development"],
  },
  {
    slug: "travel-transport",
    title: "Travel & Transport",
    h1: "Software and AI Automation for Travel and Transport",
    metaTitle: "Travel & Transport Software Development",
    metaDescription:
      "Booking platforms, itinerary automation and AI customer support for travel and transport operators, integrated with your reservation and payment systems.",
    summary: "Booking flows, itinerary updates and customer support that scale with the season.",
    intro:
      "Travel demand arrives in waves, and so do customer questions. We build booking platforms and automations that absorb peak season without adding headcount, connected to the reservation and payment systems you already use.",
    challenges: [
      "Seasonal spikes in bookings and support requests",
      "Itinerary changes that must reach customers instantly",
      "Fragmented reservation and payment systems",
    ],
    solutions: [
      { title: "AI support agents", body: "Answer booking, baggage and change requests instantly, in multiple languages." },
      { title: "Itinerary automation", body: "Schedule changes trigger updates by email, SMS and app notification automatically." },
      { title: "Booking platforms", body: "Fast, mobile-first booking flows integrated with your inventory and payments." },
    ],
    services: ["ai-agent-development", "web-development", "mobile-app-development"],
  },
  {
    slug: "saas-startups",
    title: "SaaS & Startups",
    h1: "Product Development for SaaS Companies and Startups",
    metaTitle: "SaaS & Startup Product Development",
    metaDescription:
      "Product development for SaaS startups: MVPs in 8 to 12 weeks, scalable architecture, AI features and a senior team that thinks about product and revenue.",
    summary: "MVPs that reach paying users fast, on architecture that will not need a rebuild.",
    intro:
      "Early-stage teams need to learn from real customers quickly without creating a codebase that collapses at scale. We act as a senior product team: scoping ruthlessly, shipping weekly, and building foundations that grow with you.",
    challenges: [
      "Getting to paying users before runway runs out",
      "Technical debt from rushed prototypes",
      "Adding AI features that actually retain users",
    ],
    solutions: [
      { title: "Focused MVPs", body: "Scope workshops cut features to the ones that prove the business, then we ship in weeks." },
      { title: "Scalable foundations", body: "Multi-tenant architecture, billing and CI/CD from day one." },
      { title: "AI product features", body: "Search, assistants and automation that users value, with measured quality." },
    ],
    services: ["saas-development", "ai-machine-learning", "ui-ux-design"],
    caseStudy: "logistics-saas-mvp",
  },
  {
    slug: "ecommerce",
    title: "eCommerce",
    h1: "AI Automation and Development for eCommerce Brands",
    metaTitle: "eCommerce AI Automation & Development",
    metaDescription:
      "eCommerce automation and development: AI support agents, order and returns automation, Shopify integrations and fast storefronts built to convert.",
    summary: "Support, orders and returns handled automatically, with storefronts built to convert.",
    intro:
      "Growing stores drown in 'where is my order' tickets, returns and manual inventory updates. We automate that operational load and build fast storefronts, so your team can focus on product and marketing.",
    challenges: [
      "High volumes of order-status and returns tickets",
      "Inventory and order data out of sync across channels",
      "Slow storefronts that lose conversions",
    ],
    solutions: [
      { title: "AI support agents", body: "Resolve tracking, returns and stock questions instantly from live order data." },
      { title: "Order and returns automation", body: "Returns, refunds and exchanges processed with rules and approvals." },
      { title: "Fast storefronts", body: "Headless and Shopify builds tuned for Core Web Vitals and conversion." },
    ],
    services: ["ai-agent-development", "api-crm-integrations", "web-development"],
    caseStudy: "ai-support-ecommerce",
  },
  {
    slug: "logistics",
    title: "Logistics & Field Operations",
    h1: "Software for Logistics and Field Operations",
    metaTitle: "Logistics & Field Operations Software Development",
    metaDescription:
      "Dispatch platforms, driver apps and automation for logistics and field service teams: fewer spreadsheets, real-time visibility and faster invoicing.",
    summary: "Dispatch, driver apps and invoicing in one system, instead of spreadsheets and phone calls.",
    intro:
      "Field teams run on spreadsheets, group chats and phone calls long after they outgrow them. We replace that patchwork with dispatch platforms and mobile apps that give everyone the same real-time picture.",
    challenges: [
      "Dispatch managed in spreadsheets and phone calls",
      "No real-time visibility of jobs and drivers",
      "Slow proof-of-delivery and invoicing",
    ],
    solutions: [
      { title: "Dispatch platforms", body: "Assign, track and reschedule jobs from one dashboard with live status." },
      { title: "Driver and technician apps", body: "Offline-first mobile apps with routes, checklists and photo proof of delivery." },
      { title: "Automated invoicing", body: "Completed jobs flow straight into invoices and your accounting system." },
    ],
    services: ["saas-development", "mobile-app-development", "ai-automations"],
    caseStudy: "logistics-saas-mvp",
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
