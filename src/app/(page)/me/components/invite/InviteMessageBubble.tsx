"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import { InviteMessageMetadata } from "@/src/common/interface/invite-interface";
import { useGroupInviteStore } from "@/src/common/store/useGroupInviteStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { useTrans } from "@/src/common/utilities/hook/trans";
import AppAvatar from "@/src/shared/component/Avatar";
import AppModal from "@/src/shared/component/AppModal";

interface InviteMessageBubbleProps {
  metadata: InviteMessageMetadata;
  conversationId: string;
}

const Wrapper = styled(Box)({
  width: 280,
  borderRadius: 12,
  overflow: "hidden",
});

const BlueCard = styled(Box)({
  backgroundColor: "#0068FF",
  padding: 16,
  minHeight: 100,
  position: "relative",
  overflow: "hidden",
});

const BgCircle = styled(Box)({
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.08)",
});

const StatusBadge = styled(Box)({
  position: "absolute",
  top: 12,
  right: 12,
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 8px",
  borderRadius: 12,
  zIndex: 2,
});

const CardContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
  zIndex: 1,
  position: "relative",
});

const AvatarWrap = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  flexShrink: 0,
});

const InfoSection = styled(Box)({
  padding: 12,
  backgroundColor: "#F8F9FA",
  cursor: "pointer",
  "&:hover": { backgroundColor: "#F0F2F5" },
});

const ZaloLink = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: "#005AE0",
  marginBottom: 6,
});

const InfoGroupName = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#0F172A",
  marginBottom: 4,
});

const InfoDesc = styled(Typography)({
  fontSize: 14,
  lineHeight: "20px",
  color: "#64748B",
});

const LabelText = styled(Typography)({
  fontSize: 13,
  color: "rgba(255,255,255,0.85)",
  marginBottom: 2,
});

const GroupNameText = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: "#fff",
  lineHeight: "24px",
});

const MemberRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
  marginTop: 4,
});

const MemberCountText = styled(Typography)({
  fontSize: 12,
  color: "rgba(255,255,255,0.8)",
});

export default function InviteMessageBubble({
  metadata,
  conversationId,
}: InviteMessageBubbleProps) {
  const t = useTrans();
  const [detailOpen, setDetailOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const { acceptInvite, rejectInvite } = useGroupInviteStore();
  const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);

  const status = metadata.status;
  const isPending = status === "pending";
  const groupName = metadata.group_name || t("INVITE.GROUP");
  const inviterName = metadata.inviter_name || t("INVITE.UNKNOWN");
  const memberCount = metadata.member_count || 0;

  const handlePress = useCallback(() => {
    if (isPending) { setDetailOpen(true); return; }

    const messages: Record<string, string> = {
      cancelled: t("INVITE.ALERT_CANCELLED"),
      accepted: t("INVITE.ALERT_ACCEPTED"),
      rejected: t("INVITE.ALERT_REJECTED"),
      expired: t("INVITE.ALERT_EXPIRED"),
    };
    setAlertMsg(messages[status] || "");
  }, [isPending, status, t]);

  const handleAccept = async () => {
    const ok = await acceptInvite(conversationId, metadata.invite_id);
    if (ok) {
      setActiveConversationId(metadata.group_id);
      setDetailOpen(false);
    }
  };

  const handleReject = async () => {
    await rejectInvite(conversationId, metadata.invite_id);
    setDetailOpen(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case "pending": return "#FFD700";
      case "accepted": return "#34C759";
      case "rejected":
      case "cancelled": return "#FF3B30";
      case "expired": return "#8E8E93";
      default: return "#FFD700";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "pending": return t("INVITE.STATUS_PENDING");
      case "accepted": return t("INVITE.STATUS_ACCEPTED");
      case "rejected": return t("INVITE.STATUS_REJECTED");
      case "cancelled": return t("INVITE.STATUS_CANCELLED");
      case "expired": return t("INVITE.STATUS_EXPIRED");
      default: return status;
    }
  };

  return (
    <>
      <Wrapper>
        <BlueCard>
          <BgCircle sx={{ width: 120, height: 120, top: -40, right: -20 }} />
          <BgCircle sx={{ width: 80, height: 80, bottom: 10, right: 30 }} />

          <StatusBadge sx={{ backgroundColor: getStatusColor() }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
              {getStatusLabel()}
            </Typography>
          </StatusBadge>

          <CardContent>
            <AvatarWrap>
              <AppAvatar size={48} name={groupName} />
            </AvatarWrap>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <LabelText>{t("INVITE.GROUP")}</LabelText>
              <GroupNameText sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {groupName}
              </GroupNameText>
              {memberCount > 0 && (
                <MemberRow>
                  <PeopleOutlinedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }} />
                  <MemberCountText>
                    {memberCount} {t("INVITE.MEMBERS")}
                  </MemberCountText>
                </MemberRow>
              )}
            </Box>
          </CardContent>
        </BlueCard>

        <InfoSection onClick={handlePress}>
          <ZaloLink>dev.me</ZaloLink>
          <InfoGroupName>{groupName}</InfoGroupName>
          <InfoDesc>
            {t("INVITE.TAP_TO_JOIN")}
          </InfoDesc>
        </InfoSection>
      </Wrapper>

      <AppModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={t("INVITE.INVITE_BUBBLE_TITLE")}
        maxWidth="xs"
        fullWidth
        headerDivider
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
          <AppAvatar size={64} name={groupName} />
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{groupName}</Typography>
          {memberCount > 0 && (
            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
              {memberCount} {t("INVITE.MEMBERS")}
            </Typography>
          )}
          <Typography sx={{ fontSize: 13, color: "#64748B" }}>
            {t("INVITE.INVITED_BY", { name: inviterName })}
          </Typography>

          {metadata.message && (
            <Box sx={{
              width: "100%",
              mt: 1,
              p: 1.5,
              bgcolor: "#F8FAFC",
              borderRadius: 1,
              borderLeft: "3px solid #0068FF",
            }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#64748B", mb: 0.5 }}>
                {t("INVITE.INVITE_MESSAGE")}
              </Typography>
              <Typography sx={{ fontSize: 14, fontStyle: "italic", color: "#0F172A" }}>
                {metadata.message}
              </Typography>
            </Box>
          )}

          {!isPending && (
            <Chip
              size="small"
              label={getStatusLabel()}
              sx={{ backgroundColor: getStatusColor(), color: "#fff", fontWeight: 600 }}
            />
          )}
        </Box>

        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pt: 2, borderTop: "1px solid #E5E7EB" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReject}
              startIcon={<CancelOutlinedIcon />}
            >
              {t("INVITE.REJECT")}
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              startIcon={<CheckCircleOutlineIcon />}
            >
              {t("INVITE.ACCEPT")}
            </Button>
          </Box>
        )}
      </AppModal>

      <Snackbar
        open={!!alertMsg}
        autoHideDuration={3000}
        onClose={() => setAlertMsg(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" onClose={() => setAlertMsg(null)} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
