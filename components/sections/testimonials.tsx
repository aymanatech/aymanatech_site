import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { PanelSection, SectionHeader } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { Avatar } from "@/components/ui/avatar";

export function Testimonials({ more, hideHeader = false }: { more?: { label: string; href: string }; hideHeader?: boolean } = {}) {
  return (
    <PanelSection id="testimonials">
      {hideHeader ? null : <SectionHeader
          badge={testimonials.badge}
          icon={MessageSquareQuote}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
        />}
      <Marquee gap={16} duration={48} stretch>
        {testimonials.items.map((t, i) => (
          <figure key={t.name} className="flex w-[min(300px,78vw)] flex-col gap-5 rounded-card bg-card p-6 shadow-soft ring-1 ring-border/40 sm:w-[380px]">
            <figcaption className="flex items-center gap-3">
              <Avatar name={t.name} index={i} className="size-11" />
              <span className="flex flex-col">
                <span className="text-base font-semibold text-foreground">{t.name}</span>
                <span className="text-sm font-medium text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
            <blockquote className="flex flex-col gap-2">
              <p className="font-display text-xl font-semibold leading-[1.3] text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-body">{t.body}</p>
            </blockquote>
          </figure>
        ))}
      </Marquee>
      {more ? (
        <div className="flex justify-center">
          <Button asChild>
            <Link href={more.href}>{more.label}</Link>
          </Button>
        </div>
      ) : null}
    </PanelSection>
  );
}
