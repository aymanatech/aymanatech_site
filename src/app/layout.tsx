// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Aymana Tech — AI-Powered Business Automation',
  description: '24/7 AI systems that qualify leads, book calls, and handle support while you sleep.',
  keywords: 'AI automation, lead generation, business automation, WhatsApp automation, AI voice agents',
  openGraph: {
    title: 'Aymana Tech — AI-Powered Business Automation',
    description: 'Turn more inquiries into booked work with AI automation.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
