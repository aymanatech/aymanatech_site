import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import { services } from "@/lib/services";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";
import { Process } from "@/components/sections/process";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation, Software & App Development Services",
  description:
    "Explore Aymana Tech's services: AI workflow automation, AI agent development, custom software, SaaS MVPs, web and mobile apps, DevOps, integrations and UI/UX design.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        badge="Services"
        icon={LayoutGrid}
        title="AI Automation and Software Development Services"
        lead="Twelve services, one senior team. Pick a single engagement or combine them: most clients start with an automation or MVP and grow from there."
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="sr-only">All services</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard service={s} priority={i < 3} />
            </li>
          ))}
        </ul>
      </Section>
      <Process more={{ label: "Read about our process", href: "/process" }} />
      <CtaBand />
      <JsonLd data={itemListSchema("Aymana Tech services", services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })))} />
    </>
  );
}
