import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse } from "../interface/auth-interface";
import {
  IPollDto,
  IPollPayload,
  IVotePollPayload,
  PollStatus,
} from "@/src/common/interface/poll-interface";

export const pollService = {
  createPoll(conversationId: string, payload: IPollPayload) {
    return http.post<IApiResponse<IPollDto>>(
      API.API_POLLS_CREATE(conversationId),
      payload
    );
  },

  fetchPolls(
    conversationId: string,
    params?: {
      status?: PollStatus;
      page?: number;
      limit?: number;
    }
  ) {
    const searchParams = new URLSearchParams();

    if (params?.status) {
      searchParams.set("status", params.status);
    }

    if (params?.page) {
      searchParams.set("page", String(params.page));
    }

    if (params?.limit) {
      searchParams.set("limit", String(params.limit));
    }

    const queryString = searchParams.toString();

    return http.get<IApiResponse<IPollDto[]>>(
      `${API.API_POLLS_LIST(conversationId)}${
        queryString ? `?${queryString}` : ""
      }`
    );
  },

  fetchPollDetail(conversationId: string, pollId: string) {
    return http.get<IApiResponse<IPollDto>>(
      API.API_POLLS_DETAIL(conversationId, pollId)
    );
  },

  updatePoll(
    conversationId: string,
    pollId: string,
    payload: IPollPayload
  ) {
    return http.patch<IApiResponse<IPollDto>>(
      API.API_POLLS_UPDATE(conversationId, pollId),
      payload
    );
  },

  votePoll(
    conversationId: string,
    pollId: string,
    payload: IVotePollPayload
  ) {
    return http.post<IApiResponse<IPollDto>>(
      API.API_POLLS_VOTE(conversationId, pollId),
      payload
    );
  },

  retractVote(conversationId: string, pollId: string) {
    return http.delete<IApiResponse<IPollDto>>(
      API.API_POLLS_RETRACT_VOTE(conversationId, pollId)
    );
  },

  addOption(conversationId: string, pollId: string, label: string) {
    return http.post<IApiResponse<IPollDto>>(
      API.API_POLLS_ADD_OPTION(conversationId, pollId),
      { label }
    );
  },

  removeOption(
    conversationId: string,
    pollId: string,
    optionId: string
  ) {
    return http.delete<IApiResponse<IPollDto>>(
      API.API_POLLS_REMOVE_OPTION(conversationId, pollId, optionId)
    );
  },

  closePoll(conversationId: string, pollId: string) {
    return http.post<IApiResponse<IPollDto>>(
      API.API_POLLS_CLOSE(conversationId, pollId),
      {}
    );
  },
};