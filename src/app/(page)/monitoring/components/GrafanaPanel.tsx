"use client";

import { Paper, Typography } from "@mui/material";

export default function GrafanaPanel() {
  const base = process.env.NEXT_PUBLIC_GRAFANA_BASE_URL;
  if (!base) return null;
  // Subpath embed (nginx /grafana/ + serve_from_sub_path). Replace dashboard
  // uid if you create another. kiosk hides Grafana chrome.
  const src = `${base}/d/zalo-overview/zalo-overview?orgId=1&kiosk&theme=dark`;
  return (
    <Paper sx={{ p: 1, borderRadius: 3, height: 480 }}>
      <Typography sx={{ fontWeight: 700, mb: 1, px: 1 }}>Metrics</Typography>
      <iframe
        src={src}
        width="100%"
        height="420"
        style={{ border: 0 }}
        title="grafana"
      />
    </Paper>
  );
}
