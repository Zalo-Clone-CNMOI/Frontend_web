"use client";

import { memo, useMemo } from "react";
import { Badge, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppAvatar from "@/src/shared/component/Avatar";
import type { ConversationDto } from "@/src/common/interface/chat-interface";
import { getConversationLastMessageText } from "@/src/common/helpers/conversation.helpers";

interface ConversationListItemProps {
  item: ConversationDto;
  active?: boolean;
  currentUserId?: string | null;
  onOpen: (conversationId: string) => void;
}

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  padding: "12px 16px",
  cursor: "pointer",
  borderRadius: "6px",
  background: active ? "#E5F1FF" : "#fff",
  transition: "background 0.2s ease",
  "&:hover": {
    background: active ? "#E5F1FF" : "#F1F2F4",
  },
}));

const ItemRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
  maxWidth: 336,
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
  flex: 1,
  minWidth: 0,
});

const LastMessage = styled(Typography)({
  fontSize: 12,
  color: "#6B7280",
  marginTop: 4,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function ConversationListItem({
  item,
  active,
  currentUserId,
  onOpen,
}: ConversationListItemProps) {
  const lastMessageText = useMemo(
    () => getConversationLastMessageText(item, currentUserId),
    [item, currentUserId]
  );

  return (
    <Item
      data-testid="conversation"
      active={active}
      onClick={() => onOpen(item.id)}
    >
      <ItemRow>
        <AppAvatar
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${item.avatarUrl}`}
          name={item.name ?? null}
          size={44}
        />

        <Content>
          <Row>
            <Name>{item.name}</Name>

            {!!item.unreadCount && (
              <Badge color="primary" badgeContent={item.unreadCount} />
            )}
          </Row>

          <LastMessage>{lastMessageText}</LastMessage>
        </Content>
      </ItemRow>
    </Item>
  );
}

export default memo(ConversationListItem);