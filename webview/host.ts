import type { BrowserSession } from "../src";

declare global {
  interface Window {
    VoxHost?: { getSession(): string | Promise<string> };
  }
}

export async function hostSession(): Promise<BrowserSession> {
  if (window.VoxHost) {
    return JSON.parse(await window.VoxHost.getSession()) as BrowserSession;
  }
  if (import.meta.env.DEV) {
    const params = new URLSearchParams(window.location.search);
    const apiUrl = params.get("apiUrl");
    const token = params.get("token");
    if (apiUrl && token) return { apiUrl, token };
  }
  throw new Error("Vox host is unavailable");
}
