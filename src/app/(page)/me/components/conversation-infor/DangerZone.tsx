"use client";

import React, { useMemo, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { useChatStore } from "@/src/common/store/useChatStore";
import { groupService } from "@/src/common/service/group-service";
import AppModal from "@/src/shared/component/AppModal";

const Card = styled(Box)({
  background: "#fff",
  marginBottom: 8,
});

const DangerRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})<{ danger?: boolean }>(({ danger }) => ({
  minHeight: 58,
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  color: danger ? "#DC2626" : "#0F172A",
  cursor: "pointer",
  "&:hover": {
    background: "#F8FAFC",
  },
}));

export default function DangerZone() {
  const conversationId = useChatStore((s) => s.activeConversationId);
  const currentUserId = useChatStore((s) => s.currentUserId);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById[conversationId ?? ""] ?? null
  );
  const removeConversationLocally = useChatStore((s) => s.removeConversationLocally);
  const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);

  const isGroup = conversationDetail?.type === "group";

  const myRole = useMemo(() => {
    const members = conversationDetail?.members ?? [];
    return members.find((member) => member.userId === currentUserId)?.role;
  }, [conversationDetail?.members, currentUserId]);

  const isOwner = myRole === "owner";

  const [leaving, setLeaving] = useState(false);
  const [disbanding, setDisbanding] = useState(false);
  const [openLeaveGroupModal, setOpenLeaveGroupModal] = useState(false);
  const [openDisbandGroupModal, setOpenDisbandGroupModal] = useState(false);

  const handleOutGroup = async () => {
    if (!conversationId) return;

    try {
      setLeaving(true);
      await groupService.leaveGroup(conversationId);
      removeConversationLocally(conversationId);
      setActiveConversationId(null);
      setOpenLeaveGroupModal(false);
    } catch (error) {
      console.error("Rời nhóm thất bại", error);
    } finally {
      setLeaving(false);
    }
  };

  const handleDisbandGroup = async () => {
    if (!conversationId) return;
    if (!isOwner) return;

    try {
      setDisbanding(true);
      await groupService.disbandGroup(conversationId);
      removeConversationLocally(conversationId);
      setActiveConversationId(null);
      setOpenDisbandGroupModal(false);
    } catch (error) {
      console.error("Giải tán nhóm thất bại", error);
    } finally {
      setDisbanding(false);
    }
  };

  return (
    <>
      <Card>
        <DangerRow>
          <ReportGmailerrorredRoundedIcon />
          <Typography fontSize={15}>Báo xấu</Typography>
        </DangerRow>

        <Divider />

        <DangerRow danger>
          <DeleteOutlineRoundedIcon />
          <Typography fontSize={15}>Xoá lịch sử trò chuyện</Typography>
        </DangerRow>

        {isGroup && (
          <Stack>
            <DangerRow danger onClick={() => setOpenLeaveGroupModal(true)}>
              <LogoutOutlinedIcon />
              <Typography fontSize={15}>Rời nhóm</Typography>
            </DangerRow>

            {isOwner && (
              <DangerRow danger onClick={() => setOpenDisbandGroupModal(true)}>
                <CancelPresentationOutlinedIcon />
                <Typography fontSize={15}>Giải tán nhóm</Typography>
              </DangerRow>
            )}
          </Stack>
        )}
      </Card>

      <AppModal
        open={openLeaveGroupModal}
        onClose={() => {
          if (leaving) return;
          setOpenLeaveGroupModal(false);
        }}
        title={isOwner ? "Rời nhóm và chuyển quyền sở hữu" : "Rời nhóm và xóa cuộc trò chuyện"}
        headerDivider
        actions={
          <>
            <Button
              onClick={() => setOpenLeaveGroupModal(false)}
              disabled={leaving}
              color="inherit"
            >
              Hủy
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleOutGroup}
              disabled={leaving}
            >
              Xác nhận
            </Button>
          </>
        }
      >
        <Typography fontSize={14}>
          {isOwner
            ? "Bạn sẽ chuyển quyền sở hữu cho một thành viên khác khi rời khỏi nhóm. Bạn sẽ không thể xem lại tin nhắn này."
            : "Bạn sẽ không thể xem lại tin nhắn này sau khi rời khỏi nhóm."}
        </Typography>
      </AppModal>

      <AppModal
        open={openDisbandGroupModal}
        onClose={() => {
          if (disbanding) return;
          setOpenDisbandGroupModal(false);
        }}
        title="Giải tán nhóm"
        headerDivider
        actions={
          <>
            <Button
              onClick={() => setOpenDisbandGroupModal(false)}
              disabled={disbanding}
              color="inherit"
            >
              Hủy
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDisbandGroup}
              disabled={disbanding}
            >
              Xác nhận
            </Button>
          </>
        }
      >
        <Typography fontSize={14}>
          Nhóm sẽ bị giải tán và các thành viên sẽ không thể tiếp tục sử dụng nhóm này.
        </Typography>
      </AppModal>
    </>
  );
}