import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Aymana Tech brand mark (public/brand/aymana-tech-mark*.png, transparent background). */
export function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("logo-mark relative inline-grid size-9 shrink-0 place-items-center", className)}>
      <span aria-hidden className="logo-glow absolute inset-0 rounded-full bg-accent/35 blur-md" />
      <Image
        src="/brand/aymana-tech-mark-128.png"
        alt=""
        width={36}
        height={36}
        priority={priority}
        sizes="36px"
        className="logo-mark-img relative size-9 object-contain"
      />
    </span>
  );
}

/**
 * Logo lockup: mark + "Aymana Tech" wordmark.
 * `interactive` (header): on mouse devices only the mark shows until hover/focus, then the mark tilts
 * and the wordmark slides out letter by letter. On touch devices the full lockup is always visible.
 */
export function Logo({
  interactive = false,
  collapsed = false,
  priority = false,
  className,
}: {
  interactive?: boolean;
  /** Hide the wordmark (animated), e.g. while the header is a compact pill. */
  collapsed?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const chars = Array.from(site.name);
  return (
    <span className={cn("logo", className)} data-interactive={interactive} data-collapsed={collapsed}>
      <LogoMark priority={priority} />
      <span className="logo-reveal">
        <span className="py-1 font-display text-[1.1875rem] font-bold leading-none tracking-[-0.03em] text-foreground">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden>
            {chars.map((ch, i) => (
              <span key={i} className={ch === " " ? "logo-char w-[0.3em]" : "logo-char"} style={{ "--i": i } as React.CSSProperties}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
}
