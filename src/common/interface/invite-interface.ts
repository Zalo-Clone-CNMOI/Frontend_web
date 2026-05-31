export type GroupInviteStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'expired';

export interface GroupInviteDto {
  id: string;
  conversationId: string;
  inviterUserId: string;
  invitedUserId: string;
  status: GroupInviteStatus;
  message: string | null;
  expiresAt: string | number;
  createdAt: string | number;
  respondedAt: string | number | null;
  conversation?: {
    id: string;
    name: string;
    avatarUrl: string | null;
    memberCount?: number;
  };
  inviter?: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
  };
}

export interface SendGroupInvitesRequest {
  userIds: string[];
  message?: string;
  expiresInHours?: number;
}

export interface SendGroupInvitesResponse {
  acceptedCount: number;
  skippedCount: number;
  inviteIds: string[];
}

export interface GetPendingInvitesParams {
  page?: number;
  limit?: number;
  status?: GroupInviteStatus;
}

export interface GetConversationInvitesParams {
  page?: number;
  limit?: number;
  status?: GroupInviteStatus;
}

export interface InviteMessageMetadata {
  invite_id: string;
  group_id: string;
  group_name: string;
  group_avatar_url?: string;
  inviter_id: string;
  inviter_name: string;
  status: GroupInviteStatus;
  message?: string;
  member_count?: number;
  invited_user_id?: string;
}
