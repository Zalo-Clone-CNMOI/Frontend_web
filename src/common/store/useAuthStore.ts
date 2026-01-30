import { create } from "zustand";
import { IApiResponse, IAuthData, ITokens } from "../interface/auth-interface";
interface useAuthStorePrps {
    authData: IApiResponse<IAuthData> | null;
    setAuthData: (data: IApiResponse<IAuthData>) => void;

    loadingAuth: boolean;
    setLoadingAuth: (loading: boolean) => void;

    errorAuth: string | null;
    setErrorAuth: (error: string | null) => void;

    tokenData: ITokens | null;
    setTokenData: (r: ITokens | null) => void

}

export const useAuthStore = create<useAuthStorePrps>((set) => ({
    authData: null,
    setAuthData: (data) => set({ authData: data }),
    loadingAuth: false,
    setLoadingAuth: (loading) => set({ loadingAuth: loading }),
    errorAuth: null,
    setErrorAuth: (error) => set({ errorAuth: error }),
    tokenData: null,
    setTokenData: (data) => set({ tokenData: data }),

}))