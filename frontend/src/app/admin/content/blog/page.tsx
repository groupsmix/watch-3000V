"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, PenSquare, MoreVertical } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

interface BlogItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  wordCount: number;
  status: string;
  lastUpdated: string;
  [key: string]: unknown;
}

const blogData: BlogItem[] = [
  { id: 1, title: "Automatic vs Quartz: Which Makes a Better Gift?", slug: "automatic-vs-quartz-gift", category: "Guide", wordCount: 1800, status: "Published", lastUpdated: "2026-03-16" },
  { id: 2, title: "Signs He's a Watch Guy", slug: "signs-hes-a-watch-guy", category: "Lifestyle", wordCount: 1500, status: "Published", lastUpdated: "2026-03-16" },
  { id: 3, title: "How to Choose the Right Watch Size", slug: "how-to-choose-watch-size", category: "Guide", wordCount: 2000, status: "Published", lastUpdated: "2026-03-16" },
  { id: 4, title: "Watch Engraving Ideas for Gifts", slug: "watch-engraving-ideas", category: "Ideas", wordCount: 1600, status: "Published", lastUpdated: "2026-03-16" },
  { id: 5, title: "Watch Gift Wrapping Ideas", slug: "watch-gift-wrapping-ideas", category: "Ideas", wordCount: 1200, status: "Published", lastUpdated: "2026-03-16" },
  { id: 6, title: "First Watch Gift Guide", slug: "first-watch-gift-guide", category: "Guide", wordCount: 2200, status: "Published", lastUpdated: "2026-03-16" },
  { id: 7, title: "Why Watches Make the Best Gifts", slug: "why-watches-best-gifts", category: "Lifestyle", wordCount: 1400, status: "Published", lastUpdated: "2026-03-16" },
  { id: 8, title: "Watch Care Guide", slug: "watch-care-guide", category: "Guide", wordCount: 1900, status: "Published", lastUpdated: "2026-03-16" },
  { id: 9, title: "Buying a Watch Online: Tips & Tricks", slug: "buying-watch-online-tips", category: "Guide", wordCount: 1700, status: "Published", lastUpdated: "2026-03-16" },
  { id: 10, title: "Watch Brands to Avoid (And Why)", slug: "watch-brands-to-avoid", category: "Guide", wordCount: 2100, status: "Published", lastUpdated: "2026-03-16" },
];

export default function BlogPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<BlogItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("# Blog Post Title\n\nYour content here...");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const columns = [
    {
      key: "title",
      label: "Blog Post",
      sortable: true,
      render: (item: BlogItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center shrink-0">
            <PenSquare className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">/blog/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: BlogItem) => (
        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{item.category}</span>
      ),
    },
    {
      key: "wordCount",
      label: "Words",
      sortable: true,
      render: (item: BlogItem) => <span className="text-sm text-gray-600 tabular-nums">{item.wordCount.toLocaleString()}</span>,
      className: "hidden md:table-cell",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: BlogItem) => (
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{item.status}</span>
      ),
    },
    { key: "lastUpdated", label: "Updated", sortable: true, className: "hidden lg:table-cell" },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Content", href: "/admin/content/reviews" }, { label: "Blog Posts" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">{blogData.length} articles</p>
        </div>
        <button onClick={() => setEditModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all">
          <Plus className="w-4 h-4" /> New Blog Post
        </button>
      </div>

      <DataTable<BlogItem>
        columns={columns} data={blogData} searchPlaceholder="Search blog posts..." searchKeys={["title", "slug", "category"]} pageSize={10}
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

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Blog Post" size="full"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy-light rounded-lg">Save Draft</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Publish</button>
        </>}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input type="text" defaultValue="Automatic vs Quartz: Which Makes a Better Gift?" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <MarkdownEditor value={editContent} onChange={setEditContent} />
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
                <option>Guide</option>
                <option>Lifestyle</option>
                <option>Ideas</option>
                <option>News</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
              <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 min-h-[80px] resize-y" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
              <input type="text" defaultValue="WristNerd Editorial Team" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Blog Post" message={`Are you sure you want to delete "${deleteConfirm?.title}"?`} confirmLabel="Delete" variant="danger" />
    </div>
  );
}
