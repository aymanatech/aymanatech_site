# Aymana Tech website

Next.js 14 (App Router), Tailwind CSS, GSAP + ScrollTrigger, Framer Motion. 53 statically generated pages.

## Run

    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

## Before launch

1. Set NEXT_PUBLIC_SITE_URL to your real domain (canonical URLs, sitemap, Open Graph, JSON-LD).
2. Update email, phone, booking link and social URLs in lib/site.ts.
3. The contact and audit forms open the visitor's email app. To store submissions, replace onSubmit in
   components/page/contact-form.tsx with a POST to your form provider or an API route.
4. Replace placeholder clients, testimonials, team members and stats in lib/content.ts and lib/work.ts.
5. Have /privacy and /terms reviewed by a lawyer.
6. Submit /sitemap.xml in Google Search Console.

## Where things live

- Brand, contact details, domain: lib/site.ts
- Menu and footer links: lib/nav.ts
- Services (12 pages): lib/services.ts
- Industries (6 pages): lib/industries.ts
- Case studies (4 pages): lib/work.ts
- Blog posts and guides: lib/articles.ts
- Home and company copy: lib/content.ts
- SEO metadata and JSON-LD builders: lib/seo.ts
- Animated logo: components/ui/logo.tsx and the "Animated logo" block in app/globals.css
- Logo artwork: public/brand/, app/icon.png, app/apple-icon.png
- Colour tokens (light and dark): app/globals.css
- Type scale and breakpoints: tailwind.config.ts

Adding a service, industry, case study or article is a data change: add an entry to the relevant lib/ file and its
page, menu link, sitemap entry and structured data are generated automatically.

## Interactive features

| Feature | Files | Notes |
|---|---|---|
| Light/dark theme + toggle | `lib/theme.ts`, `lib/hooks/use-theme.ts`, `components/theme/theme-toggle.tsx` | Saved in localStorage (`aymana-theme`); follows the OS until the visitor chooses. Applied in `<head>` before paint (no flash). Circular reveal via the View Transitions API where supported, colour cross-fade elsewhere. |
| Scroll animations (GSAP) | `lib/gsap.ts`, `components/motion/reveal.tsx`, `components/motion/scroll-effects.tsx` | `<Reveal>`, `<Stagger>`/`<StaggerItem>` (ScrollTrigger.batch), `data-intro` page entrances, `data-parallax` layers, top scroll-progress bar. Transform/opacity only; disabled for reduced motion; 4s failsafe un-hides content if JS never loads. |
| Typewriter headline | `lib/hooks/use-typewriter.ts`, `components/sections/hero.tsx` | Phrases in `hero.phrases` (`lib/content.ts`). The first phrase is the static, crawlable H1 text; the animated copy is aria-hidden. Pauses when the hero is off-screen. |
| Ocean waves background | `components/visual/ocean-waves.tsx` | Canvas 2D, 4 layered waves, DPR capped at 1.5, paused off-screen / in hidden tabs, still frame for reduced motion, theme-aware, swell lifts under the mouse. |
| Custom cursor | `components/ui/custom-cursor.tsx` | Dot + trailing ring (gsap.quickTo). Wraps small controls with a magnetic pull, grows over links/cards, hands off to the text caret in fields. Only mounts for hover-capable fine pointers without reduced motion. |
| Chat sidebar | `components/chat/chat-widget.tsx`, `lib/chat/*` | Streaming replies, typing indicator, timestamps, quick replies, unread badge, session history, Stop and New conversation. Open from anywhere with `openChat()`. |

### Connecting the chat to a real backend

The widget talks to a `ChatTransport` (`lib/chat/types.ts`). The default `mockTransport` answers from the site's own
content offline. To go live, implement `send(history, onEvent, signal)` against your API, e.g. a Next.js route that
streams from an LLM, or a WebSocket, emitting `typing`, `token`, `done` and `error` events, then render
`<ChatWidget transport={yourTransport} />` in `app/layout.tsx`.

## Packages

Added: `gsap` (includes ScrollTrigger; free for commercial use). Existing: `lucide-react` (icons), `framer-motion`
(menu, accordion and tab interactions), `@radix-ui/*`, `tailwindcss`. No canvas or 3D libraries are needed.
