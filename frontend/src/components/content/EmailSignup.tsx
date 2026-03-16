"use client";

import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Honeypot check — if filled by a bot, silently succeed
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ConvertKit integration (client-side)
      const ckFormId = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
      if (ckFormId) {
        const res = await fetch(
          `https://api.convertkit.com/v3/forms/${ckFormId}/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
              email,
            }),
          }
        );
        if (!res.ok) {
          setError("Subscription failed. Please try again.");
          return;
        }
        setSubmitted(true);
        return;
      }

      // No provider configured — accept silently for now
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        {submitted ? (
          <p className="text-green-600 font-medium text-sm py-2">
            You&apos;re in! Check your inbox for a welcome email.
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-sm whitespace-nowrap disabled:opacity-60"
            >
              {loading ? "..." : "Subscribe"}
            </button>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </>
        )}
      </form>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 my-8">
      <h3 className="text-xl font-heading font-semibold text-navy mb-2">
        {heading}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {submitted ? (
        <p className="text-green-600 font-medium">
          You&apos;re in! Check your inbox for a welcome email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg">
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-sm whitespace-nowrap disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Send Me Deals"}
          </button>
        </form>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
      <p className="text-xs text-gray-400 mt-3">
        Unsubscribe anytime. No spam, ever.
      </p>
    </div>
  );
}
