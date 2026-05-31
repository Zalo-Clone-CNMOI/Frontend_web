import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import { useAITranslationStore, translationCacheKey } from "../../store/useAITranslationStore";
import { getSocket } from "../../socket/socket";
import { translationService } from "../../service/ai/translationService";

/**
 * B1 — Translation.
 *
 * Covers:
 *   1. Result handler: routes `ai:translate:result` into the store, handles
 *      missing target_language (defaults to 'vi'), and the BE echo case
 *      (translated_body === original_body on AI failure).
 *   2. requestTranslation: exact payload (no source_language), 20s
 *      timeout sets visible error, dedup (skip if loading/cached), no-socket
 *      / disconnected cases.
 *   3. Cache key: format `${messageId}_${targetLang}`.
 */

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
    off() {/* noop */},
    emit(event: string, payload: unknown, ack?: AckFn) {
      emitted.push({ event, payload, ack });
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

function resetTranslationStore() {
  useAITranslationStore.setState({
    cache: {},
    loadingByKey: {},
    errorByKey: {},
  });
}

// ─────────────────────────────────────────────────────────────────────────────

describe("B1 translation — result handler (ai:translate:result)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    resetTranslationStore();
  });

  it("stores translation with correct cache key (messageId_targetLang)", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    fake.emit(AiWsEvents.AiTranslateResult, {
      message_id: "m1",
      conversation_id: "c1",
      original_body: "Xin chào",
      translated_body: "Hello",
      source_language: "vi",
      target_language: "en",
      cached: false,
    });

    const result = useAITranslationStore.getState().getTranslation("m1", "en");
    expect(result).not.toBeNull();
    expect(result!.original).toBe("Xin chào");
    expect(result!.translated).toBe("Hello");
    expect(useAITranslationStore.getState().isLoading("m1", "en")).toBe(false);
    expect(useAITranslationStore.getState().getError("m1", "en")).toBeNull();
  });

  it("defaults target_language to 'vi' when missing from payload", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    fake.emit(AiWsEvents.AiTranslateResult, {
      message_id: "m2",
      conversation_id: "c1",
      original_body: "Hello",
      translated_body: "Xin chào",
      // no target_language
      cached: false,
    });

    const result = useAITranslationStore.getState().getTranslation("m2", "vi");
    expect(result).not.toBeNull();
    expect(result!.translated).toBe("Xin chào");
  });

  it("stores echo (translated_body = original_body) on BE AI failure — mobile parity", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    fake.emit(AiWsEvents.AiTranslateResult, {
      message_id: "m3",
      conversation_id: "c1",
      original_body: "Xin chào",
      translated_body: "Xin chào", // BE echoes original on AI failure
      target_language: "en",
      cached: false,
    });

    const result = useAITranslationStore.getState().getTranslation("m3", "en");
    expect(result!.translated).toBe("Xin chào"); // echo is stored as-is
  });

  it("uses original_body as fallback when translated_body is empty", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);

    fake.emit(AiWsEvents.AiTranslateResult, {
      message_id: "m4",
      conversation_id: "c1",
      original_body: "fallback text",
      translated_body: "", // empty
      target_language: "fr",
      cached: false,
    });

    const result = useAITranslationStore.getState().getTranslation("m4", "fr");
    expect(result!.translated).toBe("fallback text"); // falls back to original
  });

  it("ignores a result with no message_id", () => {
    const fake = makeFakeSocket();
    registerAiSocketHandlers(fake.socket);
    const spy = jest.spyOn(useAITranslationStore.getState(), "setTranslation");

    fake.emit(AiWsEvents.AiTranslateResult, {
      conversation_id: "c1",
      translated_body: "Hello",
      target_language: "en",
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B1 translation — requestTranslation (payload, dedup, timeout)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetTranslationStore();
    mockedGetSocket.mockReset();
  });

  it("emits exactly { message_id, conversation_id, body, target_language } — no source_language", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m1",
      body: "Xin chào",
      targetLanguage: "en",
    });

    expect(fake.emitted).toHaveLength(1);
    const sent = fake.emitted[0];
    expect(sent.event).toBe(AiWsEvents.AiTranslateRequest);
    expect(Object.keys(sent.payload as object).sort()).toEqual([
      "body",
      "conversation_id",
      "message_id",
      "target_language",
    ]);
    expect(sent.payload).toEqual({
      message_id: "m1",
      conversation_id: "c1",
      body: "Xin chào",
      target_language: "en",
    });
  });

  it("defaults target_language to 'vi' when omitted", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m2",
      body: "Hello",
    });

    expect((fake.emitted[0].payload as Record<string, string>).target_language).toBe("vi");
  });

  it("sets loading=true and clears error before emitting", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useAITranslationStore.getState().setError("m3", "en", "old error");

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m3",
      body: "Hi",
      targetLanguage: "en",
    });

    expect(useAITranslationStore.getState().isLoading("m3", "en")).toBe(true);
    expect(useAITranslationStore.getState().getError("m3", "en")).toBeNull();
  });

  it("dedup: skips emit when already loading for the same key", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useAITranslationStore.getState().setLoading("m4", "vi", true);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m4",
      body: "Hi",
      targetLanguage: "vi",
    });

    expect(fake.emitted).toHaveLength(0);
  });

  it("dedup: skips emit when a valid cached result exists", async () => {
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);
    useAITranslationStore.getState().setTranslation("m5", "vi", "Hello", "Xin chào");

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m5",
      body: "Hello",
      targetLanguage: "vi",
    });

    expect(fake.emitted).toHaveLength(0);
  });

  it("does nothing when the socket is missing", async () => {
    mockedGetSocket.mockReturnValue(null);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m6",
      body: "Hi",
      targetLanguage: "en",
    });

    expect(useAITranslationStore.getState().isLoading("m6", "en")).toBe(false);
    expect(useAITranslationStore.getState().getError("m6", "en")).toBe("no_socket");
  });

  it("does nothing (no emit) when the socket is disconnected", async () => {
    const fake = makeFakeSocket(false);
    mockedGetSocket.mockReturnValue(fake.socket);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m7",
      body: "Hi",
      targetLanguage: "en",
    });

    expect(fake.emitted).toHaveLength(0);
    expect(useAITranslationStore.getState().isLoading("m7", "en")).toBe(false);
  });

  it("timeout sets a visible error after 20s if result never arrives", async () => {
    jest.useFakeTimers();
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m8",
      body: "Hi",
      targetLanguage: "ja",
    });

    expect(useAITranslationStore.getState().isLoading("m8", "ja")).toBe(true);

    jest.advanceTimersByTime(20000);

    expect(useAITranslationStore.getState().isLoading("m8", "ja")).toBe(false);
    expect(useAITranslationStore.getState().getError("m8", "ja")).toBe("timeout");
    jest.useRealTimers();
  });

  it("timeout is a no-op if result already arrived (loading was cleared)", async () => {
    jest.useFakeTimers();
    const fake = makeFakeSocket(true);
    mockedGetSocket.mockReturnValue(fake.socket);

    await translationService.requestTranslation({
      conversationId: "c1",
      messageId: "m9",
      body: "Hi",
      targetLanguage: "ko",
    });

    // Simulate result arriving before timeout
    useAITranslationStore.getState().setLoading("m9", "ko", false);
    useAITranslationStore.getState().setTranslation("m9", "ko", "Hi", "안녕");

    jest.advanceTimersByTime(20000);

    // No error — loading was already false when timeout fired
    expect(useAITranslationStore.getState().getError("m9", "ko")).toBeNull();
    jest.useRealTimers();
  });

  it("cache key is ${messageId}_${targetLang}", () => {
    expect(translationCacheKey("msg123", "vi")).toBe("msg123_vi");
    expect(translationCacheKey("abc", "zh")).toBe("abc_zh");
  });
});
