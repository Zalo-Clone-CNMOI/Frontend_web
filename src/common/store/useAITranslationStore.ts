import { create } from "zustand";

const TRANSLATION_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h — matches mobile

/** Composite key: `${messageId}_${targetLang}`. */
export const translationCacheKey = (messageId: string, targetLang: string): string =>
  `${messageId}_${targetLang}`;

interface TranslationCache {
  original: string;
  translated: string;
  cachedAt: number;
}

interface AITranslationState {
  cache: Record<string, TranslationCache>;
  loadingByKey: Record<string, boolean>;
  errorByKey: Record<string, string | null>;

  setTranslation(messageId: string, targetLang: string, original: string, translated: string): void;
  /** Returns the cached entry, or null if missing or expired (TTL 24h). */
  getTranslation(messageId: string, targetLang: string): { original: string; translated: string } | null;
  setLoading(messageId: string, targetLang: string, loading: boolean): void;
  isLoading(messageId: string, targetLang: string): boolean;
  setError(messageId: string, targetLang: string, error: string | null): void;
  getError(messageId: string, targetLang: string): string | null;
}

export const useAITranslationStore = create<AITranslationState>((set, get) => ({
  cache: {},
  loadingByKey: {},
  errorByKey: {},

  setTranslation(messageId, targetLang, original, translated) {
    const key = translationCacheKey(messageId, targetLang);
    set((s) => ({
      cache: {
        ...s.cache,
        [key]: { original, translated, cachedAt: Date.now() },
      },
    }));
  },

  getTranslation(messageId, targetLang) {
    const key = translationCacheKey(messageId, targetLang);
    const entry = get().cache[key];
    if (!entry) return null;
    if (Date.now() - entry.cachedAt > TRANSLATION_CACHE_TTL) return null;
    return { original: entry.original, translated: entry.translated };
  },

  setLoading(messageId, targetLang, loading) {
    const key = translationCacheKey(messageId, targetLang);
    set((s) => ({ loadingByKey: { ...s.loadingByKey, [key]: loading } }));
  },

  isLoading(messageId, targetLang) {
    return get().loadingByKey[translationCacheKey(messageId, targetLang)] ?? false;
  },

  setError(messageId, targetLang, error) {
    const key = translationCacheKey(messageId, targetLang);
    set((s) => ({ errorByKey: { ...s.errorByKey, [key]: error } }));
  },

  getError(messageId, targetLang) {
    return get().errorByKey[translationCacheKey(messageId, targetLang)] ?? null;
  },
}));
