"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

/**
 * Page-level GSAP effects, re-applied on every route change:
 *  - [data-intro]      children lift in on page load (inner-page heroes)
 *  - [data-parallax]   drifts at `data-parallax` × scroll speed (decorative layers)
 *  - scroll progress bar at the top of the viewport
 */
export function ScrollEffects() {
  const pathname = usePathname();
  const barRef = React.useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const intros = gsap.utils.toArray<HTMLElement>("[data-intro] > *");
      if (reduce) {
        gsap.set(intros, { autoAlpha: 1 });
      } else if (intros.length) {
        gsap.fromTo(intros, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, delay: 0.05, clearProps: "transform" });
      }

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.2;
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });
      }

      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: reduce ? true : 0.3 } },
        );
      }
    });

    // Layout can shift after fonts and images settle; recompute trigger positions once they have.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-accent-dark via-accent to-accent-light"
    />
  );
}
