"use client";

import { useCallback, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { openConversation } from "@/src/common/action/chat.action";
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import ConversationListItem from "./ConversationListItem";

const Root = styled(Box)({
  width: "100%",
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const StateWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
  gap: 12,
});

const StateText = styled(Typography)({
  fontSize: 13,
  color: "#6B7280",
});

export default function ConversationList() {
  const currentUserId = useAuthStore((s) => s.authData?.data?.user?.id);

  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationFetched = useChatStore((s) => s.conversationFetched);
  const fetchListConversation = useChatStore((s) => s.fetchListConversation);

  useEffect(() => {
    fetchListConversation({ page: 1, limit: 10 });
  }, [fetchListConversation]);

  const handleOpenConversation = useCallback(
    (conversationId: string) => {
      if (conversationId === activeConversationId) return;
      openConversation(conversationId);
    },
    [activeConversationId]
  );

  if (!conversationFetched) {
    return (
      <Root>
        <StateWrap>
          <CircularProgress size={20} />
          <StateText>Đang tải danh sách cuộc trò chuyện...</StateText>
        </StateWrap>
      </Root>
    );
  }

  if (listConversation.length === 0) {
    return (
      <Root>
        <StateWrap>
          <StateText>Chưa có cuộc trò chuyện nào</StateText>
        </StateWrap>
      </Root>
    );
  }

  return (
    <Root>
      {listConversation.map((item) => (
        <ConversationListItem
          key={item.id}
          item={item}
          active={activeConversationId === item.id}
          currentUserId={currentUserId}
          onOpen={handleOpenConversation}
        />
      ))}
    </Root>
  );
}