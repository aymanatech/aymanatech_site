"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only. `__motionReady` tells the <head> failsafe that JS animation is live,
// so it will not un-hide the reveal targets.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  (window as Window & { __motionReady?: boolean }).__motionReady = true;
}

export { gsap, ScrollTrigger };

/** useLayoutEffect on the client (runs before paint), useEffect on the server (no warning). */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const EASE = "power3.out";
