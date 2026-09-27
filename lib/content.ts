// Home-page and company copy. Brand details live in lib/site.ts; catalogue data in
// lib/services.ts, lib/industries.ts, lib/work.ts and lib/articles.ts.

import { site } from "@/lib/site";

export { site };

export const hero = {
  titleTop: "AI Automation & Custom Software",
  titleBottom: "Built for Growing Teams",
  /** Typewriter phrases for the second headline line. The first is also the static, crawlable text. */
  phrases: ["Built for Growing Teams", "That Never Sleeps", "Shipped in Weeks", "Your Team Will Trust", "That Scales With You"],
  subtitle:
    "We design and ship AI agents, workflow automations, SaaS products and web and mobile apps. One senior team from strategy to launch, with results you can measure in weeks.",
  cta: "Book a call",
  secondary: { label: "See our work", href: "/work" },
};

export const about = {
  badge: "About us",
  title: "A Senior AI Automation and Software Development Team",
  statement:
    "Aymana Tech is a small senior team that turns messy, manual operations into dependable AI-driven systems your people actually trust.",
  trusted: "Trusted by 40+ founders, operators and product teams",
  partners: ["Northwind", "Halcyon", "Brightside", "Kestrel", "Meridian", "Tidewater"],
};

export const process = {
  badge: "Process",
  title: "From First Call to Live System",
  subtitle: "Three clear phases, weekly demos, and no surprises along the way.",
  steps: [
    {
      title: "Discovery & AI audit",
      body: "We map your workflows, data and bottlenecks, then rank every opportunity by return and effort. You leave with a prioritised roadmap.",
      details: ["Stakeholder interviews and process mapping", "Data and systems review", "ROI-ranked roadmap with fixed first-phase scope"],
      duration: "1–2 weeks",
    },
    {
      title: "Architecture & build",
      body: "We design the system before writing code, then ship weekly builds you can click through, integrated with your CRM, ERP, payments and telephony.",
      details: ["Architecture and security review", "Weekly demos in a staging environment", "Integration with your existing tools"],
      duration: "2–10 weeks",
    },
    {
      title: "Launch & optimise",
      body: "Load tests, security review and edge-case evaluation before launch. After it, we monitor, retrain on real data and expand what works.",
      details: ["Staged rollout with human approval", "Monitoring dashboards and alerts", "Monthly tuning and roadmap reviews"],
      duration: "Ongoing",
    },
  ],
};

export const servicesSection = {
  badge: "Services",
  title: "AI, Software and Web Development Services",
  subtitle: "One senior team for automation, product engineering and the infrastructure underneath.",
};

export const industriesSection = {
  badge: "Industries",
  title: "Industries We Build For",
  subtitle: "Proven systems for teams where speed, accuracy and compliance all matter.",
};

export const features = {
  badge: "Why us",
  title: "Built to Be Relied On",
  subtitle: "The details that separate a demo from a system you can run a business on.",
  items: [
    { icon: "brain", title: "Context-aware logic", body: "Decisions that account for history, tone and edge cases rather than blunt rules." },
    { icon: "workflow", title: "Made-to-measure flows", body: "Every flow is shaped around how your team works today, not a generic template." },
    { icon: "plug", title: "Plays well with your stack", body: "Clean connections to your CRM, inbox, help desk and project tools." },
    { icon: "zap", title: "Weeks, not quarters", body: "Small, staged releases get value into your hands quickly and safely." },
    { icon: "chart", title: "Numbers you can see", body: "Live dashboards show volume, accuracy and hours saved at a glance." },
    { icon: "shield", title: "Private by default", body: "Careful data handling, access controls and monitoring from day one." },
  ],
};

export const comparison = {
  badge: "Benefits",
  title: "A Different Kind of Development Partner",
  subtitle: "What changes when the people who design the system also run it with you.",
  ours: {
    label: site.name,
    points: [
      "Hands-on setup, handled for you",
      "Designed around your real workflow",
      "Understands context and nuance",
      "Improves every month after launch",
      "Works across your whole stack",
      "Scales without a rebuild",
    ],
  },
  theirs: {
    label: "Typical vendors",
    points: [
      "Long, do-it-yourself onboarding",
      "One-size-fits-all templates",
      "Rigid rules that break easily",
      "Frozen once it goes live",
      "Locked to a few platforms",
      "Creaks as volume grows",
    ],
  },
};

export const stats = {
  title: "Results You Can Measure",
  items: [
    { value: 10, suffix: "x", label: "Faster process throughput" },
    { value: 80, suffix: "%", label: "Less manual handling" },
    { value: 99, suffix: ".9%", label: "Uptime across shipped products" },
    { value: 6, suffix: " wks", label: "Idea to live MVP, on average" },
    { value: 24, suffix: "/7", label: "Always running" },
  ],
};

export const projects = {
  badge: "Projects",
  title: "Recent AI, SaaS and Web Projects",
  subtitle: "A few of the systems we have put into production.",
  projects: [
    {
      tab: "Sales",
      client: "Lattice CRM",
      title: "Inbound Leads Scored and Routed in Seconds",
      body: "Every enquiry is enriched, scored and handed to the right rep with a drafted reply, so nothing sits unanswered.",
      metrics: [
        { value: "−55%", label: "Time to first response" },
        { value: "+38%", label: "Qualified meetings booked" },
      ],
    },
    {
      tab: "Creative",
      client: "Studio Ember",
      title: "Briefs Turned Into First Drafts Overnight",
      body: "Incoming briefs become structured outlines, asset lists and first-pass copy, ready for the team each morning.",
      metrics: [
        { value: "−45%", label: "Hours spent on setup" },
        { value: "2×", label: "Campaigns shipped per month" },
      ],
    },
    {
      tab: "Healthcare",
      client: "Cedar Clinics",
      title: "Patient Intake Without the Paper Chase",
      body: "Forms are checked, gaps are chased automatically, and complete records reach staff before the appointment.",
      metrics: [
        { value: "−60%", label: "Admin time per patient" },
        { value: "92%", label: "Records complete on arrival" },
      ],
    },
    {
      tab: "E-commerce",
      client: "Harbor Goods",
      title: "Order Questions Answered Instantly",
      body: "Tracking, returns and stock questions are resolved on the spot, with tricky cases passed to a person with full context.",
      metrics: [
        { value: "−50%", label: "Support tickets handled by staff" },
        { value: "+31%", label: "Customer satisfaction" },
      ],
    },
    {
      tab: "Financial",
      client: "Quill Ledger",
      title: "Month-End Close in Days, Not Weeks",
      body: "Invoices are matched, exceptions flagged and reports assembled automatically, leaving the team to review and sign off.",
      metrics: [
        { value: "−65%", label: "Time to close the books" },
        { value: "99%", label: "Matching accuracy" },
      ],
    },
  ],
};

export const pricing = {
  badge: "Pricing",
  title: "Engagements That Grow With You",
  subtitle: "Straightforward monthly engagements. Change or stop whenever you need.",
  yearlyDiscount: 0.25,
  plans: [
    {
      name: "Launch",
      monthly: 400,
      blurb: "For small teams automating their first few workflows.",
      features: ["2 tailored workflows", "Up to 3 integrations", "Email support", "Core dashboard", "1 revision round"],
      popular: false,
    },
    {
      name: "Scale",
      monthly: 950,
      blurb: "For growing companies ready to automate core operations.",
      features: ["Up to 7 tailored workflows", "Up to 8 integrations", "Priority email and chat", "Advanced analytics", "Monthly tuning session"],
      popular: true,
    },
    {
      name: "Enterprise",
      monthly: 1600,
      blurb: "For complex, high-volume operations with bespoke needs.",
      features: ["Unlimited workflows", "Custom API integrations", "Dedicated lead", "Team onboarding and training", "Real-time monitoring"],
      popular: false,
    },
  ],
  note: "Pause or cancel anytime",
  cta: "Choose plan",
};

export const testimonials = {
  badge: "Testimonials",
  title: "What Our Clients Say",
  subtitle: "Teams across very different industries, with the same result.",
  items: [
    {
      name: "Priya Nair",
      role: "Operations Lead",
      quote: "Our inbox finally runs itself.",
      body: "Routine requests are handled before we even see them. The team now spends its day on the work that needs a person.",
    },
    {
      name: "Marcus Webb",
      role: "Founder",
      quote: "Live in three weeks, paid back in six.",
      body: "They understood our process faster than most new hires do, and the rollout never disrupted the business.",
    },
    {
      name: "Hannah Sørensen",
      role: "Head of Support",
      quote: "Faster answers and a calmer team.",
      body: "Customers get accurate replies right away, and my agents only step in where judgement really matters.",
    },
    {
      name: "Diego Alvarez",
      role: "CTO",
      quote: "They challenged how we work, in a good way.",
      body: "Beyond the automation itself, they helped us simplify the process underneath it. That was the real win.",
    },
    {
      name: "Claire Dubois",
      role: "Marketing Director",
      quote: "It simply works, every single day.",
      body: "Campaign setup used to eat our week. Now it happens in the background and we review the results.",
    },
    {
      name: "Omar Siddiqui",
      role: "COO",
      quote: "Every automated action is logged.",
      body: "Our compliance team was the most sceptical group in the company. The audit trail won them over in the first review.",
    },
  ],
};

export const team = {
  badge: "Team",
  title: "The People Behind the Systems",
  subtitle: "Engineers, designers and operators who have run the workflows they automate.",
  members: [
    { name: "Samira Haddad", role: "Co-Founder, Strategy", bio: "Ran operations at two scale-ups before co-founding Aymana Tech. Leads discovery and roadmaps." },
    { name: "Kenji Mori", role: "Lead AI Engineer", bio: "Builds agents and evaluation pipelines. Previously shipped search and ML features at a SaaS company." },
    { name: "Lucía Ferreira", role: "Product Designer", bio: "Designs interfaces and design systems for complex products, from research to Figma handover." },
    { name: "Tobias Lindqvist", role: "Integrations Engineer", bio: "Connects CRMs, ERPs and billing systems so data moves reliably between them." },
    { name: "Grace Okafor", role: "Client Success", bio: "Keeps projects on track after launch with monthly reviews and performance reporting." },
    { name: "Felix Brandt", role: "Automation Architect", bio: "Designs the architecture behind our automations, with a focus on reliability and security." },
  ],
};

export const companyValues = [
  { title: "Senior people only", body: "The people on your first call are the people who build your system. No hand-offs to junior teams." },
  { title: "Measured, not promised", body: "Every engagement starts with agreed success measures and ends with a dashboard that tracks them." },
  { title: "You own everything", body: "Code, prompts, infrastructure and documentation live in your accounts from day one." },
  { title: "Small steps, shipped weekly", body: "Weekly demos keep scope honest and decisions fast, with no big-bang launches." },
];

export const careers = {
  intro:
    "We are a small, remote-first team of senior engineers and designers. We hire slowly, pay fairly and give people ownership of real client outcomes.",
  perks: [
    { title: "Remote-first", body: "Work from anywhere within four hours of UTC, with a yearly team retreat." },
    { title: "Senior peers", body: "Every project is staffed by experienced people who review each other's work." },
    { title: "Learning budget", body: "An annual budget for courses, conferences and books." },
    { title: "Sensible hours", body: "No on-call heroics. We plan work so evenings stay free." },
  ],
  roles: [
    { title: "Senior Full-Stack Engineer (TypeScript)", type: "Full-time", location: "Remote" },
    { title: "AI Engineer, Agents & Evaluation", type: "Full-time", location: "Remote" },
    { title: "Product Designer (SaaS)", type: "Contract", location: "Remote" },
  ],
};

export const faq = {
  badge: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Straight answers to the questions we hear on every first call.",
  items: [
    {
      q: "How long does a typical AI automation or web project take?",
      a: "Most AI automations go live in 2 to 6 weeks, depending on how many systems they connect. Marketing websites take 3 to 6 weeks from design approval. A SaaS MVP typically reaches paying users in 8 to 12 weeks, with larger platforms scoped in phases.",
    },
    {
      q: "Do you handle custom SaaS development from scratch?",
      a: "Yes. We take products from idea to launch: scoping, UX, multi-tenant architecture, billing, infrastructure and ongoing iteration after release.",
    },
    {
      q: "Can you integrate AI into our existing software stack?",
      a: "Yes. We build around the CRM, helpdesk, ERP and databases you already use, and only suggest replacing a tool when it is clearly holding you back.",
    },
    {
      q: "How do you ensure data security with AI models?",
      a: "Access is limited to what each workflow needs, data stays in your accounts wherever possible, providers are chosen for your compliance needs, and every automated action is logged.",
    },
    {
      q: "How do you price engagements?",
      a: "Projects are priced as a fixed scope after a short discovery phase. Ongoing automation and support run as monthly engagements you can change or pause at any time.",
    },
    {
      q: "Who owns the code and the AI models?",
      a: "You do. Code, prompts, configuration and infrastructure are delivered into your accounts, with documentation so any team can maintain them.",
    },
  ],
  cta: "Ask something else",
};

export const audit = {
  title: "Free AI Workflow Audit",
  lead: "In a 45-minute session we map where your team loses time and show you which workflows to automate first, with estimated hours saved for each.",
  youGet: [
    "A map of your highest-volume manual workflows",
    "An ROI estimate for the top three automation opportunities",
    "A recommended first project with timeline and budget range",
    "A written summary you can share with your team",
  ],
  steps: [
    { title: "Share the basics", body: "Tell us about your team, tools and the processes that frustrate you most." },
    { title: "Walk us through the work", body: "A 45-minute call where we trace how requests actually move through your team." },
    { title: "Get your roadmap", body: "Within three working days you receive a prioritised, costed automation plan." },
  ],
};

export const footer = {
  titleTop: "Ready When",
  titleBottom: "You Are",
  cta: "Book a call",
  blurb: "Tell us where the hours go. We will show you what can run on its own, what to build, and what it will return.",
};
