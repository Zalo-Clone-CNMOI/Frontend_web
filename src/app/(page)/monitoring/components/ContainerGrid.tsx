"use client";

import { Box, Chip, Paper, Typography } from "@mui/material";
import { ContainerStatus } from "@/src/common/interface/monitoring-interface";
import { useTrans } from "@/src/common/utilities/hook/trans";

export default function ContainerGrid({ rows }: { rows: ContainerStatus[] }) {
  const t = useTrans();
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        {t("MONITORING.CONTAINERS")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {t("MONITORING.SERVICE")}
        </Typography>
        <Typography sx={{ fontWeight: 600 }}>
          {t("MONITORING.STATE")}
        </Typography>
        <Typography sx={{ fontWeight: 600 }}>
          {t("MONITORING.RESTARTS")}
        </Typography>
        <Typography sx={{ fontWeight: 600 }}>
          {t("MONITORING.HEALTH")}
        </Typography>
        {rows.map((r) => (
          <Box key={r.container} sx={{ display: "contents" }}>
            <Typography>{r.service}</Typography>
            <Box>
              <Chip
                size="small"
                label={r.up ? "UP" : "DOWN"}
                color={r.up ? "success" : "error"}
              />
            </Box>
            <Typography>{r.restarts24h}</Typography>
            <Box>
              <Chip
                size="small"
                label={r.healthProbe}
                color={
                  r.healthProbe === "up"
                    ? "success"
                    : r.healthProbe === "down"
                      ? "error"
                      : "default"
                }
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
