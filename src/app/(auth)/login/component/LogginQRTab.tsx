"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Panel } from "../../Auth.styles";
import { useEffect, useRef, useState } from "react";
import { qrService } from "@/src/common/service/qr-service";
import { QRCodeCanvas } from "qrcode.react";
import { socket } from "@/src/common/socket/socket";

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

export const QrWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const QrOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  borderRadius: 16,
  backgroundColor: "rgba(255,255,255,0.9)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  textAlign: "center",
});

export const CountdownText = styled(Typography)({
  fontSize: 14,
  color: "#6B7280",
  textAlign: "center",
  fontWeight: 500,
});

type UiStatus = "LOADING" | "WAITING" | "SCANNED" | "APPROVED" | "EXPIRED" | "ERROR";

export default function LoginQrTab() {
  const qrExp = 30;

  const [qrValue, setQrValue] = useState("");
  const [qrStatus, setQrStatus] = useState<UiStatus>("LOADING");
  const [timeLeft, setTimeLeft] = useState(qrExp);

  const currentSessionRef = useRef<string>("");
  const startingRef = useRef(false);
  const countdownRef = useRef<number | null>(null);

  const stopCountdown = () => {
    if (countdownRef.current) window.clearInterval(countdownRef.current);
    countdownRef.current = null;
  };

  const stopAll = () => {
    stopCountdown();
  };

  const startCountdown = () => {
    stopCountdown();
    setTimeLeft(qrExp);

    countdownRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopCountdown();
          setQrStatus("EXPIRED");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const ensureSocketConnected = async () => {
    if (socket.connected) return;

    socket.connect();

    await new Promise<void>((resolve, reject) => {
      const t = window.setTimeout(() => reject(new Error("Socket timeout")), 8000);

      const onConnect = () => {
        window.clearTimeout(t);
        socket.off("connect_error", onErr);
        resolve();
      };

      const onErr = (err: any) => {
        window.clearTimeout(t);
        socket.off("connect", onConnect);
        reject(err);
      };

      socket.once("connect", onConnect);
      socket.once("connect_error", onErr);
    });
  };

  const startQrLogin = async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    try {
      stopAll();
      setQrStatus("LOADING");
      setQrValue("");
      setTimeLeft(qrExp);

      await ensureSocketConnected();

      const socketId = socket.id;
      console.log(socketId);

      if (!socketId) throw new Error("Missing socket.id");

      const gen = await qrService.generate({
        socketId,
        deviceInfo: navigator.userAgent,
      });

      const sessionId = String(gen?.payload?.data?.sessionId ?? "").trim();
      if (!sessionId) throw new Error("Missing sessionId");

      currentSessionRef.current = sessionId;

      setQrValue(sessionId);
      setQrStatus("WAITING");
      startCountdown();
    } catch (e) {
      console.log("startQrLogin error:", e);
      setQrStatus("ERROR");
    } finally {
      startingRef.current = false;
    }
  };

  useEffect(() => {
    startQrLogin();
    return () => stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onQrConfirmed = (data: any) => {
      console.log("✅ [qr:confirmed] payload:", data);

      if (String(data?.sessionId) !== currentSessionRef.current) return;

      setQrStatus("APPROVED");
      stopAll();

      // lưu token
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      // router.push("/");
    };

    socket.on("qr:confirmed", onQrConfirmed);

    return () => {
      socket.off("qr:confirmed", onQrConfirmed);
    };
  }, [socket]);


  return (
    <Panel value="loginQR">
      <QRBox>
        <QrWrapper>
          <QRPlaceholder>
            {qrValue ? <QRCodeCanvas value={qrValue} size={220} includeMargin /> : <CircularProgress />}
          </QRPlaceholder>

          {qrStatus === "EXPIRED" && (
            <QrOverlay>
              <Typography fontWeight={700}>QR đã hết hạn</Typography>
              <Typography fontSize={13} color="#6B7280">
                Bấm “Tạo QR mới” để tiếp tục
              </Typography>
            </QrOverlay>
          )}
        </QrWrapper>

        {(qrStatus === "WAITING" || qrStatus === "SCANNED") && (
          <CountdownText>
            Hết hạn sau: <b>{timeLeft}s</b>
          </CountdownText>
        )}

        <HelperText>Chỉ dùng để đăng nhập</HelperText>
        <HelperText2>Zalo trên máy tính</HelperText2>

        {qrStatus === "SCANNED" && (
          <Typography fontSize={14} color="#111827">
            Đã quét. Vui lòng xác nhận trên điện thoại…
          </Typography>
        )}

        {(qrStatus === "EXPIRED" || qrStatus === "ERROR") && (
          <Button
            variant="contained"
            onClick={startQrLogin}
            disabled={startingRef.current}
          >
            Tạo QR mới
          </Button>
        )}
      </QRBox>
    </Panel>
  );
}
