"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useGroupInviteStore } from "@/src/common/store/useGroupInviteStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { GroupInviteDto } from "@/src/common/interface/invite-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";
import AppAvatar from "@/src/shared/component/Avatar";
import { buildS3Url } from "@/src/shared/component/Avatar";

const Root = styled(Box)({
  height: "100%",
  background: "#F3F5F7",
  display: "flex",
  flexDirection: "column",
});

const Header = styled(Box)({
  height: 76,
  background: "#FFFFFF",
  borderBottom: "1px solid #E5E7EB",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
});

const HeaderTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 700,
  color: "#0F172A",
});

const Content = styled(Box)({
  flex: 1,
  padding: 20,
  overflowY: "auto",
});

const InviteCard = styled(Box)({
  background: "#FFFFFF",
  borderRadius: 12,
  border: "1px solid #E5E7EB",
  padding: 16,
  marginBottom: 12,
  display: "flex",
  alignItems: "center",
  gap: 14,
  transition: "box-shadow 0.2s",
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
});

const InviteInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const GroupName = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#0F172A",
  marginBottom: 2,
});

const InviteDetail = styled(Typography)({
  fontSize: 13,
  color: "#64748B",
  marginBottom: 4,
});

const Actions = styled(Box)({
  display: "flex",
  gap: 8,
  alignItems: "center",
});

const EmptyWrap = styled(Box)({
  height: 260,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748B",
});

const StyledTabs = styled(Tabs)({
  minHeight: 36,
  marginBottom: 16,
  borderBottom: "1px solid #E5E7EB",
  "& .MuiTab-root": {
    minHeight: 36,
    textTransform: "none",
    fontSize: 14,
    fontWeight: 600,
    padding: "6px 16px",
  },
});

function formatExpiry(expiresAt: string | number): string {
  const now = Date.now();
  const expiry = new Date(expiresAt).getTime();
  const diff = expiry - now;
  if (diff <= 0) return "Đã hết hạn";
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Sắp hết hạn";
  if (hours < 24) return `${hours} giờ`;
  const days = Math.floor(hours / 24);
  return `${days} ngày`;
}

function getStatusChip(status: string, t: (key: string) => string) {
  const config: Record<string, { label: string; color: "default" | "success" | "error" | "warning" | "info" }> = {
    pending: { label: t("INVITE.STATUS_PENDING"), color: "warning" },
    accepted: { label: t("INVITE.STATUS_ACCEPTED"), color: "success" },
    rejected: { label: t("INVITE.STATUS_REJECTED"), color: "error" },
    cancelled: { label: t("INVITE.STATUS_CANCELLED"), color: "default" },
    expired: { label: t("INVITE.STATUS_EXPIRED"), color: "default" },
  };
  const c = config[status] ?? { label: status, color: "default" as const };
  return <Chip size="small" label={c.label} color={c.color} variant="outlined" />;
}

interface InviteCenterProps {
  onNavigateToChat?: (conversationId: string) => void;
}

export default function InviteCenter({ onNavigateToChat }: InviteCenterProps) {
  const t = useTrans();
  const [tab, setTab] = useState(0);

  const {
    receivedInvites,
    isLoading,
    error,
    unreadCount,
    fetchPendingInvites,
    acceptInvite,
    rejectInvite,
  } = useGroupInviteStore();

  const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);

  useEffect(() => {
    void fetchPendingInvites();
  }, [fetchPendingInvites]);

  const handleAccept = async (invite: GroupInviteDto) => {
    const ok = await acceptInvite(invite.conversationId, invite.id);
    if (ok) {
      setActiveConversationId(invite.conversationId);
      onNavigateToChat?.(invite.conversationId);
    }
  };

  const handleReject = async (invite: GroupInviteDto) => {
    await rejectInvite(invite.conversationId, invite.id);
  };

  const currentList = tab === 0 ? receivedInvites.pending : [
    ...receivedInvites.accepted,
    ...receivedInvites.rejected,
    ...receivedInvites.cancelled,
    ...receivedInvites.expired,
  ];

  return (
    <Root>
      <Header>
        <HeaderTitle>{t("INVITE.TITLE")}</HeaderTitle>
      </Header>

      <Content>
        <StyledTabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={t("INVITE.PENDING_TAB", { count: unreadCount })} />
          <Tab label={t("INVITE.HISTORY_TAB")} />
        </StyledTabs>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {isLoading ? (
          <EmptyWrap>
            <CircularProgress size={24} />
          </EmptyWrap>
        ) : currentList.length === 0 ? (
          <EmptyWrap>
            <Typography>{t("INVITE.NO_INVITES")}</Typography>
          </EmptyWrap>
        ) : (
          currentList.map((invite) => (
            <InviteCard key={invite.id}>
              <AppAvatar
                size={48}
                name={invite.conversation?.name || "N"}
                src={invite.conversation?.avatarUrl ? buildS3Url(invite.conversation.avatarUrl) : undefined}
              />
              <InviteInfo>
                <GroupName>{invite.conversation?.name || "Nhóm"}</GroupName>
                <InviteDetail>
                  {t("INVITE.INVITED_BY", { name: invite.inviter?.fullName || "Người dùng" })}
                </InviteDetail>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  {tab === 0 && (
                    <Chip
                      size="small"
                      icon={<AccessTimeIcon />}
                      label={formatExpiry(invite.expiresAt)}
                      variant="outlined"
                      color="default"
                    />
                  )}
                  {getStatusChip(invite.status, t)}
                </Stack>
              </InviteInfo>
              {tab === 0 && (
                <Actions>
                  <IconButton
                    color="success"
                    onClick={() => handleAccept(invite)}
                    size="small"
                    sx={{ bgcolor: "#E8F5E9", "&:hover": { bgcolor: "#C8E6C9" } }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleReject(invite)}
                    size="small"
                    sx={{ bgcolor: "#FFEBEE", "&:hover": { bgcolor: "#FFCDD2" } }}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                </Actions>
              )}
            </InviteCard>
          ))
        )}
      </Content>
    </Root>
  );
}
