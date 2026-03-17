"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  currentImage?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
}

export default function ImageUploader({
  label = "Upload Image",
  currentImage,
  onUpload,
  onRemove,
}: ImageUploaderProps) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, or WebP).");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB. Please choose a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") setPreview(result);
    };
    reader.onerror = () => setError("Failed to read the file. Please try again.");
    reader.readAsDataURL(file);
    onUpload?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove?.();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <div className="aspect-video flex items-center justify-center bg-gray-100">
            <div className="w-full h-full flex items-center justify-center p-4">
              <ImageIcon className="w-16 h-16 text-gray-300" />
            </div>
          </div>
          <button
            onClick={handleRemove}
            type="button"
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
            <p className="text-white text-xs truncate">Image uploaded</p>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-gold bg-gold/5"
              : "border-gray-200 hover:border-gold/50 hover:bg-gray-50"
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 font-medium">
            Drop an image here or <span className="text-gold">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
        </div>
      )}
      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
