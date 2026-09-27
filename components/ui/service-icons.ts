import {
  AppWindow,
  Bot,
  BrainCircuit,
  Cable,
  Cloud,
  Code,
  PenTool,
  RefreshCcw,
  Rocket,
  Smartphone,
  TabletSmartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Icon per service key (see lib/services.ts). Shared by the header menu, cards and service pages. */
export const serviceIcons: Record<string, LucideIcon> = {
  "workflow-automation": Workflow,
  "agent-development": Bot,
  "custom-software": Code,
  "saas-mvp": Rocket,
  "web-apps": AppWindow,
  "mobile-apps": Smartphone,
  "devops-cloud": Cloud,
  modernization: RefreshCcw,
  "ai-ml": BrainCircuit,
  "react-native": TabletSmartphone,
  integrations: Cable,
  "ui-ux": PenTool,
};

