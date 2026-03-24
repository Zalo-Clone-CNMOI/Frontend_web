"use client";

import { RefObject, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PaginationState, UiMessage } from "@/src/common/interface/chat-interface";

interface MessageListProps {
  listRef: RefObject<HTMLDivElement | null>;
  messages: UiMessage[];
  currentUserId: string;
  conversationId: string;
  pagination?: PaginationState;
  onLoadMore: (conversationId: string) => void;
  onDeleteMessage: (conversationId: string, messageId: string) => void;
}

const MessagesWrap = styled(Box)({
  flex: 1,
  overflowY: "auto",
  background: "#F7F8FA",
  padding: 12,
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const LoadMoreWrap = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: 4,
});

const EmptyState = styled(Box)({
  flex: 1,
  minHeight: 240,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 8,
});

const EmptyTitle = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#111827",
});

const EmptyDesc = styled(Typography)({
  fontSize: 13,
  color: "#6B7280",
  textAlign: "center",
});

const MessageRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  display: "flex",
  justifyContent: mine ? "flex-end" : "flex-start",
}));

const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  maxWidth: "72%",
  padding: "10px 12px",
  borderRadius:"8px",
  border: mine ? "1px solid #D7E8FF" : "1px solid #E5E7EB",
  background: mine ? "#E5F1FF" : "#FFFFFF",
  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

const MessageText = styled(Typography)({
  fontSize: 14,
  color: "#111827",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.5,
});

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

const ActionButton = styled(Button)({
  minWidth: "unset",
  padding: 0,
  fontSize: 11,
  textTransform: "none",
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

export default function MessageList({
  listRef,
  messages,
  currentUserId,
  conversationId,
  pagination,
  onLoadMore,
  onDeleteMessage,
}: MessageListProps) {
  useEffect(() => {
    console.log("[mine check]", {
      currentUserId,
      messages: messages.map((m) => ({
        body: m.body,
        senderId: m.senderId,
        mine: String(m.senderId) === String(currentUserId),
      })),
    });
  }, [messages, currentUserId]);
  return (
    <MessagesWrap ref={listRef}>
      {pagination?.hasMore && (
        <LoadMoreWrap>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onLoadMore(conversationId)}
            disabled={pagination.loadingMore}
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              fontSize: 12,
            }}
          >
            {pagination.loadingMore ? "Đang tải..." : "Tải tin nhắn cũ hơn"}
          </Button>
        </LoadMoreWrap>
      )}

      {pagination?.loading ? (
        <EmptyState>
          <CircularProgress size={28} />
          <EmptyDesc>Đang tải tin nhắn...</EmptyDesc>
        </EmptyState>
      ) : messages.length === 0 ? (
        <EmptyState>
          <EmptyTitle>Chưa có tin nhắn</EmptyTitle>
          <EmptyDesc>Hãy bắt đầu cuộc trò chuyện bằng một tin nhắn đầu tiên.</EmptyDesc>
        </EmptyState>
      ) : (
        messages.map((msg) => {
          const mine = msg.senderId === currentUserId;

          return (
            <MessageRow data-testid ="message-row" key={msg.messageId} mine={mine}>
              <Bubble mine={mine}>
                <MessageText>
                  {msg.isDeleted ? "Tin nhắn đã được thu hồi" : msg.body}
                </MessageText>

                {!!msg.attachments?.length && (
                  <AttachmentList>
                    {msg.attachments.map((file) => (
                      <AttachmentItem key={file.key}>{file.name}</AttachmentItem>
                    ))}
                  </AttachmentList>
                )}

                <MetaRow>
                  <MetaLeft>
                    <MetaText>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </MetaText>

                    {msg.pending && <MetaText>• Đang gửi</MetaText>}
                    {msg.failed && <MetaText>• Gửi lỗi</MetaText>}
                    {msg.editedAt && <MetaText>• Đã sửa</MetaText>}
                  </MetaLeft>

                  {mine && !msg.isDeleted && (
                    <ActionButton
                      color="error"
                      onClick={() => onDeleteMessage(conversationId, msg.messageId)}
                    >
                      Xóa
                    </ActionButton>
                  )}
                </MetaRow>
              </Bubble>
            </MessageRow>
          );
        })
      )}
    </MessagesWrap>
  );
}