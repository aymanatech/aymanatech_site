import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { navGroups } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] w-full flex-col items-center justify-center gap-8 px-5 pb-16 pt-[calc(var(--header-h)+48px)] text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="flex flex-col items-center">
          <span className="text-gradient-accent pb-2 font-display text-display">404</span>
          <span className="text-gradient-ink pb-1 text-h2">This page wandered off</span>
        </h1>
        <p className="max-w-[52ch] text-lead text-muted-foreground">
          The link may be old or mistyped. Try one of these instead, or head back to the home page.
        </p>
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {navGroups.map((g) => (
          <li key={g.label}>
            <Button asChild size="sm">
              <Link href={g.href}>{g.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <Button asChild variant="accent" size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
