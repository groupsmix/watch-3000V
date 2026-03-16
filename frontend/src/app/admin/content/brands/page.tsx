"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Award, MoreVertical } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

interface BrandItem {
  id: number;
  title: string;
  slug: string;
  origin: string;
  priceRange: string;
  reviewCount: number;
  status: string;
  lastUpdated: string;
  [key: string]: unknown;
}

const brandsData: BrandItem[] = [
  { id: 1, title: "Seiko", slug: "seiko", origin: "Japan", priceRange: "$75–$500", reviewCount: 3, status: "Published", lastUpdated: "2026-03-16" },
  { id: 2, title: "Fossil", slug: "fossil", origin: "USA", priceRange: "$80–$200", reviewCount: 1, status: "Published", lastUpdated: "2026-03-16" },
  { id: 3, title: "Hamilton", slug: "hamilton", origin: "Switzerland", priceRange: "$400–$1200", reviewCount: 2, status: "Published", lastUpdated: "2026-03-16" },
  { id: 4, title: "Orient", slug: "orient", origin: "Japan", priceRange: "$130–$500", reviewCount: 1, status: "Published", lastUpdated: "2026-03-16" },
  { id: 5, title: "Tissot", slug: "tissot", origin: "Switzerland", priceRange: "$250–$1000", reviewCount: 3, status: "Published", lastUpdated: "2026-03-16" },
  { id: 6, title: "Citizen", slug: "citizen", origin: "Japan", priceRange: "$75–$500", reviewCount: 1, status: "Published", lastUpdated: "2026-03-16" },
];

export default function BrandsPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<BrandItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("# Seiko Brand Spotlight\n\nSeiko has been crafting watches since 1881...");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const columns = [
    {
      key: "title",
      label: "Brand",
      sortable: true,
      render: (item: BrandItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">/brands/{item.slug}</p>
          </div>
        </div>
      ),
    },
    { key: "origin", label: "Origin", sortable: true },
    { key: "priceRange", label: "Price Range", sortable: false },
    { key: "reviewCount", label: "Reviews", sortable: true, render: (item: BrandItem) => <span className="text-sm text-gray-600">{item.reviewCount}</span> },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: BrandItem) => (
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{item.status}</span>
      ),
    },
    { key: "lastUpdated", label: "Updated", sortable: true, className: "hidden md:table-cell" },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Content", href: "/admin/content/reviews" }, { label: "Brands" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Brand Spotlights</h1>
          <p className="text-sm text-gray-500 mt-1">{brandsData.length} brand profiles</p>
        </div>
        <button onClick={() => setEditModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all">
          <Plus className="w-4 h-4" /> New Brand
        </button>
      </div>

      <DataTable<BrandItem>
        columns={columns} data={brandsData} searchPlaceholder="Search brands..." searchKeys={["title", "slug", "origin"]} pageSize={10}
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

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Brand Spotlight" size="xl"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand Name</label>
              <input type="text" defaultValue="Seiko" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country of Origin</label>
              <input type="text" defaultValue="Japan" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <MarkdownEditor value={editContent} onChange={setEditContent} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Brand" message={`Are you sure you want to delete "${deleteConfirm?.title}"?`} confirmLabel="Delete" variant="danger" />
    </div>
  );
}
