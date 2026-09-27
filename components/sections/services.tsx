import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { servicesSection } from "@/lib/content";
import { featuredServices, otherServices } from "@/lib/services";
import { PanelSection, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/page/cards";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** Home-page services grid. Every card links to its own /services/[slug] landing page. */
export function Services() {
  return (
    <PanelSection id="services">
      <SectionHeader badge={servicesSection.badge} icon={LayoutGrid} title={servicesSection.title} subtitle={servicesSection.subtitle} />
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...featuredServices, ...otherServices].map((s) => (
          <StaggerItem key={s.slug} className="h-full">
            <ServiceCard service={s} />
          </StaggerItem>
        ))}
      </Stagger>
      <div className="flex justify-center">
        <Button asChild variant="accent" size="lg">
          <Link href="/services">View all services</Link>
        </Button>
      </div>
    </PanelSection>
  );
}
