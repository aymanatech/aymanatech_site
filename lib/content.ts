import { site } from "@/lib/site";

export { site };

export const hero = {
  titleTop: "AI Automation Agency & Custom Software Development",
  titleBottom: "Aymana Tech",
  /** Typewriter phrases for the second headline line. The first is also the static, crawlable text. */
  phrases: ["Built for Growing Teams", "That Never Sleeps", "Shipped in Weeks", "Your Team Will Trust", "That Scales With You"],
  subtitle:
    "We design and ship AI agents, workflow automations, SaaS products and web and mobile apps. One senior team from strategy to launch, with results you can measure in weeks.",
  cta: "Book a call",
  secondary: { label: "See our work", href: "/work" },
};

export const about = {
  badge: "About us",
  title: "Built for growing teams",
  statement:
    "We help companies remove manual work, automate decision-heavy processes, and ship software that teams actually want to use.",
  trusted: "Trusted by teams across operations, product, marketing, and customer experience",
  partners: ["Nexa", "FlowPilot", "Northstar", "Signal", "Vantage", "Luma"],
};

export const servicesSection = {
  badge: "Services",
  title: "What we build",
  subtitle: "AI systems and software that reduce busywork and increase delivery speed.",
};

export const industriesSection = {
  badge: "Industries",
  title: "Built for complex operations",
  subtitle: "We work with teams where speed, trust, and workflow clarity matter most.",
};

export const features = {
  badge: "Why teams choose us",
  title: "Strategy, software, and automation in one team",
  subtitle: "A single senior team from discovery through launch and support.",
  items: [
    { icon: "brain", title: "Strategic clarity", body: "We align the business case, user needs, and technical path before building." },
    { icon: "workflow", title: "Workflow design", body: "We map the process first so automations handle real operational bottlenecks." },
    { icon: "plug", title: "System integrations", body: "We connect the tools your team already uses and eliminate manual handoffs." },
    { icon: "zap", title: "Fast execution", body: "We ship working builds in weeks and improve based on real usage." },
    { icon: "chart", title: "Measured outcomes", body: "We track the metrics that matter: time saved, quality, velocity, and conversion." },
    { icon: "shield", title: "Reliable handoff", body: "We document and deliver systems your team can run and evolve with confidence." },
  ],
};

export const pricing = {
  badge: "Pricing",
  title: "Simple plans for product and automation work",
  subtitle: "Flexible engagements for ongoing automation and fixed-scope delivery.",
  yearlyDiscount: 0.15,
  plans: [
    {
      name: "Automation",
      monthly: 1200,
      description: "For ongoing workflow optimization and AI support",
      popular: false,
      features: ["Workflow mapping", "Automation setup", "Ops monitoring", "Monthly optimization"],
    },
    {
      name: "Growth",
      monthly: 2200,
      description: "For teams that need product delivery and automation in parallel",
      popular: true,
      features: ["AI workflow automations", "Custom software", "Weekly updates", "Strategy support"],
    },
    {
      name: "Scale",
      monthly: 3800,
      description: "For more complex platform work and operational systems",
      popular: false,
      features: ["Multi-system architecture", "Custom dashboards", "Integration design", "Advanced support"],
    },
  ],
};

export const faq = {
  badge: "FAQ",
  title: "Questions teams ask before they start",
  subtitle: "Timelines, pricing, security, ownership, and operating model.",
  cta: "Book a discovery call",
  items: [
    {
      q: "How long does a project take?",
      a: "Most automation and AI projects launch in 2–6 weeks. Product and custom software work usually lands in 8–12 weeks depending on the scope and level of integration.",
    },
    {
      q: "Do you work with existing teams and tools?",
      a: "Yes. We connect with the systems you already use and focus on improving the workflow, not replacing it unnecessarily.",
    },
    {
      q: "Who owns the code after launch?",
      a: "You do. We set up the project so your team owns the code, documentation, workflows, and deployment setup.",
    },
    {
      q: "Is pricing fixed or monthly?",
      a: "It depends on the engagement. Ongoing automation work is usually monthly, while project-based software builds are scoped and quoted up front.",
    },
  ],
};

export const stats = {
  items: [
    { label: "Years building", value: "5", suffix: "+" },
    { label: "Projects shipped", value: "40", suffix: "+" },
    { label: "Workflow hours saved", value: "1k", suffix: "+" },
    { label: "Avg. launch speed", value: "4", suffix: " weeks" },
  ],
};

export const companyValues = [
  {
    title: "Senior by default",
    body: "You work with experienced builders who understand product, systems, and the realities of operating teams.",
  },
  {
    title: "Clear process",
    body: "We scope tightly, communicate clearly, and show working progress weekly so you always know what is happening.",
  },
  {
    title: "Business-first decisions",
    body: "We build what moves the business forward instead of shipping features no one will use.",
  },
  {
    title: "Long-term ownership",
    body: "We document and hand off systems in a way your team can run, improve, and extend.",
  },
];

export const testimonials = {
  badge: "Testimonials",
  title: "What clients say",
  subtitle: "Teams use our systems to move faster without chaos.",
  items: [
    {
      name: "Nadia M.",
      role: "COO",
      quote: "We stopped losing time to repetitive work and finally had a process our team trusted.",
      body: "The project delivered real operational clarity within the first month of launch.",
    },
    {
      name: "Oliver K.",
      role: "Product Lead",
      quote: "The team balanced speed and quality; we were shipping useful functionality much earlier than expected.",
      body: "The architecture and handoff were excellent, and adoption was immediate.",
    },
    {
      name: "Sara R.",
      role: "Head of Ops",
      quote: "The automations removed bottlenecks without creating more complexity for the team.",
      body: "We now have a cleaner rhythm across handoffs, approvals, and reporting.",
    },
  ],
};

export const team = {
  badge: "Team",
  title: "A senior team built for execution",
  subtitle: "Operators, strategists, designers, and engineers working together on the same goal.",
  members: [
    { name: "Ayman", role: "Founder & Strategy" },
    { name: "Mila", role: "Product Designer" },
    { name: "Noah", role: "Senior Engineer" },
    { name: "Zahra", role: "Operations Lead" },
    { name: "Leo", role: "Automation Engineer" },
    { name: "Amal", role: "Delivery Manager" },
  ],
};
