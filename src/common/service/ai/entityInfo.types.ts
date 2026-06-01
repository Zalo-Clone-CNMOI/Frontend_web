// Mirrored from Frontend_mobile src/services/ai/entityInfo.types.ts
// EntityType reuses the union from aiEvents.ts (single source of truth).
import type { EntityType } from "../../socket/aiEvents";

export type { EntityType };

export type EntityInfoLang = "vi" | "en";

// Mirrors BFF wire shape exactly (snake_case):
// Backend apps/bff-service/src/modules/entity-info/dto/entity-info-response.dto.ts
export interface EntityInfoResponse {
  entity_text: string;
  entity_type: EntityType;
  title: string;
  summary: string;
  details: string;
  related_entities?: string[];
  provider: string;
  tokens_used: number;
  processed_at: number;
}
