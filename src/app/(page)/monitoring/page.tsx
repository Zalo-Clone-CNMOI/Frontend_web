"use client";

import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { monitoringService } from "@/src/common/service/monitoring-service";
import { ContainerStatus } from "@/src/common/interface/monitoring-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";
import ContainerGrid from "./components/ContainerGrid";
import LogViewer from "./components/LogViewer";
import AiChatPanel from "./components/AiChatPanel";
import GrafanaPanel from "./components/GrafanaPanel";

export default function MonitoringPage() {
  const t = useTrans();
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [rows, setRows] = useState<ContainerStatus[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await monitoringService.getContainers();
        if (res.statusCode === 403 || res.statusCode === 401) {
          setDenied(true);
        } else if (res.ok) {
          setRows(res.payload as ContainerStatus[]);
        }
      } catch {
        setDenied(true);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  if (loading)
    return (
      <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (denied)
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{t("MONITORING.ACCESS_DENIED")}</Alert>
      </Box>
    );

  const containerNames = rows.map((r) => r.container);

  return (
    <Box
      sx={{ p: 3, bgcolor: "#F3F5F7", minHeight: "100%", overflowY: "auto" }}
    >
      <Stack spacing={2}>
        <ContainerGrid rows={rows} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <LogViewer containers={containerNames} />
          <AiChatPanel />
        </Box>
        <GrafanaPanel />
      </Stack>
    </Box>
  );
}
