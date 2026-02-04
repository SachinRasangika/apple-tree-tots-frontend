import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { 
  PaintBrushSVG, 
  PaintSplatterSVG, 
  ColorDotsSVG, 
  EaselSVG, 
  MarkersSVG,
  CrayonsSVG,
  PaletteSVG 
} from './PreschoolSVGs';
import { Palette, Brush, Sparkles } from 'lucide-react';

interface ArtActivityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  svgElement?: React.ReactNode;
}

function ArtActivityCard({
  icon,
  title,
  description,
  delay,
  svgElement
}: ArtActivityProps) {
  return (
    <div
      className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 p-8 rounded-2xl hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] flex flex-col items-center text-center"
      style={{ animationDelay: delay }}
    >
      {/* SVG Art Element or Icon */}
      {svgElement ? (
        <div className="mb-6 transition-all duration-300" style={{ animation: 'none' }}>
          <div className="group-hover:animate-[rotate_3s_linear_infinite] transition-all">
            {svgElement}
          </div>
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-[#2A372F] flex items-center justify-center text-[#CDD1CB] mb-6 group-hover:bg-[#1a2720] transition-all duration-300">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-3 text-[#2A372F] group-hover:text-[#1a2720] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-[#2A372F]/70 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

export function ArtAndCreativitySection() {
  const artActivities = [
    {
      title: 'Painting & Drawing',
      description: 'Express creativity through colors, brushstrokes, and imaginative designs',
      delay: '0ms',
      svgElement: <PaintBrushSVG size={60} />
    },
    {
      title: 'Colorful Creation',
      description: 'Mix colors, explore palettes, and discover artistic possibilities',
      delay: '100ms',
      svgElement: <PaletteSVG size={60} />
    },
    {
      title: 'Marker Masterpiece',
      description: 'Vibrant markers bring stories to life with bold, bright colors',
      delay: '200ms',
      svgElement: <MarkersSVG size={60} />
    },
    {
      title: 'Crayon Creations',
      description: 'Waxy colors that glide smoothly for endless artistic adventures',
      delay: '300ms',
      svgElement: <CrayonsSVG size={60} />
    },
    {
      title: 'Paint Splashing',
      description: 'Make bold, expressive marks and celebrate artistic freedom',
      delay: '400ms',
      svgElement: <PaintSplatterSVG size={60} />
    },
    {
      title: 'Easel Adventures',
      description: 'Create masterpieces on the easel for the whole class to admire',
      delay: '500ms',
      svgElement: <EaselSVG size={60} />
    }
  ];

  return (
    <AnimatedSection 
      className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block relative" 
      animation="fade-in-up"
    >
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 opacity-10 pointer-events-none animate-[pulse_4s_ease-in-out_infinite]">
        <ColorDotsSVG size={100} />
      </div>
      <div className="absolute bottom-32 left-5 opacity-10 pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
        <PaintSplatterSVG size={120} />
      </div>

      {/* Section Header */}
      <div className="mb-16 text-center relative z-10">
        <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block opacity-0 animate-[fadeInDown_0.6s_ease-out_forwards]">
          Creative Expression
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F] opacity-0 animate-[fadeInDown_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
          Art &amp; <span className="italic opacity-80">Creativity</span>
        </h2>
        <p className="text-[#2A372F]/70 font-light max-w-2xl mx-auto text-sm md:text-base opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: '400ms' }}>
          At Apple Tree Tots, we celebrate every child's unique artistic voice. Through painting, drawing,
          and creative play, children develop fine motor skills, emotional expression, and confidence.
        </p>
      </div>

      {/* Art Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
        {artActivities.map((activity, index) => (
          <ArtActivityCard
            key={activity.title}
            {...activity}
          />
        ))}
      </div>

      {/* Featured Art Display */}
      <div className="relative bg-[#2d5555]/10 border border-[#2d5555]/20 rounded-lg p-12 text-center overflow-hidden opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '600ms' }}>
        {/* Decorative background elements */}
        <div className="absolute -top-20 -right-20 opacity-10 animate-[rotate_20s_linear_infinite]">
          <PaintSplatterSVG size={200} />
        </div>
        <div className="absolute -bottom-20 -left-20 opacity-10 animate-[rotate_-20s_linear_infinite]">
          <ColorDotsSVG size={180} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <Sparkles size={32} className="text-[#2d5555]" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-[#2A372F]">
            Every Brushstroke Matters
          </h3>
          <p className="text-[#2A372F]/70 font-light leading-relaxed max-w-2xl mx-auto mb-8 text-sm md:text-base">
            We believe in celebrating the process, not just the product. Each artwork is a window into a
            child's thoughts, feelings, and imagination. We display and discuss children's creations to
            build confidence and foster a love of self-expression.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="inline-flex items-center gap-2 text-sm font-light text-[#2A372F]/70">
              <Palette size={16} />
              <span>Weekly Art Projects</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-light text-[#2A372F]/70">
              <Brush size={16} />
              <span>Daily Creative Play</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-light text-[#2A372F]/70">
              <Sparkles size={16} />
              <span>Gallery Displays</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
