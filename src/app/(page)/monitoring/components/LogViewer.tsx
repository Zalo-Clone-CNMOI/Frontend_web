"use client";

import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { monitoringService } from "@/src/common/service/monitoring-service";
import { LogLine } from "@/src/common/interface/monitoring-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { toast } from "@/src/common/store/useToastStore";

const LEVELS = ["", "ERROR", "WARN", "LOG", "DEBUG", "VERBOSE"];

export default function LogViewer({ containers }: { containers: string[] }) {
  const t = useTrans();
  const [container, setContainer] = useState(containers[0] ?? "");
  const [level, setLevel] = useState("");
  const [lines, setLines] = useState<LogLine[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    if (!container) return;
    setLoading(true);
    try {
      const res = await monitoringService.getLogs(
        container,
        level || undefined,
        100,
      );
      if (res.ok) setLines(res.payload as LogLine[]);
      else toast.error(t("COMMON.ERROR"));
    } catch {
      toast.error(t("COMMON.NETWORK_ERROR"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        {t("MONITORING.LOGS")}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
        <Select
          size="small"
          value={container}
          onChange={(e) => setContainer(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {containers.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {LEVELS.map((l) => (
            <MenuItem key={l || "all"} value={l}>
              {l || "ALL"}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={fetchLogs} disabled={loading}>
          {t("MONITORING.REFRESH")}
        </Button>
      </Box>
      <Box
        sx={{
          fontFamily: "monospace",
          fontSize: 12,
          bgcolor: "#0b0b0b",
          color: "#d4d4d4",
          p: 1,
          borderRadius: 1,
          height: 320,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>
            {l.timestamp} {l.line}
          </div>
        ))}
      </Box>
    </Paper>
  );
}
