import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers, emitStreamCancel } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import { useZaiChatStore } from "../../store/useZaiChatStore";
import { getSocket } from "../../socket/socket";

/**
 * B3 — Zai Chat Streaming.
 *
 * Covers:
 *  1. ai:zai:typing handler: sets/clears typing per conversation
 *  2. ai:stream:chunk handler: accumulates chunks by chunk_index, reset on
 *     new stream_id, stall watchdog (30s auto-clear)
 *  3. ai:stream:complete handler: marks stream complete; ignores stale stream_id
 *  4. emitStreamCancel: emits event to socket + immediately clears local state
 *  5. useZaiChatStore: getStreamingText ordering, isStreamActive lifecycle,
 *     clearStreaming, clearAll
 *  6. Chunk dedup / new stream replacement
 */

jest.mock("../../socket/socket", () => ({
  getSocket: jest.fn(),
}));

type Handler = (payload: unknown) => void;

function makeFakeSocket(connected = true) {
  const handlers = new Map<string, Handler>();
  const emitted: Array<{ event: string; payload: unknown }> = [];
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
    emit: (event: string, payload: unknown) => handlers.get(event)?.(payload),
    emitted,
  };
}

const mockedGetSocket = getSocket as jest.MockedFunction<typeof getSocket>;

function resetStore() {
  useZaiChatStore.getState().clearAll();
}

// ─────────────────────────────────────────────────────────────────────────────

describe("B3 ai:zai:typing handler", () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetStore();
  });

  it("sets isZaiTyping=true when is_typing=true", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiZaiTyping, { conversation_id: "c1", is_typing: true });

    expect(useZaiChatStore.getState().isZaiTyping("c1")).toBe(true);
  });

  it("clears isZaiTyping when is_typing=false", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiZaiTyping, { conversation_id: "c1", is_typing: true });
    emit(AiWsEvents.AiZaiTyping, { conversation_id: "c1", is_typing: false });

    expect(useZaiChatStore.getState().isZaiTyping("c1")).toBe(false);
  });

  it("is a no-op when conversation_id is missing", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);
    const spy = jest.spyOn(useZaiChatStore.getState(), "setZaiTyping");

    emit(AiWsEvents.AiZaiTyping, { is_typing: true });

    expect(spy).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B3 ai:stream:chunk handler", () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetStore();
    mockedGetSocket.mockReset();
  });

  it("stores chunk and makes isStreamActive=true", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1",
      stream_id: "s1",
      chunk_index: 0,
      content: "Hello",
      is_final: false,
      feature: "zai_chat",
    });

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(true);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBe("Hello");
  });

  it("accumulates chunks in chunk_index order (not arrival order)", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    // Arrive out of order: index 2 before index 1
    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "A", is_final: false, feature: "zai_chat",
    });
    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 2, content: "C", is_final: false, feature: "zai_chat",
    });
    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 1, content: "B", is_final: false, feature: "zai_chat",
    });

    expect(useZaiChatStore.getState().getStreamingText("c1")).toBe("ABC");
  });

  it("replaces stream state when a new stream_id arrives", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "Old chunk", is_final: false, feature: "zai_chat",
    });

    // New stream_id → fresh state
    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s2",
      chunk_index: 0, content: "New chunk", is_final: false, feature: "zai_chat",
    });

    expect(useZaiChatStore.getState().getStreamingText("c1")).toBe("New chunk");
  });

  it("is a no-op when conversation_id is missing", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      stream_id: "s1", chunk_index: 0, content: "X", is_final: false,
    });

    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("W1: ignores chunks with feature !== zai_chat", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "Should be ignored", is_final: false,
      feature: "other_feature",
    });

    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("stall watchdog auto-clears stream after 30s without a chunk", () => {
    jest.useFakeTimers();
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "Hello", is_final: false, feature: "zai_chat",
    });

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(true);

    jest.advanceTimersByTime(30_000);

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
    jest.useRealTimers();
  });

  it("stall watchdog resets on each new chunk", () => {
    jest.useFakeTimers();
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "A", is_final: false, feature: "zai_chat",
    });

    jest.advanceTimersByTime(25_000); // 25s — watchdog not fired yet

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 1, content: "B", is_final: false, feature: "zai_chat",
    });

    jest.advanceTimersByTime(25_000); // another 25s from reset — still OK

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(true);

    jest.advanceTimersByTime(5_001); // crosses 30s from last chunk

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    jest.useRealTimers();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B3 ai:stream:complete handler", () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetStore();
  });

  it("marks stream as complete (isStreamActive → false) and removes state (W2)", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "Hello world", is_final: false, feature: "zai_chat",
    });
    emit(AiWsEvents.AiStreamComplete, {
      conversation_id: "c1", stream_id: "s1", feature: "zai_chat", total_chunks: 1,
    });

    // W2: stream state is cleared immediately on complete (not just marked complete)
    // so memory doesn't accumulate across Zai sessions.
    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("ignores complete for a different (stale) stream_id", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s2",
      chunk_index: 0, content: "Active", is_final: false, feature: "zai_chat",
    });

    // Stale complete for a previous stream
    emit(AiWsEvents.AiStreamComplete, {
      conversation_id: "c1", stream_id: "s1", feature: "zai_chat", total_chunks: 5,
    });

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(true);
  });

  it("is a no-op when conversation_id is missing", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);
    const spy = jest.spyOn(useZaiChatStore.getState(), "completeStream");

    emit(AiWsEvents.AiStreamComplete, { stream_id: "s1", total_chunks: 2 });

    expect(spy).not.toHaveBeenCalled();
  });

  it("W1: ignores complete events with feature !== zai_chat", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.AiStreamChunk, {
      conversation_id: "c1", stream_id: "s1",
      chunk_index: 0, content: "Active", is_final: false, feature: "zai_chat",
    });

    emit(AiWsEvents.AiStreamComplete, {
      conversation_id: "c1", stream_id: "s1",
      feature: "other_feature", total_chunks: 1,
    });

    // Stream should still be active — complete was ignored due to wrong feature.
    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B3 emitStreamCancel", () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetStore();
    mockedGetSocket.mockReset();
  });

  it("emits ai:stream:cancel with conversation_id to the socket", () => {
    const { socket, emitted } = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(socket);

    // Seed a stream first
    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "Hi");
    emitStreamCancel("c1");

    expect(emitted).toHaveLength(1);
    expect(emitted[0].event).toBe(AiWsEvents.AiStreamCancel);
    expect(emitted[0].payload).toEqual({ conversation_id: "c1" });
  });

  it("immediately clears local streaming state", () => {
    const { socket } = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(socket);

    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "partial");
    emitStreamCancel("c1");

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("clears local state even when socket is disconnected", () => {
    const { socket } = makeFakeSocket(false);
    mockedGetSocket.mockReturnValue(socket);

    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "partial");
    emitStreamCancel("c1");

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
  });

  it("does not emit when conversationId is empty string", () => {
    const { socket, emitted } = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(socket);

    emitStreamCancel("");

    expect(emitted).toHaveLength(0);
  });

  it("S3: also clears typing indicator on cancel", () => {
    const { socket } = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(socket);

    useZaiChatStore.getState().setZaiTyping("c1", true);
    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "partial");

    emitStreamCancel("c1");

    expect(useZaiChatStore.getState().isZaiTyping("c1")).toBe(false);
    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B3 useZaiChatStore — store logic", () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetStore();
  });

  it("getStreamingText returns null when no stream exists", () => {
    expect(useZaiChatStore.getState().getStreamingText("no-such-conv")).toBeNull();
  });

  it("getStreamingText returns null when stream exists but has no chunks", () => {
    // Simulate a scenario where stream started but no chunk yet
    // (only possible via direct store manipulation in tests)
    useZaiChatStore.setState({
      streamingByConversation: {
        c1: { streamId: "s1", chunks: {}, complete: false },
      },
    });
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("isStreamActive is false and state is cleared after completeStream (W2)", () => {
    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "Hello");
    useZaiChatStore.getState().completeStream("c1", "s1");
    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("clearStreaming removes the stream entirely", () => {
    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "Hello");
    useZaiChatStore.getState().clearStreaming("c1");
    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().getStreamingText("c1")).toBeNull();
  });

  it("clearAll resets typing and streaming maps", () => {
    useZaiChatStore.getState().setZaiTyping("c1", true);
    useZaiChatStore.getState().addStreamChunk("c2", "s2", 0, "Hi");
    useZaiChatStore.getState().clearAll();

    expect(useZaiChatStore.getState().isZaiTyping("c1")).toBe(false);
    expect(useZaiChatStore.getState().isStreamActive("c2")).toBe(false);
  });

  it("independent conversations do not interfere", () => {
    useZaiChatStore.getState().addStreamChunk("c1", "s1", 0, "Conv1");
    useZaiChatStore.getState().addStreamChunk("c2", "s2", 0, "Conv2");
    useZaiChatStore.getState().completeStream("c1", "s1");

    expect(useZaiChatStore.getState().isStreamActive("c1")).toBe(false);
    expect(useZaiChatStore.getState().isStreamActive("c2")).toBe(true);
    expect(useZaiChatStore.getState().getStreamingText("c2")).toBe("Conv2");
  });
});
