// Ported from Frontend_mobile src/store/useZaiChatStore.ts
// Adaptations (documented):
//   1. Map → Record (web Zustand convention, functionally identical)
//   2. Chunk field: mobile uses legacy `chunk` string; BE contract uses
//      `content` + `chunk_index` for ordering. Web follows the BE contract.
//   3. **Stall watchdog added (documented deviation)**: BE sends NO terminal
//      event on stream break or cancel. Mobile has no watchdog either — this
//      is a gap in both. Client stall-timeout of 30s auto-clears a broken
//      stream so the UI never stays frozen. Mirrors BE AI_ENTITY_DETECTION_TIMEOUT_MS
//      pattern but applied to streaming (not a copy — original addition).
import { create } from "zustand";

interface StreamingState {
  streamId: string;
  /** Ordered by chunk_index — join ascending for display text. */
  chunks: Record<number, string>;
  complete: boolean;
}

// ⚠️ STALL WATCHDOG (documented deviation from mobile):
// BE sends no terminal event on stream break or after cancel.
// After STALL_TIMEOUT_MS with no new chunk, auto-clear the stream so the UI
// doesn't stay frozen. Resets on every chunk arrival.
const STALL_TIMEOUT_MS = 30_000;

// Timers are non-serializable → live outside reactive state.
const stallTimers = new Map<string, ReturnType<typeof setTimeout>>();

function clearStallTimer(conversationId: string): void {
  const t = stallTimers.get(conversationId);
  if (t) {
    clearTimeout(t);
    stallTimers.delete(conversationId);
  }
}

interface ZaiChatState {
  zaiTypingByConversation: Record<string, boolean>;
  streamingByConversation: Record<string, StreamingState>;

  setZaiTyping(conversationId: string, isTyping: boolean): void;
  isZaiTyping(conversationId: string): boolean;
  /**
   * Append a chunk. Resets the 30s stall watchdog on every call.
   * If the incoming `streamId` differs from the current stream, replaces it
   * (new stream started before the old one completed).
   */
  addStreamChunk(
    conversationId: string,
    streamId: string,
    chunkIndex: number,
    content: string,
  ): void;
  completeStream(conversationId: string, streamId: string): void;
  /** Returns accumulated text (sorted by chunk_index), or null if no chunks yet. */
  getStreamingText(conversationId: string): string | null;
  /** True while stream is running (chunks arriving but complete not yet received). */
  isStreamActive(conversationId: string): boolean;
  /** Immediately removes all streaming state for the conversation (cancel/finish). */
  clearStreaming(conversationId: string): void;
  clearAll(): void;
}

export const useZaiChatStore = create<ZaiChatState>((set, get) => ({
  zaiTypingByConversation: {},
  streamingByConversation: {},

  setZaiTyping: (conversationId, isTyping) =>
    set((s) => {
      const zaiTypingByConversation = { ...s.zaiTypingByConversation };
      if (isTyping) {
        zaiTypingByConversation[conversationId] = true;
      } else {
        delete zaiTypingByConversation[conversationId];
      }
      return { zaiTypingByConversation };
    }),

  isZaiTyping: (conversationId) =>
    !!get().zaiTypingByConversation[conversationId],

  addStreamChunk: (conversationId, streamId, chunkIndex, content) => {
    // Reset stall watchdog — chunk arrived, stream is alive.
    clearStallTimer(conversationId);
    stallTimers.set(
      conversationId,
      setTimeout(() => {
        stallTimers.delete(conversationId);
        // Stream stalled — clear to unblock the UI.
        get().clearStreaming(conversationId);
      }, STALL_TIMEOUT_MS),
    );

    set((s) => {
      const current = s.streamingByConversation[conversationId];
      // Different stream_id → a new stream started; replace previous state.
      const base: StreamingState =
        current?.streamId === streamId
          ? current
          : { streamId, chunks: {}, complete: false };

      return {
        streamingByConversation: {
          ...s.streamingByConversation,
          // Immutable update: new object reference so selectors re-render.
          [conversationId]: {
            ...base,
            chunks: { ...base.chunks, [chunkIndex]: content },
          },
        },
      };
    });
  },

  completeStream: (conversationId, streamId) => {
    clearStallTimer(conversationId);
    set((s) => {
      const current = s.streamingByConversation[conversationId];
      // Guard: ignore complete for a different (stale) stream_id.
      if (!current || current.streamId !== streamId) return s;
      // W2: remove immediately on complete — bar is already unmounted at this
      // point (isStreamActive → false unmounts ZaiStreamBar), so the completed
      // text is not needed in the store. Prevents unbounded memory growth across
      // multiple Zai sessions.
      const streamingByConversation = { ...s.streamingByConversation };
      delete streamingByConversation[conversationId];
      return { streamingByConversation };
    });
  },

  getStreamingText: (conversationId) => {
    const stream = get().streamingByConversation[conversationId];
    if (!stream) return null;
    const indices = Object.keys(stream.chunks)
      .map(Number)
      .sort((a, b) => a - b);
    if (indices.length === 0) return null;
    return indices.map((i) => stream.chunks[i]).join("");
  },

  isStreamActive: (conversationId) => {
    const stream = get().streamingByConversation[conversationId];
    return !!stream && !stream.complete;
  },

  clearStreaming: (conversationId) => {
    clearStallTimer(conversationId);
    set((s) => {
      const streamingByConversation = { ...s.streamingByConversation };
      delete streamingByConversation[conversationId];
      return { streamingByConversation };
    });
  },

  clearAll: () => {
    for (const t of stallTimers.values()) clearTimeout(t);
    stallTimers.clear();
    set({ zaiTypingByConversation: {}, streamingByConversation: {} });
  },
}));
