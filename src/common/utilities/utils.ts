// src/common/utilities/utils.ts

export const TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const EXPIRES_IN_KEY = "expiresIn";
export const CURRENT_USER_ID_KEY = "currentUserId";

export const isClientSide = (): boolean => typeof window !== "undefined";

export const getSessionToken = (): string | null => {
  if (!isClientSide()) return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (!isClientSide()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getcurrentUserId = (): string | null => {
  if (!isClientSide()) return null;
  return localStorage.getItem(CURRENT_USER_ID_KEY);
};

export const setSessionToken = (token: string, currentUserId: string): void => {
  if (!isClientSide()) return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_ID_KEY, String(currentUserId));
};

export const removeSessionToken = (): void => {
  if (!isClientSide()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_ID_KEY);
};

export const getSessionTokenExpiresIn = (): string | null => {
  if (!isClientSide()) return null;
  return localStorage.getItem(EXPIRES_IN_KEY);
};

export const setSessionTokenExpiresIn = (expiresIn: number | string): void => {
  if (!isClientSide()) return;
  localStorage.setItem(EXPIRES_IN_KEY, String(expiresIn));
};

export const removeSessionTokenExpiresIn = (): void => {
  if (!isClientSide()) return;
  localStorage.removeItem(EXPIRES_IN_KEY);
};

export const setRefreshToken = (token: string): void => {
  if (!isClientSide()) return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshToken = (): void => {
  if (!isClientSide()) return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};