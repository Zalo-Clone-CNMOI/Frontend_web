"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ConversationMemberDto } from "@/src/common/interface/chat-interface";

interface MentionSuggestionsProps {
  members: ConversationMemberDto[];
  query: string;
  selectedIndex: number;
  onSelect: (member: ConversationMemberDto) => void;
}

const Wrapper = styled(Box)({
  position: "absolute",
  bottom: "100%",
  left: 16,
  zIndex: 30,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  minWidth: 240,
  maxHeight: 260,
  overflowY: "auto",
  marginBottom: 6,
  padding: "6px 0",
});

const SuggestionRow = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 14px",
  cursor: "pointer",
  background: active ? "#F1F5F9" : "transparent",
  "&:hover": {
    background: "#F1F5F9",
  },
}));

const StyledAvatar = styled(Avatar)({
  width: 28,
  height: 28,
  fontSize: 12,
  fontWeight: 600,
});

const NameText = styled(Typography)({
  fontSize: 14,
  color: "#0F172A",
  fontWeight: 500,
});

const RoleBadge = styled(Typography)({
  fontSize: 11,
  color: "#94A3B8",
  marginLeft: "auto",
});

const EmptyText = styled(Typography)({
  fontSize: 13,
  color: "#94A3B8",
  textAlign: "center",
  padding: "12px 14px",
});

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function MentionSuggestions({
  members,
  query,
  selectedIndex,
  onSelect,
}: MentionSuggestionsProps) {
  const lowerQuery = normalize(query);
  const filtered = members.filter((m) => {
    const name = normalize(m.fullName);
    const nick = (m.nickname ? normalize(m.nickname) : "");
    return name.includes(lowerQuery) || nick.includes(lowerQuery);
  });

  if (filtered.length === 0) {
    return (
      <Wrapper>
        <EmptyText>Không tìm thấy thành viên</EmptyText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {filtered.map((member, idx) => (
        <SuggestionRow
          key={member.userId}
          active={idx === selectedIndex}
          onClick={() => onSelect(member)}
          onMouseEnter={() => {}}
        >
          <StyledAvatar src={member.avatarUrl ?? undefined}>
            {member.fullName.charAt(0).toUpperCase()}
          </StyledAvatar>
          <NameText>{member.fullName}</NameText>
          {member.nickname && (
            <RoleBadge>{member.nickname}</RoleBadge>
          )}
        </SuggestionRow>
      ))}
    </Wrapper>
  );
}
