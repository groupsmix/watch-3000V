export type UserRole = "admin" | "editor" | "viewer";

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

/**
 * Call the server-side login API.
 * Credentials are validated on the server; the JWT is stored in an HTTP-only cookie.
 */
export async function login(
  email: string,
  password: string
): Promise<{ user: AuthUser } | { error: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.error || "Login failed" };
  }

  return { user: data.user };
}

/**
 * Verify the current session by checking the HTTP-only auth cookie server-side.
 */
export async function verifySession(): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/verify", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}

/**
 * Log out by clearing the server-side auth cookie.
 */
export async function logout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Swallow network errors — the client-side session will be
    // cleared regardless so the user is still effectively logged out.
  }
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
