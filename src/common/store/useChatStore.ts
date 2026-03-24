import { create } from "zustand";
import { chatService } from "../service/chat-service";
import type { IChat } from "@/src/common/interface/chat-interface";
import { connectSocket, getSocket } from "../socket/socket";

const normalizeMessage = (raw: any) => {
  const senderId =
    raw?.senderId ??
    raw?.sender_id ??
    raw?.sender?.id ??
    raw?.sender?.userId ??
    raw?.userId ??
    raw?.user_id ??
    "";

  const messageId =
    raw?.messageId ??
    raw?.message_id ??
    raw?.id ??
    raw?._id ??
    raw?.clientMessageId ??
    raw?.client_message_id ??
    `msg-${Date.now()}-${Math.random()}`;

  return {
    messageId: String(messageId),
    clientMessageId: raw?.clientMessageId ?? raw?.client_message_id ?? null,
    conversationId: String(
      raw?.conversationId ??
      raw?.conversation_id ??
      raw?.conversation?.id ??
      raw?.conversation?._id ??
      ""
    ),
    senderId: String(senderId),
    body: raw?.body ?? raw?.content ?? "",
    createdAt: Number(
      raw?.createdAt ??
      raw?.created_at ??
      raw?.sent_at ??
      raw?.timestamp ??
      Date.now()
    ),
    attachments: Array.isArray(raw?.attachments) ? raw.attachments : [],
    replyToMessageId:
      raw?.replyToMessageId ??
      raw?.reply_to_message_id ??
      raw?.replyTo?.id ??
      null,
    editedAt: raw?.editedAt ?? raw?.edited_at ?? null,
    deletedAt: raw?.deletedAt ?? raw?.deleted_at ?? null,
    isDeleted: Boolean(raw?.isDeleted ?? raw?.is_deleted ?? false),
    pending: Boolean(raw?.pending ?? false),
    failed: Boolean(raw?.failed ?? false),
    errorMessage: raw?.errorMessage ?? null,
  };
};

const sortMessages = (items: any[]) =>
  [...items].sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

const dedupeByMessageId = (items: any[]) => {
  const map = new Map<string, any>();

  for (const item of items) {
    const msg = normalizeMessage(item);
    const key = String(msg.messageId);
    map.set(key, {
      ...(map.get(key) || {}),
      ...msg,
    });
  }

  return sortMessages(Array.from(map.values()));
};

const upsertIncomingMessage = (items: any[], raw: any) => {
  const incoming = normalizeMessage(raw);

  const existedIndex = items.findIndex(
    (msg) =>
      msg.messageId === incoming.messageId ||
      (incoming.clientMessageId &&
        msg.clientMessageId === incoming.clientMessageId)
  );

  if (existedIndex === -1) {
    return dedupeByMessageId([...items, incoming]);
  }

  const next = [...items];
  next[existedIndex] = {
    ...next[existedIndex],
    ...incoming,
    pending: false,
    failed: false,
  };

  return dedupeByMessageId(next);
};

export const useChatStore = create<IChat>((set, get) => ({
  initialized: false,
  socketConnected: false,
  activeConversationId: null,
  currentUserId: null,
  error: null,

  messagesByConversation: {},
  paginationByConversation: {},

  listConversation: [],
  conversationMeta: null,
  conversationLoading: false,
  conversationFetched: false,

  heartbeatId: null,

  setListConversation: (items) => {
    set({
      listConversation: items,
      conversationFetched: true,
    });
  },

  fetchListConversation: async (params = {}) => {
    set({
      conversationLoading: true,
      error: null,
    });

    try {
      const res = await chatService.fetchListConversations({
        page: (params as any).page ?? 1,
        limit: (params as any).limit ?? 10,
      });

      const payload = res?.payload;

      const items = Array.isArray(payload?.data) ? payload.data : [];
      const meta = payload?.meta ?? null

      set({
        listConversation: items,
        conversationMeta: meta,
        conversationLoading: false,
        conversationFetched: true,
      });
    } catch (err: any) {

      set({
        listConversation: [],
        conversationMeta: null,
        conversationLoading: false,
        conversationFetched: true,
        error: err?.message || "Không lấy được danh sách cuộc trò chuyện",
      });
    }
  },
  openMockConversation: (conversationId) => {
    set({ activeConversationId: conversationId });
  },

  initChat: (accessToken, currentUserId) => {
    if (!accessToken || !currentUserId) return;

    const socket = connectSocket(accessToken);

    const oldHeartbeat = get().heartbeatId;
    if (oldHeartbeat) clearInterval(oldHeartbeat);

    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");
    socket.off("chat:new");
    socket.off("chat:message");
    socket.offAny();

    const handleIncomingMessage = (raw: any) => {
      const msg = normalizeMessage(raw);
      if (!msg.conversationId) return;

      set((state) => {
        const oldMessages = state.messagesByConversation[msg.conversationId] || [];

        return {
          messagesByConversation: {
            ...state.messagesByConversation,
            [msg.conversationId]: upsertIncomingMessage(oldMessages, msg),
          },
        };
      });
    };

    socket.on("connect", () => {
      console.log("[socket] connected:", socket.id);

      const activeConversationId = get().activeConversationId;
      if (activeConversationId) {
        socket.emit("chat:join", {
          conversation_id: activeConversationId,
        });
      }

      set({
        socketConnected: true,
        initialized: true,
        currentUserId,
        error: null,
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] disconnected:", reason);
      set({ socketConnected: false });
    });

    socket.on("connect_error", (err) => {
      console.error("[socket] connect error:", err);
      set({
        socketConnected: false,
        error: err?.message || "Socket connect failed",
      });
    });

    socket.on("chat:new", handleIncomingMessage);
    socket.on("chat:message", handleIncomingMessage);

    socket.onAny((event, ...args) => {
      console.log("[socket event]", event, args);
    });

    const heartbeatId = setInterval(() => {
      if (!socket.connected) return;

      socket.emit("presence:heartbeat", {
        user_id: currentUserId,
        ts: Date.now(),
      });
    }, 30000);

    set({
      initialized: true,
      currentUserId,
      heartbeatId,
    });
  },

  openConversation: async (conversationId) => {
    const socket = getSocket();

    set({
      activeConversationId: conversationId,
      error: null,
    });

    if (socket?.connected) {
      socket.emit("chat:join", { conversation_id: conversationId });
    }

    set((state) => ({
      paginationByConversation: {
        ...state.paginationByConversation,
        [conversationId]: {
          nextCursor:
            state.paginationByConversation[conversationId]?.nextCursor ?? null,
          hasMore: state.paginationByConversation[conversationId]?.hasMore ?? false,
          loading: true,
          loadingMore: false,
        },
      },
    }));

    try {
      const res = await chatService.fetchMessages(conversationId, { limit: 50 });
      console.log("messages after fetch", res);

      const page = res?.payload?.data;
      const items = Array.isArray(page?.items)
        ? dedupeByMessageId(page.items)
        : [];

      set((state) => {
        const oldItems = state.messagesByConversation[conversationId] || [];
        const merged = dedupeByMessageId([...oldItems, ...items]);

        return {
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: merged,
          },
          paginationByConversation: {
            ...state.paginationByConversation,
            [conversationId]: {
              nextCursor: page?.nextCursor ?? null,
              hasMore: page?.hasMore ?? false,
              loading: false,
              loadingMore: false,
            },
          },
        };
      });
    } catch (err: any) {
      console.error("openConversation error:", err);

      set((state) => ({
        error: err?.message || "Không lấy được tin nhắn",
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: [],
        },
        paginationByConversation: {
          ...state.paginationByConversation,
          [conversationId]: {
            nextCursor: null,
            hasMore: false,
            loading: false,
            loadingMore: false,
          },
        },
      }));
    }
  },

  loadMoreMessages: async (conversationId) => { },

  sendMessage: async (conversationId, body, attachments = []) => {
    const currentUserId = get().currentUserId;
    const trimmedBody = body?.trim?.() || "";
    const socket = getSocket();

    if (!currentUserId || !trimmedBody || !socket?.connected) {
      console.warn("[sendMessage] socket chưa sẵn sàng");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const now = Date.now();

    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: (state.messagesByConversation[conversationId] || []).map(
          (msg) =>
            msg.messageId === tempId
              ? { ...msg, pending: false, failed: false }
              : msg
        ),
      },
    }));
    socket.emit("chat:join", { conversation_id: conversationId });

    socket.emit(
      "chat:send",
      {
        message_id: tempId,
        conversation_id: conversationId,
        body: trimmedBody,
        sent_at: now,
      },
      async (ack: any) => {
        if (!ack?.success) {
          set((state) => ({
            messagesByConversation: {
              ...state.messagesByConversation,
              [conversationId]: (state.messagesByConversation[conversationId] || []).map(
                (msg) =>
                  msg.messageId === tempId
                    ? { ...msg, pending: false, failed: true }
                    : msg
              ),
            },
          }));
          return;
        }

        set((state) => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: (state.messagesByConversation[conversationId] || []).map(
              (msg) =>
                msg.messageId === tempId
                  ? { ...msg, pending: false, failed: false }
                  : msg
            ),
          },
        }));

        // await get().openConversation(conversationId);
        await get().fetchListConversation({ page: 1, limit: 10 });
      }
    );
  },

  editMessage: (conversationId, messageId, newBody) => { },

  deleteMessage: (conversationId, messageId) => { },

  cleanupChat: () => {
    const socket = getSocket();
    const heartbeatId = get().heartbeatId;

    if (heartbeatId) clearInterval(heartbeatId);

    socket?.off("connect");
    socket?.off("disconnect");
    socket?.off("connect_error");
    socket?.off("chat:new");
    socket?.off("chat:message");
    socket?.offAny();

    if (socket?.connected) socket.disconnect();

    set({
      initialized: false,
      socketConnected: false,
      heartbeatId: null,
      activeConversationId: null,
      currentUserId: null,
      error: null,
      messagesByConversation: {},
      paginationByConversation: {},
      listConversation: [],
      conversationMeta: null,
      conversationLoading: false,
      conversationFetched: false,
    });
  },
}));