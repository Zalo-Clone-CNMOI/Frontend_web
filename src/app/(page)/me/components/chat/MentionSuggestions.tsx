"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ConversationMemberDto } from "@/src/common/interface/chat-interface";

interface MentionSuggestionsProps {
  members: ConversationMemberDto[];
  query: string;
  selectedIndex: number;
  onSelect: (member: ConversationMemberDto) => void;
  /** userId of the Zai bot — triggers special AI badge rendering for that row. */
  zaiMemberId?: string;
}

const Wrapper = styled(Box)({
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  maxHeight: 220,
  overflowY: "auto",
  marginBottom: 6,
  marginLeft: 8,
  marginRight: 8,
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

const AiBadge = styled(Typography)({
  fontSize: 10,
  fontWeight: 700,
  color: "#6366F1",
  background: "#EEF2FF",
  borderRadius: 4,
  padding: "1px 5px",
  marginLeft: "auto",
  letterSpacing: 0.4,
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
  zaiMemberId,
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
      {filtered.map((member, idx) => {
        const isZai = !!zaiMemberId && member.userId === zaiMemberId;
        return (
          <SuggestionRow
            key={member.userId}
            active={idx === selectedIndex}
            onClick={() => onSelect(member)}
            onMouseEnter={() => {}}
          >
            {isZai ? (
              <StyledAvatar sx={{ bgcolor: "#0058DC", fontSize: 15 }}>
                🤖
              </StyledAvatar>
            ) : (
              <StyledAvatar src={member.avatarUrl ?? undefined}>
                {member.fullName.charAt(0).toUpperCase()}
              </StyledAvatar>
            )}
            <NameText>{member.fullName}</NameText>
            {isZai ? (
              <AiBadge>AI</AiBadge>
            ) : member.nickname ? (
              <RoleBadge>{member.nickname}</RoleBadge>
            ) : null}
          </SuggestionRow>
        );
      })}
    </Wrapper>
  );
}
