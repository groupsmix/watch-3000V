"use client";

import { useState } from "react";
import { Eye, Code, Bold, Italic, List, ListOrdered, Link2, Image, Heading1, Heading2 } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#markdown-editor");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const newValue =
      value.substring(0, start) + prefix + selected + suffix + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const toolbar = [
    { icon: <Heading1 className="w-4 h-4" />, action: () => insertMarkdown("# "), title: "Heading 1" },
    { icon: <Heading2 className="w-4 h-4" />, action: () => insertMarkdown("## "), title: "Heading 2" },
    { icon: <Bold className="w-4 h-4" />, action: () => insertMarkdown("**", "**"), title: "Bold" },
    { icon: <Italic className="w-4 h-4" />, action: () => insertMarkdown("*", "*"), title: "Italic" },
    { icon: <List className="w-4 h-4" />, action: () => insertMarkdown("- "), title: "Bullet List" },
    { icon: <ListOrdered className="w-4 h-4" />, action: () => insertMarkdown("1. "), title: "Numbered List" },
    { icon: <Link2 className="w-4 h-4" />, action: () => insertMarkdown("[", "](url)"), title: "Link" },
    { icon: <Image className="w-4 h-4" />, action: () => insertMarkdown("![alt](", ")"), title: "Image" },
  ];

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const isSafeUrl = (url: string): boolean => {
    const decoded = url.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    const trimmed = decoded.replace(/\s/g, "").toLowerCase();
    return !(
      trimmed.startsWith("javascript:") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("vbscript:")
    );
  };

  const renderPreview = (md: string) => {
    // Escape raw HTML first to prevent XSS, then apply markdown transformations
    const html = escapeHtml(md)
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-navy mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-navy mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-navy mt-6 mb-3">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-gray-600">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-gray-600">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, (_match: string, text: string, url: string) =>
        isSafeUrl(url) ? `<a href="${url}" class="text-gold underline">${text}</a>` : text
      )
      .replace(/^---$/gim, '<hr class="my-4 border-gray-200" />')
      .replace(/\n\n/g, '</p><p class="text-gray-600 mb-3 leading-relaxed">')
      .replace(/\n/g, "<br />");

    return `<div class="prose max-w-none"><p class="text-gray-600 mb-3 leading-relaxed">${html}</p></div>`;
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 bg-gray-50">
        <div className="flex items-center gap-0.5">
          {toolbar.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              title={item.title}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              type="button"
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => setMode("write")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "write" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            type="button"
          >
            <Code className="w-3.5 h-3.5" />
            Write
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "preview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            type="button"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {mode === "write" ? (
        <textarea
          id="markdown-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[400px] p-4 text-sm text-gray-700 font-mono leading-relaxed resize-y focus:outline-none placeholder:text-gray-400"
        />
      ) : (
        <div
          className="min-h-[400px] p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
        />
      )}
    </div>
  );
}
