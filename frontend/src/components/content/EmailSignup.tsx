"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { storeSubscription, validateEmail } from "@/lib/subscription";

interface EmailSignupProps {
  variant?: "inline" | "card";
  heading?: string;
  description?: string;
  source?: string;
}

export default function EmailSignup({
  variant = "card",
  heading = "Get Gift Alerts & Price Drops",
  description = "Join 5,000+ smart gift-givers. We'll send seasonal picks, price drop alerts, and exclusive deals — never spam.",
  source = "website",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    const validation = validateEmail(email);
    if (!validation.success) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Honeypot check — if filled, silently "succeed" to fool bots
      if (honeypot) {
        setSubmitted(true);
        return;
      }

      const result = storeSubscription(email, source);
      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }
      setSubmitted(true);
      showToast("Subscribed! We'll notify you when alerts go live.", "success");
    } catch {
      setError("Something went wrong. Please try again.");
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md" noValidate>
        {submitted ? (
          <p className="text-green-600 font-medium text-sm py-2">
            You&apos;re subscribed! We&apos;ll notify you when alerts go live.
          </p>
        ) : (
          <>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 h-0 w-0 overflow-hidden"
              aria-hidden="true"
            />
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Your email address"
                required
                aria-invalid={!!error}
                aria-describedby={error ? "inline-email-error" : undefined}
                className={`flex-1 px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent min-h-[48px] ${
                  error ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-sm whitespace-nowrap disabled:opacity-60 min-h-[48px]"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </div>
            {error && (
              <p id="inline-email-error" className="text-red-500 text-xs" role="alert">{error}</p>
            )}
          </>
        )}
      </form>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark rounded-2xl p-8 md:p-12 my-10">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px]" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gold/[0.03] rounded-full translate-y-1/2 -translate-x-1/2 blur-[40px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-gold/60 to-transparent" />
          <span className="luxury-label text-gold">Newsletter</span>
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-3">
          {heading}
        </h3>
        <p className="text-sm text-gray-400 mb-8 max-w-lg leading-relaxed font-light">{description}</p>
        {submitted ? (
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed! We&apos;ll notify you when alerts go live.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg" noValidate>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 h-0 w-0 overflow-hidden"
              aria-hidden="true"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Your email address"
              required
              aria-invalid={!!error}
              aria-describedby={error ? "card-email-error" : undefined}
              className={`flex-1 px-5 py-3.5 rounded-full bg-white/[0.08] border text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all duration-300 min-h-[48px] ${
                error ? "border-red-400/60" : "border-white/[0.12]"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 cta-shine text-white font-semibold rounded-full text-sm whitespace-nowrap disabled:opacity-60 min-h-[48px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
            >
              {loading ? "Subscribing..." : "Send Me Deals"}
            </button>
          </form>
        )}
        {error && (
          <p id="card-email-error" className="text-red-400 text-xs mt-3" role="alert">{error}</p>
        )}
        <p className="text-xs text-gray-500 mt-5 font-light">
          Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </div>
  );
}
