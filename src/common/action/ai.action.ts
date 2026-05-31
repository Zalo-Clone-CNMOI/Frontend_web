import { Socket } from "socket.io-client";
import { AiWsEvents } from "../socket/aiEvents";

/**
 * Central registration point for all AI-feature socket listeners.
 *
 * Called ONCE from `initChat()` after the core chat listeners are bound. Each AI
 * feature (A1 Moderation → B3 Zai Streaming) registers its server→client
 * listener here and routes the payload into that feature's Zustand store.
 *
 * The leading `socket.off(...)` block is the off-then-on idempotency pattern used
 * throughout `chat.action.tsx`: it clears any prior AI listeners before features
 * re-bind, so a re-init never stacks duplicate handlers.
 *
 * This replaces mobile's class-based `AIHandler` + `HandlerRegistry` with web's
 * existing central-`socket.on` pattern (documented deviation — same events,
 * same routing). Do NOT rename events/fields; see `../socket/aiEvents.ts`.
 *
 * Note: per-feature handlers that need the current user (e.g. A1 moderation
 * "your message was flagged") will widen this signature with `currentUserId`
 * when that phase lands.
 */
export function registerAiSocketHandlers(socket: Socket): void {
  // Clear any previously-bound AI listeners (server → client events only).
  socket.off(AiWsEvents.AiModerationResult);
  socket.off(AiWsEvents.AiModerationEnforcement);
  socket.off(AiWsEvents.AiSmartReplyResult);
  socket.off(AiWsEvents.AiSummaryResult);
  socket.off(AiWsEvents.AiTranslateResult);
  socket.off(AiWsEvents.MessageEntities);
  socket.off(AiWsEvents.AiZaiTyping);
  socket.off(AiWsEvents.AiStreamChunk);
  socket.off(AiWsEvents.AiStreamComplete);

  // Feature handlers (A1..B3) are registered below incrementally.
}
