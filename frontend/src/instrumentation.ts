/**
 * Next.js instrumentation hook.
 * Runs once when the server starts — validates env vars so we fail fast
 * if critical configuration is missing.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  const { assertEnv } = await import("@/lib/env");
  assertEnv();
}
