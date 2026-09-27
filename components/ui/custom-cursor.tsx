"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="radio"], summary, label, select, [data-cursor]';
const TEXT_INPUT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';
/** Small controls (buttons, pills, icon buttons) are wrapped by the ring; larger targets just grow it. */
const MORPH_MAX = { w: 280, h: 72 };
const RING = 36;

/**
 * Two-part cursor: a precise dot plus a trailing ring (GSAP quickTo, so both run on one rAF).
 * Over small controls the ring morphs to the control's own shape with a slight magnetic pull;
 * over larger links and cards it grows and fills. Only mounts for a fine pointer that can hover
 * and when reduced motion is off, so touch devices keep their native behaviour.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  React.useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3" });

    let target: Element | null = null;
    let morph: DOMRect | null = null;
    let visible = false;
    let pointer = { x: -100, y: -100 };

    const reset = () => {
      target = null;
      morph = null;
      ring.dataset.state = "idle";
      gsap.to(ring, { width: RING, height: RING, borderRadius: "999px", opacity: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25, overwrite: "auto" });
    };

    const place = () => {
      if (morph) {
        // Magnetic: the ring stays on the control but leans 12% toward the pointer.
        const cx = morph.left + morph.width / 2;
        const cy = morph.top + morph.height / 2;
        ringX(cx + (pointer.x - cx) * 0.12);
        ringY(cy + (pointer.y - cy) * 0.12);
      } else {
        ringX(pointer.x);
        ringY(pointer.y);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: pointer.x, y: pointer.y });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      dotX(pointer.x);
      dotY(pointer.y);
      place();
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element;
      if (el.closest(TEXT_INPUT)) {
        // Hand over to the native text caret inside fields.
        target = el.closest(TEXT_INPUT);
        morph = null;
        gsap.to([dot, ring], { opacity: 0, duration: 0.15, overwrite: "auto" });
        return;
      }
      const hit = el.closest(INTERACTIVE);
      if (hit === target) return;
      if (!hit) return reset();
      target = hit;
      const rect = hit.getBoundingClientRect();
      if (rect.width <= MORPH_MAX.w && rect.height <= MORPH_MAX.h) {
        morph = rect;
        const radius = getComputedStyle(hit).borderRadius || "12px";
        ring.dataset.state = "morph";
        gsap.to(ring, { width: rect.width + 10, height: rect.height + 10, borderRadius: radius === "0px" ? "12px" : radius, opacity: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(dot, { scale: 0.5, opacity: 0.9, duration: 0.25, overwrite: "auto" });
      } else {
        morph = null;
        ring.dataset.state = "grow";
        gsap.to(ring, { width: 64, height: 64, borderRadius: "999px", opacity: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(dot, { scale: 0, duration: 0.25, overwrite: "auto" });
      }
      place();
    };

    const onDown = () => gsap.to(ring, { scale: 0.86, duration: 0.15, ease: "power2.out" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };
    // A wrapped control moves under a stationary pointer while scrolling; re-measure it.
    const onScroll = () => {
      if (target && morph) {
        morph = target.getBoundingClientRect();
        place();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", onLeave);

    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;
  // Ring fill colour is driven by CSS via data-state (GSAP cannot tween colours defined with CSS
  // variables); GSAP handles size, shape and position.
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        data-state="idle"
        className="pointer-events-none fixed left-0 top-0 z-[100] size-9 rounded-full border-[1.5px] border-accent/70 opacity-0 shadow-[0_0_18px_hsl(var(--accent)/0.25)] transition-[background-color,border-color] duration-300 will-change-transform data-[state=grow]:bg-accent/15 data-[state=morph]:border-accent data-[state=morph]:bg-accent/10"
      />
      <div ref={dotRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] size-2 rounded-full bg-accent opacity-0 will-change-transform" />
    </>
  );
}
