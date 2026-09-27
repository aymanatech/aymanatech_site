// Brand, contact details and navigation. Everything that identifies the business lives here.

/** Production origin. Set NEXT_PUBLIC_SITE_URL in your hosting environment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aymanatech.com").replace(/\/$/, "");

export const site = {
  name: "Aymana Tech",
  legalName: "Aymana Tech",
  tagline: "AI Automation & Custom Software Development Agency",
  description:
    "Aymana Tech is an AI automation and custom software development agency. We build AI agents, workflow automations, SaaS MVPs, web and mobile apps for growing teams.",
  keywords: [
    "AI automation agency",
    "AI workflow automation",
    "AI agent development",
    "custom software development company",
    "SaaS MVP development",
    "web application development",
    "mobile app development",
    "React Native development",
    "API and CRM integration",
    "UI/UX design agency",
  ],
  email: "customer@aymanatech.com",
  careersEmail: "customer@aymanatech.com",
  phone: "+92-336-9210724",
  /** 30-minute discovery call. Every "Book a call" button opens this in a new tab. */
  bookingUrl: "https://calendly.com/aymanatech/30min",
  locale: "en_US",
  ogImage: "/og-image.png",
  founded: "2021",
  social: {
    linkedin: "https://www.linkedin.com/company/aymana-tech/",
    x: "https://x.com/AymanaTech",
    github: "https://github.com/aymanatech",
  },
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = {
  label: string;
  href: string;
  /** One line shown in the mega-menu intro card. */
  description: string;
  /** Label for the intro card's link to `href`. */
  cta: string;
  items: NavItem[];
};

/** Props for any link to the booking page: opens in a new tab, safely. */
export const bookingLinkProps = { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" } as const;

export const isExternal = (href: string) => /^https?:\/\//.test(href);
