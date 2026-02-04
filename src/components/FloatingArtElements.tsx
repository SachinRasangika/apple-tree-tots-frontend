import React from 'react';
import { 
  PaintSplatterSVG, 
  ColorDotsSVG, 
  CrayonsSVG,
  MarkersSVG,
  PaintBrushSVG 
} from './PreschoolSVGs';

interface FloatingArtElementsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'scattered';
  opacity?: number;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function FloatingArtElements({ 
  position = 'scattered',
  opacity = 0.1,
  animate = true,
  size = 'md'
}: FloatingArtElementsProps) {
  const sizeMap = {
    sm: 60,
    md: 100,
    lg: 150
  };

  const sizeValue = sizeMap[size];

  // For scattered mode, render multiple elements
  if (position === 'scattered') {
    return (
      <>
        {/* Top Left */}
        <div 
          className={`absolute top-10 left-8 pointer-events-none ${animate ? 'animate-[float_6s_ease-in-out_infinite]' : ''}`}
          style={{ opacity }}
        >
          <PaintBrushSVG size={sizeValue * 0.7} />
        </div>

        {/* Top Right */}
        <div 
          className={`absolute top-32 right-12 pointer-events-none ${animate ? 'animate-[float_7s_ease-in-out_infinite]' : ''}`}
          style={{ opacity, animationDelay: '1s' }}
        >
          <CrayonsSVG size={sizeValue * 0.6} />
        </div>

        {/* Bottom Left */}
        <div 
          className={`absolute bottom-20 left-12 pointer-events-none ${animate ? 'animate-[pulse_5s_ease-in-out_infinite]' : ''}`}
          style={{ opacity, animationDelay: '0.5s' }}
        >
          <PaintSplatterSVG size={sizeValue * 0.8} />
        </div>

        {/* Bottom Right */}
        <div 
          className={`absolute bottom-32 right-8 pointer-events-none ${animate ? 'animate-[float_8s_ease-in-out_infinite]' : ''}`}
          style={{ opacity, animationDelay: '1.5s' }}
        >
          <ColorDotsSVG size={sizeValue} />
        </div>

        {/* Center accent */}
        <div 
          className={`absolute top-1/2 left-1/4 pointer-events-none ${animate ? 'animate-[bounce_4s_ease-in-out_infinite]' : ''}`}
          style={{ opacity: opacity * 0.5, animationDelay: '0.2s' }}
        >
          <MarkersSVG size={sizeValue * 0.5} />
        </div>
      </>
    );
  }

  // For specific positions
  const positionClasses = {
    'top-left': 'top-10 left-8',
    'top-right': 'top-10 right-8',
    'bottom-left': 'bottom-10 left-8',
    'bottom-right': 'bottom-10 right-8'
  };

  const elementMap = {
    'top-left': <PaintBrushSVG size={sizeValue} />,
    'top-right': <CrayonsSVG size={sizeValue} />,
    'bottom-left': <PaintSplatterSVG size={sizeValue} />,
    'bottom-right': <ColorDotsSVG size={sizeValue} />
  };

  const animationMap = {
    'top-left': 'animate-[float_6s_ease-in-out_infinite]',
    'top-right': 'animate-[pulse_5s_ease-in-out_infinite]',
    'bottom-left': 'animate-[bounce_4s_ease-in-out_infinite]',
    'bottom-right': 'animate-[float_7s_ease-in-out_infinite]'
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} pointer-events-none ${animate ? animationMap[position] : ''}`}
      style={{ opacity }}
    >
      {elementMap[position]}
    </div>
  );
}

export function FloatingArtBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingArtElements position="scattered" opacity={0.08} animate={true} size="md" />
    </div>
  );
}
