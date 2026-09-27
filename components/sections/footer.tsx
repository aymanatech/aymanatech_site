import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/social-icons";
import { footer } from "@/lib/content";
import { site } from "@/lib/site";
import { footerColumns, legalLinks } from "@/lib/nav";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/motion/reveal";
import { OrbButton } from "@/components/sections/hero";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedInIcon },
  { label: "X (Twitter)", href: site.social.x, icon: XIcon },
  { label: "GitHub", href: site.social.github, icon: GitHubIcon },
];

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[1440px] flex-col gap-4 px-2.5 pb-2.5 pt-16 sm:px-4 md:px-8 md:pb-8 lg:pt-24">
        <Reveal className="flex flex-col items-center gap-8 rounded-panel bg-card px-4 py-16 text-center shadow-soft md:py-24">
          <p className="flex flex-col items-center font-display text-h1 font-semibold">
            <span className="text-gradient-ink pb-1">{footer.titleTop}</span>
            <span className="text-gradient-accent pb-2">{footer.titleBottom}</span>
          </p>
          <p className="max-w-[48ch] text-lead text-muted-foreground">{footer.blurb}</p>
          <OrbButton href={site.bookingUrl}>{footer.cta}</OrbButton>
        </Reveal>

        <div className="flex flex-col gap-10 rounded-card bg-card-fade px-5 py-10 sm:px-8 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,3fr)]">
            <div className="flex max-w-[340px] flex-col gap-5">
              <Link href="/" className="self-start rounded-3xl py-1">
                <Logo />
              </Link>
              <p className="text-body">{site.description}</p>
              <address className="flex flex-col gap-2 text-[0.9375rem] not-italic text-subtle">
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2 transition-colors hover:text-accent sm:min-h-0">
                  <Mail className="size-4 shrink-0" aria-hidden /> {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="flex min-h-11 items-center gap-2 transition-colors hover:text-accent sm:min-h-0">
                  <Phone className="size-4 shrink-0" aria-hidden /> {site.phone}
                </a>
              </address>
              <ul className="flex gap-2" aria-label="Social media">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${label}`}
                      className="grid size-11 place-items-center rounded-full bg-card text-subtle shadow-chip ring-1 ring-border/50 transition-colors hover:text-accent"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-1 gap-8 xs:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <h2 className="font-sans text-sm font-semibold text-foreground">{col.title}</h2>
                  <ul className="flex flex-col gap-1">
                    {col.links.map((l) => (
                      <li key={`${l.label}-${l.href}`}>
                        <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.9375rem] leading-snug text-muted-foreground transition-colors hover:text-foreground">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div aria-hidden className="h-px w-full bg-divider" />

          <div className="flex flex-col-reverse items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
