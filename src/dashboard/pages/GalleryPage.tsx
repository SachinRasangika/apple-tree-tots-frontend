import React, { useState } from 'react';
import { FileGallery } from '../components/FileGallery';
import { deleteFromSupabase } from '../../services/supabaseService';
import { ImageIcon, FileIcon } from 'lucide-react';

export function GalleryPage() {
  const [selectedFile, setSelectedFile] = useState<{ url: string; name: string } | null>(null);

  const handleDeleteFile = async (filePath: string, bucket: 'documents' | 'images') => {
    const success = await deleteFromSupabase(bucket, filePath);
    if (!success) {
      throw new Error('Failed to delete file');
    }
  };

  const handleImageClick = (url: string, name: string) => {
    setSelectedFile({ url, name });
  };

  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-serif mb-8">Gallery Management</h1>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-blue-400 text-white cursor-pointer">
            <ImageIcon size={20} />
            <span>Images</span>
          </div>
          <div className="flex items-center gap-2 pb-4 text-white/60 cursor-pointer hover:text-white transition">
            <FileIcon size={20} />
            <span>Documents</span>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="mb-12">
          <FileGallery
            bucket="images"
            title="Uploaded Images"
            onDelete={(filePath) => handleDeleteFile(filePath, 'images')}
            onImageClick={handleImageClick}
          />
        </div>

        {/* Documents Gallery */}
        <div className="mb-12">
          <FileGallery
            bucket="documents"
            title="Uploaded Documents"
            onDelete={(filePath) => handleDeleteFile(filePath, 'documents')}
          />
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#2d5555]/50 border border-white/20 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white truncate">
                {selectedFile.name}
              </h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-white/60 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-black/50 p-4">
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <a
                href={selectedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded text-center transition"
              >
                Open in New Tab
              </a>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedFile.url;
                  link.download = selectedFile.name;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
