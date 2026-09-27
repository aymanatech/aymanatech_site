"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { navGroups } from "@/lib/nav";
import { bookingLinkProps, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navIcon } from "@/components/sections/nav-icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const OPEN_DELAY = 70; // hover intent: ignore the pointer merely passing over a trigger
const CLOSE_DELAY = 180; // grace period for diagonal moves between the bar and the panel

/** True when the current page is one of the group's destinations (or nested under it). */
const matchesGroup = (group: NavGroup, pathname: string) =>
  pathname === group.href ||
  group.items.some((item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)));

function ItemIcon({ href, className }: { href: string; className?: string }) {
  const Icon = navIcon(href);
  if (!Icon) return null;
  return (
    <span className={cn("chip-surface grid size-9 shrink-0 place-items-center rounded-xl shadow-chip ring-1 ring-border/40 transition-colors", className)}>
      <Icon className="size-4 text-accent" aria-hidden />
    </span>
  );
}

function PanelLink({ item, pathname, onNavigate }: { item: NavGroup["items"][number]; pathname: string; onNavigate: () => void }) {
  const current = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group/item flex min-h-12 items-center gap-3 rounded-xl px-2.5 py-2 transition-[background-color,box-shadow] duration-200 hover:bg-card hover:shadow-chip focus-visible:bg-card",
        current && "bg-card shadow-chip",
      )}
    >
      <ItemIcon href={item.href} className="group-hover/item:ring-accent/30" />
      <span className={cn("text-sm font-semibold leading-snug transition-colors group-hover/item:text-foreground", current ? "text-foreground" : "text-subtle")}>
        {item.label}
      </span>
    </Link>
  );
}

/** Contents of the mega-menu for one group: intro card + link grid (case studies get their own column). */
function PanelContent({ group, pathname, onNavigate }: { group: NavGroup; pathname: string; onNavigate: () => void }) {
  const featured = group.items.filter((i) => i.href.startsWith("/work/"));
  const primary = group.items.filter((i) => !i.href.startsWith("/work/"));
  const colHeading = "px-2.5 pb-1 pt-2 text-xs font-semibold text-muted-foreground";
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-2 p-2 xl:grid-cols-[272px_minmax(0,1fr)]">
      <div className="flex flex-col justify-between gap-6 rounded-[18px] bg-gradient-to-br from-accent/[0.09] via-accent/[0.04] to-transparent p-5 ring-1 ring-accent/10">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-semibold text-foreground">{group.label}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
        </div>
        <Link
          href={group.href}
          onClick={onNavigate}
          className="group/cta inline-flex items-center gap-1.5 self-start rounded-pill bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-chip ring-1 ring-border/50 transition-shadow hover:shadow-pill"
        >
          {group.cta}
          <ArrowUpRight className="size-4 text-accent transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      {featured.length ? (
        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-2">
          <div>
            <p className={colHeading}>Browse</p>
            <ul className="grid gap-1">
              {primary.map((item) => (
                <li key={item.href}>
                  <PanelLink item={item} pathname={pathname} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-border/50 pl-2">
            <p className={colHeading}>Case studies</p>
            <ul className="grid gap-1">
              {featured.map((item) => (
                <li key={item.href}>
                  <PanelLink item={item} pathname={pathname} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ul className="grid content-start grid-cols-2 gap-1 xl:grid-cols-3">
          {group.items.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              <PanelLink item={item} pathname={pathname} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Desktop mega-menu. One shared open state for the whole bar, so exactly one panel can be open:
 * hover opens (with a short intent delay) and switches instantly between groups; leaving the bar
 * closes after a grace period; click and Enter/Space toggle; ArrowDown enters the panel; Left/Right
 * move between triggers; Escape, outside clicks, focus leaving the nav, and navigation all close it.
 */
function DesktopMenu({ pathname, activeGroup, navRef }: { pathname: string; activeGroup?: string; navRef: React.RefObject<HTMLElement> }) {
  const [openLabel, setOpenLabel] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState(0);
  const openTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const hoverOpenedAt = React.useRef(0);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = React.useState<number | "auto">("auto");

  const openGroup = openLabel ? navGroups.find((g) => g.label === openLabel) ?? null : null;
  const indexOf = (label: string | null) => navGroups.findIndex((g) => g.label === label);

  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
  };
  const openRef = React.useRef<string | null>(null);
  openRef.current = openLabel;
  const show = React.useCallback((label: string) => {
    clearTimers();
    const prev = openRef.current;
    if (prev === label) return;
    // Direction drives the content slide: moving right slides new content in from the right.
    setDirection(prev ? Math.sign(indexOf(label) - indexOf(prev)) : 0);
    setOpenLabel(label);
  }, []);
  const close = React.useCallback((focusTrigger?: string | null) => {
    clearTimers();
    setOpenLabel(null);
    if (focusTrigger) triggerRefs.current[focusTrigger]?.focus();
  }, []);
  const closeSoon = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY);
  };

  // Close on navigation.
  React.useEffect(() => close(), [pathname, close]);
  React.useEffect(() => () => clearTimers(), []);

  // Pointer leaving the whole nav bar (bar + panel) closes; re-entering cancels.
  // Outside pointerdown, Escape and focus leaving the nav close immediately.
  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && closeSoon();
    const onEnter = () => clearTimeout(closeTimer.current);
    nav.addEventListener("pointerleave", onLeave);
    nav.addEventListener("pointerenter", onEnter);
    return () => {
      nav.removeEventListener("pointerleave", onLeave);
      nav.removeEventListener("pointerenter", onEnter);
    };
  }, [navRef]);

  React.useEffect(() => {
    if (!openLabel) return;
    const nav = navRef.current;
    const onDown = (e: PointerEvent) => !nav?.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(openLabel);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && !nav?.contains(next)) close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    nav?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      nav?.removeEventListener("focusout", onFocusOut);
    };
  }, [openLabel, close, navRef]);

  // Animate the panel's height as its content changes between groups.
  React.useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPanelHeight(el.offsetHeight));
    ro.observe(el);
    setPanelHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, [openGroup]);

  const onTriggerKeyDown = (e: React.KeyboardEvent, label: string) => {
    const i = indexOf(label);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      show(label);
      requestAnimationFrame(() => requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()));
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = navGroups[(i + (e.key === "ArrowRight" ? 1 : navGroups.length - 1)) % navGroups.length].label;
      triggerRefs.current[next]?.focus();
      if (openLabel) show(next);
    }
  };

  const pillOn = openLabel ?? activeGroup;

  return (
    <>
      <ul className="hidden items-center gap-0.5 lg:flex">
        {navGroups.map((group) => {
          const isOpen = openLabel === group.label;
          const highlighted = pillOn === group.label;
          return (
            <li key={group.label}>
              <button
                ref={(el) => {
                  triggerRefs.current[group.label] = el;
                }}
                id={`nav-trigger-${group.label.toLowerCase()}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls="nav-panel"
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  clearTimers();
                  if (openLabel) show(group.label);
                  else
                    openTimer.current = setTimeout(() => {
                      hoverOpenedAt.current = Date.now();
                      show(group.label);
                    }, OPEN_DELAY);
                }}
                onPointerLeave={(e) => e.pointerType === "mouse" && clearTimeout(openTimer.current)}
                onClick={() => {
                  // A click straight after hover-open would feel like a no-op toggle-off; keep it open instead.
                  if (isOpen && Date.now() - hoverOpenedAt.current < 400) return;
                  if (isOpen) close();
                  else {
                    hoverOpenedAt.current = 0;
                    show(group.label);
                  }
                }}
                onKeyDown={(e) => onTriggerKeyDown(e, group.label)}
                className={cn(
                  "group relative flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors",
                  highlighted ? "text-foreground" : "text-subtle hover:text-foreground",
                )}
              >
                <span className="absolute inset-0 rounded-full bg-card/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                {highlighted ? (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-card shadow-pill ring-1 ring-border/40" transition={{ type: "spring", bounce: 0.18, duration: 0.45 }} />
                ) : null}
                <span className="relative">{group.label}</span>
                <ChevronDown aria-hidden className={cn("relative size-3.5 transition-transform duration-300", isOpen && "rotate-180 text-accent")} />
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {openGroup ? (
          // Anchored to <nav>: full navbar width. The top padding is an invisible hover bridge.
          <motion.div
            key="panel"
            className="absolute inset-x-0 top-full z-50 hidden pt-3 lg:block"
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985, transition: { duration: 0.16, ease: EASE } }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ transformOrigin: "top center" }}
          >
            <motion.div
              ref={panelRef}
              id="nav-panel"
              role="region"
              aria-labelledby={`nav-trigger-${openGroup.label.toLowerCase()}`}
              animate={{ height: panelHeight }}
              transition={{ duration: 0.32, ease: EASE }}
              className="overflow-hidden rounded-[24px] bg-background/[0.985] shadow-raised ring-1 ring-border/60 backdrop-blur-xl"
            >
              <div ref={contentRef}>
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={openGroup.label}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d * 24 }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.26, ease: EASE }}
                  >
                    <PanelContent group={openGroup} pathname={pathname} onNavigate={() => close()} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const navRef = React.useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = React.useState<string | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setMobileGroupOpen(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const activeGroup = navGroups.find((g) => matchesGroup(g, pathname))?.label;
  const solid = scrolled || open;
  // Once scrolled, the desktop bar tightens into a compact centred pill (as in the original design).
  const compact = scrolled && !open;

  return (
    // Page-load entrance: the bar springs down into place. layoutRoot keeps the sliding nav pill
    // measured correctly inside this fixed element.
    <motion.header
      layoutRoot
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.1, duration: 2, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-2.5 pt-2 lg:px-3 lg:pt-4"
    >
      <nav
        ref={navRef}
        aria-label="Main"
        className={cn(
          // Same width animation as the original design: 1200px bar -> 880px centred pill, 500ms ease-out-expo.
          "relative flex w-full max-w-[1200px] flex-col rounded-[27px] p-1.5 transition-[max-width,background-color,box-shadow,backdrop-filter] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          solid ? "bg-card/70 shadow-nav ring-1 ring-border/40 backdrop-blur-md" : "bg-card/0",
          compact && "lg:max-w-[880px]",
          open && "bg-card/[0.97]",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center lg:flex-1">
            <Link href="/" className="rounded-3xl px-2 py-1.5" aria-current={pathname === "/" ? "page" : undefined}>
              {/* In the compact pill only the mark shows, so everything fits the 880px width. */}
              <Logo interactive collapsed={compact} priority />
            </Link>
          </div>

          <DesktopMenu pathname={pathname} activeGroup={activeGroup} navRef={navRef} />

          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            <ThemeToggle />
            {/* Folds away in the compact pill and on narrow desktops, where the bar needs the room. */}
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              aria-hidden={compact || undefined}
              tabIndex={compact ? -1 : undefined}
              className={cn(
                "hidden overflow-hidden whitespace-nowrap rounded-full py-2 text-sm font-semibold text-subtle transition-[max-width,padding,opacity,color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-foreground xl:block",
                compact ? "pointer-events-none max-w-0 px-0 opacity-0" : "max-w-[100px] px-3 opacity-100",
              )}
            >
              Contact
            </Link>
            <Button asChild variant="accent">
              <a {...bookingLinkProps}>Book a Discovery Call</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            {/* Hamburger: two bars morph into an X */}
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-11 shrink-0 place-items-center rounded-full bg-card shadow-chip ring-1 ring-border/50"
            >
              <motion.span className="absolute h-0.5 w-[18px] rounded-full bg-foreground" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.3, ease: EASE }} />
              <motion.span className="absolute h-0.5 w-[18px] rounded-full bg-foreground" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.3, ease: EASE }} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex max-h-[calc(100dvh-84px)] flex-col">
                <ul className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-1 pb-2 pt-3 sm:px-2">
                  {navGroups.map((group, i) => {
                    const expanded = mobileGroupOpen === group.label;
                    return (
                      <motion.li key={group.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.08, duration: 0.4, ease: EASE }}>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={`mobile-${group.label.toLowerCase()}`}
                          onClick={() => setMobileGroupOpen((c) => (c === group.label ? null : group.label))}
                          className={cn(
                            "flex min-h-12 w-full items-center justify-between rounded-2xl px-3 font-display text-lg font-semibold transition-colors active:bg-card",
                            activeGroup === group.label ? "text-accent" : "text-foreground",
                            expanded && "bg-card shadow-chip",
                          )}
                        >
                          {group.label}
                          <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded ? (
                            <motion.div
                              id={`mobile-${group.label.toLowerCase()}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.32, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <p className="px-3 pb-1 pt-3 text-sm text-muted-foreground">{group.description}</p>
                              <ul className="grid grid-cols-1 gap-0.5 py-1 sm:grid-cols-2">
                                {group.items.map((item) => {
                                  const current = pathname === item.href;
                                  return (
                                    <li key={`${item.label}-${item.href}`}>
                                      <Link
                                        href={item.href}
                                        aria-current={current ? "page" : undefined}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                          "flex min-h-12 items-center gap-3 rounded-2xl px-2 py-1.5 text-[0.9375rem] font-medium leading-snug text-subtle active:bg-card",
                                          current && "bg-card text-foreground",
                                        )}
                                      >
                                        <ItemIcon href={item.href} className="size-8 rounded-lg" />
                                        {item.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                              <Link href={group.href} onClick={() => setOpen(false)} className="mx-2 mb-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent">
                                {group.cta} <ArrowUpRight className="size-4" aria-hidden />
                              </Link>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                  <motion.li initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * navGroups.length + 0.08, duration: 0.4, ease: EASE }}>
                    <Link href="/contact" onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-2xl px-3 font-display text-lg font-semibold text-foreground active:bg-card">
                      Contact
                    </Link>
                  </motion.li>
                </ul>
                {/* Primary action stays pinned at the bottom of the sheet */}
                <div className="border-t border-border/50 p-2 pt-3">
                  <Button asChild variant="accent" size="lg" className="w-full">
                    <a {...bookingLinkProps} onClick={() => setOpen(false)}>
                      Book a Discovery Call
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
