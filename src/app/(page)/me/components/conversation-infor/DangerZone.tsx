"use client";

import React, { useMemo, useState } from "react";
import { Box, Button, Divider, Snackbar, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import { useChatStore } from "@/src/common/store/useChatStore";
import { groupService } from "@/src/common/service/group-service";
import AppModal from "@/src/shared/component/AppModal";
import { useTrans } from "@/src/common/utilities/hook/trans";

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

interface DangerZoneProps {
  onTransferOwnership?: () => void;
}

export default function DangerZone({ onTransferOwnership }: DangerZoneProps) {
  const t = useTrans();
  const conversationId = useChatStore((s) => s.activeConversationId);
  const currentUserId = useChatStore((s) => s.currentUserId);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById[conversationId ?? ""] ?? null
  );
  const removeConversationLocally = useChatStore((s) => s.removeConversationLocally);
  const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);

  const isGroup = conversationDetail?.type === "group";
  const memberCount = conversationDetail?.memberCount ?? 0;

  const myRole = useMemo(() => {
    if (!currentUserId) return undefined;
    const members = conversationDetail?.members ?? [];
    return members.find((member) => member.userId === currentUserId)?.role;
  }, [conversationDetail?.members, currentUserId]);

  const isOwner = myRole === "owner";
  const isSoleOwner = isOwner && memberCount === 1;

  const [leaving, setLeaving] = useState(false);
  const [disbanding, setDisbanding] = useState(false);
  const [openLeaveGroupModal, setOpenLeaveGroupModal] = useState(false);
  const [openDisbandGroupModal, setOpenDisbandGroupModal] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  const handleOutGroup = async () => {
    if (!conversationId) return;

    try {
      setLeaving(true);
      const res = await groupService.leaveGroup(conversationId);
      const message = res?.payload?.message ?? "";
      const isDisbanded = message.toLowerCase().includes("disbanded");
      removeConversationLocally(conversationId);
      setActiveConversationId(null);
      setOpenLeaveGroupModal(false);
      if (isDisbanded) {
        setSnackbar({ message: t("CONVO.LEAVE_DISBANDED"), severity: "success" });
      } else {
        setSnackbar({ message: t("CONVO.LEAVE_SUCCESS"), severity: "success" });
      }
    } catch (error) {
      setSnackbar({ message: t("CONVO.LEAVE_ERROR"), severity: "error" });
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
    } finally {
      setDisbanding(false);
    }
  };

  return (
    <>
      <Card>
        <DangerRow>
          <ReportGmailerrorredRoundedIcon />
          <Typography fontSize={15}>{t("CONVO.REPORT")}</Typography>
        </DangerRow>

        <Divider />

        <DangerRow danger>
          <DeleteOutlineRoundedIcon />
          <Typography fontSize={15}>{t("CONVO.DELETE_HISTORY")}</Typography>
        </DangerRow>

        {isGroup && (
          <Stack>
            <DangerRow danger onClick={() => setOpenLeaveGroupModal(true)}>
              <LogoutOutlinedIcon />
              <Typography fontSize={15}>{t("CONVO.LEAVE")}</Typography>
            </DangerRow>

            {isOwner && (
              <>
                <DangerRow danger onClick={onTransferOwnership}>
                  <TrendingFlatRoundedIcon />
                  <Typography fontSize={15}>{t("CONVO.TRANSFER_OWNERSHIP")}</Typography>
                </DangerRow>
                <DangerRow danger onClick={() => setOpenDisbandGroupModal(true)}>
                  <CancelPresentationOutlinedIcon />
                  <Typography fontSize={15}>{t("CONVO.DISBAND")}</Typography>
                </DangerRow>
              </>
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
        title={isSoleOwner ? t("CONVO.LEAVE_TITLE_LAST_OWNER") : (isOwner ? t("CONVO.LEAVE_TITLE_OWNER") : t("CONVO.LEAVE_TITLE_MEMBER"))}
        headerDivider
        actions={
          <>
            <Button
              onClick={() => setOpenLeaveGroupModal(false)}
              disabled={leaving}
              color="inherit"
            >
              {t("COMMON.BACK")}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleOutGroup}
              disabled={leaving}
            >
              {t("CONVO.CONFIRM")}
            </Button>
          </>
        }
      >
        <Typography fontSize={14}>
          {isSoleOwner
            ? t("CONVO.LEAVE_DESC_LAST_OWNER")
            : (isOwner
              ? t("CONVO.LEAVE_DESC_OWNER")
              : t("CONVO.LEAVE_DESC_MEMBER"))}
        </Typography>
      </AppModal>

      <AppModal
        open={openDisbandGroupModal}
        onClose={() => {
          if (disbanding) return;
          setOpenDisbandGroupModal(false);
        }}
        title={t("CONVO.DISBAND")}
        headerDivider
        actions={
          <>
            <Button
              onClick={() => setOpenDisbandGroupModal(false)}
              disabled={disbanding}
              color="inherit"
            >
              {t("COMMON.BACK")}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDisbandGroup}
              disabled={disbanding}
            >
              {t("CONVO.CONFIRM")}
            </Button>
          </>
        }
      >
        <Typography fontSize={14}>
          {t("CONVO.DISBAND_DESC")}
        </Typography>
      </AppModal>

      {snackbar && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => setSnackbar(null)}
          message={snackbar.message}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{
            sx: {
              bgcolor: snackbar.severity === "success" ? "#16A34A" : "#DC2626",
              color: "#fff",
              fontWeight: 500,
              borderRadius: "8px",
            },
          }}
        />
      )}
    </>
  );
}