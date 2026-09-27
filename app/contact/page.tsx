import type { Metadata } from "next";
import { CalendarDays, Mail, MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/page/contact-form";
import { OpenChatButton } from "@/components/chat/open-chat-button";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Book a Discovery Call",
  description:
    "Contact Aymana Tech to discuss AI automation, AI agents, SaaS or app development. Book a free 30-minute discovery call or send us your project details.",
  path: "/contact",
});

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
  { icon: CalendarDays, label: "Book a call", value: "30-minute discovery call", href: site.bookingUrl },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        badge="Contact"
        icon={MessageSquare}
        title="Contact Aymana Tech"
        lead="Tell us where your business loses time or leaves revenue on the table. We'll show you what to automate, build or fix first, and what it will return. No pitch deck, no obligation."
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-[1.75rem]">Send us your project details</h2>
            <ContactForm />
          </div>
          <aside aria-labelledby="other-ways" className="flex flex-col gap-4">
            <h2 id="other-ways" className="text-2xl md:text-[1.75rem]">Other ways to reach us</h2>
            <ul className="flex flex-col gap-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-card bg-card p-5 shadow-soft ring-1 ring-border/40 transition-shadow hover:shadow-raised"
                  >
                    <span className="chip-surface grid size-11 shrink-0 place-items-center rounded-full shadow-chip">
                      <Icon className="size-5 text-accent" aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
                      <span className="break-words font-medium text-foreground">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <OpenChatButton className="flex w-full items-center gap-4 rounded-card bg-card p-5 shadow-soft ring-1 ring-border/40 transition-shadow hover:shadow-raised" />
              </li>
            </ul>
            <p className="text-body">We reply within one working day, Monday to Friday.</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
