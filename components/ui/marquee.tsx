import * as React from "react";
import { cn } from "@/lib/utils";

/** Seamless CSS marquee. Children are rendered twice; pauses on hover. */
export function Marquee({
  children,
  className,
  reverse = false,
  gap = 48,
  duration = 30,
  stretch = false,
}: {
  /** Make every item the height of the tallest one instead of centring them. */
  stretch?: boolean;
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  gap?: number;
  duration?: number;
}) {
  const style = {
    "--marquee-gap": `${gap}px`,
    "--marquee-duration": `${duration}s`,
    gap: `${gap}px`,
  } as React.CSSProperties;

  return (
    <div className={cn("group mask-fade-x flex w-full overflow-hidden", className)} style={style}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          style={{ gap: `${gap}px` }}
          className={cn(
            "flex shrink-0 group-hover:[animation-play-state:paused]",
            stretch ? "items-stretch [&>li]:flex" : "items-center",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
          )}
        >
          {React.Children.map(children, (child, i) => (
            <li key={i} className="shrink-0">
              {child}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
