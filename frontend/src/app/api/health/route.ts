import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/env";

/**
 * Health check endpoint for monitoring and load balancers.
 *
 * GET /api/health
 *
 * Returns:
 *  - 200 if the app is healthy
 *  - 503 if required env vars are missing
 */
export async function GET() {
  const envResult = validateEnv();

  const health = {
    status: envResult.valid ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: {
      valid: envResult.valid,
      missingCount: envResult.missing.length,
      warningCount: envResult.warnings.length,
    },
    version: process.env.npm_package_version ?? "unknown",
    nodeVersion: process.version,
  };

  return NextResponse.json(health, {
    status: envResult.valid ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
