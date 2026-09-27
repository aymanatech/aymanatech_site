"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";

/** Abstract cover art generated per project, so no photography is required. */
function Cover({ index }: { index: number }) {
  const hue = [213, 200, 190, 225, 240][index % 5];
  return (
    <div
      className="relative h-full min-h-[260px] w-full overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 100% 92%), hsl(${hue} 90% 78%))` }}
    >
      <div className="absolute -right-10 -top-10 size-52 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute inset-x-6 bottom-6 top-10 rounded-t-xl bg-white/85 p-4 shadow-raised backdrop-blur">
        <div className="mb-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <i key={i} className="size-2 rounded-full bg-border" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[64, 40, 82].map((h, i) => (
            <div key={i} className="flex h-24 items-end rounded-lg bg-background p-2">
              <i className="w-full rounded-md" style={{ height: `${h}%`, background: `hsl(${hue} 100% 65% / 0.55)` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <i className="h-2 w-3/4 rounded-full bg-border/70" />
          <i className="h-2 w-1/2 rounded-full bg-border/50" />
        </div>
      </div>
    </div>
  );
}

export function Projects({ more, hideHeader = false }: { more?: { label: string; href: string }; hideHeader?: boolean } = {}) {
  const [active, setActive] = React.useState(0);
  const project = projects.projects[active];
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // arrow keys move between tabs, Home/End jump to the ends
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const last = projects.projects.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (active + 1) % (last + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (active + last) % (last + 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <Section id="projects">
      {hideHeader ? null : <SectionHeader badge={projects.badge} icon={FolderKanban} title={projects.title} subtitle={projects.subtitle} />}

      <Reveal className="flex flex-col gap-4 lg:flex-row">
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onTabKeyDown}
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-2 md:-mx-[30px] md:px-[30px] lg:mx-0 lg:w-[200px] lg:shrink-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:p-0"
        >
          {projects.projects.map((p, i) => (
            <button
              key={p.tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`projects-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls="projects-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-11 shrink-0 rounded-pill px-5 text-left text-base font-semibold transition-colors lg:h-[58px] lg:rounded-card lg:px-4",
                active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === i ? (
                <motion.span
                  layoutId="projects-tab"
                  className="absolute inset-0 rounded-pill bg-card shadow-soft lg:rounded-card"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              ) : null}
              <span className="relative">{p.tab}</span>
            </button>
          ))}
        </div>

        {/* `layout` eases the card's height when projects differ in length */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.35, ease: EASE_OUT } }}
          style={{ borderRadius: 16 }}
          className="min-w-0 flex-1 bg-card-fade p-2 shadow-soft"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.tab}
              id="projects-panel"
              role="tabpanel"
              aria-labelledby={`projects-tab-${active}`}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="grid grid-cols-1 gap-2 lg:grid-cols-2"
            >
              <Cover index={active} />
              <div className="flex flex-col justify-between gap-8 p-4 lg:p-6">
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-accent-dark">{project.client}</span>
                  <h3 className="text-2xl md:text-[1.75rem] md:leading-[1.2]">
                    {project.title}
                  </h3>
                  <p className="text-body">{project.body}</p>
                </div>
                <dl className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1 rounded-xl bg-card p-4 shadow-chip">
                      <dt className="order-2 text-sm font-medium text-muted-foreground">{m.label}</dt>
                      <dd className="font-display text-[1.75rem] font-semibold tabular-nums leading-none tracking-[-0.03em] text-foreground">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Reveal>
      {more ? (
        <div className="flex justify-center">
          <Button asChild>
            <Link href={more.href}>{more.label}</Link>
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
