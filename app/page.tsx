import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Features } from "@/components/sections/features";
import { Comparison } from "@/components/sections/comparison";
import { Projects } from "@/components/sections/projects";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Team } from "@/components/sections/team";
import { Blog } from "@/components/sections/blog";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation & Software Development Agency | Aymana Tech",
  description: "AI automation and custom software for growing teams. Build agents, automate workflows, and launch SaaS products in weeks.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process more={{ label: "See how we work", href: "/process" }} />
      <Industries />
      <Features />
      <Comparison />
      <Projects more={{ label: "Browse selected work", href: "/work" }} />
      <Pricing />
      <Testimonials more={{ label: "Read client reviews", href: "/reviews" }} />
      <Team more={{ label: "Meet the team", href: "/team" }} />
      <Blog />
      <FAQ />
      <JsonLd data={itemListSchema("AI automation and software development services", services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })))} />
    </>
  );
}
