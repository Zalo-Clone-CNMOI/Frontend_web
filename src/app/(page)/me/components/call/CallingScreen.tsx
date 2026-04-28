"use client";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useCallStore } from "@/src/common/store/useCallStore";
import { endCall } from "@/src/common/service/call-service";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { useEffect, useRef } from "react";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
});

const VideoPreview = styled("video")({
  width: 200,
  height: 200,
  borderRadius: 12,
  objectFit: "cover",
  marginBottom: 24,
  transform: "scaleX(-1)",
});

const AvatarWrapper = styled(Box)({
  marginBottom: 24,
  position: "relative",
});

const Ring = styled(Box)({
  position: "absolute",
  top: -8,
  left: -8,
  right: -8,
  bottom: -8,
  border: "2px solid rgba(255,255,255,0.3)",
  borderRadius: "50%",
  animation: "ring 2s ease-out infinite",
  "@keyframes ring": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(1.3)", opacity: 0 },
  },
});

const Name = styled(Typography)({
  fontSize: 20,
  fontWeight: 600,
  color: "#fff",
  marginBottom: 8,
});

const Subtitle = styled(Typography)({
  fontSize: 14,
  color: "rgba(255,255,255,0.6)",
  marginBottom: 48,
});

const EndButton = styled(Button)({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "#ef4444",
  minWidth: "unset",
  "&:hover": { background: "#dc2626" },
});

export default function CallingScreen() {
  const t = useTrans();
  const activeCall = useCallStore((s) => s.activeCall);
  const localStream = useCallStore((s) => s.localStream);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = activeCall?.call_type === "video";

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <Container>
      {isVideo && localStream ? (
        <VideoPreview ref={videoRef} autoPlay muted playsInline />
      ) : (
        <AvatarWrapper>
          <Ring />
          <AppAvatar size={100} fontSize={40} />
        </AvatarWrapper>
      )}

      <Name>{t("CALL.CALLING")}</Name>
      <Subtitle>{t("CALL.WAITING_FOR_ANSWER")}</Subtitle>

      <EndButton onClick={() => endCall("cancelled")}>
        <CallEndIcon sx={{ color: "#fff", fontSize: 32 }} />
      </EndButton>
    </Container>
  );
}
