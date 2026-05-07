import { IPollDto } from "@/src/common/interface/poll-interface";

const safeParseMetadata = (metadata: unknown) => {
  if (!metadata) return null;
  if (typeof metadata !== "string") return metadata;

  try {
    return JSON.parse(metadata);
  } catch {
    return null;
  }
};

export const normalizePollFromMessage = (raw: any): IPollDto | null => {
  const parsedMetadata = safeParseMetadata(raw?.metadata);

  /**
   * Hỗ trợ nhiều dạng response:
   * 1. Message poll: raw.metadata chứa poll data
   * 2. Poll detail: raw trực tiếp là poll data
   * 3. Response wrapper: raw.data là poll data
   * 4. Socket: raw trực tiếp là event poll created
   */
  const source =
    parsedMetadata ??
    raw?.poll ??
    raw?.data?.poll ??
    raw?.data ??
    raw;

  const pollId =
    source?.poll_id ??
    source?.id ??
    raw?.poll_id ??
    raw?.pollId ??
    raw?.id;

  const conversationId =
    source?.conversation_id ??
    source?.conversationId ??
    raw?.conversation_id ??
    raw?.conversationId;

  if (!pollId || !conversationId) {
    return null;
  }

  const options = Array.isArray(source?.options)
    ? source.options
    : Array.isArray(raw?.options)
      ? raw.options
      : [];

  return {
    id: String(pollId),
    conversation_id: String(conversationId),

    question:
      source?.question ??
      raw?.question ??
      raw?.body ??
      "",

    options: options.map((option: any) => ({
      id: String(option?.option_id ?? option?.id),
      label: option?.label ?? "",
      order_index: option?.order_index,
      vote_count: Number(option?.vote_count ?? 0),
      voter_ids: option?.voter_ids,
      voters: option?.voters,
    })),

    creator_id:
      source?.creator_id ??
      raw?.creator_id ??
      raw?.sender_id ??
      raw?.senderId,

    created_by:
      source?.created_by ??
      (
        source?.creator_id || raw?.creator_id || raw?.sender_id || raw?.senderId
          ? {
              id: String(
                source?.creator_id ??
                  raw?.creator_id ??
                  raw?.sender_id ??
                  raw?.senderId
              ),
            }
          : undefined
      ),

    allow_multiple: Boolean(source?.allow_multiple ?? raw?.allow_multiple),
    allow_add_option: Boolean(source?.allow_add_option ?? raw?.allow_add_option),
    is_anonymous: Boolean(source?.is_anonymous ?? raw?.is_anonymous),

    status: source?.status ?? raw?.status ?? "active",

    expires_at: source?.expires_at ?? raw?.expires_at ?? null,
    closed_at: source?.closed_at ?? raw?.closed_at ?? null,
    closed_reason:
      source?.closed_reason ??
      raw?.closed_reason ??
      raw?.reason ??
      null,

    created_at:
      source?.created_at ??
      raw?.created_at ??
      raw?.createdAt ??
      Date.now(),

    my_option_ids:
      source?.my_vote ??
      source?.my_option_ids ??
      raw?.my_vote ??
      raw?.my_option_ids ??
      [],

    total_votes:
      source?.total_votes !== undefined
        ? Number(source.total_votes)
        : raw?.total_votes !== undefined
          ? Number(raw.total_votes)
          : undefined,

    total_voters:
      source?.total_voters !== undefined
        ? Number(source.total_voters)
        : raw?.total_voters !== undefined
          ? Number(raw.total_voters)
          : undefined,
  };
};