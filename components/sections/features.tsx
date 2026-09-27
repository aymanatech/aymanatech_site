import { BarChart3, Brain, Plug, ShieldCheck, Star, Workflow, Zap, type LucideIcon } from "lucide-react";
import { features } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  workflow: Workflow,
  plug: Plug,
  zap: Zap,
  chart: BarChart3,
  shield: ShieldCheck,
};

export function Features() {
  return (
    <Section id="features">
      <SectionHeader badge={features.badge} icon={Star} title={features.title} subtitle={features.subtitle} />
      <Stagger className="mx-auto grid w-full max-w-[500px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {features.items.map((f) => {
          const Icon = icons[f.icon];
          return (
            <StaggerItem
              key={f.title}
              lift
              className="group flex flex-col gap-5 rounded-card bg-card-fade p-6 shadow-soft"
            >
              <span className="grid size-12 place-items-center rounded-full chip-surface shadow-chip transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="size-[22px] text-accent" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h3">{f.title}</h3>
                <p className="text-body">{f.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
