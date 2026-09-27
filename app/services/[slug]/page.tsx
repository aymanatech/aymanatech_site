import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getService, services } from "@/lib/services";
import { caseStudies } from "@/lib/work";
import { faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { bookingLinkProps } from "@/lib/site";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CaseStudyCard, ServiceCard } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";
import { FAQ } from "@/components/sections/faq";
import { serviceIcons } from "@/components/ui/service-icons";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const Icon = serviceIcons[service.key];
  // The next three services in catalogue order, wrapping around, so every page links to different siblings.
  const index = services.indexOf(service);
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);
  const studies = caseStudies.filter((c) => c.services.includes(service.slug));

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]}
        badge={service.title}
        icon={Icon}
        title={service.h1}
        lead={service.intro}
      >
        <div className="flex w-full flex-col gap-3 pt-2 xs:w-auto xs:flex-row">
          <Button asChild variant="accent" size="lg">
            <a {...bookingLinkProps}>Book a discovery call</a>
          </Button>
          <Button asChild size="lg">
            <Link href="/work">See our work</Link>
          </Button>
        </div>
      </PageHero>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <figure className="overflow-hidden rounded-panel bg-card p-2 shadow-soft ring-1 ring-border/50">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              width={720}
              height={480}
              priority
              sizes="(max-width: 1024px) calc(100vw - 48px), 600px"
              className="aspect-[3/2] w-full rounded-[18px] object-cover"
            />
          </figure>
          <div className="flex flex-col gap-6">
            <h2 className="text-h2">What&apos;s included</h2>
            <ul className="flex flex-col gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-2">
              <h3 className="font-sans text-sm font-semibold text-muted-foreground">Technologies we use</h3>
              <ul className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <li key={t} className="rounded-pill bg-card px-3 py-1.5 text-sm font-medium text-subtle shadow-chip ring-1 ring-border/50">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="Results you can expect" subtitle={`What changes for your team after a ${service.title} engagement.`} />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {service.outcomes.map((o) => (
            <li key={o.title} className="flex flex-col gap-3 rounded-card bg-card-fade p-6 shadow-soft ring-1 ring-border/40">
              <h3 className="text-h3">{o.title}</h3>
              <p className="text-body">{o.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {studies.length ? (
        <Section className="pt-0 md:pt-0 lg:pt-0">
          <SectionHeader title={`${service.title} case studies`} />
          <ul className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2">
            {studies.map((c) => (
              <li key={c.slug}>
                <CaseStudyCard study={c} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <FAQ items={service.faqs} title={`${service.title} FAQs`} subtitle="Short answers to what clients ask before starting." badge="FAQ" id="service-faq" showCta={false} />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="Related services" />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Planning a ${service.title} project?`} />
      <JsonLd
        data={[
          serviceSchema({ title: service.title, description: service.metaDescription, path, serviceType: service.title }),
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}
