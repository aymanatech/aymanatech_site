import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FolderKanban } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { getService } from "@/lib/services";
import { getIndustry } from "@/lib/industries";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CaseStudyCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle ?? c.title, description: c.metaDescription, path: `/work/${c.slug}`, type: "article" });
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  const path = `/work/${study.slug}`;
  const industry = getIndustry(study.industry);
  const usedServices = study.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  const facts = [
    { term: "Client", value: study.client },
    { term: "Industry", value: industry ? <Link href={`/industries/${industry.slug}`} className="text-accent underline-offset-4 hover:underline">{industry.title}</Link> : "-" },
    { term: "Timeline", value: study.duration },
    {
      term: "Services",
      value: (
        <span className="flex flex-col gap-1">
          {usedServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="text-accent underline-offset-4 hover:underline">
              {s.title}
            </Link>
          ))}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Selected Work", path: "/work" },
          { name: study.title, path },
        ]}
        badge="Case study"
        icon={FolderKanban}
        title={study.title}
        lead={study.summary}
      />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {study.results.map((r) => (
            <div key={r.label} className="flex flex-col gap-2 rounded-card bg-card p-6 shadow-soft ring-1 ring-border/40">
              <dt className="order-2 text-sm font-medium text-muted-foreground">{r.label}</dt>
              <dd className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-accent">{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:gap-16">
          <article className="prose-content">
            <h2>The challenge</h2>
            <p>{study.challenge}</p>
            <h2>Our approach</h2>
            {study.approach.map((a) => (
              <section key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </section>
            ))}
            <h2>Technology</h2>
            <p>{study.stack.join(", ")}.</p>
          </article>
          <aside aria-label="Project facts" className="h-fit rounded-panel bg-card-fade p-6 shadow-soft ring-1 ring-border/40 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <dl className="flex flex-col gap-5">
              {facts.map((f) => (
                <div key={f.term} className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-muted-foreground">{f.term}</dt>
                  <dd className="text-base text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="More case studies" />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {more.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard study={c} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title="Want results like these?" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(site.ogImage),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${absoluteUrl("/")}/#organization` },
          about: usedServices.map((s) => s.title),
        }}
      />
    </>
  );
}
