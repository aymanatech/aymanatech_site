import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Projects } from "@/components/sections/projects";
import { CtaBand } from "@/components/page/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Projects: AI, SaaS & Web Development Portfolio",
  description:
    "Browse recent Aymana Tech projects across sales, creative, healthcare, eCommerce and finance: automations and software with measured before-and-after results.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Projects", path: "/projects" }]}
        badge="Projects"
        icon={FolderKanban}
        title="Recent AI, SaaS and Web Development Projects"
        lead="A cross-section of systems we have shipped, grouped by the team they serve. Select a category to see the problem, the build and the result."
      />
      <Projects hideHeader more={{ label: "Read full case studies", href: "/work" }} />
      <CtaBand />
    </>
  );
}
