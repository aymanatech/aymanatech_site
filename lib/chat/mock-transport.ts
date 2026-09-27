// Offline assistant: answers from the site's own content and streams the reply word by word,
// so the UI behaves exactly as it will with a real streaming backend.

import type { ChatEvent, ChatMessage, ChatTransport } from "@/lib/chat/types";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { caseStudies } from "@/lib/work";
import { pricing } from "@/lib/content";
import { site } from "@/lib/site";

type Reply = { text: string; quickReplies?: string[] };

const DEFAULT_CHIPS = ["What do you build?", "How much does it cost?", "How long does a project take?", "Talk to a human"];

const has = (text: string, ...words: string[]) => words.some((w) => new RegExp(`\\b${w}`, "i").test(text));

function answer(input: string): Reply {
  const q = input.toLowerCase();

  // A specific service by name or keyword.
  const service = services.find(
    (s) => q.includes(s.title.toLowerCase()) || q.includes(s.slug.replace(/-/g, " ")) || s.title.toLowerCase().split(/[\s/&]+/).filter((w) => w.length > 4).some((w) => q.includes(w)),
  );
  // An industry.
  const industry = industries.find((i) => q.includes(i.title.toLowerCase()) || q.includes(i.slug.split("-")[0]));

  if (/^\s*(hi|hello|hey|salam|assalam\w*|good (morning|afternoon|evening))\b/i.test(q)) {
    return { text: `Hi! I'm the ${site.name} assistant. I can tell you about our services, pricing, timelines or past work. What are you working on?`, quickReplies: DEFAULT_CHIPS };
  }
  if (has(q, "human", "person", "call", "meet", "book", "talk", "contact", "email", "phone")) {
    return {
      text: `Happy to connect you with the team. You can [book a 30-minute discovery call](${site.bookingUrl}), email ${site.email}, or call ${site.phone}. We reply within one working day.`,
      quickReplies: ["Get a free AI workflow audit", "What do you build?"],
    };
  }
  if (has(q, "price", "pricing", "cost", "budget", "quote", "expensive", "cheap", "rate")) {
    const plans = pricing.plans.map((p) => `${p.name} from $${p.monthly.toLocaleString("en-US")}/month`).join(", ");
    return {
      text: `Ongoing automation engagements are ${plans}, with ${Math.round(pricing.yearlyDiscount * 100)}% off billed yearly. Build projects like MVPs and custom software get a fixed quote after a short discovery. [See pricing](/#pricing) or [ask for a quote](/contact).`,
      quickReplies: ["How long does a project take?", "Talk to a human"],
    };
  }
  if (has(q, "how long", "timeline", "time", "weeks", "fast", "quick", "deadline")) {
    return {
      text: "Most AI automations go live in 2 to 6 weeks. Marketing websites take 3 to 6 weeks after design approval, and a SaaS MVP usually reaches paying users in 8 to 12 weeks. You see a working build every week.",
      quickReplies: ["How much does it cost?", "See case studies"],
    };
  }
  if (has(q, "audit")) {
    return { text: "Our [free AI workflow audit](/ai-workflow-audit) is a 45-minute session. You get a map of your manual workflows and an ROI-ranked plan of what to automate first, within three working days.", quickReplies: ["Talk to a human"] };
  }
  if (has(q, "secur", "privacy", "data", "gdpr", "hipaa", "complian")) {
    return { text: "Access is limited to what each workflow needs, data stays in your accounts wherever possible, every automated action is logged, and model providers are chosen to fit your compliance needs, including HIPAA-aware setups.", quickReplies: ["Who owns the code?", "Talk to a human"] };
  }
  if (has(q, "own", "ownership", "source code", "lock-in", "lock in")) {
    return { text: "You own everything: code, prompts, configuration and infrastructure all live in your accounts, with documentation so any team can maintain it.", quickReplies: ["How much does it cost?"] };
  }
  if (has(q, "career", "job", "hiring", "vacanc", "join")) {
    return { text: `We're hiring remote engineers and designers. See [open roles](/careers) or send your portfolio to ${site.careersEmail}.` };
  }
  if (service) {
    return { text: `${service.title}: ${service.summary} Typical deliverables include ${service.deliverables.slice(0, 3).join(", ").toLowerCase()}. [Read more](/services/${service.slug}).`, quickReplies: ["How long does a project take?", "How much does it cost?"] };
  }
  if (industry) {
    return { text: `For ${industry.title}: ${industry.summary} [See how we help ${industry.title} teams](/industries/${industry.slug}).`, quickReplies: ["See case studies", "Talk to a human"] };
  }
  if (has(q, "case", "example", "portfolio", "your work", "results", "clients?\\b", "projects")) {
    const list = caseStudies.map((c) => `[${c.title}](/work/${c.slug}) (${c.headline.value} ${c.headline.label})`).join("; ");
    return { text: `A few recent projects: ${list}.`, quickReplies: ["What do you build?", "Talk to a human"] };
  }
  if (has(q, "service", "build", "do you", "offer", "help", "what can")) {
    return {
      text: `We build ${services.slice(0, 6).map((s) => s.title).join(", ")}, plus DevOps, modernization, integrations and UI/UX design. [Browse all services](/services).`,
      quickReplies: ["AI Agent Development", "SaaS MVP Development", "How much does it cost?"],
    };
  }
  if (has(q, "thank", "thanks", "great", "awesome", "cool", "perfect")) {
    return { text: "You're welcome! Anything else I can help with?", quickReplies: DEFAULT_CHIPS };
  }
  return {
    text: `Good question. I'm a quick-answer assistant, so for anything specific the team is the best bet: [book a call](${site.bookingUrl}) or email ${site.email}. Meanwhile, I can help with services, pricing, timelines or past work.`,
    quickReplies: DEFAULT_CHIPS,
  };
}

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    }, { once: true });
  });

export const mockTransport: ChatTransport = {
  async send(history: ChatMessage[], onEvent: (e: ChatEvent) => void, signal: AbortSignal) {
    const last = [...history].reverse().find((m) => m.role === "user");
    const reply = answer(last?.content ?? "");
    onEvent({ type: "typing" });
    await wait(550 + Math.random() * 500, signal);
    // Stream in word-sized chunks, keeping markdown links intact.
    const tokens = reply.text.match(/\[[^\]]+\]\([^)]+\)\S*\s*|\S+\s*/g) ?? [reply.text];
    for (const token of tokens) {
      await wait(22 + Math.random() * 38, signal);
      onEvent({ type: "token", value: token });
    }
    onEvent({ type: "done", quickReplies: reply.quickReplies });
  },
};

export const welcomeMessage = (): ChatMessage => ({
  id: "welcome",
  role: "assistant",
  content: `Hi, I'm the ${site.name} assistant. Ask me about services, pricing, timelines or our work, or say "talk to a human" to reach the team.`,
  createdAt: Date.now(),
  quickReplies: DEFAULT_CHIPS,
});
