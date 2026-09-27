import type { Metadata } from "next";
import { Check, ClipboardCheck } from "lucide-react";
import { audit } from "@/lib/content";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/page/contact-form";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Free AI Workflow Audit: Find What to Automate First",
  description:
    "Book a free AI workflow audit. In 45 minutes we map your manual workflows and give you an ROI-ranked plan of what to automate first, with timeline and budget.",
  path: "/ai-workflow-audit",
});

export default function AuditPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "AI Workflow Audit", path: "/ai-workflow-audit" }]} badge="Free audit" icon={ClipboardCheck} title={audit.title} lead={audit.lead} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-[1.75rem]">What you get</h2>
              <ul className="flex flex-col gap-3">
                {audit.youGet.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-[1.75rem]">How it works</h2>
              <ol className="flex flex-col gap-3">
                {audit.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-card bg-card p-5 shadow-soft ring-1 ring-border/40">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/10 font-display text-sm font-semibold text-accent-dark">{i + 1}</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-h3">{s.title}</h3>
                      <p className="text-body">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-[1.75rem]">Request your audit</h2>
            <ContactForm audit subject="AI workflow audit request" submitLabel="Request my audit" />
          </div>
        </div>
      </Section>
      <JsonLd data={serviceSchema({ title: audit.title, description: audit.lead, path: "/ai-workflow-audit", serviceType: "AI workflow audit" })} />
    </>
  );
}
