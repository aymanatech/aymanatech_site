import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL, site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { OrganizationSchema, FAQSchema } from "@/components/SchemaOrg";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/page/json-ld";
import { ScrollEffects } from "@/components/motion/scroll-effects";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ChatWidget } from "@/components/chat/chat-widget";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Self-hosted variable fonts (latin subset): no third-party request, preloaded, with metric-matched fallbacks.
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});

const defaultTitle = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: SITE_URL },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    locale: site.locale,
    title: defaultTitle,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1017" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the <head> script sets the theme class before React hydrates.
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <OrganizationSchema />
        <FAQSchema />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-raised"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex flex-col items-center overflow-x-clip">
            {children}
          </main>
          <Footer />
          <ScrollEffects />
          <ChatWidget />
          <CustomCursor />
        </MotionProvider>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
