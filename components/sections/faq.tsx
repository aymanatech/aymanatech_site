import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { faq } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** FAQ accordion. Defaults to the site-wide questions; service pages pass their own. */
export function FAQ({
  items = faq.items,
  title = faq.title,
  subtitle = faq.subtitle,
  badge = faq.badge,
  showCta = true,
  id = "faq",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  subtitle?: string;
  badge?: string;
  showCta?: boolean;
  id?: string;
}) {
  return (
    <Section id={id}>
      <SectionHeader badge={badge} icon={HelpCircle} title={title} subtitle={subtitle} />
      <Reveal className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-8">
        <Accordion defaultValue="item-0" className="flex w-full flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {showCta ? (
          <Button asChild>
            <Link href="/contact">{faq.cta}</Link>
          </Button>
        ) : null}
      </Reveal>
    </Section>
  );
}
