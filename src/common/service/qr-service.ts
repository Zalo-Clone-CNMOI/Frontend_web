import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse } from "../interface/auth-interface";
import { IQRGenerateData, IQRGeneratePayload } from "../interface/qr-interface";

export const qrService = {
    generate(body: IQRGeneratePayload) {
        return http.post<IApiResponse<IQRGenerateData>>(API.API_AUTH_QR_GENERATE, body)
    },
    status(sessionId: string) {
        return http.get(API.API_AUTH_QR_STATUS(sessionId));
    }
};
