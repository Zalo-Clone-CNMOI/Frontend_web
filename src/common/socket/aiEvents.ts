/**
 * AI socket event names + payload types for the 6 ai-core features.
 *
 * ⚠️ SOURCE OF TRUTH — mirrored VERBATIM from the backend contracts:
 *   - Event strings: Backend `libs/contracts/src/ws/events.ts` (WsEvents, lines 84-98)
 *   - Payload shapes: Backend `libs/contracts/src/ws/events.ts` (Ws*Payload, lines 598-718)
 *   - Entity shapes:  Backend `libs/contracts/src/kafka/ai.events.ts` (entity detection result)
 *
 * Web cannot import the Backend monorepo libs in a Next build, so we copy the
 * relevant subset here. If the backend contract changes, RE-SYNC this file.
 * Do NOT rename events/fields — web and mobile share one backend.
 */

/** AI subset of the backend `WsEvents` map (string values are character-for-character). */
export const AiWsEvents = {
  // client → server (requests)
  AiSmartReplyRequest: "ai:smart-reply:request",
  AiSummaryRequest: "ai:summary:request",
  AiTranslateRequest: "ai:translate:request",
  AiStreamCancel: "ai:stream:cancel",

  // server → client (results / pushes)
  AiSmartReplyResult: "ai:smart-reply:result",
  AiSummaryResult: "ai:summary:result",
  AiTranslateResult: "ai:translate:result",
  AiModerationResult: "ai:moderation:result",
  AiModerationEnforcement: "ai:moderation:enforcement",
  AiZaiTyping: "ai:zai:typing",
  AiStreamChunk: "ai:stream:chunk",
  AiStreamComplete: "ai:stream:complete",
  MessageEntities: "message:entities",
} as const;

export type AiWsEventName = (typeof AiWsEvents)[keyof typeof AiWsEvents];

/* ───────────── Smart Reply (A2) ───────────── */
export interface WsAiSmartReplyRequestPayload {
  conversation_id: string;
  last_message_id: string;
  last_message_body: string;
  context_count?: number;
}
export interface WsAiSmartReplyResultPayload {
  conversation_id: string;
  suggestions: string[];
}

/* ───────────── Summary (A3) ───────────── */
export interface WsAiSummaryRequestPayload {
  conversation_id: string;
  message_count?: number;
}
export interface WsAiSummaryResultPayload {
  conversation_id: string;
  summary: string;
  message_range: {
    from_message_id: string;
    to_message_id: string;
    count: number;
  };
  cached: boolean;
}

/* ───────────── Translation (B1) ───────────── */
export interface WsAiTranslateRequestPayload {
  message_id: string;
  conversation_id: string;
  body: string;
  source_language?: string;
  target_language: string;
}
export interface WsAiTranslateResultPayload {
  message_id: string;
  conversation_id: string;
  original_body: string;
  translated_body: string;
  source_language: string;
  target_language: string;
  cached: boolean;
}

/* ───────────── Moderation (A1) ───────────── */
export interface WsAiModerationResultPayload {
  message_id: string;
  conversation_id: string;
  is_flagged: boolean;
  labels: string[];
  confidence: number;
}
export interface WsAiModerationEnforcementPayload {
  message_id: string;
  conversation_id: string;
  sender_id: string;
  action: "none" | "soft_delete";
  outcome:
    | "not_flagged"
    | "deleted"
    | "already_deleted"
    | "deduplicated"
    | "failed";
  reason?: string;
  is_flagged: boolean;
  labels: string[];
  confidence: number;
  enforced_at: number;
}

/* ───────────── Entity Detection (B2) ───────────── */
export type EntityType =
  | "tool"
  | "company"
  | "person"
  | "concept"
  | "location"
  | "product"
  | "other";

export interface DetectedEntity {
  text: string;
  type: EntityType;
  start_index: number;
  end_index: number;
  confidence: number;
}

/** Broadcast `message:entities` payload (mirrors the BE ai-fanout broadcast shape). */
export interface WsMessageEntitiesPayload {
  conversation_id: string;
  message_id: string;
  entities: DetectedEntity[];
  user_id?: string;
  trace_id?: string;
}

/* ───────────── Zai Chat Streaming (B3) ───────────── */
export interface WsAiZaiTypingPayload {
  conversation_id: string;
  is_typing: boolean;
}
export interface WsAiStreamChunkPayload {
  stream_id: string;
  conversation_id: string;
  feature: string;
  chunk_index: number;
  content: string;
  is_final: boolean;
}
export interface WsAiStreamCompletePayload {
  stream_id: string;
  conversation_id: string;
  feature: string;
  total_chunks: number;
}
export interface WsAiStreamCancelPayload {
  conversation_id: string;
}
