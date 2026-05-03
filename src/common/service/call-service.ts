import { v4 as uuidv4 } from "uuid";
import { getSocket } from "../socket/socket";
import { getIceServers } from "./ice-server.service";
import {
  createPeer,
  destroyPeer,
  destroyAllPeers,
  feedSignal,
  hasPeer,
} from "./peer-manager";
import { useCallStore } from "../store/useCallStore";
import type {
  CallStateSnapshot,
  CallConversationType,
  CallType,
} from "@/src/types/call";
import type { Socket } from "socket.io-client";
import type SimplePeer from "simple-peer";

let ringtoneAudio: HTMLAudioElement | null = null;

function playRingtone(): void {
  if (typeof window === "undefined") return;
  // TODO: Add actual ringtone.mp3 file to public/sounds/
  // Temporarily disabled to avoid 404 error
  console.log("[Ringtone] Ringtone disabled - add ringtone.mp3 to public/sounds/");
  // if (!ringtoneAudio) {
  //   ringtoneAudio = new Audio("/sounds/ringtone.mp3");
  //   ringtoneAudio.loop = true;
  // }
  // ringtoneAudio.play().catch(() => {});
}

function stopRingtone(): void {
  if (ringtoneAudio) {
    ringtoneAudio.pause();
    ringtoneAudio.currentTime = 0;
  }
}

function showToast(message: string): void {
  console.log("[Call Toast]", message);
}

function showCallSummary(duration: number, reason?: string): void {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  showToast(`Cuộc gọi kết thúc · ${timeStr}${reason ? ` · ${reason}` : ""}`);
}

export async function startCall(
  conversationId: string,
  conversationType: CallConversationType,
  callType: CallType,
  participantIds: string[]
): Promise<void> {
  const socket = getSocket();
  if (!socket) return;

  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: callType === "video",
    });

    useCallStore.getState().setLocalStream(localStream);
    useCallStore.getState().setScreen("calling");

    socket.emit("call:start", {
      call_id: uuidv4(),
      conversation_id: conversationId,
      conversation_type: conversationType,
      call_type: callType,
      participant_ids: participantIds,
      started_at: Date.now(),
    });
  } catch (err) {
    console.error("[startCall] Failed to get user media:", err);
    showToast("Không thể truy cập microphone/camera");
  }
}

export async function acceptCall(): Promise<void> {
  const socket = getSocket();
  if (!socket) return;

  const { activeCall } = useCallStore.getState();
  if (!activeCall) return;

  stopRingtone();

  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: activeCall.call_type === "video",
    });

    useCallStore.getState().setLocalStream(localStream);
    useCallStore.getState().setScreen("connecting");

    socket.emit("call:accept", {
      call_id: activeCall.call_id,
      conversation_id: activeCall.conversation_id,
      accepted_at: Date.now(),
    });
  } catch (err) {
    console.error("[acceptCall] Failed to get user media:", err);
    showToast("Không thể truy cập microphone/camera");
    rejectCall("media_error");
  }
}

export function rejectCall(reason?: string): void {
  const socket = getSocket();
  if (!socket) return;

  const { activeCall } = useCallStore.getState();
  if (!activeCall) return;

  socket.emit("call:reject", {
    call_id: activeCall.call_id,
    conversation_id: activeCall.conversation_id,
    reason,
    rejected_at: Date.now(),
  });

  cleanup();
}

export function endCall(reason?: string): void {
  const socket = getSocket();
  if (!socket) return;

  const { activeCall } = useCallStore.getState();
  if (!activeCall) return;

  socket.emit("call:end", {
    call_id: activeCall.call_id,
    conversation_id: activeCall.conversation_id,
    reason,
    ended_at: Date.now(),
  });

  cleanup();
}

export function leaveCall(reason?: string): void {
  const socket = getSocket();
  if (!socket) return;

  const { activeCall } = useCallStore.getState();
  if (!activeCall) return;

  socket.emit("call:leave", {
    call_id: activeCall.call_id,
    conversation_id: activeCall.conversation_id,
    reason,
    left_at: Date.now(),
  });

  cleanup();
}

export function syncCallState(conversationId: string): void {
  const socket = getSocket();
  if (!socket) return;

  socket.emit("call:state:request", {
    conversation_id: conversationId,
    requested_at: Date.now(),
  });
}

function emitSignal(
  activeCall: CallStateSnapshot,
  targetUserId: string,
  signal: SimplePeer.SignalData
): void {
  const socket = getSocket();
  if (!socket) return;

  socket.emit("call:signal", {
    call_id: activeCall.call_id,
    conversation_id: activeCall.conversation_id,
    target_user_id: targetUserId,
    signal_type: (signal as any).type ?? "ice-candidate",
    sdp: (signal as RTCSessionDescriptionInit).sdp,
    candidate: (signal as RTCIceCandidateInit).candidate,
    sdp_mid: (signal as RTCIceCandidateInit).sdpMid ?? undefined,
    sdp_mline_index: (signal as RTCIceCandidateInit).sdpMLineIndex ?? undefined,
    sent_at: Date.now(),
  });
}

export function cleanup(): void {
  stopRingtone();
  destroyAllPeers();
  useCallStore.getState().reset();
}

export function registerCallHandlers(myUserId: string): () => void {
  const socket = getSocket();
  if (!socket) return () => {};

  const handleCallStarted = (payload: any) => {
    if (payload.initiator_id === myUserId) return;

    useCallStore.getState().setActiveCall({
      call_id: payload.call_id,
      conversation_id: payload.conversation_id,
      conversation_type: payload.conversation_type ?? "direct",
      call_type: payload.call_type,
      status: "ringing",
      initiator_id: payload.initiator_id,
      participants: Object.fromEntries(
        payload.participant_ids.map((id: string) => [
          id,
          id === payload.initiator_id ? "accepted" : "invited",
        ])
      ),
      started_at: payload.started_at,
    });

    useCallStore.getState().setScreen("incoming");
    playRingtone();
  };

  const handleCallAccepted = async (payload: any) => {
    console.log("[call:accepted] payload:", payload);
    stopRingtone();
    const { activeCall, localStream } = useCallStore.getState();
    if (!activeCall || !localStream) {
      console.log("[call:accepted] skipped - no activeCall or localStream");
      return;
    }

    useCallStore.getState().setScreen("connecting");

    const iceServers = await getIceServers();
    console.log("[call:accepted] creating peer for:", payload.user_id, "initiator: true");

    createPeer({
      userId: payload.user_id,
      initiator: true,
      localStream,
      iceServers,
      onSignal: (signal) => emitSignal(activeCall, payload.user_id, signal),
      onStream: (stream) => {
        console.log("[call:accepted] onStream received from:", payload.user_id, "stream:", stream.id);
        useCallStore.getState().setRemoteStream(payload.user_id, stream);
        useCallStore.getState().setScreen("active");
        useCallStore.getState().startDurationTimer();
      },
      onClose: () => useCallStore.getState().removeRemoteStream(payload.user_id),
    });
  };

  const handleCallSignalReceived = async (payload: any) => {
    console.log("[call:signal:received] payload:", payload);
    const { activeCall, localStream } = useCallStore.getState();
    if (!activeCall || !localStream) {
      console.log("[call:signal:received] skipped - no activeCall or localStream");
      return;
    }

    const iceServers = await getIceServers();
    console.log("[call:signal:received] hasPeer:", hasPeer(payload.sender_id), "sender:", payload.sender_id);

    if (!hasPeer(payload.sender_id)) {
      console.log("[call:signal:received] creating peer for:", payload.sender_id);
      createPeer({
        userId: payload.sender_id,
        initiator: false,
        localStream,
        iceServers,
        onSignal: (signal) => emitSignal(activeCall, payload.sender_id, signal),
        onStream: (stream) => {
          useCallStore.getState().setRemoteStream(payload.sender_id, stream);
          useCallStore.getState().setScreen("active");
          useCallStore.getState().startDurationTimer();
        },
        onClose: () =>
          useCallStore.getState().removeRemoteStream(payload.sender_id),
      });
    }

    feedSignal(payload.sender_id, {
      type: payload.signal_type,
      sdp: payload.sdp,
      candidate: payload.candidate,
      sdpMid: payload.sdp_mid,
      sdpMLineIndex: payload.sdp_mline_index,
    } as SimplePeer.SignalData);
  };

  const handleCallRejected = (payload: any) => {
    showToast("Người dùng đã từ chối cuộc gọi");
  };

  const handleCallLeft = (payload: any) => {
    destroyPeer(payload.user_id);
    useCallStore.getState().removeRemoteStream(payload.user_id);
    showToast("Người dùng đã rời cuộc gọi");
  };

  const handleCallEnded = (payload: any) => {
    const { activeCall } = useCallStore.getState();
    const duration = activeCall
      ? payload.ended_at - activeCall.started_at
      : 0;

    cleanup();
    useCallStore.getState().setScreen("ended");
    showCallSummary(duration, payload.reason);

    setTimeout(() => useCallStore.getState().setScreen("idle"), 3000);
  };

  const handleCallStateUpdated = (payload: any) => {
    if (!payload.state) {
      if (useCallStore.getState().screen !== "idle") cleanup();
      return;
    }

    useCallStore.getState().setActiveCall(payload.state);

    if (
      payload.state.status === "ringing" &&
      useCallStore.getState().screen === "idle" &&
      payload.state.participants[myUserId] === "invited"
    ) {
      useCallStore.getState().setScreen("incoming");
      playRingtone();
    }
  };

  const handleWsError = (payload: any) => {
    if (payload.code === "RATE_LIMITED") {
      showToast(
        `Quá nhiều yêu cầu. Thử lại sau ${payload.details?.retry_after ?? 30}s`
      );
    }
    if (payload.code === "FORBIDDEN") {
      showToast("Không có quyền truy cập");
      cleanup();
    }
  };

  socket.on("call:started", handleCallStarted);
  socket.on("call:accepted", handleCallAccepted);
  socket.on("call:signal:received", handleCallSignalReceived);
  socket.on("call:rejected", handleCallRejected);
  socket.on("call:left", handleCallLeft);
  socket.on("call:ended", handleCallEnded);
  socket.on("call:state:updated", handleCallStateUpdated);
  socket.on("ws:error", handleWsError);

  return () => {
    socket.off("call:started", handleCallStarted);
    socket.off("call:accepted", handleCallAccepted);
    socket.off("call:signal:received", handleCallSignalReceived);
    socket.off("call:rejected", handleCallRejected);
    socket.off("call:left", handleCallLeft);
    socket.off("call:ended", handleCallEnded);
    socket.off("call:state:updated", handleCallStateUpdated);
    socket.off("ws:error", handleWsError);
  };
}
