"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks/use-theme";
import { cn } from "@/lib/utils";

/** Sun/Moon switch. The two icons rotate and scale through each other on change. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const label = theme === null ? "Toggle colour theme" : isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === null ? undefined : isDark}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTheme(isDark ? "light" : "dark", { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className={cn(
        "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-card text-foreground shadow-chip ring-1 ring-border/50 transition-[box-shadow,color] duration-300 hover:text-accent hover:shadow-pill",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute size-[18px] transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-[18px] transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
        )}
      />
    </button>
  );
}
