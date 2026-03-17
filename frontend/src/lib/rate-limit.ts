/**
 * Simple in-memory rate limiter for API routes.
 *
 * Uses a sliding-window counter per IP address. Not suitable for
 * multi-instance deployments — use Redis or a similar store in that case.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

interface RateLimitOptions {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const entry = store.get(ip);

  if (!entry || now > entry.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: options.maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= options.maxRequests) {
    const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: options.maxRequests - entry.count,
    retryAfterSeconds: 0,
  };
}
