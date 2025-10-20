import { getRefreshTokenFromCookies } from "@/lib/auth/cookies";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    try {
      // Check for refresh token in cookies
      const refreshToken = getRefreshTokenFromCookies(
        req.headers.get("cookie") || undefined
      );

      if (!refreshToken) {
        // No refresh token means user needs to login
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      // Verify refresh token is valid
      verifyRefreshToken(refreshToken);
      return NextResponse.next();
    } catch (err) {
      // Refresh token invalid or expired, redirect to login
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
