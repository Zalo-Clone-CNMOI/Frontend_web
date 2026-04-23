import { buildDerivedDataFromMessages, dedupeByMessageId, extractFilesFromMessage, extractLinksFromMessage, extractMediaFromMessage, normalizeMessage, uniqAttachments, uniqStrings, upsertIncomingMessage } from "../helpers/chat.helpers";
import { buildChatAttachmentsPayload } from "../helpers/chatAttachment.helpers";
import { cleanMessageBody, HIDDEN_BODY } from "../helpers/cleanBodyMedia";
import { ConversationDto, ConversationLastMessageDto, UiMessage } from "../interface/chat-interface";
import { ChatAttachmentPayload, IUploadedMedia } from "../interface/media-interface";
import { chatService } from "../service/chat-service";
import { connectSocket, getSocket } from "../socket/socket";
import { useChatStore } from "../store/useChatStore";

export const rebuildConversationDerivedData = (conversationId: string) => {
  const state = useChatStore.getState();
  const messages = state.messagesByConversation[conversationId] || [];
  const derived = buildDerivedDataFromMessages(messages);

  state.setMediaByConversation(conversationId, derived.media);
  state.setFilesByConversation(conversationId, derived.files);
  state.setLinksByConversation(conversationId, derived.links);
};

export const appendMessageDerivedData = (message: any) => {
  const state = useChatStore.getState();
  const msg = normalizeMessage(message);
  const conversationId = msg.conversationId;

  if (!conversationId || msg.isDeleted) return;

  const nextMedia = extractMediaFromMessage(msg);
  const nextFiles = extractFilesFromMessage(msg);
  const nextLinks = extractLinksFromMessage(msg);

  state.setMediaByConversation(
    conversationId,
    uniqAttachments([
      ...(state.mediaByConversation[conversationId] || []),
      ...nextMedia,
    ])
  );

  state.setFilesByConversation(
    conversationId,
    uniqAttachments([
      ...(state.filesByConversation[conversationId] || []),
      ...nextFiles,
    ])
  );

  state.setLinksByConversation(
    conversationId,
    uniqStrings([
      ...(state.linksByConversation[conversationId] || []),
      ...nextLinks,
    ])
  );
};
const applyDeletedMessage = (
  messages: UiMessage[],
  messageId: string,
  deletedAt: number
): UiMessage[] => {
  return messages.map((msg) =>
    msg.messageId === messageId
      ? {
        ...msg,
        body: "",
        isDeleted: true,
        deletedAt,
        attachments: [],
        pending: false,
        failed: false,
      }
      : msg
  );
};

const patchConversationPreviewWhenDeleted = (
  conversations: ConversationDto[],
  conversationId: string,
  messageId: string
): ConversationDto[] => {
  return conversations.map((cvs) => {
    if (cvs.id !== conversationId) return cvs;

    const lastMessage = cvs.lastMessage;
    if (!lastMessage || lastMessage.id !== messageId) return cvs;

    return {
      ...cvs,
      lastMessage: {
        ...lastMessage,
        content: "Tin nhắn đã được thu hồi",
      },
      lastMessageAt: Date.now(),
    };
  });
};
export const clearConversationDerivedData = (conversationId: string) => {
  const state = useChatStore.getState();
  state.setMediaByConversation(conversationId, []);
  state.setFilesByConversation(conversationId, []);
  state.setLinksByConversation(conversationId, []);
};

export const openMockConversation = (conversationId: string) => {
  useChatStore.getState().setActiveConversationId(conversationId);
};

export const fetchListConversation = async (params: { page?: number; limit?: number } = {}) => {
  const state = useChatStore.getState();

  state.setConversationLoading(true);
  state.setError(null);

  try {
    const res = await chatService.fetchListConversations({
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    });

    const payload = res?.payload;
    const items = Array.isArray(payload?.data) ? payload.data : [];
    const meta = payload?.meta ?? null;

    state.setListConversation(items);
    state.setConversationMeta(meta);
    state.setConversationLoading(false);
    state.setConversationFetched(true);
  } catch (err: any) {
    state.setListConversation([]);
    state.setConversationMeta(null);
    state.setConversationLoading(false);
    state.setConversationFetched(true);
    state.setError(err?.message || "Không lấy được danh sách cuộc trò chuyện");
  }
};
const hydrateReplyMessages = (messages: UiMessage[]): UiMessage[] => {
  const messageMap = new Map(messages.map((msg) => [msg.messageId, msg]));

  return messages.map((msg) => {
    if (msg.replyTo || !msg.replyToMessageId) return msg;

    const repliedMessage = messageMap.get(msg.replyToMessageId);
    if (!repliedMessage) return msg;

    return {
      ...msg,
      replyTo: {
        messageId: repliedMessage.messageId,
        senderId: repliedMessage.senderId,
        body: repliedMessage.body ?? "",
        attachments: repliedMessage.attachments ?? [],
        isDeleted: Boolean(repliedMessage.isDeleted),
      },
    };
  });
};
export const initChat = (accessToken: string, currentUserId: string) => {
  if (!accessToken || !currentUserId) return;

  const state = useChatStore.getState();
  const socket = connectSocket(accessToken);

  const oldHeartbeat = state.heartbeatId;
  if (oldHeartbeat) clearInterval(oldHeartbeat);

  socket.off("connect");
  socket.off("disconnect");
  socket.off("connect_error");
  socket.off("chat:new");
  socket.off("chat:message");
  socket.off("chat:message:deleted");
  socket.off("chat:message:updated");
  socket.off("chat:typing:update");
  socket.off("conversation:member:removed");
  socket.off("conversation:member:added");
  socket.off("chat.system_message");
  socket.offAny();

  const handleIncomingMessage = (raw: any) => {
    console.log("[receiver raw socket]", raw);

    const normalized = normalizeMessage(raw);

    console.log("[receiver normalized]", normalized);

    if (!normalized.conversationId || !normalized.messageId) return;

    let finalMessage = normalized;

    useChatStore.setState((state) => {
      const currentMessages =
        state.messagesByConversation[normalized.conversationId] || [];

      let msg = normalized;

      if (!msg.replyTo && msg.replyToMessageId) {
        const repliedMessage = currentMessages.find(
          (item) => item.messageId === msg.replyToMessageId
        );

        if (repliedMessage) {
          msg = {
            ...msg,
            replyTo: {
              messageId: repliedMessage.messageId,
              senderId: repliedMessage.senderId,
              body: repliedMessage.body ?? "",
              attachments: repliedMessage.attachments ?? [],
              isDeleted: Boolean(repliedMessage.isDeleted),
            },
          };
        }
      }

      finalMessage = msg;

      const nextMessages = upsertIncomingMessage(currentMessages, msg);

      const nextConversations = state.listConversation.some(
        (cvs) => cvs.id === msg.conversationId
      )
        ? moveConversationToTopWithLastMessage(
          state.listConversation,
          msg.conversationId,
          msg
        )
        : state.listConversation;

      return {
        messagesByConversation: {
          ...state.messagesByConversation,
          [msg.conversationId]: nextMessages,
        },
        listConversation: nextConversations,
      };
    });

    appendMessageDerivedData(finalMessage);
  };

  const handleDeletedMessage = (raw: any) => {
    const messageId = raw?.message_id ?? raw?.messageId;
    const conversationId = raw?.conversation_id ?? raw?.conversationId;
    const deletedAt = raw?.deleted_at ?? raw?.deletedAt ?? Date.now();

    if (!messageId || !conversationId) return;

    useChatStore.setState((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: (state.messagesByConversation[conversationId] || []).map((msg) =>
          msg.messageId === messageId
            ? {
              ...msg,
              body: "",
              isDeleted: true,
              deletedAt,
              attachments: [],
              pending: false,
              failed: false,
            }
            : msg
        ),
      },
      listConversation: patchConversationPreviewWhenDeleted(
        state.listConversation,
        conversationId,
        messageId
      ),
    }));
  };

  const handleUpdatedMessage = (raw: any) => {
    const messageId = raw?.message_id ?? raw?.messageId;
    const conversationId = raw?.conversation_id ?? raw?.conversationId;
    const body = cleanMessageBody(raw?.body ?? "");
    const editedAt = raw?.edited_at ?? raw?.editedAt ?? Date.now();

    if (!messageId || !conversationId) return;

    useChatStore.setState((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: (state.messagesByConversation[conversationId] || []).map((msg) =>
          msg.messageId === messageId
            ? {
              ...msg,
              body,
              editedAt,
            }
            : msg
        ),
      },
      listConversation: state.listConversation.map((cvs) => {
        if (cvs.id !== conversationId) return cvs;

        const lastMessage = cvs.lastMessage;
        if (!lastMessage || lastMessage.id !== messageId) return cvs;

        return {
          ...cvs,
          lastMessage: {
            ...lastMessage,
            content: body,
          },
          lastMessageAt: editedAt,
        };
      }),
    }));
  };

  const handleSystemMessage = (raw: any) => {
    console.log("[chat.system_message]", raw);

    const normalized = normalizeMessage(raw);

    if (!normalized.conversationId || !normalized.messageId) return;

    const systemMessage: UiMessage = {
      ...normalized,
      type: 'system',
      senderId: 'SYSTEM',
    };

    useChatStore.setState((state) => {
      const currentMessages =
        state.messagesByConversation[systemMessage.conversationId] || [];

      const nextMessages = upsertIncomingMessage(currentMessages, systemMessage);

      return {
        messagesByConversation: {
          ...state.messagesByConversation,
          [systemMessage.conversationId]: nextMessages,
        },
      };
    });
  };

  socket.on("connect", () => {
    const current = useChatStore.getState();
    const activeConversationId = current.activeConversationId;

    if (activeConversationId) {
      socket.emit("chat:join", {
        conversation_id: activeConversationId,
      });
    }

    current.setSocketConnected(true);
    current.setInitialized(true);
    current.setCurrentUserId(currentUserId);
    current.setError(null);
  });

  socket.on("disconnect", () => {
    useChatStore.getState().setSocketConnected(false);
  });

  socket.on("connect_error", (err) => {
    const current = useChatStore.getState();
    current.setSocketConnected(false);
    current.setError(err?.message || "Socket connect failed");
  });

  socket.on("chat:new", handleIncomingMessage);
  socket.on("chat:message", handleIncomingMessage);
  socket.on("chat:message:deleted", handleDeletedMessage);
  socket.on("chat:message:updated", handleUpdatedMessage);
  socket.on("conversation:member:added", handleConversationMemberAdded);
  socket.on("conversation:member:removed", handleConversationMemberRemoved);
  socket.on("chat.system_message", handleSystemMessage);
  socket.on("chat:typing:update", (payload: any) => {
    console.log('[WebSocket] Received chat:typing:update', payload);
    const conversationId = payload?.conversation_id ?? payload?.conversationId;
    const users = payload?.users || [];
    if (conversationId) {
      useChatStore.getState().updateTypingUsers(conversationId, users);
    }
  });

  socket.onAny((event, ...args) => {
    console.log("[socket event]", event);
    console.log("[socket args]", args);
  });

  const heartbeatId = setInterval(() => {
    if (!socket.connected) return;

    socket.emit("presence:heartbeat", {
      ts: Date.now(),
    });
  }, 30000);

  state.setInitialized(true);
  state.setCurrentUserId(currentUserId);
  state.setHeartbeatId(heartbeatId);
};

export const openConversation = async (conversationId: string) => {
  const state = useChatStore.getState();
  const socket = getSocket();

  state.setActiveConversationId(conversationId);
  state.setError(null);

  if (socket?.connected) {
    socket.emit("chat:join", { conversation_id: conversationId });
  }

  state.setPagination(conversationId, {
    loading: true,
    loadingMore: false,
  });

  try {
    const res = await chatService.fetchMessages(conversationId, { limit: 50 });
    const page = res?.payload?.data;
    const rawItems = Array.isArray(page?.items) ? page.items : [];
    const normalizedItems = dedupeByMessageId(rawItems.map(normalizeMessage));
    const hydratedItems = hydrateReplyMessages(normalizedItems);

    const oldItems =
      useChatStore.getState().messagesByConversation[conversationId] || [];
    const merged = dedupeByMessageId([...oldItems, ...hydratedItems]);

    state.setMessages(conversationId, merged);

    state.setPagination(conversationId, {
      nextCursor: page?.nextCursor ?? null,
      hasMore: page?.hasMore ?? false,
      loading: false,
      loadingMore: false,
    });

    rebuildConversationDerivedData(conversationId);
  } catch (err: any) {
    state.setError(err?.message || "Không lấy được tin nhắn");
    state.setMessages(conversationId, []);
    state.setPagination(conversationId, {
      nextCursor: null,
      hasMore: false,
      loading: false,
      loadingMore: false,
    });
    clearConversationDerivedData(conversationId);
  }
};
export const loadMoreMessages = async (conversationId: string) => {
  const state = useChatStore.getState();
  const pagination = state.paginationByConversation[conversationId];

  if (
    !pagination?.hasMore ||
    pagination.loadingMore ||
    !pagination.nextCursor
  ) {
    console.log("[action:loadMore:skip]", {
      conversationId,
      pagination,
    });
    return;
  }

  state.setPagination(conversationId, {
    loadingMore: true,
  });

  try {
    console.log("[action:loadMore:fetch]", {
      conversationId,
      cursor: pagination.nextCursor,
    });

    const res = await chatService.fetchMessages(conversationId, {
      cursor: pagination.nextCursor,
      limit: 50,
    });

    const payload = res?.payload?.data;
    const fetchedMessages = Array.isArray(payload?.items)
      ? payload.items.map(normalizeMessage)
      : [];

    const oldMessages = hydrateReplyMessages(
      dedupeByMessageId(fetchedMessages)
    );

    const latestState = useChatStore.getState();
    const currentMessages =
      latestState.messagesByConversation[conversationId] || [];

    console.log("[action:loadMore:result]", {
      fetchedCount: oldMessages.length,
      currentCount: currentMessages.length,
      fetchedFirstId: oldMessages[0]?.messageId,
      fetchedLastId: oldMessages[oldMessages.length - 1]?.messageId,
      currentFirstId: currentMessages[0]?.messageId,
      currentLastId: currentMessages[currentMessages.length - 1]?.messageId,
      nextCursor: payload?.nextCursor,
      hasMore: payload?.hasMore,
    });

    const mergedMessages = dedupeByMessageId([
      ...oldMessages,
      ...currentMessages,
    ]);

    console.log("[action:loadMore:merged]", {
      mergedCount: mergedMessages.length,
      mergedFirstId: mergedMessages[0]?.messageId,
      mergedLastId: mergedMessages[mergedMessages.length - 1]?.messageId,
    });

    useChatStore.setState((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: mergedMessages,
      },
      paginationByConversation: {
        ...state.paginationByConversation,
        [conversationId]: {
          ...state.paginationByConversation[conversationId],
          nextCursor: payload?.nextCursor ?? null,
          hasMore: payload?.hasMore ?? false,
          loading: false,
          loadingMore: false,
        },
      },
    }));

    rebuildConversationDerivedData(conversationId);
  } catch (err: any) {
    console.error("[action:loadMore:error]", err);
    useChatStore.getState().setPagination(conversationId, {
      loadingMore: false,
    });
    useChatStore.getState().setError(
      err?.message || "Không lấy được tin nhắn"
    );
  }
};


export const sendMessage = async (
  conversationId: string,
  body: string,
  attachments: (ChatAttachmentPayload | IUploadedMedia | any)[] = [],
  replyMessage?: UiMessage | null
) => {
  const state = useChatStore.getState();
  const currentUserId = state.currentUserId;
  const displayBody = cleanMessageBody(body);
  const socket = getSocket();

  const socketAttachments = buildChatAttachmentsPayload(
    attachments.map((att) => ({
      key: att.key,
      type: att.type,
      fileName: att.name ?? att.fileName ?? "",
      size: att.size,
      contentType: att.content_type ?? att.contentType ?? "",
      thumbnailKey: att.thumbnail_key ?? att.thumbnailKey,
      visibility: att.visibility,
      url: att.url ?? null,
    }))
  );

  if (
    !currentUserId ||
    (!displayBody && socketAttachments.length === 0) ||
    !socket?.connected
  ) {
    console.warn("[sendMessage] socket chưa sẵn sàng");
    return;
  }

  const clientMessageId = crypto.randomUUID();
  const now = Date.now();

  const optimisticMessage = normalizeMessage({
    messageId: clientMessageId,
    conversationId,
    senderId: currentUserId,
    body: displayBody,
    attachments,
    createdAt: now,
    pending: true,
    failed: false,
    replyTo: replyMessage
      ? {
        messageId: replyMessage.messageId,
        senderId: replyMessage.senderId,
        body: replyMessage.body ?? "",
        attachments: replyMessage.attachments ?? [],
        isDeleted: Boolean(replyMessage.isDeleted),
      }
      : null,
    replyToMessageId: replyMessage?.messageId ?? null,
  });

  state.appendRealtimeMessage(conversationId, optimisticMessage);
  appendMessageDerivedData(optimisticMessage);

  socket.emit("chat:join", { conversation_id: conversationId });

  const payload: any = {
    message_id: clientMessageId,
    conversation_id: conversationId,
    attachments: socketAttachments,
    sent_at: now,
    body: displayBody || HIDDEN_BODY, // BE bắt buộc body thì gửi ký tự ẩn
  };
  if (replyMessage?.messageId) {
    payload.reply_to_message_id = replyMessage.messageId;
  }
  console.log("[partner send] payload", payload);

  socket.emit("chat:send", payload, (ack: any) => {
    console.log("[chat:send ack]", ack);

    const current = useChatStore.getState();
    const messages = current.messagesByConversation[conversationId] || [];
    const isSuccess = ack?.success === true;

    current.setMessages(
      conversationId,
      messages.map((msg: any) => {
        if (msg.messageId !== clientMessageId) return msg;

        if (!isSuccess) {
          return {
            ...msg,
            pending: false,
            failed: true,
          };
        }

        return {
          ...msg,
          pending: false,
          failed: false,
          messageId: ack?.data?.messageId ?? ack?.messageId ?? msg.messageId,
          createdAt: ack?.data?.createdAt ?? ack?.createdAt ?? msg.createdAt,
        };
      })
    );
  });
};

export const editMessage = async (
  conversationId: string,
  messageId: string,
  newBody: string
) => {
  const state = useChatStore.getState();
  const socket = getSocket();
  const cleanBody = cleanMessageBody(newBody);

  if (!socket?.connected) {
    state.setError("Socket chưa kết nối");
    return;
  }

  if (!cleanBody) {
    state.setError("Nội dung chỉnh sửa không được để trống");
    return;
  }

  const editedAt = Date.now();

  useChatStore.setState((prev) => ({
    messagesByConversation: {
      ...prev.messagesByConversation,
      [conversationId]: (prev.messagesByConversation[conversationId] || []).map((msg) =>
        msg.messageId === messageId
          ? {
            ...msg,
            body: cleanBody,
            editedAt,
            failed: false,
          }
          : msg
      ),
    },
    listConversation: prev.listConversation.map((cvs) => {
      if (cvs.id !== conversationId) return cvs;

      const lastMessage = cvs.lastMessage;
      if (!lastMessage || lastMessage.id !== messageId) return cvs;

      return {
        ...cvs,
        lastMessage: {
          ...lastMessage,
          content: cleanBody,
        },
        lastMessageAt: editedAt,
      };
    }),
  }));

  socket.emit("chat:update", {
    conversation_id: conversationId,
    message_id: messageId,
    body: cleanBody,
    edited_at: editedAt,
  });
};

export const deleteMessage = (
  conversationId: string,
  messageId: string,
  createdAt: number
) => {
  const state = useChatStore.getState();
  const socket = getSocket();

  if (!socket?.connected) {
    state.setError("Socket chưa kết nối");
    return;
  }

  useChatStore.setState((prev) => ({
    messagesByConversation: {
      ...prev.messagesByConversation,
      [conversationId]: (prev.messagesByConversation[conversationId] || []).map((msg) =>
        msg.messageId === messageId
          ? {
            ...msg,
            body: "",
            isDeleted: true,
            deletedAt: Date.now(),
            attachments: [],
            pending: false,
            failed: false,
          }
          : msg
      ),
    },
    listConversation: patchConversationPreviewWhenDeleted(
      prev.listConversation,
      conversationId,
      messageId
    ),
  }));

  socket.emit("chat:delete", {
    message_id: messageId,
    conversation_id: conversationId,
    created_at: Number(createdAt),
  });
};
const handleConversationMemberAdded = async (payload: any) => {
  console.log("[conversation:member:added]", payload);

  const conversationId =
    payload?.conversation_id ?? payload?.conversationId;

  const members = Array.isArray(payload?.members) ? payload.members : [];
  const current = useChatStore.getState();
  const currentUserId = current.currentUserId;

  if (!conversationId || !currentUserId) return;

  const isCurrentUserAdded = members.some(
    (member: any) => member?.user_id === currentUserId || member?.userId === currentUserId
  );

  if (!isCurrentUserAdded) return;

  await fetchListConversation({ page: 1, limit: 10 });
  await current.fetchConversationDetail(conversationId, true);
};
const handleConversationMemberRemoved = (payload: any) => {
  console.log("[conversation:member:removed]", payload);

  const conversationId =
    payload?.conversation_id ?? payload?.conversationId;

  const current = useChatStore.getState();
  const currentUserId = current.currentUserId;

  if (!conversationId || !currentUserId) return;

  const removedUserId =
    payload?.removed_user_id ??
    payload?.removedUserId ??
    payload?.user_id ??
    payload?.userId;

  const members = Array.isArray(payload?.members) ? payload.members : [];

  const isCurrentUserRemoved =
    removedUserId === currentUserId ||
    (members.length > 0 &&
      !members.some(
        (member: any) =>
          member?.user_id === currentUserId || member?.userId === currentUserId
      ));

  if (!isCurrentUserRemoved) return;

  current.removeConversationLocally(conversationId);
};

export const cleanupChat = () => {
  const state = useChatStore.getState();
  const socket = getSocket();
  const heartbeatId = state.heartbeatId;

  if (heartbeatId) clearInterval(heartbeatId);

  socket?.off("connect");
  socket?.off("disconnect");
  socket?.off("connect_error");
  socket?.off("chat:new");
  socket?.off("chat:message");
  socket?.off("chat:message:deleted");
  socket?.off("chat:typing:update");
  socket?.off("conversation:member:added");
  socket?.off("conversation:member:removed");
  socket?.off("chat.system_message");
  socket?.offAny();

  if (socket?.connected) socket.disconnect();

  state.resetChatState();
};

const detectPreviewTypeFromMessage = (message: UiMessage) => {
  const cleanBody = (message.body ?? "").replace(/\u200B/g, "").trim();
  const lowerContent = cleanBody.toLowerCase();

  if (lowerContent.match(/\.(mp4|mov|avi|mkv|webm)$/)) return "video";
  if (lowerContent.match(/\.(jpg|jpeg|png|gif|webp)$/)) return "image";
  if (lowerContent.match(/\.(pdf|doc|docx|xls|xlsx|txt|zip)$/)) return "file";
  if (lowerContent.match(/\.(mp3|wav|ogg|m4a)$/)) return "voice";

  if (message.attachments?.some((att) => att.type === "image")) return "image";
  if (message.attachments?.some((att) => att.type === "video")) return "video";
  if (message.attachments?.some((att) => att.type === "audio")) return "voice";
  if (message.attachments?.some((att) => att.type === "document")) return "file";

  if (cleanBody) return "text";
  return "deleted";
};

export const moveConversationToTopWithLastMessage = (
  conversations: ConversationDto[],
  conversationId: string,
  message: UiMessage
): ConversationDto[] => {
  const cleanBody = (message.body ?? "").replace(/\u200B/g, "").trim();
  const previewType = detectPreviewTypeFromMessage(message);

  let previewContent = cleanBody;

  switch (previewType) {
    case "image":
      previewContent = "Đã gửi 1 ảnh";
      break;
    case "video":
      previewContent = "Đã gửi 1 video";
      break;
    case "file":
      previewContent = "Đã gửi 1 tệp đính kèm";
      break;
    case "voice":
      previewContent = "__VOICE__";
      break;
    case "deleted":
      previewContent = "";
      break;
    default:
      previewContent = cleanBody;
      break;
  }

  const tempData: ConversationLastMessageDto = {
    id: message.messageId,
    content: previewContent,
    createdAt: message.createdAt,
    senderId: message.senderId,
    senderName: "",
  };

  const updatedList = conversations.map((cvs) =>
    cvs.id === conversationId
      ? {
        ...cvs,
        lastMessage: tempData,
        lastMessageAt: message.createdAt,
      }
      : cvs
  );

  const current = updatedList.find((cvs) => cvs.id === conversationId);
  const rest = updatedList.filter((cvs) => cvs.id !== conversationId);

  return current ? [current, ...rest] : updatedList;
};