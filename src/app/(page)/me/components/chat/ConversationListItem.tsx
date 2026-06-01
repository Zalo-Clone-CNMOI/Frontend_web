"use client";

import { memo, useMemo, useState } from "react";
import { Badge, Box, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppAvatar, { resolveUserAvatarSrc } from "@/src/shared/component/Avatar";
import type { ConversationDto } from "@/src/common/interface/chat-interface";
import { getConversationLastMessageText } from "@/src/common/helpers/conversation.helpers";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { chatService } from "@/src/common/service/chat-service";
import { useChatStore } from "@/src/common/store/useChatStore";
import MenuPopover from "@/src/shared/component/MenuPopover"; // sửa đúng path của em

interface ConversationListItemProps {
  item: ConversationDto;
  active?: boolean;
  currentUserId?: string | null;
  onOpen: (conversationId: string) => void;
}

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  position: "relative",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
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

const NameWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
  flex: 1,
});

const Name = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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
  const updateConversationPinStatus = useChatStore(
    (s) => s.updateConversationPinStatus
  );
  // Detail is loaded when the conversation is opened; use its members[] (which
  // includes userId + avatarUrl) so isZaiBot() can fire the Zai logo fallback.
  // The list response omits members[], so without this we'd have no userId to
  // check and the bot would render the generic "A" fallback.
  const detailMembers = useChatStore(
    (s) => s.conversationDetailById?.[item.id]?.members ?? null
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorEl);

  const lastMessageText = useMemo(
    () => getConversationLastMessageText(item, currentUserId),
    [item, currentUserId]
  );

  const handleOpenMenuConversationPopover = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuConversationPopover = () => {
    setAnchorEl(null);
  };

  const handleTogglePinConversation = async () => {
    try {
      if (item.isPinned) {
        await chatService.unpinConversation(item.id);
        updateConversationPinStatus(item.id, false);
      } else {
        await chatService.pinConversation(item.id);
        updateConversationPinStatus(item.id, true);
      }

      handleCloseMenuConversationPopover();
    } catch (error) {
    }
  };
  const isGroup = item.type === "group";

  // members[] is absent in the list DTO; fall back to detail when loaded.
  const membersSource = detailMembers ?? item.members ?? [];
  const otherMember = !isGroup
    ? membersSource.find((m) => m.userId !== currentUserId)
    : null;

  const displayName = isGroup
    ? item.name
    : otherMember?.nickname || otherMember?.fullName || item.name;

  // For direct convs: prefer the member's avatarUrl; resolveUserAvatarSrc also
  // handles the Zai bot fallback when the member lookup or avatarUrl is absent.
  const displaySrc = isGroup
    ? resolveUserAvatarSrc(null, item.avatarUrl)
    : resolveUserAvatarSrc(
        otherMember?.userId,
        otherMember?.avatarUrl ?? item.avatarUrl,
      );


  return (
    <>
      <Item
        data-testid="conversation"
        active={active}
        onClick={() => onOpen(item.id)}
      >
        <ItemRow>
          <AppAvatar
            src={displaySrc}
            name={displayName ?? null}
            size={44}
          />

          <Content>
            <Row>
              <NameWrap>
                <Name>{item.name}</Name>

              </NameWrap>

              {!!item.unreadCount && (
                <Badge color="primary" badgeContent={item.unreadCount} />
              )}
            </Row>

            <LastMessage>{lastMessageText}</LastMessage>
          </Content>
        </ItemRow>
        <Stack justifyContent="space-between" height="100%" >
          <Box>
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                p: 0.5,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenMenuConversationPopover(e);
              }}
            >
              <MoreHorizOutlinedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </Box>
          <Box>
            {item.isPinned && (
              <PushPinOutlinedIcon
                sx={{ fontSize: 16, color: "#6B7280", rotate: "45deg" }}
              />
            )}
          </Box>



        </Stack >

      </Item>

      <MenuPopover
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenuConversationPopover}
        items={[
          {
            key: "pin-toggle",
            label: item.isPinned ? "Bỏ ghim hội thoại" : "Ghim hội thoại",
            onClick: handleTogglePinConversation,
          },
        ]}
      />
    </>
  );
}

export default memo(ConversationListItem);