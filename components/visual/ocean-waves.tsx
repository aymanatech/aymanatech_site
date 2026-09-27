"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { subscribeTheme, getTheme } from "@/lib/theme";

type Layer = { amp: number; len: number; speed: number; base: number; phase: number; colors: [string, string] };

// Wave layers from back to front. `base` is the resting height as a fraction of the canvas.
const LAYERS: Omit<Layer, "colors">[] = [
  { amp: 26, len: 900, speed: 0.22, base: 0.3, phase: 0 },
  { amp: 34, len: 700, speed: -0.3, base: 0.45, phase: 1.7 },
  { amp: 22, len: 520, speed: 0.42, base: 0.6, phase: 3.1 },
  { amp: 16, len: 380, speed: -0.55, base: 0.74, phase: 4.6 },
];

const PALETTE = {
  light: [
    ["rgba(87,171,255,0.20)", "rgba(87,171,255,0.02)"],
    ["rgba(31,111,235,0.16)", "rgba(31,111,235,0.02)"],
    ["rgba(87,171,255,0.22)", "rgba(245,245,245,0.0)"],
    ["rgba(27,68,168,0.14)", "rgba(245,245,245,0.0)"],
  ],
  dark: [
    ["rgba(87,171,255,0.22)", "rgba(87,171,255,0.0)"],
    ["rgba(31,111,235,0.28)", "rgba(31,111,235,0.0)"],
    ["rgba(120,190,255,0.18)", "rgba(13,16,23,0.0)"],
    ["rgba(56,120,255,0.24)", "rgba(13,16,23,0.0)"],
  ],
} as const;

/**
 * Continuous "ocean" of layered sine waves on a 2D canvas.
 * Cheap by design: ~4 paths per frame, DPR capped at 1.5, paused when off-screen or the tab is hidden,
 * and a single still frame for reduced-motion visitors. The cursor gently lifts nearby swell.
 */
export function OceanWaves({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let theme = getTheme();
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let time = 0;
    const pointer = { x: -9999, strength: 0, target: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const step = width < 640 ? 10 : 7;
      const scale = Math.min(1, width / 1200) * 0.6 + 0.4; // smaller swell on phones
      pointer.strength += (pointer.target - pointer.strength) * 0.06;

      LAYERS.forEach((layer, i) => {
        const [top, bottom] = PALETTE[theme][i];
        const k = (Math.PI * 2) / layer.len;
        const t = time * layer.speed;
        const baseY = height * layer.base;

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width + step; x += step) {
          const dx = x - pointer.x;
          const lift = pointer.strength * Math.exp(-(dx * dx) / 40000) * 18 * (1 - i * 0.15);
          const y =
            baseY +
            Math.sin(x * k + t + layer.phase) * layer.amp * scale +
            Math.sin(x * k * 2.3 - t * 1.4 + layer.phase) * layer.amp * 0.35 * scale -
            lift;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - layer.amp * 2, 0, height);
        grad.addColorStop(0, top);
        grad.addColorStop(1, bottom);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab switches
      last = now;
      time += dt;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const section = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.target = 1;
    };
    const onLeave = () => (pointer.target = 0);
    section?.addEventListener("pointermove", onMove);
    section?.addEventListener("pointerleave", onLeave);

    const unsubscribe = subscribeTheme(() => {
      theme = getTheme();
      if (reduce) draw();
    });

    if (reduce) draw();
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      unsubscribe();
      document.removeEventListener("visibilitychange", onVisibility);
      section?.removeEventListener("pointermove", onMove);
      section?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none block h-full w-full", className)} />;
}
