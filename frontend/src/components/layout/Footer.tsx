"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-navy to-navy-dark text-white">
      {/* Top Divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold font-heading text-white tracking-tight">
                Wrist
              </span>
              <span className="text-2xl font-bold font-heading gradient-text tracking-tight">
                Nerd
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Expert watch gift guides, honest reviews, and a proprietary
              Gift-Worthiness Score to help you find the perfect watch for him.
            </p>
            <div className="mt-5 h-px w-12 bg-gold/40" />
          </div>

          {/* Gift Guides */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-gold mb-5">
              Gift Guides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/occasion/fathers-day" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Father&apos;s Day Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/christmas" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Christmas Gift Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/birthday" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Birthday Watches
                </Link>
              </li>
              <li>
                <Link href="/budget/under-200" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Best Watches Under $200
                </Link>
              </li>
              <li>
                <Link href="/budget/under-500" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Best Watches Under $500
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-gold mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/reviews" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Watch Reviews
                </Link>
              </li>
              <li>
                <Link href="/gift-finder" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Gift Finder Quiz
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Current Deals
                </Link>
              </li>
              <li>
                <Link href="/blog/watch-care-guide" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Watch Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-gold mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  About WristNerd
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-gray-300 hover:text-gold transition-colors duration-200">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Signup */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="max-w-xl">
            <h3 className="text-lg font-heading font-semibold mb-2 text-white">
              Get Gift Alerts & Deals
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Price drops, seasonal picks, and gift guides &mdash; delivered when it matters.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-7 py-3 cta-shine text-white font-semibold rounded-full text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} WristNerd. All rights reserved.
            As an Amazon Associate, WristNerd earns from qualifying purchases.
          </p>
          <div className="flex gap-6">
            <Link href="/affiliate-disclosure" className="text-xs text-gray-500 hover:text-gold transition-colors duration-200">
              Affiliate Disclosure
            </Link>
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-gold transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="text-xs text-gray-500 hover:text-gold transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
