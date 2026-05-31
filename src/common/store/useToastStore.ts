import { create } from "zustand";

/**
 * Global toast/snackbar store. Web has no toast system, so this is the web
 * equivalent of mobile's `toast.*` calls (documented deviation). Used first by
 * A1 Moderation, then shared by all AI features for transient notices/errors.
 */
export type ToastSeverity = "success" | "info" | "warning" | "error";

export interface ToastItem {
  id: number;
  message: string;
  severity: ToastSeverity;
  /** Auto-hide duration in ms. */
  duration: number;
}

interface ToastState {
  current: ToastItem | null;
  /** Monotonic id source (avoids relying on timers for uniqueness). */
  _seq: number;
  show: (message: string, severity?: ToastSeverity, duration?: number) => void;
  dismiss: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  current: null,
  _seq: 0,
  show: (message, severity = "info", duration = 4000) => {
    const id = get()._seq + 1;
    set({ _seq: id, current: { id, message, severity, duration } });
  },
  dismiss: () => set({ current: null }),
}));

/** Imperative helper for non-React call sites (socket handlers, services). */
export const toast = {
  success: (m: string, d?: number) =>
    useToastStore.getState().show(m, "success", d),
  info: (m: string, d?: number) => useToastStore.getState().show(m, "info", d),
  warning: (m: string, d?: number) =>
    useToastStore.getState().show(m, "warning", d),
  error: (m: string, d?: number) =>
    useToastStore.getState().show(m, "error", d),
};
