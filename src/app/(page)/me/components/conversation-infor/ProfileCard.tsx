"use client";

import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useChatStore } from "@/src/common/store/useChatStore";
import AppAvatar from "@/src/shared/component/Avatar";
import AddMemberGroupDialog from "./AddMemberGroupDialog";
import { groupService } from "@/src/common/service/group-service";
import CreateGroupModal from "../chat/CreateGroupModal";

interface ProfileCardProps {
  isGroup?: boolean;
}

const Card = styled(Box)({
  background: "#fff",
  marginBottom: 8,
});

const TopInfo = styled(Box)({
  padding: "28px 20px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const NameRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginTop: 14,
  marginBottom: 18,
});

const ConversationName = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: "#0F132A",
  maxWidth: 220,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const EditCircleButton = styled(IconButton)({
  width: 24,
  height: 24,
  background: "#E5E7EB",
  color: "#212121",
  "&:hover": {
    background: "#dbdbdb",
  },
});

const ActionsRow = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  gap: 8,
  marginTop: 4,
});

const ActionItem = styled(Box)({
  width: 90,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 8,
});

const ActionIcon = styled(IconButton)({
  width: 32,
  height: 32,
  background: "#E5E7EB",
  color: "#212121",
  "&:hover": {
    background: "#dbdbdb",
  },
});

const ActionText = styled(Typography)({
  fontSize: 13,
  color: "#0F172A",
  lineHeight: 1.35,
});

export default function ProfileCard({ isGroup }: ProfileCardProps) {
  const listConversation = useChatStore((s) => s.listConversation);
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const fetchConversationDetail = useChatStore((s) => s.fetchConversationDetail);
  const currentUserId = useChatStore((s) => s.currentUserId);

  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[activeConversationId || ""] ?? null
  );

  const currentConversation =
    conversationDetail ?? listConversation.find((cvs) => cvs.id === activeConversationId);

  const members = conversationDetail?.members ?? currentConversation?.members ?? [];

  const otherMember = !isGroup
    ? members.find((m) => m.userId !== currentUserId)
    : null;

  const displayName = isGroup
    ? currentConversation?.name ?? ""
    : otherMember?.nickname || otherMember?.fullName || currentConversation?.name || "";

  const displayAvatar = isGroup
    ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${currentConversation?.avatarUrl || ""}`
    : `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${otherMember?.avatarUrl || currentConversation?.avatarUrl || ""}`;
  const handleGroupAction = () => {
    if (isGroup) {
      setOpenAddMemberDialog(true);
      return;
    }

    setOpenCreateGroupDialog(true);
  };

  return (
    <>
      <Card>
        <TopInfo>
          <AppAvatar
            src={displayAvatar}
            name={displayName}
            size={56}
            fontSize={22}
          />

          <NameRow>
            <ConversationName title={displayName}>
              {displayName}
            </ConversationName>

            <EditCircleButton>
              <EditOutlinedIcon sx={{ fontSize: "16px" }} />
            </EditCircleButton>
          </NameRow>

          <ActionsRow>
            <ActionItem>
              <ActionIcon>
                <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
              </ActionIcon>
              <ActionText>Tắt thông báo</ActionText>
            </ActionItem>

            <ActionItem>
              <ActionIcon>
                <PushPinOutlinedIcon sx={{ fontSize: 20 }} />
              </ActionIcon>
              <ActionText>Ghim hội thoại</ActionText>
            </ActionItem>

            <ActionItem>
              <ActionIcon onClick={handleGroupAction}>
                <GroupAddOutlinedIcon sx={{ fontSize: 20 }} />
              </ActionIcon>
              <ActionText>
                {isGroup ? "Thêm thành viên" : "Tạo nhóm trò chuyện"}
              </ActionText>
            </ActionItem>
          </ActionsRow>
        </TopInfo>
      </Card>

      <CreateGroupModal
        open={openCreateGroupDialog}
        onClose={() => setOpenCreateGroupDialog(false)}
      />

      <AddMemberGroupDialog
        open={openAddMemberDialog}
        onClose={() => setOpenAddMemberDialog(false)}
        existingMemberIds={members.map((m) => m.userId)}
        onSubmit={async (userIds) => {
          if (!activeConversationId) return;
          await groupService.addMembersToGroup(activeConversationId, userIds);
          await fetchConversationDetail(activeConversationId, true);
        }}
      />
    </>
  );
}