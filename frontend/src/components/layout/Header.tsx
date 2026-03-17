"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

const occasionLinks = [
  { href: "/occasion/fathers-day", label: "Father\u2019s Day", desc: "Timeless gifts for Dad" },
  { href: "/occasion/christmas", label: "Christmas", desc: "Holiday gift perfection" },
  { href: "/occasion/birthday", label: "Birthday", desc: "Celebrate in style" },
  { href: "/occasion/valentines-day", label: "Valentine\u2019s Day", desc: "Romantic timepieces" },
  { href: "/occasion/anniversary", label: "Anniversary", desc: "Mark the milestone" },
  { href: "/occasion/graduation", label: "Graduation", desc: "Achievement unlocked" },
];

const budgetLinks = [
  { href: "/budget/under-100", label: "Under $100", desc: "Smart starters" },
  { href: "/budget/under-200", label: "Under $200", desc: "The sweet spot" },
  { href: "/budget/under-300", label: "Under $300", desc: "Premium picks" },
  { href: "/budget/under-500", label: "Under $500", desc: "Luxury territory" },
  { href: "/budget/luxury-500-plus", label: "Luxury $500+", desc: "The finest" },
];

const recipientLinks = [
  { href: "/recipient/husbands", label: "For Husbands", desc: "The perfect partner gift" },
  { href: "/recipient/dads", label: "For Dads", desc: "Show him you care" },
  { href: "/recipient/boyfriends", label: "For Boyfriends", desc: "Impress & delight" },
  { href: "/recipient/sons", label: "For Sons", desc: "A rite of passage" },
  { href: "/recipient/friends", label: "For Friends", desc: "Thoughtful gestures" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaButtonRef.current &&
        !megaButtonRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }
    if (megaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-gold/10 shadow-[0_4px_30px_rgba(201,169,110,0.06)]"
          : "bg-ivory/95 backdrop-blur-sm"
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-navy text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-3 text-[0.8125rem]">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
          <span className="text-gray-400 font-light">Free Gift Guide</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="hidden sm:inline text-gray-300 font-light">Find his perfect watch in 60 seconds</span>
          <Link
            href="/gift-finder"
            className="inline-flex items-center gap-1.5 text-gold hover:text-gold-hover transition-colors duration-300 font-medium ml-1"
          >
            Take the Quiz
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group relative">
            <span className="text-[1.625rem] font-bold font-heading tracking-[-0.02em] text-navy transition-all duration-300">
              Wrist
            </span>
            <span className="text-[1.625rem] font-bold font-heading tracking-[-0.02em] gradient-text transition-all duration-300">
              Nerd
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-gold to-gold-hover group-hover:w-full transition-all duration-500" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <button
              ref={megaButtonRef}
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              aria-expanded={megaMenuOpen}
              className={`flex items-center gap-1.5 px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 rounded-full ${
                megaMenuOpen
                  ? "text-gold bg-gold/5"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Gift Guides
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {[
              { href: "/reviews", label: "Reviews" },
              { href: "/blog", label: "Journal" },
              { href: "/deals", label: "Deals" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[0.6875rem] font-semibold text-gray-500 hover:text-navy tracking-[0.14em] uppercase transition-all duration-300 rounded-full hover:bg-navy/[0.03]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Quiz CTA */}
          <Link
            href="/gift-finder"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 cta-shine text-white text-[0.6875rem] font-semibold rounded-full tracking-[0.08em] uppercase hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Gift Finder
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-navy rounded-xl hover:bg-pearl transition-all duration-300"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-6 h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-current rounded-full transition-all duration-300 ml-auto ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`w-6 h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      <div
        ref={megaMenuRef}
        className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-500 origin-top ${
          megaMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-xl border-b border-pearl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-3 gap-12">
              {/* By Occasion */}
              <div>
                <h3 className="luxury-label mb-6">By Occasion</h3>
                <ul className="space-y-1">
                  {occasionLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMegaMenu}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-ivory transition-all duration-300"
                      >
                        <div className="w-1 h-8 rounded-full bg-pearl group-hover:bg-gold transition-colors duration-300" />
                        <div>
                          <span className="block text-sm font-medium text-navy group-hover:text-gold transition-colors duration-300">
                            {link.label}
                          </span>
                          <span className="block text-xs text-gray-400 mt-0.5">{link.desc}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By Budget */}
              <div>
                <h3 className="luxury-label mb-6">By Budget</h3>
                <ul className="space-y-1">
                  {budgetLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMegaMenu}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-ivory transition-all duration-300"
                      >
                        <div className="w-1 h-8 rounded-full bg-pearl group-hover:bg-gold transition-colors duration-300" />
                        <div>
                          <span className="block text-sm font-medium text-navy group-hover:text-gold transition-colors duration-300">
                            {link.label}
                          </span>
                          <span className="block text-xs text-gray-400 mt-0.5">{link.desc}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By Recipient */}
              <div>
                <h3 className="luxury-label mb-6">By Recipient</h3>
                <ul className="space-y-1">
                  {recipientLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMegaMenu}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-ivory transition-all duration-300"
                      >
                        <div className="w-1 h-8 rounded-full bg-pearl group-hover:bg-gold transition-colors duration-300" />
                        <div>
                          <span className="block text-sm font-medium text-navy group-hover:text-gold transition-colors duration-300">
                            {link.label}
                          </span>
                          <span className="block text-xs text-gray-400 mt-0.5">{link.desc}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Featured CTA in Mega Menu */}
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
                  <div className="glow-orb glow-orb-gold w-32 h-32 -top-8 -right-8" />
                  <p className="luxury-label text-gold-hover mb-2 relative z-10">Not Sure?</p>
                  <p className="text-sm text-gray-300 mb-4 relative z-10 leading-relaxed">
                    Take our 60-second quiz for personalized recommendations.
                  </p>
                  <Link
                    href="/gift-finder"
                    onClick={closeMegaMenu}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-hover transition-colors duration-300 relative z-10"
                  >
                    Start the Quiz
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden fixed inset-0 top-[calc(40px+76px)] z-40 transition-all duration-500 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-navy/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`relative bg-white h-full overflow-y-auto transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="px-6 py-8 space-y-2">
            <p className="luxury-label mb-4 px-3">By Occasion</p>
            {occasionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm text-gray-600 hover:text-navy hover:bg-ivory rounded-xl transition-all duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="section-divider my-6" />

            <p className="luxury-label mb-4 px-3">By Budget</p>
            {budgetLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm text-gray-600 hover:text-navy hover:bg-ivory rounded-xl transition-all duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="section-divider my-6" />

            <p className="luxury-label mb-4 px-3">By Recipient</p>
            {recipientLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm text-gray-600 hover:text-navy hover:bg-ivory rounded-xl transition-all duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-pearl pt-6 mt-6 space-y-1">
              {[
                { href: "/reviews", label: "Reviews" },
                { href: "/blog", label: "Journal" },
                { href: "/deals", label: "Deals" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-ivory rounded-xl transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-6">
              <Link
                href="/gift-finder"
                className="flex w-full text-center px-6 py-4 cta-shine text-white font-semibold rounded-2xl min-h-[52px] items-center justify-center gap-2 text-sm tracking-wider uppercase"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Take the Gift Finder Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
