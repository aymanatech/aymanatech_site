"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

/** Shared easing for Framer Motion interaction animations (menus, accordion, tabs). */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Targets start hidden via `html.js [data-reveal]` in globals.css (set before paint, so no flash).
// GSAP then fades and lifts them in once they scroll into view.

/** Fades and lifts one block into view on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: EASE,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}

/**
 * Staggers its <StaggerItem> children in. Uses ScrollTrigger.batch, so in a long single-column grid on
 * mobile each row animates as *it* arrives rather than all at once when the grid first appears.
 */
export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(":scope > [data-stagger-item]"));
    if (!items.length) return;
    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      // transition:none stops the CSS hover transition from smoothing (and lagging) every GSAP frame.
      gsap.set(items, { autoAlpha: 0, y: 40, transition: "none" });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: EASE,
            stagger: 0.09,
            overwrite: true,
            clearProps: "transform,transition",
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Hover elevation shared by lifted cards (pure CSS, so it never fights the GSAP entrance). */
export const cardLiftClass =
  "border border-transparent transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-raised";

export function StaggerItem({
  children,
  className,
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <div data-stagger-item className={cn(lift && cardLiftClass, className)}>
      {children}
    </div>
  );
}
