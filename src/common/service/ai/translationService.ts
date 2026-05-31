import { getSocket } from "../../socket/socket";
import { AiWsEvents } from "../../socket/aiEvents";
import { useAITranslationStore } from "../../store/useAITranslationStore";

const TRANSLATION_TIMEOUT_MS = 20000; // 20s — matches mobile TranslationService

interface TranslateOptions {
  conversationId: string;
  messageId: string;
  body: string;
  /** Defaults to 'vi' (same default as mobile). */
  targetLanguage?: string;
}

class TranslationService {
  /**
   * Emit `ai:translate:request` to the BE socket gateway.
   *
   * Deduplication: silently skips if the same messageId+lang is already loading
   * or has a valid cached result — matches mobile's TranslationService guard.
   *
   * The 20s timeout sets a visible error if no `ai:translate:result` arrives
   * (BE failure / Kafka issue). This differs from A2/A3 (which only clear
   * loading) because BE echoes the original text on AI failure — a silent echo
   * would look like a successful translation to the user, so a timeout-triggered
   * error is the only reliable signal.
   */
  async requestTranslation({
    conversationId,
    messageId,
    body,
    targetLanguage = "vi",
  }: TranslateOptions): Promise<void> {
    const store = useAITranslationStore.getState();

    // Dedup: skip if already loading or cache hit (TTL not expired)
    if (store.isLoading(messageId, targetLanguage)) return;
    if (store.getTranslation(messageId, targetLanguage)) return;

    const socket = getSocket();
    if (!socket || !socket.connected) {
      store.setError(messageId, targetLanguage, "no_socket");
      return;
    }

    store.setLoading(messageId, targetLanguage, true);
    store.setError(messageId, targetLanguage, null);

    const loadingTimeout = setTimeout(() => {
      const s = useAITranslationStore.getState();
      // Only set error if still loading (result may have arrived already)
      if (s.isLoading(messageId, targetLanguage)) {
        s.setLoading(messageId, targetLanguage, false);
        s.setError(messageId, targetLanguage, "timeout");
      }
    }, TRANSLATION_TIMEOUT_MS);

    socket.emit(
      AiWsEvents.AiTranslateRequest,
      {
        message_id: messageId,
        conversation_id: conversationId,
        body,
        target_language: targetLanguage,
        // source_language intentionally omitted — mobile does not send it
      },
      (ack: { error?: string } | undefined) => {
        if (ack?.error) {
          clearTimeout(loadingTimeout);
          useAITranslationStore.getState().setError(messageId, targetLanguage, ack.error);
          useAITranslationStore.getState().setLoading(messageId, targetLanguage, false);
        }
        // No clearTimeout on success — 20s safety net remains active until
        // ai:translate:result clears loading or timeout fires.
      }
    );
  }
}

export const translationService = new TranslationService();
