"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Panel } from "../../Auth.styles";
import { use, useEffect, useRef, useState } from "react";
import { qrService } from "@/src/common/service/qr-service";
import { QRCodeCanvas } from "qrcode.react";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { connectSocket, getSocket } from "@/src/common/socket/socket";
import { setRefreshToken, setSessionToken, setSessionTokenExpiresIn } from "@/src/common/utilities/utils";

const QRBox = styled(Box)({
  boxSizing: "border-box",
  width: "100%",
  margin: "0 auto",
  border: "1px solid #E5E7EB",
  borderRadius: 16,
  padding: 24,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
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
  const Trans = useTrans();
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
    const socket = connectSocket();

    if (socket.connected && socket.id) {
      console.log("[QR] Already connected:", socket.id);
      return socket;
    }

    return await new Promise<typeof socket>((resolve, reject) => {
      let lastError: any = null;

      const cleanup = () => {
        clearTimeout(timeoutId);
        socket.off("connect", onConnect);
        socket.off("connect_error", onError);
      };

      const onConnect = () => {
        cleanup();
        console.log("[QR] Socket connected:", socket.id);
        resolve(socket);
      };

      const onError = (err: any) => {
        lastError = err;
        console.warn("[QR] Temporary connect_error:", err?.message || err);
      };

      const timeoutId = window.setTimeout(() => {
        cleanup();
        reject(
          lastError instanceof Error
            ? lastError
            : new Error("Socket connection timeout after 20s")
        );
      }, 20000);

      socket.on("connect", onConnect);
      socket.on("connect_error", onError);

      if (!socket.active) {
        console.log("[QR] Attempting to connect...");
        socket.connect();
      }
    });
  };

  const startQrLogin = async () => {
    if (startingRef.current) {
      console.log("[QR] Already starting, skipping...");
      return;
    }

    startingRef.current = true;

    try {
      console.log("[QR] Starting QR login flow...");

      stopAll();
      currentSessionRef.current = "";

      const existingSocket = getSocket();
      existingSocket?.off("qr:confirmed");
      existingSocket?.off("qr:rejected");

      setQrStatus("LOADING");
      setQrValue("");
      setTimeLeft(qrExp);
      setError("");

      const socket = await ensureSocketConnected();

      const socketId = socket.id;
      console.log("[QR] Socket ready, ID:", socketId);

      if (!socketId) {
        throw new Error("Socket connected but no ID assigned");
      }

      console.log("[QR] Generating QR session...");
      const gen = await qrService.generate({
        socketId,
        deviceInfo: navigator.userAgent,
      });

      const sessionId = String(gen?.payload?.data?.sessionId ?? "").trim();

      if (!sessionId) {
        throw new Error("Failed to get session ID from API");
      }

      currentSessionRef.current = sessionId;
      console.log("[QR] QR session created:", sessionId);

      socket.off("qr:confirmed");
      socket.off("qr:rejected");

      socket.once("qr:confirmed", (data: any) => {
        console.log("[QR] Received qr:confirmed:", data);

        if (String(data?.sessionId ?? "").trim() !== currentSessionRef.current) {
          console.warn("[QR] Session ID mismatch", {
            received: data?.sessionId,
            expected: currentSessionRef.current,
          });
          return;
        }

        stopCountdown();
        setQrStatus("APPROVED");

        if (data?.accessToken) {
          setSessionToken(data.accessToken, data.user?.id ?? null);

          if (data?.refreshToken) {
            setRefreshToken(data.refreshToken);
          }

          if (data?.expiresIn) {
            setSessionTokenExpiresIn(data.expiresIn);
          }

          setTimeout(() => {
            window.location.href = "/me";
          }, 1000);
        }
      });

      socket.once("qr:rejected", (data: any) => {
        console.log("[QR] Received qr:rejected:", data);

        if (String(data?.sessionId ?? "").trim() !== currentSessionRef.current) {
          console.warn("[QR] Reject event session mismatch", {
            received: data?.sessionId,
            expected: currentSessionRef.current,
          });
          return;
        }

        stopCountdown();
        setQrStatus("ERROR");
        setError("Login was rejected on mobile");
      });

      setQrValue(sessionId);
      setQrStatus("WAITING");
      startCountdown();

      console.log("[QR] QR login flow ready, waiting for mobile scan...");
    } catch (e) {
      const socket = getSocket();
      socket?.off("qr:confirmed");
      socket?.off("qr:rejected");
      stopCountdown();
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

      const socket = getSocket();
      socket?.off("qr:confirmed");
      socket?.off("qr:rejected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel value="loginQR">
      <QRBox data-testid="loggin-tab-QR-box">
        <QrWrapper>
          <QRPlaceholder>
            {qrValue && qrStatus === "WAITING" ? (
              <QRCodeCanvas value={qrValue} size={220} includeMargin />
            ) : qrStatus === "LOADING" ? (
              <CircularProgress />
            ) : qrStatus === "APPROVED" ? (
              <Typography fontSize={18}>
                {Trans("QR.LOGIN_SUCCESS")}
              </Typography>
            ) : null}
          </QRPlaceholder>

          {qrStatus === "EXPIRED" && (
            <QrOverlay>
              <Typography fontWeight={700}>
                {Trans("QR.EXPIRED_TITLE")}
              </Typography>

              <Typography fontSize={13} color="#6B7280">
                {Trans("QR.EXPIRED_DESC")}
              </Typography>
            </QrOverlay>
          )}

          {qrStatus === "ERROR" && (
            <QrOverlay>
              <Typography fontWeight={700} color="error">
                {Trans("QR.ERROR_TITLE")}
              </Typography>

              <Typography fontSize={13} color="#6B7280">
                {error || Trans("QR.ERROR_DESC")}
              </Typography>
            </QrOverlay>
          )}
        </QrWrapper>

        {(qrStatus === "WAITING" || qrStatus === "SCANNED") && (
          <CountdownText>
            {Trans("QR.EXPIRE_AFTER")} <b>{timeLeft}s</b>
          </CountdownText>
        )}

        <HelperText>
          {Trans("QR.ONLY_FOR_LOGIN")}
        </HelperText>

        <HelperText2>
          {Trans("QR.ZALO_PC")}
        </HelperText2>

        {qrStatus === "SCANNED" && (
          <Typography fontSize={14} color="#111827">
            {Trans("QR.SCANNED_CONFIRM")}
          </Typography>
        )}

        {qrStatus === "APPROVED" && (
          <Typography fontSize={14} color="success.main" fontWeight={600}>
            {Trans("QR.LOGIN_SUCCESS")}
          </Typography>
        )}

        {(qrStatus === "EXPIRED" || qrStatus === "ERROR") && (
          <Button
            variant="contained"
            onClick={startQrLogin}
            disabled={startingRef.current}
          >
            {startingRef.current
              ? Trans("QR.CREATING")
              : Trans("QR.CREATE_NEW")}
          </Button>
        )}
      </QRBox>
    </Panel>
  );
}
