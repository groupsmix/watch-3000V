"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import MarkdownEditor from "./MarkdownEditor";

type ContentType = "Blog" | "Review" | "Guide" | "Comparison" | "Brand Spotlight";

interface ContentFormItem {
  id?: number;
  title: string;
  type: ContentType;
  slug: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  content: string;
}

interface ContentFormModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  item?: ContentFormItem;
  onSave: (data: Partial<ContentFormItem>) => void;
  existingSlugs: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ContentFormModal({
  open,
  onClose,
  mode,
  item,
  onSave,
  existingSlugs,
}: ContentFormModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContentType>("Blog");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [slugConflict, setSlugConflict] = useState(false);

  useEffect(() => {
    if (mode === "edit" && item) {
      setTitle(item.title);
      setType(item.type);
      setSlug(item.slug);
      setAutoSlug(false);
      setCategory(item.category);
      setTagsInput(item.tags.join(", "));
      setMetaTitle(item.metaTitle);
      setMetaDescription(item.metaDescription);
      setContent(item.content);
    } else {
      setTitle("");
      setType("Blog");
      setSlug("");
      setAutoSlug(true);
      setCategory("");
      setTagsInput("");
      setMetaTitle("");
      setMetaDescription("");
      setContent("");
    }
    setSlugConflict(false);
  }, [mode, item, open]);

  useEffect(() => {
    if (autoSlug && title) {
      const generated = slugify(title);
      setSlug(generated);
      setSlugConflict(existingSlugs.includes(generated));
    }
  }, [title, autoSlug, existingSlugs]);

  useEffect(() => {
    setSlugConflict(existingSlugs.includes(slug));
  }, [slug, existingSlugs]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      type,
      slug: slug || slugify(title),
      category,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      metaTitle,
      metaDescription,
      content,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "New Content Draft" : `Edit: ${item?.title || ""}`}
      size="full"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || slugConflict}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "create" ? "Create Draft" : "Save Changes"}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(slugify(e.target.value)); setAutoSlug(false); }}
                  placeholder="auto-generated-slug"
                  className={`flex-1 px-3 py-2 border rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 ${
                    slugConflict ? "border-red-300 focus:ring-red-200 focus:border-red-400" : "border-gray-200 focus:border-gold/50"
                  }`}
                />
              </div>
              {!autoSlug && (
                <button
                  onClick={() => { setAutoSlug(true); setSlug(slugify(title)); }}
                  className="text-xs text-gold hover:text-gold-dark font-medium whitespace-nowrap"
                >
                  Auto
                </button>
              )}
            </div>
            {slugConflict && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                This slug already exists. Please use a unique slug.
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <MarkdownEditor value={content} onChange={setContent} placeholder="Write your content in Markdown..." />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white"
            >
              <option value="Blog">Blog</option>
              <option value="Review">Review</option>
              <option value="Guide">Guide</option>
              <option value="Comparison">Comparison</option>
              <option value="Brand Spotlight">Brand Spotlight</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Guide, Lifestyle, News"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/60 characters</p>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO description..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 min-h-[80px] resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">{metaDescription.length}/160 characters</p>
          </div>

          {/* Affiliate Links Placeholder */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Affiliate Links</label>
            <p className="text-xs text-gray-400">Affiliate link placeholders will be auto-populated from the affiliate manager based on product mentions in the content.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
