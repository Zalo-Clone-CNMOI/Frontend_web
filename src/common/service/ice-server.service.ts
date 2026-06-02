import { API } from "../api/path";
import http from "../api/http";

interface IceServerConfig {
  urls: string;
  username?: string;
  credential?: string;
}

interface IceServerResponse {
  username: string;
  credential: string;
  ttl: number;
  expires_at: number;
  ice_servers: IceServerConfig[];
}

let cachedIceServers: RTCIceServer[] = [];
let cacheExpiry = 0;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export async function getIceServers(): Promise<RTCIceServer[]> {
  if (Date.now() < cacheExpiry && cachedIceServers.length > 0) {
    return cachedIceServers;
  }

  try {
    const res = await http.get<IceServerResponse>(API.API_ICE_SERVERS);
    const data = res?.data;
    if (data?.ice_servers && data.ice_servers.length > 0) {
      cachedIceServers = data.ice_servers.map((s) => ({
        urls: s.urls,
        username: s.username || data.username,
        credential: s.credential || data.credential,
      }));
      cacheExpiry = Date.now() + (data.ttl || 86400) * 1000;
      return cachedIceServers;
    }
  } catch (err) {
    console.warn("[IceServerService] Failed to fetch ICE servers, using defaults", err);
  }

  return getDefaultIceServers();
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
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
  cachedIceServers = [];
  cacheExpiry = 0;
}
