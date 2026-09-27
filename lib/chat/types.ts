export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** Epoch ms. */
  createdAt: number;
  /** Suggested follow-ups shown as chips under an assistant message. */
  quickReplies?: string[];
};

export type ChatEvent =
  | { type: "typing" }
  | { type: "token"; value: string }
  | { type: "done"; quickReplies?: string[] }
  | { type: "error"; message: string };

/**
 * Anything that can answer a conversation. Swap the mock for a real backend by implementing this
 * interface (e.g. a WebSocket, Server-Sent Events, or a fetch() to an /api/chat route that streams).
 */
export interface ChatTransport {
  send(history: ChatMessage[], onEvent: (event: ChatEvent) => void, signal: AbortSignal): Promise<void>;
}
