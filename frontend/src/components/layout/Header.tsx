"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

const occasionLinks = [
  { href: "/occasion/fathers-day", label: "Father’s Day" },
  { href: "/occasion/christmas", label: "Christmas" },
  { href: "/occasion/birthday", label: "Birthday" },
  { href: "/occasion/valentines-day", label: "Valentine’s Day" },
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
        className="flex items-center gap-1.5 px-4 py-2 text-[0.7rem] font-medium text-ivory-dim hover:text-gold transition-all duration-300 uppercase tracking-[0.15em]"
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`absolute left-0 top-full mt-3 w-60 bg-surface border border-gold/10 rounded-xl z-50 transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)" }}
      >
        <div className="py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-5 py-2.5 text-sm text-ivory-dim hover:text-gold hover:bg-gold/5 transition-all duration-200 border-l-2 border-transparent hover:border-gold"
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-gold/10"
          : "bg-transparent"
      }`}
      style={scrolled ? { boxShadow: "0 4px 30px rgba(0,0,0,0.3)" } : undefined}
    >
      {/* Announcement Bar */}
      <div className="bg-gold/5 border-b border-gold/10 text-center py-2 px-4">
        <span className="text-[0.7rem] tracking-[0.15em] uppercase text-ivory-dim">Free Gift Guide</span>
        <span className="mx-2 text-gold/30">|</span>
        <Link
          href="/gift-finder"
          className="text-[0.7rem] tracking-[0.1em] uppercase text-gold hover:text-gold-light transition-colors font-medium"
        >
          Take the Quiz
          <svg className="w-3 h-3 inline ml-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 group">
            <span className="text-2xl font-bold font-heading text-ivory tracking-tight">
              Wrist
            </span>
            <span className="text-2xl font-bold font-heading gradient-text tracking-tight">
              Nerd
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold ml-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
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
              className="px-4 py-2 text-[0.7rem] font-medium text-ivory-dim hover:text-gold transition-all duration-300 uppercase tracking-[0.15em]"
            >
              Reviews
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-[0.7rem] font-medium text-ivory-dim hover:text-gold transition-all duration-300 uppercase tracking-[0.15em]"
            >
              Blog
            </Link>
            <Link
              href="/deals"
              className="px-4 py-2 text-[0.7rem] font-medium text-ivory-dim hover:text-gold transition-all duration-300 uppercase tracking-[0.15em]"
            >
              Deals
            </Link>
          </nav>

          {/* Quiz CTA */}
          <Link
            href="/gift-finder"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 cta-shine text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Gift Finder
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 text-ivory-dim hover:text-gold rounded-lg hover:bg-gold/5 transition-all"
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
        className={`lg:hidden bg-surface border-t border-gold/10 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-6 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)]">
          <p className="label-luxury px-3 pb-2">By Occasion</p>
          {occasionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="section-divider my-4" />
          <p className="label-luxury px-3 pb-2">By Budget</p>
          {budgetLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="section-divider my-4" />
          <p className="label-luxury px-3 pb-2">By Recipient</p>
          {recipientLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gold/10 pt-4 mt-4 space-y-1">
            <Link href="/reviews" className="block px-3 py-2.5 text-sm font-medium text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all" onClick={() => setMobileOpen(false)}>Reviews</Link>
            <Link href="/blog" className="block px-3 py-2.5 text-sm font-medium text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/deals" className="block px-3 py-2.5 text-sm font-medium text-ivory-dim hover:bg-gold/5 hover:text-gold rounded-lg transition-all" onClick={() => setMobileOpen(false)}>Deals</Link>
          </div>
          <div className="pt-4">
            <Link
              href="/gift-finder"
              className="flex w-full text-center px-6 py-3.5 cta-shine font-semibold rounded-full min-h-[48px] items-center justify-center gap-2"
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
