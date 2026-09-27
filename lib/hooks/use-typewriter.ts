"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** ms per typed character (±40% human-like jitter is added). */
  typeSpeed?: number;
  /** ms per deleted character. */
  deleteSpeed?: number;
  /** ms to hold a finished phrase before deleting. */
  holdTime?: number;
  /** ms to wait on an empty line before typing the next phrase. */
  gapTime?: number;
  /** When false the loop pauses (e.g. hero scrolled out of view). */
  active?: boolean;
};

/**
 * Types each phrase letter by letter, holds, backspaces, and loops forever.
 * Starts with the first phrase fully shown, so the server-rendered HTML already reads correctly.
 */
export function useTypewriter(phrases: readonly string[], { typeSpeed = 70, deleteSpeed = 38, holdTime = 2200, gapTime = 380, active = true }: Options = {}) {
  const [text, setText] = useState(phrases[0] ?? "");
  const [isTyping, setIsTyping] = useState(false);
  // The loop's source of truth lives in a ref so each step reads the latest values synchronously.
  const state = useRef({ index: 0, text: phrases[0] ?? "", phase: "holding" as "typing" | "holding" | "deleting" | "gap" });

  useEffect(() => {
    if (!active || phrases.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (ms: number) => (timer = setTimeout(tick, ms));

    function tick() {
      const s = state.current;
      const phrase = phrases[s.index];
      if (s.phase === "holding") {
        s.phase = "deleting";
        setIsTyping(true);
        schedule(deleteSpeed);
      } else if (s.phase === "deleting") {
        s.text = s.text.slice(0, -1);
        setText(s.text);
        if (s.text) schedule(deleteSpeed);
        else {
          s.phase = "gap";
          schedule(gapTime);
        }
      } else if (s.phase === "gap") {
        s.index = (s.index + 1) % phrases.length;
        s.phase = "typing";
        schedule(typeSpeed);
      } else {
        s.text = phrase.slice(0, s.text.length + 1);
        setText(s.text);
        if (s.text === phrase) {
          s.phase = "holding";
          setIsTyping(false);
          schedule(holdTime);
        } else {
          schedule(typeSpeed * (0.6 + Math.random() * 0.8));
        }
      }
    }

    // Resume where we left off (e.g. after the hero scrolls back into view).
    schedule(state.current.phase === "holding" ? holdTime : typeSpeed);
    return () => clearTimeout(timer);
  }, [active, phrases, typeSpeed, deleteSpeed, holdTime, gapTime]);

  return { text, isTyping };
}
