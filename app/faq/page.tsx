import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { faq } from "@/lib/content";
import { services } from "@/lib/services";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { FAQ } from "@/components/sections/faq";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

const serviceFaqs = services.flatMap((s) => s.faqs).slice(0, 8);

export const metadata: Metadata = pageMetadata({
  title: "FAQ: AI Automation & Software Development Questions",
  description:
    "Answers about timelines, pricing, data security, code ownership and working with Aymana Tech on AI automation, AI agents, SaaS and app development.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "FAQ", path: "/faq" }]} badge="FAQ" icon={HelpCircle} title="Frequently Asked Questions" lead={faq.subtitle} />
      <FAQ title="Working with us" subtitle="Timelines, pricing, security and ownership." badge="General" />
      <FAQ items={serviceFaqs} title="About our services" subtitle="Common questions about specific services." badge="Services" id="service-faq" showCta={false} />
      <CtaBand title="Still have a question?" body="Send it over. We reply within one working day." primary={{ label: "Contact us", href: "/contact" }} secondary={null} />
      <JsonLd data={faqSchema([...faq.items, ...serviceFaqs])} />
    </>
  );
}
