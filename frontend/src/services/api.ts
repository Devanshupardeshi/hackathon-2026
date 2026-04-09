import axios from "axios";

const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const normalized = rawBase.replace(/\/$/, "");

export const apiOrigin = normalized.replace(/\/api$/, "");

export const api = axios.create({
  baseURL: normalized.endsWith("/api") ? normalized : `${normalized}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function assetUrl(path: string | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${apiOrigin}${path}`;
}

export function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; detail?: string; hint?: string }
      | undefined;
    const base = data?.message || data?.detail || err.message || fallback;
    const hint = data?.hint?.trim();
    return hint ? `${base} ${hint}` : base;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
