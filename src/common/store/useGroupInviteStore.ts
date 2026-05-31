import { create } from "zustand";
import {
  GroupInviteDto,
  GroupInviteStatus,
  SendGroupInvitesRequest,
  SendGroupInvitesResponse,
} from "../interface/invite-interface";
import { chatService } from "@/src/common/service/chat-service";
import { inviteService } from "../service/invite-service";
import { useChatStore } from "./useChatStore";

interface GroupInviteState {
  receivedInvites: {
    pending: GroupInviteDto[];
    accepted: GroupInviteDto[];
    rejected: GroupInviteDto[];
    cancelled: GroupInviteDto[];
    expired: GroupInviteDto[];
  };
  sentInvites: {
    pending: GroupInviteDto[];
    accepted: GroupInviteDto[];
    rejected: GroupInviteDto[];
    cancelled: GroupInviteDto[];
    expired: GroupInviteDto[];
  };
  conversationInvites: GroupInviteDto[];

  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  unreadCount: number;
  lastSocketUpdateAt: number | null;
  processedEventIds: Record<string, number>;

  fetchPendingInvites: (force?: boolean) => Promise<void>;
  fetchConversationInvites: (convId: string, status?: GroupInviteStatus) => Promise<void>;
  sendInvites: (convId: string, payload: SendGroupInvitesRequest) => Promise<SendGroupInvitesResponse | null>;
  acceptInvite: (convId: string, inviteId: string) => Promise<boolean>;
  rejectInvite: (convId: string, inviteId: string) => Promise<boolean>;
  cancelInvite: (convId: string, inviteId: string) => Promise<boolean>;

  handleInviteSent: (invite: GroupInviteDto, eventId?: string) => void;
  handleInviteAccepted: (inviteId: string, respondedAt: string | number, eventId?: string) => void;
  handleInviteRejected: (inviteId: string, respondedAt: string | number, eventId?: string) => void;
  handleInviteCancelled: (inviteId: string, eventId?: string) => void;
  handleInviteExpired: (inviteId: string, eventId?: string) => void;

  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  resetInvites: () => void;
}

const CACHE_TTL = 5 * 60 * 1000;

const initialReceived = {
  pending: [],
  accepted: [],
  rejected: [],
  cancelled: [],
  expired: [],
};

const initialSent = {
  pending: [],
  accepted: [],
  rejected: [],
  cancelled: [],
  expired: [],
};

function findInviteInReceived(
  received: GroupInviteState["receivedInvites"],
  inviteId: string
): GroupInviteDto | undefined {
  for (const key of Object.keys(received) as Array<keyof typeof received>) {
    const found = received[key].find((inv) => inv.id === inviteId);
    if (found) return found;
  }
  return undefined;
}

function findInviteInSent(
  sent: GroupInviteState["sentInvites"],
  inviteId: string
): GroupInviteDto | undefined {
  for (const key of Object.keys(sent) as Array<keyof typeof sent>) {
    const found = sent[key].find((inv) => inv.id === inviteId);
    if (found) return found;
  }
  return undefined;
}

function isEventProcessed(map: Record<string, number>, eventId: string): boolean {
  const ts = map[eventId];
  if (!ts) return false;
  return Date.now() - ts < CACHE_TTL;
}

function markEventProcessed(map: Record<string, number>, eventId: string): Record<string, number> {
  const next = { ...map, [eventId]: Date.now() };
  const cutoff = Date.now() - CACHE_TTL;
  for (const key of Object.keys(next)) {
    if (next[key] < cutoff) delete next[key];
  }
  return next;
}

export const useGroupInviteStore = create<GroupInviteState>((set, get) => ({
  receivedInvites: { ...initialReceived },
  sentInvites: { ...initialSent },
  conversationInvites: [],
  isLoading: false,
  isSending: false,
  error: null,
  unreadCount: 0,
  lastSocketUpdateAt: null,
  processedEventIds: {},

  fetchPendingInvites: async (force) => {
    try {
      set({ isLoading: true, error: null });
      const state = get();
      const hasRecentSocketUpdate = state.lastSocketUpdateAt && Date.now() - state.lastSocketUpdateAt < 1000;
      if (!force && !hasRecentSocketUpdate && state.lastSocketUpdateAt !== null) {
        // allow fetch
      }
      const res = await inviteService.getPendingInvites();
      const items = Array.isArray(res?.payload?.data) ? res.payload.data : [];

      const grouped = { ...initialReceived };
      for (const inv of items) {
        const status = inv.status as GroupInviteStatus;
        if (status in grouped) {
          (grouped[status] as GroupInviteDto[]).push(inv);
        }
      }

      set({
        receivedInvites: grouped,
        unreadCount: grouped.pending.length,
        lastSocketUpdateAt: null,
      });
    } catch (error: any) {
      set({ error: error?.message || "Không tải được lời mời nhóm" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchConversationInvites: async (convId, status) => {
    try {
      set({ isLoading: true, error: null });
      const res = await inviteService.getConversationInvites(convId, status ? { status } : undefined);
      const items = Array.isArray(res?.payload?.data) ? res.payload.data : [];

      const grouped = { ...initialSent };
      for (const inv of items) {
        const s = inv.status as GroupInviteStatus;
        if (s in grouped) {
          (grouped[s] as GroupInviteDto[]).push(inv);
        }
      }

      set({
        conversationInvites: items,
        sentInvites: grouped,
      });
    } catch (error: any) {
      set({ error: error?.message || "Không tải được danh sách lời mời" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendInvites: async (convId, payload) => {
    try {
      set({ isSending: true, error: null });
      const res = await inviteService.sendGroupInvites(convId, payload);
      const data = res?.payload?.data ?? null;
      return data as SendGroupInvitesResponse | null;
    } catch (error: any) {
      set({ error: error?.message || "Gửi lời mời thất bại" });
      return null;
    } finally {
      set({ isSending: false });
    }
  },

  acceptInvite: async (convId, inviteId) => {
    const prev = get().receivedInvites;
    set((state) => ({
      receivedInvites: {
        ...state.receivedInvites,
        pending: state.receivedInvites.pending.filter((i) => i.id !== inviteId),
        accepted: [
          ...state.receivedInvites.accepted,
          ...state.receivedInvites.pending.filter((i) => i.id === inviteId).map((i) => ({ ...i, status: "accepted" as GroupInviteStatus })),
        ],
      },
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));

    try {
      const res = await inviteService.acceptGroupInvite(convId, inviteId);
      if (!res.ok) {
        const errorPayload = res.payload as any;
        const errorCode = errorPayload?.error?.code;
        if (errorCode === "GROUP_INVITE_INVALID_STATUS") {
          set({ receivedInvites: prev, error: "Nhóm đã giải tán hoặc lời mời không còn hợp lệ" });
          return false;
        }
        if (errorCode === "GROUP_INVITE_EXPIRED") {
          set({ receivedInvites: prev, error: "Lời mời đã hết hạn" });
          return false;
        }
        set({ receivedInvites: prev, error: "Không thể chấp nhận lời mời" });
        return false;
      }
      await useChatStore.getState().fetchListConversation();
      return true;
    } catch (error: any) {
      set({ receivedInvites: prev, error: error?.message || "Không thể chấp nhận lời mời" });
      return false;
    }
  },

  rejectInvite: async (convId, inviteId) => {
    const prev = get().receivedInvites;
    set((state) => ({
      receivedInvites: {
        ...state.receivedInvites,
        pending: state.receivedInvites.pending.filter((i) => i.id !== inviteId),
        rejected: [
          ...state.receivedInvites.rejected,
          ...state.receivedInvites.pending.filter((i) => i.id === inviteId).map((i) => ({ ...i, status: "rejected" as GroupInviteStatus })),
        ],
      },
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));

    try {
      await inviteService.rejectGroupInvite(convId, inviteId);
      return true;
    } catch (error: any) {
      set({ receivedInvites: prev, error: error?.message || "Từ chối thất bại" });
      return false;
    }
  },

  cancelInvite: async (convId, inviteId) => {
    const prev = get().conversationInvites;
    set((state) => ({
      conversationInvites: state.conversationInvites.map((inv) =>
        inv.id === inviteId ? { ...inv, status: "cancelled" as GroupInviteStatus } : inv
      ),
    }));

    try {
      await inviteService.cancelGroupInvite(convId, inviteId);
      return true;
    } catch (error: any) {
      set({ conversationInvites: prev, error: error?.message || "Hủy lời mời thất bại" });
      return false;
    }
  },

  handleInviteSent: (invite, eventId) => {
    const state = get();
    if (eventId) {
      const processed = state.processedEventIds;
      if (isEventProcessed(processed, eventId)) return;
      set({ processedEventIds: markEventProcessed(processed, eventId) });
    }

    set((s) => {
      for (const key of Object.keys(s.receivedInvites) as Array<keyof typeof s.receivedInvites>) {
        if (s.receivedInvites[key].some((i) => i.id === invite.id)) return {};
      }
      return {
        receivedInvites: {
          ...s.receivedInvites,
          pending: [invite, ...s.receivedInvites.pending],
        },
        unreadCount: s.unreadCount + 1,
        lastSocketUpdateAt: Date.now(),
      };
    });
  },

  handleInviteAccepted: (inviteId, respondedAt, eventId) => {
    const state = get();
    if (eventId) {
      const processed = state.processedEventIds;
      if (isEventProcessed(processed, eventId)) return;
      set({ processedEventIds: markEventProcessed(processed, eventId) });
    }

    set((s) => {
      const inReceived = findInviteInReceived(s.receivedInvites, inviteId);
      const inSent = findInviteInSent(s.sentInvites, inviteId);

      if (!inReceived && !inSent) return {};

      const result: Partial<GroupInviteState> = { lastSocketUpdateAt: Date.now() };

      if (inReceived) {
        result.receivedInvites = {
          ...s.receivedInvites,
          pending: s.receivedInvites.pending.filter((i) => i.id !== inviteId),
          accepted: [
            ...s.receivedInvites.accepted,
            { ...inReceived, status: "accepted" as GroupInviteStatus, respondedAt },
          ],
        };
        result.unreadCount = Math.max(0, s.unreadCount - 1);
      }

      if (inSent) {
        result.sentInvites = {
          ...s.sentInvites,
          pending: s.sentInvites.pending.filter((i) => i.id !== inviteId),
          accepted: [
            ...s.sentInvites.accepted,
            { ...inSent, status: "accepted" as GroupInviteStatus, respondedAt },
          ],
        };
      }

      return result;
    });
  },

  handleInviteRejected: (inviteId, respondedAt, eventId) => {
    const state = get();
    if (eventId) {
      const processed = state.processedEventIds;
      if (isEventProcessed(processed, eventId)) return;
      set({ processedEventIds: markEventProcessed(processed, eventId) });
    }

    set((s) => {
      const inReceived = findInviteInReceived(s.receivedInvites, inviteId);
      const inSent = findInviteInSent(s.sentInvites, inviteId);

      if (!inReceived && !inSent) return {};

      const result: Partial<GroupInviteState> = { lastSocketUpdateAt: Date.now() };

      if (inReceived) {
        result.receivedInvites = {
          ...s.receivedInvites,
          pending: s.receivedInvites.pending.filter((i) => i.id !== inviteId),
          rejected: [
            ...s.receivedInvites.rejected,
            { ...inReceived, status: "rejected" as GroupInviteStatus, respondedAt },
          ],
        };
        result.unreadCount = Math.max(0, s.unreadCount - 1);
      }

      if (inSent) {
        result.sentInvites = {
          ...s.sentInvites,
          pending: s.sentInvites.pending.filter((i) => i.id !== inviteId),
          rejected: [
            ...s.sentInvites.rejected,
            { ...inSent, status: "rejected" as GroupInviteStatus, respondedAt },
          ],
        };
      }

      return result;
    });
  },

  handleInviteCancelled: (inviteId, eventId) => {
    const state = get();
    if (eventId) {
      const processed = state.processedEventIds;
      if (isEventProcessed(processed, eventId)) return;
      set({ processedEventIds: markEventProcessed(processed, eventId) });
    }

    set((s) => {
      const inReceived = findInviteInReceived(s.receivedInvites, inviteId);
      const inSent = findInviteInSent(s.sentInvites, inviteId);

      if (!inReceived && !inSent) return {};

      const result: Partial<GroupInviteState> = { lastSocketUpdateAt: Date.now() };

      if (inReceived) {
        result.receivedInvites = {
          ...s.receivedInvites,
          pending: s.receivedInvites.pending.filter((i) => i.id !== inviteId),
          cancelled: [
            ...s.receivedInvites.cancelled,
            { ...inReceived, status: "cancelled" as GroupInviteStatus },
          ],
        };
        result.unreadCount = Math.max(0, s.unreadCount - 1);
      }

      if (inSent) {
        result.sentInvites = {
          ...s.sentInvites,
          pending: s.sentInvites.pending.filter((i) => i.id !== inviteId),
          cancelled: [
            ...s.sentInvites.cancelled,
            { ...inSent, status: "cancelled" as GroupInviteStatus },
          ],
        };
      }

      return result;
    });
  },

  handleInviteExpired: (inviteId, eventId) => {
    const state = get();
    if (eventId) {
      const processed = state.processedEventIds;
      if (isEventProcessed(processed, eventId)) return;
      set({ processedEventIds: markEventProcessed(processed, eventId) });
    }

    set((s) => {
      const inReceived = findInviteInReceived(s.receivedInvites, inviteId);
      const inSent = findInviteInSent(s.sentInvites, inviteId);

      if (!inReceived && !inSent) return {};

      const result: Partial<GroupInviteState> = { lastSocketUpdateAt: Date.now() };

      if (inReceived) {
        result.receivedInvites = {
          ...s.receivedInvites,
          pending: s.receivedInvites.pending.filter((i) => i.id !== inviteId),
          expired: [
            ...s.receivedInvites.expired,
            { ...inReceived, status: "expired" as GroupInviteStatus },
          ],
        };
        result.unreadCount = Math.max(0, s.unreadCount - 1);
      }

      if (inSent) {
        result.sentInvites = {
          ...s.sentInvites,
          pending: s.sentInvites.pending.filter((i) => i.id !== inviteId),
          expired: [
            ...s.sentInvites.expired,
            { ...inSent, status: "expired" as GroupInviteStatus },
          ],
        };
      }

      return result;
    });
  },

  setUnreadCount: (count) => set({ unreadCount: count }),

  incrementUnreadCount: () =>
    set((state) => ({ unreadCount: state.unreadCount + 1 })),

  resetInvites: () =>
    set({
      receivedInvites: { ...initialReceived },
      sentInvites: { ...initialSent },
      conversationInvites: [],
      unreadCount: 0,
      error: null,
      lastSocketUpdateAt: null,
      processedEventIds: {},
    }),
}));
