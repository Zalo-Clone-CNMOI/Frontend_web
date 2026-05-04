"use client";

import { useCallStore } from "@/src/common/store/useCallStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { endCall, leaveCall } from "@/src/common/service/call-service";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { getcurrentUserId } from "@/src/common/utilities/utils";
import OneOnOneCallScreen from "./OneOnOneCallScreen";
import GroupCallScreen from "./GroupCallScreen";

export default function ActiveCallScreen() {
  const t = useTrans();
  const localStream = useCallStore((s) => s.localStream);
  const remoteStreams = useCallStore((s) => s.remoteStreams);
  const activeCall = useCallStore((s) => s.activeCall);
  const isMuted = useCallStore((s) => s.isMuted);
  const isCameraOff = useCallStore((s) => s.isCameraOff);
  const callDuration = useCallStore((s) => s.callDuration);
  const setMuted = useCallStore((s) => s.setMuted);
  const setCameraOff = useCallStore((s) => s.setCameraOff);

  // Get conversation and user data
  const listConversation = useChatStore((s) => s.listConversation);
  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[activeCall?.conversation_id || ""] ?? null
  );
  const currentUserId = getcurrentUserId() || "";
  
  const currentConversation =
    conversationDetail ?? listConversation.find((n) => n.id === activeCall?.conversation_id);

  const isGroup = activeCall?.conversation_type === "group";
  
  const handleEndCall = () => {
    if (isGroup && activeCall?.initiator_id !== currentUserId) {
      leaveCall();
    } else {
      endCall();
    }
  };

  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    setCameraOff(!isCameraOff);
  };

  // Render appropriate call screen based on conversation type
  if (isGroup) {
    return (
      <GroupCallScreen
        remoteStreams={remoteStreams}
        localStream={localStream}
        activeCall={activeCall}
        callDuration={callDuration}
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
    <OneOnOneCallScreen
      remoteStreams={remoteStreams}
      localStream={localStream}
      activeCall={activeCall}
      callDuration={callDuration}
      isMuted={isMuted}
      isCameraOff={isCameraOff}
      onMuteToggle={handleMuteToggle}
      onCameraToggle={handleCameraToggle}
      onEndCall={handleEndCall}
    />
  );
}
