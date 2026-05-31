// Ported 1:1 from Frontend_mobile src/store/useEntityDetectionStore.ts
// Adaptation: Map<string,…> / Set<string> → Record<string,…> for plain-object
// Zustand state (matches web store conventions), timer pattern unchanged.
import { create } from "zustand";
import type { DetectedEntity } from "../socket/aiEvents";

export type { DetectedEntity };

/**
 * Entities arrive after a message renders (async LLM round-trip over Kafka + WS).
 * We mark a message "pending" so the bubble can show "✨ Analyzing…" instead of
 * looking empty. Self-clears two ways: (1) result arrives, or (2) timeout fires.
 *
 * ⚠️ COUPLING: must stay ≥ backend AI_ENTITY_DETECTION_TIMEOUT_MS (default 8000 ms,
 * see Backend libs/config app-config.ts). 8 s server + 2 s slack = 10 s.
 */
const PENDING_TIMEOUT_MS = 10_000;

// Timers are non-serializable → live outside reactive state; never trigger renders.
const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

function clearPendingTimer(messageId: string): void {
  const t = pendingTimers.get(messageId);
  if (t) {
    clearTimeout(t);
    pendingTimers.delete(messageId);
  }
}

interface EntityDetectionState {
  entitiesByMessage: Record<string, DetectedEntity[]>;
  pendingByMessage: Record<string, boolean>;

  getEntities(messageId: string): DetectedEntity[];
  setEntities(messageId: string, entities: DetectedEntity[]): void;
  clearEntities(messageId: string): void;
  markPending(messageId: string): void;
  isPending(messageId: string): boolean;
  clearAll(): void;
}

export const useEntityDetectionStore = create<EntityDetectionState>(
  (set, get) => ({
    entitiesByMessage: {},
    pendingByMessage: {},

    getEntities: (messageId) =>
      get().entitiesByMessage[messageId] ?? [],

    setEntities: (messageId, entities) => {
      clearPendingTimer(messageId);
      set((s) => {
        const entitiesByMessage = { ...s.entitiesByMessage, [messageId]: entities };
        const pendingByMessage = { ...s.pendingByMessage };
        delete pendingByMessage[messageId];
        return { entitiesByMessage, pendingByMessage };
      });
    },

    clearEntities: (messageId) => {
      clearPendingTimer(messageId);
      set((s) => {
        const entitiesByMessage = { ...s.entitiesByMessage };
        delete entitiesByMessage[messageId];
        const pendingByMessage = { ...s.pendingByMessage };
        delete pendingByMessage[messageId];
        return { entitiesByMessage, pendingByMessage };
      });
    },

    markPending: (messageId) => {
      if (!messageId) return;
      // Race: result already arrived before pending mark.
      if (get().entitiesByMessage[messageId] !== undefined) return;

      clearPendingTimer(messageId);
      pendingTimers.set(
        messageId,
        setTimeout(() => {
          pendingTimers.delete(messageId);
          set((s) => {
            if (!s.pendingByMessage[messageId]) return s;
            const pendingByMessage = { ...s.pendingByMessage };
            delete pendingByMessage[messageId];
            return { pendingByMessage };
          });
        }, PENDING_TIMEOUT_MS),
      );

      set((s) => {
        if (s.pendingByMessage[messageId]) return s;
        return { pendingByMessage: { ...s.pendingByMessage, [messageId]: true } };
      });
    },

    isPending: (messageId) => !!get().pendingByMessage[messageId],

    clearAll: () => {
      for (const t of pendingTimers.values()) clearTimeout(t);
      pendingTimers.clear();
      set({ entitiesByMessage: {}, pendingByMessage: {} });
    },
  }),
);
