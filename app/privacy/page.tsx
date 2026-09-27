import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy & Data Protection", description: "How Aymana Tech collects, uses and protects personal information submitted through this website.", path: "/privacy" });

// Template text. Have it reviewed by a lawyer for your jurisdiction before launch.
export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", path: "/privacy" }]} title="Privacy Policy" lead="Last updated September 2026." />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <article className="prose-content">
          <h2>What we collect</h2>
          <p>When you contact us we receive the details you choose to send, such as your name, email, company and project description. We also collect anonymous usage data (pages viewed, device type) to improve the site.</p>
          <h2>How we use it</h2>
          <p>We use your details only to reply to your enquiry and, if we work together, to deliver the project. We do not sell personal information.</p>
          <h2>Retention and your rights</h2>
          <p>Enquiries are kept for up to 24 months. You can ask us to access, correct or delete your data at any time.</p>
          <h2>Contact</h2>
          <p>Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </article>
      </Section>
    </>
  );
}
