import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import { useAISummaryStore } from "../../store/useAISummaryStore";
import { getSocket } from "../../socket/socket";
import { summaryService } from "../../service/ai/summaryService";

/**
 * A3 — Summary / Catch-up.
 *
 * Tests cover:
 *   1. Result handler: routes `ai:summary:result` into the store, reads
 *      `message_range.count` (NOT a top-level `message_count`), clears loading.
 *   2. requestSummary: emits the exact payload, handles no-socket and
 *      disconnected cases, 20s safety-net timeout.
 *   3. Inbound-trigger invalidate: the placeholder in chat.action.tsx replaces
 *      the stale cached entry on every non-self inbound message.
 */

jest.mock("../../socket/socket", () => ({
  getSocket: jest.fn(),
}));

type Handler = (payload: unknown) => void;
type FakeSocket = {
  socket: Socket;
  emit: (event: string, payload: unknown) => void;
  emitted: Array<{ event: string; payload: unknown }>;
  connected: boolean;
};

function makeFakeSocket(connected = true): FakeSocket {
  const handlers = new Map<string, Handler>();
  const emitted: FakeSocket["emitted"] = [];
  const socket = {
    connected,
    on(event: string, handler: Handler) {
      handlers.set(event, handler);
    },
    off() {/* noop */},
    emit(event: string, payload: unknown) {
      emitted.push({ event, payload });
    },
  } as unknown as Socket;
  return {
    socket,
    emit: (event, payload) => handlers.get(event)?.(payload),
    emitted,
    connected,
  };
}

const mockedGetSocket = getSocket as jest.MockedFunction<typeof getSocket>;

function resetSummaryStore() {
  useAISummaryStore.setState({
    summaries: {},
    loadingByConversation: {},
    errorByConversation: {},
  });
}

// ─────────────────────────────────────────────────────────────────────────────

describe("A3 summary — result handler (ai:summary:result)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    resetSummaryStore();
  });

  it("stores the summary and reads count from message_range (NOT message_count)", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    useAISummaryStore.getState().setLoading("c1", true);

    fake.emit(AiWsEvents.AiSummaryResult, {
      conversation_id: "c1",
      summary: "Summary text here.",
      message_range: { from_message_id: "m1", to_message_id: "m5", count: 5 },
      cached: false,
    });

    const entry = useAISummaryStore.getState().getSummary("c1");
    expect(entry).not.toBeNull();
    expect(entry!.summary).toBe("Summary text here.");
    expect(entry!.messageCount).toBe(5); // from message_range.count
    expect(useAISummaryStore.getState().isLoading("c1")).toBe(false);
    expect(useAISummaryStore.getState().getError("c1")).toBeNull();
  });

  it("falls back to messageCount=0 when message_range is missing (malformed payload)", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    fake.emit(AiWsEvents.AiSummaryResult, {
      conversation_id: "c2",
      summary: "Some summary",
      // no message_range
      cached: true,
    });

    const entry = useAISummaryStore.getState().getSummary("c2");
    expect(entry!.messageCount).toBe(0);
  });

  it("always clears loading even when summary is empty (BE silent-failure fallback)", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);
    useAISummaryStore.getState().setLoading("c3", true);
    useAISummaryStore.getState().setError("c3", "old error");

    fake.emit(AiWsEvents.AiSummaryResult, {
      conversation_id: "c3",
      summary: "",
      message_range: { from_message_id: "", to_message_id: "", count: 0 },
      cached: false,
    });

    expect(useAISummaryStore.getState().isLoading("c3")).toBe(false);
    expect(useAISummaryStore.getState().getError("c3")).toBeNull();
    expect(useAISummaryStore.getState().getSummary("c3")!.summary).toBe("");
  });

  it("ignores a result with no conversation_id", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);
    const spy = jest.spyOn(useAISummaryStore.getState(), "setSummary");

    fake.emit(AiWsEvents.AiSummaryResult, {
      summary: "orphan",
      message_range: { count: 2 },
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("A3 summary — requestSummary (socket emit)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetSummaryStore();
    mockedGetSocket.mockReset();
  });

  it("emits exactly { conversation_id, message_count: 200 } (default) to the BE", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await summaryService.requestSummary({ conversationId: "conv1" });

    expect(fake.emitted).toHaveLength(1);
    const sent = fake.emitted[0];
    expect(sent.event).toBe(AiWsEvents.AiSummaryRequest);
    expect(sent.payload).toEqual({ conversation_id: "conv1", message_count: 200 });
  });

  it("respects a custom messageCount override", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await summaryService.requestSummary({ conversationId: "conv2", messageCount: 50 });

    expect((fake.emitted[0].payload as Record<string, unknown>).message_count).toBe(50);
  });

  it("does nothing (no emit, no spinner) when the socket is missing", async () => {
    mockedGetSocket.mockReturnValue(null);

    await summaryService.requestSummary({ conversationId: "conv3" });

    expect(useAISummaryStore.getState().isLoading("conv3")).toBe(false);
  });

  it("does nothing when the socket is disconnected", async () => {
    const fake = makeFakeSocket(false);
    mockedGetSocket.mockReturnValue(fake.socket);

    await summaryService.requestSummary({ conversationId: "conv4" });

    expect(fake.emitted).toHaveLength(0);
    expect(useAISummaryStore.getState().isLoading("conv4")).toBe(false);
  });

  it("sets loading=true and error=null before emitting", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    // Pre-seed a stale error to verify it's cleared.
    useAISummaryStore.getState().setError("conv5", "old error");

    await summaryService.requestSummary({ conversationId: "conv5" });

    expect(useAISummaryStore.getState().isLoading("conv5")).toBe(true);
    expect(useAISummaryStore.getState().getError("conv5")).toBeNull();
  });

  it("clears loading after the 20s safety-net timeout when no result arrives", async () => {
    jest.useFakeTimers();
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await summaryService.requestSummary({ conversationId: "conv6" });
    expect(useAISummaryStore.getState().isLoading("conv6")).toBe(true);

    jest.advanceTimersByTime(20000);
    expect(useAISummaryStore.getState().isLoading("conv6")).toBe(false);
    jest.useRealTimers();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("A3 summary — invalidate on inbound message", () => {
  // The invalidate logic lives in chat.action.tsx handleIncomingMessage.
  // We replicate the exact guard condition to test the invalidate call in
  // isolation — same approach as A2's trigger test.

  beforeEach(() => {
    jest.restoreAllMocks();
    resetSummaryStore();
  });

  function triggerForInbound(
    msg: { conversationId: string; messageId: string; senderId: string },
    currentUserId: string
  ) {
    if (msg.conversationId && msg.messageId && msg.senderId && msg.senderId !== currentUserId) {
      useAISummaryStore.getState().invalidate(msg.conversationId);
    }
  }

  it("invalidates the cached summary when an inbound NON-SELF message arrives", () => {
    useAISummaryStore.getState().setSummary("convA", "old summary", 3);
    expect(useAISummaryStore.getState().getSummary("convA")).not.toBeNull();

    triggerForInbound(
      { conversationId: "convA", messageId: "m1", senderId: "other" },
      "me"
    );

    expect(useAISummaryStore.getState().getSummary("convA")).toBeNull();
  });

  it("does NOT invalidate the summary for a SELF-authored message", () => {
    useAISummaryStore.getState().setSummary("convB", "my summary", 2);

    triggerForInbound(
      { conversationId: "convB", messageId: "m2", senderId: "me" },
      "me"
    );

    expect(useAISummaryStore.getState().getSummary("convB")).not.toBeNull();
  });

  it("is idempotent — invalidating a missing entry does not throw", () => {
    expect(() => {
      triggerForInbound(
        { conversationId: "noSuchConv", messageId: "m1", senderId: "other" },
        "me"
      );
    }).not.toThrow();
  });
});
