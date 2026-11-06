import "server-only";
import { SITE_ORIGIN, LEGACY_HOST } from "./site-url";

export function turnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export async function verifyTurnstile(token: unknown, action: string, requestUrl: string): Promise<boolean> {
  if (!turnstileConfigured() || typeof token !== "string" || !token.trim() || token.length > 2048) return false;
  const hostname = new URL(requestUrl).hostname;
  const hosts = [new URL(SITE_ORIGIN).hostname, LEGACY_HOST, process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL];
  if (process.env.NODE_ENV !== "production") hosts.push("localhost", "127.0.0.1");
  if (!hosts.includes(hostname)) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result?.success === true && result.hostname === hostname && result.action === action;
  } catch {
    return false;
  }
}
