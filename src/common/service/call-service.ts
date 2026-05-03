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
import { getcurrentUserId } from "../utilities/utils";
import type {
  CallStateSnapshot,
  CallConversationType,
  CallSignalPayload,
  CallType,
  CallStatus,
  CallParticipantStatus,
} from "@/src/types/call";
import type SimplePeer from "simple-peer";
import { handleCallReconnect } from "./call-reconnect.service";

const ringtoneAudio: HTMLAudioElement | null = null;

interface CallStartedPayload {
  call_id: string;
  conversation_id: string;
  conversation_type?: CallConversationType;
  call_type: CallType;
  initiator_id: string;
  participant_ids: string[];
  started_at: number;
}

interface CallAcceptedPayload {
  call_id: string;
  conversation_id: string;
  user_id: string;
  accepted_at: number;
  participants: Record<string, CallParticipantStatus>;
  status: CallStatus;
  state_version: number;
}

interface CallLeftPayload {
  call_id: string;
  conversation_id: string;
  user_id: string;
  reason: string;
  left_at: number;
}

interface CallEndedPayload {
  call_id: string;
  conversation_id: string;
  user_id: string;
  reason: string;
  ended_at: number;
}

interface CallRejectedPayload {
  call_id: string;
  conversation_id: string;
  user_id: string;
  reason: string;
  rejected_at: number;
}

interface CallStateUpdatedPayload {
  conversation_id: string;
  state: CallStateSnapshot | null;
  requested_by?: string;
  updated_at: number;
  reason?: string;
  details: Record<string, unknown>;
}

interface WsErrorPayload {
  code?: string;
  details?: {
    retry_after?: number;
  };
}

type SimplePeerCandidateSignal = SimplePeer.SignalData & {
  type?: "candidate";
  candidate?: RTCIceCandidateInit | string;
};

function toBackendCandidate(signal: SimplePeer.SignalData): {
  candidate?: string;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null;
} {
  const candidateSignal = signal as SimplePeerCandidateSignal;
  const rawCandidate = candidateSignal.candidate;

  if (!rawCandidate) return {};

  const candidateInit: RTCIceCandidateInit =
    typeof rawCandidate === "string"
      ? { candidate: rawCandidate }
      : rawCandidate;

  return {
    candidate: JSON.stringify(candidateInit),
    sdpMid: candidateInit.sdpMid,
    sdpMLineIndex: candidateInit.sdpMLineIndex,
  };
}

function fromBackendCandidate(payload: CallSignalPayload): SimplePeer.SignalData | null {
  if (!payload.candidate) return null;

  try {
    const candidateText = payload.candidate.trim();
    const parsedCandidate = candidateText.startsWith("{")
      ? (JSON.parse(candidateText) as RTCIceCandidateInit)
      : ({
          candidate: candidateText,
          sdpMid: payload.sdp_mid,
          sdpMLineIndex: payload.sdp_mline_index,
        } satisfies RTCIceCandidateInit);

    return {
      type: "candidate",
      candidate: parsedCandidate,
    } as SimplePeer.SignalData;
  } catch (error) {
    console.error("[call:signal:received] Failed to parse ICE candidate:", error);
    return null;
  }
}

function playRingtone(): void {
  if (typeof window === "undefined") return;
  // TODO: Add actual ringtone.mp3 file to public/sounds/
  // Temporarily disabled to avoid 404 error
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
  // TODO: Implement proper toast notification
}

function showCallSummary(duration: number, reason?: string): void {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  showToast(`Cuộc gọi kết thúc · ${timeStr}${reason ? ` · ${reason}` : ""}`);
}

let isCleaningUp = false;
let pendingCleanup: (() => void) | null = null;

export async function startCall(
  conversationId: string,
  conversationType: CallConversationType,
  callType: CallType,
  participantIds: string[]
): Promise<void> {
  const socket = getSocket();
  if (!socket) return;

  // Wait for any ongoing cleanup to complete
  if (isCleaningUp) {
    showToast("Vui lòng đợi giây lát...");
    return;
  }

  try {
    const callId = uuidv4();
    const currentUserId = getcurrentUserId() || "";
    
    // Add small delay to ensure previous cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: callType === "video",
    });

    useCallStore.getState().setActiveCall({
      call_id: callId,
      conversation_id: conversationId,
      conversation_type: conversationType,
      call_type: callType,
      status: "ringing",
      initiator_id: currentUserId,
      participants: Object.fromEntries(
        [
          ...(currentUserId
            ? [[currentUserId, "accepted" as CallParticipantStatus]]
            : []),
          ...participantIds.map(
            (id) => [id, "invited" as CallParticipantStatus] as const
          ),
        ]
      ),
      started_at: Date.now(),
    });
    useCallStore.getState().setLocalStream(localStream);
    useCallStore.getState().setScreen("calling");

    socket.emit("call:start", {
      call_id: callId,
      conversation_id: conversationId,
      conversation_type: conversationType,
      call_type: callType,
      participant_ids: participantIds,
      started_at: Date.now(),
    });
  } catch (err) {
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

  const signalPayload = signal as Partial<
    RTCSessionDescriptionInit & RTCIceCandidateInit
  >;
  const candidatePayload = toBackendCandidate(signal);

  let signalType: "offer" | "answer" | "ice-candidate" | "renegotiate";
  
  if (signalPayload.type === "offer" || signalPayload.type === "answer") {
    signalType = signalPayload.type;
  } else {
    signalType = "ice-candidate";
  }

  socket.emit("call:signal", {
    call_id: activeCall.call_id,
    conversation_id: activeCall.conversation_id,
    target_user_id: targetUserId,
    signal_type: signalType,
    sdp: signalPayload.sdp,
    candidate: candidatePayload.candidate,
    sdp_mid: candidatePayload.sdpMid ?? signalPayload.sdpMid ?? undefined,
    sdp_mline_index:
      candidatePayload.sdpMLineIndex ?? signalPayload.sdpMLineIndex ?? undefined,
    sent_at: Date.now(),
  });
}

export function cleanup(): void {
  isCleaningUp = true;
  
  // Perform cleanup asynchronously to avoid blocking
  setTimeout(() => {
    stopRingtone();
    destroyAllPeers();
    useCallStore.getState().reset();
    isCleaningUp = false;
    
    // Execute any pending cleanup
    if (pendingCleanup) {
      const fn = pendingCleanup;
      pendingCleanup = null;
      fn();
    }
  }, 50);
}

export function registerCallHandlers(myUserId: string): () => void {
  const socket = getSocket();
  if (!socket) return () => {};

  // Register reconnect handling
  handleCallReconnect();

  const handleCallStarted = (payload: CallStartedPayload) => {
    if (payload.initiator_id === myUserId) return;

    useCallStore.getState().setActiveCall({
      call_id: payload.call_id,
      conversation_id: payload.conversation_id,
      conversation_type: payload.conversation_type ?? "direct",
      call_type: payload.call_type,
      status: "ringing",
      initiator_id: payload.initiator_id,
      participants: Object.fromEntries(
        [
          [payload.initiator_id, "accepted" as CallParticipantStatus],
          ...payload.participant_ids.map(
            (id) =>
              [
                id,
                id === payload.initiator_id
                  ? "accepted"
                  : "invited",
              ] as const
          ),
        ]
      ),
      started_at: payload.started_at,
    });

    useCallStore.getState().setScreen("incoming");
    playRingtone();
  };

  const handleCallAccepted = async (payload: CallAcceptedPayload) => {
    stopRingtone();
    const currentCall = useCallStore.getState().activeCall;
    if (currentCall?.call_id === payload.call_id) {
      useCallStore.getState().setActiveCall({
        ...currentCall,
        status: payload.status,
        participants: payload.participants,
      });
      useCallStore.getState().setStateVersion(payload.state_version);
    }

    if (payload.user_id === myUserId) {
      return;
    }

    const { activeCall, localStream } = useCallStore.getState();
    if (!activeCall || !localStream) {
      return;
    }

    // Check if call is now ongoing
    if (payload.status === "ongoing" && payload.participants[myUserId] === "accepted") {
      useCallStore.getState().setScreen("connecting");

      const iceServers = await getIceServers();

      createPeer({
        userId: payload.user_id,
        initiator: true,
        localStream,
        iceServers,
        onSignal: (signal) => emitSignal(activeCall, payload.user_id, signal),
        onStream: (stream) => {
          useCallStore.getState().setRemoteStream(payload.user_id, stream);
          useCallStore.getState().setScreen("active");
          useCallStore.getState().startDurationTimer();
        },
        onClose: () => useCallStore.getState().removeRemoteStream(payload.user_id),
      });
    }
  };

  const handleCallSignalReceived = async (payload: CallSignalPayload) => {
    if (payload.sender_id === myUserId) {
      return;
    }
    if (payload.target_user_id && payload.target_user_id !== myUserId) {
      return;
    }

    const { activeCall, localStream, stateVersion } = useCallStore.getState();
    if (!activeCall || !localStream) {
      return;
    }
    if (payload.call_id !== activeCall.call_id) {
      return;
    }

    // Drop stale signals
    if (payload.state_version && payload.state_version < stateVersion) {
      return;
    }

    const iceServers = await getIceServers();

    if (!hasPeer(payload.sender_id)) {
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

    let signalData: SimplePeer.SignalData;

    if (payload.signal_type === "offer" || payload.signal_type === "answer") {
      signalData = {
        type: payload.signal_type,
        sdp: payload.sdp,
      };
    } else if (payload.signal_type === "ice-candidate") {
      const candidateSignal = fromBackendCandidate(payload);
      if (!candidateSignal) return;
      signalData = candidateSignal;
    } else {
      return;
    }

    feedSignal(payload.sender_id, signalData);
  };

  const handleCallRejected = (_payload: CallRejectedPayload) => {
    showToast("Người dùng đã từ chối cuộc gọi");
    cleanup();
  };

  const handleCallLeft = (payload: CallLeftPayload) => {
    destroyPeer(payload.user_id);
    useCallStore.getState().removeRemoteStream(payload.user_id);
    
    // Show appropriate message based on reason
    if (payload.reason === "removed_from_conversation") {
      showToast("Bạn đã bị loại khỏi cuộc trò chuyện");
    } else {
      showToast("Người dùng đã rời cuộc gọi");
    }
  };

  const handleCallEnded = (payload: CallEndedPayload) => {
    const { activeCall } = useCallStore.getState();
    const duration = activeCall
      ? payload.ended_at - activeCall.started_at
      : 0;

    cleanup();
    useCallStore.getState().setScreen("ended");
    
    // Show appropriate message based on reason
    let reasonMessage = "";
    switch (payload.reason) {
      case "rejected":
        reasonMessage = "Cuộc gọi bị từ chối";
        break;
      case "timed_out":
        reasonMessage = "Cuộc gọi hết thời gian chờ";
        break;
      case "all_left":
        reasonMessage = "Tất cả người tham gia đã rời đi";
        break;
      case "hangup":
        reasonMessage = "Cuộc gọi đã kết thúc";
        break;
      default:
        reasonMessage = payload.reason || "Cuộc gọi đã kết thúc";
    }
    
    showCallSummary(duration, reasonMessage);
    setTimeout(() => useCallStore.getState().setScreen("idle"), 3000);
  };

  const handleCallStateUpdated = (payload: CallStateUpdatedPayload) => {
    if (!payload.state) {
      if (useCallStore.getState().screen !== "idle") cleanup();
      return;
    }

    // Update state version
    if (payload.state.version !== undefined) {
      useCallStore.getState().setStateVersion(payload.state.version);
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

  const handleWsError = (payload: WsErrorPayload) => {
    if (payload.code === "RATE_LIMITED") {
      showToast(
        `Quá nhiều yêu cầu. Thử lại sau ${payload.details?.retry_after ?? 30}s`
      );
    }
    if (payload.code === "FORBIDDEN") {
      if (payload.details && "conversation_id" in payload.details) {
        showToast("Bạn không phải là thành viên của cuộc trò chuyện này");
      } else {
        showToast("Không có quyền truy cập");
      }
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
