"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Link2,
  HelpCircle,
  BarChart3,
  Users,
  ChevronDown,
  ChevronRight,
  Star,
  Gift,
  DollarSign,
  UserCheck,
  PenSquare,
  Award,
  GitCompare,
  CalendarClock,
  Menu,
  X,
  Watch,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Content",
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: "Reviews", href: "/admin/content/reviews", icon: <Star className="w-4 h-4" /> },
      { label: "Occasions", href: "/admin/content/occasions", icon: <Gift className="w-4 h-4" /> },
      { label: "Budgets", href: "/admin/content/budgets", icon: <DollarSign className="w-4 h-4" /> },
      { label: "Recipients", href: "/admin/content/recipients", icon: <UserCheck className="w-4 h-4" /> },
      { label: "Blog Posts", href: "/admin/content/blog", icon: <PenSquare className="w-4 h-4" /> },
      { label: "Brands", href: "/admin/content/brands", icon: <Award className="w-4 h-4" /> },
      { label: "Comparisons", href: "/admin/content/comparisons", icon: <GitCompare className="w-4 h-4" /> },
    ],
  },
  {
    label: "Scheduled Content",
    href: "/admin/scheduled-content",
    icon: <CalendarClock className="w-5 h-5" />,
  },
  {
    label: "Affiliates",
    href: "/admin/affiliates",
    icon: <Link2 className="w-5 h-5" />,
  },
  {
    label: "Quiz",
    href: "/admin/quiz",
    icon: <HelpCircle className="w-5 h-5" />,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Content"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-hover flex items-center justify-center">
            <Watch className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-heading font-bold text-lg tracking-tight">WristNerd</span>
            <span className="block text-gold/60 text-xs font-medium tracking-widest uppercase">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections.includes(item.label);
            const hasActiveChild = item.children.some((child) => isActive(child.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    hasActiveChild
                      ? "text-gold bg-white/5"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive(child.href)
                            ? "text-gold bg-gold/10 font-medium"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {child.icon}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.href!)
                  ? "text-gold bg-gold/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-gold transition-colors rounded-lg hover:bg-white/5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Live Site
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-navy text-white shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-navy transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
