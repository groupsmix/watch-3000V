"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

type ConsentState = "pending" | "accepted" | "rejected";

const CONSENT_COOKIE_NAME = "wristnerd-cookie-consent";
const CONSENT_EXPIRY_DAYS = 365;

function getConsentState(): ConsentState {
  if (typeof document === "undefined") return "pending";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return "pending";
  const value = match.split("=")[1];
  if (value === "accepted" || value === "rejected") return value;
  return "pending";
}

function setConsentCookie(value: "accepted" | "rejected") {
  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_EXPIRY_DAYS);
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Dispatches a custom event so other components (e.g. GoogleAnalytics)
 * can listen for consent changes.
 */
function dispatchConsentEvent(accepted: boolean) {
  window.dispatchEvent(
    new CustomEvent("cookieConsent", { detail: { accepted } })
  );
}

/** Consent store for useSyncExternalStore */
let consentListeners: Array<() => void> = [];

function subscribeConsent(listener: () => void) {
  consentListeners.push(listener);
  return () => {
    consentListeners = consentListeners.filter((l) => l !== listener);
  };
}

function notifyConsentListeners() {
  consentListeners.forEach((l) => l());
}

function getConsentSnapshot(): ConsentState {
  return getConsentState();
}

function getConsentServerSnapshot(): ConsentState {
  return "pending";
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent === "pending") {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const handleAccept = useCallback(() => {
    setConsentCookie("accepted");
    setVisible(false);
    notifyConsentListeners();
    dispatchConsentEvent(true);
  }, []);

  const handleReject = useCallback(() => {
    setConsentCookie("rejected");
    setVisible(false);
    notifyConsentListeners();
    dispatchConsentEvent(false);
  }, []);

  if (consent !== "pending" || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up"
    >
      <div className="max-w-4xl mx-auto bg-navy border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h2 className="text-white font-heading font-semibold text-lg mb-2">
              We value your privacy
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We use essential cookies to make this site work. With your consent,
              we also use analytics cookies to understand how you interact with
              our content and affiliate cookies to track conversions. You can
              change your preferences at any time.{" "}
              <Link
                href="/cookie-policy"
                className="text-gold hover:text-gold/80 underline transition-colors"
              >
                Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/5 transition-all duration-300 min-h-[44px]"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-3 cta-shine text-white text-sm font-semibold rounded-xl hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-300 min-h-[44px]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for other components to check cookie consent status.
 * Uses useSyncExternalStore to subscribe to consent changes
 * without calling setState inside useEffect.
 */
export function useCookieConsent(): { accepted: boolean } {
  const consent = useSyncExternalStore(
    (listener) => {
      const handler = () => listener();
      window.addEventListener("cookieConsent", handler);
      return () => window.removeEventListener("cookieConsent", handler);
    },
    () => getConsentState() === "accepted",
    () => false,
  );

  return { accepted: consent };
}
