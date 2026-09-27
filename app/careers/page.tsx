import type { Metadata } from "next";
import { Briefcase, MapPin } from "lucide-react";
import { careers } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = pageMetadata({
  title: "Careers: Remote AI & Software Engineering Jobs",
  description:
    "Join Aymana Tech. Remote-first roles for senior full-stack engineers, AI engineers and product designers working on AI automation and SaaS products.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} badge="Careers" icon={Briefcase} title="Careers at Aymana Tech" lead={careers.intro} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="text-h2">Open roles</h2>
        <ul className="flex flex-col gap-3">
          {careers.roles.map((r) => (
            <li key={r.title} className="flex flex-col items-start justify-between gap-4 rounded-card bg-card p-5 shadow-soft ring-1 ring-border/40 sm:flex-row sm:items-center sm:p-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3">{r.title}</h3>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" aria-hidden /> {r.location}, {r.type}
                </p>
              </div>
              <Button asChild variant="accent" className="w-full sm:w-auto">
                <a href={`mailto:${site.careersEmail}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}>
                  Apply<span className="sr-only"> for {r.title}</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <p className="text-body">
          Don&apos;t see your role? Send your portfolio or GitHub to{" "}
          <a href={`mailto:${site.careersEmail}`} className="font-medium text-accent underline underline-offset-4">
            {site.careersEmail}
          </a>
          .
        </p>
      </Section>
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="Why work with us" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careers.perks.map((p) => (
            <li key={p.title} className="flex flex-col gap-2 rounded-card bg-card-fade p-6 shadow-soft ring-1 ring-border/40">
              <h3 className="text-h3">{p.title}</h3>
              <p className="text-body">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
