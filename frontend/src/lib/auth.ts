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

const JWT_SECRET_KEY = process.env.JWT_SECRET || "wristnerd-admin-default-secret-change-me";
const TOKEN_COOKIE_NAME = "wristnerd-auth-token";
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

export function getTokenCookieName(): string {
  return TOKEN_COOKIE_NAME;
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
  const masterPassword = process.env.ADMIN_MASTER_PASSWORD;
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
