import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, signToken, setAuthCookie } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
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
