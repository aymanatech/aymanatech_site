// Home-page and company copy. Brand details live in lib/site.ts; catalogue data in
// lib/services.ts, lib/industries.ts, lib/work.ts and lib/articles.ts.

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
