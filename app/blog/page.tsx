import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { blogPosts } from "@/lib/articles";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { ArticleGrid } from "@/components/page/article-view";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Blog: AI Automation, Agents & Software Development",
  description:
    "Practical articles on AI workflow automation, AI agents in production, and build-versus-buy decisions, from the Aymana Tech engineering team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        badge="Blog"
        icon={Newspaper}
        title="AI Automation and Software Development Blog"
        lead="Notes from the workshop: what we learn while putting automation, agents and software into production."
      />
      <ArticleGrid items={blogPosts} />
      <CtaBand />
      <JsonLd data={itemListSchema("Blog posts", blogPosts.map((a) => ({ name: a.title, path: `/blog/${a.slug}` })))} />
    </>
  );
}
