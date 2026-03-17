"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Link2,
  MoreVertical,
  RefreshCw,
  Download,
  AlertCircle,
  MousePointerClick,
  ShoppingCart,
  DollarSign,
  Search,
} from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatsCard from "@/components/admin/StatsCard";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";

interface AffiliateLink {
  id: number;
  product: string;
  placeholder: string;
  url: string;
  network: string;
  clicks: number;
  conversions: number;
  revenue: number;
  status: string;
  lastChecked: string;
}

const affiliateData: AffiliateLink[] = [
  { id: 1, product: "Seiko Presage SRPD37", placeholder: "{{SEIKO_PRESAGE_SRPD37_LINK}}", url: "https://www.amazon.com/dp/B07YZ4SGMR?tag=wristnerd-20", network: "Amazon", clicks: 234, conversions: 12, revenue: 384, status: "Active", lastChecked: "2026-03-16" },
  { id: 2, product: "Orient Bambino V2", placeholder: "{{ORIENT_BAMBINO_V2_LINK}}", url: "https://www.amazon.com/dp/B01MUDI3GN?tag=wristnerd-20", network: "Amazon", clicks: 198, conversions: 9, revenue: 162, status: "Active", lastChecked: "2026-03-16" },
  { id: 3, product: "Tissot PRX Powermatic 80", placeholder: "{{TISSOT_PRX_PM80_LINK}}", url: "https://www.amazon.com/dp/B09MDNMMRW?tag=wristnerd-20", network: "Amazon", clicks: 176, conversions: 7, revenue: 350, status: "Active", lastChecked: "2026-03-16" },
  { id: 4, product: "Hamilton Khaki Field", placeholder: "{{HAMILTON_KHAKI_FIELD_LINK}}", url: "https://www.amazon.com/dp/B001FSJBD0?tag=wristnerd-20", network: "Amazon", clicks: 145, conversions: 5, revenue: 250, status: "Active", lastChecked: "2026-03-16" },
  { id: 5, product: "Citizen Eco-Drive BM8180", placeholder: "{{CITIZEN_BM8180_LINK}}", url: "https://www.amazon.com/dp/B000EQS1JW?tag=wristnerd-20", network: "Amazon", clicks: 132, conversions: 8, revenue: 80, status: "Active", lastChecked: "2026-03-16" },
  { id: 6, product: "Seiko 5 Sports SRPD55", placeholder: "{{SEIKO_5_SRPD55_LINK}}", url: "https://www.amazon.com/dp/B07WGMQBPF?tag=wristnerd-20", network: "Amazon", clicks: 156, conversions: 6, revenue: 150, status: "Active", lastChecked: "2026-03-16" },
  { id: 7, product: "Casio G-Shock GA2100", placeholder: "{{CASIO_GSHOCK_GA2100_LINK}}", url: "https://www.amazon.com/dp/B07WMS77R4?tag=wristnerd-20", network: "Amazon", clicks: 120, conversions: 10, revenue: 100, status: "Active", lastChecked: "2026-03-16" },
  { id: 8, product: "Bulova Lunar Pilot", placeholder: "{{BULOVA_LUNAR_PILOT_LINK}}", url: "https://www.amazon.com/dp/B01AJE2WAW?tag=wristnerd-20", network: "Amazon", clicks: 98, conversions: 4, revenue: 180, status: "Active", lastChecked: "2026-03-16" },
  { id: 9, product: "Timex Marlin Automatic", placeholder: "{{TIMEX_MARLIN_LINK}}", url: "https://www.amazon.com/dp/B07VYG3TCK?tag=wristnerd-20", network: "Amazon", clicks: 89, conversions: 3, revenue: 75, status: "Expiring", lastChecked: "2026-03-14" },
  { id: 10, product: "Tissot Gentleman", placeholder: "{{TISSOT_GENTLEMAN_LINK}}", url: "https://www.shareasale.com/r.cfm?u=12345&b=67890", network: "ShareASale", clicks: 112, conversions: 3, revenue: 210, status: "Active", lastChecked: "2026-03-16" },
  { id: 11, product: "Fossil Neutra Chronograph", placeholder: "{{FOSSIL_NEUTRA_LINK}}", url: "https://www.amazon.com/dp/B079RM1WJM?tag=wristnerd-20", network: "Amazon", clicks: 76, conversions: 5, revenue: 50, status: "Expiring", lastChecked: "2026-03-12" },
  { id: 12, product: "Hamilton Jazzmaster", placeholder: "{{HAMILTON_JAZZMASTER_LINK}}", url: "", network: "CJ", clicks: 0, conversions: 0, revenue: 0, status: "Unmapped", lastChecked: "—" },
];

export default function AffiliatesPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<AffiliateLink | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [bulkModal, setBulkModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterNetwork, setFilterNetwork] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = affiliateData.filter((item) => {
    const matchesSearch = !search || item.product.toLowerCase().includes(search.toLowerCase()) || item.placeholder.toLowerCase().includes(search.toLowerCase());
    const matchesNetwork = filterNetwork === "all" || item.network === filterNetwork;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesNetwork && matchesStatus;
  });

  const totalClicks = affiliateData.reduce((sum, a) => sum + a.clicks, 0);
  const totalConversions = affiliateData.reduce((sum, a) => sum + a.conversions, 0);
  const totalRevenue = affiliateData.reduce((sum, a) => sum + a.revenue, 0);
  const unmappedCount = affiliateData.filter((a) => a.status === "Unmapped").length;

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Affiliates" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Affiliate Management</h1>
          <p className="text-sm text-gray-500 mt-1">Map, track, and manage affiliate links across all content</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBulkModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Bulk Replace
          </button>
          <button
            onClick={() => setEditModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Clicks" value={totalClicks.toLocaleString()} change="+12% this month" changeType="positive" icon={<MousePointerClick className="w-5 h-5" />} />
        <StatsCard title="Conversions" value={totalConversions} change="5.2% rate" changeType="positive" icon={<ShoppingCart className="w-5 h-5" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Est. Revenue" value={`$${totalRevenue.toLocaleString()}`} change="+8% this month" changeType="positive" icon={<DollarSign className="w-5 h-5" />} iconColor="bg-purple-50 text-purple-600" />
        <StatsCard title="Unmapped Links" value={unmappedCount} change={unmappedCount > 0 ? "Needs attention" : "All mapped"} changeType={unmappedCount > 0 ? "negative" : "positive"} icon={<AlertCircle className="w-5 h-5" />} iconColor={unmappedCount > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or placeholders..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
          />
        </div>
        <select
          value={filterNetwork}
          onChange={(e) => setFilterNetwork(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
        >
          <option value="all">All Networks</option>
          <option value="Amazon">Amazon</option>
          <option value="ShareASale">ShareASale</option>
          <option value="CJ">CJ</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expiring">Expiring</option>
          <option value="Unmapped">Unmapped</option>
        </select>
        <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Placeholder</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Network</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Conv.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center shrink-0">
                        <Link2 className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.product}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">{item.placeholder}</code>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.network === "Amazon" ? "bg-orange-50 text-orange-700" :
                      item.network === "ShareASale" ? "bg-blue-50 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{item.network}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 tabular-nums">{item.clicks}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 tabular-nums hidden sm:table-cell">{item.conversions}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 tabular-nums hidden md:table-cell">${item.revenue}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                      item.status === "Expiring" ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-700"
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="relative">
                      <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeMenu === item.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                            <button onClick={() => { setEditModal(true); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            {item.url && (
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><ExternalLink className="w-3.5 h-3.5" /> Open URL</a>
                            )}
                            <div className="border-t border-gray-100 my-1" />
                            <button onClick={() => { setDeleteConfirm(item); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Affiliate Link" size="md"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
            <input type="text" defaultValue="Seiko Presage SRPD37" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Placeholder Tag</label>
            <input type="text" defaultValue="{{SEIKO_PRESAGE_SRPD37_LINK}}" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Affiliate URL</label>
            <input type="url" defaultValue="https://www.amazon.com/dp/B07YZ4SGMR?tag=wristnerd-20" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Network</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30">
              <option>Amazon</option>
              <option>ShareASale</option>
              <option>CJ</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Bulk Replace Modal */}
      <Modal open={bulkModal} onClose={() => setBulkModal(false)} title="Bulk Replace Affiliate Links" size="lg"
        footer={<>
          <button onClick={() => setBulkModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setBulkModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Replace All</button>
        </>}
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Bulk Replacement</p>
              <p className="text-xs text-amber-600 mt-1">This will find and replace all placeholder tags across all markdown content files with the mapped affiliate URLs. This operation can be reversed.</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Find (Placeholder)</label>
            <input type="text" placeholder="e.g., {{SEIKO_PRESAGE_SRPD37_LINK}}" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Replace With (URL)</label>
            <input type="url" placeholder="e.g., https://www.amazon.com/dp/..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Scope</label>
            <div className="space-y-2">
              {["All content files", "Reviews only", "Blog posts only", "Occasion pages only"].map((scope) => (
                <label key={scope} className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="radio" name="scope" defaultChecked={scope === "All content files"} className="text-gold focus:ring-gold accent-gold" />
                  {scope}
                </label>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview: Files affected</p>
            <div className="space-y-1">
              {["content/reviews/seiko-presage-srpd37.md", "content/occasion-pages/fathers-day.md", "content/budget-pages/under-300.md"].map((file) => (
                <p key={file} className="text-xs text-gray-500 font-mono">{file}</p>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Affiliate Link" message={`Are you sure you want to delete the affiliate link for "${deleteConfirm?.product}"?`} confirmLabel="Delete" variant="danger" />
    </div>
  );
}
