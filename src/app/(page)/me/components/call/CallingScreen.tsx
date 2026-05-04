"use client";

import { Box, Typography, Button, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import GroupIcon from "@mui/icons-material/Group";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useCallStore } from "@/src/common/store/useCallStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { endCall } from "@/src/common/service/call-service";
import AppAvatar from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { useEffect, useRef, useMemo } from "react";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import type { ConversationDto } from "@/src/common/interface/chat-interface";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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

const GroupCallContainer = styled(Box)({
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

const GroupInfo = styled(Box)({
  textAlign: "center",
  marginBottom: 24,
});

const GroupName = styled(Typography)({
  fontSize: 20,
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
});

// Helper function to get user display name
function getUserDisplayName(userId: string, members: ConversationDto["members"]): string {
  const member = members?.find((m) => m.userId === userId);
  return member?.nickname || member?.fullName || userId.slice(0, 8);
}

// Helper function to get conversation display name
function getConversationDisplayName(conversation: ConversationDto | null, members: ConversationDto["members"], currentUserId: string): string {
  if (!conversation) return "";
  
  const isGroup = conversation.type === "group";
  if (isGroup) {
    return conversation.name ?? "";
  }
  
  const otherMember = members?.find((m) => m.userId !== currentUserId);
  return otherMember?.nickname || otherMember?.fullName || conversation.name || "";
}

export default function CallingScreen() {
  const t = useTrans();
  const activeCall = useCallStore((s) => s.activeCall);
  const localStream = useCallStore((s) => s.localStream);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get conversation and user data
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[activeCall?.conversation_id || ""] ?? null
  );
  const currentUserId = getcurrentUserId() || "";
  
  const currentConversation = useMemo(() => 
    conversationDetail ?? listConversation.find((n) => n.id === activeCall?.conversation_id),
    [conversationDetail, listConversation, activeCall?.conversation_id]
  );
  const members = useMemo(() => currentConversation?.members ?? [], [currentConversation]);

  const isVideo = activeCall?.call_type === "video";
  const isGroup = activeCall?.conversation_type === "group";
  
  // Get display name for who we're calling
  const targetName = getConversationDisplayName(currentConversation, members, currentUserId) || t("CHAT.USER");

  // Filter out current user from participants list
  const participants = useMemo(() => {
    return members?.filter(member => member.userId !== currentUserId) || [];
  }, [members, currentUserId]);

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Render group call UI
  if (isGroup) {
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
            <AvatarWrapper>
              <Ring />
              <AppAvatar name={targetName} size={200} fontSize={80} />
            </AvatarWrapper>
          </Box>
        )}

        {/* Overlay content */}
        <GroupCallContainer sx={{ position: "relative", zIndex: 2 }}>
          <GroupInfo>
            <GroupName>{targetName}</GroupName>
            <MemberCount>
              <GroupIcon sx={{ fontSize: 16 }} />
              {participants.length + 1} {t("CHAT.MEMBERS")}
            </MemberCount>
          </GroupInfo>

          <ParticipantList>
            {participants.map((participant) => (
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: "50%", 
              background: "#22c55e",
              animation: "pulse 2s infinite"
            }} />
            <Subtitle sx={{ mb: 0, background: "rgba(0,0,0,0.7)", padding: "8px 16px", borderRadius: 16 }}>
              {t("CALL.WAITING_FOR_ANSWER")}
            </Subtitle>
          </Box>

          <EndButton onClick={() => endCall("cancelled")}>
            <CallEndIcon sx={{ color: "#fff", fontSize: 32 }} />
          </EndButton>
        </GroupCallContainer>
      </Container>
    );
  }

  // Render individual call UI (updated with full screen video)
  return (
    <Container>
      {/* Full screen video background */}
      {isVideo && localStream && (
        <FullScreenVideo ref={videoRef} autoPlay muted playsInline />
      )}

      {/* Content overlay - positioned at center */}
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
          <AvatarWrapper sx={{ mb: 3 }}>
            <Ring />
            <AppAvatar name={targetName} size={200} fontSize={80} />
          </AvatarWrapper>
        ) : null}

        <Name sx={{ mb: 2 }}>{targetName}</Name>
        <Subtitle sx={{ 
          background: "rgba(0,0,0,0.7)", 
          padding: "8px 16px", 
          borderRadius: 16,
          mb: 4
        }}>
          {t("CALL.WAITING_FOR_ANSWER")}
        </Subtitle>

        <EndButton onClick={() => endCall("cancelled")}>
          <CallEndIcon sx={{ color: "#fff", fontSize: 32 }} />
        </EndButton>
      </Box>
    </Container>
  );
}
