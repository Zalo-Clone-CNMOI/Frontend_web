import { getSocket } from "../socket/socket";
import { syncCallState } from "./call-service";
import { useCallStore } from "../store/useCallStore";

let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Handles call state synchronization after socket reconnection
 */
export function handleCallReconnect(): void {
  const socket = getSocket();
  if (!socket) return;

  // Clear any existing timeout
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  // When socket reconnects, sync call state for active conversations
  socket.on("connect", () => {
    console.log("[CallReconnect] Socket reconnected, syncing call state");
    syncCallStates();
  });

  // Handle extended disconnection during active call
  socket.on("disconnect", (reason) => {
    console.log("[CallReconnect] Disconnect reason:", reason);
    const { activeCall, screen } = useCallStore.getState();
    
    if (activeCall && (screen === "active" || screen === "connecting")) {
      console.log("[CallReconnect] Disconnected during active call, starting fallback timer");
      
      // If disconnected for more than 30s during active call, end via HTTP
      reconnectTimeout = setTimeout(() => {
        if (!socket.connected) {
          console.log("[CallReconnect] Extended disconnection, ending call via HTTP");
          endCallViaHttp(activeCall.call_id, activeCall.conversation_id);
        }
      }, 30000);
    }
  });
}

/**
 * Sync call state for all conversations with active calls
 */
function syncCallStates(): void {
  const { activeCall } = useCallStore.getState();
  
  if (activeCall) {
    console.log("[CallReconnect] Syncing call state for conversation:", activeCall.conversation_id);
    syncCallState(activeCall.conversation_id);
  }
}

/**
 * HTTP fallback to end call when socket is unavailable
 */
async function endCallViaHttp(callId: string, conversationId: string): Promise<void> {
  try {
    const { API } = await import("../api/path");
    const http = await import("../api/http");
    
    await http.default.post(API.API_CONVERSATION_CALL_END(conversationId, callId));
    console.log("[CallReconnect] Call ended via HTTP fallback");
    
    // Clean up local state
    const { cleanup } = await import("./call-service");
    cleanup();
  } catch (error) {
    console.error("[CallReconnect] Failed to end call via HTTP:", error);
  }
}

/**
 * Clean up reconnect handlers
 */
export function cleanupReconnectHandlers(): void {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
}
