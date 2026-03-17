"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Watch } from "lucide-react";
import { validateCredentials, signToken, saveToken } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#B8934F] mb-4 shadow-lg shadow-[#C9A96E]/20">
          <Watch className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">WristNerd</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-56 mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/admin";
  // Prevent open redirect: only allow relative paths that don't start with "//"
  const redirectTo =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = validateCredentials(email, password);
      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const token = await signToken(user);
      saveToken(token);

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo / Branding */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#B8934F] mb-4 shadow-lg shadow-[#C9A96E]/20">
          <Watch className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">WristNerd</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wristnerd.xyz"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#B8934F] to-[#C9A96E] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A96E]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6">
        Protected area. Authorized access only.
      </p>
    </div>
  );
}
