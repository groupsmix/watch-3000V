import { SignJWT, jwtVerify } from "jose";

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

const JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET_KEY && typeof window !== "undefined") {
  console.error(
    "[AUTH] NEXT_PUBLIC_JWT_SECRET is not set. Authentication will not work. " +
    "Set this environment variable before deploying."
  );
}
const AUTH_STORAGE_KEY = "wristnerd-auth-token";
const TOKEN_COOKIE_NAME = "wristnerd-auth-token";
const TOKEN_EXPIRY = "24h";

function getSecretKey(): Uint8Array {
  if (!JWT_SECRET_KEY) {
    throw new Error(
      "[AUTH] NEXT_PUBLIC_JWT_SECRET is not configured. Cannot sign or verify tokens."
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

    // Validate payload shape at runtime instead of unsafe cast
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
      iat: payload.iat as number,
      exp: payload.exp as number,
    };
  } catch {
    return null;
  }
}

/** Save token to localStorage (client-side, static-export compatible) */
export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
  }
}

/** Read token from localStorage */
export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  }
  return null;
}

/** Remove token from localStorage */
export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
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

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    users.push({
      email: adminEmail,
      name: process.env.NEXT_PUBLIC_ADMIN_NAME || "Admin",
      password: adminPassword,
      role: "admin",
    });
  }

  const editorEmail = process.env.NEXT_PUBLIC_EDITOR_EMAIL;
  const editorPassword = process.env.NEXT_PUBLIC_EDITOR_PASSWORD;
  if (editorEmail && editorPassword) {
    users.push({
      email: editorEmail,
      name: process.env.NEXT_PUBLIC_EDITOR_NAME || "Editor",
      password: editorPassword,
      role: "editor",
    });
  }

  const viewerEmail = process.env.NEXT_PUBLIC_VIEWER_EMAIL;
  const viewerPassword = process.env.NEXT_PUBLIC_VIEWER_PASSWORD;
  if (viewerEmail && viewerPassword) {
    users.push({
      email: viewerEmail,
      name: process.env.NEXT_PUBLIC_VIEWER_NAME || "Viewer",
      password: viewerPassword,
      role: "viewer",
    });
  }

  // No fallback demo accounts — env vars are required for all credentials.
  // If no users are configured, authentication is effectively disabled.
  if (users.length === 0 && typeof window !== "undefined") {
    console.warn(
      "[AUTH] No user credentials configured. Set NEXT_PUBLIC_ADMIN_EMAIL and " +
      "NEXT_PUBLIC_ADMIN_PASSWORD environment variables to enable login."
    );
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

export function getTokenCookieName(): string {
  return TOKEN_COOKIE_NAME;
}
