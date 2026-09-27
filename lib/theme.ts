// Theme state lives on <html class="dark">. The inline script in app/layout.tsx applies it before first paint
// (no flash); this module changes it at runtime and lets components subscribe.

export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "aymana-theme";
const THEME_COLORS: Record<Theme, string> = { light: "#f5f5f5", dark: "#0d1017" };

/** Runs in <head> before the page paints. Kept tiny and dependency-free. */
export const themeInitScript = `(function(){var r=document.documentElement;r.classList.add('js');try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light'}catch(e){}setTimeout(function(){if(!window.__motionReady)r.classList.remove('js')},4000)})()`;

export const getTheme = (): Theme =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light";

export const getStoredTheme = (): Theme | null => {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
}

/**
 * Switch theme and remember it. When the browser supports View Transitions, the new theme spreads
 * out in a circle from `origin` (the toggle button); otherwise colours cross-fade briefly.
 */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode: theme still applies for this visit */
  }
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

  if (!reduce && origin && doc.startViewTransition) {
    const transition = doc.startViewTransition(() => apply(theme));
    const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => undefined);
    return;
  }

  if (!reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  }
  apply(theme);
}

/** Notifies on any theme change (toggle, or OS change while no preference is stored). */
export function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (!getStoredTheme()) apply(mq.matches ? "dark" : "light");
  };
  mq.addEventListener("change", onSystem);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onSystem);
  };
}
