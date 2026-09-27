"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Boxes,
  Calendar,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Route,
  Search,
  Waypoints,
} from "lucide-react";
import { process } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const EASE = [0.44, 0, 0.56, 1] as const;

const rowA = [Mail, Calendar, Database, FileText];
const rowB = [MessageSquare, Search, Boxes, Waypoints];

function Chip({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="grid size-[42px] place-items-center rounded-full chip-surface shadow-chip">
      <Icon className="size-[20px] text-subtle" aria-hidden />
    </span>
  );
}

/** Step 1: scattered tools pass through a scanner line and come out organised. */
function DiscoverVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-3 overflow-hidden rounded-card">
      <Marquee gap={12} duration={22} className="[mask-image:none]">
        {rowA.map((I, i) => (
          <Chip key={i} icon={I} />
        ))}
      </Marquee>
      <Marquee gap={12} duration={22} reverse className="[mask-image:none]">
        {rowB.map((I, i) => (
          <Chip key={i} icon={I} />
        ))}
      </Marquee>
      <div aria-hidden className="pointer-events-none absolute inset-0.5 flex overflow-hidden rounded-[14px]">
        <div className="w-[38%]" />
        <div className="w-0.5 rounded-[5px] bg-accent-light/40 shadow-glow" />
        <div className="flex-1 bg-accent-light/15 backdrop-blur-[5px]" />
      </div>
    </div>
  );
}

/** Step 2: a small flow diagram that assembles itself node by node. */
function BuildVisual() {
  const nodes = ["Trigger", "Enrich", "Decide", "Act"];
  return (
    <div className="flex h-full items-center justify-center rounded-card bg-accent-light/[0.06] px-4">
      <div className="flex w-full items-center justify-between">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-1 items-center last:flex-none">
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.25, ease: EASE }}
              className="rounded-xl bg-card px-2.5 py-2 text-xs font-semibold text-subtle shadow-chip"
            >
              {n}
            </motion.span>
            {i < nodes.length - 1 ? (
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.25, ease: EASE }}
                className="mx-1 h-0.5 flex-1 origin-left rounded-full bg-gradient-to-r from-accent/70 to-accent/25"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 3: performance bars that grow in, stepping upward. */
function LaunchVisual() {
  const bars = [38, 52, 64, 80, 100];
  return (
    <div className="flex h-full items-end justify-center gap-2 rounded-card bg-accent-light/[0.06] px-6 pb-0 pt-6">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          style={{ height: `${h}%` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
          className="w-full max-w-[52px] origin-bottom rounded-t-lg bg-gradient-to-b from-accent/70 to-accent-light/20"
        />
      ))}
    </div>
  );
}

const visuals = [DiscoverVisual, BuildVisual, LaunchVisual];

export function Process({ more, hideHeader = false }: { more?: { label: string; href: string }; hideHeader?: boolean } = {}) {
  return (
    <Section id="process">
      {hideHeader ? null : <SectionHeader badge={process.badge} icon={Route} title={process.title} subtitle={process.subtitle} />}
      <Stagger className="mx-auto grid w-full max-w-[500px] grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-3">
        {process.steps.map((step, i) => {
          const Visual = visuals[i];
          return (
            <StaggerItem key={step.title} lift className="flex flex-col rounded-card bg-card-fade shadow-soft">
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-accent-dark">{i + 1}.</span>
                <span aria-hidden className="flex flex-col items-end gap-[3px]">
                  <i className="h-px w-[15px] rounded-md bg-accent" />
                  <i className="h-px w-[15px] rounded-md bg-accent/30" />
                  <i className="h-px w-[15px] rounded-md bg-accent/10" />
                </span>
              </div>
              <div className="h-[165px] px-4">
                <Visual />
              </div>
              <div className="flex flex-col gap-2 p-4 pt-5">
                <h3 className="text-h3">{step.title}</h3>
                <p className="text-body">{step.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
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
