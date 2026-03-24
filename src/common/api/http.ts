import { getSessionToken, isClientSide, removeSessionToken, removeSessionTokenExpiresIn } from "../utilities/utils";


export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CustomOptions = Omit<RequestInit, "method" | "body"> & {
  baseUrl?: string;
  body?: any;
  skipAuth?: boolean;
};

export interface IHttpresponse<T = any> {
  statusCode: number;
  payload: T;
  ok: boolean;
}

/** Chuẩn hoá baseUrl + path để tránh double slash */
const joinUrl = (baseUrl: string, path: string) => {
  const b = baseUrl.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
};

/**
 * Nếu baseUrl đã có /api mà path cũng có /api => bỏ bớt 1 cái
 * - baseUrl: http://localhost:3000/api + path: /api/auth/register -> /auth/register
 */
const normalizeApiPath = (baseUrl: string, path: string) => {
  const baseHasApi = /\/api\/?$/.test(baseUrl);
  const pathHasApi = /^\/?api(\/|$)/.test(path);

  if (baseHasApi && pathHasApi) {
    const trimmed = path.replace(/^\/?api/, "");
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
  return path.startsWith("/") ? path : `/${path}`;
};

const buildBodyAndHeaders = (options?: CustomOptions) => {
  let body: BodyInit | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body !== undefined) {
    body = JSON.stringify(options.body);
  }

  const headers: Record<string, string> =
    body instanceof FormData ? {} : { "Content-Type": "application/json" };

  if (isClientSide() && !options?.skipAuth) {
    const token = getSessionToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  ; return { body, headers };
};

export const request = async <T = any>(
  method: HttpMethod,
  url: string,
  options?: CustomOptions
): Promise<IHttpresponse<T>> => {
  const baseUrl = options?.baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      statusCode: 500,
      ok: false,
      payload: { message: "Missing process.env.apiEndPoint" } as any,
    };
  }

  const apiPath = normalizeApiPath(baseUrl, url);
  const fullUrl = joinUrl(baseUrl, apiPath);

  const { body, headers } = buildBodyAndHeaders(options);

  try {
    const res = await fetch(fullUrl, {
      ...options,
      method,
      headers: { ...headers, ...(options?.headers || {}) },
      body,
    });

    // đọc payload an toàn (204 / text)
    const contentType = res.headers.get("content-type") || "";
    let payload: any = null;

    if (contentType.includes("application/json")) {
      payload = await res.json();
    } else {
      const text = await res.text();
      payload = text ? text : null;
    }

    if (res.ok) {
      return { statusCode: res.status, ok: true, payload: payload as T };
    }

    // 401: xoá token
    if (res.status === 401) {
      removeSessionToken();
      removeSessionTokenExpiresIn();
    }

    return { statusCode: res.status, ok: false, payload: payload as T };
  } catch (err: any) {
    console.error("HTTP error:", err);
    return {
      statusCode: 500,
      ok: false,
      payload: { message: err?.message ?? "Network error" } as any,
    };
  }
};

const http = {
  get<T>(url: string, options?: Omit<CustomOptions, "body">) {
    return request<T>("GET", url, options);
  },
  post<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
    return request<T>("POST", url, { ...options, body });
  },
  put<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
    return request<T>("PUT", url, { ...options, body });
  },
  delete<T>(url: string, options?: Omit<CustomOptions, "body">) {
    return request<T>("DELETE", url, options);
  },
  deleteBody<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
    return request<T>("DELETE", url, { ...options, body });
  },
};

export default http;
