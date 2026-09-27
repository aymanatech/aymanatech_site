import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import type { Industry } from "@/lib/industries";
import type { CaseStudy } from "@/lib/work";
import { articleHref, type Article } from "@/lib/articles";
import { serviceIcons } from "@/components/ui/service-icons";
import { cn } from "@/lib/utils";

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-card bg-card shadow-soft ring-1 ring-border/50 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-raised focus-within:shadow-raised";

/** The whole card is clickable through a stretched link on the title (one link per card, good for a11y and SEO). */
const stretched = "after:absolute after:inset-0 after:content-['']";

export function ServiceCard({ service, headingLevel = "h3", priority = false }: { service: Service; headingLevel?: "h2" | "h3"; priority?: boolean }) {
  const Icon = serviceIcons[service.key];
  const H = headingLevel;
  return (
    <article className={cardBase}>
      <div className="relative m-2 aspect-[3/2] overflow-hidden rounded-xl bg-accent-light/10">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={720}
          height={480}
          sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 1024px) 45vw, 400px"
          priority={priority}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 pt-3">
        <H className="flex items-start gap-2 text-h3">
          {Icon ? <Icon className="mt-[0.2em] size-5 shrink-0 text-accent" aria-hidden /> : null}
          <Link href={`/services/${service.slug}`} className={cn("rounded-sm", stretched)}>
            {service.title}
          </Link>
        </H>
        <p className="text-body">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-accent">
          Learn more <span className="sr-only">about {service.title}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function IndustryCard({ industry, headingLevel = "h3" }: { industry: Industry; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn(cardBase, "gap-3 p-6")}>
      <H className="text-h3">
        <Link href={`/industries/${industry.slug}`} className={cn("rounded-sm", stretched)}>
          {industry.title}
        </Link>
      </H>
      <p className="text-body">{industry.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-accent">
        Explore {industry.title}
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </article>
  );
}

export function CaseStudyCard({ study, headingLevel = "h3" }: { study: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn(cardBase, "gap-5 p-6")}>
      <div className="flex flex-col gap-1">
        <span className="font-display text-4xl font-semibold leading-none tracking-[-0.03em] text-accent">{study.headline.value}</span>
        <span className="text-sm font-medium text-muted-foreground">{study.headline.label}</span>
      </div>
      <div className="flex flex-col gap-2">
        <H className="text-h3">
          <Link href={`/work/${study.slug}`} className={cn("rounded-sm", stretched)}>
            {study.title}
          </Link>
        </H>
        <p className="text-body">{study.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Read case study <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </article>
  );
}

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

/** Abstract cover generated per post, so no photography is required. */
function ArticleCover({ index }: { index: number }) {
  const hue = [213, 196, 232][index % 3];
  return (
    <div
      aria-hidden
      className="relative h-[168px] overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 100% 94%), hsl(${hue + 8} 90% 80%))` }}
    >
      <div className="absolute -right-8 -top-10 size-40 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute inset-x-5 bottom-0 top-8 flex flex-col gap-2 rounded-t-xl bg-white/85 p-4 shadow-raised transition-transform duration-500 group-hover:-translate-y-1.5">
        <i className="h-2.5 w-2/3 rounded-full" style={{ background: `hsl(${hue} 100% 65% / 0.55)` }} />
        <i className="h-2 w-full rounded-full bg-neutral-200" />
        <i className="h-2 w-5/6 rounded-full bg-neutral-200" />
        <i className="h-2 w-1/2 rounded-full bg-neutral-200/70" />
      </div>
    </div>
  );
}

export function ArticleCard({ article, index = 0, headingLevel = "h3" }: { article: Article; index?: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn(cardBase, "p-2")}>
      <ArticleCover index={index} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <span className="self-start rounded-pill bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-dark">{article.tag}</span>
        <H className="text-h3">
          <Link href={articleHref(article)} className={cn("rounded-sm", stretched)}>
            {article.title}
          </Link>
        </H>
        <p className="text-body">{article.excerpt}</p>
        <p className="mt-auto flex items-center gap-2 pt-2 text-sm text-muted-foreground">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          {article.readTime}
        </p>
      </div>
    </article>
  );
}
