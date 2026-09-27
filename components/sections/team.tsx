"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { team } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const HUES = [213, 198, 228, 186, 240, 205];

export function Team({ more, hideHeader = false }: { more?: { label: string; href: string }; hideHeader?: boolean } = {}) {
  return (
    <Section id="team">
      {hideHeader ? null : <SectionHeader badge={team.badge} icon={Users} title={team.title} subtitle={team.subtitle} />}
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.members.map((m, i) => {
          const hue = HUES[i % HUES.length];
          const initials = m.name
            .split(" ")
            .map((p) => p[0])
            .join("");
          return (
            <StaggerItem key={m.name}>
              <motion.article
                whileHover="hover"
                className="group relative flex aspect-[4/5] flex-col lg:aspect-[6/5] justify-end overflow-hidden rounded-card p-2 shadow-soft"
                style={{ background: `linear-gradient(160deg, hsl(${hue} 100% 93%), hsl(${hue + 10} 85% 76%))` }}
              >
                <motion.span
                  aria-hidden
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
                  className="absolute inset-0 grid place-items-center pb-16 font-display text-[96px] font-semibold lg:text-[112px] tracking-[-0.06em] text-white/55"
                >
                  {initials}
                </motion.span>
                <div className="relative flex flex-col gap-0.5 rounded-xl bg-card/80 px-4 py-3 shadow-chip backdrop-blur-md">
                  <h3 className="text-lg">{m.name}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{m.role}</p>
                </div>
              </motion.article>
            </StaggerItem>
          );
        })}
      </Stagger>
      {more ? (
        <div className="flex justify-center">
          <Button asChild>
            <Link href={more.href}>{more.label}</Link>
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
