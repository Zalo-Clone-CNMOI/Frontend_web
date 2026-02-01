import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

console.log("[Socket] Initializing with URL:", socketUrl);

export const socket = io(socketUrl, {
  transports: ["websocket", "polling"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 500,
  timeout: 20000,
  path: "/socket.io/",
});

socket.on("connect", () => {
  console.log("✅ [Socket] Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ [Socket] Connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 [Socket] Disconnected:", reason);
});