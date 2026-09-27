"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Check, Scale, X } from "lucide-react";
import { comparison, stats } from "@/lib/content";
import { PanelSection, SectionHeader } from "@/components/ui/section";
import { Logo } from "@/components/ui/logo";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";

/** Counts up from 0 once `start` flips to true. */
function CountUp({ to, start }: { to: number; start: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !start) return;
    if (reduce) {
      el.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.44, 0, 0.56, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [start, reduce, to]);

  return <span ref={ref}>0</span>;
}

/** Stat cards in a marquee. Every copy counts up together when the row first scrolls into view. */
function StatsRow() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full">
      <Marquee gap={16} duration={36}>
        {stats.items.map((s) => (
          <div key={s.label} className="flex w-[220px] flex-col gap-1 rounded-card bg-card p-5 shadow-soft">
            <span className="font-display text-[2.5rem] font-semibold tabular-nums leading-none tracking-[-0.03em] text-foreground">
              <CountUp to={s.value} start={inView} />
              <span className="text-accent">{s.suffix}</span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export function Comparison() {
  return (
    <PanelSection id="why-us">
      <SectionHeader badge={comparison.badge} icon={Scale} title={comparison.title} subtitle={comparison.subtitle} />

      <Reveal className="mx-auto grid w-full max-w-[500px] grid-cols-1 gap-4 lg:max-w-[964px] lg:grid-cols-2">
        <div className="flex flex-col gap-5 rounded-card bg-card p-6 shadow-raised ring-1 ring-accent/15">
          <Logo />
          <ul className="flex flex-col gap-3.5">
            {comparison.ours.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base text-foreground">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-3" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5 rounded-card bg-card-fade p-6 shadow-soft">
          <span className="font-display text-[1.1875rem] font-bold text-muted-foreground">{comparison.theirs.label}</span>
          <ul className="flex flex-col gap-3.5">
            {comparison.theirs.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base text-muted-foreground">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-border/60 text-subtle">
                  <X className="size-3" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="flex flex-col items-center gap-8" delay={0.1}>
        <h3 className="text-gradient-ink text-center text-2xl md:text-[2rem]">{stats.title}</h3>
        <StatsRow />
      </Reveal>
    </PanelSection>
  );
}
