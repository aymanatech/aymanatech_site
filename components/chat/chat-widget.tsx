"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, RotateCcw, Square, X } from "lucide-react";
import type { ChatMessage, ChatTransport } from "@/lib/chat/types";
import { mockTransport, welcomeMessage } from "@/lib/chat/mock-transport";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "aymana-chat";
export const OPEN_CHAT_EVENT = "aymana:open-chat";

/** Open the chat from anywhere: `window.dispatchEvent(new Event(OPEN_CHAT_EVENT))`. */
export const openChat = () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT));

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const uid = () => Math.random().toString(36).slice(2, 10);

/** Renders `[label](href)` links inside a message; internal paths use next/link. */
function MessageText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <React.Fragment key={i}>{part}</React.Fragment>;
        const [, label, href] = m;
        const cls = "font-semibold underline decoration-current/40 underline-offset-2 hover:decoration-current";
        return href.startsWith("/") ? (
          <Link key={i} href={href} onClick={onNavigate} className={cls}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        );
      })}
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

/**
 * Floating chat trigger + sliding sidebar. Messages stream in token by token from a `ChatTransport`
 * (a local mock by default: pass a WebSocket/SSE transport to go live). History persists per tab session.
 */
export function ChatWidget({ transport = mockTransport }: { transport?: ChatTransport }) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [draft, setDraft] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "typing" | "streaming">("idle");
  const [unread, setUnread] = React.useState(0);
  const [teaser, setTeaser] = React.useState(false);

  const openRef = React.useRef(open);
  openRef.current = open;
  const abortRef = React.useRef<AbortController | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();

  // Restore the session's conversation (after mount, so SSR and first render match).
  React.useEffect(() => {
    let restored: ChatMessage[] | null = null;
    try {
      restored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    } catch {
      /* ignore corrupt storage */
    }
    setMessages(restored?.length ? restored : [welcomeMessage()]);
    // A one-time nudge after 12s, once per session.
    if (!sessionStorage.getItem(`${STORAGE_KEY}-teased`)) {
      const t = setTimeout(() => {
        if (!openRef.current) setTeaser(true);
        sessionStorage.setItem(`${STORAGE_KEY}-teased`, "1");
      }, 12000);
      return () => clearTimeout(t);
    }
  }, []);

  React.useEffect(() => {
    if (!messages.length || status !== "idle") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-60)));
    } catch {
      /* storage full or disabled */
    }
  }, [messages, status]);

  // Keep the newest message in view while streaming, unless the visitor scrolled up to read.
  const nearBottom = React.useRef(true);
  React.useEffect(() => {
    const el = listRef.current;
    if (el && nearBottom.current) el.scrollTo({ top: el.scrollHeight, behavior: status === "streaming" ? "auto" : "smooth" });
  }, [messages, status, open]);

  const openDrawer = React.useCallback(() => {
    setOpen(true);
    setUnread(0);
    setTeaser(false);
  }, []);
  const closeDrawer = React.useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  React.useEffect(() => {
    window.addEventListener(OPEN_CHAT_EVENT, openDrawer);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openDrawer);
  }, [openDrawer]);

  // Focus the input on open; Escape closes; lock page scroll only where the drawer is full-screen.
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    const small = window.matchMedia("(max-width: 639px)").matches;
    if (small) document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      if (small) document.body.style.overflow = "";
    };
  }, [open, closeDrawer]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (raw: string) => {
    const content = raw.trim();
    if (!content || status !== "idle") return;
    const userMsg: ChatMessage = { id: uid(), role: "user", content, createdAt: Date.now() };
    const replyId = uid();
    const history = [...messages, userMsg];
    setMessages(history);
    setDraft("");
    nearBottom.current = true;
    setStatus("typing");

    const controller = new AbortController();
    abortRef.current = controller;
    let started = false;
    try {
      await transport.send(
        history,
        (event) => {
          if (event.type === "token") {
            if (!started) {
              started = true;
              setStatus("streaming");
              setMessages((m) => [...m, { id: replyId, role: "assistant", content: event.value, createdAt: Date.now() }]);
            } else {
              setMessages((m) => m.map((msg) => (msg.id === replyId ? { ...msg, content: msg.content + event.value } : msg)));
            }
          } else if (event.type === "done") {
            setMessages((m) => m.map((msg) => (msg.id === replyId ? { ...msg, quickReplies: event.quickReplies } : msg)));
            if (!openRef.current) setUnread((n) => n + 1);
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        },
        controller.signal,
      );
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((m) => [
          ...m,
          { id: uid(), role: "assistant", content: `Sorry, that didn't send. Please try again, or email ${site.email}.`, createdAt: Date.now() },
        ]);
      }
    } finally {
      abortRef.current = null;
      setStatus("idle");
    }
  };

  const stop = () => abortRef.current?.abort();
  const reset = () => {
    stop();
    setMessages([welcomeMessage()]);
    inputRef.current?.focus();
  };

  // Auto-grow the textarea up to ~5 lines.
  React.useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [draft]);

  const busy = status !== "idle";
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const closeOnSmall = () => window.matchMedia("(max-width: 639px)").matches && setOpen(false);

  return (
    <>
      {/* Trigger */}
      <div
        className={cn(
          "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[75] flex items-end gap-3 transition-[opacity,transform] duration-300 sm:bottom-6 sm:right-6",
          open ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100",
        )}
      >
        {teaser && !open ? (
          <div className="relative mb-2 hidden max-w-[240px] animate-in fade-in slide-in-from-bottom-2 rounded-2xl rounded-br-md bg-card px-4 py-3 text-sm text-foreground shadow-raised ring-1 ring-border/50 xs:block">
            Questions about a project? Ask me anything.
            <button
              type="button"
              onClick={() => setTeaser(false)}
              aria-label="Dismiss message"
              className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-card text-muted-foreground shadow-chip ring-1 ring-border/60 hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        ) : null}
        <button
          ref={triggerRef}
          type="button"
          onClick={openDrawer}
          aria-label={unread ? `Open chat, ${unread} new message${unread > 1 ? "s" : ""}` : "Open chat"}
          aria-expanded={open}
          aria-controls="chat-drawer"
          tabIndex={open ? -1 : 0}
          className="group relative grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-raised transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span aria-hidden className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-ping [animation-duration:2.4s]" />
          <MessageCircle className="relative size-6 transition-transform duration-300 group-hover:-rotate-12" aria-hidden />
          {unread ? (
            <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-background">
              {unread}
            </span>
          ) : null}
        </button>
      </div>

      {/* Backdrop (tablet and up it is only a light dim; the page stays usable) */}
      <div
        aria-hidden
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-[79] bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 sm:bg-black/10 sm:backdrop-blur-0",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <section
        id="chat-drawer"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className={cn(
          "fixed inset-y-0 right-0 z-[80] flex w-full flex-col bg-background shadow-raised ring-1 ring-border/60 sm:inset-y-3 sm:right-3 sm:w-[400px] sm:overflow-hidden sm:rounded-panel",
          open ? "visible translate-x-0" : "invisible translate-x-[calc(100%+24px)]",
        )}
        // Visible immediately on open (so the input can take focus); hidden only after the slide-out ends.
        style={{ transition: `transform 500ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear ${open ? "0s" : "500ms"}` }}
      >
        <header className="flex items-center gap-3 border-b border-border/60 bg-card px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-background ring-1 ring-border/60">
            <LogoMark className="size-7 [&_img]:size-7" />
            <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-card" aria-hidden />
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <h2 id={titleId} className="truncate font-display text-base font-semibold">
              {site.name} assistant
            </h2>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              {status === "idle" ? "Online · replies instantly" : "Typing…"}
            </p>
          </div>
          <button type="button" onClick={reset} aria-label="Start a new conversation" title="New conversation" className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground">
            <RotateCcw className="size-[18px]" aria-hidden />
          </button>
          <button type="button" onClick={closeDrawer} aria-label="Close chat" className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground">
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation"
          onScroll={(e) => {
            const el = e.currentTarget;
            nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
          }}
          className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-5"
        >
          {messages.map((m) => {
            const mine = m.role === "user";
            return (
              <div key={m.id} className={cn("flex flex-col gap-1.5", mine ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap break-words px-4 py-2.5 text-[0.9375rem] leading-relaxed",
                    mine ? "rounded-2xl rounded-br-md bg-accent text-accent-foreground" : "rounded-2xl rounded-bl-md bg-card text-foreground shadow-chip ring-1 ring-border/50",
                  )}
                >
                  <span className="sr-only">{mine ? "You: " : "Assistant: "}</span>
                  <MessageText text={m.content} onNavigate={closeOnSmall} />
                </div>
                <time dateTime={new Date(m.createdAt).toISOString()} className="px-1 text-[11px] text-muted-foreground">
                  {timeFormat.format(m.createdAt)}
                </time>
                {!mine && m === lastAssistant && m.quickReplies?.length && !busy ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.quickReplies.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-pill bg-card px-3 py-1.5 text-sm font-medium text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          {status === "typing" ? (
            <div className="flex items-start">
              <div className="rounded-2xl rounded-bl-md bg-card px-4 py-2.5 shadow-chip ring-1 ring-border/50">
                <TypingDots />
              </div>
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="border-t border-border/60 bg-card px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
        >
          <div className="flex items-end gap-2 rounded-2xl bg-background p-1.5 ring-1 ring-border/70 transition-shadow focus-within:ring-2 focus-within:ring-accent/50">
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={1000}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              placeholder="Type your message…"
              className="max-h-[132px] min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-base leading-6 text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {busy ? (
              <button type="button" onClick={stop} aria-label="Stop reply" className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground text-background transition-transform active:scale-95">
                <Square className="size-3.5 fill-current" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition-[transform,opacity] active:scale-95 disabled:opacity-40"
              >
                <ArrowUp className="size-5" aria-hidden />
              </button>
            )}
          </div>
          <p className="px-1 pt-2 text-center text-[11px] text-muted-foreground">
            Automated answers. For a person, <Link href="/contact" onClick={closeOnSmall} className="underline underline-offset-2">contact the team</Link>.
          </p>
        </form>
      </section>
    </>
  );
}
