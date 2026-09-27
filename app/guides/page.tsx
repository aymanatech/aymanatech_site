import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { guides } from "@/lib/articles";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { ArticleGrid } from "@/components/page/article-view";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Guides: Buying AI Automation, SaaS MVPs & Mobile Apps",
  description:
    "In-depth guides for founders and operators: how to evaluate AI automation vendors, scope a SaaS MVP, and choose between native and React Native.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Guides", path: "/guides" }]}
        badge="Guides"
        icon={BookOpen}
        title="Guides for Planning AI and Software Projects"
        lead="Longer, practical guides for the decisions that come before a build: choosing a partner, scoping a product and picking a stack."
      />
      <ArticleGrid items={guides} />
      <CtaBand />
      <JsonLd data={itemListSchema("Guides", guides.map((a) => ({ name: a.title, path: `/guides/${a.slug}` })))} />
    </>
  );
}
