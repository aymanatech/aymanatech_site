"use client";

import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

/** Current theme; `null` during SSR/hydration so the UI never renders a mismatched icon. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, getTheme, () => null);
  return { theme, setTheme };
}
