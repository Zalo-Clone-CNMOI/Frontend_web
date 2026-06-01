// Ported 1:1 from Frontend_mobile src/store/useEntityInfoStore.ts
// Adaptation: Map → Record for plain-object Zustand state (web convention).
import { create } from "zustand";
import type { EntityInfoLang, EntityInfoResponse, EntityType } from "../service/ai/entityInfo.types";

// Mirror the BFF's 7-day server cache so we don't refetch within the window.
export const ENTITY_INFO_TTL = 7 * 24 * 60 * 60 * 1000;

export const entityInfoKey = (
  type: EntityType,
  text: string,
  lang: EntityInfoLang,
): string => `${type}:${text}:${lang}`;

interface EntityInfoCacheEntry {
  data: EntityInfoResponse;
  cachedAt: number;
}

interface EntityInfoState {
  cache: Record<string, EntityInfoCacheEntry>;
  loadingByKey: Record<string, boolean>;
  errorByKey: Record<string, string | null>;

  get(key: string): EntityInfoResponse | null;
  set(key: string, data: EntityInfoResponse): void;
  isLoading(key: string): boolean;
  getError(key: string): string | null;
  setLoading(key: string, loading: boolean): void;
  setError(key: string, error: string | null): void;
}

export const useEntityInfoStore = create<EntityInfoState>((set, get) => ({
  cache: {},
  loadingByKey: {},
  errorByKey: {},

  // Pure read — safe to call inside selectors/render.
  get: (key) => {
    const entry = get().cache[key];
    if (!entry) return null;
    if (Date.now() - entry.cachedAt > ENTITY_INFO_TTL) return null;
    return entry.data;
  },

  set: (key, data) => {
    set((s) => {
      const cache = { ...s.cache, [key]: { data, cachedAt: Date.now() } };
      const loadingByKey = { ...s.loadingByKey };
      delete loadingByKey[key];
      const errorByKey = { ...s.errorByKey };
      delete errorByKey[key];
      return { cache, loadingByKey, errorByKey };
    });
  },

  isLoading: (key) => !!get().loadingByKey[key],

  getError: (key) => get().errorByKey[key] ?? null,

  setLoading: (key, loading) =>
    set((s) => {
      const loadingByKey = { ...s.loadingByKey };
      if (loading) {
        loadingByKey[key] = true;
      } else {
        delete loadingByKey[key];
      }
      return { loadingByKey };
    }),

  setError: (key, error) =>
    set((s) => {
      const errorByKey = { ...s.errorByKey };
      if (error) {
        errorByKey[key] = error;
      } else {
        delete errorByKey[key];
      }
      return { errorByKey };
    }),
}));
