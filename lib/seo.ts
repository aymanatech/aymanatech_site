// Metadata and JSON-LD builders shared by every route.

import type { Metadata } from "next";
import { SITE_URL, site } from "@/lib/site";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

type PageMeta = {
  /** Page title without the brand suffix (the root layout template adds "| Aymana Tech"). */
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
  /** Use the title as-is, without the brand suffix. */
  absoluteTitle?: boolean;
};

/** Canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, type = "website", publishedTime, image, absoluteTitle }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const images = [{ url: image ?? site.ogImage, width: 1200, height: 630, alt: ogTitle }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: ogTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: images.map((i) => i.url) },
  };
}

// ---------- JSON-LD ----------

const orgId = `${SITE_URL}/#organization`;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": orgId,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/brand/aymana-tech-logo.png"),
  image: absoluteUrl(site.ogImage),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  foundingDate: site.founded,
  areaServed: "Worldwide",
  priceRange: "$$",
  knowsAbout: site.keywords,
  sameAs: Object.values(site.social),
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, telephone: site.phone, availableLanguage: ["English"] }],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  publisher: { "@id": orgId },
  inLanguage: "en",
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = (s: { title: string; description: string; path: string; serviceType: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  serviceType: s.serviceType,
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { "@id": orgId },
  areaServed: "Worldwide",
});

export const articleSchema = (a: { title: string; description: string; path: string; date: string; author: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.description,
  url: absoluteUrl(a.path),
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.date,
  dateModified: a.date,
  image: absoluteUrl(site.ogImage),
  author: { "@type": "Person", name: a.author },
  publisher: { "@id": orgId },
});

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: absoluteUrl(item.path) })),
});
