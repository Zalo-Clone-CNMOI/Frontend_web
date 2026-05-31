import { create } from "zustand";

const SUMMARY_TTL_MS = 60 * 60 * 1000; // 1h — matches mobile SummaryService TTL

interface SummaryCache {
  summary: string;
  messageCount: number;
  hadUnread: boolean;
  truncated: boolean;
  cached: boolean;
  cachedAt: number;
}

interface AISummaryState {
  summaries: Record<string, SummaryCache>;
  loadingByConversation: Record<string, boolean>;
  errorByConversation: Record<string, string | null>;

  /**
   * Store a summary result. `meta` holds HTTP-only fields (hadUnread, truncated,
   * cached); they default to false when the result came from the socket path.
   */
  setSummary(
    conversationId: string,
    summary: string,
    messageCount: number,
    meta?: { hadUnread?: boolean; truncated?: boolean; cached?: boolean }
  ): void;
  /** Returns the cached entry, or null if missing or expired (TTL 1h). */
  getSummary(conversationId: string): SummaryCache | null;
  /** Drop the cached entry so the next catch-up fetches fresh data. */
  invalidate(conversationId: string): void;
  setLoading(conversationId: string, loading: boolean): void;
  isLoading(conversationId: string): boolean;
  setError(conversationId: string, error: string | null): void;
  getError(conversationId: string): string | null;
}

export const useAISummaryStore = create<AISummaryState>((set, get) => ({
  summaries: {},
  loadingByConversation: {},
  errorByConversation: {},

  setSummary(conversationId, summary, messageCount, meta = {}) {
    set((s) => ({
      summaries: {
        ...s.summaries,
        [conversationId]: {
          summary,
          messageCount,
          hadUnread: meta.hadUnread ?? false,
          truncated: meta.truncated ?? false,
          cached: meta.cached ?? false,
          cachedAt: Date.now(),
        },
      },
    }));
  },

  getSummary(conversationId) {
    const entry = get().summaries[conversationId];
    if (!entry) return null;
    if (Date.now() - entry.cachedAt > SUMMARY_TTL_MS) {
      set((s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [conversationId]: _removed, ...rest } = s.summaries;
        return { summaries: rest };
      });
      return null;
    }
    return entry;
  },

  invalidate(conversationId) {
    set((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [conversationId]: _removed, ...rest } = s.summaries;
      return { summaries: rest };
    });
  },

  setLoading(conversationId, loading) {
    set((s) => ({
      loadingByConversation: { ...s.loadingByConversation, [conversationId]: loading },
    }));
  },

  isLoading(conversationId) {
    return get().loadingByConversation[conversationId] ?? false;
  },

  setError(conversationId, error) {
    set((s) => ({
      errorByConversation: { ...s.errorByConversation, [conversationId]: error },
    }));
  },

  getError(conversationId) {
    return get().errorByConversation[conversationId] ?? null;
  },
}));
