import React, { useState } from 'react';
import { Download, Eye, Upload, X } from 'lucide-react';

interface DocumentFile {
  fileName?: string;
  fileUrl?: string;
  uploadedAt?: string;
  filePath?: string;
  size?: number;
}

interface DocumentCardProps {
  label: string;
  icon: string;
  document?: DocumentFile;
  docType: string;
  mode: 'view' | 'edit';
  onImageClick: (url: string) => void;
  onDownload: (url: string, name: string) => void;
  onUpload?: (docType: string, file: File) => Promise<void>;
  isUploading?: boolean;
}

export function DocumentCard({
  label,
  icon,
  document,
  docType,
  mode,
  onImageClick,
  onDownload,
  onUpload,
  isUploading = false,
}: DocumentCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!document?.fileUrl) return null;

  const isImage = document.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      try {
        await onUpload(docType, file);
        setIsEditing(false);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="border border-white/10 rounded-lg p-4 bg-[#2d5555]/20 hover:bg-[#2d5555]/30 transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          {label}
        </h4>
        {mode === 'edit' && (
          <button
            className="text-white/60 hover:text-white transition text-xs"
            onClick={() => setIsEditing(!isEditing)}
            title="Edit document"
          >
            <Upload size={16} />
          </button>
        )}
      </div>

      {/* Preview */}
      {isImage && (
        <div
          className="mb-3 cursor-pointer group relative overflow-hidden rounded bg-black/30"
          onClick={() => onImageClick(document.fileUrl!)}
        >
          <img
            src={document.fileUrl}
            alt={label}
            className="w-full h-40 object-cover group-hover:scale-105 transition"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition">
            <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>
      )}

      {/* File Info */}
      <div className="mb-3 text-xs text-white/60 break-all">
        <div>📁 {document.fileName || label}</div>
        {document.uploadedAt && (
          <div className="mt-1">📅 {new Date(document.uploadedAt).toLocaleDateString()}</div>
        )}
        {document.size && (
          <div className="mt-1">💾 {(document.size / 1024).toFixed(2)} KB</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onDownload(document.fileUrl!, document.fileName || label)}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded text-xs transition"
          title="Download document"
        >
          <Download size={14} />
          Download
        </button>
        {!isImage && (
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition"
            title="View in new tab"
          >
            <Eye size={14} />
            View
          </a>
        )}
      </div>

      {/* Edit Mode */}
      {mode === 'edit' && isEditing && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <label className="flex items-center gap-2 px-3 py-2 bg-[#2d5555]/50 hover:bg-[#2d5555]/70 rounded cursor-pointer transition text-white text-xs">
            <Upload size={14} />
            Replace Document
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              accept="image/*,.pdf"
            />
          </label>
          {isUploading && (
            <div className="mt-2 text-xs text-white/60">Uploading...</div>
          )}
          <button
            onClick={() => setIsEditing(false)}
            className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 text-white/60 hover:text-white text-xs transition"
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
