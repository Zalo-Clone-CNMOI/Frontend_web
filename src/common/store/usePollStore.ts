// src/common/store/usePollStore.ts

import { create } from "zustand";
import { pollService } from "@/src/common/service/poll-service";
import { IPollDto, IPollOptionDto, IPollPayload } from "@/src/common/interface/poll-interface";
import { useChatStore } from "./useChatStore";
import { normalizePollFromMessage } from "../helpers/normalize-poll";

type PollMap = Record<string, IPollDto[]>;

interface PollState {
    pollsByConversation: PollMap;
    pollDetailById: Record<string, IPollDto>;
    loadingByConversation: Record<string, boolean>;
    votingByPollId: Record<string, boolean>;
    error: string | null;
}

interface PollActions {
    setPolls: (conversationId: string, polls: IPollDto[]) => void;
    upsertPoll: (conversationId: string, poll: IPollDto) => void;
    removePollOption: (
        conversationId: string,
        pollId: string,
        optionId: string
    ) => void;

    fetchPolls: (
        conversationId: string,
        params?: {
            status?: "active" | "closed";
            page?: number;
            limit?: number;
        }
    ) => Promise<void>;

    fetchPollDetail: (
        conversationId: string,
        pollId: string,
        force?: boolean
    ) => Promise<IPollDto | null>;

    createPoll: (
        conversationId: string,
        payload: IPollPayload
    ) => Promise<IPollDto | null>;

    updatePoll: (
        conversationId: string,
        pollId: string,
        payload: IPollPayload
    ) => Promise<IPollDto | null>;

    votePoll: (
        conversationId: string,
        pollId: string,
        optionIds: string[]
    ) => Promise<void>;

    retractVote: (conversationId: string, pollId: string) => Promise<void>;

    addOption: (
        conversationId: string,
        pollId: string,
        label: string
    ) => Promise<void>;

    closePoll: (conversationId: string, pollId: string) => Promise<void>;

    resetPollState: () => void;
}

type PollStore = PollState & PollActions;

const initialPollState: PollState = {
    pollsByConversation: {},
    pollDetailById: {},
    loadingByConversation: {},
    votingByPollId: {},
    error: null,
};

const getPollId = (poll: IPollDto) => poll.id;

export const usePollStore = create<PollStore>((set, get) => ({
    ...initialPollState,

    setPolls: (conversationId, polls) =>
        set((state) => ({
            pollsByConversation: {
                ...state.pollsByConversation,
                [conversationId]: polls,
            },
            pollDetailById: polls.reduce(
                (acc, poll) => {
                    acc[getPollId(poll)] = poll;
                    return acc;
                },
                { ...state.pollDetailById }
            ),
        })),

    upsertPoll: (conversationId, poll) =>
        set((state) => {
            const prev = state.pollsByConversation[conversationId] || [];
            const exists = prev.some((item) => item.id === poll.id);

            const next = exists
                ? prev.map((item) => (item.id === poll.id ? poll : item))
                : [poll, ...prev];

            return {
                pollsByConversation: {
                    ...state.pollsByConversation,
                    [conversationId]: next,
                },
                pollDetailById: {
                    ...state.pollDetailById,
                    [poll.id]: poll,
                },
            };
        }),

    removePollOption: (conversationId, pollId, optionId) =>
        set((state) => {
            const patch = (poll: IPollDto): IPollDto =>
                poll.id === pollId
                    ? {
                        ...poll,
                        options: poll.options.filter((option: IPollOptionDto) => option.id !== optionId),
                        my_option_ids: poll.my_option_ids?.filter((id) => id !== optionId),
                    }
                    : poll;

            return {
                pollsByConversation: {
                    ...state.pollsByConversation,
                    [conversationId]: (state.pollsByConversation[conversationId] || []).map(
                        patch
                    ),
                },
                pollDetailById: state.pollDetailById[pollId]
                    ? {
                        ...state.pollDetailById,
                        [pollId]: patch(state.pollDetailById[pollId]),
                    }
                    : state.pollDetailById,
            };
        }),

    fetchPolls: async (conversationId, params) => {
        if (!conversationId) return;

        try {
            set((state) => ({
                loadingByConversation: {
                    ...state.loadingByConversation,
                    [conversationId]: true,
                },
                error: null,
            }));

            const res = await pollService.fetchPolls(conversationId, params);

            const rawPolls = Array.isArray(res?.payload?.data)
                ? res.payload.data
                : Array.isArray(res?.payload?.data)
                    ? res.payload.data
                    : [];

            const polls: IPollDto[] = rawPolls
                .map((poll) => normalizePollFromMessage(poll))
                .filter((poll): poll is IPollDto => Boolean(poll));

            get().setPolls(conversationId, polls);
        } catch (error: unknown) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Không thể tải danh sách bình chọn",
            });
        } finally {
            set((state) => ({
                loadingByConversation: {
                    ...state.loadingByConversation,
                    [conversationId]: false,
                },
            }));
        }
    },

    fetchPollDetail: async (conversationId, pollId, force = false) => {
        if (!conversationId || !pollId) return null;

        const cached = get().pollDetailById[pollId];
        if (!force && cached) return cached;

        try {
            const res = await pollService.fetchPollDetail(conversationId, pollId);
            const rawPoll = res?.payload?.data ?? res?.payload;
            const poll = rawPoll ? normalizePollFromMessage(rawPoll) : null;

            if (!poll?.id) return null;

            get().upsertPoll(conversationId, poll);

            return poll;
        } catch (error: unknown) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Không thể tải chi tiết bình chọn",
            });
            return null;
        }
    },

    createPoll: async (conversationId, payload) => {
        try {
            const res = await pollService.createPoll(conversationId, payload);

            const created = res?.payload?.data as
                | {
                    poll_id?: string;
                    id?: string;
                    message_id?: string;
                }
                | undefined;

            const pollId = created?.poll_id ?? created?.id;
            const messageId = created?.message_id;

            if (!pollId) return null;

            const poll = await get().fetchPollDetail(conversationId, pollId, true);

            if (poll) {
                useChatStore.getState().upsertPollMessage(conversationId, poll, {
                    messageId,
                    createdAt: Date.now(),
                    creatorId: poll.creator_id ?? poll.created_by?.id,
                });
            }

            return poll ?? null;
        } catch (error: unknown) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Không thể tạo bình chọn",
            });
            return null;
        }
    },
    updatePoll: async (conversationId, pollId, payload) => {
        try {
            const res = await pollService.updatePoll(conversationId, pollId, payload);

            const updated = res?.payload?.data as
                | {
                    poll_id?: string;
                    id?: string;
                    edited_at?: number;
                }
                | undefined;

            const nextPollId = updated?.poll_id ?? updated?.id ?? pollId;

            const poll = await get().fetchPollDetail(conversationId, nextPollId, true);

            if (poll) {
                get().upsertPoll(conversationId, poll);
                useChatStore.getState().upsertPollMessage(conversationId, poll);
            }

            return poll ?? null;
        } catch (error: unknown) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Không thể cập nhật bình chọn",
            });
            return null;
        }
    },

    votePoll: async (conversationId, pollId, optionIds) => {
        if (!conversationId || !pollId) return;

        console.log("[votePoll] start", {
            conversationId,
            pollId,
            optionIds,
        });

        try {
            set((state) => ({
                votingByPollId: {
                    ...state.votingByPollId,
                    [pollId]: true,
                },
                error: null,
            }));

            const res = await pollService.votePoll(conversationId, pollId, {
                option_ids: optionIds,
            });

            console.log("[votePoll] vote response", res);

            const beforeFetchPoll = get().pollDetailById[pollId];
            console.log("[votePoll] before fetch detail poll", beforeFetchPoll);

            const poll = await get().fetchPollDetail(conversationId, pollId, true);

            console.log("[votePoll] after fetch detail poll", poll);

            if (poll) {
                get().upsertPoll(conversationId, poll);

                console.log("[votePoll] after upsert poll store", {
                    pollDetail: get().pollDetailById[pollId],
                    pollsByConversation: get().pollsByConversation[conversationId],
                });

                useChatStore.getState().upsertPollMessage(conversationId, poll);

                console.log("[votePoll] after upsert chat message", {
                    messages: useChatStore
                        .getState()
                        .messagesByConversation[conversationId]
                        ?.filter((msg) => msg.poll_id === pollId || msg.pollId === pollId),
                });
            }
        } catch (error: unknown) {
            console.log("[votePoll] error", error);

            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Bình chọn thất bại",
            });
        } finally {
            set((state) => ({
                votingByPollId: {
                    ...state.votingByPollId,
                    [pollId]: false,
                },
            }));

            console.log("[votePoll] end", {
                pollDetail: get().pollDetailById[pollId],
            });
        }
    },

    retractVote: async (conversationId, pollId) => {
        try {
            set((state) => ({
                votingByPollId: {
                    ...state.votingByPollId,
                    [pollId]: true,
                },
            }));

            await pollService.retractVote(conversationId, pollId);

            const poll = await get().fetchPollDetail(conversationId, pollId, true);

            if (poll) {
                useChatStore.getState().upsertPollMessage(conversationId, poll);
            }
        } catch (error: any) {
            set({
                error: error?.message || "Không thể thu hồi bình chọn",
            });
        } finally {
            set((state) => ({
                votingByPollId: {
                    ...state.votingByPollId,
                    [pollId]: false,
                },
            }));
        }
    },

    addOption: async (conversationId, pollId, label) => {
        const nextLabel = label.trim();
        if (!nextLabel) return;

        try {
            const res = await pollService.addOption(conversationId, pollId, nextLabel);
            const poll = await get().fetchPollDetail(conversationId, pollId, true);

            if (poll) {
                useChatStore.getState().upsertPollMessage(conversationId, poll);
            }
        } catch (error: any) {
            set({
                error: error?.message || "Không thể thêm phương án",
            });
        }
    },

    closePoll: async (conversationId, pollId) => {
        try {
            const res = await pollService.closePoll(conversationId, pollId);
            const poll = await get().fetchPollDetail(conversationId, pollId, true);

            if (poll) {
                useChatStore.getState().upsertPollMessage(conversationId, poll);
            }
        } catch (error: any) {
            set({
                error: error?.message || "Không thể đóng bình chọn",
            });
        }
    },

    resetPollState: () => set(initialPollState),
}));