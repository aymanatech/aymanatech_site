import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Badge({ icon: Icon, children }: { icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-badge-fade px-3 py-1.5 text-sm font-medium leading-none text-foreground shadow-badge">
      {Icon ? <Icon className="size-4 text-accent" aria-hidden /> : null}
      {children}
    </span>
  );
}

/** Centered section intro: badge, <h2> and a short lead paragraph. */
export function SectionHeader({
  badge,
  icon,
  title,
  subtitle,
  as: Heading = "h2",
  align = "center",
}: {
  badge?: string;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      {badge ? <Badge icon={icon}>{badge}</Badge> : null}
      <Heading className={cn("text-gradient-ink max-w-[22ch] pb-1", Heading === "h1" ? "text-h1" : "text-h2")}>{title}</Heading>
      {subtitle ? <p className="max-w-[60ch] text-lead text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}

/** Shared horizontal gutters: 20px mobile, 32px tablet, 80px desktop; 1440px max. */
export const gutter = "px-5 sm:px-8 lg:px-20";

/** Standard section: normalised vertical rhythm (64 → 96 → 112px) and 48–56px inner gap. */
export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="flex w-full flex-col items-center">
      <div className={cn("flex w-full max-w-[1440px] flex-col gap-12 py-16 md:gap-14 md:py-24 lg:py-28", gutter, className)}>
        {children}
      </div>
    </section>
  );
}

/** Inset panel variant: rounded gradient surface used for alternating sections. */
export function PanelSection({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex w-full flex-col items-center px-2.5 py-4 sm:px-4 lg:px-5">
      <div
        className={cn(
          "flex w-full max-w-[1400px] flex-col gap-12 rounded-panel bg-panel-fade px-4 py-16 shadow-soft sm:px-6 md:gap-14 md:py-24 lg:px-[60px] lg:py-28",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
