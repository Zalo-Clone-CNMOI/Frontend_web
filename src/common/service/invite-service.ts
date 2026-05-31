import http from "../api/http";
import { API } from "../api/path";
import {
  GetConversationInvitesParams,
  GetPendingInvitesParams,
  GroupInviteDto,
  SendGroupInvitesRequest,
  SendGroupInvitesResponse,
} from "../interface/invite-interface";
import { IApiResponse } from "../interface/auth-interface";

export const inviteService = {
  sendGroupInvites(conversationId: string, payload: SendGroupInvitesRequest) {
    return http.post<IApiResponse<SendGroupInvitesResponse>>(
      API.API_CONVERSATIONS_SEND_INVITES(conversationId),
      payload
    );
  },

  getPendingInvites(params?: GetPendingInvitesParams) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();
    const url = qs
      ? `${API.API_CONVERSATIONS_PENDING_INVITES}?${qs}`
      : API.API_CONVERSATIONS_PENDING_INVITES;
    return http.get<IApiResponse<GroupInviteDto[]>>(url);
  },

  getConversationInvites(
    conversationId: string,
    params?: GetConversationInvitesParams
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();
    const url = qs
      ? `${API.API_CONVERSATIONS_LIST_INVITES(conversationId)}?${qs}`
      : API.API_CONVERSATIONS_LIST_INVITES(conversationId);
    return http.get<IApiResponse<GroupInviteDto[]>>(url);
  },

  acceptGroupInvite(conversationId: string, inviteId: string) {
    return http.post<IApiResponse<void>>(
      API.API_CONVERSATIONS_ACCEPT_INVITE(conversationId, inviteId)
    );
  },

  rejectGroupInvite(conversationId: string, inviteId: string) {
    return http.post<IApiResponse<void>>(
      API.API_CONVERSATIONS_REJECT_INVITE(conversationId, inviteId)
    );
  },

  cancelGroupInvite(conversationId: string, inviteId: string) {
    return http.post<IApiResponse<void>>(
      API.API_CONVERSATIONS_CANCEL_INVITE(conversationId, inviteId)
    );
  },
};
