import { cn } from "@/lib/utils";

const HUES = [213, 198, 228, 186, 240, 205];

/** Initials on a generated gradient. Swap for next/image once you have real photos. */
export function Avatar({ name, index = 0, className }: { name: string; index?: number; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const hue = HUES[index % HUES.length];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold tracking-[-0.02em] text-white shadow-chip",
        className,
      )}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 100% 72%), hsl(${hue + 12} 75% 48%))` }}
    >
      {initials}
    </span>
  );
}
