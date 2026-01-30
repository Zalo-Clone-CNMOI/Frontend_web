import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse, IAuthData, ILoginPayload, IRegisterPayload } from "../interface/auth-interface";

export const authService = {
  authRegister(body: Partial<IRegisterPayload>) {
    return http.post<IApiResponse<IAuthData>>(API.API_AUTH_REGISTER, body);
  },

  authLogin(body: ILoginPayload) {
    return http.post<IApiResponse<IAuthData>>(API.API_AUTH_LOGIN, body);
  },
};
