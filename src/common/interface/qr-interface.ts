export interface IQRGeneratePayload {
    socketId: string;
    deviceInfo: string;
}
export interface IQRGenerateData {
    sessionId: string;
    qrToken: string;
    expiresAt: string;
    expiresInSeconds: number;
}