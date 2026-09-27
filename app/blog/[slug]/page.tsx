import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, blogPosts } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { ArticleView } from "@/components/page/article-view";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => blogPosts.map((a) => ({ slug: a.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const a = getArticle("blog", params.slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.metaDescription, path: `/blog/${a.slug}`, type: "article", publishedTime: a.date });
}

export default function Page({ params }: Props) {
  const article = getArticle("blog", params.slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
