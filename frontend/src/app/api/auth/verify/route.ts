import { NextResponse } from "next/server";
import { getAuthCookie, verifyToken } from "@/lib/auth-server";

export async function GET() {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: { email: payload.email, name: payload.name, role: payload.role },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
