import { API } from "../api/path";
import http from "../api/http";

interface IceServerConfig {
  urls: string;
  username?: string;
  credential?: string;
}

interface IceServerResponse {
  ice_servers: IceServerConfig[];
  ttl: number;
}

let cachedIceServers: RTCIceServer[] = [];
let cacheExpiry = 0;

export async function getIceServers(): Promise<RTCIceServer[]> {
  // Temporarily use only default ICE servers to avoid 404 error
  // TODO: Fix backend ICE servers endpoint, then re-enable API call
  console.log("[IceServer] Using default STUN servers (API endpoint returns 404)");
  return getDefaultIceServers();
  
  // Original code (commented out until backend fixes ICE servers endpoint)
  // if (Date.now() < cacheExpiry && cachedIceServers.length > 0) {
  //   return cachedIceServers;
  // }

  // try {
  //   const res = await http.get<IceServerResponse>(API.API_ICE_SERVERS);
  //   const data = res?.payload;

  //   if (!data?.ice_servers) {
  //     return getDefaultIceServers();
  //   }

  //   cachedIceServers = data.ice_servers.map((server) => ({
  //     urls: server.urls,
  //     username: server.username,
  //     credential: server.credential,
  //   }));

  //   cacheExpiry = Date.now() + (data.ttl || 86400) * 1000;
  //   return cachedIceServers;
  // } catch (error) {
  //   console.error("[IceServer] Failed to fetch ICE servers:", error);
  //   return getDefaultIceServers();
  // }
}

function getDefaultIceServers(): RTCIceServer[] {
  return [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    // TURN servers for NAT traversal
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ];
}

export function clearIceServerCache(): void {
  cachedIceServers = [];
  cacheExpiry = 0;
}
