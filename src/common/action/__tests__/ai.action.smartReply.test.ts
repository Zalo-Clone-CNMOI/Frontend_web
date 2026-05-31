import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import { useAISmartReplyStore } from "../../store/useAISmartReplyStore";
import { useChatStore } from "../../store/useChatStore";
import { getSocket } from "../../socket/socket";
import { smartReplyService } from "../../service/ai/smartReplyService";
import type { UiMessage } from "../../interface/chat-interface";

/**
 * A2 — Smart Reply. Mirrors the A1 moderation test style: a fake socket records
 * the bound `on`/`off` handlers and lets us `emit` payloads at them. The same
 * fake is returned by the mocked `getSocket()` so the service emits into it.
 *
 * Covers the parts that must match mobile/BE EXACTLY: the result handler routes
 * into the store, the request payload shape + last-VALID-message selection, the
 * ack.error path, the 20s safety-net timeout, and the inbound non-self trigger.
 */

// The service reads getSocket() from the socket module — replace it with the fake.
jest.mock("../../socket/socket", () => ({
  getSocket: jest.fn(),
}));

type Handler = (payload: unknown) => void;
type AckFn = (ack: unknown) => void;

interface FakeSocket {
  socket: Socket;
  emit: (event: string, payload: unknown) => void;
  emitted: Array<{ event: string; payload: unknown; ack?: AckFn }>;
  connected: boolean;
}

function makeFakeSocket(connected = true): FakeSocket {
  const handlers = new Map<string, Handler>();
  const emitted: FakeSocket["emitted"] = [];
  const socket = {
    connected,
    on(event: string, handler: Handler) {
      handlers.set(event, handler);
    },
    off(_event?: string) {
      // register() calls off() first; nothing else to clear in the fake.
    },
    // client→server emit with optional ack (3rd arg) — record it for assertions.
    emit(event: string, payload: unknown, ack?: AckFn) {
      emitted.push({ event, payload, ack });
    },
  } as unknown as Socket & { connected: boolean };
  const emit = (event: string, payload: unknown) => handlers.get(event)?.(payload);
  return { socket, emit, emitted, connected };
}

const mockedGetSocket = getSocket as jest.MockedFunction<typeof getSocket>;

function resetSmartReplyStore() {
  useAISmartReplyStore.setState({
    suggestionsByConversation: {},
    loadingByConversation: {},
    errorByConversation: {},
  });
}

function makeMsg(partial: Partial<UiMessage>): UiMessage {
  return {
    messageId: "m",
    conversationId: "c",
    senderId: "u",
    body: "hi",
    createdAt: 1,
    attachments: [],
    ...partial,
  };
}

describe("A2 smart reply — result handler", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    resetSmartReplyStore();
  });

  it("populates suggestions and clears loading/error", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    // Seed a stale loading/error to prove the handler clears them.
    useAISmartReplyStore.getState().setLoading("c1", true);
    useAISmartReplyStore.getState().setError("c1", "old error");

    fake.emit(AiWsEvents.AiSmartReplyResult, {
      conversation_id: "c1",
      suggestions: ["Yes", "No", "Maybe"],
    });

    expect(useAISmartReplyStore.getState().getSuggestions("c1")).toEqual([
      "Yes",
      "No",
      "Maybe",
    ]);
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(false);
    expect(useAISmartReplyStore.getState().getError("c1")).toBeNull();
  });

  it("treats a missing suggestions array as empty (BE silent-failure shape)", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);
    useAISmartReplyStore.getState().setLoading("c2", true);

    fake.emit(AiWsEvents.AiSmartReplyResult, { conversation_id: "c2" });

    expect(useAISmartReplyStore.getState().getSuggestions("c2")).toEqual([]);
    expect(useAISmartReplyStore.getState().isLoading("c2")).toBe(false);
  });

  it("ignores a result with no conversation_id", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);
    const setSuggestions = jest.spyOn(
      useAISmartReplyStore.getState(),
      "setSuggestions"
    );

    fake.emit(AiWsEvents.AiSmartReplyResult, { suggestions: ["x"] });

    expect(setSuggestions).not.toHaveBeenCalled();
  });
});

describe("A2 smart reply — requestSmartReply (payload, ack, timeout)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetSmartReplyStore();
    mockedGetSocket.mockReset();
    useChatStore.setState({ messagesByConversation: {} });
  });

  it("emits exactly { conversation_id, last_message_id, last_message_body } for the LAST VALID message", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    useChatStore.setState({
      messagesByConversation: {
        c1: [
          makeMsg({ messageId: "m1", body: "first", senderId: "other" }),
          makeMsg({ messageId: "m2", body: "second", senderId: "other" }),
          // last two are NOT valid → must be skipped
          makeMsg({ messageId: "m3", body: "deleted", isDeleted: true }),
          makeMsg({ messageId: "m4", body: "removed", removed: true }),
        ],
      },
    });

    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });

    expect(fake.emitted).toHaveLength(1);
    const sent = fake.emitted[0];
    expect(sent.event).toBe(AiWsEvents.AiSmartReplyRequest);
    // Exact key set — no extra fields like context_count.
    expect(Object.keys(sent.payload as object).sort()).toEqual([
      "conversation_id",
      "last_message_body",
      "last_message_id",
    ]);
    expect(sent.payload).toEqual({
      conversation_id: "c1",
      last_message_id: "m2",
      last_message_body: "second",
    });
    // Loading was entered, error cleared.
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(true);
    expect(useAISmartReplyStore.getState().getError("c1")).toBeNull();
  });

  it("does nothing (no emit, no spinner) when the socket is missing", async () => {
    mockedGetSocket.mockReturnValue(null);
    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(false);
  });

  it("does nothing when the socket is disconnected", async () => {
    const fake = makeFakeSocket(false);
    mockedGetSocket.mockReturnValue(fake.socket);
    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });
    expect(fake.emitted).toHaveLength(0);
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(false);
  });

  it("ack.error sets the error and clears loading", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useChatStore.setState({
      messagesByConversation: { c1: [makeMsg({ messageId: "m1", senderId: "o" })] },
    });

    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });

    // Fire the ack with an error, as the gateway would on a throw.
    fake.emitted[0].ack?.({ error: "rate_limited" });

    expect(useAISmartReplyStore.getState().getError("c1")).toBe("rate_limited");
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(false);
  });

  it("a success ack ({ status: 'queued' }) leaves loading on (result arrives later)", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useChatStore.setState({
      messagesByConversation: { c1: [makeMsg({ messageId: "m1", senderId: "o" })] },
    });

    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });
    fake.emitted[0].ack?.({ status: "queued" });

    // Still loading — only the result event or timeout clears it.
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(true);
    expect(useAISmartReplyStore.getState().getError("c1")).toBeNull();
  });

  it("clears loading after the 20s safety-net timeout when nothing comes back", async () => {
    jest.useFakeTimers();
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useChatStore.setState({
      messagesByConversation: { c1: [makeMsg({ messageId: "m1", senderId: "o" })] },
    });

    await smartReplyService.requestSmartReply({
      conversationId: "c1",
      userId: "me",
    });
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(true);

    // Do NOT fire the ack; advance past 20s.
    jest.advanceTimersByTime(20000);
    expect(useAISmartReplyStore.getState().isLoading("c1")).toBe(false);
    jest.useRealTimers();
  });
});

describe("A2 smart reply — inbound trigger gate (non-self vs self)", () => {
  // The inbound trigger lives in chat.action's handleIncomingMessage closure; we
  // exercise the exact same gate it applies before calling the service, then the
  // real service path (mocked socket) so the assertion is end-to-end on emit.
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetSmartReplyStore();
    mockedGetSocket.mockReset();
    useChatStore.setState({
      messagesByConversation: { conv1: [makeMsg({ messageId: "m1", senderId: "other" })] },
    });
  });

  function triggerForInbound(msg: { conversationId: string; messageId: string; senderId: string }, currentUserId: string) {
    // Replica of the gate in chat.action.tsx handleIncomingMessage.
    if (
      msg.conversationId &&
      msg.messageId &&
      msg.senderId &&
      msg.senderId !== currentUserId
    ) {
      void smartReplyService
        .requestSmartReply({ conversationId: msg.conversationId, userId: currentUserId })
        .catch(() => {});
    }
  }

  it("requests smart reply for an inbound NON-SELF message", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    const spy = jest.spyOn(smartReplyService, "requestSmartReply");

    triggerForInbound(
      { conversationId: "conv1", messageId: "m1", senderId: "other" },
      "me"
    );
    await Promise.resolve();

    expect(spy).toHaveBeenCalledWith({ conversationId: "conv1", userId: "me" });
    expect(fake.emitted).toHaveLength(1);
    expect(fake.emitted[0].event).toBe(AiWsEvents.AiSmartReplyRequest);
  });

  it("does NOT request smart reply for a SELF-authored message", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    const spy = jest.spyOn(smartReplyService, "requestSmartReply");

    triggerForInbound(
      { conversationId: "conv1", messageId: "m1", senderId: "me" },
      "me"
    );
    await Promise.resolve();

    expect(spy).not.toHaveBeenCalled();
    expect(fake.emitted).toHaveLength(0);
  });
});
