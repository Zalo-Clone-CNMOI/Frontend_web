"use client";

import { useMemo } from "react";
import { useCallStore } from "@/src/common/store/useCallStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { endCall } from "@/src/common/service/call-service";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import OneOnOneCallingScreen from "./OneOnOneCallingScreen";
import GroupCallingScreen from "./GroupCallingScreen";

export default function CallingScreen() {
  const t = useTrans();
  const activeCall = useCallStore((s) => s.activeCall);
  const localStream = useCallStore((s) => s.localStream);
  const isMuted = useCallStore((s) => s.isMuted);
  const isCameraOff = useCallStore((s) => s.isCameraOff);
  const setMuted = useCallStore((s) => s.setMuted);
  const setCameraOff = useCallStore((s) => s.setCameraOff);

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
  const targetName = useMemo(() => {
    if (!currentConversation) return t("CHAT.USER");
    
    if (isGroup) {
      return currentConversation.name ?? "";
    }
    
    const otherMember = members?.find((m) => m.userId !== currentUserId);
    return otherMember?.nickname || otherMember?.fullName || currentConversation.name || "";
  }, [currentConversation, isGroup, members, currentUserId, t]);

  // Filter out current user from participants list
  const participants = useMemo(() => {
    return members?.filter(member => member.userId !== currentUserId) || [];
  }, [members, currentUserId]);

  const handleEndCall = () => {
    endCall("cancelled");
  };

  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    setCameraOff(!isCameraOff);
  };

  // Render appropriate calling screen based on conversation type
  if (isGroup) {
    return (
      <GroupCallingScreen
        localStream={localStream}
        targetName={targetName}
        participants={participants}
        isVideo={isVideo}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        onMuteToggle={handleMuteToggle}
        onCameraToggle={handleCameraToggle}
        onEndCall={handleEndCall}
      />
    );
  }

  // 1-1 call
  return (
    <OneOnOneCallingScreen
      localStream={localStream}
      targetName={targetName}
      isVideo={isVideo}
      isMuted={isMuted}
      isCameraOff={isCameraOff}
      onMuteToggle={handleMuteToggle}
      onCameraToggle={handleCameraToggle}
      onEndCall={handleEndCall}
    />
  );
}
