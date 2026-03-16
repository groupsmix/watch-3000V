"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold font-heading">
              Wrist<span className="text-gold">Nerd</span>
            </Link>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Expert watch gift guides, honest reviews, and a proprietary
              Gift-Worthiness Score to help you find the perfect watch for him.
            </p>
          </div>

          {/* Gift Guides */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Gift Guides
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/occasion/fathers-day" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Father&apos;s Day Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/christmas" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Christmas Gift Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/birthday" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Birthday Watches
                </Link>
              </li>
              <li>
                <Link href="/budget/under-200" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Best Watches Under $200
                </Link>
              </li>
              <li>
                <Link href="/budget/under-500" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Best Watches Under $500
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/reviews" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Watch Reviews
                </Link>
              </li>
              <li>
                <Link href="/gift-finder" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Gift Finder Quiz
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Current Deals
                </Link>
              </li>
              <li>
                <Link href="/blog/watch-care-guide" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Watch Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About WristNerd
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Signup */}
        <div className="mt-10 pt-8 border-t border-navy-light">
          <div className="max-w-xl">
            <h3 className="text-lg font-heading font-semibold mb-2">
              Get Gift Alerts & Deals
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Price drops, seasonal picks, and gift guides — delivered when it matters.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-lg bg-navy-light border border-navy-light text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-navy-light flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} WristNerd. All rights reserved.
            As an Amazon Associate, WristNerd earns from qualifying purchases.
          </p>
          <div className="flex gap-4">
            <Link href="/affiliate-disclosure" className="text-xs text-gray-400 hover:text-white transition-colors">
              Affiliate Disclosure
            </Link>
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="text-xs text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
