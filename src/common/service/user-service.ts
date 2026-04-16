import http from "../api/http";
import { API } from "../api/path";
import { IApiResponse, IAuthData, IUser } from "../interface/auth-interface";
import { IUpdateMyProfilePayload } from "../interface/user-interface";

export const userService = {
    userGetMe() {
        return http.get<IApiResponse<IUser>>(API.API_USERS_ME);
    },
    userUpdateProfile(body: IUpdateMyProfilePayload) {
        return http.patch<IApiResponse<IUser>>(API.API_USERS_UPDATE_ME, body);
    },

}