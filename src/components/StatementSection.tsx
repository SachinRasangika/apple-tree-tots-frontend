import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export function StatementSection() {
  return <div
    className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden py-20 md:py-32"
  >
    <img src="/apple-tree-tots/images/gallery/Gemini_Generated_Image_gy7zfkgy7zfkgy7z.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/35"></div>
    <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
      {/* Vision Label */}
      <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white/70 block opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        Our Vision
      </span>

      {/* Main Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-widest uppercase font-light text-white opacity-0 animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
        Nurturing Confident,<br />Curious, and<br />Compassionate Learners
      </h2>

      {/* Divider */}
      <div className="w-16 h-1 bg-gradient-to-r from-white/50 via-white/30 to-transparent mx-auto opacity-0 animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '400ms' }}></div>

      {/* Vision Statement */}
      <p className="text-base md:text-lg font-light text-white/85 leading-relaxed max-w-3xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '600ms' }}>
        To nurture confident, curious, and compassionate learners who grow naturally through meaningful experiences in a calm, creative, and nature-inspired environment. At Apple Tree Tots, we envision a preschool where every child feels valued, capable, and connected to themselves, to others, and to the world around them.
      </p>

      {/* Divider line */}
      <div className="mt-12 h-16 w-px bg-white/30 mx-auto opacity-0 animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '800ms' }}></div>

      {/* Tagline */}
      <div className="flex items-center justify-center gap-4 pt-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '1000ms' }}>
        <div className="h-px w-12 bg-white/30"></div>
        <span className="text-xs tracking-widest uppercase text-white/60 font-light">Rooted in Nature, Rooted in Care</span>
        <div className="h-px w-12 bg-white/30"></div>
      </div>
    </div>
  </div>;
}
