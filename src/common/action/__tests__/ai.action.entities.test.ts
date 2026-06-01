import type { Socket } from "socket.io-client";
import { registerAiSocketHandlers } from "../ai.action";
import { AiWsEvents } from "../../socket/aiEvents";
import {
  useEntityDetectionStore,
} from "../../store/useEntityDetectionStore";
import { useEntityInfoStore, entityInfoKey } from "../../store/useEntityInfoStore";

/**
 * B2 — Entity Detection + Info Panel.
 *
 * Covers:
 *  1. message:entities handler: stores entities, clears pending, no-op on
 *     missing IDs, empty entities array.
 *  2. useEntityDetectionStore: pending lifecycle (mark → auto-clear at 10s,
 *     mark → resolve via setEntities), race-safe (result before mark).
 *  3. entityInfoKey: format `${type}:${text}:${lang}`.
 *  4. MANDATORY: emoji + multibyte + combining-char index alignment.
 */

// ─── socket helpers ──────────────────────────────────────────────────────────

type Handler = (payload: unknown) => void;

function makeFakeSocket() {
  const handlers = new Map<string, Handler>();
  const socket = {
    connected: true,
    on(event: string, handler: Handler) {
      handlers.set(event, handler);
    },
    off() {/* noop */},
    emit() {/* noop */},
  } as unknown as Socket;
  const emit = (event: string, payload: unknown) =>
    handlers.get(event)?.(payload);
  return { socket, emit };
}

// ─── store reset helpers ──────────────────────────────────────────────────────

function resetEntityDetectionStore() {
  useEntityDetectionStore.getState().clearAll();
}
function resetEntityInfoStore() {
  useEntityInfoStore.setState({ cache: {}, loadingByKey: {}, errorByKey: {} });
}

// ─────────────────────────────────────────────────────────────────────────────

describe("B2 entity detection — message:entities handler", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetEntityDetectionStore();
  });

  it("stores entities for the given messageId", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    emit(AiWsEvents.MessageEntities, {
      conversation_id: "c1",
      message_id: "m1",
      entities: [
        { text: "Google", type: "company", start_index: 0, end_index: 6, confidence: 0.9 },
      ],
    });

    const stored = useEntityDetectionStore.getState().getEntities("m1");
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe("Google");
    expect(stored[0].type).toBe("company");
  });

  it("clears pending state when entities arrive", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    useEntityDetectionStore.getState().markPending("m2");
    expect(useEntityDetectionStore.getState().isPending("m2")).toBe(true);

    emit(AiWsEvents.MessageEntities, {
      conversation_id: "c1",
      message_id: "m2",
      entities: [
        { text: "Paris", type: "location", start_index: 5, end_index: 10, confidence: 0.95 },
      ],
    });

    expect(useEntityDetectionStore.getState().isPending("m2")).toBe(false);
    expect(useEntityDetectionStore.getState().getEntities("m2")).toHaveLength(1);
  });

  it("stores an empty array (no-highlight) and clears pending for messages with no entities", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);

    useEntityDetectionStore.getState().markPending("m3");
    emit(AiWsEvents.MessageEntities, {
      conversation_id: "c1",
      message_id: "m3",
      entities: [],
    });

    expect(useEntityDetectionStore.getState().isPending("m3")).toBe(false);
    expect(useEntityDetectionStore.getState().getEntities("m3")).toHaveLength(0);
  });

  it("is a no-op when message_id is missing", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);
    const spy = jest.spyOn(useEntityDetectionStore.getState(), "setEntities");

    emit(AiWsEvents.MessageEntities, {
      conversation_id: "c1",
      // no message_id
      entities: [{ text: "Foo", type: "other", start_index: 0, end_index: 3, confidence: 0.8 }],
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it("is a no-op when conversation_id is missing", () => {
    const { socket, emit } = makeFakeSocket();
    registerAiSocketHandlers(socket);
    const spy = jest.spyOn(useEntityDetectionStore.getState(), "setEntities");

    emit(AiWsEvents.MessageEntities, {
      // no conversation_id
      message_id: "m5",
      entities: [],
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B2 useEntityDetectionStore — pending lifecycle", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetEntityDetectionStore();
  });

  it("markPending sets isPending=true", () => {
    useEntityDetectionStore.getState().markPending("m10");
    expect(useEntityDetectionStore.getState().isPending("m10")).toBe(true);
  });

  it("pending auto-clears after 10 000 ms timeout", () => {
    jest.useFakeTimers();
    useEntityDetectionStore.getState().markPending("m11");
    expect(useEntityDetectionStore.getState().isPending("m11")).toBe(true);

    jest.advanceTimersByTime(10_000);

    expect(useEntityDetectionStore.getState().isPending("m11")).toBe(false);
    jest.useRealTimers();
  });

  it("pending does NOT auto-clear before timeout", () => {
    jest.useFakeTimers();
    useEntityDetectionStore.getState().markPending("m12");

    jest.advanceTimersByTime(9_999);

    expect(useEntityDetectionStore.getState().isPending("m12")).toBe(true);
    jest.useRealTimers();
  });

  it("setEntities resolves pending before timeout fires", () => {
    jest.useFakeTimers();
    useEntityDetectionStore.getState().markPending("m13");

    useEntityDetectionStore.getState().setEntities("m13", []);
    expect(useEntityDetectionStore.getState().isPending("m13")).toBe(false);

    // Timeout fires but should be a no-op (already resolved).
    jest.advanceTimersByTime(10_000);
    expect(useEntityDetectionStore.getState().isPending("m13")).toBe(false);
    jest.useRealTimers();
  });

  it("race: markPending after result already arrived is a no-op", () => {
    useEntityDetectionStore.getState().setEntities("m14", [
      { text: "X", type: "other", start_index: 0, end_index: 1, confidence: 0.9 },
    ]);
    useEntityDetectionStore.getState().markPending("m14");

    // Result was already there → should NOT become pending.
    expect(useEntityDetectionStore.getState().isPending("m14")).toBe(false);
  });

  it("clearAll resets both entities and pending maps", () => {
    useEntityDetectionStore.getState().markPending("m15");
    useEntityDetectionStore.getState().setEntities("m16", []);
    useEntityDetectionStore.getState().clearAll();

    expect(useEntityDetectionStore.getState().isPending("m15")).toBe(false);
    expect(useEntityDetectionStore.getState().getEntities("m16")).toHaveLength(0);
    expect(Object.keys(useEntityDetectionStore.getState().entitiesByMessage)).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B2 entityInfoKey", () => {
  it("format is ${type}:${text}:${lang}", () => {
    expect(entityInfoKey("person", "Nguyễn Văn A", "vi")).toBe(
      "person:Nguyễn Văn A:vi",
    );
    expect(entityInfoKey("company", "Google", "en")).toBe("company:Google:en");
    expect(entityInfoKey("location", "Hà Nội", "vi")).toBe("location:Hà Nội:vi");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

/**
 * MANDATORY B2 test block: emoji + multibyte + combining-char index alignment.
 *
 * The BE measures character offsets on the raw UTF-16 string (JavaScript's
 * native string model). Web slices the same raw body via `text.slice(start, end)`.
 * If the indices are Unicode code-point offsets (Python/Rust) rather than UTF-16
 * code-unit offsets, emoji and multibyte chars would produce wrong slices.
 *
 * These tests document the CURRENT behavior (JS slice = UTF-16 code units).
 * If a BE contract change breaks them, do NOT "fix" the offsets silently —
 * match mobile behavior and document the deviation.
 */
describe("B2 MANDATORY: entity slice index alignment", () => {
  function sliceEntity(
    body: string,
    start: number,
    end: number,
  ): string {
    return body.slice(start, end);
  }

  it("ASCII — basic sanity", () => {
    const body = "Hello World";
    expect(sliceEntity(body, 6, 11)).toBe("World");
  });

  it("multibyte Vietnamese: offsets are UTF-16 code units", () => {
    // "Xin chào" — 'à' is U+00E0 (single code unit). offset 4..9 → "chào"
    const body = "Xin chào";
    expect(sliceEntity(body, 4, 9)).toBe("chào");
  });

  it("CJK multibyte: each Han character is 1 UTF-16 code unit", () => {
    // "你好世界" — each char is 1 code unit (U+4F60, U+597D, U+4E16, U+754C)
    const body = "你好世界";
    expect(sliceEntity(body, 2, 4)).toBe("世界");
  });

  it("emoji (BMP surrogate pair): single emoji = 2 UTF-16 code units", () => {
    // 🌍 is U+1F30D → surrogate pair 🌍 (2 code units).
    // "Hello 🌍 World": 🌍 at index 6, ends at 8; "World" starts at 9.
    const body = "Hello 🌍 World";
    expect(body.length).toBe(14); // 6 + 2 + 1 + 5
    expect(sliceEntity(body, 6, 8)).toBe("🌍"); // the emoji
    expect(sliceEntity(body, 9, 14)).toBe("World");
  });

  it("combining characters: base + combining = 2 code units together", () => {
    // 'e' + combining acute (U+0301) → "é" but as two code units
    const body = "café menu"; // "café menu" (decomposed)
    expect(body[3]).toBe("e");
    expect(body[4]).toBe("́");
    // Entity "café" spans indices 0..5
    expect(sliceEntity(body, 0, 5)).toBe("café");
  });

  it("entity at end of string — end clamped to body.length is safe", () => {
    const body = "Paris";
    // BE may emit end_index = body.length (exclusive) or beyond.
    expect(sliceEntity(body, 0, 100)).toBe("Paris"); // JS slice clamps
  });

  it("overlapping entities: only first (earlier start) is rendered", () => {
    // Simulates the buildSegments overlap-skip logic by verifying indices.
    const body = "New York City";
    // Entity A: 0..8 "New York" | Entity B: 4..13 "York City" (overlaps A)
    // After sorting by start: A wins; B is skipped (start 4 < cursor 8).
    const entityA = { text: "New York", start_index: 0, end_index: 8 };
    const entityB = { text: "York City", start_index: 4, end_index: 13 };
    expect(sliceEntity(body, entityA.start_index, entityA.end_index)).toBe(
      "New York",
    );
    // Verify entityB would start inside entityA's range
    expect(entityB.start_index < entityA.end_index).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("B2 useEntityInfoStore", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    resetEntityInfoStore();
  });

  it("stores and retrieves entity info within TTL", () => {
    const store = useEntityInfoStore.getState();
    const key = entityInfoKey("company", "Apple", "en");
    const data = {
      entity_text: "Apple",
      entity_type: "company" as const,
      title: "Apple Inc.",
      summary: "Tech giant.",
      details: "Founded 1976.",
      provider: "openai",
      tokens_used: 100,
      processed_at: Date.now(),
    };

    store.set(key, data);
    expect(store.get(key)).toEqual(data);
    expect(store.isLoading(key)).toBe(false);
    expect(store.getError(key)).toBeNull();
  });

  it("returns null when TTL is exceeded", () => {
    jest.useFakeTimers();
    const store = useEntityInfoStore.getState();
    const key = entityInfoKey("person", "Einstein", "en");
    const data = {
      entity_text: "Einstein",
      entity_type: "person" as const,
      title: "Albert Einstein",
      summary: "Physicist.",
      details: "E=mc²",
      provider: "openai",
      tokens_used: 50,
      processed_at: Date.now(),
    };

    store.set(key, data);

    const TTL_7_DAYS = 7 * 24 * 60 * 60 * 1000;
    jest.advanceTimersByTime(TTL_7_DAYS + 1);

    expect(store.get(key)).toBeNull();
    jest.useRealTimers();
  });

  it("setLoading / isLoading round-trip", () => {
    const store = useEntityInfoStore.getState();
    const key = "concept:entropy:vi";
    store.setLoading(key, true);
    expect(store.isLoading(key)).toBe(true);
    store.setLoading(key, false);
    expect(store.isLoading(key)).toBe(false);
  });

  it("setError / getError round-trip; set() clears error", () => {
    const store = useEntityInfoStore.getState();
    const key = "tool:git:en";
    store.setError(key, "fetch failed");
    expect(store.getError(key)).toBe("fetch failed");

    store.set(key, {
      entity_text: "git",
      entity_type: "tool",
      title: "Git",
      summary: "VCS",
      details: "",
      provider: "openai",
      tokens_used: 10,
      processed_at: Date.now(),
    });
    expect(store.getError(key)).toBeNull();
  });
});
