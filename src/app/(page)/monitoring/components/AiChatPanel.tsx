"use client";

import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { monitoringService } from "@/src/common/service/monitoring-service";
import { AiAnalyzeResult } from "@/src/common/interface/monitoring-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { toast } from "@/src/common/store/useToastStore";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

export default function AiChatPanel() {
  const t = useTrans();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      <Box sx={{ flex: 1, overflowY: "auto", mb: 1 }}>
        {msgs.map((m, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              textAlign: m.role === "user" ? "right" : "left",
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: m.role === "user" ? "#1976d2" : "#0F172A",
              }}
            >
              {m.text}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Typography sx={{ fontSize: 13, color: "#888" }}>…</Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void send();
          }}
          placeholder={t("MONITORING.AI_PLACEHOLDER")}
        />
        <Button variant="contained" onClick={() => void send()} disabled={loading}>
          {t("MONITORING.SEND")}
        </Button>
      </Box>
    </Paper>
  );
}
