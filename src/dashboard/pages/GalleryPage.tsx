import React from 'react';

export function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-serif mb-8">Gallery Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#2d5555]/10 border border-white/10 rounded overflow-hidden hover:border-white/20 transition">
              <div className="aspect-video bg-[#2d5555]/20 flex items-center justify-center">
                <span className="text-white/30">Image {i}</span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2">Gallery Image {i}</h3>
                <p className="text-xs text-white/50 mb-3">Uploaded on 2024-01-{10+i}</p>
                <button className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
