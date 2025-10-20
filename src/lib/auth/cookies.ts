// Simple cookie utilities
import { parse, serialize } from "cookie";

export function setRefreshTokenCookie(token: string): string {
  return serialize("jid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function removeRefreshTokenCookie(): string {
  return serialize("jid", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: -1,
  });
}

export function getRefreshTokenFromCookies(
  cookieHeader?: string
): string | null {
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  return cookies.jid || null;
}
