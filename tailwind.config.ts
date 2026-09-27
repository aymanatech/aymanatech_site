import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// All colours are CSS variables (see app/globals.css) so light and dark themes share one set of utilities.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "481px", // large phones → tablet
      sm: "640px",
      md: "768px",
      lg: "1025px", // desktop & laptop
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: token("card"),
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        subtle: token("subtle"),
        border: token("border"),
        ring: token("ring"),
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
          light: token("accent-light"),
          dark: token("accent-dark"),
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Fluid type scale: every heading size scales smoothly from 320px to 1440px viewports.
      fontSize: {
        display: ["clamp(2.125rem, 1.35rem + 3.9vw, 5rem)", { lineHeight: "1.06", letterSpacing: "-0.035em" }],
        h1: ["clamp(2.125rem, 1.6rem + 2.6vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.75rem, 1.4rem + 1.75vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        h3: ["clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        lead: ["clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)", { lineHeight: "1.6" }],
      },
      borderRadius: { card: "16px", panel: "24px", pill: "100px" },
      boxShadow: {
        soft: "0 0.6px 1.8px -0.9px rgb(0 0 0 / var(--shadow-a)), 0 2.3px 6.9px -1.8px rgb(0 0 0 / var(--shadow-a)), 0 10px 30px -2.75px rgb(0 0 0 / var(--shadow-a))",
        nav: "0 0.4px 1.3px -0.9px rgb(0 0 0 / var(--shadow-a)), 0 1.6px 4.8px -1.8px rgb(0 0 0 / var(--shadow-a)), 0 7px 21px -2.75px rgb(0 0 0 / var(--shadow-a))",
        pill: "0 0.6px 2.3px -0.75px rgb(0 0 0 / calc(var(--shadow-a) * 1.4)), 0 2.3px 8.7px -1.5px rgb(0 0 0 / calc(var(--shadow-a) * 1.4)), 0 10px 38px -2.25px rgb(0 0 0 / calc(var(--shadow-a) * 1.6))",
        badge: "0 0.6px 1.8px -0.75px rgb(0 0 0 / var(--shadow-a)), 0 2.3px 6.9px -1.5px rgb(0 0 0 / var(--shadow-a)), 0 10px 30px -2.25px rgb(0 0 0 / var(--shadow-a))",
        chip: "0 1.1px 0.8px -0.33px rgb(0 0 0 / calc(var(--shadow-a) * 0.5)), 0 5px 3.5px -0.5px rgb(0 0 0 / var(--shadow-a))",
        raised: "0 0.6px 1.8px -1px rgb(0 0 0 / calc(var(--shadow-a) * 3)), 0 2.3px 6.9px -2px rgb(0 0 0 / calc(var(--shadow-a) * 2.8)), 0 10px 30px -3px rgb(0 0 0 / calc(var(--shadow-a) * 2))",
        glow: "0 0 15px 3px hsl(var(--accent-light) / 0.4)",
      },
      backgroundImage: {
        "text-ink": "linear-gradient(45deg, hsl(var(--ink-edge)) 0%, hsl(var(--foreground)) 50%, hsl(var(--ink-edge)) 100%)",
        "text-accent": "linear-gradient(45deg, hsl(var(--accent-dark)) 0%, hsl(var(--accent)) 50%, hsl(var(--accent-dark)) 100%)",
        "card-fade": "linear-gradient(180deg, hsl(var(--muted)) 0%, hsl(var(--card)) 100%)",
        "panel-fade": "linear-gradient(180deg, hsl(var(--muted)) 0%, hsl(var(--card)) 50%, hsl(var(--muted)) 100%)",
        "badge-fade": "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--muted)) 116%)",
        divider: "linear-gradient(90deg, hsl(var(--border) / 0.3) 0%, hsl(var(--border)) 50%, hsl(var(--border) / 0.3) 100%)",
        // The orb CTA keeps fixed brand blues in both themes so its white label always has contrast.
        orb: "conic-gradient(#1b44a8 0deg, #57abff 42deg, #1f6feb 105deg, #cfe4ff 135deg, #1b44a8 190deg, #1f6feb 270deg, #57abff 320deg, #1b44a8 360deg)",
        "orb-inner": "conic-gradient(#57abff 0deg, #1b44a8 85deg, #1f6feb 165deg, #57abff 245deg, #1b44a8 310deg, #57abff 360deg)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--marquee-gap, 48px)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--marquee-gap, 48px)))" },
          to: { transform: "translateX(0)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.92)" },
          "50%": { opacity: "0.8", transform: "scale(1.12)" },
        },
        caret: { "0%, 45%": { opacity: "1" }, "50%, 95%": { opacity: "0" }, "100%": { opacity: "1" } },
        "bounce-soft": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(6px)" } },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.12)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 30s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 30s) linear infinite",
        "spin-slow": "spin-slow 6s linear infinite",
        "spin-slower": "spin-slow 10s linear infinite reverse",
        drift: "drift 18s ease-in-out infinite",
        caret: "caret 1.1s steps(1) infinite",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
export default config;
