// Blog posts (/blog/[slug]) and long-form guides (/guides/[slug]) share one model.

export type ArticleSection = { heading: string; paragraphs: string[]; list?: string[] };

export type Article = {
  kind: "blog" | "guide";
  slug: string;
  title: string;
  metaDescription: string;
  tag: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    kind: "blog",
    slug: "workflows-worth-automating-first",
    title: "Five Workflows Worth Automating First",
    metaDescription:
      "Where the hours actually go in a growing team, and how to choose the first business process to automate with AI so it pays back quickly.",
    tag: "Playbook",
    excerpt: "Where the hours actually go in a growing team, and how to pick the first process that pays back quickly.",
    date: "2026-09-02",
    readTime: "6 min read",
    author: "Samira Haddad",
    sections: [
      {
        heading: "Start with volume, not novelty",
        paragraphs: [
          "The best first automation is rarely the most impressive one. It is the task your team does dozens of times a week, follows roughly the same steps each time, and quietly resents.",
          "Before choosing, count. A week of tallying requests by type usually reveals two or three processes that consume most of the manual effort.",
        ],
      },
      {
        heading: "Five reliable candidates",
        paragraphs: ["Across the teams we work with, these five pay back fastest:"],
        list: [
          "Lead intake: enrich, score and route new enquiries with a drafted first reply.",
          "Support triage: classify tickets, answer common questions and escalate the rest with context.",
          "Invoice matching: reconcile invoices against orders and payments, flagging only exceptions.",
          "Report assembly: pull numbers from several tools into a weekly summary.",
          "Scheduling: book, confirm and remind without email ping-pong.",
        ],
      },
      {
        heading: "Score each candidate",
        paragraphs: [
          "Rate every candidate on hours saved per month, how clear the rules are, and how costly a mistake would be. Start where hours are high, rules are clear and mistakes are cheap to catch.",
          "Keep a human approval step for the first few weeks. It builds trust and gives you real examples to improve the system with.",
        ],
      },
    ],
  },
  {
    kind: "blog",
    slug: "keeping-ai-agents-honest",
    title: "Keeping an AI Agent Honest in Production",
    metaDescription:
      "Evaluation sets, guardrails and hand-off rules that stop a customer-facing AI agent from guessing, and how to monitor quality after launch.",
    tag: "Engineering",
    excerpt: "Evaluation sets, guardrails and the hand-off rules that stop a helpful agent from guessing.",
    date: "2026-08-19",
    readTime: "8 min read",
    author: "Kenji Mori",
    sections: [
      {
        heading: "Helpful is not the same as correct",
        paragraphs: [
          "Language models are eager to help, which is exactly the problem. Without constraints, an agent will answer a question it should have escalated, and it will sound confident doing it.",
        ],
      },
      {
        heading: "Build the evaluation set first",
        paragraphs: [
          "Before writing prompts, collect a few hundred real conversations and label the correct outcome for each: answer, ask a clarifying question, or hand off. This set becomes the test every change must pass.",
          "Include the awkward cases on purpose: angry customers, ambiguous requests and questions just outside the agent's remit.",
        ],
      },
      {
        heading: "Ground every answer",
        paragraphs: [
          "Agents should answer from retrieved sources and live system data, not memory. If the source does not contain the answer, the correct behaviour is to say so and escalate.",
        ],
      },
      {
        heading: "Make hand-offs explicit",
        paragraphs: ["Write hand-off rules as plainly as a staff handbook:"],
        list: [
          "Refunds above a set value go to a person.",
          "Any mention of legal action, injury or safety escalates immediately.",
          "Two failed attempts to resolve a request trigger a hand-off.",
        ],
      },
      {
        heading: "Keep measuring after launch",
        paragraphs: [
          "Sample live conversations every week, score them against the same rubric and add new failure cases to the evaluation set. Quality drifts when policies and products change; measurement is how you notice.",
        ],
      },
    ],
  },
  {
    kind: "blog",
    slug: "build-buy-or-automate",
    title: "Build, Buy or Automate Around It",
    metaDescription:
      "A simple framework for deciding when an off-the-shelf tool is enough, when to build custom software, and when to automate around the tools you already have.",
    tag: "Strategy",
    excerpt: "A simple way to decide when a tool is enough and when the process itself needs redesigning.",
    date: "2026-08-05",
    readTime: "5 min read",
    author: "Samira Haddad",
    sections: [
      {
        heading: "Three options, one question",
        paragraphs: [
          "Every operational bottleneck has three answers: buy a tool, build software, or automate around what you already have. The right one depends on whether the process is a commodity or a competitive advantage.",
        ],
      },
      {
        heading: "Buy when the process is generic",
        paragraphs: [
          "Payroll, email and accounting work the same way in most companies. Mature tools already do them well, and custom software would only add maintenance.",
        ],
      },
      {
        heading: "Automate when tools are fine but disconnected",
        paragraphs: [
          "If each tool does its job but people spend hours moving data between them, integration and automation deliver most of the value at a fraction of the cost of a rebuild.",
        ],
      },
      {
        heading: "Build when the process is your edge",
        paragraphs: [
          "When the way you work is what customers pay for, forcing it into a generic tool erodes the advantage. That is where custom software earns its cost.",
        ],
      },
    ],
  },
  {
    kind: "guide",
    slug: "ai-automation-buyers-guide",
    title: "The AI Automation Buyer's Guide",
    metaDescription:
      "How to evaluate AI automation agencies and vendors: questions to ask, red flags, pricing models and what a good first 90 days looks like.",
    tag: "Guide",
    excerpt: "Questions to ask, red flags to watch for, and what a good first 90 days with an automation partner looks like.",
    date: "2026-07-22",
    readTime: "10 min read",
    author: "Grace Okafor",
    sections: [
      {
        heading: "Know what you are buying",
        paragraphs: [
          "AI automation projects combine three things: process design, software integration and model behaviour. A strong partner is good at all three, and can explain trade-offs in plain language.",
        ],
      },
      {
        heading: "Questions to ask every vendor",
        paragraphs: ["Ask for specific answers, not reassurance:"],
        list: [
          "How will you measure accuracy before and after launch?",
          "What happens when the automation is unsure?",
          "Where does our data go, and who can access it?",
          "Who owns the code, prompts and configuration?",
          "What does support look like after go-live?",
        ],
      },
      {
        heading: "Red flags",
        paragraphs: [
          "Be wary of fixed promises about percentages of work removed before anyone has looked at your process, platforms that lock your data in, and proposals without a plan for monitoring.",
        ],
      },
      {
        heading: "A good first 90 days",
        paragraphs: [
          "Weeks one and two map the process and agree on success measures. Weeks three to six build and test one workflow with real cases. The rest of the quarter runs it with human approval, tunes it, and decides what to automate next based on results.",
        ],
      },
    ],
  },
  {
    kind: "guide",
    slug: "how-to-scope-a-saas-mvp",
    title: "How to Scope a SaaS MVP That Customers Will Pay For",
    metaDescription:
      "A step-by-step guide to scoping a SaaS MVP: define the core job, cut features, plan billing early and ship to paying users in 8 to 12 weeks.",
    tag: "Guide",
    excerpt: "Define the core job, cut ruthlessly, and plan billing from day one so your MVP earns while it learns.",
    date: "2026-07-08",
    readTime: "9 min read",
    author: "Felix Brandt",
    sections: [
      {
        heading: "Write down the one job",
        paragraphs: [
          "An MVP should do one job for one type of customer better than their current workaround. If you cannot state that job in a sentence, the scope is not ready.",
        ],
      },
      {
        heading: "Cut to the paid path",
        paragraphs: [
          "List every feature, then keep only those a customer needs to get the job done and pay you. Settings pages, integrations and dashboards can usually wait.",
        ],
      },
      {
        heading: "Do not postpone billing",
        paragraphs: [
          "Charging from the first release is the fastest way to learn whether the product matters. Build subscriptions, trials and plan limits into the MVP.",
        ],
      },
      {
        heading: "Protect the foundations",
        paragraphs: ["A small scope does not mean fragile code. Keep these from day one:"],
        list: [
          "Multi-tenant data model with proper access control",
          "Automated tests on billing and permissions",
          "CI/CD and error monitoring",
        ],
      },
    ],
  },
  {
    kind: "guide",
    slug: "native-vs-react-native",
    title: "Native vs React Native: Choosing Your Mobile Stack",
    metaDescription:
      "Native iOS and Android versus React Native: a practical comparison of cost, performance, hiring and maintenance to choose the right mobile app stack.",
    tag: "Guide",
    excerpt: "A practical comparison of cost, performance, hiring and maintenance to pick the right mobile stack.",
    date: "2026-06-24",
    readTime: "7 min read",
    author: "Lucía Ferreira",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "For most business and consumer apps, React Native delivers native-quality results at roughly half the build and maintenance cost. Choose fully native when the app depends on heavy graphics, complex device hardware or platform features on release day.",
        ],
      },
      {
        heading: "Cost and speed",
        paragraphs: [
          "One React Native codebase serves both platforms and can share logic with your web app. Two native apps mean two codebases, two teams and features that drift apart.",
        ],
      },
      {
        heading: "Performance",
        paragraphs: [
          "Modern React Native with a well-built list and animation layer is smooth on current devices. The gap shows in 3D, video processing and demanding real-time features.",
        ],
      },
      {
        heading: "Hiring and maintenance",
        paragraphs: [
          "TypeScript developers are easier to hire than specialist Swift and Kotlin engineers, and over-the-air updates let you fix bugs without waiting for store review.",
        ],
      },
    ],
  },
];

export const blogPosts = articles.filter((a) => a.kind === "blog");
export const guides = articles.filter((a) => a.kind === "guide");
export const getArticle = (kind: Article["kind"], slug: string) =>
  articles.find((a) => a.kind === kind && a.slug === slug);
export const articleHref = (a: Pick<Article, "kind" | "slug">) => `/${a.kind === "blog" ? "blog" : "guides"}/${a.slug}`;
