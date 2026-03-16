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

const JWT_SECRET_KEY =
  process.env.NEXT_PUBLIC_JWT_SECRET || "wristnerd-admin-default-secret-change-me";
const AUTH_STORAGE_KEY = "wristnerd-auth-token";
const TOKEN_EXPIRY = "24h";

function getSecretKey(): Uint8Array {
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
    return payload as unknown as JWTPayload;
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

  // Fallback demo accounts when no env vars are set
  if (users.length === 0) {
    users.push(
      { email: "admin@wristnerd.xyz", name: "Admin", password: "admin123", role: "admin" },
      { email: "editor@wristnerd.xyz", name: "Editor", password: "editor123", role: "editor" },
      { email: "viewer@wristnerd.xyz", name: "Viewer", password: "viewer123", role: "viewer" },
    );
  }

  return users;
}

export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  const masterPassword = process.env.NEXT_PUBLIC_ADMIN_MASTER_PASSWORD;
  if (masterPassword && password === masterPassword) {
    return {
      email,
      name: "Master Admin",
      role: "admin",
    };
  }

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
