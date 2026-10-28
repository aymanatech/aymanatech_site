import { site } from "@/lib/site";
import { caseStudies } from "@/lib/work";

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
  cta: "Discuss your project",
  note: "Every engagement is tailored to your goals.",
  plans: [
    {
      name: "Automation",
      monthly: 1200,
      blurb: "For ongoing workflow optimization and AI support",
      popular: false,
      features: ["Workflow mapping", "Automation setup", "Ops monitoring", "Monthly optimization"],
    },
    {
      name: "Growth",
      monthly: 2200,
      blurb: "For teams that need product delivery and automation in parallel",
      popular: true,
      features: ["AI workflow automations", "Custom software", "Weekly updates", "Strategy support"],
    },
    {
      name: "Scale",
      monthly: 3800,
      blurb: "For more complex platform work and operational systems",
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
  title: "Results that speak for themselves",
  items: [
    { label: "Years building", value: 5, suffix: "+" },
    { label: "Projects shipped", value: 40, suffix: "+" },
    { label: "Workflow hours saved", value: 1, suffix: "k+" },
    { label: "Avg. launch speed", value: 4, suffix: " weeks" },
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
    { name: "Ayman", role: "Founder & Strategy", bio: "Helps teams turn business goals into practical product and automation roadmaps." },
    { name: "Mila", role: "Product Designer", bio: "Designs clear, accessible product experiences around the needs of real users." },
    { name: "Noah", role: "Senior Engineer", bio: "Builds reliable software foundations and integrations that scale with the business." },
    { name: "Zahra", role: "Operations Lead", bio: "Keeps delivery focused and makes sure every solution fits the way teams work." },
    { name: "Leo", role: "Automation Engineer", bio: "Connects tools and automates repetitive workflows with measurable outcomes." },
    { name: "Amal", role: "Delivery Manager", bio: "Coordinates collaboration and keeps projects moving from discovery to launch." },
  ],
};

export const comparison = {
  badge: "Why Aymana Tech",
  title: "A better way to build",
  subtitle: "Senior expertise, clear ownership, and practical outcomes from day one.",
  ours: {
    points: [
      "One senior team from strategy through delivery",
      "Solutions designed around your existing workflows",
      "Transparent progress and clear communication",
      "You own the code, documentation, and systems",
    ],
  },
  theirs: {
    label: "The usual alternative",
    points: [
      "Separate vendors for strategy, design, and development",
      "Generic tools that do not fit your workflows",
      "Unclear timelines and limited visibility",
      "Ongoing dependence on the original vendor",
    ],
  },
};

export const process = {
  badge: "Our process",
  title: "From first conversation to live system",
  subtitle: "A clear, collaborative path from understanding the problem to delivering measurable results.",
  steps: [
    {
      title: "Discover",
      body: "We map your goals, users, workflows, and constraints to find the highest-impact opportunity.",
      duration: "Week 1",
      details: ["Review existing tools and processes", "Agree on scope and success measures", "Prioritize the first release"],
    },
    {
      title: "Design and build",
      body: "We shape the solution, validate key decisions, and share working progress throughout delivery.",
      duration: "Weeks 2–5",
      details: ["Define the technical approach", "Build and test in focused iterations", "Review progress together each week"],
    },
    {
      title: "Launch and improve",
      body: "We launch with a clear handoff, monitor real-world use, and improve based on what the data shows.",
      duration: "Ongoing",
      details: ["Prepare your team and systems for launch", "Document and hand over the solution", "Measure results and plan improvements"],
    },
  ],
};

export const projects = {
  badge: "Selected work",
  title: "Built to make a difference",
  subtitle: "A few examples of the outcomes our product and automation work can deliver.",
  projects: caseStudies.map((study) => ({
    tab: study.client,
    client: study.industry.replaceAll("-", " "),
    title: study.title,
    body: study.summary,
    metrics: study.results.slice(0, 2),
  })),
};

export const audit = {
  title: "Find the right workflows to automate",
  lead: "In a focused 45-minute session, we map your manual work and identify practical opportunities for AI and automation.",
  youGet: [
    "A map of your highest-friction workflows",
    "An ROI-ranked list of automation opportunities",
    "A practical view of timelines, risks, and next steps",
  ],
  steps: [
    { title: "Share your context", body: "Tell us about your team, tools, and the work that takes too much time." },
    { title: "Map the opportunity", body: "We identify bottlenecks and assess which tasks are safe and worthwhile to automate." },
    { title: "Get your action plan", body: "Leave with prioritized recommendations and clear next steps." },
  ],
};

export const careers = {
  intro: "Join a remote-first team building thoughtful software and automation for growing businesses.",
  roles: [
    { title: "Senior Full-Stack Engineer", location: "Remote", type: "Full-time" },
    { title: "AI & Automation Engineer", location: "Remote", type: "Full-time" },
    { title: "Product Designer", location: "Remote", type: "Contract" },
  ],
  perks: [
    { title: "Remote-first", body: "Work from where you do your best work, with a team that values clear communication." },
    { title: "Meaningful work", body: "Build systems that solve real problems for the people who use them." },
    { title: "Room to grow", body: "Take ownership, deepen your craft, and help shape how we work." },
    { title: "Built on trust", body: "We focus on outcomes, thoughtful collaboration, and sustainable delivery." },
  ],
};

export const footer = {
  titleTop: "Have a workflow worth fixing?",
  titleBottom: "Let’s build a better way.",
  blurb: "Tell us what is slowing your team down. We’ll help you find a practical path forward.",
  cta: "Book a call",
};
