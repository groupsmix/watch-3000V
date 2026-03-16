"use client";

import { useState } from "react";
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatsCard from "@/components/admin/StatsCard";

const pageViewsData = [
  { date: "Mar 1", views: 380, clicks: 45 },
  { date: "Mar 2", views: 420, clicks: 52 },
  { date: "Mar 3", views: 350, clicks: 38 },
  { date: "Mar 4", views: 490, clicks: 61 },
  { date: "Mar 5", views: 530, clicks: 68 },
  { date: "Mar 6", views: 410, clicks: 49 },
  { date: "Mar 7", views: 460, clicks: 55 },
  { date: "Mar 8", views: 520, clicks: 64 },
  { date: "Mar 9", views: 480, clicks: 58 },
  { date: "Mar 10", views: 550, clicks: 72 },
  { date: "Mar 11", views: 600, clicks: 78 },
  { date: "Mar 12", views: 580, clicks: 75 },
  { date: "Mar 13", views: 620, clicks: 82 },
  { date: "Mar 14", views: 560, clicks: 70 },
  { date: "Mar 15", views: 640, clicks: 85 },
  { date: "Mar 16", views: 590, clicks: 77 },
];

const topPages = [
  { page: "/reviews/seiko-presage-srpd37", title: "Seiko Presage SRPD37 Review", views: 2340, change: "+12%" },
  { page: "/reviews/orient-bambino-v2", title: "Orient Bambino V2 Review", views: 1890, change: "+8%" },
  { page: "/gift-finder", title: "Gift Finder Quiz", views: 1650, change: "+22%" },
  { page: "/reviews/tissot-prx-powermatic-80", title: "Tissot PRX Powermatic 80 Review", views: 1420, change: "+5%" },
  { page: "/occasion/christmas", title: "Christmas Gift Watches", views: 1280, change: "-3%" },
  { page: "/reviews/hamilton-khaki-field-mechanical", title: "Hamilton Khaki Field Review", views: 1150, change: "+15%" },
  { page: "/budget/under-200", title: "Best Watches Under $200", views: 980, change: "+18%" },
  { page: "/blog/automatic-vs-quartz-gift", title: "Automatic vs Quartz Gift Guide", views: 870, change: "+10%" },
  { page: "/compare/seiko-5-vs-orient-bambino", title: "Seiko 5 vs Orient Bambino", views: 760, change: "+7%" },
  { page: "/recipient/dads", title: "Best Watches for Dads", views: 650, change: "+25%" },
];

const productClicks = [
  { product: "Seiko Presage SRPD37", clicks: 234, conversions: 12, revenue: 384, rate: "5.1%" },
  { product: "Orient Bambino V2", clicks: 198, conversions: 9, revenue: 162, rate: "4.5%" },
  { product: "Tissot PRX Powermatic 80", clicks: 176, conversions: 7, revenue: 350, rate: "4.0%" },
  { product: "Hamilton Khaki Field", clicks: 145, conversions: 5, revenue: 250, rate: "3.4%" },
  { product: "Seiko 5 Sports SRPD55", clicks: 156, conversions: 6, revenue: 150, rate: "3.8%" },
  { product: "Citizen Eco-Drive BM8180", clicks: 132, conversions: 8, revenue: 80, rate: "6.1%" },
  { product: "Casio G-Shock GA2100", clicks: 120, conversions: 10, revenue: 100, rate: "8.3%" },
  { product: "Bulova Lunar Pilot", clicks: 98, conversions: 4, revenue: 180, rate: "4.1%" },
];

const trafficSources = [
  { name: "Organic Search", value: 52, color: "#0C1220" },
  { name: "Pinterest", value: 22, color: "#C9A96E" },
  { name: "Direct", value: 14, color: "#A8893E" },
  { name: "Social", value: 8, color: "#DFC08A" },
  { name: "Referral", value: 4, color: "#E8D5A0" },
];

const revenueByNetwork = [
  { network: "Amazon", revenue: 1856, pct: 79 },
  { network: "ShareASale", revenue: 340, pct: 15 },
  { network: "CJ", revenue: 144, pct: 6 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Analytics" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Track performance, traffic, and revenue metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5">
            {[
              { id: "7d", label: "7D" },
              { id: "30d", label: "30D" },
              { id: "90d", label: "90D" },
              { id: "ytd", label: "YTD" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setDateRange(range.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  dateRange === range.id ? "bg-navy text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" /> Custom
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Page Views" value="12,430" change="+18%" changeType="positive" icon={<Eye className="w-5 h-5" />} iconColor="bg-blue-50 text-blue-600" />
        <StatsCard title="Unique Visitors" value="8,210" change="+14%" changeType="positive" icon={<TrendingUp className="w-5 h-5" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Affiliate Clicks" value="1,842" change="+12%" changeType="positive" icon={<MousePointerClick className="w-5 h-5" />} />
        <StatsCard title="Est. Revenue" value="$2,340" change="+8%" changeType="positive" icon={<DollarSign className="w-5 h-5" />} iconColor="bg-purple-50 text-purple-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Page Views Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-900">Page Views & Affiliate Clicks</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy" /> Views</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gold" /> Clicks</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#999" }} />
              <YAxis tick={{ fontSize: 11, fill: "#999" }} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="views" stroke="#0C1220" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="#C9A96E" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #eee", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {trafficSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-gray-600">{source.name}</span>
                </span>
                <span className="font-medium text-gray-900 tabular-nums">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Network + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue by Network */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Network</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueByNetwork} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#999" }} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="network" tick={{ fontSize: 11, fill: "#999" }} width={80} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #eee", fontSize: "12px" }}
                formatter={(value) => [`$${value}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#C9A96E" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">Total Revenue</span>
              <span className="font-bold text-navy text-lg tabular-nums">$2,340</span>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Top Pages</h2>
            <button className="text-xs text-gold hover:text-gold-dark font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topPages.slice(0, 8).map((page) => (
                  <tr key={page.page} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{page.title}</p>
                      <p className="text-xs text-gray-400 truncate">{page.page}</p>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 tabular-nums">{page.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                        page.change.startsWith("+") ? "text-emerald-600" : "text-red-500"
                      }`}>
                        {page.change.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {page.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Clicks Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Product Click Performance</h2>
          <button className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Conversions</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Conv. Rate</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {productClicks.map((product) => (
                <tr key={product.product} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-gray-900">{product.product}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-sm text-gray-700 tabular-nums">{product.clicks}</td>
                  <td className="px-4 py-3.5 text-right text-sm text-gray-700 tabular-nums hidden sm:table-cell">{product.conversions}</td>
                  <td className="px-4 py-3.5 text-right text-sm tabular-nums hidden sm:table-cell">
                    <span className={`font-medium ${parseFloat(product.rate) >= 5 ? "text-emerald-600" : "text-gray-600"}`}>{product.rate}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-sm font-medium text-gray-900 tabular-nums">${product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
