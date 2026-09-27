// Case studies at /work/[slug]. Clients are described by sector until they approve being named.

export type CaseStudy = {
  slug: string;
  title: string;
  /** Shorter <title> when the headline is too long for search results. */
  metaTitle?: string;
  metaDescription: string;
  client: string;
  industry: string; // industry slug
  services: string[]; // service slugs
  summary: string;
  headline: { value: string; label: string };
  duration: string;
  challenge: string;
  approach: { title: string; body: string }[];
  results: { value: string; label: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-support-ecommerce",
    title: "Automated Customer Support for an eCommerce Leader",
    metaDescription:
      "Case study: an AI support agent grounded in live order data now resolves 78% of an eCommerce retailer's tickets and cut first response from hours to seconds.",
    client: "Multi-brand eCommerce retailer",
    industry: "ecommerce",
    services: ["ai-agent-development", "api-crm-integrations"],
    summary: "An AI support agent resolves most tickets without a human, cutting first response from hours to seconds.",
    headline: { value: "78%", label: "of tickets resolved by AI" },
    duration: "6 weeks",
    challenge:
      "Seasonal peaks tripled ticket volume, and most requests were order status, returns and stock questions the team answered by hand. First response times stretched to hours and customer satisfaction fell every holiday season.",
    approach: [
      { title: "Ticket analysis", body: "We classified 12 months of tickets to find the intents that were frequent, repetitive and safe to automate." },
      { title: "Grounded agent", body: "The agent reads live order, shipping and inventory data, and answers only from approved policies." },
      { title: "Human hand-off", body: "Refund exceptions and complaints route to agents with the full conversation and order history attached." },
    ],
    results: [
      { value: "78%", label: "Tickets resolved without a human" },
      { value: "<10s", label: "Median first response" },
      { value: "+31%", label: "Customer satisfaction" },
    ],
    stack: ["Node.js", "Postgres", "OpenAI", "Shopify", "Zendesk"],
  },
  {
    slug: "logistics-saas-mvp",
    title: "Spreadsheet to SaaS in 8 Weeks for a Logistics Startup",
    metaDescription:
      "Case study: a logistics startup's dispatch spreadsheet became a multi-tenant SaaS platform with paying customers in 8 weeks, now handling 12,000+ shipments a month.",
    client: "Logistics startup",
    industry: "logistics",
    services: ["saas-development", "mobile-app-development"],
    summary: "A manual dispatch process became a multi-tenant platform with paying customers from month one.",
    headline: { value: "12,000+", label: "shipments a month" },
    duration: "8 weeks",
    challenge:
      "The founders ran dispatch for their first customers from a shared spreadsheet and phone calls. It proved demand but could not scale, and every new customer added hours of manual coordination.",
    approach: [
      { title: "Scope to revenue", body: "We cut the roadmap to the dispatch, tracking and invoicing features customers would pay for first." },
      { title: "Multi-tenant platform", body: "A web dashboard for dispatchers and a driver app with offline proof of delivery." },
      { title: "Billing from day one", body: "Subscription billing and usage limits meant the MVP produced revenue immediately." },
    ],
    results: [
      { value: "8 wks", label: "From kickoff to paying customers" },
      { value: "12k+", label: "Shipments processed per month" },
      { value: "0", label: "Core rebuilds since launch" },
    ],
    stack: ["Next.js", "tRPC", "Postgres", "React Native", "Stripe"],
  },
  {
    slug: "b2b-website-rebuild",
    title: "Website Rebuild That Tripled Qualified Leads for a B2B Consultancy",
    metaTitle: "B2B Website Rebuild That Tripled Leads",
    metaDescription:
      "Case study: a conversion-first website rebuild with sub-second load times and technical SEO tripled demo bookings for a B2B consultancy within 90 days.",
    client: "B2B consultancy",
    industry: "saas-startups",
    services: ["web-development", "ui-ux-design"],
    summary: "A conversion-first redesign with sub-second load times, plus technical SEO that lifted organic traffic.",
    headline: { value: "3.1x", label: "demo bookings in 90 days" },
    duration: "5 weeks",
    challenge:
      "The old site was slow, hard to update and buried the offer under generic copy. Paid traffic arrived but rarely converted, and organic rankings had stalled for a year.",
    approach: [
      { title: "Conversion-first structure", body: "Pages were rebuilt around the questions buyers ask, with one clear call to action per page." },
      { title: "Performance budget", body: "Every page loads in under a second, with Core Web Vitals checked on each release." },
      { title: "Technical SEO", body: "Clean semantic markup, schema, internal linking and a CMS the marketing team can use." },
    ],
    results: [
      { value: "3.1x", label: "Demo bookings" },
      { value: "0.8s", label: "Average page load" },
      { value: "95+", label: "Lighthouse performance score" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
  },
  {
    slug: "dental-voice-agent",
    title: "After-Hours Voice Agent for a Multi-Location Dental Group",
    metaTitle: "AI Voice Agent for a Dental Group",
    metaDescription:
      "Case study: an AI voice agent books appointments and answers insurance questions overnight across 14 dental clinics, with zero missed calls.",
    client: "Multi-location dental group",
    industry: "healthcare",
    services: ["ai-agent-development", "ai-automations"],
    summary: "A voice agent books appointments and answers insurance questions across every clinic, all night.",
    headline: { value: "14", label: "clinics, zero missed calls" },
    duration: "7 weeks",
    challenge:
      "After-hours calls went to voicemail, and many callers booked elsewhere before staff could call back. Front desks started each morning with a backlog instead of patients.",
    approach: [
      { title: "Call analysis", body: "We reviewed recorded calls to map the booking, rescheduling and insurance questions that made up most volume." },
      { title: "Voice agent", body: "The agent checks live availability, books across 14 clinics and answers coverage questions from approved policy." },
      { title: "Safe escalation", body: "Urgent symptoms and complex cases are flagged and routed to the on-call team immediately." },
    ],
    results: [
      { value: "0", label: "Missed after-hours calls" },
      { value: "14", label: "Clinics covered by one agent" },
      { value: "+24%", label: "Appointments booked" },
    ],
    stack: ["Vapi", "Twilio", "OpenAI", "Node.js", "Practice management API"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
