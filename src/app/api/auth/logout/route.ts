import { removeRefreshTokenCookie } from "@/lib/auth/cookies";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.headers.set("Set-Cookie", removeRefreshTokenCookie());
  return response;
}
