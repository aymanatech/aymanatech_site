// Header menu and footer link columns, generated from the catalogue so every link has a real page.

import type { NavGroup, NavItem } from "@/lib/site";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { caseStudies } from "@/lib/work";

export const navGroups: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    description: "AI automation, product engineering and the infrastructure underneath, from one senior team.",
    cta: "All services",
    items: [
      ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Proven systems for teams where speed, accuracy and compliance all matter.",
    cta: "All industries",
    items: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
  },
  {
    label: "Work",
    href: "/work",
    description: "Real systems in production, with the numbers they moved.",
    cta: "All case studies",
    items: [
      { label: "Selected Work", href: "/work" },
      { label: "Projects", href: "/projects" },
      { label: "Client Reviews", href: "/reviews" },
      ...caseStudies.map((c) => ({ label: c.title, href: `/work/${c.slug}` })),
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    description: "Playbooks and guides for planning AI and software projects.",
    cta: "Read the blog",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "AI Workflow Audit", href: "/ai-workflow-audit" },
      { label: "Guides", href: "/guides" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    description: "A small senior team that designs, builds and runs what it ships.",
    cta: "About us",
    items: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Our Process", href: "/process" },
      { label: "Selected Work", href: "/work" },
      { label: "Projects", href: "/projects" },
      { label: "Client Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  { title: "Services", links: [...navGroups[0].items, { label: "All services", href: "/services" }] },
  { title: "Industries", links: navGroups[1].items },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Our Process", href: "/process" },
      { label: "Selected Work", href: "/work" },
      { label: "Projects", href: "/projects" },
      { label: "Client Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "AI Workflow Audit", href: "/ai-workflow-audit" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
