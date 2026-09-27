import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = pageMetadata({ title: "Terms of Service", description: "The terms that govern use of the Aymana Tech website, its content, and information about our AI automation and software services.", path: "/terms" });

// Template text. Have it reviewed by a lawyer for your jurisdiction before launch.
export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms of Service", path: "/terms" }]} title="Terms of Service" lead="Last updated September 2026." />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <article className="prose-content">
          <h2>Use of this website</h2>
          <p>Content on this site is provided for general information about {site.name}&apos;s services. It is not a binding offer; project terms are agreed in a separate written contract.</p>
          <h2>Intellectual property</h2>
          <p>Site content, branding and design belong to {site.name} unless stated otherwise. Client work shown here is used with permission.</p>
          <h2>Liability</h2>
          <p>We work to keep information accurate but cannot guarantee it is complete or current. Use of the site is at your own risk.</p>
          <h2>Contact</h2>
          <p>Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </article>
      </Section>
    </>
  );
}
