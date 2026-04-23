"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useChatStore } from "@/src/common/store/useChatStore";
import { AttachmentDto, ConversationMemberDto } from "@/src/common/interface/chat-interface";
import DangerZone from "./DangerZone";
import FileSection from "./FileSection";
import LinkSection from "./LinkSection";
import MediaSection from "./MediaSection";
import OverviewCard from "./OverviewCard";
import ProfileCard from "./ProfileCard";
import SecuritySection from "./SecuritySection";
import GroupMemberBlock from "./GroupMemberBlock";
import GroupMemberListView from "./GroupMemberListView";
import { groupService } from "@/src/common/service/group-service";
import AddMemberGroupDialog from "./AddMemberGroupDialog";
import AppModal from "@/src/shared/component/AppModal";

interface InfConvColumnProps {
  conversationId: string;
}

const EMPTY_ATTACHMENTS: AttachmentDto[] = [];
const EMPTY_LINKS: string[] = [];

const Root = styled(Box)({
  width: 360,
  minWidth: 360,
  height: "100%",
  background: "#F3F5F7",
  borderLeft: "1px solid #E5E7EB",
  overflowY: "auto",
});

const Header = styled(Box)({
  height: 70,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  borderBottom: "1px solid #E5E7EB",
  position: "sticky",
  top: 0,
  zIndex: 5,
});

const HeaderTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: "#0F172A",
});

export default function InfConvColumn({
  conversationId,
}: InfConvColumnProps) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"overview" | "members">("overview");
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ConversationMemberDto | null>(null);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const currentUserId = useChatStore((s) => s.currentUserId);

  const handleOpenRemoveMember = (member: ConversationMemberDto) => {
    setSelectedMember(member);
    setOpenConfirmRemove(true);
  };

  const handleConfirmRemove = async () => {
    if (!conversationId || !selectedMember) return;

    await groupService.removeMemberFromGroup(conversationId, selectedMember.userId);
    await fetchConversationDetail(conversationId, true);
// console.log("groupService", groupService);
// console.log("removeMemberFromGroup", groupService.removeMemberFromGroup);
    setOpenConfirmRemove(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setView("overview");
  }, [conversationId]);

  const mediaItems = useChatStore(
    (state) => state.mediaByConversation?.[conversationId] ?? EMPTY_ATTACHMENTS
  );

  const fileItems = useChatStore(
    (state) => state.filesByConversation?.[conversationId] ?? EMPTY_ATTACHMENTS
  );

  const links = useChatStore(
    (state) => state.linksByConversation?.[conversationId] ?? EMPTY_LINKS
  );

  const conversationDetail = useChatStore(
    (state) => state.conversationDetailById?.[conversationId] ?? null
  );

  const fetchConversationDetail = useChatStore((state) => state.fetchConversationDetail);

  const isGroup = conversationDetail?.type === "group";
  const members = conversationDetail?.members ?? [];

  if (!conversationId) return null;

  if (!mounted) {
    return (
      <Root>
        <Header>
          <HeaderTitle>Thông tin hội thoại</HeaderTitle>
        </Header>
      </Root>
    );
  }

  return (
    <Root>
      {view === "overview" ? (
        <>
          <Header>
            <HeaderTitle>{isGroup ? "Thông tin nhóm" : "Thông tin hội thoại"}</HeaderTitle>
          </Header>

          <ProfileCard isGroup={isGroup} />
          {isGroup ? null : <OverviewCard />}

          {isGroup && (
            <GroupMemberBlock
              memberCount={members.length}
              onClick={() => setView("members")}
            />
          )}

          <MediaSection items={mediaItems} />
          <FileSection items={fileItems} />
          <LinkSection items={links} />
          <SecuritySection />
          <DangerZone />
        </>
      ) : (
        <GroupMemberListView
          members={members}
          myRole={conversationDetail?.mySettings?.role}
          currentUserId={currentUserId || ""}
          onBack={() => setView("overview")}
          onOpenAddMember={() => setOpenAddMemberDialog(true)}
          onRemoveMember={handleOpenRemoveMember}
        />
      )}

      <AddMemberGroupDialog
        open={openAddMemberDialog}
        onClose={() => setOpenAddMemberDialog(false)}
        existingMemberIds={members.map((m) => m.userId)}
        onSubmit={async (userIds) => {
          await groupService.addMembersToGroup(conversationId, userIds);
          await fetchConversationDetail(conversationId, true);
        }}
      />
      <AppModal
        open={openConfirmRemove}
        onClose={() => setOpenConfirmRemove(false)}
        title="Xóa thành viên"
        actions={
          <>
            <Button onClick={() => setOpenConfirmRemove(false)}>Hủy</Button>
            <Button color="error" variant="contained" onClick={handleConfirmRemove}>
              Xóa
            </Button>
          </>
        }
      >
        <Typography>
          Bạn có chắc muốn xóa {selectedMember?.nickname || selectedMember?.fullName} khỏi nhóm không?
        </Typography>
      </AppModal>
    </Root>
  );
}