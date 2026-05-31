import { getSocket } from "../../socket/socket";
import {
  AiWsEvents,
  WsAiSmartReplyRequestPayload,
} from "../../socket/aiEvents";
import { useAISmartReplyStore } from "../../store/useAISmartReplyStore";
import { useChatStore } from "../../store/useChatStore";

/**
 * A2 — Smart Reply service. Ported 1:1 from Frontend_mobile
 * `src/services/ai/SmartReplyService.ts` against the SAME backend.
 *
 * Contract (see `../../socket/aiEvents.ts`, mirrored from the BE):
 *   - emit  `ai:smart-reply:request`  { conversation_id, last_message_id,
 *           last_message_body }  — ack `{ status: 'queued' }` on success, or an
 *           `{ error }` field if the gateway throws.
 *   - result arrives async on `ai:smart-reply:result` (handled in `ai.action.ts`).
 *
 * On AI failure the BE returns `suggestions: []` with NO error event, so the
 * only client-side error signals are the ack `error` and the 20s timeout below.
 *
 * Web deviations from mobile (documented):
 *   - Mobile calls `ensureFreshSocketAuth()` first; web has no such helper, so
 *     it is SKIPPED — the socket is already authenticated at handshake.
 *   - Messages are read from `useChatStore.messagesByConversation` (UiMessage:
 *     `messageId` / `body`, valid = `!isDeleted && !removed`) instead of mobile's
 *     `useMessagesStore` (`serverMessageId` / `text`, `deletedFor` / `isRevoked`).
 */
export interface SmartReplyOptions {
  conversationId: string;
  userId: string;
  /** How many recent messages to scan to locate the last VALID one. */
  messageCount?: number;
}

const SMART_REPLY_TIMEOUT_MS = 20000;

export class SmartReplyService {
  async requestSmartReply(options: SmartReplyOptions): Promise<void> {
    const { conversationId, messageCount = 10 } = options;

    // 1. Safety net: if no result/ack arrives, drop the loading flag so the UI
    //    never spins forever (the BE may silently return [] with no event).
    const loadingTimeout = setTimeout(() => {
      useAISmartReplyStore.getState().setLoading(conversationId, false);
    }, SMART_REPLY_TIMEOUT_MS);

    // 2. (mobile ensureFreshSocketAuth() — intentionally skipped on web.)

    // 3. Need a live socket; otherwise abort cleanly (no spinner left behind).
    const socket = getSocket();
    if (!socket || !socket.connected) {
      clearTimeout(loadingTimeout);
      useAISmartReplyStore.getState().setLoading(conversationId, false);
      return;
    }

    // 4. Enter loading, clear any stale error.
    useAISmartReplyStore.getState().setLoading(conversationId, true);
    useAISmartReplyStore.getState().setError(conversationId, null);

    // 5. Locate the LAST valid message among the recent `messageCount`. The
    //    messages are used ONLY to find this anchor — they are NOT sent as
    //    context (the BE pulls its own context).
    const messages =
      useChatStore.getState().messagesByConversation[conversationId] || [];
    const recentMessages = messages.slice(-messageCount);
    const validMessages = recentMessages.filter(
      (m) => !m.isDeleted && !m.removed
    );
    const lastMsg = validMessages[validMessages.length - 1];
    const lastMessageId = lastMsg?.messageId || "";
    const lastMessageBody = lastMsg?.body || "";

    const payload: WsAiSmartReplyRequestPayload = {
      conversation_id: conversationId,
      last_message_id: lastMessageId,
      last_message_body: lastMessageBody,
    };

    // 6. Emit with an ack callback. Success ack (`{ status: 'queued' }`) needs no
    //    action — the result comes later on `ai:smart-reply:result`. Only an
    //    `{ error }` ack is terminal here.
    socket.emit(AiWsEvents.AiSmartReplyRequest, payload, (ack: { error?: string } | undefined) => {
      clearTimeout(loadingTimeout);
      if (ack?.error) {
        useAISmartReplyStore.getState().setError(conversationId, ack.error);
        useAISmartReplyStore.getState().setLoading(conversationId, false);
      }
    });
  }

  clearSuggestions(conversationId: string): void {
    useAISmartReplyStore.getState().clearSuggestions(conversationId);
  }

  getSuggestions(conversationId: string): string[] {
    return useAISmartReplyStore.getState().getSuggestions(conversationId);
  }

  isLoading(conversationId: string): boolean {
    return useAISmartReplyStore.getState().isLoading(conversationId);
  }
}

export const smartReplyService = new SmartReplyService();
