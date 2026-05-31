"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  InputBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { useGroupInviteStore } from "@/src/common/store/useGroupInviteStore";
import { useFriendStore } from "@/src/common/store/useFriendStore";
import { useTrans } from "@/src/common/utilities/hook/trans";
import {
  GroupInviteDto,
  GroupInviteStatus,
} from "@/src/common/interface/invite-interface";
import AppAvatar from "@/src/shared/component/Avatar";
import { buildS3Url } from "@/src/shared/component/Avatar";
import { CheckedIcon, StyledCheckIcon, StyledCheckbox, UncheckedIcon } from "../conversation-infor/AddMemberGroupDialog";

interface Props {
  conversationId: string;
  existingMemberIds: string[];
}

const Root = styled(Box)({
  padding: 16,
});

const SearchWrap = styled(Box)({
  height: 40,
  display: "flex",
  alignItems: "center",
  background: "#F3F4F6",
  borderRadius: 8,
  padding: "0 10px",
  marginBottom: 12,
});

const SearchInput = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
  fontSize: 14,
});

const StyledTabs = styled(Tabs)({
  minHeight: 36,
  marginBottom: 12,
  borderBottom: "1px solid #E5E7EB",
  "& .MuiTab-root": {
    minHeight: 36,
    textTransform: "none",
    fontSize: 13,
    fontWeight: 600,
    padding: "4px 12px",
  },
});

const EmptyText = styled(Typography)({
  textAlign: "center",
  color: "#64748B",
  fontSize: 14,
  padding: 32,
});

const InviteItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #F1F5F9",
});

export default function ConversationInviteManage({
  conversationId,
  existingMemberIds,
}: Props) {
  const t = useTrans();
  const [tab, setTab] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [expiry, setExpiry] = useState(168);

  const friends = useFriendStore((s) => s.friends);
  const fetchFriends = useFriendStore((s) => s.fetchFriends);
  const { conversationInvites, isLoading, isSending, sendInvites, cancelInvite, fetchConversationInvites } = useGroupInviteStore();

  useEffect(() => {
    void fetchFriends();
    void fetchConversationInvites(conversationId);
  }, [conversationId, fetchFriends, fetchConversationInvites]);

  const candidates = friends.filter(
    (f) => !existingMemberIds.includes(f.id) &&
      (!keyword.trim() || f.fullName.toLowerCase().includes(keyword.toLowerCase()))
  );

  const friendMap = new Map(friends.map((f) => [f.id, f]));

  const alreadyInvitedIds = conversationInvites
    .filter((inv) => inv.status === "pending")
    .map((inv) => inv.invitedUserId);

  const handleToggle = (userId: string) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSend = async () => {
    const result = await sendInvites(conversationId, {
      userIds: selectedIds,
      message: message.trim() || undefined,
      expiresInHours: expiry,
    });
    if (result) {
      setSelectedIds([]);
      setMessage("");
      void fetchConversationInvites(conversationId);
    }
  };

  const handleCancel = async (invite: GroupInviteDto) => {
    await cancelInvite(conversationId, invite.id);
    void fetchConversationInvites(conversationId);
  };

  const statusChip = (status: GroupInviteStatus) => {
    const config: Record<string, { label: string; color: "default" | "success" | "error" | "warning" | "info" }> = {
      pending: { label: t("INVITE.STATUS_PENDING"), color: "warning" },
      accepted: { label: t("INVITE.STATUS_ACCEPTED"), color: "success" },
      rejected: { label: t("INVITE.STATUS_REJECTED"), color: "error" },
      cancelled: { label: t("INVITE.STATUS_CANCELLED"), color: "default" },
      expired: { label: t("INVITE.STATUS_EXPIRED"), color: "default" },
    };
    const c = config[status] ?? { label: status, color: "default" as const };
    return <Chip size="small" label={c.label} color={c.color} variant="outlined" />;
  };

  return (
    <Root>
      <StyledTabs value={tab} onChange={(_: unknown, v: number) => setTab(v)}>
        <Tab label={t("INVITE.CONVO_SEND_TAB")} />
        <Tab label={t("INVITE.CONVO_VIEW_TAB")} />
      </StyledTabs>

      {tab === 0 ? (
        <>
          <SearchWrap>
            <SearchIcon sx={{ fontSize: 20, color: "#6B7280" }} />
            <SearchInput
              placeholder={t("GROUP.SEARCH_FRIENDS")}
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            />
          </SearchWrap>

          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Button
              size="small"
              variant={expiry === 24 ? "contained" : "outlined"}
              onClick={() => setExpiry(24)}
            >
              24h
            </Button>
            <Button
              size="small"
              variant={expiry === 72 ? "contained" : "outlined"}
              onClick={() => setExpiry(72)}
            >
              3 ngày
            </Button>
            <Button
              size="small"
              variant={expiry === 168 ? "contained" : "outlined"}
              onClick={() => setExpiry(168)}
            >
              7 ngày
            </Button>
          </Box>

          <SearchWrap sx={{ mb: 1 }}>
            <SearchInput
              placeholder={t("INVITE.MESSAGE_PLACEHOLDER")}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            />
          </SearchWrap>

          <Box sx={{ maxHeight: 260, overflowY: "auto" }}>
            {candidates.map((friend) => {
              const isInvited = alreadyInvitedIds.includes(friend.id);
              const checked = selectedIds.includes(friend.id) || isInvited;
              return (
                <ListItemButton
                  key={friend.id}
                  dense
                  disabled={isInvited}
                  onClick={() => !isInvited && handleToggle(friend.id)}
                >
                  <ListItemIcon sx={{ minWidth: 20 }}>
                    <StyledCheckbox
                      edge="start"
                      checked={checked}
                      disabled={isInvited}
                      icon={<UncheckedIcon />}
                      checkedIcon={<CheckedIcon><StyledCheckIcon /></CheckedIcon>}
                    />
                  </ListItemIcon>
                  <AppAvatar
                    size={36}
                    name={friend.fullName || "U"}
                    src={friend.avatarUrl ? buildS3Url(friend.avatarUrl) : undefined}
                  />
                  <ListItemText
                    primary={friend.fullName}
                    secondary={isInvited ? t("INVITE.ALREADY_INVITED") : undefined}
                    sx={{ ml: 1 }}
                  />
                </ListItemButton>
              );
            })}
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={selectedIds.length === 0 || isSending}
            onClick={handleSend}
            sx={{ mt: 2 }}
          >
            {isSending
              ? t("INVITE.SENDING")
              : `${t("INVITE.SEND_BTN")} (${selectedIds.length})`}
          </Button>
        </>
      ) : (
        <>
          {isLoading ? (
            <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress size={24} /></Box>
          ) : conversationInvites.length === 0 ? (
            <EmptyText>Chưa có lời mời nào</EmptyText>
          ) : (
            conversationInvites.map((inv) => {
              const invitedUser = friendMap.get(inv.invitedUserId);
              const invitedName = invitedUser?.fullName || inv.invitedUserId;
              const invitedAvatar = invitedUser?.avatarUrl
                ? buildS3Url(invitedUser.avatarUrl)
                : undefined;
              return (
              <InviteItem key={inv.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AppAvatar size={36} name={invitedName} src={invitedAvatar} />
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {invitedName}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#64748B" }}>
                      {t("INVITE.INVITED_BY", { name: inv.inviter?.fullName || "Người dùng" })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {statusChip(inv.status)}
                  {inv.status === "pending" && (
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      onClick={() => handleCancel(inv)}
                    >
                      {t("INVITE.CANCEL")}
                    </Button>
                  )}
                </Box>
              </InviteItem>
            );
          })
          )}
        </>
      )}
    </Root>
  );
}
