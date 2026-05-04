"use client";

import { useEffect, useRef } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import GroupIcon from "@mui/icons-material/Group";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import type { ConversationDto } from "@/src/common/interface/chat-interface";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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

const GroupCallContainer = styled(Box)({
  width: "100%",
  maxWidth: 500,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
});

const GroupInfo = styled(Box)({
  textAlign: "center",
  marginBottom: 32,
});

const GroupAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  marginBottom: 16,
});

const GroupName = styled(Typography)({
  fontSize: 24,
  fontWeight: 600,
  color: "#fff",
  marginBottom: 8,
});

const MemberCount = styled(Typography)({
  fontSize: 14,
  color: "rgba(255,255,255,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  marginBottom: 24,
});

const ParticipantList = styled(Box)({
  width: "100%",
  maxHeight: 300,
  overflowY: "auto",
  marginBottom: 32,
  padding: "16px 0",
});

const ParticipantItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  marginBottom: 8,
  background: "rgba(255,255,255,0.1)",
  borderRadius: 12,
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255,255,255,0.15)",
    transform: "translateX(4px)",
  },
});

const ParticipantAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  marginRight: 12,
});

const ParticipantInfo = styled(Box)({
  flex: 1,
});

const ParticipantName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: "#fff",
  lineHeight: 1.2,
});

const ParticipantStatus = styled(Typography)({
  fontSize: 12,
  color: "rgba(255,255,255,0.6)",
  marginTop: 2,
});

const CallTypeIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.2)",
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

function getUserDisplayName(userId: string, members: ConversationDto["members"]): string {
  const member = members?.find((m) => m.userId === userId);
  return member?.nickname || member?.fullName || userId.slice(0, 8);
}

interface GroupCallingScreenProps {
  localStream: MediaStream | null;
  targetName: string;
  participants: ConversationDto["members"] | undefined;
  isVideo: boolean;
  isMuted: boolean;
  isCameraOff: boolean;
  onMuteToggle: () => void;
  onCameraToggle: () => void;
  onEndCall: () => void;
}

export default function GroupCallingScreen({
  localStream,
  targetName,
  participants,
  isVideo,
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
}: GroupCallingScreenProps) {
  const t = useTrans();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <Container>
      {/* Full screen video background or avatar */}
      {isVideo && localStream ? (
        <FullScreenVideo ref={videoRef} autoPlay muted playsInline />
      ) : (
        <Box sx={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1
        }}>
          <GroupAvatar>
            <GroupIcon sx={{ color: "#fff", fontSize: 48 }} />
          </GroupAvatar>
        </Box>
      )}

      {/* Overlay content */}
      <GroupCallContainer>
        <GroupInfo>
          <GroupName>{targetName}</GroupName>
          <MemberCount>
            <GroupIcon sx={{ fontSize: 16 }} />
            {(participants?.length || 0) + 1} {t("CHAT.MEMBERS")}
          </MemberCount>
        </GroupInfo>

        <ParticipantList>
          {(participants || []).map((participant) => (
            <ParticipantItem key={participant.userId}>
              <ParticipantAvatar>
                <AppAvatar 
                  name={participant.nickname || participant.fullName || participant.userId.slice(0, 8)} 
                  size={40} 
                  fontSize={16}
                />
              </ParticipantAvatar>
              <ParticipantInfo>
                <ParticipantName>
                  {participant.nickname || participant.fullName || participant.userId.slice(0, 8)}
                </ParticipantName>
                <ParticipantStatus>
                  {t("CALL.RINGING")}
                </ParticipantStatus>
              </ParticipantInfo>
              <CallTypeIcon>
                {isVideo ? (
                  <VideocamIcon sx={{ fontSize: 16, color: "#fff" }} />
                ) : (
                  <PhoneInTalkIcon sx={{ fontSize: 16, color: "#fff" }} />
                )}
              </CallTypeIcon>
            </ParticipantItem>
          ))}
        </ParticipantList>

        <StatusIndicator>
          <StatusDot />
          <Typography sx={{ color: "#fff", fontSize: 14, background: "rgba(0,0,0,0.7)", padding: "8px 16px", borderRadius: 16 }}>
            {t("CALL.WAITING_FOR_ANSWER")}
          </Typography>
        </StatusIndicator>
      </GroupCallContainer>

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
