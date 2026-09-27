import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { caseStudies } from "@/lib/work";
import { articles, articleHref } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/industries", 0.8),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.8)),
    entry("/work", 0.8),
    ...caseStudies.map((c) => entry(`/work/${c.slug}`, 0.7)),
    entry("/projects", 0.6),
    entry("/reviews", 0.6),
    entry("/blog", 0.7, "weekly"),
    entry("/guides", 0.7, "weekly"),
    ...articles.map((a) => entry(articleHref(a), 0.6, "yearly", new Date(a.date))),
    entry("/ai-workflow-audit", 0.8),
    entry("/about", 0.6),
    entry("/team", 0.5),
    entry("/careers", 0.5),
    entry("/process", 0.6),
    entry("/faq", 0.6),
    entry("/contact", 0.7),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
