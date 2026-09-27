import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { industries } from "@/lib/industries";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { IndustryCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Industries: AI Automation & Software by Sector",
  description:
    "AI automation and custom software for healthcare, finance and accounting, travel and transport, SaaS startups, eCommerce, and logistics and field operations.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        badge="Industries"
        icon={Building2}
        title="AI Automation and Software for Your Industry"
        lead="Every sector has its own bottlenecks, regulations and systems. These are the industries where we have built and run production systems."
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="sr-only">Industries we serve</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <li key={i.slug}>
              <IndustryCard industry={i} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Don't see your industry?" body="Most of what we build transfers across sectors. Tell us about your workflows and we'll tell you honestly whether we can help." />
      <JsonLd data={itemListSchema("Industries", industries.map((i) => ({ name: i.title, path: `/industries/${i.slug}` })))} />
    </>
  );
}
