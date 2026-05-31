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

/**
 * AI conversation HTTP endpoints.
 *
 * `catchUp` — synchronous HTTP fetch; waits up to 30s for the LLM to generate
 * the summary. Returns the full result including `hadUnread` (false when the
 * user has no unread messages, in which case `summary` is empty).
 *
 * `getOrCreateZaiConversation` will be added here in B3.
 */
export const aiConversationApi = {
  catchUp: async (conversationId: string): Promise<CatchUpResult> => {
    const res = await http.get<IApiResponse<CatchUpResult>>(
      API.API_AI_CATCH_UP(conversationId),
      { timeout: 30000 }
    );
    return res.payload.data;
  },
};
