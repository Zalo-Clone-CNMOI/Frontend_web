"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ChatHeaderProps {
  title?: string;
  socketConnected: boolean;
  error?: string | null;
}

const HeaderRoot = styled(Box)({
  width: "100%",
  background: "#fff",
  borderBottom: "1px solid #EEF1F4",
});

const HeaderTop = styled(Box)({
  maxHeight: 68,
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const HeaderLeft = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const HeaderTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: "#111827",
  lineHeight: 1.2,
});

const HeaderSubtitle = styled(Typography)({
  fontSize: 13,
  color: "#6B7280",
  lineHeight: 1.2,
  display: "flex",
  alignItems: "center",
});

const StatusDot = styled("span")<{ online?: boolean }>(({ online }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: online ? "#22C55E" : "#C7CDD6",
  display: "inline-block",
  marginRight: 8,
}));

const ErrorBar = styled(Box)({
  width: "100%",
  padding: "10px 16px",
  background: "#FFF1F2",
  borderTop: "1px solid #FFE4E6",
});

const ErrorText = styled(Typography)({
  fontSize: 13,
  color: "#DC2626",
});

export default function ChatHeader({
  title,
  socketConnected,
  error,
}: ChatHeaderProps) {
  return (
    <HeaderRoot>
      <HeaderTop>
        <HeaderLeft>
          <HeaderTitle>{title || "Tin nhắn"}</HeaderTitle>
          <HeaderSubtitle>
            <StatusDot online={socketConnected} />
            {socketConnected ? "Đã kết nối" : "Mất kết nối"}
          </HeaderSubtitle>
        </HeaderLeft>
      </HeaderTop>

      {/* {error && (
        <ErrorBar>
          <ErrorText>{error}</ErrorText>
        </ErrorBar>
      )} */}
    </HeaderRoot>
  );
}