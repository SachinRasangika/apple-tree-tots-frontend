import React, { useEffect, useState } from 'react';
import { listFilesFromSupabase } from '../../services/supabaseService';
import { Download, Eye, Trash2, Loader } from 'lucide-react';

interface FileWithUrl {
  name: string;
  id: string;
  updated_at: string;
  url: string;
  isImage: boolean;
}

interface FileGalleryProps {
  bucket: 'documents' | 'images';
  title?: string;
  onDelete?: (filePath: string) => Promise<void>;
  onImageClick?: (url: string, name: string) => void;
}

export function FileGallery({
  bucket,
  title = bucket === 'images' ? 'Images' : 'Documents',
  onDelete,
  onImageClick,
}: FileGalleryProps) {
  const [files, setFiles] = useState<FileWithUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFiles();
  }, [bucket]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const fileList = await listFilesFromSupabase(bucket);
      setFiles(fileList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (file: FileWithUrl) => {
    if (!onDelete || !window.confirm(`Delete ${file.name}?`)) return;

    const filePath = `uploads/${file.name}`;
    setDeletingFiles((prev) => new Set([...prev, filePath]));

    try {
      await onDelete(filePath);
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file');
    } finally {
      setDeletingFiles((prev) => {
        const next = new Set(prev);
        next.delete(filePath);
        return next;
      });
    }
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/60">{files.length} files uploaded</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded text-red-300">
          {error}
        </div>
      )}

      {files.length === 0 ? (
        <div className="text-center py-12 border border-white/10 rounded-lg bg-white/5">
          <p className="text-white/60">No files uploaded yet</p>
        </div>
      ) : bucket === 'images' ? (
        // Image Gallery
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition"
            >
              {file.isImage && (
                <div
                  className="relative overflow-hidden bg-black/30 cursor-pointer group"
                  onClick={() => onImageClick?.(file.url, file.name)}
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
                    <Eye size={24} className="text-white opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-xs text-white/60 truncate mb-2">{file.name}</p>
                <p className="text-xs text-white/40 mb-3">
                  {new Date(file.updated_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(file.url, file.name)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded text-xs transition"
                    title="Download"
                  >
                    <Download size={12} />
                    Download
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => handleDelete(file)}
                      disabled={deletingFiles.has(`uploads/${file.name}`)}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded text-xs transition disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Document List
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{file.name}</p>
                <p className="text-xs text-white/60">
                  {new Date(file.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleDownload(file.url, file.name)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded text-xs transition"
                  title="Download"
                >
                  <Download size={14} />
                  Download
                </button>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition"
                  title="View"
                >
                  <Eye size={14} />
                  View
                </a>
                {onDelete && (
                  <button
                    onClick={() => handleDelete(file)}
                    disabled={deletingFiles.has(`uploads/${file.name}`)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded text-xs transition disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
