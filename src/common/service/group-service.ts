import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse } from "../interface/auth-interface";
import { ConversationDto } from "../interface/chat-interface";

export const groupService = {
    createGroupConversation(name: string, memberIds: string[]) {
        return http.post<IApiResponse<ConversationDto>>(
            API.API_CONVERSATIONS_CREATE_GROUP,
            { name, memberIds }
        );
    },

    addMembersToGroup(conversationId: string, memberIds: string[]) {
        return http.post<IApiResponse<void>>(
            API.API_CONVERSATIONS_ADD_MEMBER(conversationId),
            { memberIds }
        );
    },

    removeMemberFromGroup(conversationId: string, memberId: string) {
        return http.delete<IApiResponse<void>>(
            API.API_CONVERSATIONS_REMOVE_MEMBER(conversationId, memberId)
        );
    },
    updateMemberRole(conversationId: string, memberId: string, role:"admin" | "member"){
        return http.patch<IApiResponse<void>>(
            API.API_CONVERSATIONS_UPDATE_ROLE(conversationId, memberId),
            { role }
        );
    },
    leaveGroup(conversationId: string){
        return http.post<IApiResponse<void>>(
            API.API_CONVERSATIONS_LEAVE(conversationId)
        );
    },
    disbandGroup(conversationId: string){
        return http.post<IApiResponse<void>>(
            API.API_CONVERSATIONS_GROUP_DISBAND(conversationId)
        );
    }
};