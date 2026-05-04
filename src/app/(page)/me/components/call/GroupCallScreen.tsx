"use client";

import DynamicGroupCallLayout from "./DynamicGroupCallLayout";
import type { CallStateSnapshot } from "@/src/types/call";

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
  return (
    <DynamicGroupCallLayout
      remoteStreams={remoteStreams}
      localStream={localStream}
      activeCall={activeCall}
      callDuration={callDuration}
      isMuted={isMuted}
      isCameraOff={isCameraOff}
      onMuteToggle={onMuteToggle}
      onCameraToggle={onCameraToggle}
      onEndCall={onEndCall}
    />
  );
}
