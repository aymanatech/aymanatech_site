import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { caseStudies } from "@/lib/work";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { CaseStudyCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Selected Work: AI Automation & Software Case Studies",
  description:
    "Case studies from Aymana Tech: AI support agents, voice agents, SaaS MVPs and conversion-focused websites, with the measured results each one delivered.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Selected Work", path: "/work" }]}
        badge="Selected work"
        icon={FolderKanban}
        title="AI Automation and Software Case Studies"
        lead="Real systems in production, with the numbers they moved. Clients are described by sector until they approve being named."
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="sr-only">Case studies</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard study={c} />
            </li>
          ))}
        </ul>
      </Section>
      <Testimonials more={{ label: "Read all client reviews", href: "/reviews" }} />
      <CtaBand />
      <JsonLd data={itemListSchema("Case studies", caseStudies.map((c) => ({ name: c.title, path: `/work/${c.slug}` })))} />
    </>
  );
}
