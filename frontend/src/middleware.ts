import { NextRequest, NextResponse } from "next/server";

/**
 * CSRF protection middleware.
 *
 * For every state-changing request (POST, PUT, PATCH, DELETE) to /api/ routes,
 * verify that the Origin header matches the request's host. This prevents
 * cross-origin sites from submitting forged requests that piggyback on the
 * user's auth cookie.
 *
 * Defence layers:
 *  1. SameSite=Lax on the auth cookie (set in auth-server.ts) — blocks
 *     cross-origin POST cookies in most browsers.
 *  2. This Origin-header check — catches remaining edge-cases and older browsers.
 */

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function getExpectedOrigin(request: NextRequest): string {
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export function middleware(request: NextRequest) {
  // Only check state-changing methods on API routes
  if (SAFE_METHODS.has(request.method) || !request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");

  // If Origin header is missing, reject the request.
  // Legitimate fetch() and XMLHttpRequest calls always send Origin on
  // cross-origin and same-origin POST requests in modern browsers.
  if (!origin) {
    return NextResponse.json(
      { error: "Missing Origin header" },
      { status: 403 }
    );
  }

  const expected = getExpectedOrigin(request);
  if (origin !== expected) {
    return NextResponse.json(
      { error: "Invalid Origin" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
