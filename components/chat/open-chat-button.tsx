"use client";

import { MessageCircle } from "lucide-react";
import { openChat } from "@/components/chat/chat-widget";

/** Opens the live chat drawer from anywhere on the page. */
export function OpenChatButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openChat} className={className}>
      <span className="chip-surface grid size-11 shrink-0 place-items-center rounded-full shadow-chip">
        <MessageCircle className="size-5 text-accent" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col text-left">
        <span className="text-sm font-semibold text-muted-foreground">Live chat</span>
        <span className="font-medium text-foreground">Ask a quick question now</span>
      </span>
    </button>
  );
}
