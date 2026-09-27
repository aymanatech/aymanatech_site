import {
  BookOpen, Briefcase, ClipboardCheck, FileText, FolderKanban, HeartPulse, HelpCircle, Info, Landmark,
  MessageSquareQuote, Newspaper, Plane, Rocket, Route, ShoppingBag, Truck, Users, type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/services";
import { serviceIcons } from "@/components/ui/service-icons";

const byHref: Record<string, LucideIcon> = {
  "/industries/healthcare": HeartPulse,
  "/industries/finance-accounting": Landmark,
  "/industries/travel-transport": Plane,
  "/industries/saas-startups": Rocket,
  "/industries/ecommerce": ShoppingBag,
  "/industries/logistics": Truck,
  "/work": Briefcase,
  "/projects": FolderKanban,
  "/reviews": MessageSquareQuote,
  "/blog": Newspaper,
  "/guides": BookOpen,
  "/ai-workflow-audit": ClipboardCheck,
  "/about": Info,
  "/team": Users,
  "/careers": Briefcase,
  "/process": Route,
  "/faq": HelpCircle,
};

/** Icon for any menu destination: service icons for /services/*, a document icon for case studies. */
export function navIcon(href: string): LucideIcon | null {
  if (href.startsWith("/services/")) {
    const key = services.find((s) => `/services/${s.slug}` === href)?.key;
    return key ? serviceIcons[key] : null;
  }
  if (href.startsWith("/work/")) return FileText;
  return byHref[href] ?? null;
}
