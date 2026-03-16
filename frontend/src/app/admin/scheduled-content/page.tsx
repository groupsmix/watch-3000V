"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  CalendarClock,
  Clock,
  Send,
  MoreVertical,
  Calendar,
  List,
  CheckSquare,
  AlertTriangle,
  FileText,
  Star,
  PenSquare,
  BookOpen,
} from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import DataTable from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import StatsCard from "@/components/admin/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import ScheduleModal from "@/components/admin/ScheduleModal";
import ContentFormModal from "@/components/admin/ContentFormModal";
import CalendarView from "@/components/admin/CalendarView";

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------
export type ContentType = "Blog" | "Review" | "Guide" | "Comparison" | "Brand Spotlight";
export type ContentStatus = "Draft" | "Scheduled" | "Published";

export interface ScheduledContentItem {
  id: number;
  title: string;
  type: ContentType;
  slug: string;
  status: ContentStatus;
  author: string;
  scheduledAt: string | null;
  lastModified: string;
  createdAt: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  content: string;
  editedBy: string;
  editHistory: { user: string; action: string; timestamp: string }[];
  [key: string]: unknown;
}

// -------------------------------------------------------------------
// Mock data
// -------------------------------------------------------------------
const scheduledContentData: ScheduledContentItem[] = [
  {
    id: 1, title: "Seiko Presage Cocktail Time Deep Dive", type: "Review", slug: "seiko-presage-cocktail-time-deep-dive",
    status: "Scheduled", author: "WristNerd Editorial", scheduledAt: "2026-03-18T09:00:00Z", lastModified: "2026-03-16T08:30:00Z",
    createdAt: "2026-03-14T10:00:00Z", category: "Review", tags: ["seiko", "presage", "dress-watch"],
    metaTitle: "Seiko Presage Cocktail Time Review 2026", metaDescription: "In-depth review of the Seiko Presage Cocktail Time.",
    content: "# Seiko Presage Cocktail Time\n\nA stunning dress watch...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-14T10:00:00Z" }, { user: "Admin", action: "Scheduled", timestamp: "2026-03-16T08:30:00Z" }],
  },
  {
    id: 2, title: "Top 5 Watches Under $200 for 2026", type: "Blog", slug: "top-5-watches-under-200-2026",
    status: "Scheduled", author: "Editor Team", scheduledAt: "2026-03-19T14:00:00Z", lastModified: "2026-03-15T16:00:00Z",
    createdAt: "2026-03-12T09:00:00Z", category: "Guide", tags: ["budget", "gift-guide", "under-200"],
    metaTitle: "Top 5 Watches Under $200", metaDescription: "Discover the best affordable watches of 2026.",
    content: "# Top 5 Watches Under $200\n\nLooking for value?...", editedBy: "Editor",
    editHistory: [{ user: "Editor", action: "Created", timestamp: "2026-03-12T09:00:00Z" }, { user: "Admin", action: "Reviewed", timestamp: "2026-03-15T16:00:00Z" }],
  },
  {
    id: 3, title: "Hamilton Khaki Field vs Seiko 5 Sports", type: "Comparison", slug: "hamilton-khaki-vs-seiko-5",
    status: "Draft", author: "WristNerd Editorial", scheduledAt: null, lastModified: "2026-03-16T10:00:00Z",
    createdAt: "2026-03-15T12:00:00Z", category: "Comparison", tags: ["hamilton", "seiko", "field-watch"],
    metaTitle: "Hamilton Khaki Field vs Seiko 5 Sports", metaDescription: "Head-to-head comparison of two iconic field watches.",
    content: "# Hamilton vs Seiko 5\n\nTwo titans of the field watch world...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-15T12:00:00Z" }],
  },
  {
    id: 4, title: "Watch Care & Maintenance Guide", type: "Guide", slug: "watch-care-maintenance-guide",
    status: "Scheduled", author: "Editor Team", scheduledAt: "2026-03-20T10:00:00Z", lastModified: "2026-03-14T11:00:00Z",
    createdAt: "2026-03-10T08:00:00Z", category: "Guide", tags: ["maintenance", "care", "how-to"],
    metaTitle: "Complete Watch Care Guide 2026", metaDescription: "Everything you need to know about caring for your timepiece.",
    content: "# Watch Care Guide\n\nKeep your watch in perfect condition...", editedBy: "Editor",
    editHistory: [{ user: "Editor", action: "Created", timestamp: "2026-03-10T08:00:00Z" }, { user: "Editor", action: "Scheduled", timestamp: "2026-03-14T11:00:00Z" }],
  },
  {
    id: 5, title: "Orient Bambino Gen 2 — Full Review", type: "Review", slug: "orient-bambino-gen-2-review",
    status: "Published", author: "WristNerd Editorial", scheduledAt: "2026-03-15T09:00:00Z", lastModified: "2026-03-15T09:00:00Z",
    createdAt: "2026-03-08T14:00:00Z", category: "Review", tags: ["orient", "bambino", "dress-watch"],
    metaTitle: "Orient Bambino Gen 2 Review 2026", metaDescription: "The best dress watch under $200?",
    content: "# Orient Bambino Gen 2\n\nA classic dress watch...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-08T14:00:00Z" }, { user: "Admin", action: "Published", timestamp: "2026-03-15T09:00:00Z" }],
  },
  {
    id: 6, title: "Tissot Brand Spotlight", type: "Brand Spotlight", slug: "tissot-brand-spotlight",
    status: "Draft", author: "Editor Team", scheduledAt: null, lastModified: "2026-03-16T07:00:00Z",
    createdAt: "2026-03-13T10:00:00Z", category: "Brand", tags: ["tissot", "swiss", "brand-spotlight"],
    metaTitle: "Tissot: Swiss Watchmaking Excellence", metaDescription: "Everything about Tissot watches.",
    content: "# Tissot Brand Spotlight\n\nFounded in 1853...", editedBy: "Editor",
    editHistory: [{ user: "Editor", action: "Created", timestamp: "2026-03-13T10:00:00Z" }],
  },
  {
    id: 7, title: "Best Watches for Graduation Gifts", type: "Blog", slug: "best-watches-graduation-gifts",
    status: "Scheduled", author: "WristNerd Editorial", scheduledAt: "2026-03-22T08:00:00Z", lastModified: "2026-03-15T14:00:00Z",
    createdAt: "2026-03-11T09:00:00Z", category: "Gift Guide", tags: ["graduation", "gift", "milestone"],
    metaTitle: "Best Graduation Gift Watches 2026", metaDescription: "Top watches to gift for graduation.",
    content: "# Graduation Gift Watches\n\nCelebrate with a timeless gift...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-11T09:00:00Z" }, { user: "Admin", action: "Scheduled", timestamp: "2026-03-15T14:00:00Z" }],
  },
  {
    id: 8, title: "Casio G-Shock Buying Guide", type: "Guide", slug: "casio-g-shock-buying-guide",
    status: "Draft", author: "Editor Team", scheduledAt: null, lastModified: "2026-03-16T06:00:00Z",
    createdAt: "2026-03-09T11:00:00Z", category: "Guide", tags: ["casio", "g-shock", "buying-guide"],
    metaTitle: "G-Shock Buying Guide 2026", metaDescription: "Navigate the world of G-Shock watches.",
    content: "# G-Shock Buying Guide\n\nBuilt to last...", editedBy: "Editor",
    editHistory: [{ user: "Editor", action: "Created", timestamp: "2026-03-09T11:00:00Z" }],
  },
  {
    id: 9, title: "Why Automatic Watches Make Better Gifts", type: "Blog", slug: "why-automatic-watches-better-gifts",
    status: "Published", author: "WristNerd Editorial", scheduledAt: "2026-03-14T10:00:00Z", lastModified: "2026-03-14T10:00:00Z",
    createdAt: "2026-03-07T08:00:00Z", category: "Lifestyle", tags: ["automatic", "gift", "guide"],
    metaTitle: "Why Automatic Watches Make Better Gifts", metaDescription: "The charm of mechanical movement.",
    content: "# Why Automatic Watches Make Better Gifts\n\nThere is something special...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-07T08:00:00Z" }, { user: "Admin", action: "Published", timestamp: "2026-03-14T10:00:00Z" }],
  },
  {
    id: 10, title: "Longines Heritage Collection Overview", type: "Review", slug: "longines-heritage-collection-overview",
    status: "Scheduled", author: "WristNerd Editorial", scheduledAt: "2026-03-21T12:00:00Z", lastModified: "2026-03-16T09:00:00Z",
    createdAt: "2026-03-13T15:00:00Z", category: "Review", tags: ["longines", "heritage", "luxury"],
    metaTitle: "Longines Heritage Collection 2026", metaDescription: "Exploring the storied Heritage collection.",
    content: "# Longines Heritage\n\nTimeless elegance...", editedBy: "Admin",
    editHistory: [{ user: "Admin", action: "Created", timestamp: "2026-03-13T15:00:00Z" }, { user: "Admin", action: "Scheduled", timestamp: "2026-03-16T09:00:00Z" }],
  },
];

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------
const STATUS_STYLES: Record<ContentStatus, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Scheduled: "bg-blue-50 text-blue-700",
  Published: "bg-emerald-50 text-emerald-700",
};

const TYPE_ICONS: Record<ContentType, React.ReactNode> = {
  Blog: <PenSquare className="w-4 h-4 text-indigo-600" />,
  Review: <Star className="w-4 h-4 text-gold" />,
  Guide: <BookOpen className="w-4 h-4 text-emerald-600" />,
  Comparison: <FileText className="w-4 h-4 text-purple-600" />,
  "Brand Spotlight": <FileText className="w-4 h-4 text-rose-600" />,
};

const TYPE_BG: Record<ContentType, string> = {
  Blog: "from-indigo-100 to-indigo-50",
  Review: "from-gold/10 to-gold/5",
  Guide: "from-emerald-100 to-emerald-50",
  Comparison: "from-purple-100 to-purple-50",
  "Brand Spotlight": "from-rose-100 to-rose-50",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function isWithinNextDays(iso: string | null, days: number): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return diff > 0 && diff <= days * 24 * 60 * 60 * 1000;
}

// -------------------------------------------------------------------
// Component
// -------------------------------------------------------------------
export default function ScheduledContentPage() {
  const { user } = useAuth();

  // Access control: only admin and editor
  const hasAccess = user && (user.role === "admin" || user.role === "editor");
  const isAdmin = user?.role === "admin";

  const [items, setItems] = useState<ScheduledContentItem[]>(scheduledContentData);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [filterType, setFilterType] = useState<ContentType | "All">("All");
  const [filterStatus, setFilterStatus] = useState<ContentStatus | "All">("All");
  const [filterAuthor, setFilterAuthor] = useState<string>("All");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Modals
  const [deleteConfirm, setDeleteConfirm] = useState<ScheduledContentItem | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [scheduleModal, setScheduleModal] = useState<ScheduledContentItem | null>(null);
  const [bulkScheduleModal, setBulkScheduleModal] = useState(false);
  const [contentFormModal, setContentFormModal] = useState<{ mode: "create" | "edit"; item?: ScheduledContentItem } | null>(null);
  const [previewModal, setPreviewModal] = useState<ScheduledContentItem | null>(null);
  const [auditModal, setAuditModal] = useState<ScheduledContentItem | null>(null);
  const [slugConflict, setSlugConflict] = useState<string | null>(null);

  // Derived data
  const authors = useMemo(() => [...new Set(items.map((i) => i.author))], [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterType !== "All" && item.type !== filterType) return false;
      if (filterStatus !== "All" && item.status !== filterStatus) return false;
      if (filterAuthor !== "All" && item.author !== filterAuthor) return false;
      return true;
    });
  }, [items, filterType, filterStatus, filterAuthor]);

  const stats = useMemo(() => ({
    total: items.length,
    drafts: items.filter((i) => i.status === "Draft").length,
    scheduled: items.filter((i) => i.status === "Scheduled").length,
    published: items.filter((i) => i.status === "Published").length,
    upcoming7Days: items.filter((i) => i.status === "Scheduled" && isWithinNextDays(i.scheduledAt, 7)).length,
  }), [items]);

  // Handlers
  const handleDelete = useCallback((item: ScheduledContentItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedIds((prev) => { const next = new Set(prev); next.delete(item.id); return next; });
  }, []);

  const handleBulkDelete = useCallback(() => {
    setItems((prev) => prev.filter((i) => !selectedIds.has(i.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleSchedule = useCallback((item: ScheduledContentItem, date: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, scheduledAt: date, status: "Scheduled" as ContentStatus, lastModified: new Date().toISOString(),
              editHistory: [...i.editHistory, { user: user?.name || "Unknown", action: "Scheduled", timestamp: new Date().toISOString() }] }
          : i
      )
    );
  }, [user]);

  const handleBulkSchedule = useCallback((date: string) => {
    setItems((prev) =>
      prev.map((i) =>
        selectedIds.has(i.id)
          ? { ...i, scheduledAt: date, status: "Scheduled" as ContentStatus, lastModified: new Date().toISOString(),
              editHistory: [...i.editHistory, { user: user?.name || "Unknown", action: "Bulk Scheduled", timestamp: new Date().toISOString() }] }
          : i
      )
    );
    setSelectedIds(new Set());
  }, [selectedIds, user]);

  const handlePublishNow = useCallback((item: ScheduledContentItem) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, status: "Published" as ContentStatus, scheduledAt: new Date().toISOString(), lastModified: new Date().toISOString(),
              editHistory: [...i.editHistory, { user: user?.name || "Unknown", action: "Published (manual)", timestamp: new Date().toISOString() }] }
          : i
      )
    );
  }, [user]);

  const handleBulkPublish = useCallback(() => {
    setItems((prev) =>
      prev.map((i) =>
        selectedIds.has(i.id)
          ? { ...i, status: "Published" as ContentStatus, scheduledAt: new Date().toISOString(), lastModified: new Date().toISOString(),
              editHistory: [...i.editHistory, { user: user?.name || "Unknown", action: "Bulk Published", timestamp: new Date().toISOString() }] }
          : i
      )
    );
    setSelectedIds(new Set());
  }, [selectedIds, user]);

  const handleDuplicate = useCallback((item: ScheduledContentItem) => {
    const newSlug = `${item.slug}-copy`;
    const conflict = items.some((i) => i.slug === newSlug);
    if (conflict) {
      setSlugConflict(newSlug);
    }
    const newItem: ScheduledContentItem = {
      ...item,
      id: Math.max(...items.map((i) => i.id)) + 1,
      title: `${item.title} (Copy)`,
      slug: conflict ? `${newSlug}-${Date.now()}` : newSlug,
      status: "Draft",
      scheduledAt: null,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      editedBy: user?.name || "Unknown",
      editHistory: [{ user: user?.name || "Unknown", action: "Duplicated from #" + item.id, timestamp: new Date().toISOString() }],
    };
    setItems((prev) => [newItem, ...prev]);
  }, [items, user]);

  const handleSaveContent = useCallback((data: Partial<ScheduledContentItem>) => {
    if (contentFormModal?.mode === "edit" && contentFormModal.item) {
      // Check slug conflicts for edits
      const conflicting = items.find((i) => i.slug === data.slug && i.id !== contentFormModal.item!.id);
      if (conflicting) {
        setSlugConflict(data.slug || "");
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.id === contentFormModal.item!.id
            ? { ...i, ...data, lastModified: new Date().toISOString(),
                editHistory: [...i.editHistory, { user: user?.name || "Unknown", action: "Edited", timestamp: new Date().toISOString() }] }
            : i
        )
      );
    } else {
      // Check slug conflicts for new content
      const conflicting = items.find((i) => i.slug === data.slug);
      if (conflicting) {
        setSlugConflict(data.slug || "");
        return;
      }
      const newItem: ScheduledContentItem = {
        id: Math.max(0, ...items.map((i) => i.id)) + 1,
        title: data.title || "Untitled",
        type: (data.type as ContentType) || "Blog",
        slug: data.slug || "untitled",
        status: "Draft",
        author: user?.name || "Unknown",
        scheduledAt: null,
        lastModified: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        category: data.category || "",
        tags: data.tags || [],
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        content: data.content || "",
        editedBy: user?.name || "Unknown",
        editHistory: [{ user: user?.name || "Unknown", action: "Created", timestamp: new Date().toISOString() }],
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setContentFormModal(null);
  }, [contentFormModal, items, user]);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
    }
  }, [selectedIds, filteredItems]);

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Access guard
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-navy font-heading mb-2">Access Denied</h2>
        <p className="text-sm text-gray-500 max-w-sm">Only Admin and Editor roles can access Scheduled Content. Contact your administrator for access.</p>
      </div>
    );
  }

  // Table columns
  const columns = [
    {
      key: "select",
      label: "",
      className: "w-10",
      render: (item: ScheduledContentItem) => (
        <input
          type="checkbox"
          checked={selectedIds.has(item.id)}
          onChange={() => toggleSelect(item.id)}
          className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold/30 cursor-pointer"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (item: ScheduledContentItem) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${TYPE_BG[item.type]} flex items-center justify-center shrink-0`}>
            {TYPE_ICONS[item.type]}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{item.title}</p>
            <p className="text-xs text-gray-400 truncate">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (item: ScheduledContentItem) => (
        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{item.type}</span>
      ),
      className: "hidden md:table-cell",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: ScheduledContentItem) => (
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[item.status]}`}>
          {item.status}
        </span>
      ),
    },
    {
      key: "author",
      label: "Author",
      sortable: true,
      className: "hidden lg:table-cell",
      render: (item: ScheduledContentItem) => <span className="text-sm text-gray-600">{item.author}</span>,
    },
    {
      key: "scheduledAt",
      label: "Scheduled Date",
      sortable: true,
      render: (item: ScheduledContentItem) => (
        <span className="text-sm text-gray-600 tabular-nums whitespace-nowrap">
          {item.scheduledAt ? formatDateTime(item.scheduledAt) : <span className="text-gray-400 italic">Not set</span>}
        </span>
      ),
      className: "hidden sm:table-cell",
    },
  ];

  // Filter component
  const filterComponent = (
    <div className="flex flex-wrap gap-2">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as ContentType | "All")}
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
      >
        <option value="All">All Types</option>
        <option value="Blog">Blog</option>
        <option value="Review">Review</option>
        <option value="Guide">Guide</option>
        <option value="Comparison">Comparison</option>
        <option value="Brand Spotlight">Brand Spotlight</option>
      </select>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as ContentStatus | "All")}
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
      >
        <option value="All">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Published">Published</option>
      </select>
      <select
        value={filterAuthor}
        onChange={(e) => setFilterAuthor(e.target.value)}
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
      >
        <option value="All">All Authors</option>
        {authors.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Scheduled Content" }]} />

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Scheduled Content</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, schedule, and publish your content drafts</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setContentFormModal({ mode: "create" })}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Draft
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatsCard title="Total" value={stats.total} icon={<FileText className="w-5 h-5" />} />
        <StatsCard title="Drafts" value={stats.drafts} icon={<Edit className="w-5 h-5" />} iconColor="bg-gray-100 text-gray-600" />
        <StatsCard title="Scheduled" value={stats.scheduled} icon={<CalendarClock className="w-5 h-5" />} iconColor="bg-blue-50 text-blue-600" />
        <StatsCard title="Published" value={stats.published} icon={<CheckSquare className="w-5 h-5" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Next 7 Days" value={stats.upcoming7Days} icon={<Clock className="w-5 h-5" />} iconColor="bg-amber-50 text-amber-600" change="upcoming" changeType="neutral" />
      </div>

      {/* View toggle + Bulk actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Table
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Calendar
            </button>
          </div>

          {/* Bulk actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
              <span className="text-xs text-gray-500 font-medium">{selectedIds.size} selected</span>
              <button
                onClick={() => setBulkScheduleModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <CalendarClock className="w-3 h-3" />
                Schedule
              </button>
              <button
                onClick={handleBulkPublish}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <Send className="w-3 h-3" />
                Publish
              </button>
              {isAdmin && (
                <button
                  onClick={() => setBulkDeleteConfirm(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        {/* Select all checkbox for table view */}
        {viewMode === "table" && (
          <button
            onClick={toggleSelectAll}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            {selectedIds.size === filteredItems.length ? "Deselect All" : "Select All"}
          </button>
        )}
      </div>

      {/* Content view */}
      {viewMode === "table" ? (
        <DataTable<ScheduledContentItem>
          columns={columns}
          data={filteredItems}
          searchPlaceholder="Search by title or keywords..."
          searchKeys={["title", "slug", "category", "author"]}
          pageSize={10}
          filterComponent={filterComponent}
          emptyMessage="No scheduled content found. Create a new draft to get started."
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
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                    <button
                      onClick={() => { setContentFormModal({ mode: "edit", item }); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => { setPreviewModal(item); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button
                      onClick={() => { setScheduleModal(item); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <CalendarClock className="w-3.5 h-3.5" /> {item.status === "Scheduled" ? "Reschedule" : "Schedule"}
                    </button>
                    {item.status !== "Published" && (
                      <button
                        onClick={() => { handlePublishNow(item); setActiveMenu(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50"
                      >
                        <Send className="w-3.5 h-3.5" /> Publish Now
                      </button>
                    )}
                    <button
                      onClick={() => { handleDuplicate(item); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Copy className="w-3.5 h-3.5" /> Duplicate
                    </button>
                    <button
                      onClick={() => { setAuditModal(item); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Clock className="w-3.5 h-3.5" /> Audit Trail
                    </button>
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => { setDeleteConfirm(item); setActiveMenu(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        />
      ) : (
        <div className="mb-4">{filterComponent}</div>
      )}

      {viewMode === "calendar" && (
        <CalendarView
          items={filteredItems}
          onItemClick={(item) => setContentFormModal({ mode: "edit", item })}
          onSchedule={(item) => setScheduleModal(item)}
        />
      )}

      {/* Upcoming content (next 7 days) */}
      {stats.upcoming7Days > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-900">Upcoming — Next 7 Days</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {items
              .filter((i) => i.status === "Scheduled" && isWithinNextDays(i.scheduledAt, 7))
              .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
              .map((item) => (
                <div key={item.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${TYPE_BG[item.type]} flex items-center justify-center shrink-0`}>
                    {TYPE_ICONS[item.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.type} &middot; {item.author}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-medium shrink-0">
                    <CalendarClock className="w-3 h-3" />
                    {formatDate(item.scheduledAt)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ---- Modals ---- */}

      {/* Single delete */}
      <ConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => { if (deleteConfirm) handleDelete(deleteConfirm); setDeleteConfirm(null); }}
        title="Delete Content"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />

      {/* Bulk delete */}
      <ConfirmDialog
        open={bulkDeleteConfirm}
        onClose={() => setBulkDeleteConfirm(false)}
        onConfirm={() => { handleBulkDelete(); setBulkDeleteConfirm(false); }}
        title="Delete Selected Content"
        message={`Are you sure you want to delete ${selectedIds.size} item(s)? This action cannot be undone.`}
        confirmLabel="Delete All"
        variant="danger"
      />

      {/* Schedule single */}
      {scheduleModal && (
        <ScheduleModal
          open={!!scheduleModal}
          onClose={() => setScheduleModal(null)}
          item={scheduleModal}
          onSchedule={(date) => { handleSchedule(scheduleModal, date); setScheduleModal(null); }}
        />
      )}

      {/* Schedule bulk */}
      <ScheduleModal
        open={bulkScheduleModal}
        onClose={() => setBulkScheduleModal(false)}
        bulkCount={selectedIds.size}
        onSchedule={(date) => { handleBulkSchedule(date); setBulkScheduleModal(false); }}
      />

      {/* Content form (create / edit) */}
      {contentFormModal && (
        <ContentFormModal
          open={!!contentFormModal}
          onClose={() => setContentFormModal(null)}
          mode={contentFormModal.mode}
          item={contentFormModal.item}
          onSave={handleSaveContent}
          existingSlugs={items.filter((i) => i.id !== contentFormModal.item?.id).map((i) => i.slug)}
        />
      )}

      {/* Preview */}
      <Modal
        open={!!previewModal}
        onClose={() => setPreviewModal(null)}
        title={`Preview: ${previewModal?.title || ""}`}
        size="xl"
      >
        {previewModal && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[previewModal.status]}`}>{previewModal.status}</span>
              <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{previewModal.type}</span>
              {previewModal.scheduledAt && (
                <span className="px-2.5 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700">
                  {formatDateTime(previewModal.scheduledAt)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p><strong className="text-gray-600">Slug:</strong> /{previewModal.slug}</p>
              <p><strong className="text-gray-600">Author:</strong> {previewModal.author}</p>
              <p><strong className="text-gray-600">Category:</strong> {previewModal.category}</p>
              <p><strong className="text-gray-600">Tags:</strong> {previewModal.tags.join(", ") || "None"}</p>
              <p><strong className="text-gray-600">Meta Title:</strong> {previewModal.metaTitle}</p>
              <p><strong className="text-gray-600">Meta Description:</strong> {previewModal.metaDescription}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-xl max-h-[40vh] overflow-y-auto">
                {previewModal.content}
              </pre>
            </div>
          </div>
        )}
      </Modal>

      {/* Audit trail */}
      <Modal
        open={!!auditModal}
        onClose={() => setAuditModal(null)}
        title={`Audit Trail: ${auditModal?.title || ""}`}
        size="md"
      >
        {auditModal && (
          <div className="space-y-1">
            {auditModal.editHistory.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No history available</p>
            ) : (
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-1 bottom-1 w-px bg-gray-200" />
                {auditModal.editHistory.map((entry, i) => (
                  <div key={i} className="relative pb-4 last:pb-0">
                    <div className="absolute left-[-14px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-gold" />
                    <p className="text-sm text-gray-700 font-medium">{entry.action}</p>
                    <p className="text-xs text-gray-400">
                      by {entry.user} &middot; {formatDateTime(entry.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Slug conflict alert */}
      <ConfirmDialog
        open={!!slugConflict}
        onClose={() => setSlugConflict(null)}
        onConfirm={() => setSlugConflict(null)}
        title="Slug Conflict Detected"
        message={`The slug "${slugConflict}" already exists. A unique slug has been auto-generated. Please review and update it if needed.`}
        confirmLabel="OK"
        variant="warning"
      />
    </div>
  );
}
