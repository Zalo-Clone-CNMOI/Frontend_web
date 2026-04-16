"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IMessageReplyPreview, UiMessage } from "@/src/common/interface/chat-interface";
import { getReplyPreview } from "@/src/common/helpers/displayPreviewReply";

interface MessageReplyPreviewProps {
  replyTo?: IMessageReplyPreview | null;
  onClick?: () => void;
}

const ReplyBox = styled(Box)({
  background: "#EBECF0",
  borderRadius: 8,
  padding: "8px 10px",
  marginBottom: 6,
  maxWidth: "100%",
  cursor: "pointer",
});

const ReplyText = styled(Typography)({
  fontSize: 12,
  color: "#4B5563",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.4,
});

const ReplyMediaImage = styled("img")({
  width: 72,
  height: 72,
  objectFit: "cover",
  borderRadius: 8,
  display: "block",
  marginTop: 6,
});

const ReplyMediaVideo = styled("video")({
  width: 96,
  maxWidth: "100%",
  maxHeight: 120,
  borderRadius: 8,
  display: "block",
  marginTop: 6,
  background: "#000",
});

export default function MessageReplyPreview({
  replyTo,
  onClick,
}: MessageReplyPreviewProps) {
  if (!replyTo) return null;

  const { text, imageAttachment, videoAttachment } = getReplyPreview(replyTo);

  return (
    <ReplyBox onClick={onClick}>
      <ReplyText>{text}</ReplyText>

      {imageAttachment && (
        <ReplyMediaImage
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${imageAttachment.key}`}
          alt={imageAttachment.name ?? "reply-image"}
        />
      )}

      {videoAttachment && (
        <ReplyMediaVideo
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${videoAttachment.key}`}
          preload="metadata"
          muted
        />
      )}
    </ReplyBox>
  );
}