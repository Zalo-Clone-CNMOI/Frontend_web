"use client";

import { ConversationDto } from "@/src/common/interface/chat-interface";
import { mockConversations } from "@/src/common/mockData/chat.mock.data";
import { useChatStore } from "@/src/common/store/useChatStore";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo } from "react";

const Root = styled(Box)({
  width: "100%",
  height: "100%",
  overflowY: "auto",
});

const LoadingWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
  gap: 12,
});

const LoadingText = styled(Typography)({
  fontSize: 13,
  color: "#6B7280",
});

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  padding: "14px 16px",
  cursor: "pointer",
  borderBottom: "1px solid #F1F5F9",
  background: active ? "#E5F1FF" : "#fff",
  "&:hover": {
    background: active ? "#E5F1FF" : "#F8FAFC",
  },
}));

const ItemRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const StyledAvatar = styled(Avatar)({
  width: 44,
  height: 44,
  flexShrink: 0,
  fontSize: 16,
  fontWeight: 600,
});

const Content = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const Row = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
});

const Name = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const LastMessage = styled(Typography)({
  fontSize: 12,
  color: "#6B7280",
  marginTop: 4,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const getInitials = (name?: string) => {
  if (!name) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (
    words[0].charAt(0) + words[words.length - 1].charAt(0)
  ).toUpperCase();
};

export default function ConversationList() {
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationLoading = useChatStore((s) => s.conversationLoading);
  const conversationFetched = useChatStore((s) => s.conversationFetched);
  const fetchListConversation = useChatStore((s) => s.fetchListConversation);
  const openConversation = useChatStore((s) => s.openConversation);
  const openMockConversation = useChatStore((s) => s.openMockConversation);

  useEffect(() => {
    fetchListConversation({ page: 1, limit: 10 });
  }, [fetchListConversation]);

  const usingApiData = conversationFetched && listConversation.length > 0;

  const displayConversations = useMemo<ConversationDto[]>(() => {
  if (!conversationFetched) return [];
  return usingApiData ? listConversation : mockConversations;
}, [conversationFetched, usingApiData, listConversation]);

  if (conversationLoading && !conversationFetched) {
    return (
      <Root>
        <LoadingWrap>
          <CircularProgress size={20} />
          <LoadingText>Đang tải danh sách cuộc trò chuyện...</LoadingText>
        </LoadingWrap>
      </Root>
    );
  }

  return (
    <Root>
      {displayConversations.map((item) => {
        const avatarSrc =
          item?.avatarUrl || "https:static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg";

        return (
          <Item
            key={item.id}
            active={activeConversationId === item.id}
            onClick={() =>
              usingApiData
                ? openConversation(item.id)
                : openMockConversation(item.id)
            }
          >
            <ItemRow>
              <StyledAvatar src={avatarSrc}>
                {getInitials(item.name)}
              </StyledAvatar>

              <Content>
                <Row>
                  <Name>{item.name}</Name>
                  {!!item.unreadCount && (
                    <Badge color="primary" badgeContent={item.unreadCount} />
                  )}
                </Row>

                <LastMessage>{item.lastMessage || "Chưa có tin nhắn"}</LastMessage>
              </Content>
            </ItemRow>
          </Item>
        );
      })}
    </Root>
  );
}