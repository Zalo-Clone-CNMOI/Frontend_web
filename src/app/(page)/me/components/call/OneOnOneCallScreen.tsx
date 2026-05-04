"use client";

import { useEffect, useRef, useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SettingsIcon from "@mui/icons-material/Settings";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import { useChatStore } from "@/src/common/store/useChatStore";
import type { ConversationDto } from "@/src/common/interface/chat-interface";
import type { CallStateSnapshot } from "@/src/types/call";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)",
  position: "relative",
  overflow: "hidden",
});

const MainVideoArea = styled(Box)({
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 0,
});

const RemoteVideoStyled = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
});

const LocalVideo = styled("video")({
  position: "absolute",
  bottom: 120,
  right: 24,
  width: 160,
  height: 120,
  borderRadius: 12,
  objectFit: "cover",
  zIndex: 1000,
  border: "3px solid rgba(255,255,255,0.2)",
  transform: "scaleX(-1)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scaleX(-1) scale(1.05)",
    border: "3px solid rgba(255,255,255,0.4)",
  },
});

const AvatarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  padding: 48,
  textAlign: "center",
});

const UserInfo = styled(Box)({
  position: "absolute",
  top: 24,
  left: 24,
  right: 24,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const UserName = styled(Typography)({
  color: "#fff",
  fontSize: 20,
  fontWeight: 600,
  background: "rgba(0,0,0,0.6)",
  padding: "8px 16px",
  borderRadius: 24,
  backdropFilter: "blur(10px)",
});

const CallTimer = styled(Typography)({
  color: "#fff",
  fontSize: 16,
  fontWeight: 500,
  background: "rgba(0,0,0,0.6)",
  padding: "6px 12px",
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
  "&:active": {
    transform: "scale(0.95)",
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
  "&:active": {
    transform: "scale(0.95)",
  },
});

const StatusIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#fff",
  fontSize: 14,
  background: "rgba(0,0,0,0.6)",
  padding: "6px 12px",
  borderRadius: 16,
  backdropFilter: "blur(10px)",
});

const StatusDot = styled(Box)<{ online: boolean }>(({ online }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: online ? "#22c55e" : "#ef4444",
  animation: online ? "pulse 2s infinite" : "none",
  "@keyframes pulse": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
}));

function playElement(
  element: HTMLMediaElement | null,
  label: string
): void {
  if (!element) return;

  const playPromise = element.play();
  if (playPromise) {
    playPromise.catch((err) => {
      const message = err instanceof Error ? err.message : String(err);
      const isExpectedInterruption =
        err instanceof DOMException &&
        err.name === "AbortError" &&
        (message.includes("pause") || message.includes("new load request"));

      if (isExpectedInterruption) return;

      console.warn(`[OneOnOneCallScreen] ${label} play blocked:`, message);
    });
  }
}

function RemoteAudio({
  stream,
  userId,
}: {
  stream: MediaStream;
  userId: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAudio = stream.getAudioTracks().length > 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.srcObject = stream;
    audio.muted = false;
    audio.volume = 1;
    playElement(audio, `remote audio ${userId}`);

    const handleCanPlay = () => playElement(audio, `remote audio ${userId}`);
    const handleTrackUnmute = () => playElement(audio, `remote audio ${userId}`);
    const audioTracks = stream.getAudioTracks();

    audio.addEventListener("loadedmetadata", handleCanPlay);
    audio.addEventListener("canplay", handleCanPlay);
    audioTracks.forEach((track) => {
      track.addEventListener("unmute", handleTrackUnmute);
      if (!track.muted) {
        handleTrackUnmute();
      }
    });

    return () => {
      audio.removeEventListener("loadedmetadata", handleCanPlay);
      audio.removeEventListener("canplay", handleCanPlay);
      audioTracks.forEach((track) => {
        track.removeEventListener("unmute", handleTrackUnmute);
      });
      audio.pause();
      audio.srcObject = null;
    };
  }, [stream, userId]);

  if (!hasAudio) return null;

  return <audio ref={audioRef} autoPlay playsInline />;
}


function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function getUserDisplayName(userId: string, members: ConversationDto["members"]): string {
  const member = members?.find((m) => m.userId === userId);
  return member?.nickname || member?.fullName || userId.slice(0, 8);
}

function getConversationDisplayName(conversation: ConversationDto | null, members: ConversationDto["members"], currentUserId: string): string {
  if (!conversation) return "";
  
  const isGroup = conversation.type === "group";
  if (isGroup) {
    return conversation.name ?? "";
  }
  
  const otherMember = members?.find((m) => m.userId !== currentUserId);
  return otherMember?.nickname || otherMember?.fullName || conversation.name || "";
}

interface OneOnOneCallScreenProps {
  remoteStreams: Map<string, MediaStream>;
  localStream: MediaStream | null;
  activeCall: CallStateSnapshot | null;
  callDuration: number;
  isMuted: boolean;
  isCameraOff: boolean;
  onMuteToggle: () => void;
  onCameraToggle: () => void;
  onEndCall: () => void;
}

export default function OneOnOneCallScreen({
  remoteStreams,
  localStream,
  activeCall,
  callDuration,
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
}: OneOnOneCallScreenProps) {
  const t = useTrans();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  // Get conversation and user data
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[activeCall?.conversation_id || ""] ?? null
  );
  const currentUserId = getcurrentUserId() || "";
  
  const currentConversation =
    conversationDetail ?? listConversation.find((n) => n.id === activeCall?.conversation_id);
  const members = currentConversation?.members ?? [];

  const isVideo = activeCall?.call_type === "video";
  const remoteEntries = useMemo(() => Array.from(remoteStreams.entries()), [remoteStreams]);
  const isConnecting = remoteEntries.length === 0;

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      playElement(localVideoRef.current, "local video");
    }
  }, [localStream]);

  const remoteUserId = remoteEntries[0]?.[0];
  const remoteStream = remoteEntries[0]?.[1];
  const userName = remoteUserId ? getUserDisplayName(remoteUserId, members) : 
                   getConversationDisplayName(currentConversation, members, currentUserId);

  return (
    <Container>
      {/* User info header */}
      <UserInfo>
        <UserName>{userName}</UserName>
        <CallTimer>{formatDuration(callDuration)}</CallTimer>
      </UserInfo>

      {/* Main video area */}
      <MainVideoArea>
        {isConnecting ? (
          <AvatarContainer>
            <AppAvatar name={userName} size={200} fontSize={80} />
            <StatusIndicator>
              <StatusDot online={false} />
              {t("CALL.CONNECTING")}
            </StatusIndicator>
          </AvatarContainer>
        ) : isVideo && remoteStream ? (
          <>
            <RemoteVideoStyled
              ref={(ref: HTMLVideoElement | null) => {
                if (ref && remoteStream) {
                  ref.srcObject = remoteStream;
                  playElement(ref, `remote video ${remoteUserId}`);
                }
              }}
              autoPlay
              playsInline
              muted
            />
            <RemoteAudio stream={remoteStream} userId={remoteUserId} />
          </>
        ) : (
          <AvatarContainer>
            <AppAvatar name={userName} size={200} fontSize={80} />
            <StatusIndicator>
              <StatusDot online={true} />
              {isVideo ? t("CALL.VIDEO_DISABLED") : t("CALL.AUDIO_CALL")}
            </StatusIndicator>
          </AvatarContainer>
        )}
      </MainVideoArea>

      {/* Local video preview */}
      {isVideo && localStream && (
        <LocalVideo ref={localVideoRef} autoPlay muted playsInline />
      )}

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

        <ControlButton>
          <SettingsIcon />
        </ControlButton>

        <EndCallButton onClick={onEndCall}>
          <CallEndIcon sx={{ fontSize: 32 }} />
        </EndCallButton>
      </ControlsBar>
    </Container>
  );
}
