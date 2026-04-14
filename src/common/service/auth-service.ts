import http from "../api/http";
import { API } from "../api/path";
import {
  IApiResponse,
  IAuthData,
  ILoginPayload,
  IRefreshPayload,
  IRefreshResponse,
  IRegisterPayload,
} from "../interface/auth-interface";

export const authService = {
  authRegister(body: Partial<IRegisterPayload>) {
    return http.post<IApiResponse<IAuthData>>(API.API_AUTH_REGISTER, body, {
      skipAuth: true,
    });
  },

  authLogin(body: ILoginPayload) {
    return http.post<IApiResponse<IAuthData>>(API.API_AUTH_LOGIN, body, {
      skipAuth: true,
    });
  },

  authRefresh(body: IRefreshPayload) {
    return http.post<IRefreshResponse>(API.API_AUTH_REFRESH, body, {
      skipAuth: true,
    });
  },
  authResetPassword: async (payload: {
        firebaseIdToken: string;
        newPassword: string;
    }) => {
        return http.post(API.API_AUTH_RESET_PASSWORD, payload);
    },
  authLogout() {
    return http.post(API.API_AUTH_LOGOUT);
  },
};