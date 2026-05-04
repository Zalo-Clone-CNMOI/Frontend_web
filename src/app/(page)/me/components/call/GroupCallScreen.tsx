"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { useChatStore } from "@/src/common/store/useChatStore";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import type { ConversationDto } from "@/src/common/interface/chat-interface";
import type { CallStateSnapshot } from "@/src/types/call";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  position: "relative",
});

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  background: "rgba(0,0,0,0.3)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  zIndex: 20,
});

const GroupInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const GroupAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
});

const GroupDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const GroupName = styled(Typography)({
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.2,
});

const ParticipantCount = styled(Typography)({
  color: "rgba(255,255,255,0.7)",
  fontSize: 12,
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const CallTimer = styled(Typography)({
  color: "#fff",
  fontSize: 14,
  fontWeight: 500,
  background: "rgba(255,255,255,0.15)",
  padding: "6px 12px",
  borderRadius: 16,
});

const VideoGrid = styled(Box)({
  flex: 1,
  padding: "16px",
  overflow: "auto",
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 12,
});

const VideoTile = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "16/9",
  background: "#2d2d44",
  borderRadius: 12,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  },
});

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const LocalVideo = styled("video")({
  position: "fixed",
  bottom: 120,
  right: 16,
  width: 180,
  height: 135,
  borderRadius: 12,
  objectFit: "cover",
  zIndex: 1000,
  border: "2px solid rgba(255,255,255,0.3)",
  transform: "scaleX(-1)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
});

const ParticipantAvatar = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
});

const ParticipantLabel = styled(Box)({
  position: "absolute",
  bottom: 8,
  left: 8,
  right: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ParticipantName = styled(Typography)({
  color: "#fff",
  fontSize: 12,
  fontWeight: 500,
  background: "rgba(0,0,0,0.7)",
  padding: "4px 8px",
  borderRadius: 4,
  backdropFilter: "blur(10px)",
});

const ParticipantStatus = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const StatusIcon = styled(Box)<{ muted: boolean }>(({ muted }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: muted ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  color: "#fff",
}));

const ControlsBar = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  padding: "20px 0 24px",
  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
});

const ControlButton = styled(IconButton)({
  width: 48,
  height: 48,
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
  width: 56,
  height: 56,
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

const ParticipantList = styled(Box)({
  position: "absolute",
  top: 80,
  right: 16,
  width: 280,
  maxHeight: "calc(100% - 200px)",
  background: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
  zIndex: 25,
  transition: "all 0.3s ease",
});

const ParticipantListHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.1)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
});

const ParticipantListItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  gap: 12,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  transition: "background 0.2s ease",
  "&:hover": {
    background: "rgba(255,255,255,0.05)",
  },
});

const ParticipantListAvatar = styled(Avatar)({
  width: 32,
  height: 32,
});

const ParticipantListInfo = styled(Box)({
  flex: 1,
});

const ParticipantListName = styled(Typography)({
  color: "#fff",
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1.2,
});

const ParticipantListStatus = styled(Typography)({
  color: "rgba(255,255,255,0.6)",
  fontSize: 11,
  marginTop: 2,
});

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

      console.warn(`[GroupCallScreen] ${label} play blocked:`, message);
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

interface GroupCallScreenProps {
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

export default function GroupCallScreen({
  remoteStreams,
  localStream,
  activeCall,
  callDuration,
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
}: GroupCallScreenProps) {
  const t = useTrans();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Get conversation and user data
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[activeCall?.conversation_id || ""] ?? null
  );
  const currentUserId = getcurrentUserId() || "";
  
  const currentConversation =
    conversationDetail ?? listConversation.find((n) => n.id === activeCall?.conversation_id);
  const members = useMemo(() => currentConversation?.members ?? [], [currentConversation]);

  const isVideo = activeCall?.call_type === "video";
  const remoteEntries = useMemo(() => Array.from(remoteStreams.entries()), [remoteStreams]);

  // Get all participants including those without streams
  const allParticipants = useMemo(() => {
    const participantMap = new Map();
    
    // Add members with streams
    remoteEntries.forEach(([userId, stream]) => {
      participantMap.set(userId, {
        userId,
        stream,
        hasStream: true,
        hasAudio: stream.getAudioTracks().length > 0,
        hasVideo: stream.getVideoTracks().length > 0,
      });
    });
    
    // Add members without streams
    members?.forEach((member) => {
      if (!participantMap.has(member.userId) && member.userId !== currentUserId) {
        participantMap.set(member.userId, {
          userId: member.userId,
          stream: null,
          hasStream: false,
          hasAudio: false,
          hasVideo: false,
        });
      }
    });
    
    return Array.from(participantMap.values());
  }, [remoteEntries, members, currentUserId]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      playElement(localVideoRef.current, "local video");
    }
  }, [localStream]);

  const groupName = getConversationDisplayName(currentConversation, members, currentUserId);

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // TODO: Implement screen sharing functionality
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <GroupInfo>
          <GroupAvatar>
            <GroupIcon sx={{ color: "#fff" }} />
          </GroupAvatar>
          <GroupDetails>
            <GroupName>{groupName}</GroupName>
            <ParticipantCount>
              <GroupIcon sx={{ fontSize: 14 }} />
              {allParticipants.length + 1} {t("CHAT.MEMBERS")}
            </ParticipantCount>
          </GroupDetails>
        </GroupInfo>
        
        <CallTimer>{formatDuration(callDuration)}</CallTimer>
      </Header>

      {/* Video Grid */}
      <VideoGrid>
        {allParticipants.map((participant) => (
          <VideoTile key={participant.userId}>
              <RemoteAudio stream={participant.stream} userId={participant.userId} />
              {isVideo && participant.hasVideo && participant.stream ? (
                <VideoElement
                  ref={(ref) => {
                    if (ref && participant.stream) {
                      ref.srcObject = participant.stream;
                      playElement(ref, `remote video ${participant.userId}`);
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <ParticipantAvatar>
                  <AppAvatar 
                    name={getUserDisplayName(participant.userId, members)} 
                    size={60} 
                    fontSize={24} 
                  />
                </ParticipantAvatar>
              )}
              
              <ParticipantLabel>
                <ParticipantName>
                  {getUserDisplayName(participant.userId, members)}
                </ParticipantName>
                <ParticipantStatus>
                  <StatusIcon muted={!participant.hasAudio}>
                    {participant.hasAudio ? "🎤" : "🔇"}
                  </StatusIcon>
                  {isVideo && (
                    <StatusIcon muted={!participant.hasVideo}>
                      {participant.hasVideo ? "📹" : "📵"}
                    </StatusIcon>
                  )}
                </ParticipantStatus>
              </ParticipantLabel>
            </VideoTile>
          ))}
      </VideoGrid>

      {/* Local video preview */}
      {isVideo && localStream && (
        <LocalVideo ref={localVideoRef} autoPlay muted playsInline />
      )}

      {/* Participant List */}
      {showParticipantList && (
        <ParticipantList>
          <ParticipantListHeader>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {t("CHAT.PARTICIPANTS")} ({allParticipants.length + 1})
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setShowParticipantList(false)}
              sx={{ color: "#fff" }}
            >
              ✕
            </IconButton>
          </ParticipantListHeader>
          
          {/* Current user */}
          <ParticipantListItem>
            <ParticipantListAvatar>
              <AppAvatar 
                name={getUserDisplayName(currentUserId, members)} 
                size={32} 
                fontSize={14} 
              />
            </ParticipantListAvatar>
            <ParticipantListInfo>
              <ParticipantListName>You</ParticipantListName>
              <ParticipantListStatus>
                {isMuted ? "Mic off" : "Speaking"} • {isCameraOff ? "Camera off" : "Camera on"}
              </ParticipantListStatus>
            </ParticipantListInfo>
          </ParticipantListItem>
          
          {/* Other participants */}
          {allParticipants.map((participant) => (
            <ParticipantListItem key={participant.userId}>
              <ParticipantListAvatar>
                <AppAvatar 
                  name={getUserDisplayName(participant.userId, members)} 
                  size={32} 
                  fontSize={14} 
                />
              </ParticipantListAvatar>
              <ParticipantListInfo>
                <ParticipantListName>
                  {getUserDisplayName(participant.userId, members)}
                </ParticipantListName>
                <ParticipantListStatus>
                  {participant.hasStream ? "Connected" : "Connecting..."} • 
                  {participant.hasAudio ? " Speaking" : " Muted"}
                </ParticipantListStatus>
              </ParticipantListInfo>
            </ParticipantListItem>
          ))}
        </ParticipantList>
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

        <ControlButton onClick={handleScreenShare}>
          {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </ControlButton>

        <ControlButton onClick={() => setShowParticipantList(!showParticipantList)}>
          <GroupIcon />
        </ControlButton>

        <ControlButton>
          <PersonAddIcon />
        </ControlButton>

        <ControlButton>
          <SettingsIcon />
        </ControlButton>

        <EndCallButton onClick={onEndCall}>
          <CallEndIcon sx={{ fontSize: 28 }} />
        </EndCallButton>
      </ControlsBar>
    </Container>
  );
}
