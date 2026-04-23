import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse } from "../interface/auth-interface";
import {
    IFriendRequest,
    ISendFriendRequestPayload,
    IRespondFriendRequestPayload,
    IFriendUser,
} from "../interface/friend-interface";

export const friendService = {
    getFriends() {
        return http.get<IApiResponse<IFriendUser[]>>(API.API_FRIENDS_LIST);
    },

    getPendingRequests() {
        return http.get<IApiResponse<IFriendRequest[]>>(API.API_FRIENDS_PENDING);
    },

    getSentRequests() {
        return http.get<IApiResponse<IFriendRequest[]>>(API.API_FRIENDS_SENT);
    },

    sendRequest(body: ISendFriendRequestPayload) {
        return http.post<IApiResponse<any>>(API.API_FRIENDS_SEND_REQUEST, body);
    },

    respondRequest(requestId: string, body: IRespondFriendRequestPayload) {
        return http.patch<IApiResponse<any>>(
            API.API_FRIENDS_RESPOND_REQUEST(requestId),
            body
        );
    },

    cancelRequest(requestId: string) {
        return http.delete<IApiResponse<any>>(
            API.API_FRIENDS_CANCEL_REQUEST(requestId)
        );
    },

    removeFriend(friendId: string) {
        return http.delete<IApiResponse<any>>(API.API_FRIENDS_REMOVE(friendId));
    },

    blockUser(userId: string) {
        return http.post<IApiResponse<any>>(API.API_FRIENDS_BLOCK(userId));
    },

    unblockUser(userId: string) {
        return http.delete<IApiResponse<any>>(API.API_FRIENDS_UNBLOCK(userId));
    },
};