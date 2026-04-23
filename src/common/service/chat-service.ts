import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse } from "../interface/auth-interface";
import type {
  ConversationDto,
  ConversationListResponse,
  MessagePageDto,
  UiMessage,
} from "../interface/chat-interface";

export const chatService = {
  fetchListConversations(params: { page?: number; limit?: number }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    return http.get<ConversationListResponse>(
      `${API.API_CONVERSATIONS_LIST}?page=${page}&limit=${limit}`
    );
  },
  createConversation(participantId: string) {
    return http.post<IApiResponse<ConversationDto>>(
      API.API_CONVERSATIONS_DIRECT,
      {
        participantId,
      }
    );
  },

  fetchMessages(
    conversationId: string,
    params: { limit?: number; cursor?: string }
  ) {
    const searchParams = new URLSearchParams();
    searchParams.set("limit", String(params.limit ?? 50));
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    return http.get<IApiResponse<MessagePageDto>>(`${API.API_MESSAGES(conversationId)}?${searchParams.toString()}`);
  },

  fetchMessageDetail(
    conversationId: string,
    createdAt: number,
    messageId: string
  ) {
    return http.get<IApiResponse<UiMessage>>(
      API.API_MESSAGE_DETAIL(conversationId, createdAt, messageId)
    );
  },

  fetchMessageReactions(messageId: string) {
    return http.get<IApiResponse<any[]>>(API.API_MESSAGE_REACTIONS(messageId));
  },

  forwardMessage(payload: {
    forward_id: string;
    source_message_id: string;
    targets: Array<{
      message_id: string;
      conversation_id: string;
    }>;
  }) {
    return http.post<IApiResponse<any>>(
      API.API_MESSAGES_FORWARD,
      payload
    );
  },
  fetchConversationById (conversationId: string){
    return http.get<IApiResponse<ConversationDto>>(
      API.API_CONVERSATIONS_DETAIL(conversationId)
    );
  },

  pinMessage(
    conversationId: string,
    createdAt: number,
    messageId: string,
    userId: string
  ) {
    return http.post<IApiResponse<{ message: string }>>(
      API.API_MESSAGE_PIN(conversationId, createdAt, messageId),
      undefined,
      {
        headers: {
          "x-user-id": userId,
        },
      }
    );
  },

  unpinMessage(
    conversationId: string,
    createdAt: number,
    messageId: string,
    userId: string
  ) {
    return http.delete<IApiResponse<{ message: string }>>(
      API.API_MESSAGE_PIN(conversationId, createdAt, messageId),
      {
        headers: {
          "x-user-id": userId,
        },
      }
    );
  },

  fetchPinnedMessages(
    conversationId: string,
    userId: string,
    limit: number = 20
  ) {
    return http.get<IApiResponse<{ items: UiMessage[] }>>(
      `${API.API_MESSAGES_PINNED(conversationId)}?limit=${limit}`,
      {
        headers: {
          "x-user-id": userId,
        },
      }
    );
  },

  searchMessages(
    conversationId: string,
    params: {
      q?: string;
      senderId?: string;
      from?: number;
      to?: number;
      fileType?: 'images' | 'video' | 'files';
    }
  ) {
    const searchParams = new URLSearchParams();
    if (params.q) searchParams.set('q', params.q);
    if (params.senderId) searchParams.set('senderId', params.senderId);
    if (params.from) searchParams.set('from', String(params.from));
    if (params.to) searchParams.set('to', String(params.to));
    if (params.fileType) searchParams.set('fileType', params.fileType);

    return http.get<IApiResponse<{ items: UiMessage[]; total: number }>>(
      `${API.API_MESSAGES_SEARCH(conversationId)}?${searchParams.toString()}`
    );
  },
};