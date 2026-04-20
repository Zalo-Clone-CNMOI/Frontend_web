"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UiMessage } from "@/src/common/interface/chat-interface";
import MessageActions from "./MessageActions";
import MessageMediaGroup from "./MessageMediaGroup";
import MessageReplyPreview from "./MessageReplyPreview";
import { formatMessageTime, getMessageTextContent, shouldShowMessageBubble, splitMessageAttachments } from "@/src/common/helpers/message.helpers";


interface MessageItemProps {
  message: UiMessage;
  currentUserId: string;
  onReplyMessage: (message: UiMessage) => void;
  onDeleteMessage: (
    conversationId: UiMessage["conversationId"],
    messageId: UiMessage["messageId"],
    createdAt: UiMessage["createdAt"]
  ) => void;
  onScrollToMessage: (targetMessageId?: UiMessage["messageId"] | null) => void;
  onMediaLoad?: (messageId: UiMessage["messageId"]) => void;
}

const MessageRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  display: "flex",
  justifyContent: mine ? "flex-end" : "flex-start",
  alignItems: "center",
  gap: 8,
  position: "relative",
  "&:hover .message-actions": {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  },
}));

const MessageContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: mine ? "flex-end" : "flex-start",
  gap: 6,
  maxWidth: "72%",
}));

const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  maxWidth: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: mine ? "1px solid #D7E8FF" : "1px solid #E5E7EB",
  background: mine ? "#E5F1FF" : "#FFFFFF",
  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

const MessageText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDeleted",
})<{ isDeleted?: boolean }>(({ isDeleted }) => ({
  fontSize: isDeleted ? 13 : 14,
  color: isDeleted ? "#6B7280" : "#111827",
  fontStyle: isDeleted ? "italic" : "normal",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.5,
  opacity: isDeleted ? 0.8 : 1,
}));

const MetaRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

const MetaLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
});

const MetaText = styled(Typography)({
  fontSize: 11,
  color: "#6B7280",
  lineHeight: 1.2,
});

const AttachmentList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const AttachmentItem = styled(Typography)({
  fontSize: 12,
  color: "#005AE0",
  wordBreak: "break-word",
});

export default function MessageItem({
  message,
  currentUserId,
  onReplyMessage,
  onDeleteMessage,
  onScrollToMessage,
  onMediaLoad,
}: MessageItemProps) {
  const mine = message.senderId === currentUserId;
  const canDelete = mine && !message.isDeleted;
  const canReply = !message.isDeleted;

  const { imageAttachments, videoAttachments, otherAttachments } =
    splitMessageAttachments(message.attachments);

  const textContent = getMessageTextContent(message.body);
  const hasText = !message.isDeleted && !!textContent;

  const showBubble = shouldShowMessageBubble({
    isDeleted: message.isDeleted,
    hasText,
    otherAttachmentCount: otherAttachments.length,
    hasReply: !!message.replyTo,
  });

  const hasOnlyMedia =
    !message.isDeleted &&
    (imageAttachments.length > 0 || videoAttachments.length > 0) &&
    !hasText &&
    otherAttachments.length === 0;

  const timeText = formatMessageTime(message.createdAt);

  return (
    <MessageRow
      data-testid="message-row"
      data-message-id={String(message.messageId)}
      mine={mine}
    >
      {!mine && (
        <MessageActions
          mine={mine}
          canReply={canReply}
          canDelete={canDelete}
          onReply={() => onReplyMessage(message)}
          onDelete={() =>
            onDeleteMessage(
              message.conversationId,
              message.messageId,
              message.createdAt
            )
          }
        />
      )}

      <MessageContent mine={mine}>
        {!message.isDeleted && (
          <>
            <MessageMediaGroup
              attachments={imageAttachments}
              type="image"
              mine={mine}
              messageId={message.messageId}
              onMediaLoad={onMediaLoad}
            />

            <MessageMediaGroup
              attachments={videoAttachments}
              type="video"
              mine={mine}
              messageId={message.messageId}
              onMediaLoad={onMediaLoad}
            />
          </>
        )}

        {showBubble && (
          <Bubble mine={mine}>
            <MessageReplyPreview
              replyTo={message.replyTo}
              onClick={() => onScrollToMessage(message.replyTo?.messageId)}
            />

            {message.isDeleted ? (
              <MessageText isDeleted>Tin nhắn đã được thu hồi</MessageText>
            ) : hasText ? (
              <MessageText>{textContent}</MessageText>
            ) : null}

            {!message.isDeleted && otherAttachments.length > 0 && (
              <AttachmentList>
                {otherAttachments.map((file) => (
                  <AttachmentItem key={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${file.key}`}></AttachmentItem>
                ))}
              </AttachmentList>
            )}

            <MetaRow>
              <MetaLeft>
                <MetaText>{timeText}</MetaText>
                {message.failed && <MetaText>Gửi thất bại</MetaText>}
                {message.editedAt && <MetaText>Đã sửa</MetaText>}
              </MetaLeft>
            </MetaRow>
          </Bubble>
        )}

        {hasOnlyMedia && <MetaText>{timeText}</MetaText>}
      </MessageContent>

      {mine && (
        <MessageActions
          mine={mine}
          canReply={canReply}
          canDelete={canDelete}
          onReply={() => onReplyMessage(message)}
          onDelete={() =>
            onDeleteMessage(
              message.conversationId,
              message.messageId,
              message.createdAt
            )
          }
        />
      )}
    </MessageRow>
  );
}