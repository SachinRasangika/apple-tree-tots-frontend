import React from 'react';
import { clsx } from 'clsx';
interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}
export function TeamMemberCard({
  name,
  role,
  bio,
  image
}: TeamMemberCardProps) {
  return <div className="group border border-white/10 p-4 md:p-6 hover:bg-white transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden mb-6 relative">
        <div className="absolute inset-0 bg-[#1a3a3a]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img src={image} alt={name} className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-serif text-xl tracking-widest uppercase mb-2 group-hover:text-[#1a3a3a] transition-colors duration-300">
          {name}
        </h3>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block group-hover:text-[#1a3a3a] transition-colors duration-300">
          {role}
        </span>
        <div className="h-px w-12 bg-white/20 group-hover:bg-gray-300 mb-4 group-hover:w-full transition-all duration-700" />
        <p className="text-sm font-light text-gray-300 leading-relaxed opacity-80 group-hover:opacity-100 group-hover:text-gray-700 transition-all duration-300">
          {bio}
        </p>
      </div>
    </div>;
}