export const API = {
    /* ================= AUTH ================= */
    API_AUTH_REGISTER: "/api/auth/register",
    API_AUTH_LOGIN: "/api/auth/login",
    API_AUTH_REFRESH: "/api/auth/refresh",
    API_AUTH_LOGOUT: "/api/auth/logout",
    // API_AUTH_FORGOT_PASSWORD: "/api/auth/forgot-password",
    API_AUTH_RESET_PASSWORD: "/api/auth/reset-password",

    /* ================= QR LOGIN ================= */
    API_AUTH_QR_GENERATE: "/api/auth/qr/generate",
    API_AUTH_QR_STATUS: (sessionId: string) =>
        `/api/auth/qr/status/${sessionId}`,


    /* ================= USERS ================= */
    API_USERS_ME: "/api/users/me",
    API_USERS_UPDATE_ME: "/api/users/me",
    API_USERS_SEARCH: "/api/users/search",
    API_USERS_PUBLIC_PROFILE: (userId: string) =>
        `/api/users/${userId}`,

    /* ================= FRIENDS ================= */
    API_FRIENDS_LIST: "/api/friends",
    API_FRIENDS_PENDING: "/api/friends/requests/pending",
    API_FRIENDS_SENT: "/api/friends/requests/sent",
    API_FRIENDS_SEND_REQUEST: "/api/friends/requests",
    API_FRIENDS_RESPOND_REQUEST: (requestId: string) =>
        `/api/friends/requests/${requestId}`,
    API_FRIENDS_CANCEL_REQUEST: (requestId: string) =>
        `/api/friends/requests/${requestId}`,
    API_FRIENDS_REMOVE: (friendId: string) =>
        `/api/friends/${friendId}`,
    API_FRIENDS_BLOCK: (userId: string) =>
        `/api/friends/${userId}/block`,
    API_FRIENDS_UNBLOCK: (userId: string) =>
        `/api/friends/${userId}/block`,

    /* ================= CONVERSATIONS ================= */
    API_CONVERSATIONS_LIST: "/api/conversations",
    API_CONVERSATIONS_DETAIL: (conversationId: string) =>
        `/api/conversations/${conversationId}`,
    API_CONVERSATIONS_UPDATE: (conversationId: string) =>
        `/api/conversations/${conversationId}`,
    API_CONVERSATIONS_CREATE_GROUP: "/api/conversations/group",
    API_CONVERSATIONS_DIRECT: "/api/conversations/direct",
    API_CONVERSATIONS_ADD_MEMBER: (conversationId: string) =>
        `/api/conversations/${conversationId}/members`,
    API_CONVERSATIONS_REMOVE_MEMBER: (conversationId: string, memberId: string) =>
        `/api/conversations/${conversationId}/members/${memberId}`,
    API_CONVERSATIONS_LEAVE: (conversationId: string) =>
        `/api/conversations/${conversationId}/leave`,
    API_CONVERSATIONS_UPDATE_ROLE: (conversationId: string, memberId: string) =>
        `/api/conversations/${conversationId}/members/${memberId}/role`,
    API_CONVERSATIONS_SETTINGS: (conversationId: string) =>
        `/api/conversations/${conversationId}/settings`,
    API_CONVERSATIONS_READ: (conversationId: string) =>
        `/api/conversations/${conversationId}/read`,
    API_CONVERSATIONS_GROUP_DISBAND: (conversationId: string) =>
        `/api/conversations/${conversationId}/disband`,
    API_CONVERSATIONS_PIN: (conversationId: string) =>
        `/api/conversations/${conversationId}/pin`,
    API_CONVERSATIONS_GROUP_SETTINGS: (conversationId: string) =>
        `/api/conversations/${conversationId}/group-settings`,

    /* ================= GROUP INVITES ================= */
    API_CONVERSATIONS_SEND_INVITES: (conversationId: string) =>
        `/api/conversations/${conversationId}/invites`,
    API_CONVERSATIONS_PENDING_INVITES: "/api/conversations/invites/pending",
    API_CONVERSATIONS_LIST_INVITES: (conversationId: string) =>
        `/api/conversations/${conversationId}/invites`,
    API_CONVERSATIONS_ACCEPT_INVITE: (conversationId: string, inviteId: string) =>
        `/api/conversations/${conversationId}/invites/${inviteId}/accept`,
    API_CONVERSATIONS_REJECT_INVITE: (conversationId: string, inviteId: string) =>
        `/api/conversations/${conversationId}/invites/${inviteId}/reject`,
    API_CONVERSATIONS_CANCEL_INVITE: (conversationId: string, inviteId: string) =>
        `/api/conversations/${conversationId}/invites/${inviteId}/cancel`,

    /* ================= MESSAGES ================= */


    API_MESSAGES: (conversationId: string) =>
        `/api/messages/${conversationId}`,

    API_MESSAGE_DETAIL: (
        conversationId: string,
        createdAt: number | string,
        messageId: string
    ) => `/api/messages/${conversationId}/${createdAt}/${messageId}`,

    API_MESSAGE_REACTIONS: (messageId: string) =>
        `/api/messages/${messageId}/reactions`,

    API_MESSAGES_FORWARD: "/api/messages/forward",

    API_MESSAGE_PIN: (
        conversationId: string,
        createdAt: number,
        messageId: string
    ) => `/api/messages/${conversationId}/${createdAt}/${messageId}/pin`,

    API_MESSAGES_PINNED: (conversationId: string) =>
        `/api/messages/${conversationId}/pins`,

    API_MESSAGES_SEARCH: (conversationId: string) =>
        `/api/messages/${conversationId}/search`,
    /* ================= POLLS ================= */
    API_POLLS_CREATE: (conversationId: string) =>
        `/api/conversations/${conversationId}/polls`,

    API_POLLS_LIST: (conversationId: string) =>
        `/api/conversations/${conversationId}/polls`,

    API_POLLS_DETAIL: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}`,

    API_POLLS_UPDATE: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}`,

    API_POLLS_VOTE: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}/vote`,

    API_POLLS_RETRACT_VOTE: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}/vote`,

    API_POLLS_ADD_OPTION: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}/options`,

    API_POLLS_REMOVE_OPTION: (
        conversationId: string,
        pollId: string,
        optionId: string
    ) => `/api/conversations/${conversationId}/polls/${pollId}/options/${optionId}`,

    API_POLLS_CLOSE: (conversationId: string, pollId: string) =>
        `/api/conversations/${conversationId}/polls/${pollId}/close`,

    /* ================= CALL ================= */
    API_ICE_SERVERS: "/api/calls/ice-servers",
    API_CONVERSATION_CALL_STATE: (conversationId: string) => `/api/conversations/${conversationId}/call-state`,
    API_CONVERSATION_CALL_END: (conversationId: string, callId: string) => `/api/conversations/${conversationId}/calls/${callId}/end`,

    /* ================= AI (ai-core) ================= */
    // Summary / Catch-up (A3) — synchronous HTTP, 30s timeout
    API_AI_CATCH_UP: (conversationId: string) =>
        `/api/ai-assist/conversations/${conversationId}/catch-up`,
    // Entity Info panel (B2) — GET with ?text=&type=&lang=
    API_AI_ENTITY_INFO: "/api/entity-info",
    // Entity Detection hydration — GET with ?conversation_id=
    API_ENTITY_DETECTIONS: "/api/entity-detections",
    // Zai conversation bootstrap (B3)
    API_AI_ZAI_CONVERSATION: "/api/ai-assist/conversations/zai",
} as const;
