import SimplePeer from "simple-peer";

const peers = new Map<string, SimplePeer.Instance>();
const peerConnections = new WeakMap<SimplePeer.Instance, RTCPeerConnection>();

type PeerWithConnection = SimplePeer.Instance & {
  _pc?: RTCPeerConnection;
};

export function hasPeer(userId: string): boolean {
  const peer = peers.get(userId);
  return Boolean(peer && !peer.destroyed);
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
    console.log(
      `[peer:${params.userId}] signal:`,
      (signal as RTCSessionDescriptionInit).type
    );
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
  const pc = (peer as PeerWithConnection)._pc;
  if (pc) {
    peerConnections.set(peer, pc);
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
  if (!peer || peer.destroyed) return;

  const signalType = (signal as RTCSessionDescriptionInit).type;
  const pc = peerConnections.get(peer);
  if (signalType === "answer" && pc?.signalingState === "stable") {
    console.log(`[peer:${userId}] ignored duplicate answer in stable state`);
    return;
  }

  try {
    peer.signal(signal);
  } catch (err) {
    console.error(`[peer:${userId}] failed to apply signal:`, err);
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
