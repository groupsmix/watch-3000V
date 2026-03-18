/**
 * Runtime environment variable validation.
 *
 * Call `validateEnv()` at application startup (e.g. in instrumentation.ts)
 * to fail fast when required variables are missing.
 */

interface EnvVarSpec {
  name: string;
  required: boolean;
  description: string;
}

const ENV_VARS: EnvVarSpec[] = [
  // Auth (required for admin functionality)
  { name: "JWT_SECRET", required: true, description: "JWT signing secret for auth tokens" },
  { name: "ADMIN_EMAIL", required: true, description: "Admin login email" },
  { name: "ADMIN_PASSWORD", required: true, description: "Admin login password" },
  { name: "ADMIN_NAME", required: false, description: "Admin display name (default: Admin)" },

  // Editor (optional)
  { name: "EDITOR_EMAIL", required: false, description: "Editor login email" },
  { name: "EDITOR_PASSWORD", required: false, description: "Editor login password" },
  { name: "EDITOR_NAME", required: false, description: "Editor display name (default: Editor)" },

  // Viewer (optional)
  { name: "VIEWER_EMAIL", required: false, description: "Viewer login email" },
  { name: "VIEWER_PASSWORD", required: false, description: "Viewer login password" },
  { name: "VIEWER_NAME", required: false, description: "Viewer display name (default: Viewer)" },

  // Analytics (optional, client-side)
  { name: "NEXT_PUBLIC_GA_MEASUREMENT_ID", required: false, description: "Google Analytics measurement ID" },
];

export interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const spec of ENV_VARS) {
    const value = process.env[spec.name];
    if (!value || value.trim() === "") {
      if (spec.required) {
        missing.push(`${spec.name} — ${spec.description}`);
      } else {
        warnings.push(`${spec.name} is not set — ${spec.description}`);
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Validate environment variables and log results.
 * Throws in production if required vars are missing.
 */
export function assertEnv(): void {
  const result = validateEnv();

  if (result.warnings.length > 0) {
    console.warn(
      `[env] Optional environment variables not set:\n  - ${result.warnings.join("\n  - ")}`
    );
  }

  if (!result.valid) {
    const message = `[env] Missing required environment variables:\n  - ${result.missing.join("\n  - ")}`;
    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
}
