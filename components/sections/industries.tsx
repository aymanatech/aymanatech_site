import { Building2 } from "lucide-react";
import { industriesSection } from "@/lib/content";
import { industries } from "@/lib/industries";
import { Section, SectionHeader } from "@/components/ui/section";
import { IndustryCard } from "@/components/page/cards";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Industries() {
  return (
    <Section id="industries">
      <SectionHeader badge={industriesSection.badge} icon={Building2} title={industriesSection.title} subtitle={industriesSection.subtitle} />
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <StaggerItem key={i.slug} className="h-full">
            <IndustryCard industry={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
