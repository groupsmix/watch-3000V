"use client";

import Link from "next/link";
import { useState } from "react";

const giftGuideLinks = [
  { href: "/occasion/fathers-day", label: "Father’s Day Watches" },
  { href: "/occasion/christmas", label: "Christmas Gift Watches" },
  { href: "/occasion/birthday", label: "Birthday Watches" },
  { href: "/budget/under-200", label: "Best Watches Under $200" },
  { href: "/budget/under-500", label: "Best Watches Under $500" },
];

const resourceLinks = [
  { href: "/reviews", label: "Watch Reviews" },
  { href: "/gift-finder", label: "Gift Finder Quiz" },
  { href: "/deals", label: "Current Deals" },
  { href: "/blog", label: "The Journal" },
];

const companyLinks = [
  { href: "/about", label: "About WristNerd" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

export default function Footer() {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubmitted, setFooterSubmitted] = useState(false);

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail) return;
    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerEmail)) return;
    try {
      const stored: string[] = JSON.parse(localStorage.getItem("wristnerd-subscriptions") || "[]");
      if (!stored.includes(footerEmail)) {
        stored.push(footerEmail);
        localStorage.setItem("wristnerd-subscriptions", JSON.stringify(stored));
      }
    } catch {
      // localStorage corrupted — reset it
      localStorage.setItem("wristnerd-subscriptions", JSON.stringify([footerEmail]));
    }
    setFooterSubmitted(true);
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 lg:pr-12">
              <Link href="/" className="inline-flex items-center gap-1 group">
                <span className="text-[1.75rem] font-bold font-heading tracking-[-0.02em] text-white transition-all duration-300">
                  Wrist
                </span>
                <span className="text-[1.75rem] font-bold font-heading tracking-[-0.02em] gradient-text transition-all duration-300">
                  Nerd
                </span>
              </Link>
              <p className="mt-5 text-[0.9375rem] text-gray-400 leading-[1.7] max-w-sm">
                Expert watch gift guides, honest reviews, and a proprietary
                Gift-Worthiness Score to help you find the perfect watch for him.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-gold/40" />
                <span className="text-[0.6875rem] font-semibold text-gold/60 uppercase tracking-[0.15em]">
                  Est. 2024
                </span>
              </div>
            </div>

            {/* Gift Guides */}
            <div className="lg:col-span-3">
              <h3 className="luxury-label text-gold mb-6">Gift Guides</h3>
              <ul className="space-y-3.5">
                {giftGuideLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-gray-400 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h3 className="luxury-label text-gold mb-6">Resources</h3>
              <ul className="space-y-3.5">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-gray-400 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-3">
              <h3 className="luxury-label text-gold mb-6">Company</h3>
              <ul className="space-y-3.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-gray-400 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/[0.06] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                Get Gift Alerts &amp; Deals
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Price drops, seasonal picks, and gift guides &mdash; delivered when it matters.
              </p>
            </div>
            {footerSubmitted ? (
              <p className="text-emerald-400 font-medium text-sm py-3">
                You&apos;re in! We&apos;ll send you the best deals.
              </p>
            ) : (
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleFooterSubscribe}>
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 cta-shine text-white font-semibold rounded-xl text-sm whitespace-nowrap tracking-wide"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.75rem] text-gray-600 text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} WristNerd. All rights reserved.
            As an Amazon Associate, WristNerd earns from qualifying purchases.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/affiliate-disclosure" className="text-[0.75rem] text-gray-600 hover:text-gold transition-colors duration-300">
              Disclosure
            </Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link href="/privacy-policy" className="text-[0.75rem] text-gray-600 hover:text-gold transition-colors duration-300">
              Privacy
            </Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link href="/terms-of-use" className="text-[0.75rem] text-gray-600 hover:text-gold transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
