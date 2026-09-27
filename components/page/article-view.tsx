import Link from "next/link";
import { Newspaper, BookOpen } from "lucide-react";
import { articleHref, articles, type Article } from "@/lib/articles";
import { articleSchema } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ArticleCard, formatDate } from "@/components/page/cards";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";
import { Button } from "@/components/ui/button";

/** Shared layout for blog posts and guides. */
export function ArticleView({ article }: { article: Article }) {
  const path = articleHref(article);
  const isBlog = article.kind === "blog";
  const listCrumb = isBlog ? { name: "Blog", path: "/blog" } : { name: "Guides", path: "/guides" };
  const more = articles.filter((a) => a.slug !== article.slug && a.kind === article.kind).slice(0, 2);

  return (
    <>
      <PageHero crumbs={[listCrumb, { name: article.title, path }]} badge={article.tag} icon={isBlog ? Newspaper : BookOpen} title={article.title} lead={article.excerpt}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>
            By <span className="font-semibold text-foreground">{article.author}</span>
          </span>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          <span>{article.readTime}</span>
        </p>
      </PageHero>

      <Section className="items-center pt-0 md:pt-0 lg:pt-0">
        <article className="prose-content w-full">
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <p>
            Want help applying this to your team? <Link href="/ai-workflow-audit">Book a free AI workflow audit</Link> or{" "}
            <Link href="/contact">talk to us about your project</Link>.
          </p>
        </article>
      </Section>

      {more.length ? (
        <Section className="pt-0 md:pt-0 lg:pt-0">
          <SectionHeader title={isBlog ? "More from the blog" : "More guides"} />
          <ul className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2">
            {more.map((a, i) => (
              <li key={a.slug}>
                <ArticleCard article={a} index={i + 1} />
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Button asChild>
              <Link href={listCrumb.path}>All {listCrumb.name.toLowerCase()}</Link>
            </Button>
          </div>
        </Section>
      ) : null}

      <CtaBand />
      <JsonLd data={articleSchema({ title: article.title, description: article.metaDescription, path, date: article.date, author: article.author })} />
    </>
  );
}

/** Index page grid for a list of articles. */
export function ArticleGrid({ items }: { items: Article[] }) {
  return (
    <Section className="pt-0 md:pt-0 lg:pt-0">
      <h2 className="sr-only">Articles</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <li key={a.slug}>
            <ArticleCard article={a} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
