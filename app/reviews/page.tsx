import type { Metadata } from "next";
import { MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { Avatar } from "@/components/ui/avatar";
import { CtaBand } from "@/components/page/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Client Reviews & Testimonials",
  description:
    "What founders, CTOs and operations leaders say about working with Aymana Tech on AI automation, AI agents and custom software projects.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Client Reviews", path: "/reviews" }]}
        badge="Client reviews"
        icon={MessageSquareQuote}
        title="Client Reviews and Testimonials"
        lead="Feedback from the teams we build with, in their own words."
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="sr-only">Testimonials</h2>
        <ul className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {testimonials.items.map((t, i) => (
            <li key={t.name}>
              <figure className="flex flex-col gap-5 rounded-card bg-card p-6 shadow-soft ring-1 ring-border/40">
                <blockquote className="flex flex-col gap-2">
                  <p className="font-display text-xl font-semibold leading-[1.3] text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-body">{t.body}</p>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar name={t.name} index={i} className="size-11" />
                  <span className="flex flex-col">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className="text-sm text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Become our next success story" />
    </>
  );
}
