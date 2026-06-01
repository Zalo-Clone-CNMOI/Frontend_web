import http from "../../api/http";
import { API } from "../../api/path";
import { IApiResponse } from "../../interface/auth-interface";

/** Response shape from BFF `GET /api/ai-assist/conversations/:id/catch-up`. */
export interface CatchUpResult {
  hadUnread: boolean;
  summary: string;
  messageCount: number;
  truncated: boolean;
  cached: boolean;
  generatedAt: number;
}

/** Response shape from BFF `POST /api/ai-assist/conversations/zai`. */
interface ZaiConversationResponse {
  conversationId: string;
}

/**
 * AI conversation HTTP endpoints.
 *
 * `catchUp` — synchronous HTTP fetch; waits up to 30s for the LLM to generate
 * the summary. Returns the full result including `hadUnread` (false when the
 * user has no unread messages, in which case `summary` is empty).
 *
 * `getOrCreateZaiConversation` — idempotent POST that returns the existing or
 * newly-created Zai personal conversation ID for the current user.
 * Rate-limited by BFF (10 req / 60 s). Throws on HTTP error.
 */
export const aiConversationApi = {
  catchUp: async (conversationId: string): Promise<CatchUpResult> => {
    const res = await http.get<IApiResponse<CatchUpResult>>(
      API.API_AI_CATCH_UP(conversationId),
      { timeout: 30000 }
    );
    if (!res.ok) {
      const msg = (res.payload as unknown as { message?: string })?.message;
      throw new Error(msg ?? `catch-up failed (${res.statusCode})`);
    }
    return res.payload.data;
  },

  // B3: ported from Frontend_mobile src/services/ai/aiConversationApi.ts
  // Adaptation: apiCallWithRefresh → web http.post() + res.ok guard.
  getOrCreateZaiConversation: async (): Promise<string> => {
    const res = await http.post<IApiResponse<ZaiConversationResponse>>(
      API.API_AI_ZAI_CONVERSATION,
      {},
    );
    if (!res.ok) {
      const msg = (res.payload as unknown as { message?: string })?.message;
      throw new Error(msg ?? `zai-conversation failed (${res.statusCode})`);
    }
    // Handle potential BFF double-wrap (mobile parity — unwrap both shapes).
    const data = res.payload.data as ZaiConversationResponse & { conversationId?: string };
    const convId = data?.conversationId;
    if (!convId) throw new Error("zai-conversation: missing conversationId in response");
    return convId;
  },
};
