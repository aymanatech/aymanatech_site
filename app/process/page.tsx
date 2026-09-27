import type { Metadata } from "next";
import { Route, Check } from "lucide-react";
import { process } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Our Process: From Discovery to Live System",
  description:
    "How Aymana Tech delivers AI automation and software projects: discovery and AI audit, architecture and weekly builds, then launch, monitoring and optimisation.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Our Process", path: "/process" }]} badge="Process" icon={Route} title="Our Software Development Process" lead={process.subtitle + " Here is exactly what happens, and when."} />
      <Process hideHeader />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="text-h2">Phase by phase</h2>
        <ol className="flex flex-col gap-4">
          {process.steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-1 gap-4 rounded-card bg-card p-6 shadow-soft ring-1 ring-border/40 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 md:p-8">
              <div className="flex flex-col gap-1">
                <span className="font-display text-sm font-semibold text-accent">Phase {i + 1}</span>
                <span className="text-sm text-muted-foreground">{s.duration}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-h3">{s.title}</h3>
                <p className="text-body">{s.body}</p>
                <ul className="flex flex-col gap-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How Aymana Tech delivers an AI automation or software project",
          step: process.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
        }}
      />
    </>
  );
}
