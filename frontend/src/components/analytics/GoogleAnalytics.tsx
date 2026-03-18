"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/CookieConsent";

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics component that respects cookie consent.
 *
 * GDPR/ePrivacy compliance: analytics scripts are only loaded
 * after the user accepts non-essential cookies via the consent banner.
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const { accepted } = useCookieConsent();

  if (!measurementId || !/^(G|UA)-[A-Za-z0-9-]+$/.test(measurementId)) return null;

  // Only load GA after user consents to non-essential cookies
  if (!accepted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
