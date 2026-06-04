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

const PUBLIC_TURN_SERVERS: RTCIceServer[] = [
  { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
  { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
];

const FALLBACK_ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  ...PUBLIC_TURN_SERVERS,
];

let cachedIceServers: RTCIceServer[] = [];
let cacheExpiry = 0;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export async function getIceServers(): Promise<RTCIceServer[]> {
  if (Date.now() < cacheExpiry && cachedIceServers.length > 0) {
    return cachedIceServers;
  }

  try {
    const res = await http.get<IceServerResponse>(API.API_ICE_SERVERS);
    const data = res.payload;

    if (data?.ice_servers && data.ice_servers.length > 0) {
      cachedIceServers = data.ice_servers.map((s: IceServerConfig) => ({
        urls: s.urls,
        username: s.username || data.username,
        credential: s.credential || data.credential,
      }));

      if (data.ttl) {
        cacheExpiry = Date.now() + data.ttl * 1000;
      }

      return cachedIceServers;
    }
  } catch (error) {
    console.warn("[IceServer] Failed to fetch from backend, using fallback", error);
  }

  return FALLBACK_ICE_SERVERS;
}

export function clearIceServerCache(): void {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
  cachedIceServers = [];
  cacheExpiry = 0;
}
