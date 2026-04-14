export type UiStatus = "LOADING" | "WAITING" | "APPROVED" | "EXPIRED" | "ERROR";

export interface QrBindIssuedPayload {
  socketId: string;
  socketBindingToken: string;
  expiresInSeconds: number;
};

export interface QrConfirmedPayload {
  sessionId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    id?: string | null;
  };
};

export interface QrRejectedPayload {
  sessionId?: string;
  reason?: string;
};

export interface WsErrorPayload {
  code?: string;
  message?: string;
};