"use client";

import { useEffect, useRef } from "react";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useZaiChatStore } from "@/src/common/store/useZaiChatStore";
import { emitStreamCancel } from "@/src/common/action/ai.action";
import { useTrans } from "@/src/common/utilities/hook/trans";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Bar = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  padding: "8px 12px",
  borderTop: "1px solid #E5E7EB",
  backgroundColor: "#F0F7FF",
  minHeight: 44,
  maxHeight: 140,
});

const ZaiIcon = styled(Box)({
  width: 24,
  height: 24,
  borderRadius: 6,
  backgroundColor: "#005AE0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginTop: 2,
});

const TextScroll = styled(Box)({
  flex: 1,
  overflowY: "auto",
  maxHeight: 116,
});

const TypingRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  flex: 1,
  minHeight: 28,
});

const StopButton = styled(IconButton)({
  width: 28,
  height: 28,
  backgroundColor: "#FF3B30",
  borderRadius: 6,
  flexShrink: 0,
  "&:hover": { backgroundColor: "#D93025" },
  "& svg": { color: "#fff", fontSize: 16 },
});

interface ZaiStreamBarProps {
  conversationId: string;
}

/**
 * Displays the live Zai streaming state above the chat composer.
 *
 * Phases:
 *   1. Typing indicator only (ai:zai:typing arrived, no chunks yet)
 *   2. Live streaming text (chunks accumulating)
 *   3. Fades out when stream is complete (parent unmounts this component)
 *
 * Stop button: emits `ai:stream:cancel` and immediately clears local state
 * (BE sends nothing in response — fire-and-forget, mobile parity).
 *
 * `aria-live="polite"` so screen readers announce new streamed text without
 * interrupting the user.
 */
export default function ZaiStreamBar({ conversationId }: ZaiStreamBarProps) {
  const t = useTrans();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const streamingText = useZaiChatStore((s) => s.getStreamingText(conversationId));
  const isTyping = useZaiChatStore((s) => s.isZaiTyping(conversationId));

  // Auto-scroll to bottom as chunks arrive.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [streamingText]);

  const handleStop = () => {
    emitStreamCancel(conversationId);
  };

  return (
    <Bar role="status" aria-live="polite" aria-label={t("CHAT.ZAI_STREAM_LABEL")}>
      <ZaiIcon>
        <AutoAwesomeRoundedIcon sx={{ color: "#fff", fontSize: 14 }} />
      </ZaiIcon>

      {streamingText ? (
        <TextScroll ref={scrollRef}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#111827",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {streamingText}
          </Typography>
        </TextScroll>
      ) : (
        <TypingRow>
          <CircularProgress
            size={12}
            thickness={5}
            sx={{ color: "#005AE0", animation: `${pulse} 1.2s ease-in-out infinite` }}
          />
          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              fontStyle: "italic",
              animation: `${pulse} 1.6s ease-in-out infinite`,
            }}
          >
            {isTyping ? t("CHAT.ZAI_TYPING") : t("CHAT.ZAI_STREAM_LABEL")}
          </Typography>
        </TypingRow>
      )}

      <StopButton
        size="small"
        onClick={handleStop}
        aria-label={t("CHAT.ZAI_STOP")}
        title={t("CHAT.ZAI_STOP")}
      >
        <StopRoundedIcon />
      </StopButton>
    </Bar>
  );
}
