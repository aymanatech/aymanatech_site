import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { about, companyValues, stats } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page/cta-band";
import { Team } from "@/components/sections/team";
import { Comparison } from "@/components/sections/comparison";

export const metadata: Metadata = pageMetadata({
  title: "About Us: A Senior AI Automation & Software Team",
  description:
    "Aymana Tech is a senior, remote-first team of engineers and designers building AI automation, AI agents and custom software for growing companies since 2021.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        badge="About us"
        icon={Sparkles}
        title="About Aymana Tech"
        lead={about.statement}
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="prose-content">
            <h2>Why we exist</h2>
            <p>
              Since {site.founded}, we have watched capable teams lose whole days to copy-paste, status chasing and tools that do not talk to each
              other. Most of that work follows clear rules, which means it can run on its own.
            </p>
            <p>
              We started {site.name} to build those systems properly: designed around how each team really works, measured against agreed numbers,
              and handed over with documentation so our clients own every line.
            </p>
            <p>
              Today we build <Link href="/services/ai-automations">AI workflow automations</Link>, <Link href="/services/ai-agent-development">AI agents</Link>,{" "}
              <Link href="/services/saas-development">SaaS products</Link> and <Link href="/services/web-development">web</Link> and{" "}
              <Link href="/services/mobile-app-development">mobile apps</Link> for companies across <Link href="/industries">six industries</Link>.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-start">
            {stats.items.slice(0, 4).map((s) => (
              <div key={s.label} className="flex flex-col gap-2 rounded-card bg-card p-5 shadow-soft ring-1 ring-border/40">
                <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
                  {s.value}
                  <span className="text-accent">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader title="How we work" subtitle="Four commitments that shape every engagement." />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((v) => (
            <li key={v.title} className="flex flex-col gap-2 rounded-card bg-card-fade p-6 shadow-soft ring-1 ring-border/40">
              <h3 className="text-h3">{v.title}</h3>
              <p className="text-body">{v.body}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/process">Our process</Link>
          </Button>
          <Button asChild>
            <Link href="/careers">Careers</Link>
          </Button>
        </div>
      </Section>

      <Comparison />
      <Team more={{ label: "Meet the full team", href: "/team" }} />
      <CtaBand />
    </>
  );
}
