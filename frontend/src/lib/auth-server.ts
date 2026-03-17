import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type UserRole = "admin" | "editor" | "viewer";

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

export interface JWTPayload {
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Server-only env vars — NOT prefixed with NEXT_PUBLIC_
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_COOKIE_NAME = "wristnerd-auth-token";
const TOKEN_EXPIRY = "24h";

function getSecretKey(): Uint8Array {
  if (!JWT_SECRET_KEY) {
    throw new Error(
      "[AUTH] JWT_SECRET is not configured. Cannot sign or verify tokens."
    );
  }
  return new TextEncoder().encode(JWT_SECRET_KEY);
}

export async function signToken(user: AuthUser): Promise<string> {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecretKey());

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string" ||
      !["admin", "editor", "viewer"].includes(payload.role)
    ) {
      return null;
    }
    return {
      email: payload.email,
      name: payload.name,
      role: payload.role as UserRole,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
    };
  } catch {
    return null;
  }
}

interface StoredUser {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

function getUsers(): StoredUser[] {
  const users: StoredUser[] = [];

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    users.push({
      email: adminEmail,
      name: process.env.ADMIN_NAME || "Admin",
      password: adminPassword,
      role: "admin",
    });
  }

  const editorEmail = process.env.EDITOR_EMAIL;
  const editorPassword = process.env.EDITOR_PASSWORD;
  if (editorEmail && editorPassword) {
    users.push({
      email: editorEmail,
      name: process.env.EDITOR_NAME || "Editor",
      password: editorPassword,
      role: "editor",
    });
  }

  const viewerEmail = process.env.VIEWER_EMAIL;
  const viewerPassword = process.env.VIEWER_PASSWORD;
  if (viewerEmail && viewerPassword) {
    users.push({
      email: viewerEmail,
      name: process.env.VIEWER_NAME || "Viewer",
      password: viewerPassword,
      role: "viewer",
    });
  }

  return users;
}

export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) return null;

  return {
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    "content:read",
    "content:write",
    "content:delete",
    "affiliates:read",
    "affiliates:write",
    "analytics:read",
    "quiz:read",
    "quiz:write",
    "users:read",
    "users:write",
  ],
  editor: [
    "content:read",
    "content:write",
    "affiliates:read",
    "quiz:read",
    "quiz:write",
  ],
  viewer: [
    "content:read",
    "affiliates:read",
    "analytics:read",
    "quiz:read",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
