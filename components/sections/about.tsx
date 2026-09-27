import Link from "next/link";
import { Sparkles } from "lucide-react";
import { about } from "@/lib/content";
import { Badge, Section } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <Section id="about">
      <Reveal className="flex flex-col items-center gap-5 text-center">
        <Badge icon={Sparkles}>{about.badge}</Badge>
        <h2 className="text-gradient-ink max-w-[22ch] pb-1 text-h2">{about.title}</h2>
        <p className="max-w-[60ch] text-lead text-muted-foreground">{about.statement}</p>
        <Button asChild className="mt-2">
          <Link href="/about">More about Aymana Tech</Link>
        </Button>
      </Reveal>

      <div aria-hidden className="mx-auto h-px w-full max-w-[800px] bg-divider" />

      <Reveal className="flex flex-col items-center gap-5" delay={0.1}>
        <p className="text-sm font-medium text-muted-foreground">{about.trusted}</p>
        <div className="w-full max-w-[800px]">
          <Marquee gap={48} duration={28}>
            {about.partners.map((name) => (
              <span key={name} className="font-display text-[1.375rem] font-semibold tracking-[-0.03em] text-foreground/60">
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  );
}
