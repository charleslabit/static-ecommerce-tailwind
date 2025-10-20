import {
  getRefreshTokenFromCookies,
  setRefreshTokenCookie,
} from "@/lib/auth/cookies";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";
import { MOCK_USERS } from "@/lib/auth/simple";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookies
    const refreshToken = getRefreshTokenFromCookies(
      request.headers.get("cookie") || undefined
    );
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Get user from mock data
    const user = MOCK_USERS.find((u) => u.id === payload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate new tokens
    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });

    // Set new refresh token cookie
    response.headers.set("Set-Cookie", setRefreshTokenCookie(newRefreshToken));

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}
