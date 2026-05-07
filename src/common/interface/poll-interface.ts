export type PollStatus = "active" | "closed";
export type PollClosedReason = "by_creator" | "by_admin" | "expired";

export interface IPollOptionDto {
    id: string;
    label: string;
    order_index?: number;
    vote_count?: number;
    voter_ids?: string[];
    voters?: {
        id: string;
        fullName?: string;
        avatarUrl?: string;
    }[];
}

export interface IPollDto {
    id: string;
    conversation_id: string;
    question: string;
    options: IPollOptionDto[];

    creator_id?: string;
    created_by?: {
        id: string;
        fullName?: string;
    };

    allow_multiple: boolean;
    allow_add_option: boolean;
    is_anonymous?: boolean;

    status: PollStatus;
    expires_at?: string | number | null;
    closed_at?: string | number | null;
    closed_reason?: PollClosedReason | null;

    created_at?: string | number;

    my_option_ids?: string[];
    total_votes?: number;
    total_voters?: number;
}

export interface IPollPayload {
    question?: string;
    options?: {
        label: string;
    }[];
    allow_multiple?: boolean;
    allow_add_option?: boolean;
    is_anonymous?: boolean;
    expires_in_hours?: number;
    expires_at?: string | null;
    edited_option_labels?: {
        option_id: string;
        label: string;
    }[];
}

export interface IVotePollPayload {
    option_ids: string[];
}