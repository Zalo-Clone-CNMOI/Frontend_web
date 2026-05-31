import { AiWsEvents } from "../aiEvents";

/**
 * A0 sanity test: proves the Jest pipeline (SWC transform + tsconfig `@/` paths
 * + module resolution) works, and locks the AI event strings to the backend
 * contract so accidental renames are caught (web + mobile share one backend).
 */
describe("A0 infra — AI socket event contract", () => {
  it("runs the jest pipeline", () => {
    expect(1 + 1).toBe(2);
  });

  it("matches backend WsEvents strings character-for-character", () => {
    expect(AiWsEvents.AiSmartReplyRequest).toBe("ai:smart-reply:request");
    expect(AiWsEvents.AiSmartReplyResult).toBe("ai:smart-reply:result");
    expect(AiWsEvents.AiSummaryRequest).toBe("ai:summary:request");
    expect(AiWsEvents.AiSummaryResult).toBe("ai:summary:result");
    expect(AiWsEvents.AiTranslateRequest).toBe("ai:translate:request");
    expect(AiWsEvents.AiTranslateResult).toBe("ai:translate:result");
    expect(AiWsEvents.AiModerationResult).toBe("ai:moderation:result");
    expect(AiWsEvents.AiModerationEnforcement).toBe("ai:moderation:enforcement");
    expect(AiWsEvents.AiZaiTyping).toBe("ai:zai:typing");
    expect(AiWsEvents.AiStreamChunk).toBe("ai:stream:chunk");
    expect(AiWsEvents.AiStreamComplete).toBe("ai:stream:complete");
    expect(AiWsEvents.AiStreamCancel).toBe("ai:stream:cancel");
    expect(AiWsEvents.MessageEntities).toBe("message:entities");
  });
});
