import Link from "next/link";

/**
 * FTC-compliant affiliate disclosure mini-banner.
 *
 * Place this near the top of any page that contains affiliate links
 * (reviews, budget pages, brand spotlights, comparisons, occasion pages, etc.).
 *
 * Per FTC guidelines, the disclosure should be "clear and conspicuous"
 * and placed near the affiliate content, not only in the footer.
 */
export default function AffiliateDisclosureBanner() {
  return (
    <div className="bg-gold/[0.08] border border-gold/20 rounded-xl px-4 py-3 mb-8">
      <p className="text-xs text-gray-600 leading-relaxed">
        <span className="font-semibold text-navy">Affiliate Disclosure:</span>{" "}
        WristNerd earns a commission from qualifying purchases made through
        links on this page at no extra cost to you. This does not influence our
        rankings or recommendations.{" "}
        <Link
          href="/affiliate-disclosure"
          className="text-gold hover:text-gold/80 underline transition-colors"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
