"use client";

import { useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)",
  position: "relative",
});

const FullScreenVideo = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "scaleX(-1)",
  zIndex: 1,
});

const AvatarWrapper = styled(Box)({
  marginBottom: 32,
  position: "relative",
});

const Ring = styled(Box)({
  position: "absolute",
  top: -12,
  left: -12,
  right: -12,
  bottom: -12,
  border: "3px solid rgba(255,255,255,0.3)",
  borderRadius: "50%",
  animation: "ring 2s ease-out infinite",
  "@keyframes ring": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(1.3)", opacity: 0 },
  },
});

const Name = styled(Typography)({
  fontSize: 24,
  fontWeight: 600,
  color: "#fff",
  marginBottom: 12,
  textAlign: "center",
});

const Subtitle = styled(Typography)({
  fontSize: 16,
  color: "rgba(255,255,255,0.8)",
  marginBottom: 48,
  textAlign: "center",
  background: "rgba(0,0,0,0.6)",
  padding: "8px 16px",
  borderRadius: 20,
  backdropFilter: "blur(10px)",
});

const ControlsBar = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  padding: "24px 0 32px",
  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
});

const ControlButton = styled(IconButton)({
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  "&:hover": { 
    background: "rgba(255,255,255,0.25)",
    transform: "scale(1.05)",
  },
});

const EndCallButton = styled(IconButton)({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": { 
    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(239, 68, 68, 0.6)",
  },
});

const StatusIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 16,
});

const StatusDot = styled(Box)({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "#22c55e",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
});

interface OneOnOneCallingScreenProps {
  localStream: MediaStream | null;
  targetName: string;
  isVideo: boolean;
  isMuted: boolean;
  isCameraOff: boolean;
  onMuteToggle: () => void;
  onCameraToggle: () => void;
  onEndCall: () => void;
}

export default function OneOnOneCallingScreen({
  localStream,
  targetName,
  isVideo,
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
}: OneOnOneCallingScreenProps) {
  const t = useTrans();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <Container>
      {/* Full screen video background */}
      {isVideo && localStream && (
        <FullScreenVideo ref={videoRef} autoPlay muted playsInline />
      )}

      {/* Content overlay */}
      <Box sx={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2,
        textAlign: "center"
      }}>
        {/* Avatar only shown when no video */}
        {!isVideo || !localStream ? (
          <AvatarWrapper>
            <Ring />
            <AppAvatar name={targetName} size={200} fontSize={80} />
          </AvatarWrapper>
        ) : null}

        <Name>{targetName}</Name>
        
        <StatusIndicator>
          <StatusDot />
          <Subtitle sx={{ mb: 0 }}>
            {t("CALL.RINGING")}
          </Subtitle>
        </StatusIndicator>

        <Subtitle sx={{ 
          background: "rgba(0,0,0,0.7)", 
          padding: "8px 16px", 
          borderRadius: 16,
          mb: 4
        }}>
          {t("CALL.WAITING_FOR_ANSWER")}
        </Subtitle>
      </Box>

      {/* Controls */}
      <ControlsBar>
        <ControlButton onClick={onMuteToggle}>
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </ControlButton>

        {isVideo && (
          <ControlButton onClick={onCameraToggle}>
            {isCameraOff ? <VideocamOffIcon /> : <VideocamIcon />}
          </ControlButton>
        )}

        <EndCallButton onClick={onEndCall}>
          <CallEndIcon sx={{ fontSize: 32 }} />
        </EndCallButton>
      </ControlsBar>
    </Container>
  );
}
