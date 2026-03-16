"use client";

import Link from "next/link";
import { useState } from "react";

const occasionLinks = [
  { href: "/occasion/fathers-day", label: "Father's Day" },
  { href: "/occasion/christmas", label: "Christmas" },
  { href: "/occasion/birthday", label: "Birthday" },
  { href: "/occasion/valentines-day", label: "Valentine's Day" },
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
}

function NavDropdown({ label, links, isOpen, onToggle }: DropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Announcement Bar */}
      <div className="bg-navy text-white text-center py-2 px-4 text-sm">
        Free Gift Guide: Find the perfect watch in 60 seconds{" "}
        <Link href="/gift-finder" className="underline font-semibold text-gold hover:text-gold-hover">
          Take the Quiz &rarr;
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-navy">
              Wrist<span className="text-gold">Nerd</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavDropdown
              label="By Occasion"
              links={occasionLinks}
              isOpen={openDropdown === "occasion"}
              onToggle={() => toggleDropdown("occasion")}
            />
            <NavDropdown
              label="By Budget"
              links={budgetLinks}
              isOpen={openDropdown === "budget"}
              onToggle={() => toggleDropdown("budget")}
            />
            <NavDropdown
              label="By Recipient"
              links={recipientLinks}
              isOpen={openDropdown === "recipient"}
              onToggle={() => toggleDropdown("recipient")}
            />
            <Link
              href="/reviews"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/deals"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors"
            >
              Deals
            </Link>
          </nav>

          {/* Quiz CTA */}
          <Link
            href="/gift-finder"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold-hover transition-colors"
          >
            Gift Finder Quiz
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-navy"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2">
              By Occasion
            </p>
            {occasionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-4">
              By Budget
            </p>
            {budgetLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-4">
              By Recipient
            </p>
            {recipientLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
              <Link href="/reviews" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>
                Reviews
              </Link>
              <Link href="/deals" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>
                Deals
              </Link>
            </div>
            <div className="pt-3">
              <Link
                href="/gift-finder"
                className="block w-full text-center px-5 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover"
                onClick={() => setMobileOpen(false)}
              >
                Take the Gift Finder Quiz
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
