import { getSocket } from "../../socket/socket";
import { AiWsEvents } from "../../socket/aiEvents";
import { useAISummaryStore } from "../../store/useAISummaryStore";

const LOADING_TIMEOUT_MS = 20000; // 20s — matches mobile SummaryService.loadingTimeout

interface SummaryOptions {
  conversationId: string;
  /** Number of recent messages to include in the summary. Default 200 (mobile default). */
  messageCount?: number;
}

class SummaryService {
  /**
   * Emit `ai:summary:request` to the BE socket gateway.
   *
   * The BE handler is fire-and-forget (no ack): it publishes to Kafka and the
   * ai-core service eventually broadcasts `ai:summary:result` back. The result
   * handler in `ai.action.ts` calls `setSummary` + `setLoading(false)`.
   *
   * The 20s timeout is a safety net — it clears loading if no result arrives.
   * This matches mobile's SummaryService exactly (the result handler also clears
   * loading so the timer firing late is a safe no-op).
   */
  async requestSummary({ conversationId, messageCount = 200 }: SummaryOptions): Promise<void> {
    const store = useAISummaryStore.getState();

    const socket = getSocket();
    if (!socket || !socket.connected) return;

    store.setLoading(conversationId, true);
    store.setError(conversationId, null);

    setTimeout(() => {
      useAISummaryStore.getState().setLoading(conversationId, false);
    }, LOADING_TIMEOUT_MS);

    socket.emit(AiWsEvents.AiSummaryRequest, {
      conversation_id: conversationId,
      message_count: messageCount,
    });
  }
}

export const summaryService = new SummaryService();
