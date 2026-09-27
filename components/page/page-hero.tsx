import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { breadcrumbSchema } from "@/lib/seo";
import { Badge, gutter } from "@/components/ui/section";
import { JsonLd } from "@/components/page/json-ld";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail + matching BreadcrumbList schema. The first crumb is always Home. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="rounded transition-colors hover:text-foreground">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3.5 shrink-0" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

/** Top of every inner page: breadcrumbs, badge, the page's single <h1> and a lead paragraph. */
export function PageHero({
  crumbs,
  badge,
  icon,
  title,
  lead,
  children,
  className,
}: {
  crumbs: Crumb[];
  badge?: string;
  icon?: LucideIcon;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className="relative flex w-full flex-col items-center overflow-hidden">
      <div aria-hidden data-parallax="0.35" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] -top-[20%] size-[420px] rounded-full bg-accent-light/20 blur-[120px]" />
        <div className="absolute -right-[10%] top-[10%] size-[360px] rounded-full bg-accent/10 blur-[120px]" />
      </div>
      <div
        data-intro
        className={cn(
          "relative flex w-full max-w-[1440px] flex-col items-start gap-6 pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16 md:pt-[calc(var(--header-h)+64px)]",
          gutter,
          className,
        )}
      >
        <Breadcrumbs items={crumbs} />
        {badge ? <Badge icon={icon}>{badge}</Badge> : null}
        <h1 className="text-gradient-ink max-w-[20ch] pb-1 text-h1">{title}</h1>
        {lead ? <p className="max-w-[62ch] text-lead text-muted-foreground">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
