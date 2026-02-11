import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  type TokenScope,
} from "@/lib/auth/tokenStorage";

type CreateClientOptions = {
  baseURL: string;
  scope: TokenScope;
  publicPaths?: string[];
  refreshEndpoint?: string;
  
  extractAccessToken?: (data: any) => string | null;
};

export function createApiClient(opts: CreateClientOptions): AxiosInstance {
  const publicSet = new Set((opts.publicPaths ?? []).map((p) => p.replace(/^\/+/, "")));

  const client = axios.create({
  baseURL: opts.baseURL,
  withCredentials: false,
  });


  client.interceptors.request.use((config) => {
    const rawUrl = String(config.url ?? "");
    const path = rawUrl.replace(/^\/+/, "");

    if (publicSet.has(path)) return config;

    const token = getAccessToken(opts.scope);
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }


    const isFormData =
  typeof FormData !== "undefined" && config.data instanceof FormData;

config.headers = config.headers ?? {};

if (isFormData) {
  delete (config.headers as any)["Content-Type"];
} else {
  if (!(config.headers as any)["Content-Type"]) {
    (config.headers as any)["Content-Type"] = "application/json";
  }
}

    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (err) => {
      const status = err?.response?.status;
      const original: AxiosRequestConfig & { _retry?: boolean } = err?.config ?? {};

      if (status !== 401) return Promise.reject(err);

      if (!original._retry && opts.refreshEndpoint) {
        const refreshToken = getRefreshToken(opts.scope);
        if (refreshToken) {
          original._retry = true;
          try {
            const refreshRes = await axios.post(
              joinUrl(opts.baseURL, opts.refreshEndpoint),
              { refresh: refreshToken },
              { headers: { "Content-Type": "application/json" } }
            );

            const access =
              opts.extractAccessToken?.(refreshRes.data) ??
              (typeof refreshRes.data?.access === "string" ? refreshRes.data.access : null);

            if (access) {
              setTokens(access, undefined, opts.scope);
              return client(original);
            }
          } catch (refreshErr: any) {
          }
        }
      }

      clearTokens(opts.scope);
      emitUnauthorized(opts.scope);

      return Promise.reject(err);
    }
  );

  return client;
}

function joinUrl(base: string, path: string): string {
  const b = String(base).replace(/\/+$/, "");
  const p = String(path).replace(/^\/+/, "");
  return `${b}/${p}`;
}


function emitUnauthorized(scope: TokenScope) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("auth:unauthorized", { detail: { scope } }));
  } catch {
    // ignore
  }
}
