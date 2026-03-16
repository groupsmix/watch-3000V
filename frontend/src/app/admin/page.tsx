"use client";

import Link from "next/link";
import {
  FileText,
  Link2,
  BarChart3,
  HelpCircle,
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Clock,
  Plus,
  ArrowRight,
  Star,
  PenSquare,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";

const recentActivity = [
  {
    id: 1,
    action: "Review updated",
    item: "Tissot PRX Powermatic 80",
    user: "Admin",
    time: "5 min ago",
    type: "edit" as const,
  },
  {
    id: 2,
    action: "Blog post published",
    item: "Watch Care Guide 2026",
    user: "Editor",
    time: "2 hours ago",
    type: "publish" as const,
  },
  {
    id: 3,
    action: "Affiliate link added",
    item: "Seiko 5 SRPD55 → Amazon",
    user: "Admin",
    time: "4 hours ago",
    type: "link" as const,
  },
  {
    id: 4,
    action: "Quiz question edited",
    item: "Budget selection step",
    user: "Admin",
    time: "Yesterday",
    type: "quiz" as const,
  },
  {
    id: 5,
    action: "New comparison created",
    item: "Tissot PRX vs Hamilton Khaki",
    user: "Editor",
    time: "Yesterday",
    type: "create" as const,
  },
];

const quickActions = [
  { label: "New Review", href: "/admin/content/reviews", icon: <Star className="w-4 h-4" />, color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
  { label: "New Blog Post", href: "/admin/content/blog", icon: <PenSquare className="w-4 h-4" />, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
  { label: "Manage Links", href: "/admin/affiliates", icon: <Link2 className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
  { label: "View Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-4 h-4" />, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
  { label: "Scheduled Content", href: "/admin/scheduled-content", icon: <CalendarClock className="w-4 h-4" />, color: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
];

const contentStatus = [
  { type: "Reviews", count: 14, published: 14, drafts: 0 },
  { type: "Blog Posts", count: 10, published: 10, drafts: 0 },
  { type: "Occasion Pages", count: 6, published: 6, drafts: 0 },
  { type: "Budget Pages", count: 5, published: 5, drafts: 0 },
  { type: "Recipient Pages", count: 5, published: 5, drafts: 0 },
  { type: "Brand Spotlights", count: 6, published: 6, drafts: 0 },
  { type: "Comparisons", count: 5, published: 5, drafts: 0 },
];

const alerts = [
  { id: 1, text: "3 affiliate links expiring in 7 days", type: "warning" as const },
  { id: 2, text: "Orient Bambino review needs updated pricing", type: "info" as const },
];

const upcomingScheduled = [
  { id: 1, title: "Seiko Presage Cocktail Time Deep Dive", type: "Review", date: "Mar 18, 2026", time: "9:00 AM" },
  { id: 2, title: "Top 5 Watches Under $200 for 2026", type: "Blog", date: "Mar 19, 2026", time: "2:00 PM" },
  { id: 3, title: "Watch Care & Maintenance Guide", type: "Guide", date: "Mar 20, 2026", time: "10:00 AM" },
  { id: 4, title: "Longines Heritage Collection Overview", type: "Review", date: "Mar 21, 2026", time: "12:00 PM" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. Here&apos;s what&apos;s happening with WristNerd.</p>
        </div>
        <Link
          href="/admin/content/reviews"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          New Content
        </Link>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                alert.type === "warning"
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {alert.text}
            </div>
          ))}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Content"
          value={51}
          change="+3 this week"
          changeType="positive"
          icon={<FileText className="w-5 h-5" />}
        />
        <StatsCard
          title="Page Views"
          value="12.4K"
          change="+18% vs last month"
          changeType="positive"
          icon={<Eye className="w-5 h-5" />}
          iconColor="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="Affiliate Clicks"
          value="1,842"
          change="+12% vs last month"
          changeType="positive"
          icon={<MousePointerClick className="w-5 h-5" />}
          iconColor="bg-emerald-50 text-emerald-600"
        />
        <StatsCard
          title="Est. Revenue"
          value="$2,340"
          change="+8% vs last month"
          changeType="positive"
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${action.color}`}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Content Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Content Overview</h2>
            <Link href="/admin/content/reviews" className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {contentStatus.map((item) => (
              <div key={item.type} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.type}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900 tabular-nums">{item.published}</span>
                  {item.drafts > 0 && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      {item.drafts} draft{item.drafts > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-navy text-base tabular-nums">
              {contentStatus.reduce((sum, item) => sum + item.count, 0)}
            </span>
          </div>
        </div>

        {/* Quick stats mini cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-gold" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Quiz Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-navy tabular-nums">347</p>
                <p className="text-xs text-gray-500">Completions this month</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy tabular-nums">72%</p>
                <p className="text-xs text-gray-500">Completion rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="space-y-2">
              {[
                { name: "Seiko Presage SRPD37", clicks: 234 },
                { name: "Orient Bambino V2", clicks: 198 },
                { name: "Tissot PRX", clicks: 176 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate">{item.name}</span>
                  <span className="font-medium text-gray-900 tabular-nums shrink-0 ml-2">
                    {item.clicks} clicks
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Scheduled Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Scheduled Content</h2>
          </div>
          <Link href="/admin/scheduled-content" className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {upcomingScheduled.map((item) => (
            <div key={item.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <CalendarClock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{item.title}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-medium shrink-0">
                <Clock className="w-3 h-3" />
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
          <span className="text-xs text-gray-400">Last 7 days</span>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                activity.type === "edit" ? "bg-blue-50 text-blue-600" :
                activity.type === "publish" ? "bg-emerald-50 text-emerald-600" :
                activity.type === "link" ? "bg-amber-50 text-amber-600" :
                activity.type === "quiz" ? "bg-purple-50 text-purple-600" :
                "bg-gray-100 text-gray-600"
              }`}>
                {activity.type === "edit" && <PenSquare className="w-4 h-4" />}
                {activity.type === "publish" && <FileText className="w-4 h-4" />}
                {activity.type === "link" && <Link2 className="w-4 h-4" />}
                {activity.type === "quiz" && <HelpCircle className="w-4 h-4" />}
                {activity.type === "create" && <Plus className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{activity.action}</span>{" "}
                  <span className="text-gray-500">— {activity.item}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  by {activity.user}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
