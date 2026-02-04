import React from 'react';

interface SVGProps {
  size?: number;
  className?: string;
  color?: string;
}

// Apple Tree - perfect for Apple Tree Tots branding
export function AppleTreeSVG({ size = 80, className = '', color = '#E77A6A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Trunk */}
      <rect x="42" y="70" width="16" height="40" fill="#8B6F47" />
      
      {/* Tree foliage - green circular shapes */}
      <circle cx="50" cy="50" r="35" fill="#4A8B6A" opacity="0.9" />
      <circle cx="35" cy="45" r="25" fill="#5A9B7A" opacity="0.85" />
      <circle cx="65" cy="45" r="25" fill="#5A9B7A" opacity="0.85" />
      
      {/* Apples */}
      <circle cx="40" cy="35" r="6" fill={color} />
      <circle cx="60" cy="32" r="6" fill={color} />
      <circle cx="50" cy="25" r="6" fill={color} />
      <circle cx="35" cy="50" r="6" fill={color} />
      <circle cx="65" cy="50" r="6" fill={color} />
      
      {/* Apple stems */}
      <line x1="40" y1="29" x2="40" y2="25" stroke="#8B6F47" strokeWidth="1.5" />
      <line x1="60" y1="26" x2="60" y2="22" stroke="#8B6F47" strokeWidth="1.5" />
      <line x1="50" y1="19" x2="50" y2="15" stroke="#8B6F47" strokeWidth="1.5" />
      <line x1="35" y1="44" x2="35" y2="40" stroke="#8B6F47" strokeWidth="1.5" />
      <line x1="65" y1="44" x2="65" y2="40" stroke="#8B6F47" strokeWidth="1.5" />
    </svg>
  );
}

// Colorful Blocks/Toys
export function BlocksSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red block */}
      <rect x="10" y="40" width="25" height="25" rx="3" fill="#E77A6A" />
      <line x1="10" y1="52" x2="35" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      
      {/* Blue block */}
      <rect x="42" y="30" width="25" height="25" rx="3" fill="#7FB6C4" />
      <line x1="42" y1="42" x2="67" y2="42" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      
      {/* Yellow block */}
      <rect x="74" y="50" width="20" height="20" rx="3" fill="#F3C6A8" />
      <line x1="74" y1="60" x2="94" y2="60" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      
      {/* Green block */}
      <rect x="28" y="65" width="22" height="22" rx="3" fill="#5A9B7A" />
      <line x1="28" y1="76" x2="50" y2="76" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      
      {/* Purple block */}
      <rect x="58" y="68" width="20" height="20" rx="3" fill="#9B7BA8" />
      <line x1="58" y1="78" x2="78" y2="78" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Balloons
export function BalloonsSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red balloon */}
      <ellipse cx="25" cy="30" rx="12" ry="16" fill="#E77A6A" />
      <line x1="25" y1="46" x2="25" y2="80" stroke="#333333" strokeWidth="1" />
      
      {/* Blue balloon */}
      <ellipse cx="50" cy="25" rx="12" ry="16" fill="#7FB6C4" />
      <line x1="50" y1="41" x2="50" y2="80" stroke="#333333" strokeWidth="1" />
      
      {/* Yellow balloon */}
      <ellipse cx="75" cy="35" rx="12" ry="16" fill="#F3C6A8" />
      <line x1="75" y1="51" x2="75" y2="80" stroke="#333333" strokeWidth="1" />
      
      {/* Small highlights for shine */}
      <ellipse cx="22" cy="20" rx="3" ry="4" fill="#FAF7F1" opacity="0.6" />
      <ellipse cx="47" cy="15" rx="3" ry="4" fill="#FAF7F1" opacity="0.6" />
      <ellipse cx="72" cy="25" rx="3" ry="4" fill="#FAF7F1" opacity="0.6" />
    </svg>
  );
}

// Stars - perfect for decorative elements
export function StarsSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large star */}
      <g transform="translate(50, 40)">
        <path
          d="M0,-15 L4,-4 L15,-2 L8,4 L10,15 L0,10 L-10,15 L-8,4 L-15,-2 L-4,-4 Z"
          fill="#F3C6A8"
        />
      </g>
      
      {/* Small stars */}
      <g transform="translate(25, 25)">
        <path
          d="M0,-8 L2,-2 L8,-1 L4,2 L5,8 L0,5 L-5,8 L-4,2 L-8,-1 L-2,-2 Z"
          fill="#E77A6A"
        />
      </g>
      
      <g transform="translate(75, 30)">
        <path
          d="M0,-8 L2,-2 L8,-1 L4,2 L5,8 L0,5 L-5,8 L-4,2 L-8,-1 L-2,-2 Z"
          fill="#7FB6C4"
        />
      </g>
      
      <g transform="translate(20, 70)">
        <path
          d="M0,-8 L2,-2 L8,-1 L4,2 L5,8 L0,5 L-5,8 L-4,2 L-8,-1 L-2,-2 Z"
          fill="#5A9B7A"
        />
      </g>
      
      <g transform="translate(80, 75)">
        <path
          d="M0,-8 L2,-2 L8,-1 L4,2 L5,8 L0,5 L-5,8 L-4,2 L-8,-1 L-2,-2 Z"
          fill="#9B7BA8"
        />
      </g>
    </svg>
  );
}

// Crayons
export function CrayonsSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red crayon */}
      <rect x="10" y="15" width="8" height="60" rx="2" fill="#E77A6A" />
      <polygon points="14,12 10,15 18,15" fill="#E77A6A" />
      
      {/* Blue crayon */}
      <rect x="25" y="20" width="8" height="60" rx="2" fill="#7FB6C4" />
      <polygon points="29,17 25,20 33,20" fill="#7FB6C4" />
      
      {/* Yellow crayon */}
      <rect x="40" y="18" width="8" height="60" rx="2" fill="#F3C6A8" />
      <polygon points="44,15 40,18 48,18" fill="#F3C6A8" />
      
      {/* Green crayon */}
      <rect x="55" y="22" width="8" height="60" rx="2" fill="#5A9B7A" />
      <polygon points="59,19 55,22 63,22" fill="#5A9B7A" />
      
      {/* Purple crayon */}
      <rect x="70" y="20" width="8" height="60" rx="2" fill="#9B7BA8" />
      <polygon points="74,17 70,20 78,20" fill="#9B7BA8" />
    </svg>
  );
}

// Playing Children/Celebration
export function PlayingSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Child 1 */}
      <circle cx="30" cy="25" r="6" fill="#E77A6A" /> {/* head */}
      <rect x="26" y="32" width="8" height="12" rx="2" fill="#7FB6C4" /> {/* body */}
      <line x1="28" y1="44" x2="28" y2="54" stroke="#333333" strokeWidth="2" /> {/* left leg */}
      <line x1="32" y1="44" x2="32" y2="54" stroke="#333333" strokeWidth="2" /> {/* right leg */}
      <line x1="24" y1="34" x2="18" y2="42" stroke="#E77A6A" strokeWidth="2" /> {/* left arm */}
      <line x1="34" y1="34" x2="40" y2="40" stroke="#E77A6A" strokeWidth="2" /> {/* right arm */}
      
      {/* Child 2 */}
      <circle cx="70" cy="28" r="6" fill="#F3C6A8" /> {/* head */}
      <rect x="66" y="35" width="8" height="12" rx="2" fill="#5A9B7A" /> {/* body */}
      <line x1="68" y1="47" x2="68" y2="57" stroke="#333333" strokeWidth="2" /> {/* left leg */}
      <line x1="72" y1="47" x2="72" y2="57" stroke="#333333" strokeWidth="2" /> {/* right leg */}
      <line x1="64" y1="37" x2="58" y2="45" stroke="#F3C6A8" strokeWidth="2" /> {/* left arm */}
      <line x1="74" y1="37" x2="80" y2="45" stroke="#F3C6A8" strokeWidth="2" /> {/* right arm */}
      
      {/* Ball between them */}
      <circle cx="50" cy="45" r="5" fill="#9B7BA8" />
      <circle cx="50" cy="45" r="5" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

// School Bus
export function SchoolBusSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bus body */}
      <rect x="10" y="20" width="70" height="30" rx="4" fill="#F3C6A8" />
      
      {/* Bus roof */}
      <path d="M 10 20 Q 45 5 80 20" fill="#E77A6A" />
      
      {/* Windows */}
      <rect x="16" y="25" width="10" height="8" rx="1" fill="#7FB6C4" />
      <rect x="30" y="25" width="10" height="8" rx="1" fill="#7FB6C4" />
      <rect x="44" y="25" width="10" height="8" rx="1" fill="#7FB6C4" />
      <rect x="58" y="25" width="10" height="8" rx="1" fill="#7FB6C4" />
      
      {/* Door */}
      <rect x="72" y="25" width="6" height="20" rx="1" fill="#5F8F9A" />
      
      {/* Wheels */}
      <circle cx="22" cy="52" r="5" fill="#333333" />
      <circle cx="68" cy="52" r="5" fill="#333333" />
      <circle cx="22" cy="52" r="2" fill="#999999" />
      <circle cx="68" cy="52" r="2" fill="#999999" />
      
      {/* Bumper */}
      <rect x="10" y="50" width="70" height="2" fill="#333333" />
    </svg>
  );
}

// Rainbow
export function RainbowSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rainbow arcs */}
      <path
        d="M 20 55 Q 50 15 80 55"
        stroke="#E77A6A"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 26 55 Q 50 25 74 55"
        stroke="#F3C6A8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 32 55 Q 50 35 68 55"
        stroke="#F3D89B"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 38 55 Q 50 43 62 55"
        stroke="#5A9B7A"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 44 55 Q 50 48 56 55"
        stroke="#7FB6C4"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Cloud at end */}
      <ellipse cx="80" cy="56" rx="8" ry="4" fill="#999999" opacity="0.4" />
    </svg>
  );
}

// Puzzle Piece
export function PuzzlePieceSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main puzzle piece shape */}
      <path
        d="M 20 20 L 70 20 L 70 50 C 70 55 75 60 80 60 C 75 60 70 65 70 70 L 70 70 L 20 70 L 20 40 C 20 35 15 30 10 30 C 15 30 20 25 20 20 Z"
        fill="#5F8F9A"
      />
      
      {/* Decorative pattern */}
      <circle cx="45" cy="45" r="8" fill="#E77A6A" opacity="0.3" />
      <circle cx="30" cy="35" r="4" fill="#F3C6A8" opacity="0.5" />
      <circle cx="60" cy="55" r="4" fill="#7FB6C4" opacity="0.5" />
    </svg>
  );
}

// Sun & Cloud - for outdoor learning theme
export function SunCloudSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sun */}
      <circle cx="35" cy="30" r="12" fill="#F3C6A8" />
      
      {/* Sun rays */}
      <line x1="35" y1="10" x2="35" y2="4" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="50" x2="35" y2="56" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="30" x2="9" y2="30" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="30" x2="61" y2="30" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="15" x2="16" y2="11" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="45" x2="54" y2="49" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="15" x2="54" y2="11" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="45" x2="16" y2="49" stroke="#F3C6A8" strokeWidth="2" strokeLinecap="round" />
      
      {/* Cloud */}
      <ellipse cx="65" cy="65" rx="18" ry="12" fill="#7FB6C4" />
      <ellipse cx="48" cy="70" rx="12" ry="10" fill="#7FB6C4" />
      <ellipse cx="82" cy="70" rx="12" ry="10" fill="#7FB6C4" />
    </svg>
  );
}

// Paint Palette
export function PaletteSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Palette base */}
      <ellipse cx="50" cy="55" rx="30" ry="35" fill="#D4A574" />

      {/* Paint blobs */}
      <circle cx="30" cy="30" r="6" fill="#E77A6A" />
      <circle cx="45" cy="20" r="6" fill="#F3C6A8" />
      <circle cx="60" cy="25" r="6" fill="#F3D89B" />
      <circle cx="70" cy="40" r="6" fill="#7FB6C4" />
      <circle cx="65" cy="60" r="6" fill="#5A9B7A" />
      <circle cx="35" cy="75" r="6" fill="#9B7BA8" />
      <circle cx="50" cy="85" r="6" fill="#5F8F9A" />

      {/* Thumb hole */}
      <ellipse cx="20" cy="65" rx="7" ry="10" fill="none" stroke="#D4A574" strokeWidth="2" />
    </svg>
  );
}

// Paint Brush
export function PaintBrushSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Handle */}
      <rect x="42" y="50" width="16" height="40" rx="3" fill="#8B6F47" />

      {/* Bristles container */}
      <ellipse cx="50" cy="48" rx="10" ry="12" fill="#E8A89A" />
      <ellipse cx="50" cy="48" rx="10" ry="12" fill="none" stroke="#8B6F47" strokeWidth="1" />

      {/* Paint on bristles - vibrant colors */}
      <ellipse cx="45" cy="40" rx="4" ry="6" fill="#E77A6A" opacity="0.9" />
      <ellipse cx="50" cy="35" rx="4" ry="6" fill="#F3C6A8" opacity="0.9" />
      <ellipse cx="55" cy="40" rx="4" ry="6" fill="#7FB6C4" opacity="0.9" />
      <ellipse cx="50" cy="43" rx="3" ry="4" fill="#5A9B7A" opacity="0.8" />

      {/* Metal ferrule */}
      <ellipse cx="50" cy="50" rx="12" ry="4" fill="#C0C0C0" />
      <ellipse cx="50" cy="50" rx="12" ry="4" fill="none" stroke="#888888" strokeWidth="1" />
    </svg>
  );
}

// Paint Splatter/Splash
export function PaintSplatterSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main splatter */}
      <circle cx="50" cy="50" r="25" fill="#E77A6A" opacity="0.8" />

      {/* Splatter drops */}
      <circle cx="30" cy="25" r="6" fill="#E77A6A" opacity="0.7" />
      <circle cx="70" cy="20" r="5" fill="#F3C6A8" opacity="0.7" />
      <circle cx="75" cy="50" r="7" fill="#7FB6C4" opacity="0.7" />
      <circle cx="65" cy="75" r="6" fill="#5A9B7A" opacity="0.7" />
      <circle cx="30" cy="80" r="5" fill="#9B7BA8" opacity="0.7" />
      <circle cx="20" cy="60" r="6" fill="#F3D89B" opacity="0.7" />
      <circle cx="25" cy="50" r="4" fill="#5F8F9A" opacity="0.8" />

      {/* Tiny spleckles */}
      <circle cx="45" cy="20" r="2" fill="#E77A6A" opacity="0.6" />
      <circle cx="80" cy="40" r="2" fill="#F3C6A8" opacity="0.6" />
      <circle cx="50" cy="85" r="2" fill="#7FB6C4" opacity="0.6" />
      <circle cx="15" cy="35" r="2" fill="#5A9B7A" opacity="0.6" />
    </svg>
  );
}

// Colorful Paint Dots/Bubbles
export function ColorDotsSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large dots */}
      <circle cx="25" cy="25" r="12" fill="#E77A6A" />
      <circle cx="75" cy="30" r="12" fill="#7FB6C4" />
      <circle cx="50" cy="60" r="12" fill="#F3C6A8" />
      <circle cx="30" cy="75" r="12" fill="#5A9B7A" />
      <circle cx="70" cy="70" r="12" fill="#9B7BA8" />

      {/* Highlights for shine */}
      <circle cx="22" cy="22" r="3" fill="#FAF7F1" opacity="0.6" />
      <circle cx="72" cy="27" r="3" fill="#FAF7F1" opacity="0.6" />
      <circle cx="47" cy="57" r="3" fill="#FAF7F1" opacity="0.6" />
      <circle cx="27" cy="72" r="3" fill="#FAF7F1" opacity="0.6" />
      <circle cx="67" cy="67" r="3" fill="#FAF7F1" opacity="0.6" />
    </svg>
  );
}

// Art Easel
export function EaselSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Canvas */}
      <rect x="25" y="20" width="50" height="50" rx="2" fill="#FFFEF0" stroke="#8B6F47" strokeWidth="2" />

      {/* Canvas art - colorful painting */}
      <circle cx="40" cy="35" r="8" fill="#E77A6A" opacity="0.7" />
      <circle cx="60" cy="40" r="8" fill="#7FB6C4" opacity="0.7" />
      <circle cx="50" cy="55" r="8" fill="#F3C6A8" opacity="0.7" />
      <path d="M 35 50 Q 50 45 65 50" stroke="#5A9B7A" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Left leg */}
      <line x1="30" y1="70" x2="15" y2="110" stroke="#8B6F47" strokeWidth="3" strokeLinecap="round" />
      {/* Right leg */}
      <line x1="70" y1="70" x2="85" y2="110" stroke="#8B6F47" strokeWidth="3" strokeLinecap="round" />
      {/* Support leg */}
      <line x1="50" y1="70" x2="50" y2="110" stroke="#8B6F47" strokeWidth="3" strokeLinecap="round" />

      {/* Feet */}
      <line x1="10" y1="110" x2="20" y2="110" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
      <line x1="80" y1="110" x2="90" y2="110" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="110" x2="55" y2="110" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Colored Pencils/Markers
export function MarkersSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Marker 1 - Red */}
      <rect x="12" y="20" width="12" height="55" rx="2" fill="#E77A6A" />
      <circle cx="18" cy="20" r="6" fill="#8B5A4A" />
      <rect x="14" y="75" width="8" height="6" fill="#8B5A4A" />

      {/* Marker 2 - Blue */}
      <rect x="30" y="15" width="12" height="55" rx="2" fill="#7FB6C4" />
      <circle cx="36" cy="15" r="6" fill="#4A7A8A" />
      <rect x="32" y="70" width="8" height="6" fill="#4A7A8A" />

      {/* Marker 3 - Green */}
      <rect x="48" y="22" width="12" height="55" rx="2" fill="#5A9B7A" />
      <circle cx="54" cy="22" r="6" fill="#2A5A4A" />
      <rect x="50" y="77" width="8" height="6" fill="#2A5A4A" />

      {/* Marker 4 - Yellow */}
      <rect x="66" y="18" width="12" height="55" rx="2" fill="#F3D89B" />
      <circle cx="72" cy="18" r="6" fill="#9B8A4A" />
      <rect x="68" y="73" width="8" height="6" fill="#9B8A4A" />
    </svg>
  );
}
