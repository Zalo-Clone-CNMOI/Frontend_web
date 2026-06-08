"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { monitoringService } from "@/src/common/service/monitoring-service";
import { AiAnalyzeResult } from "@/src/common/interface/monitoring-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { toast } from "@/src/common/store/useToastStore";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

/** Minimal markdown → JSX: headers, bold, italic, inline-code, bullet lists. */
function MdText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        // Blank line → spacer
        if (!line.trim()) return <Box key={i} sx={{ height: 6 }} />;

        // Heading: ## or ###
        const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          return (
            <Typography
              key={i}
              sx={{
                fontWeight: 700,
                fontSize: level === 1 ? 15 : level === 2 ? 14 : 13,
                mb: 0.5,
              }}
            >
              {inlineFormat(headingMatch[2])}
            </Typography>
          );
        }

        // Bullet list: - or *
        const bulletMatch = line.match(/^[-*]\s+(.*)/);
        if (bulletMatch) {
          return (
            <Box key={i} sx={{ display: "flex", gap: 0.75, mb: 0.25 }}>
              <Typography sx={{ fontSize: 13, lineHeight: 1.6 }}>•</Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.6 }}>
                {inlineFormat(bulletMatch[1])}
              </Typography>
            </Box>
          );
        }

        // Numbered list: 1. 2. etc
        const numMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <Box key={i} sx={{ display: "flex", gap: 0.75, mb: 0.25 }}>
              <Typography sx={{ fontSize: 13, lineHeight: 1.6 }}>
                {numMatch[1]}.
              </Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.6 }}>
                {inlineFormat(numMatch[2])}
              </Typography>
            </Box>
          );
        }

        // Normal paragraph
        return (
          <Typography key={i} sx={{ fontSize: 13, lineHeight: 1.6, mb: 0.25 }}>
            {inlineFormat(line)}
          </Typography>
        );
      })}
    </>
  );
}

/** Splits a line on **bold**, *italic*, `code` tokens and returns React nodes. */
function inlineFormat(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Token pattern: **bold** | *italic* | `code`
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[1];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key++}>{token.slice(2, -2)}</strong>,
      );
    } else if (token.startsWith("*")) {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    } else {
      // inline code
      parts.push(
        <Box
          key={key++}
          component="code"
          sx={{
            fontFamily: "monospace",
            fontSize: 12,
            bgcolor: "rgba(0,0,0,0.08)",
            borderRadius: 0.5,
            px: 0.5,
            py: 0.1,
          }}
        >
          {token.slice(1, -1)}
        </Box>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Animated 3-dot typing indicator. */
function TypingDots() {
  return (
    <Box sx={{ display: "flex", gap: "4px", alignItems: "center", py: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: "#94a3b8",
            animation: "bounce 1.2s infinite ease-in-out",
            animationDelay: `${i * 0.2}s`,
            "@keyframes bounce": {
              "0%, 80%, 100%": { transform: "scale(0.7)", opacity: 0.5 },
              "40%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
  );
}

export default function AiChatPanel() {
  const t = useTrans();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or loading state
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await monitoringService.aiAnalyze(q);
      if (res.ok) {
        const payload = res.payload as AiAnalyzeResult;
        setMsgs((m) => [...m, { role: "assistant", text: payload.answer }]);
      } else {
        toast.error(t("COMMON.ERROR"));
      }
    } catch {
      toast.error(t("COMMON.NETWORK_ERROR"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        height: 480,
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        {t("MONITORING.AI_CHAT")}
      </Typography>

      {/* Message list */}
      <Box sx={{ flex: 1, overflowY: "auto", mb: 1, pr: 0.5 }}>
        {msgs.length === 0 && !loading && (
          <Typography sx={{ fontSize: 13, color: "#94a3b8", mt: 1 }}>
            {t("MONITORING.AI_PLACEHOLDER")}
          </Typography>
        )}

        {msgs.map((m, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "85%",
                px: 1.5,
                py: 1,
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                bgcolor: m.role === "user" ? "#1976d2" : "#f1f5f9",
                color: m.role === "user" ? "#fff" : "#0f172a",
              }}
            >
              {m.role === "user" ? (
                <Typography sx={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </Typography>
              ) : (
                <MdText text={m.text} />
              )}
            </Box>
          </Box>
        ))}

        {/* Typing indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
            <Box
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: "16px 16px 16px 4px",
                bgcolor: "#f1f5f9",
              }}
            >
              <TypingDots />
            </Box>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {/* Input row */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) void send();
          }}
          placeholder={t("MONITORING.AI_PLACEHOLDER")}
          disabled={loading}
        />
        <Button variant="contained" onClick={() => void send()} disabled={loading}>
          {t("MONITORING.SEND")}
        </Button>
      </Box>
    </Paper>
  );
}
