import { create } from "zustand";

/**
 * A2 — Smart Reply store. Ported 1:1 from Frontend_mobile
 * `src/store/useAISmartReplyStore.ts`, with mobile's `Map<string, …>` swapped
 * for plain `Record<string, …>` to match the web codebase convention used by
 * `useChatStore` (`messagesByConversation`, etc.). No TTL — suggestions are
 * keyed per conversation and replaced/cleared explicitly.
 *
 * Web and mobile share one backend; the event/payload contract lives in
 * `../socket/aiEvents.ts`. This store only holds derived client state.
 */
interface AISmartReplyState {
  suggestionsByConversation: Record<string, string[]>;
  loadingByConversation: Record<string, boolean>;
  errorByConversation: Record<string, string | null>;

  setSuggestions(conversationId: string, suggestions: string[]): void;
  setLoading(conversationId: string, loading: boolean): void;
  setError(conversationId: string, error: string | null): void;
  clearSuggestions(conversationId: string): void;

  getSuggestions(conversationId: string): string[];
  isLoading(conversationId: string): boolean;
  getError(conversationId: string): string | null;
}

export const useAISmartReplyStore = create<AISmartReplyState>((set, get) => ({
  suggestionsByConversation: {},
  loadingByConversation: {},
  errorByConversation: {},

  setSuggestions: (conversationId, suggestions) =>
    set((state) => ({
      suggestionsByConversation: {
        ...state.suggestionsByConversation,
        [conversationId]: suggestions,
      },
    })),

  setLoading: (conversationId, loading) =>
    set((state) => ({
      loadingByConversation: {
        ...state.loadingByConversation,
        [conversationId]: loading,
      },
    })),

  setError: (conversationId, error) =>
    set((state) => ({
      errorByConversation: {
        ...state.errorByConversation,
        [conversationId]: error,
      },
    })),

  clearSuggestions: (conversationId) =>
    set((state) => {
      const next = { ...state.suggestionsByConversation };
      delete next[conversationId];
      return { suggestionsByConversation: next };
    }),

  getSuggestions: (conversationId) =>
    get().suggestionsByConversation[conversationId] || [],

  isLoading: (conversationId) =>
    get().loadingByConversation[conversationId] || false,

  getError: (conversationId) =>
    get().errorByConversation[conversationId] ?? null,
}));
