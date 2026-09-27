"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

/** Turns off transform animations site-wide for visitors who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
