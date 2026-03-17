import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, signToken, setAuthCookie } from "@/lib/auth-server";
import { checkRateLimit } from "@/lib/rate-limit";

// Allow 5 login attempts per IP per 15-minute window
const LOGIN_RATE_LIMIT = { maxRequests: 5, windowSeconds: 900 };

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, retryAfterSeconds } = checkRateLimit(ip, LOGIN_RATE_LIMIT);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = validateCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signToken(user);
    await setAuthCookie(token);

    return NextResponse.json({
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch {
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
