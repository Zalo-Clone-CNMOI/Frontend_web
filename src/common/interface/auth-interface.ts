export type Gender = "male" | "female" | "other";

export interface IBase {
    email: string;
    fullName: string;
    gender: Gender | string;
    dateOfBirth: string | null;
}

export interface IUser extends IBase {
    id: string;
    phone: string;
    avatarUrl: string | null;
    bio: string | null;
    status: "active" | "inactive" | "blocked";
    createdAt: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface IRegisterPayload extends IBase {
    firebaseIdToken: string;
    password: string;
}

export interface ILoginPayload {
    phone: string;
    password: string;
}

export interface IAuthData {
    user: IUser;
    tokens: ITokens;
}

// common/interface/api-response.ts
export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    timestamp?: string;
}

