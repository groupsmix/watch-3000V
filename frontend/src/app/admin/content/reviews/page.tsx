"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Star, MoreVertical } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import ImageUploader from "@/components/admin/ImageUploader";

interface ReviewItem {
  id: number;
  title: string;
  slug: string;
  giftScore: number;
  priceRange: string;
  status: string;
  lastUpdated: string;
  author: string;
}

const reviewsData: ReviewItem[] = [
  { id: 1, title: "Seiko Presage SRPD37", slug: "seiko-presage-srpd37", giftScore: 9.2, priceRange: "$280–$320", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 2, title: "Orient Bambino V2", slug: "orient-bambino-v2", giftScore: 9.1, priceRange: "$130–$170", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 3, title: "Tissot PRX Powermatic 80", slug: "tissot-prx-powermatic-80", giftScore: 9.3, priceRange: "$450–$500", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 4, title: "Hamilton Khaki Field Mechanical", slug: "hamilton-khaki-field-mechanical", giftScore: 9.0, priceRange: "$400–$500", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 5, title: "Citizen Eco-Drive BM8180", slug: "citizen-eco-drive-bm8180", giftScore: 7.8, priceRange: "$75–$100", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 6, title: "Seiko 5 Sports SRPD55", slug: "seiko-5-srpd55", giftScore: 8.7, priceRange: "$200–$250", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 7, title: "Casio G-Shock GA2100", slug: "casio-g-shock-ga2100", giftScore: 7.5, priceRange: "$80–$110", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 8, title: "Bulova Lunar Pilot", slug: "bulova-lunar-pilot", giftScore: 8.6, priceRange: "$350–$450", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 9, title: "Timex Marlin Automatic", slug: "timex-marlin-automatic", giftScore: 8.2, priceRange: "$200–$250", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 10, title: "Tissot Gentleman Powermatic 80", slug: "tissot-gentleman-powermatic-80", giftScore: 9.4, priceRange: "$600–$700", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 11, title: "Fossil Neutra Chronograph", slug: "fossil-neutra-chronograph", giftScore: 7.4, priceRange: "$80–$120", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 12, title: "Tissot PRX", slug: "tissot-prx", giftScore: 9.0, priceRange: "$325–$375", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 13, title: "Hamilton Jazzmaster Open Heart", slug: "hamilton-jazzmaster-open-heart", giftScore: 9.1, priceRange: "$800–$1000", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
  { id: 14, title: "Longines Conquest Classic", slug: "longines-conquest-classic", giftScore: 9.2, priceRange: "$900–$1200", status: "Published", lastUpdated: "2026-03-16", author: "WristNerd Editorial" },
];

export default function ReviewsPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<ReviewItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("# Sample Review\n\nThis is a **markdown** preview for the review editor.\n\n## Quick Specs\n\n| Spec | Detail |\n|------|--------|\n| Movement | Automatic |\n| Case Size | 40mm |\n\n## Gift-Worthiness Score: 9.2/10\n\nThis watch excels in every category...");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const columns = [
    {
      key: "title",
      label: "Review",
      sortable: true,
      render: (item: ReviewItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">/reviews/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "giftScore",
      label: "Gift Score",
      sortable: true,
      render: (item: ReviewItem) => {
        const color = item.giftScore >= 9 ? "text-emerald-600 bg-emerald-50" : item.giftScore >= 8 ? "text-gold bg-gold/10" : "text-gray-600 bg-gray-100";
        return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{item.giftScore}/10</span>;
      },
    },
    {
      key: "priceRange",
      label: "Price",
      sortable: false,
      render: (item: ReviewItem) => <span className="text-sm text-gray-600">{item.priceRange}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: ReviewItem) => (
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}>
          {item.status}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      sortable: true,
      className: "hidden md:table-cell",
    },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Content", href: "/admin/content/reviews" }, { label: "Reviews" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">{reviewsData.length} watch reviews</p>
        </div>
        <button
          onClick={() => setEditModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Review
        </button>
      </div>

      <DataTable<ReviewItem>
        columns={columns}
        data={reviewsData}
        searchPlaceholder="Search reviews..."
        searchKeys={["title", "slug", "priceRange"]}
        pageSize={10}
        actions={(item) => (
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {activeMenu === item.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                  <button
                    onClick={() => { setEditModal(true); setActiveMenu(null); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <Link
                    href={`/reviews/${item.slug}`}
                    target="_blank"
                    onClick={() => setActiveMenu(null)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Live
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setDeleteConfirm(item); setActiveMenu(null); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      />

      {/* Edit/Create Modal */}
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        title="Edit Review"
        size="full"
        footer={
          <>
            <button
              onClick={() => setEditModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditModal(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy-light rounded-lg transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => setEditModal(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all"
            >
              Publish
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                defaultValue="Seiko 5 Sports SRPD55 Review"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">/reviews/</span>
                <input
                  type="text"
                  defaultValue="seiko-5-srpd55"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <MarkdownEditor value={editContent} onChange={setEditContent} />
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1.5">Pros</label>
                <textarea
                  defaultValue={"100m water resistance\nDay-date display\nSeiko 4R36 automatic\nRotating bezel\nMaximum versatility"}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 min-h-[120px] resize-y"
                  placeholder="One pro per line..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-1.5">Cons</label>
                <textarea
                  defaultValue={"Hardlex crystal (not sapphire)\n42.5mm case is large\nStock bracelet quality\n41-hour power reserve"}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 min-h-[120px] resize-y"
                  placeholder="One con per line..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Gift-Worthiness Score */}
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Gift-Worthiness Score</label>
              <div className="space-y-3">
                {[
                  { label: "Presentation", value: 7 },
                  { label: "Unboxing", value: 7 },
                  { label: "Wow Factor", value: 8 },
                  { label: "Versatility", value: 10 },
                  { label: "Price-to-Value", value: 10 },
                ].map((factor) => (
                  <div key={factor.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">{factor.label}</span>
                      <span className="font-bold text-navy">{factor.value}/10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      defaultValue={factor.value}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Overall</span>
                    <span className="text-lg font-bold text-gold">8.7/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price Range</label>
              <input
                type="text"
                defaultValue="$200–$250"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
              <input
                type="text"
                defaultValue="Seiko 5 Sports SRPD55 Review 2026 — Gift-Worthiness Score 8.7/10"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
              <textarea
                defaultValue="In-depth Seiko 5 Sports SRPD55 review. Automatic movement, 100m water resistance, day-date display, and an 8.7/10 Gift-Worthiness Score."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 min-h-[80px] resize-y"
              />
            </div>

            {/* Hero Image */}
            <ImageUploader label="Hero Image" />

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
              <input
                type="text"
                defaultValue="WristNerd Editorial Team"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => setDeleteConfirm(null)}
        title="Delete Review"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
