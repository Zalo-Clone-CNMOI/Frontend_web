"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Panel } from "../../Auth.styles";

/* ========= Styled ========= */
const QRBox = styled(Box)({
  width: "100%",
  border: "1px solid #E5E7EB",
  borderRadius: 12,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 14,
});

const QRPlaceholder = styled(Box)({
  width: 260,
  height: 260,
  borderRadius: 16,
  background:
    "linear-gradient(135deg, rgba(5,115,255,0.08) 0%, rgba(5,115,255,0.02) 100%)",
  border: "1px dashed rgba(5,115,255,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const HelperText = styled(Typography)({
  textAlign: "center",
  color: "#0573ff",
  fontWeight: 600,
  fontSize: 16,
});

const HelperText2 = styled(Typography)({
  textAlign: "center",
  color: "#111827",
  fontWeight: 500,
  fontSize: 16,
});

export default function LoginQrTab() {
  return (
    <Panel value="loginQR">
      <QRBox>
        <QRPlaceholder>
          <Typography color="#0573ff" fontWeight={700}>
            QR CODE
          </Typography>
        </QRPlaceholder>

        <HelperText>Chỉ dùng để đăng nhập</HelperText>
        <HelperText2>Zalo trên máy tính</HelperText2>
      </QRBox>
    </Panel>
  );
}
