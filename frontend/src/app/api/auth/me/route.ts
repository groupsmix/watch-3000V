import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenCookieName } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getTokenCookieName())?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      email: payload.email,
      name: payload.name,
      role: payload.role,
    },
  });
}
