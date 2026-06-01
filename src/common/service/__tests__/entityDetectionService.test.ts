/**
 * TDD tests for entityDetectionService.hydrateConversation
 *
 * HTTP client pattern: the project uses `http` from `../api/http` which wraps
 * fetch and returns `{ statusCode, ok, payload }`. We mock that module.
 *
 * Store pattern: useEntityDetectionStore is a Zustand store; we access it via
 * `.getState()` to read back what the service wrote.
 */

// Mock the HTTP client before importing the service (module-level mock hoisting)
jest.mock("../../api/http", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}));

import http from "../../api/http";
import { entityDetectionService } from "../entityDetectionService";
import { useEntityDetectionStore } from "../../store/useEntityDetectionStore";

const mockGet = http.get as jest.Mock;

/** Reset store + mock between tests so tests are independent. */
beforeEach(() => {
  useEntityDetectionStore.getState().clearAll();
  mockGet.mockReset();
});

describe("entityDetectionService.hydrateConversation", () => {
  it("hydrates the entity store from a successful API response", async () => {
    const fakeEntities = [
      { text: "Vietnam", type: "location", start_index: 0, end_index: 7, confidence: 0.95 },
    ];

    mockGet.mockResolvedValueOnce({
      ok: true,
      statusCode: 200,
      payload: {
        items: [
          { message_id: "m1", entities: fakeEntities },
          { message_id: "m2", entities: [] },
        ],
      },
    });

    await entityDetectionService.hydrateConversation("c1");

    expect(useEntityDetectionStore.getState().getEntities("m1")).toEqual(fakeEntities);
    // empty entity arrays should also be stored (clears pending state)
    expect(useEntityDetectionStore.getState().getEntities("m2")).toEqual([]);
  });

  it("skips items that have no message_id", async () => {
    mockGet.mockResolvedValueOnce({
      ok: true,
      statusCode: 200,
      payload: {
        items: [
          { message_id: null, entities: [{ text: "X", type: "other", start_index: 0, end_index: 1, confidence: 0.5 }] },
          { entities: [{ text: "Y", type: "other", start_index: 0, end_index: 1, confidence: 0.5 }] },
        ],
      },
    });

    await entityDetectionService.hydrateConversation("c1");

    // No entries should have been written to the store
    expect(useEntityDetectionStore.getState().entitiesByMessage).toEqual({});
  });

  it("is a no-op on API failure — never throws", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network failure"));

    await expect(
      entityDetectionService.hydrateConversation("c1")
    ).resolves.toBeUndefined();
  });

  it("is a no-op when response has ok=false — never throws", async () => {
    mockGet.mockResolvedValueOnce({
      ok: false,
      statusCode: 401,
      payload: { message: "Unauthorized" },
    });

    await expect(
      entityDetectionService.hydrateConversation("c1")
    ).resolves.toBeUndefined();

    expect(useEntityDetectionStore.getState().entitiesByMessage).toEqual({});
  });

  it("calls the correct endpoint with conversation_id query param", async () => {
    mockGet.mockResolvedValueOnce({
      ok: true,
      statusCode: 200,
      payload: { items: [] },
    });

    await entityDetectionService.hydrateConversation("conv-abc");

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("conversation_id=conv-abc")
    );
  });

  it("uses String() conversion for message_id to match normalizeMessage keys", async () => {
    mockGet.mockResolvedValueOnce({
      ok: true,
      statusCode: 200,
      payload: {
        items: [
          // numeric message_id from BE — must be stored as string key
          { message_id: 42, entities: [{ text: "test", type: "other", start_index: 0, end_index: 4, confidence: 0.8 }] },
        ],
      },
    });

    await entityDetectionService.hydrateConversation("c1");

    // Must be accessible via string key "42"
    expect(useEntityDetectionStore.getState().getEntities("42")).toHaveLength(1);
  });
});
