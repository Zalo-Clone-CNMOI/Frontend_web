"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UiMessage } from "@/src/common/interface/chat-interface";

interface SystemMessageBannerProps {
  message: UiMessage;
}

const SystemMessageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 16px",
  margin: "8px 0",
}));

const SystemMessageContent = styled(Box)(({ theme }) => ({
  backgroundColor: "#e4e6eb",
  borderRadius: "8px",
  padding: "6px 12px",
  maxWidth: "85%",
}));

const SystemMessageText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#050505",
  fontWeight: 400,
  textAlign: "center",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
}));

export default function SystemMessageBanner({ message }: SystemMessageBannerProps) {
  return (
    <SystemMessageWrapper>
      <SystemMessageContent>
        <SystemMessageText>
          {message.body}
        </SystemMessageText>
      </SystemMessageContent>
    </SystemMessageWrapper>
  );
}
