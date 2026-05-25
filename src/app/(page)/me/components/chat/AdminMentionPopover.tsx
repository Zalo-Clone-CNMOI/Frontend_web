"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ConversationMemberDto } from "@/src/common/interface/chat-interface";

interface AdminMentionPopoverProps {
  admins: ConversationMemberDto[];
}

const PopoverContainer = styled(Box)({
  position: "absolute",
  bottom: "100%",
  left: 16,
  zIndex: 30,
  background: "#1C1C1E",
  borderRadius: 12,
  padding: "10px 14px",
  minWidth: 220,
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  marginBottom: 8,
});

const Arrow = styled(Box)({
  position: "absolute",
  bottom: -6,
  left: 24,
  width: 12,
  height: 12,
  background: "#1C1C1E",
  transform: "rotate(45deg)",
  borderRadius: 2,
});

const MentionLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: "#8E8E93",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 8,
});

const AdminRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "4px 0",
});

const AdminName = styled(Typography)({
  fontSize: 13,
  color: "#fff",
  fontWeight: 500,
});

const AdminRoleBadge = styled(Typography)({
  fontSize: 10,
  color: "#8E8E93",
  marginLeft: "auto",
});

const StyledAvatar = styled(Avatar)({
  width: 22,
  height: 22,
  fontSize: 11,
  fontWeight: 600,
});

export default function AdminMentionPopover({ admins }: AdminMentionPopoverProps) {
  if (admins.length === 0) return null;

  return (
    <PopoverContainer>
      <MentionLabel>Sẽ nhắc các quản trị viên</MentionLabel>
      {admins.map((admin) => (
        <AdminRow key={admin.userId}>
          <StyledAvatar src={admin.avatarUrl ?? undefined}>
            {admin.fullName.charAt(0).toUpperCase()}
          </StyledAvatar>
          <AdminName>{admin.fullName}</AdminName>
          <AdminRoleBadge>
            {admin.role === "owner" ? "Chủ nhóm" : "Quản trị viên"}
          </AdminRoleBadge>
        </AdminRow>
      ))}
      <Arrow />
    </PopoverContainer>
  );
}
