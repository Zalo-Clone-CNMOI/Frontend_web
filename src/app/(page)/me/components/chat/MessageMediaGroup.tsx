"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UiMessage } from "@/src/common/interface/chat-interface";

interface MessageMediaGroupProps {
  attachments: any[];
  type: "image" | "video";
  mine?: boolean;
  messageId: UiMessage["messageId"];
  onMediaLoad?: (messageId: UiMessage["messageId"]) => void;
}

const MediaWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const MessageImage = styled("img")({
  minWidth: 180,
  maxWidth: "100%",
  maxHeight: 400,
  borderRadius: 10,
  objectFit: "cover",
  display: "block",
  marginTop: 4,
  cursor: "pointer",
});

const MessageVideo = styled("video")({
  minWidth: 220,
  maxWidth: "100%",
  maxHeight: 320,
  borderRadius: 10,
  display: "block",
  marginTop: 4,
  background: "#000",
});

export default function MessageMediaGroup({
  attachments,
  type,
  mine,
  messageId,
  onMediaLoad,
}: MessageMediaGroupProps) {
  if (!attachments.length) return null;

  return (
    <MediaWrap
      sx={{
        alignItems: mine ? "flex-end" : "flex-start",
      }}
    >
      {attachments.map((file) =>
        type === "image" ? (
          <MessageImage
            key={file.key}
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${file.key}`}
            alt={file.name ?? "image"}
            onLoad={() => onMediaLoad?.(messageId)}
          />
        ) : (
          <MessageVideo
            key={file.key}
            controls
            preload="metadata"
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${file.key}`}
            onLoadedMetadata={() => onMediaLoad?.(messageId)}
          />
        )
      )}
    </MediaWrap>
  );
}