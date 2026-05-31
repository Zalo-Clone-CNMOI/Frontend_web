import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers, unregisterAiSocketHandlers } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import { useChatStore } from "../../store/useChatStore";
import { useToastStore } from "../../store/useToastStore";

/**
 * A1 — Moderation. Tests the real socket wiring: registerAiSocketHandlers binds
 * the two moderation events, and each handler routes into the chat store / toast
 * exactly as mobile's AIHandler does. A fake socket captures the bound handlers
 * so we can fire payloads at them.
 */

type Handler = (payload: unknown) => void;

function makeFakeSocket() {
  const handlers = new Map<string, Handler>();
  const offCalls: string[] = [];
  const socket = {
    on(event: string, handler: Handler) {
      handlers.set(event, handler);
    },
    off(event?: string) {
      // register() calls off() first; record which events get cleared so a test
      // can assert symmetric teardown. Nothing else to clear in the fake.
      if (event) offCalls.push(event);
    },
  } as unknown as Socket;
  const emit = (event: string, payload: unknown) => handlers.get(event)?.(payload);
  return { socket, emit, offCalls };
}

describe("A1 moderation socket handlers", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("binds both moderation events on register", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);
    // A bound handler exists for each event (emit is a no-op otherwise).
    const show = jest
      .spyOn(useToastStore.getState(), "show")
      .mockImplementation(() => {});
    emit(AiWsEvents.AiModerationResult, {
      message_id: "m",
      conversation_id: "c",
      is_flagged: true,
      labels: [],
      confidence: 1,
    });
    expect(show).toHaveBeenCalledTimes(1);
  });

  it("enforcement with outcome 'deleted' soft-removes the message and toasts", () => {
    const update = jest
      .spyOn(useChatStore.getState(), "updateMessage")
      .mockImplementation(() => {});
    const show = jest
      .spyOn(useToastStore.getState(), "show")
      .mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiModerationEnforcement, {
      message_id: "m1",
      conversation_id: "c1",
      sender_id: "u2",
      action: "soft_delete",
      outcome: "deleted",
      is_flagged: true,
      labels: ["spam"],
      confidence: 1,
      enforced_at: 123,
    });

    expect(update).toHaveBeenCalledWith("c1", "m1", {
      removed: true,
      removalReason: "ai_moderation",
    });
    expect(show).toHaveBeenCalledTimes(1);
  });

  it("enforcement honours an explicit reason and 'already_deleted' outcome", () => {
    const update = jest
      .spyOn(useChatStore.getState(), "updateMessage")
      .mockImplementation(() => {});
    jest.spyOn(useToastStore.getState(), "show").mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiModerationEnforcement, {
      message_id: "m2",
      conversation_id: "c2",
      outcome: "already_deleted",
      reason: "hate_speech",
    });

    expect(update).toHaveBeenCalledWith("c2", "m2", {
      removed: true,
      removalReason: "hate_speech",
    });
  });

  it("enforcement with a non-removal outcome does nothing", () => {
    const update = jest
      .spyOn(useChatStore.getState(), "updateMessage")
      .mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiModerationEnforcement, {
      message_id: "m1",
      conversation_id: "c1",
      outcome: "not_flagged",
    });

    expect(update).not.toHaveBeenCalled();
  });

  it("enforcement with missing ids is ignored", () => {
    const update = jest
      .spyOn(useChatStore.getState(), "updateMessage")
      .mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiModerationEnforcement, { outcome: "deleted" });

    expect(update).not.toHaveBeenCalled();
  });

  it("result toasts only when the message is flagged", () => {
    const show = jest
      .spyOn(useToastStore.getState(), "show")
      .mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiModerationResult, {
      message_id: "m1",
      conversation_id: "c1",
      is_flagged: false,
      labels: [],
      confidence: 0,
    });
    expect(show).not.toHaveBeenCalled();

    emit(AiWsEvents.AiModerationResult, {
      message_id: "m1",
      conversation_id: "c1",
      is_flagged: true,
      labels: ["spam"],
      confidence: 0.9,
    });
    expect(show).toHaveBeenCalledTimes(1);
  });

  // S2 — teardown is symmetric: unregister must socket.off() every AI event.
  it("unregister clears every AI event via socket.off", () => {
    const { socket, offCalls } = makeFakeSocket();
    unregisterAiSocketHandlers(socket);
    // The fake socket records each off(event). Both A1 moderation events (and the
    // other AI events) must be cleared so no stale listener survives a re-init.
    expect(offCalls).toContain(AiWsEvents.AiModerationResult);
    expect(offCalls).toContain(AiWsEvents.AiModerationEnforcement);
  });

  // S3 — enforcement for a message that isn't loaded is a safe no-op. The handler
  // forwards every deleted/already_deleted outcome without checking membership;
  // the store action itself no-ops on an unknown id. So it must neither throw nor
  // change behaviour — it still forwards the same update.
  it("enforcement with 'deleted' for an unknown message id is a safe no-op", () => {
    const update = jest
      .spyOn(useChatStore.getState(), "updateMessage")
      .mockImplementation(() => {});
    jest.spyOn(useToastStore.getState(), "show").mockImplementation(() => {});
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    expect(() =>
      emit(AiWsEvents.AiModerationEnforcement, {
        message_id: "unknown-msg",
        conversation_id: "unknown-convo",
        outcome: "deleted",
        is_flagged: true,
        labels: ["spam"],
        confidence: 1,
      })
    ).not.toThrow();

    expect(update).toHaveBeenCalledWith("unknown-convo", "unknown-msg", {
      removed: true,
      removalReason: "ai_moderation",
    });
  });
});
