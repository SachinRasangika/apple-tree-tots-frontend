import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export function VisionSection() {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d5555]/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d5555]/3 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Label */}
        <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#2d5555] mb-8 block">
          Our Vision
        </span>
        
        {/* Main title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-widest uppercase mb-12 text-[#2A372F] leading-tight">
          Nurturing Confident,<br />Curious, and<br />Compassionate Learners
        </h2>
        
        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#2d5555] via-[#3d6666] to-transparent mx-auto mb-12"></div>
        
        {/* Vision statement */}
        <p className="text-lg md:text-xl font-light text-[#2A372F]/85 leading-relaxed mb-12 max-w-3xl mx-auto">
          To nurture confident, curious, and compassionate learners who grow naturally through meaningful experiences in a calm, creative, and nature-inspired environment. At Apple Tree Tots, we envision a preschool where every child feels valued, capable, and connected to themselves, to others, and to the world around them.
        </p>
        
        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#2d5555]/30"></div>
          <span className="text-xs tracking-widest uppercase text-[#2d5555]/60 font-semibold">Rooted in Nature, Rooted in Care</span>
          <div className="h-px w-12 bg-[#2d5555]/30"></div>
        </div>
      </div>
    </AnimatedSection>
  );
}
