import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, Building2, CheckCircle2 } from "lucide-react";
import { getIndustry, industries } from "@/lib/industries";
import { getService } from "@/lib/services";
import { getCaseStudy } from "@/lib/work";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CaseStudyCard, IndustryCard, ServiceCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const i = getIndustry(params.slug);
  if (!i) return {};
  return pageMetadata({ title: i.metaTitle, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default function IndustryPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();
  const path = `/industries/${industry.slug}`;
  const relatedServices = industry.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const study = industry.caseStudy ? getCaseStudy(industry.caseStudy) : undefined;
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: industry.title, path },
        ]}
        badge={industry.title}
        icon={Building2}
        title={industry.h1}
        lead={industry.intro}
      >
        <Button asChild variant="accent" size="lg" className="mt-2">
          <Link href="/contact">Talk to a specialist</Link>
        </Button>
      </PageHero>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-5 rounded-panel bg-card-fade p-6 shadow-soft ring-1 ring-border/40 sm:p-8">
            <h2 className="text-2xl md:text-[1.75rem]">Common challenges</h2>
            <ul className="flex flex-col gap-4">
              {industry.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-base text-foreground">
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 rounded-panel bg-card p-6 shadow-raised ring-1 ring-accent/15 sm:p-8">
            <h2 className="text-2xl md:text-[1.75rem]">How we solve them</h2>
            <ul className="flex flex-col gap-5">
              {industry.solutions.map((s) => (
                <li key={s.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h3">{s.title}</h3>
                    <p className="text-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {study ? (
        <Section className="pt-0 md:pt-0 lg:pt-0">
          <SectionHeader title={`${industry.title} case study`} />
          <div className="mx-auto w-full max-w-[640px]">
            <CaseStudyCard study={study} />
          </div>
        </Section>
      ) : null}

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title={`Services for ${industry.title}`} subtitle="The services our clients in this sector use most." />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="Other industries" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((i) => (
            <li key={i.slug}>
              <IndustryCard industry={i} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
      <JsonLd
        data={serviceSchema({
          title: industry.h1,
          description: industry.metaDescription,
          path,
          serviceType: `Software development and AI automation for ${industry.title}`,
        })}
      />
    </>
  );
}
