"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black-rich border-t border-gold/10">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold font-heading text-ivory tracking-tight">
                Wrist
              </span>
              <span className="text-2xl font-bold font-heading gradient-text tracking-tight">
                Nerd
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold ml-1 opacity-80" />
            </Link>
            <p className="mt-5 text-sm text-ivory-dim/70 leading-relaxed">
              Expert watch gift guides, honest reviews, and a proprietary
              Gift-Worthiness Score to help you find the perfect watch for him.
            </p>
            <div className="mt-6 h-px w-12 bg-gradient-to-r from-gold/40 to-transparent" />
          </div>

          {/* Gift Guides */}
          <div>
            <h3 className="label-luxury mb-6">
              Gift Guides
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/occasion/fathers-day" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Father&apos;s Day Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/christmas" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Christmas Gift Watches
                </Link>
              </li>
              <li>
                <Link href="/occasion/birthday" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Birthday Watches
                </Link>
              </li>
              <li>
                <Link href="/budget/under-200" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Best Watches Under $200
                </Link>
              </li>
              <li>
                <Link href="/budget/under-500" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Best Watches Under $500
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="label-luxury mb-6">
              Resources
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/reviews" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Watch Reviews
                </Link>
              </li>
              <li>
                <Link href="/gift-finder" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Gift Finder Quiz
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Current Deals
                </Link>
              </li>
              <li>
                <Link href="/blog/watch-care-guide" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Watch Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="label-luxury mb-6">
              Company
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/about" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  About WristNerd
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-ivory-dim/60 hover:text-gold transition-colors duration-300">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Signup */}
        <div className="mt-16 pt-12 border-t border-gold/8">
          <div className="max-w-xl">
            <h3 className="text-lg font-heading font-semibold mb-3 text-ivory">
              Get Gift Alerts & Deals
            </h3>
            <p className="text-sm text-ivory-dim/50 mb-6">
              Price drops, seasonal picks, and gift guides &mdash; delivered when it matters.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-surface border border-gold/10 text-ivory placeholder-ivory-dim/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3.5 cta-shine font-semibold rounded-full text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory-dim/30">
            &copy; {new Date().getFullYear()} WristNerd. All rights reserved.
            As an Amazon Associate, WristNerd earns from qualifying purchases.
          </p>
          <div className="flex gap-6">
            <Link href="/affiliate-disclosure" className="text-xs text-ivory-dim/30 hover:text-gold transition-colors duration-300">
              Affiliate Disclosure
            </Link>
            <Link href="/privacy-policy" className="text-xs text-ivory-dim/30 hover:text-gold transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="text-xs text-ivory-dim/30 hover:text-gold transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
