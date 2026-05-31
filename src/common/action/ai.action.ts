import { Socket } from "socket.io-client";
import { AiWsEvents } from "../socket/aiEvents";

/**
 * All AI server→client events this layer binds. Single source so register and
 * cleanup stay symmetric (no stale listeners after logout/reconnect).
 */
const AI_SERVER_EVENTS: string[] = [
  AiWsEvents.AiModerationResult,
  AiWsEvents.AiModerationEnforcement,
  AiWsEvents.AiSmartReplyResult,
  AiWsEvents.AiSummaryResult,
  AiWsEvents.AiTranslateResult,
  AiWsEvents.MessageEntities,
  AiWsEvents.AiZaiTyping,
  AiWsEvents.AiStreamChunk,
  AiWsEvents.AiStreamComplete,
];

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
  // Clear any previously-bound AI listeners before (re-)binding.
  unregisterAiSocketHandlers(socket);

  // Feature handlers (A1..B3) are registered below incrementally.
}

/**
 * Symmetric teardown for {@link registerAiSocketHandlers}. Called from
 * `cleanupChat()` so AI listeners (and the store closures they will capture in
 * A1..B3) are removed on logout/disconnect, mirroring the core chat teardown.
 */
export function unregisterAiSocketHandlers(socket: Socket): void {
  for (const event of AI_SERVER_EVENTS) {
    socket.off(event);
  }
}
