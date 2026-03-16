"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, GitCompare, MoreVertical } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

interface ComparisonItem {
  id: number;
  title: string;
  slug: string;
  watchA: string;
  watchB: string;
  winner: string;
  status: string;
  lastUpdated: string;
  [key: string]: unknown;
}

const comparisonsData: ComparisonItem[] = [
  { id: 1, title: "Fossil vs Seiko", slug: "fossil-vs-seiko", watchA: "Fossil Neutra", watchB: "Seiko 5 SRPD55", winner: "Seiko 5", status: "Published", lastUpdated: "2026-03-16" },
  { id: 2, title: "Tissot PRX vs Hamilton Khaki Field", slug: "tissot-prx-vs-hamilton-khaki-field", watchA: "Tissot PRX", watchB: "Hamilton Khaki Field", winner: "Tie", status: "Published", lastUpdated: "2026-03-16" },
  { id: 3, title: "Casio G-Shock vs Timex Expedition", slug: "casio-g-shock-vs-timex-expedition", watchA: "G-Shock GA2100", watchB: "Timex Expedition", winner: "G-Shock", status: "Published", lastUpdated: "2026-03-16" },
  { id: 4, title: "Seiko 5 vs Orient Bambino", slug: "seiko-5-vs-orient-bambino", watchA: "Seiko 5 SRPD55", watchB: "Orient Bambino V2", winner: "Orient Bambino", status: "Published", lastUpdated: "2026-03-16" },
  { id: 5, title: "Citizen Eco-Drive vs Seiko Solar", slug: "citizen-eco-drive-vs-seiko-solar", watchA: "Citizen Eco-Drive", watchB: "Seiko Solar", winner: "Citizen", status: "Published", lastUpdated: "2026-03-16" },
];

export default function ComparisonsPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<ComparisonItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("# Fossil vs Seiko\n\nTwo popular brands go head-to-head...");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const columns = [
    {
      key: "title",
      label: "Comparison",
      sortable: true,
      render: (item: ComparisonItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shrink-0">
            <GitCompare className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">/compare/{item.slug}</p>
          </div>
        </div>
      ),
    },
    { key: "watchA", label: "Watch A", sortable: true, className: "hidden md:table-cell" },
    { key: "watchB", label: "Watch B", sortable: true, className: "hidden md:table-cell" },
    {
      key: "winner",
      label: "Winner",
      sortable: true,
      render: (item: ComparisonItem) => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
          item.winner === "Tie" ? "bg-gray-100 text-gray-600" : "bg-gold/10 text-gold-dark"
        }`}>{item.winner}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: ComparisonItem) => (
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{item.status}</span>
      ),
    },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Content", href: "/admin/content/reviews" }, { label: "Comparisons" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Comparisons</h1>
          <p className="text-sm text-gray-500 mt-1">{comparisonsData.length} head-to-head comparisons</p>
        </div>
        <button onClick={() => setEditModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all">
          <Plus className="w-4 h-4" /> New Comparison
        </button>
      </div>

      <DataTable<ComparisonItem>
        columns={columns} data={comparisonsData} searchPlaceholder="Search comparisons..." searchKeys={["title", "watchA", "watchB"]} pageSize={10}
        actions={(item) => (
          <div className="relative">
            <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            {activeMenu === item.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                  <button onClick={() => { setEditModal(true); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><Eye className="w-3.5 h-3.5" /> View Live</button>
                  <div className="border-t border-gray-100 my-1" />
                  <button onClick={() => { setDeleteConfirm(item); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </>
            )}
          </div>
        )}
      />

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Comparison" size="xl"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Watch A</label>
              <input type="text" defaultValue="Fossil Neutra" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Watch B</label>
              <input type="text" defaultValue="Seiko 5 SRPD55" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <MarkdownEditor value={editContent} onChange={setEditContent} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Comparison" message={`Are you sure you want to delete "${deleteConfirm?.title}"?`} confirmLabel="Delete" variant="danger" />
    </div>
  );
}
