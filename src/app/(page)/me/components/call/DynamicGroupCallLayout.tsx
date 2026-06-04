"use client";

import { useEffect, useRef, useMemo, useState, memo } from "react";
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
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { useChatStore } from "@/src/common/store/useChatStore";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import VideoPlayer from "./VideoPlayer";
import type { ConversationDto } from "@/src/common/interface/chat-interface";
import type { CallStateSnapshot } from "@/src/types/call";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  position: "relative",
  overflow: "hidden",
});

const Header = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  background: "rgba(0,0,0,0.3)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
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

const MemberCount = styled(Typography)({
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

// Layout Components
const SingleViewContainer = styled(Box)({
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 0,
});

const SplitViewContainer = styled(Box)({
  flex: 1,
  display: "flex",
  gap: 8,
  padding: "16px",
  minHeight: 0,
});

const SplitViewPanel = styled(Box)({
  flex: 1,
  position: "relative",
  borderRadius: 16,
  overflow: "hidden",
  background: "#2d2d44",
  border: "1px solid rgba(255,255,255,0.1)",
});

const GridViewContainer = styled(Box)({
  flex: 1,
  display: "grid",
  padding: "16px",
  gap: 12,
  minHeight: 0,
});

const GridTile = styled(Box)({
  position: "relative",
  borderRadius: 16,
  overflow: "hidden",
  background: "#2d2d44",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  },
});

const SpeakerViewContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

const MainSpeakerView = styled(Box)({
  flex: 1,
  position: "relative",
  margin: "16px",
  borderRadius: 20,
  overflow: "hidden",
  background: "#2d2d44",
  border: "2px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
});

const ThumbnailCarousel = styled(Box)({
  display: "flex",
  gap: 8,
  padding: "16px",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: 4,
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 2,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
});

const ThumbnailCard = styled(Box)<{ isCurrentUser?: boolean; isSpeaking?: boolean }>(({ isCurrentUser, isSpeaking }) => ({
  position: "relative",
  width: 120,
  height: 120,
  flexShrink: 0,
  borderRadius: 12,
  overflow: "hidden",
  background: "#2d2d44",
  border: isSpeaking ? "2px solid #22c55e" : "1px solid rgba(255,255,255,0.1)",
  boxShadow: isSpeaking ? "0 4px 12px rgba(34, 197, 94, 0.4)" : "0 2px 8px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    border: isCurrentUser ? "2px solid #667eea" : "2px solid rgba(255,255,255,0.3)",
  },
}));

const MoreParticipantsCard = styled(Box)({
  width: 120,
  height: 120,
  flexShrink: 0,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  border: "1px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
});

// Video and Avatar Components
const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
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
  zIndex: 10,
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

const StatusIcon = styled(Box)<{ muted?: boolean; cameraOff?: boolean }>(({ muted, cameraOff }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: muted || cameraOff ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  color: "#fff",
}));

const AudioVisualizer = styled(Box)({
  position: "absolute",
  top: 8,
  right: 8,
  display: "flex",
  gap: 2,
  zIndex: 10,
});

const AudioBar = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: 3,
  height: active ? 20 : 8,
  background: active ? "#22c55e" : "rgba(255,255,255,0.5)",
  borderRadius: 2,
  transition: "all 0.2s ease",
}));

const CurrentUserBadge = styled(Box)({
  position: "absolute",
  top: 8,
  left: 8,
  background: "rgba(102, 126, 234, 0.9)",
  color: "#fff",
  fontSize: 10,
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: 4,
  zIndex: 10,
});

// Controls
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

// Participant List
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

// Helper functions
function playElement(element: HTMLMediaElement | null, label: string): void {
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
    });
  }
}

function RemoteAudio({ stream, userId }: { stream: MediaStream | null | undefined; userId: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAudio = stream ? stream.getAudioTracks().length > 0 : false;
  const playAttemptsRef = useRef(0);
  const maxPlayAttempts = 3;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio || !stream) return;

    // Reset play attempts
    playAttemptsRef.current = 0;

    // Set audio properties
    audio.srcObject = stream;
    audio.muted = false;
    audio.volume = 1;

    // Improved play function with better error handling
    const playAudio = (forceRetry = false) => {
      if (!audio || playAttemptsRef.current >= maxPlayAttempts && !forceRetry) {
        return;
      }

      // Check if audio is already playing
      if (!audio.paused && audio.currentTime > 0) {
        return;
      }

      playAttemptsRef.current++;
      
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch((err) => {
          const message = err instanceof Error ? err.message : String(err);
          
          // Handle AbortError specifically - this is expected when stream changes
          if (err instanceof DOMException && err.name === 'AbortError') {
            // Don't retry AbortError immediately, wait for next event
            return;
          }
          
          // Handle NotAllowedError (user didn't allow audio)
          if (err instanceof DOMException && err.name === 'NotAllowedError') {
            return;
          }
          
          // For other errors, try retry
          
          if (playAttemptsRef.current < maxPlayAttempts) {
            setTimeout(() => playAudio(), 200 * playAttemptsRef.current);
          } else {
          }
        });
      }
    };

    // Debounced play function to prevent multiple rapid calls
    let playTimeout: NodeJS.Timeout;
    const debouncedPlay = () => {
      clearTimeout(playTimeout);
      playTimeout = setTimeout(() => playAudio(), 50);
    };

    // Set up event listeners with debouncing
    const handleCanPlay = () => {
      console.log(`[DynamicGroupCallLayout] Audio can play for ${userId}`);
      debouncedPlay();
    };
    
    const handleLoadStart = () => {
      playAttemptsRef.current = 0; // Reset attempts on new load
    };
    
    const handleLoadedData = () => {
      debouncedPlay();
    };

    const handlePlay = () => {
      playAttemptsRef.current = 0; // Reset on successful play
    };

    const handlePause = () => {
    };

    const handleEnded = () => {
    };

    const audioTracks = stream.getAudioTracks();

    // Add event listeners to audio element
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    
    // Add event listeners to audio tracks
    const trackHandlers: Array<{ track: MediaStreamTrack; unMute: () => void; mute: () => void }> = [];
    audioTracks.forEach((track, index) => {
      console.log(`[DynamicGroupCallLayout] Track ${index} state:`, track.enabled, track.readyState, track.muted);
      
      const handleTrackUnmute = () => {
        console.log(`[DynamicGroupCallLayout] Track ${index} unmuted for ${userId}`);
        debouncedPlay();
      };
      
      const handleTrackMute = () => {
        console.log(`[DynamicGroupCallLayout] Track ${index} muted for ${userId}`);
      };

      track.addEventListener("unmute", handleTrackUnmute);
      track.addEventListener("mute", handleTrackMute);
      trackHandlers.push({ track, unMute: handleTrackUnmute, mute: handleTrackMute });
      
      // Try to play if track is already enabled and not muted
      if (!track.muted && track.enabled) {
        debouncedPlay();
      }
    });

    // Initial play attempt
    debouncedPlay();

    return () => {
      // Clear timeout
      clearTimeout(playTimeout);
      
      // Remove event listeners
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      
      trackHandlers.forEach(({ track, unMute, mute }) => {
        track.removeEventListener("unmute", unMute);
        track.removeEventListener("mute", mute);
      });
      
      // Clean up audio element
      try {
        audio.pause();
        audio.srcObject = null;
      } catch (err) {
        console.warn(`[DynamicGroupCallLayout] Error cleaning up audio for ${userId}:`, err);
      }
    };
  }, [stream, userId, hasAudio]);

  if (!hasAudio) return null;

  return (
    <audio 
      ref={audioRef} 
      autoPlay 
      playsInline
      style={{ display: 'none' }}
    />
  );
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

// Layout Components
interface ParticipantCardProps {
  participant: {
    userId: string;
    stream?: MediaStream | null;
    hasStream: boolean;
    hasAudio: boolean;
    hasVideo: boolean;
  };
  members: ConversationDto["members"];
  isCurrentUser?: boolean;
  isSpeaking?: boolean;
  showAudioVisualizer?: boolean;
  size?: "small" | "medium" | "large";
}

const ParticipantCard = memo(function ParticipantCard({ 
  participant, 
  members, 
  isCurrentUser = false, 
  isSpeaking = false, 
  showAudioVisualizer = false,
  size = "medium"
}: ParticipantCardProps) {
  const t = useTrans();
  const userName = getUserDisplayName(participant.userId, members);

  return (
    <>
      <RemoteAudio stream={participant.stream} userId={participant.userId} />
      {participant.hasVideo && participant.stream ? (
        <VideoPlayer
            stream={participant.stream}
            muted={true}
            autoPlay={true}
            playsInline={true}
            playerId={`participant-${participant.userId}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onVideoLoad={() => {
              console.log(`[DynamicGroupCallLayout] Video loaded for ${participant.userId}`);
            }}
            onVideoError={(error: Error) => {
              console.error(`[DynamicGroupCallLayout] Video error for ${participant.userId}:`, error);
            }}
          />
      ) : (
        <ParticipantAvatar>
          <AppAvatar 
            name={userName} 
            size={size === "small" ? 40 : size === "large" ? 120 : 60} 
            fontSize={size === "small" ? 16 : size === "large" ? 48 : 24} 
          />
        </ParticipantAvatar>
      )}
      
      {isCurrentUser && (
        <CurrentUserBadge>{t("CHAT.YOU")}</CurrentUserBadge>
      )}
      
      {showAudioVisualizer && isSpeaking && (
        <AudioVisualizer>
          <AudioBar active />
          <AudioBar active={false} />
          <AudioBar active />
          <AudioBar active={false} />
          <AudioBar active />
        </AudioVisualizer>
      )}
      
      <ParticipantLabel>
        <ParticipantName>{userName}</ParticipantName>
        <ParticipantStatus>
          <StatusIcon muted={!participant.hasAudio} />
          {participant.hasVideo && (
            <StatusIcon cameraOff={!participant.hasVideo} />
          )}
        </ParticipantStatus>
      </ParticipantLabel>
    </>
  );
});

ParticipantCard.displayName = 'ParticipantCard';

interface DynamicGroupCallLayoutProps {
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

export default function DynamicGroupCallLayout({
  remoteStreams,
  localStream,
  activeCall,
  callDuration,
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
}: DynamicGroupCallLayoutProps) {
  const t = useTrans();
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [currentSpeakerId, setCurrentSpeakerId] = useState<string | null>(null);
  const [showLocalVideo, setShowLocalVideo] = useState(true);
  
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

  // Get only active participants (users with streams - actually joined the call)
  const allParticipants = useMemo(() => {
    return remoteEntries.map(([userId, stream]) => ({
      userId,
      stream,
      hasStream: true,
      hasAudio: stream.getAudioTracks().length > 0,
      hasVideo: stream.getVideoTracks().length > 0,
    }));
  }, [remoteEntries]);

  const totalParticipants = allParticipants.length + 1; // +1 for current user
  const groupName = currentConversation?.name ?? t("CHAT.GROUP_CALL");

  
  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  // Determine layout based on participant count
  const renderLayout = () => {
    if (totalParticipants === 1) {
      return <SingleViewLayout />;
    } else if (totalParticipants === 2) {
      return <SplitViewLayout />;
    } else if (totalParticipants <= 4) {
      return <GridLayout />;
    } else {
      return <SpeakerViewLayout />;
    }
  };

  const SingleViewLayout = () => (
    <SingleViewContainer>
      <ParticipantCard
        participant={{
          userId: currentUserId,
          stream: localStream,
          hasStream: !!localStream,
          hasAudio: !isMuted,
          hasVideo: isVideo && !isCameraOff,
        }}
        members={members}
        isCurrentUser={true}
        size="large"
      />
    </SingleViewContainer>
  );

  const SplitViewLayout = () => (
    <SplitViewContainer>
      <SplitViewPanel>
        <ParticipantCard
          participant={{
            userId: currentUserId,
            stream: localStream,
            hasStream: !!localStream,
            hasAudio: !isMuted,
            hasVideo: isVideo && !isCameraOff,
          }}
          members={members}
          isCurrentUser={true}
          size="medium"
        />
      </SplitViewPanel>
      {allParticipants.slice(0, 1).map((participant) => (
        <SplitViewPanel key={participant.userId}>
          <ParticipantCard
            participant={participant}
            members={members}
            isSpeaking={participant.userId === currentSpeakerId}
            showAudioVisualizer={true}
            size="medium"
          />
        </SplitViewPanel>
      ))}
    </SplitViewContainer>
  );

  const GridLayout = () => {
    const gridCols = totalParticipants <= 2 ? 1 : totalParticipants === 3 ? 2 : 2;
    const gridRows = totalParticipants <= 2 ? 2 : totalParticipants === 3 ? 2 : 2;
    
    return (
      <GridViewContainer
        sx={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
      >
        {/* Current user */}
        <GridTile>
          <ParticipantCard
            participant={{
              userId: currentUserId,
              stream: localStream,
              hasStream: !!localStream,
              hasAudio: !isMuted,
              hasVideo: isVideo && !isCameraOff,
            }}
            members={members}
            isCurrentUser={true}
            size="medium"
          />
        </GridTile>
        
        {/* Other participants */}
        {allParticipants.slice(0, 3).map((participant) => (
          <GridTile key={participant.userId}>
            <ParticipantCard
              participant={participant}
              members={members}
              isSpeaking={participant.userId === currentSpeakerId}
              showAudioVisualizer={true}
              size="medium"
            />
          </GridTile>
        ))}
      </GridViewContainer>
    );
  };

  const SpeakerViewLayout = () => {
    const speaker = allParticipants.find(p => p.userId === currentSpeakerId) || allParticipants[0];
    const thumbnails = allParticipants.filter(p => p.userId !== speaker?.userId);
    const maxThumbnails = 6;
    const visibleThumbnails = thumbnails.slice(0, maxThumbnails);
    const remainingCount = Math.max(0, thumbnails.length - maxThumbnails);

    return (
      <SpeakerViewContainer>
        <MainSpeakerView>
          {speaker && (
            <ParticipantCard
              participant={speaker}
              members={members}
              isSpeaking={true}
              showAudioVisualizer={true}
              size="large"
            />
          )}
        </MainSpeakerView>
        
        <ThumbnailCarousel>
          {/* Current user thumbnail */}
          <ThumbnailCard isCurrentUser={true}>
            <ParticipantCard
              participant={{
                userId: currentUserId,
                stream: localStream,
                hasStream: !!localStream,
                hasAudio: !isMuted,
                hasVideo: isVideo && !isCameraOff,
              }}
              members={members}
              isCurrentUser={true}
              size="small"
            />
          </ThumbnailCard>
          
          {/* Other participant thumbnails */}
          {visibleThumbnails.map((participant) => (
            <ThumbnailCard 
              key={participant.userId}
              isSpeaking={participant.userId === currentSpeakerId}
            >
              <ParticipantCard
                participant={participant}
                members={members}
                isSpeaking={participant.userId === currentSpeakerId}
                size="small"
              />
            </ThumbnailCard>
          ))}
          
          {/* More participants indicator */}
          {remainingCount > 0 && (
            <MoreParticipantsCard>
              <Typography sx={{ color: "#fff", fontSize: 24, fontWeight: 600 }}>
                +{remainingCount}
              </Typography>
            </MoreParticipantsCard>
          )}
        </ThumbnailCarousel>
      </SpeakerViewContainer>
    );
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
            <MemberCount>
              <GroupIcon sx={{ fontSize: 14 }} />
              {totalParticipants} in call
            </MemberCount>
          </GroupDetails>
        </GroupInfo>
        
        <CallTimer>{formatDuration(callDuration)}</CallTimer>
      </Header>

      {/* Dynamic Layout */}
      {renderLayout()}

      {/* Local video preview for video calls */}
      {isVideo && localStream && showLocalVideo && (
        <Box
          sx={{
            position: "fixed",
            bottom: 120,
            right: 16,
            width: 160,
            height: 120,
            borderRadius: 12,
            overflow: "hidden",
            zIndex: 1000,
            border: "2px solid rgba(255,255,255,0.3)",
            transform: "scaleX(-1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <video
            ref={(el) => {
              if (el && el.srcObject !== localStream) {
                el.srcObject = localStream;
                el.muted = true;
                el.autoplay = true;
                el.playsInline = true;
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)",
            }}
          />
        </Box>
      )}

      {/* Participant List */}
      {showParticipantList && (
        <ParticipantList>
          <ParticipantListHeader>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {t("CHAT.PARTICIPANTS")} ({totalParticipants})
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
              <ParticipantListName>{t("CHAT.YOU")}</ParticipantListName>
              <ParticipantListStatus>
                {isMuted ? t("CALL.MUTE") : t("CALL.UNMUTE")} • {isCameraOff ? t("CALL.TURN_OFF_CAMERA") : t("CALL.TURN_ON_CAMERA")}
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
                  {t("CHAT.IN_CALL")} • {participant.hasAudio ? t("CALL.SPEAKING") : t("CALL.MUTED")}
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

        {isVideo && (
          <ControlButton onClick={() => setShowLocalVideo(!showLocalVideo)}>
            {showLocalVideo ? <PictureInPictureIcon /> : <PictureInPictureAltIcon />}
          </ControlButton>
        )}

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
