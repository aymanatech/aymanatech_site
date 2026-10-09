"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronsDown } from "lucide-react";
import { hero } from "@/lib/content";
import { useTypewriter } from "@/lib/hooks/use-typewriter";
import { Button } from "@/components/ui/button";
import { gutter } from "@/components/ui/section";
import { OceanWaves } from "@/components/visual/ocean-waves";
import { cn } from "@/lib/utils";
import { bookingLinkProps, isExternal } from "@/lib/site";

const longestPhrase = hero.phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

/** Second headline line: types, holds, deletes and loops through `hero.phrases`. */
function TypedLine({ active }: { active: boolean }) {
  const { text, isTyping } = useTypewriter(hero.phrases, { active });
  return (
    // Screen readers and crawlers get one stable phrase; the animated copy is visual only.
    <span className="block pb-2">
      <span className="sr-only">{hero.titleBottom}</span>
      {/* Grid overlay: an invisible copy of the longest phrase reserves the height, so nothing below jumps. */}
      <span aria-hidden className="grid justify-items-center">
        <span className="invisible col-start-1 row-start-1">{longestPhrase}</span>
        <span className="col-start-1 row-start-1 whitespace-pre-wrap">
          <span className="text-gradient-accent">{text}</span>
          <span
            className={cn(
              "ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] rounded-full bg-accent align-baseline",
              isTyping ? "opacity-100" : "animate-caret",
            )}
          />
        </span>
      </span>
    </span>
  );
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(true);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="hero-screen relative flex w-full flex-col items-center overflow-hidden"
    >
      {/* Background: soft colour fields + animated ocean waves along the lower half */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-parallax="0.25" className="absolute inset-0 opacity-60">
          <div className="absolute -left-[10%] top-[6%] size-[min(520px,90vw)] animate-drift rounded-full bg-accent-light/25 blur-[120px]" />
          <div className="absolute -right-[8%] top-[24%] size-[min(460px,80vw)] animate-drift rounded-full bg-accent/15 blur-[130px] [animation-delay:-6s]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <OceanWaves />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div
        data-intro
        className={cn(
          "hero-stack relative flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center text-center",
          gutter,
        )}
      >
        <h1 id="hero-title" className="hero-title flex w-full max-w-[18ch] flex-col items-center font-display font-semibold md:max-w-[22ch]">
          <span className="text-gradient-ink pb-1">{hero.titleTop}</span>
          <TypedLine active={animate && inView} />
        </h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{hero.titleBottom}</p>
        <p className="hero-lead max-w-[58ch] text-muted-foreground">{hero.subtitle}</p>
        <div className="hero-actions flex flex-col items-center">
          <OrbButton href={bookingLinkProps.href}>{hero.cta}</OrbButton>
          <Button asChild className="hero-secondary">
            <Link href={hero.secondary.href}>{hero.secondary.label}</Link>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-[clamp(0.5rem,2.5svh,1.5rem)] grid size-11 place-items-center rounded-full text-accent transition-colors hover:text-accent-dark motion-safe:animate-bounce-soft"
      >
        <ChevronsDown className="size-5" aria-hidden />
      </a>
    </section>
  );
}

/** Circular call-to-action: two counter-rotating conic gradients over a softly pulsing glow. */
export function OrbButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="orb-size group relative grid place-items-center rounded-full text-base font-semibold text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.0,0.64,1)] hover:scale-[1.02]"
    >
      <span aria-hidden className="absolute -inset-5 animate-glow-pulse rounded-full bg-[#1f6feb]/45 blur-2xl" />
      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full shadow-raised">
        <span className="absolute -inset-[26px] transform-gpu animate-spin-slow rounded-full bg-orb" />
        <span className="absolute -inset-[18px] transform-gpu animate-spin-slower rounded-full bg-orb-inner opacity-70 blur-md group-hover:opacity-90" />
        {/* scrim behind the label keeps white text above 4.5:1 whatever the gradient angle */}
        <span className="absolute inset-[22%] rounded-full bg-[#133a92]/70 blur-lg" />
      </span>
      <span className="relative [text-shadow:0_1px_8px_rgb(10_30_80/0.55)]">{children}</span>
    </Link>
  );
}
