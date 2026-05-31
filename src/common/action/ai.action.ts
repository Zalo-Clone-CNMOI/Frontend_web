import { Socket } from "socket.io-client";
import {
  AiWsEvents,
  WsAiModerationEnforcementPayload,
  WsAiModerationResultPayload,
} from "../socket/aiEvents";
import { useChatStore } from "../store/useChatStore";
import { toast } from "../store/useToastStore";
import i18n from "../i18n/i18n";

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

/* ───────────────────────── A1 — Moderation ─────────────────────────
 * Ported 1:1 from Frontend_mobile `services/socket/handlers/AIHandler.ts`.
 * Two server→client events (see BE `ws-gateway/.../ai-fanout.consumer.ts`):
 *  - ai:moderation:result      unicast to the sender when their message is
 *                              flagged (BE only emits when is_flagged === true)
 *  - ai:moderation:enforcement broadcast to the conversation room for every
 *                              enforcement outcome; the client must itself
 *                              filter to the outcomes that actually removed the
 *                              message (BE broadcasts not_flagged/failed too).
 */

/** Sender-only: your message was flagged (may or may not have been removed). */
function handleModerationResult(payload: WsAiModerationResultPayload): void {
  if (!payload?.is_flagged) return;
  toast.warning(i18n.t("CHAT.MODERATION_FLAGGED_TOAST"));
}

/** Room broadcast: a message was removed by moderation — soft-delete it locally. */
function handleModerationEnforcement(
  payload: WsAiModerationEnforcementPayload
): void {
  const conversationId = payload?.conversation_id;
  const messageId = payload?.message_id;
  if (!conversationId || !messageId) return;

  // Only act when the message was actually removed. The room receives every
  // enforcement outcome (not_flagged / failed / deduplicated …), so filter here
  // exactly as mobile does — otherwise we'd wrongly blank out clean messages.
  const outcome = payload?.outcome;
  if (outcome !== "deleted" && outcome !== "already_deleted") return;

  useChatStore.getState().updateMessage(conversationId, messageId, {
    removed: true,
    removalReason: payload?.reason || "ai_moderation",
  });
  toast.info(i18n.t("CHAT.MODERATION_REMOVED_TOAST"));
}

/**
 * Central registration point for all AI-feature socket listeners.
 *
 * Called ONCE from `initChat()` after the core chat listeners are bound. Each AI
 * feature (A1 Moderation → B3 Zai Streaming) registers its server→client
 * listener here and routes the payload into that feature's Zustand store.
 *
 * The leading `unregisterAiSocketHandlers(socket)` is the off-then-on idempotency
 * pattern used throughout `chat.action.tsx`: it clears any prior AI listeners
 * before (re-)binding, so a re-init never stacks duplicate handlers.
 *
 * This replaces mobile's class-based `AIHandler` + `HandlerRegistry` with web's
 * existing central-`socket.on` pattern (documented deviation — same events,
 * same routing). Do NOT rename events/fields; see `../socket/aiEvents.ts`.
 */
export function registerAiSocketHandlers(socket: Socket): void {
  // Clear any previously-bound AI listeners before (re-)binding.
  unregisterAiSocketHandlers(socket);

  // ── A1 Moderation ──
  socket.on(AiWsEvents.AiModerationResult, handleModerationResult);
  socket.on(AiWsEvents.AiModerationEnforcement, handleModerationEnforcement);

  // Feature handlers A2..B3 are registered below incrementally.
}

/**
 * Symmetric teardown for {@link registerAiSocketHandlers}. Called from
 * `cleanupChat()` so AI listeners (and the store closures they capture) are
 * removed on logout/disconnect, mirroring the core chat teardown.
 */
export function unregisterAiSocketHandlers(socket: Socket): void {
  for (const event of AI_SERVER_EVENTS) {
    socket.off(event);
  }
}
