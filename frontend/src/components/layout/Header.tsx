"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

const occasionLinks = [
  { href: "/occasion/fathers-day", label: "Father\u2019s Day" },
  { href: "/occasion/christmas", label: "Christmas" },
  { href: "/occasion/birthday", label: "Birthday" },
  { href: "/occasion/valentines-day", label: "Valentine\u2019s Day" },
  { href: "/occasion/anniversary", label: "Anniversary" },
  { href: "/occasion/graduation", label: "Graduation" },
];

const budgetLinks = [
  { href: "/budget/under-100", label: "Under $100" },
  { href: "/budget/under-200", label: "Under $200" },
  { href: "/budget/under-300", label: "Under $300" },
  { href: "/budget/under-500", label: "Under $500" },
  { href: "/budget/luxury-500-plus", label: "Luxury $500+" },
];

const recipientLinks = [
  { href: "/recipient/husbands", label: "For Husbands" },
  { href: "/recipient/dads", label: "For Dads" },
  { href: "/recipient/boyfriends", label: "For Boyfriends" },
  { href: "/recipient/sons", label: "For Sons" },
  { href: "/recipient/friends", label: "For Friends" },
];

interface DropdownProps {
  label: string;
  links: { href: string; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function NavDropdown({ label, links, isOpen, onToggle, onClose }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-navy transition-all duration-200 uppercase"
        style={{ letterSpacing: "0.06em" }}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-5 py-2.5 text-sm text-gray-600 hover:text-navy hover:bg-gold-50 transition-all duration-200 border-l-2 border-transparent hover:border-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-gray-200/60 shadow-sm"
          : "bg-white border-b border-gray-200"
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-dark text-white text-center py-2.5 px-4 text-sm">
        <span className="opacity-80">Free Gift Guide:</span>{" "}
        <span className="font-medium">Find the perfect watch in 60 seconds</span>{" "}
        <Link
          href="/gift-finder"
          className="inline-flex items-center gap-1 underline font-semibold text-gold hover:text-gold-hover transition-colors ml-1"
        >
          Take the Quiz
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold font-heading text-navy tracking-tight">
              Wrist
            </span>
            <span className="text-2xl font-bold font-heading gradient-text tracking-tight -ml-2">
              Nerd
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavDropdown
              label="By Occasion"
              links={occasionLinks}
              isOpen={openDropdown === "occasion"}
              onToggle={() => toggleDropdown("occasion")}
              onClose={closeDropdown}
            />
            <NavDropdown
              label="By Budget"
              links={budgetLinks}
              isOpen={openDropdown === "budget"}
              onToggle={() => toggleDropdown("budget")}
              onClose={closeDropdown}
            />
            <NavDropdown
              label="By Recipient"
              links={recipientLinks}
              isOpen={openDropdown === "recipient"}
              onToggle={() => toggleDropdown("recipient")}
              onClose={closeDropdown}
            />
            <Link
              href="/reviews"
              className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-navy transition-all duration-200 uppercase"
              style={{ letterSpacing: "0.06em" }}
            >
              Reviews
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-navy transition-all duration-200 uppercase"
              style={{ letterSpacing: "0.06em" }}
            >
              Blog
            </Link>
            <Link
              href="/deals"
              className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-navy transition-all duration-200 uppercase"
              style={{ letterSpacing: "0.06em" }}
            >
              Deals
            </Link>
          </nav>

          {/* Quiz CTA */}
          <Link
            href="/gift-finder"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 cta-shine text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Gift Finder Quiz
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:text-navy rounded-lg hover:bg-gray-50 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-6 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)]">
          <p className="text-[0.65rem] font-bold text-gold uppercase tracking-[0.12em] px-3 pb-1">
            By Occasion
          </p>
          {occasionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="section-divider my-4" />

          <p className="text-[0.65rem] font-bold text-gold uppercase tracking-[0.12em] px-3 pb-1">
            By Budget
          </p>
          {budgetLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="section-divider my-4" />

          <p className="text-[0.65rem] font-bold text-gold uppercase tracking-[0.12em] px-3 pb-1">
            By Recipient
          </p>
          {recipientLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 pt-4 mt-4 space-y-1">
            <Link href="/reviews" className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
              Reviews
            </Link>
            <Link href="/blog" className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link href="/deals" className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gold-50 hover:text-navy rounded-lg transition-all" onClick={() => setMobileOpen(false)}>
              Deals
            </Link>
          </div>
          <div className="pt-4">
            <Link
              href="/gift-finder"
              className="flex w-full text-center px-6 py-3.5 cta-shine text-white font-semibold rounded-full min-h-[48px] items-center justify-center gap-2"
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
    </header>
  );
}
