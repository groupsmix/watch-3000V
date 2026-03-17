"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, UserCheck, MoreVertical } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

interface RecipientItem {
  id: number;
  title: string;
  slug: string;
  watchCount: number;
  status: string;
  lastUpdated: string;
}

const recipientsData: RecipientItem[] = [
  { id: 1, title: "Best Watches for Dads", slug: "dads", watchCount: 8, status: "Published", lastUpdated: "2026-03-16" },
  { id: 2, title: "Best Watches for Boyfriends", slug: "boyfriends", watchCount: 7, status: "Published", lastUpdated: "2026-03-16" },
  { id: 3, title: "Best Watches for Husbands", slug: "husbands", watchCount: 8, status: "Published", lastUpdated: "2026-03-16" },
  { id: 4, title: "Best Watches for Sons", slug: "sons", watchCount: 6, status: "Published", lastUpdated: "2026-03-16" },
  { id: 5, title: "Best Watches for Friends", slug: "friends", watchCount: 5, status: "Published", lastUpdated: "2026-03-16" },
];

export default function RecipientsPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<RecipientItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("# Best Watches for Dads\n\nFinding the right watch for Dad...");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setActiveMenu(null);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const columns = [
    {
      key: "title",
      label: "Recipient Page",
      sortable: true,
      render: (item: RecipientItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">/recipient/{item.slug}</p>
          </div>
        </div>
      ),
    },
    { key: "watchCount", label: "Watches", sortable: true, render: (item: RecipientItem) => <span className="text-sm text-gray-600">{item.watchCount}</span> },
    { key: "status", label: "Status", sortable: true, render: (item: RecipientItem) => <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{item.status}</span> },
    { key: "lastUpdated", label: "Last Updated", sortable: true, className: "hidden md:table-cell" },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Content", href: "/admin/content/reviews" }, { label: "Recipients" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Recipient Pages</h1>
          <p className="text-sm text-gray-500 mt-1">{recipientsData.length} recipient guides</p>
        </div>
        <button onClick={() => setEditModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all">
          <Plus className="w-4 h-4" /> New Recipient Page
        </button>
      </div>

      <DataTable<RecipientItem>
        columns={columns} data={recipientsData} searchPlaceholder="Search recipients..." searchKeys={["title", "slug"]} pageSize={10}
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
                  <Link href={`/recipient/${item.slug}`} target="_blank" rel="noopener noreferrer" onClick={() => setActiveMenu(null)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><Eye className="w-3.5 h-3.5" /> View Live</Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button onClick={() => { setDeleteConfirm(item); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </>
            )}
          </div>
        )}
      />

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Recipient Page" size="xl"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
            <input type="text" defaultValue="Best Watches for Dads" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <MarkdownEditor value={editContent} onChange={setEditContent} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Recipient Page" message={`Are you sure you want to delete "${deleteConfirm?.title}"?`} confirmLabel="Delete" variant="danger" />
    </div>
  );
}
