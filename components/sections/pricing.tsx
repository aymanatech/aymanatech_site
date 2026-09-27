"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Tag } from "lucide-react";
import { pricing } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type Cycle = "monthly" | "yearly";

export function Pricing() {
  const [cycle, setCycle] = React.useState<Cycle>("monthly");
  const price = (monthly: number) =>
    cycle === "monthly" ? monthly : Math.round(monthly * (1 - pricing.yearlyDiscount));

  return (
    <Section id="pricing">
      <SectionHeader badge={pricing.badge} icon={Tag} title={pricing.title} subtitle={pricing.subtitle} />

      <Reveal className="flex justify-center">
        <div role="radiogroup" aria-label="Billing cycle" className="flex rounded-pill bg-card p-1 shadow-soft">
          {(["monthly", "yearly"] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={cycle === c}
              onClick={() => setCycle(c)}
              className={cn(
                "relative h-11 rounded-pill px-5 text-sm font-semibold capitalize transition-colors",
                cycle === c ? "text-accent-foreground" : "text-subtle hover:text-foreground",
              )}
            >
              {cycle === c ? (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-pill bg-accent shadow-pill"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              ) : null}
              <span className="relative">
                {c}
                {c === "yearly" ? (
                  <span className={cn("ml-1 font-medium", cycle === c ? "text-accent-foreground/85" : "text-accent")}>
                    (Save {Math.round(pricing.yearlyDiscount * 100)}%)
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <Stagger className="mx-auto grid w-full max-w-[500px] grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-3">
        {pricing.plans.map((plan) => (
          <StaggerItem
            key={plan.name}
            lift
            className={cn(
              "relative flex flex-col gap-6 rounded-card p-6",
              plan.popular ? "bg-card shadow-raised ring-1 ring-accent/20" : "bg-card-fade shadow-soft",
            )}
          >
            {plan.popular ? (
              <span className="absolute right-5 top-5 rounded-pill bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-dark">
                Most popular
              </span>
            ) : null}
            <div className="flex flex-col gap-3">
              <h3 className="text-h3">{plan.name}</h3>
              <p className="flex items-end gap-1">
                <span className="relative inline-flex h-[52px] overflow-hidden font-display text-[3rem] font-semibold tabular-nums leading-[52px] tracking-[-0.03em] text-foreground">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={cycle}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
                    >
                      ${price(plan.monthly).toLocaleString("en-US")}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="pb-1.5 text-base font-medium text-muted-foreground">
                  /month{cycle === "yearly" ? ", billed yearly" : ""}
                </span>
              </p>
              <p className="text-body lg:min-h-[2.8em]">
                {plan.blurb}
              </p>
            </div>

            <div aria-hidden className="h-px w-full bg-divider" />

            <ul className="flex flex-1 flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-base text-foreground">
                  <Check className="size-4 shrink-0 text-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-3">
              <Button asChild variant={plan.popular ? "accent" : "default"} size="lg" className="w-full">
                <Link href="/contact">{pricing.cta}</Link>
              </Button>
              <span className="text-sm font-medium text-muted-foreground">{pricing.note}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
