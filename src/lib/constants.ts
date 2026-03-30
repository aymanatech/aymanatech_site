// src/lib/constants.ts

export const C = {
  cyan:       '#00d4ff',
  skyBlue:    '#2b9fff',
  cobalt:     '#2255e0',
  indigo:     '#3f35c9',
  violet:     '#5b2be0',
  deepViolet: '#6a1fc2',
  g1: 'linear-gradient(135deg,#00d4ff,#2b9fff)',
  g2: 'linear-gradient(135deg,#2255e0,#00d4ff)',
  g3: 'linear-gradient(135deg,#3f35c9,#2b9fff)',
  g4: 'linear-gradient(135deg,#6a1fc2,#3f35c9)',
  g5: 'linear-gradient(135deg,#00d4ff,#5b2be0)',
  gBtn: 'linear-gradient(135deg,#2b9fff,#5b2be0)',
  gBg: 'linear-gradient(135deg,#06001a,#0a0028 40%,#060020 70%,#080030)',
} as const;

export const NAV_LINKS = ['Home', 'About', 'Services', 'Skills', 'Success Stories'] as const;

export const SERVICES = [
  { icon: '📱', title: 'WhatsApp',                    color: '#25D366', desc: 'Automated WhatsApp sequences that qualify leads, answer FAQs, and book appointments 24/7.' },
  { icon: '🤖', title: 'AI Follow-Ups',               color: '#2b9fff', desc: 'Never miss a lead. AI-powered follow-up sequences that increase show-up rates by 40%.' },
  { icon: '📣', title: 'White-label Voice Agents',     color: '#a855f7', desc: 'Human-sounding AI voice agents that call leads within 60 seconds of opt-in.' },
  { icon: '📅', title: 'Booking Appointment Setter',   color: '#f59e0b', desc: 'Fully automated appointment booking with calendar sync, reminders, and confirmations.' },
  { icon: '⚙️', title: 'Business Automation',         color: '#10b981', desc: 'End-to-end business process automation — from lead capture to invoice generation.' },
  { icon: '🎯', title: 'Lead Capture & Nurturing',     color: '#ef4444', desc: 'Multi-channel lead capture funnels with intelligent nurturing sequences.' },
];

export const FEATURES = [
  { icon: '🤖', title: 'AI-Powered Automation',       color: '#f59e0b', desc: 'Advanced AI that learns your business and automates repetitive tasks intelligently.' },
  { icon: '🔒', title: 'Enterprise-level Security',   color: '#10b981', desc: 'Bank-grade security with end-to-end encryption for all your data.' },
  { icon: '🔗', title: 'Global Integration Hub',      color: '#2b9fff', desc: 'Connect 500+ apps seamlessly with our pre-built integration library.' },
  { icon: '🔄', title: 'End-to-End Workflow Builder', color: '#a855f7', desc: 'Visual drag-and-drop workflow builder with conditional logic and branching.' },
  { icon: '⚡', title: 'Lightning-Fast Performance',  color: '#ef4444', desc: 'Sub-second response times with 99.9% uptime SLA guaranteed.' },
  { icon: '📊', title: 'Advanced Revenue Control',    color: '#f97316', desc: 'Real-time revenue tracking, forecasting, and automated billing workflows.' },
  { icon: '📈', title: 'Deep Flow Analytics',         color: '#06b6d4', desc: 'Granular analytics with actionable insights to optimize every workflow.' },
  { icon: '🛡️', title: 'CRM Administration',         color: '#8b5cf6', desc: 'Full CRM management with automated data enrichment and pipeline tracking.' },
];

export const FIXES = [
  { icon: '🎯', title: 'More Qualified Leads',  color: '#f59e0b', desc: 'Stop chasing cold leads. Get pre-qualified prospects who want your service.' },
  { icon: '📞', title: 'Instant Follow-Up',     color: '#2b9fff', desc: 'Contact every lead within 60 seconds automatically — day or night.' },
  { icon: '❌', title: 'Less Missed Clients',   color: '#ef4444', desc: 'Reduce no-shows by 70% with smart reminder and re-engagement sequences.' },
  { icon: '⚙️', title: 'Efficient Operations', color: '#10b981', desc: 'Eliminate manual tasks and free your team to focus on high-value work.' },
  { icon: '📈', title: 'Measurable Growth',     color: '#a855f7', desc: 'Track ROI with real-time dashboards. See exactly what\'s working.' },
  { icon: '🚀', title: 'Scalable Technology',   color: '#f97316', desc: 'Infrastructure that grows with you — from startup to enterprise.' },
];

export const SUCCESS_STORIES = [
  {
    type: 'E-commerce Brand',
    challenge: 'Losing 60% of leads due to slow response times and manual follow-ups.',
    results: [{ val: '312%', lab: 'ROI' }, { val: '40%', lab: 'More Bookings' }, { val: '3hrs', lab: 'Saved Daily' }],
    quote: 'The automation paid for itself in the first week. Unbelievable results.',
  },
  {
    type: 'SaaS Company',
    challenge: 'High churn rate and low trial-to-paid conversion.',
    results: [{ val: '200%', lab: 'ROI' }, { val: '45%', lab: 'Trial Conversion' }, { val: '60%', lab: 'Less Churn' }],
    quote: 'Our trial conversion doubled in 30 days. Game-changer for our business.',
  },
  {
    type: 'Agency',
    challenge: 'Spending 20+ hours per week on repetitive client onboarding tasks.',
    results: [{ val: '280%', lab: 'ROI' }, { val: '20hrs', lab: 'Saved/Week' }, { val: '95%', lab: 'Client Retention' }],
    quote: 'We onboard clients in minutes now instead of days. Incredible.',
  },
  {
    type: 'Dental Clinic',
    challenge: 'No-shows costing $8,000/month and overwhelmed front desk staff.',
    results: [{ val: '290%', lab: 'ROI' }, { val: '70%', lab: 'Less No-Shows' }, { val: '4hrs', lab: 'Staff Saved' }],
    quote: 'No-shows dropped by 70% and the front desk is finally breathing.',
  },
];

export const FOOTER_STATS = [
  { val: '0.5h',   lab: 'Setup Time' },
  { val: '200+',   lab: 'Integrations' },
  { val: '99%',    lab: 'Uptime' },
  { val: 'Global', lab: 'Support' },
];

export const HERO_BADGES = [
  { text: 'Free Consultation', color: '#00d4ff' },
  { text: 'AI-Powered',        color: '#2b9fff' },
  { text: 'Certified Experts', color: '#2255e0' },
  { text: '24h Response',      color: '#5b2be0' },
];

export const HERO_STATS = [
  { icon: '⚡', val: '500+',  lab: 'Businesses Automated', grad: 'linear-gradient(135deg,#00d4ff,#2b9fff)' },
  { icon: '🕐', val: '$5M+',  lab: 'Client Savings',       grad: 'linear-gradient(135deg,#3f35c9,#2b9fff)' },
  { icon: '🎯', val: '99.9%', lab: 'Success Rate',         grad: 'linear-gradient(135deg,#2255e0,#00d4ff)' },
  { icon: '💬', val: '24h',   lab: 'Response Time',        grad: 'linear-gradient(135deg,#6a1fc2,#3f35c9)' },
];
