"use client";

import React from "react";
import { getEntityColor } from "@/src/common/constants/entityColors";
import type { DetectedEntity } from "@/src/common/store/useEntityDetectionStore";

const CONFIDENCE_THRESHOLD = 0.75;

interface Segment {
  text: string;
  entity?: DetectedEntity;
}

function buildSegments(body: string, entities: DetectedEntity[]): Segment[] {
  // Filter to high-confidence entities with valid indices, then sort by start.
  const valid = entities
    .filter(
      (e) =>
        e.confidence > CONFIDENCE_THRESHOLD &&
        e.start_index >= 0 &&
        e.end_index > e.start_index &&
        e.start_index < body.length,
    )
    .sort((a, b) => a.start_index - b.start_index);

  const segments: Segment[] = [];
  let cursor = 0;

  for (const entity of valid) {
    const start = entity.start_index;
    const end = Math.min(entity.end_index, body.length);

    // Skip overlapping entities (keep earlier one).
    if (start < cursor) continue;

    if (start > cursor) {
      segments.push({ text: body.slice(cursor, start) });
    }
    segments.push({ text: body.slice(start, end), entity });
    cursor = end;
  }

  if (cursor < body.length) {
    segments.push({ text: body.slice(cursor) });
  }

  return segments;
}

interface EntityHighlightTextProps {
  body: string;
  entities: DetectedEntity[];
  /** mine=true → white underline on colored bubble; mine=false → colored underline */
  mine?: boolean;
  onEntityClick?: (entity: DetectedEntity) => void;
}

export default function EntityHighlightText({
  body,
  entities,
  mine = false,
  onEntityClick,
}: EntityHighlightTextProps) {
  const segments = buildSegments(body, entities);

  return (
    <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {segments.map((seg, i) => {
        if (!seg.entity) {
          return <React.Fragment key={i}>{seg.text}</React.Fragment>;
        }

        const color = getEntityColor(seg.entity.type);
        const highlightBg = mine ? "rgba(255,255,255,0.28)" : color + "40";
        const underlineColor = mine ? "rgba(255,255,255,0.95)" : color;

        return (
          <span
            key={i}
            onClick={
              onEntityClick
                ? (e) => {
                    e.stopPropagation();
                    onEntityClick(seg.entity!);
                  }
                : undefined
            }
            style={{
              fontWeight: 600,
              backgroundColor: highlightBg,
              borderRadius: 3,
              borderBottom: `2px solid ${underlineColor}`,
              cursor: onEntityClick ? "pointer" : "default",
            }}
          >
            {seg.text}
          </span>
        );
      })}
    </span>
  );
}
