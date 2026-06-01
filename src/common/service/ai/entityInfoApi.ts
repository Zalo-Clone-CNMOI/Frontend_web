// Ported from Frontend_mobile src/services/ai/entityInfoApi.ts
// Adaptation: apiCallWithRefresh → web http.get() client with res.ok guard.
import http from "@/src/common/api/http";
import { API } from "@/src/common/api/path";
import type { IApiResponse } from "@/src/common/interface/auth-interface";
import type { EntityInfoLang, EntityInfoResponse, EntityType } from "./entityInfo.types";

const MAX_TEXT_LENGTH = 200; // BFF rejects text longer than 200 chars

/**
 * Fetch the LLM info-panel content for a detected entity from the BFF.
 * GET /api/entity-info?text=&type=&lang=
 *
 * 30s timeout: LLM generation on a cache miss exceeds the standard 15s window.
 */
export async function getEntityInfo(
  text: string,
  type: EntityType,
  lang: EntityInfoLang = "vi",
): Promise<EntityInfoResponse> {
  const trimmed = (text ?? "").trim().slice(0, MAX_TEXT_LENGTH);
  if (!trimmed) throw new Error("Entity text is empty");

  const url =
    `${API.API_AI_ENTITY_INFO}` +
    `?text=${encodeURIComponent(trimmed)}` +
    `&type=${encodeURIComponent(type)}` +
    `&lang=${encodeURIComponent(lang)}`;

  const res = await http.get<IApiResponse<EntityInfoResponse>>(url, {
    timeout: 30_000,
  });

  if (!res.ok) {
    const msg = (res.payload as unknown as { message?: string })?.message;
    throw new Error(msg ?? `entity-info failed (${res.statusCode})`);
  }
  return res.payload.data;
}
