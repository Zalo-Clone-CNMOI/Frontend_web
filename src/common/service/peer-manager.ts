import SimplePeer from "simple-peer";

const peers = new Map<string, SimplePeer.Instance>();

export function hasPeer(userId: string): boolean {
  return peers.has(userId);
}

export function createPeer(params: {
  userId: string;
  initiator: boolean;
  localStream: MediaStream;
  iceServers: RTCIceServer[];
  onSignal: (signal: SimplePeer.SignalData) => void;
  onStream: (stream: MediaStream) => void;
  onClose: () => void;
  onError?: (err: Error) => void;
}): SimplePeer.Instance {
  const peer = new SimplePeer({
    initiator: params.initiator,
    stream: params.localStream,
    config: { iceServers: params.iceServers },
    trickle: true,
  });

  peer.on("signal", (signal) => {
    console.log(`[peer:${params.userId}] signal:`, (signal as any).type);
    params.onSignal(signal);
  });
  
  peer.on("stream", (stream) => {
    console.log(`[peer:${params.userId}] stream received:`, stream.id, "tracks:", stream.getTracks().length);
    stream.getTracks().forEach((t, i) => {
      console.log(`  track[${i}]:`, t.kind, "enabled:", t.enabled, "muted:", t.muted, "readyState:", t.readyState);
      // Monitor when track becomes unmuted (ready to play)
      t.onunmute = () => {
        console.log(`[peer:${params.userId}] track[${i}] ${t.kind} unmuted - ready to play`);
      };
      t.onmute = () => {
        console.log(`[peer:${params.userId}] track[${i}] ${t.kind} muted`);
      };
    });
    params.onStream(stream);
  });
  
  peer.on("close", () => {
    console.log(`[peer:${params.userId}] closed`);
    params.onClose();
  });
  
  peer.on("error", (err) => {
    console.error(`[peer:${params.userId}] error:`, err);
    params.onError?.(err);
  });
  
  peer.on("connect", () => {
    console.log(`[peer:${params.userId}] connected`);
  });
  
  // Monitor ICE connection state
  const pc = (peer as any)._pc as RTCPeerConnection;
  if (pc) {
    pc.oniceconnectionstatechange = () => {
      console.log(`[peer:${params.userId}] ICE state:`, pc.iceConnectionState);
    };
    pc.onconnectionstatechange = () => {
      console.log(`[peer:${params.userId}] Connection state:`, pc.connectionState);
    };
  }
  
  console.log(`[peer:${params.userId}] created, initiator:`, params.initiator);

  peers.set(params.userId, peer);
  return peer;
}

export function feedSignal(userId: string, signal: SimplePeer.SignalData): void {
  const peer = peers.get(userId);
  if (peer && !peer.destroyed) {
    peer.signal(signal);
  }
}

export function destroyPeer(userId: string): void {
  const peer = peers.get(userId);
  if (peer) {
    peer.destroy();
    peers.delete(userId);
  }
}

export function destroyAllPeers(): void {
  peers.forEach((peer) => {
    if (!peer.destroyed) {
      peer.destroy();
    }
  });
  peers.clear();
}

export function getPeer(userId: string): SimplePeer.Instance | undefined {
  return peers.get(userId);
}
