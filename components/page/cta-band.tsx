import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gutter } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { isExternal, site } from "@/lib/site";

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

/** Inline call-to-action used near the end of inner pages. */
export function CtaBand({
  title = "Let's talk about what to build first",
  body = "Book a 30-minute discovery call. We'll show you what to automate, build or fix first, and what it will return.",
  primary = { label: "Book a discovery call", href: site.bookingUrl },
  secondary = { label: "Get a free AI workflow audit", href: "/ai-workflow-audit" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className={cn("flex w-full justify-center py-12 md:py-16", gutter)}>
      <div className="flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 rounded-panel bg-card p-6 shadow-soft ring-1 ring-border/60 sm:p-10 md:flex-row md:items-center">
        <div className="flex max-w-[56ch] flex-col gap-2">
          <h2 className="text-2xl md:text-[1.75rem] md:leading-tight">{title}</h2>
          <p className="text-body">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <SmartLink href={primary.href}>{primary.label}</SmartLink>
          </Button>
          {secondary ? (
            <Button asChild size="lg">
              <SmartLink href={secondary.href}>{secondary.label}</SmartLink>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
