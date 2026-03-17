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

const TOKEN_COOKIE_NAME = "wristnerd-auth-token";
const TOKEN_EXPIRY = "24h";

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "[AUTH] JWT_SECRET is not configured. Cannot sign or verify tokens."
    );
  }
  return new TextEncoder().encode(secret);
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

  if (users.length === 0) {
    console.warn(
      "[AUTH] No user credentials configured. Set ADMIN_EMAIL and " +
        "ADMIN_PASSWORD environment variables to enable login."
    );
  }

  return users;
}

/**
 * Validate credentials server-side using constant-time comparison
 * to prevent timing attacks.
 */
export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) return null;

  // Constant-time comparison to prevent timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(user.password);
  const b = encoder.encode(password);

  if (a.length !== b.length) return null;

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }

  if (mismatch !== 0) return null;

  return {
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecretKey());
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

export function getTokenCookieName(): string {
  return TOKEN_COOKIE_NAME;
}
