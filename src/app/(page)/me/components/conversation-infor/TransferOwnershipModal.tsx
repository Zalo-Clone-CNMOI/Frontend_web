"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Radio,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppModal from "@/src/shared/component/AppModal";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { groupService } from "@/src/common/service/group-service";
import { useChatStore } from "@/src/common/store/useChatStore";
import type { ConversationMemberDto } from "@/src/common/interface/chat-interface";

interface TransferOwnershipModalProps {
  open: boolean;
  onClose: () => void;
  conversationId: string;
}

const MemberRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const MemberInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const MemberName = styled(Typography)({
  fontSize: 15,
  color: "#0F172A",
  fontWeight: 500,
});

const MemberNickname = styled(Typography)({
  fontSize: 13,
  color: "#64748B",
});

export default function TransferOwnershipModal({
  open,
  onClose,
  conversationId,
}: TransferOwnershipModalProps) {
  const t = useTrans();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const conversationDetail = useChatStore(
    (state) => state.conversationDetailById?.[conversationId]
  );
  const fetchConversationDetail = useChatStore(
    (state) => state.fetchConversationDetail
  );

  const members = conversationDetail?.members ?? [];
  const eligibleMembers = members.filter((m) => m.role !== "owner");

  const handleConfirm = async () => {
    if (!selectedUserId || submitting) return;

    try {
      setSubmitting(true);
      await groupService.transferOwnership(conversationId, selectedUserId);
      await fetchConversationDetail(conversationId, true);
      onClose();
    } catch (error) {
      console.error("Transfer ownership failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setSelectedUserId(null);
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={t("TRANSFER_OWNERSHIP")}
      headerDivider
      actions={
        <>
          <Button onClick={handleClose} disabled={submitting} color="inherit">
            {t("CANCEL")}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedUserId || submitting}
            color="primary"
            variant="contained"
          >
            {submitting ? t("TRANSFERRING") : t("TRANSFER")}
          </Button>
        </>
      }
    >
      <Typography sx={{ fontSize: 14, color: "#64748B", mb: 2 }}>
        {t("TRANSFER_OWNERSHIP_DESC")}
      </Typography>

      {eligibleMembers.length === 0 ? (
        <Typography sx={{ fontSize: 14, color: "#64748B", textAlign: "center", py: 2 }}>
          {t("NO_ELIGIBLE_MEMBERS")}
        </Typography>
      ) : (
        eligibleMembers.map((member: ConversationMemberDto) => (
          <MemberRow
            key={member.userId}
            onClick={() => setSelectedUserId(member.userId)}
          >
            <AppAvatar
              src={member.avatarUrl}
              name={member.nickname || member.fullName}
              size={40}
              fontSize={16}
            />
            <MemberInfo>
              <MemberName>{member.nickname || member.fullName}</MemberName>
              {member.nickname && (
                <MemberNickname>{member.fullName}</MemberNickname>
              )}
            </MemberInfo>
            <Radio
              checked={selectedUserId === member.userId}
              onChange={() => setSelectedUserId(member.userId)}
              value={member.userId}
              size="small"
            />
          </MemberRow>
        ))
      )}
    </AppModal>
  );
}
