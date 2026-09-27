import type { Metadata } from "next";
import { Users } from "lucide-react";
import { team } from "@/lib/content";
import { site } from "@/lib/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { Avatar } from "@/components/ui/avatar";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd } from "@/components/page/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Our Team: AI Engineers, Developers & Designers",
  description:
    "Meet the Aymana Tech team: AI engineers, integration specialists, product designers and automation architects who build and run your systems.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Team", path: "/team" }]}
        badge="Team"
        icon={Users}
        title="Meet the Aymana Tech Team"
        lead={team.subtitle + " The people on your first call are the people who build your system."}
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <h2 className="sr-only">Team members</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m, i) => (
            <li key={m.name} className="flex flex-col gap-4 rounded-card bg-card p-6 shadow-soft ring-1 ring-border/40">
              <div className="flex items-center gap-4">
                <Avatar name={m.name} index={i} className="size-14 text-lg" />
                <div className="flex flex-col">
                  <h3 className="text-h3">{m.name}</h3>
                  <p className="text-sm font-medium text-accent-dark">{m.role}</p>
                </div>
              </div>
              <p className="text-body">{m.bio}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Want to join us?" body="We hire senior engineers and designers who care about real client outcomes." primary={{ label: "See open roles", href: "/careers" }} secondary={{ label: "Contact us", href: "/contact" }} />
      <JsonLd
        data={team.members.map((m) => ({
          "@context": "https://schema.org",
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          worksFor: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
        }))}
      />
    </>
  );
}
