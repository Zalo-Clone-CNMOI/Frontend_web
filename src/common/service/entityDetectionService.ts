/**
 * entityDetectionService
 *
 * Restores entity highlights from the BFF after a page reload or
 * leave-and-return to a conversation. The live WebSocket fanout only delivers
 * NEW detections; this call hydrates historical ones from persistent storage.
 *
 * Contract: hydrateConversation NEVER throws — it is called fire-and-forget
 * (void) from openConversation and must not break chat initialisation.
 */

import http from "../api/http";
import { API } from "../api/path";
import { useEntityDetectionStore } from "../store/useEntityDetectionStore";
import type { DetectedEntity } from "../socket/aiEvents";

interface EntityDetectionItem {
  message_id: string | number | null | undefined;
  entities: DetectedEntity[];
}

interface EntityDetectionsResponse {
  items: EntityDetectionItem[];
}

export const entityDetectionService = {
  /**
   * Fetches all persisted entity detections for the given conversation and
   * writes them into the Zustand store.
   *
   * - Best-effort: swallows ALL errors (network, parse, store write).
   * - Idempotent: calling multiple times only updates the store with the
   *   latest server values.
   * - Key normalisation: message_id is coerced via String() to match the
   *   string keys produced by normalizeMessage elsewhere in the codebase.
   */
  async hydrateConversation(conversationId: string): Promise<void> {
    try {
      const res = await http.get<EntityDetectionsResponse>(
        `${API.API_ENTITY_DETECTIONS}?conversation_id=${encodeURIComponent(conversationId)}`
      );

      if (!res?.ok) return;

      const items = res?.payload?.data?.items ?? res?.payload?.items;
      if (!Array.isArray(items)) return;

      const store = useEntityDetectionStore.getState();

      for (const item of items) {
        // Skip items without a valid message_id
        if (item?.message_id == null) continue;

        const messageId = String(item.message_id);
        const entities = Array.isArray(item.entities) ? item.entities : [];

        store.setEntities(messageId, entities);
      }
    } catch {
      // Intentionally swallowed — best-effort hydration must never surface
      // errors to callers (openConversation uses void / fire-and-forget).
    }
  },
};
