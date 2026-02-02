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

type UiStatus =
  | "LOADING"
  | "WAITING"
  | "SCANNED"
  | "APPROVED"
  | "EXPIRED"
  | "ERROR";

export default function LoginQrTab() {
  const qrExp = 30;

  const [qrValue, setQrValue] = useState("");
  const [qrStatus, setQrStatus] = useState<UiStatus>("LOADING");
  const [timeLeft, setTimeLeft] = useState(qrExp);
  const [error, setError] = useState<string>("");

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
    if (socket.connected) {
      console.log("[QR] ✅ Already connected:", socket.id);
      return;
    }

    console.log("[QR] 🔌 Attempting to connect...");
    socket.connect();

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onError);
        reject(new Error("Socket connection timeout after 10s"));
      }, 10000);

      const onConnect = () => {
        clearTimeout(timeout);
        socket.off("connect_error", onError);
        console.log("[QR] ✅ Socket connected:", socket.id);
        resolve();
      };

      const onError = (err: any) => {
        clearTimeout(timeout);
        socket.off("connect", onConnect);
        console.error("[QR] ❌ Connection error:", err);
        reject(err);
      };

      socket.once("connect", onConnect);
      socket.once("connect_error", onError);
    });
  };

  const startQrLogin = async () => {
    if (startingRef.current) {
      console.log("[QR] Already starting, skipping...");
      return;
    }
    startingRef.current = true;

    try {
      console.log("[QR] 🚀 Starting QR login flow...");
      stopAll();
      setQrStatus("LOADING");
      setQrValue("");
      setTimeLeft(qrExp);
      setError("");

      await ensureSocketConnected();

      const socketId = socket.id;
      console.log("[QR] ✅ Socket ready, ID:", socketId);

      if (!socketId) {
        throw new Error("Socket connected but no ID assigned");
      }

      console.log("[QR] 📡 Setting up event listeners...");

      socket.off("qr:confirmed");

      socket.on("qr:confirmed", (data: any) => {
        console.log("[QR] ✅ Received qr:confirmed:", data);

        // Verify session ID matches
        if (String(data?.sessionId) !== currentSessionRef.current) {
          console.warn("[QR] ⚠️ Session ID mismatch", {
            received: data?.sessionId,
            expected: currentSessionRef.current,
          });
          return;
        }

        stopCountdown();
        setQrStatus("APPROVED");

        // Store tokens and redirect
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          console.log("[QR] ✅ Tokens stored, redirecting...");
          setTimeout(() => {
            window.location.href = "/chat";
          }, 1000);
        }
      });

      socket.on("qr:rejected", (data: any) => {
        console.log("[QR] ❌ Received qr:rejected:", data);

        if (String(data?.sessionId) === currentSessionRef.current) {
          stopCountdown();
          setQrStatus("ERROR");
          setError("Login was rejected on mobile");
        }
      });

      console.log("[QR] 📝 Generating QR session...");
      const gen = await qrService.generate({
        socketId,
        deviceInfo: navigator.userAgent,
      });

      const sessionId = String(gen?.payload?.data?.sessionId ?? "").trim();
      if (!sessionId) {
        throw new Error("Failed to get session ID from API");
      }

      console.log("[QR] ✅ QR session created:", sessionId);
      currentSessionRef.current = sessionId;

      setQrValue(sessionId);
      setQrStatus("WAITING");
      startCountdown();

      console.log("[QR] ✅ QR login flow ready, waiting for mobile scan...");
    } catch (e) {
      console.error("[QR] ❌ Error:", e);
      setQrStatus("ERROR");
      setError(e instanceof Error ? e.message : "Unknown error occurred");
    } finally {
      startingRef.current = false;
    }
  };

  useEffect(() => {
    console.log("[QR] Component mounted, starting QR login...");
    startQrLogin();

    return () => {
      console.log("[QR] Component unmounting, cleaning up...");
      stopAll();
      socket.off("qr:confirmed");
      socket.off("qr:rejected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel value="loginQR">
      <QRBox>
        <QrWrapper>
          <QRPlaceholder>
            {qrValue && qrStatus === "WAITING" ? (
              <QRCodeCanvas value={qrValue} size={220} includeMargin />
            ) : qrStatus === "LOADING" ? (
              <CircularProgress />
            ) : qrStatus === "APPROVED" ? (
              <Typography fontSize={32}>✅</Typography>
            ) : null}
          </QRPlaceholder>

          {qrStatus === "EXPIRED" && (
            <QrOverlay>
              <Typography fontWeight={700}>QR đã hết hạn</Typography>
              <Typography fontSize={13} color="#6B7280">
                Bấm "Tạo QR mới" để tiếp tục
              </Typography>
            </QrOverlay>
          )}

          {qrStatus === "ERROR" && (
            <QrOverlay>
              <Typography fontWeight={700} color="error">
                ❌ Lỗi
              </Typography>
              <Typography fontSize={13} color="#6B7280">
                {error || "Có lỗi xảy ra"}
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

        {qrStatus === "APPROVED" && (
          <Typography fontSize={14} color="success.main" fontWeight={600}>
            ✅ Đăng nhập thành công!
          </Typography>
        )}

        {(qrStatus === "EXPIRED" || qrStatus === "ERROR") && (
          <Button
            variant="contained"
            onClick={startQrLogin}
            disabled={startingRef.current}
          >
            {startingRef.current ? "Đang tạo..." : "Tạo QR mới"}
          </Button>
        )}
      </QRBox>
    </Panel>
  );
}
