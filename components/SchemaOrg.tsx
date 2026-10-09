'use client';

import { SITE_URL, site } from '@/lib/site';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/brand/aymana-tech-logo.png`,
      width: 200,
      height: 60,
    },
    description: site.description,
    foundingDate: site.founded,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: Object.values(site.social),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Agency Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Workflow Automation',
            url: `${SITE_URL}/services/ai-automations`,
            description: 'End-to-end AI workflow automation to eliminate repetitive tasks, reduce costs, and scale operations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agent Development',
            url: `${SITE_URL}/services/ai-agent-development`,
            description: 'Custom AI agents built on LLMs that autonomously reason, plan, and execute multi-step tasks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software Development',
            url: `${SITE_URL}/services/custom-software-development`,
            description: 'Tailored software built from scratch to fit your exact business processes and growth roadmap.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SaaS MVP Development',
            url: `${SITE_URL}/services/saas-development`,
            description: 'Rapid SaaS MVP builds that ship a validated, investor-ready product in weeks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Development',
            url: `${SITE_URL}/services/web-development`,
            description: 'Scalable Next.js and React web applications for consumer and enterprise markets.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            url: `${SITE_URL}/services/mobile-app-development`,
            description: 'Native and cross-platform mobile apps for iOS and Android, from concept to App Store.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DevOps & Cloud',
            url: `${SITE_URL}/services/devops-cloud`,
            description: 'CI/CD pipelines, containerization, and cloud infrastructure on AWS, GCP, and Azure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software Modernization',
            url: `${SITE_URL}/services/software-modernization`,
            description: 'Legacy migration and re-architecture that eliminates technical debt and future-proofs your stack.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Machine Learning',
            url: `${SITE_URL}/services/ai-machine-learning`,
            description: 'Custom ML models, NLP, computer vision, and predictive analytics integrated into your products.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'React Native App Development',
            url: `${SITE_URL}/services/react-native-development`,
            description: 'High-performance cross-platform mobile apps with React Native — one codebase, two platforms.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'API & CRM Integrations',
            url: `${SITE_URL}/services/api-crm-integrations`,
            description: 'Seamless integrations connecting HubSpot, Salesforce, Zapier, and custom REST/GraphQL APIs.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            url: `${SITE_URL}/services/ui-ux-design`,
            description: 'Figma prototypes, design systems, and conversion-focused interfaces built for real users.',
          },
        },
      ],
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AI workflow automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI workflow automation uses artificial intelligence to execute and optimize multi-step business processes without manual intervention — from data routing to document handling and customer workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a SaaS MVP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aymana Tech typically delivers a production-ready SaaS MVP in 6 to 12 weeks depending on scope. We ship the core user loop first so you can validate with real users fast.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an AI agent and traditional automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional automation follows fixed rules. An AI agent uses an LLM to reason, make decisions, and complete multi-step goals in dynamic environments — handling edge cases that rules can\'t.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you build React Native apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We build cross-platform React Native apps that run natively on iOS and Android from a single shared codebase, cutting development time and maintenance cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you integrate with our existing CRM and APIs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We connect HubSpot, Salesforce, GoHighLevel, Zapier, and custom REST or GraphQL endpoints — making your entire tool stack work as one system.',
        },
      },
      {
        '@type': 'Question',
        name: 'What cloud platforms do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We work on AWS, Google Cloud, and Azure — setting up CI/CD pipelines, Docker/Kubernetes infrastructure, monitoring, and auto-scaling for production workloads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you help modernize legacy software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We audit your existing codebase, identify technical debt, and migrate or re-architect your system to a modern stack without disrupting live operations.',
        },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
