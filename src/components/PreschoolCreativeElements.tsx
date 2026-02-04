import React from 'react';

interface SVGProps {
  size?: number;
  className?: string;
  color?: string;
}

// ===== FRIENDLY ANIMALS =====

// Bunny
export function BunnySVG({ size = 80, className = '', color = '#9B7BA8' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ears */}
      <ellipse cx="30" cy="20" rx="8" ry="25" fill={color} />
      <ellipse cx="70" cy="20" rx="8" ry="25" fill={color} />
      <ellipse cx="30" cy="25" rx="5" ry="20" fill="#FFB6C1" />
      <ellipse cx="70" cy="25" rx="5" ry="20" fill="#FFB6C1" />
      
      {/* Head */}
      <circle cx="50" cy="55" r="28" fill="#FAF7F1" />
      <circle cx="50" cy="55" r="28" fill={color} opacity="0.15" />
      
      {/* Eyes */}
      <circle cx="40" cy="48" r="3" fill="#333333" />
      <circle cx="60" cy="48" r="3" fill="#333333" />
      
      {/* Nose */}
      <circle cx="50" cy="58" r="3" fill="#E77A6A" />
      
      {/* Mouth */}
      <path d="M 50 58 Q 45 63 40 62" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 58 Q 55 63 60 62" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Body */}
      <ellipse cx="50" cy="90" rx="20" ry="24" fill={color} opacity="0.2" />
      
      {/* Tail */}
      <circle cx="60" cy="105" r="6" fill={color} />
      <circle cx="65" cy="110" r="5" fill={color} />
    </svg>
  );
}

// Duck
export function DuckSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body */}
      <ellipse cx="50" cy="50" rx="32" ry="25" fill="#F3C6A8" />
      
      {/* Neck */}
      <rect x="45" y="30" width="10" height="20" rx="5" fill="#F3C6A8" />
      
      {/* Head */}
      <circle cx="50" cy="22" r="12" fill="#F3C6A8" />
      
      {/* Bill */}
      <ellipse cx="60" cy="22" rx="10" ry="5" fill="#E77A6A" />
      
      {/* Eye */}
      <circle cx="55" cy="18" r="2" fill="#333333" />
      
      {/* Wing detail */}
      <path d="M 30 50 Q 25 55 30 60" stroke="#F3D89B" strokeWidth="2" fill="none" />
      
      {/* Feet */}
      <line x1="40" y1="72" x2="40" y2="78" stroke="#E77A6A" strokeWidth="2" />
      <line x1="60" y1="72" x2="60" y2="78" stroke="#E77A6A" strokeWidth="2" />
      <path d="M 35 78 L 45 78" stroke="#E77A6A" strokeWidth="2" />
      <path d="M 55 78 L 65 78" stroke="#E77A6A" strokeWidth="2" />
    </svg>
  );
}

// Butterfly
export function ButterflySVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Upper left wing */}
      <ellipse cx="30" cy="30" rx="18" ry="22" fill="#E77A6A" opacity="0.8" />
      {/* Upper right wing */}
      <ellipse cx="70" cy="30" rx="18" ry="22" fill="#7FB6C4" opacity="0.8" />
      
      {/* Lower left wing */}
      <ellipse cx="28" cy="65" rx="14" ry="18" fill="#F3C6A8" opacity="0.9" />
      {/* Lower right wing */}
      <ellipse cx="72" cy="65" rx="14" ry="18" fill="#5A9B7A" opacity="0.9" />
      
      {/* Body */}
      <ellipse cx="50" cy="50" rx="6" ry="18" fill="#333333" />
      
      {/* Antennae */}
      <line x1="50" y1="32" x2="42" y2="18" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="32" x2="58" y2="18" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="15" r="2" fill="#E77A6A" />
      <circle cx="58" cy="15" r="2" fill="#E77A6A" />
      
      {/* Wing spots */}
      <circle cx="25" cy="28" r="3" fill="#FFD700" opacity="0.6" />
      <circle cx="75" cy="28" r="3" fill="#FFD700" opacity="0.6" />
    </svg>
  );
}

// Cat
export function CatSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head */}
      <circle cx="50" cy="45" r="25" fill="#F3C6A8" />
      
      {/* Ears */}
      <polygon points="30,18 25,5 35,15" fill="#F3C6A8" />
      <polygon points="70,18 75,5 65,15" fill="#F3C6A8" />
      <polygon points="30,18 27,10 33,16" fill="#FFB6C1" />
      <polygon points="70,18 73,10 67,16" fill="#FFB6C1" />
      
      {/* Eyes */}
      <ellipse cx="40" cy="40" rx="3" ry="5" fill="#333333" />
      <ellipse cx="60" cy="40" rx="3" ry="5" fill="#333333" />
      
      {/* Nose */}
      <polygon points="50,50 47,55 53,55" fill="#E77A6A" />
      
      {/* Mouth */}
      <path d="M 50 55 Q 45 58 40 56" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 55 Q 55 58 60 56" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Whiskers */}
      <line x1="25" y1="42" x2="15" y2="40" stroke="#333333" strokeWidth="1" />
      <line x1="25" y1="48" x2="15" y2="50" stroke="#333333" strokeWidth="1" />
      <line x1="75" y1="42" x2="85" y2="40" stroke="#333333" strokeWidth="1" />
      <line x1="75" y1="48" x2="85" y2="50" stroke="#333333" strokeWidth="1" />
      
      {/* Body */}
      <rect x="35" y="65" width="30" height="28" rx="10" fill="#F3C6A8" opacity="0.6" />
      
      {/* Tail */}
      <path d="M 70 80 Q 85 75 80 90" stroke="#F3C6A8" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ===== SHAPES & LEARNING ELEMENTS =====

// Heart
export function HeartSVG({ size = 80, className = '', color = '#E77A6A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50,90 C25,75 10,60 10,45 C10,30 20,20 30,20 C38,20 46,26 50,32 C54,26 62,20 70,20 C80,20 90,30 90,45 C90,60 75,75 50,90 Z"
        fill={color}
      />
    </svg>
  );
}

// Moon
export function MoonSVG({ size = 80, className = '', color = '#F3D89B' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="55" cy="50" r="35" fill={color} />
      <circle cx="70" cy="35" r="35" fill="#FAF7F1" />
      
      {/* Stars near moon */}
      <polygon points="20,20 23,28 32,28 25,34 28,42 20,36 12,42 15,34 8,28 17,28" fill="#FFD700" opacity="0.7" />
      <polygon points="80,15 82,20 87,20 84,24 86,29 80,25 74,29 76,24 73,20 78,20" fill="#FFD700" opacity="0.5" />
    </svg>
  );
}

// Flower
export function FlowerSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Petals */}
      <ellipse cx="50" cy="20" rx="10" ry="18" fill="#E77A6A" />
      <ellipse cx="80" cy="30" rx="10" ry="18" fill="#F3C6A8" transform="rotate(72 80 30)" />
      <ellipse cx="77" cy="65" rx="10" ry="18" fill="#7FB6C4" transform="rotate(144 77 65)" />
      <ellipse cx="23" cy="65" rx="10" ry="18" fill="#5A9B7A" transform="rotate(216 23 65)" />
      <ellipse cx="20" cy="30" rx="10" ry="18" fill="#9B7BA8" transform="rotate(288 20 30)" />
      
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="#FFD700" />
      
      {/* Stem */}
      <rect x="47" y="60" width="6" height="35" rx="3" fill="#5A9B7A" />
      
      {/* Leaves */}
      <ellipse cx="38" cy="75" rx="8" ry="14" fill="#5A9B7A" opacity="0.7" transform="rotate(-45 38 75)" />
      <ellipse cx="62" cy="75" rx="8" ry="14" fill="#5A9B7A" opacity="0.7" transform="rotate(45 62 75)" />
    </svg>
  );
}

// Number 1
export function Number1SVG({ size = 80, className = '', color = '#5F8F9A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text x="40" y="75" fontSize="60" fontWeight="bold" textAnchor="middle" fill={color} fontFamily="serif">
        1
      </text>
    </svg>
  );
}

// Cloud
export function CloudSVG({ size = 80, className = '', color = '#7FB6C4' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 20 40 C 15 40 10 45 10 50 C 10 55 15 60 20 60 L 80 60 C 88 60 95 53 95 45 C 95 37 88 30 80 30 C 78 20 70 12 60 12 C 50 12 42 18 40 27 C 35 25 30 23 25 23 C 10 23 0 33 0 45 C 0 53 5 60 12 62"
        fill={color}
      />
    </svg>
  );
}

// ===== ACHIEVEMENT & REWARD ELEMENTS =====

// Achievement Badge
export function BadgeSVG({ size = 80, className = '', color = '#E77A6A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top circle */}
      <circle cx="50" cy="40" r="30" fill={color} />
      
      {/* Ribbon left */}
      <rect x="20" y="65" width="15" height="50" fill={color} opacity="0.7" />
      <polygon points="20,65 20,75 27,70" fill={color} />
      
      {/* Ribbon right */}
      <rect x="65" y="65" width="15" height="50" fill={color} opacity="0.7" />
      <polygon points="80,65 80,75 73,70" fill={color} />
      
      {/* Star in center */}
      <polygon points="50,20 56,35 72,35 60,45 66,60 50,50 34,60 40,45 28,35 44,35" fill="#FFD700" />
      
      {/* Highlight */}
      <circle cx="50" cy="40" r="30" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

// Trophy
export function TrophySVG({ size = 80, className = '', color = '#FFD700' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cup */}
      <path d="M 25 30 L 35 50 L 65 50 L 75 30 Z" fill={color} stroke="#999999" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="20" ry="10" fill={color} stroke="#999999" strokeWidth="2" />
      
      {/* Handles */}
      <path d="M 75 35 Q 90 35 90 50 Q 90 65 75 65" fill="none" stroke="#999999" strokeWidth="3" />
      <path d="M 25 35 Q 10 35 10 50 Q 10 65 25 65" fill="none" stroke="#999999" strokeWidth="3" />
      
      {/* Base */}
      <rect x="30" y="60" width="40" height="8" fill={color} />
      <rect x="20" y="68" width="60" height="6" fill="#999999" />
      
      {/* Shine */}
      <ellipse cx="40" cy="45" rx="8" ry="5" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}

// Checkmark Circle
export function CheckmarkCircleSVG({ size = 80, className = '', color = '#5A9B7A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="45" fill={color} opacity="0.2" stroke={color} strokeWidth="3" />
      <path
        d="M 35 50 L 45 60 L 70 35"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ===== DECORATIVE ELEMENTS =====

// Wavy Line
export function WavyLineSVG({ size = 80, className = '', color = '#5F8F9A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 0 20 Q 25 5 50 20 T 100 20 T 150 20 T 200 20"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Dots Pattern
export function DotsPatternSVG({ size = 120, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {[20, 50, 80].map((x) =>
        [20, 50, 80].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#5F8F9A" opacity="0.3" />
        ))
      )}
    </svg>
  );
}

// Rainbow Arc
export function RainbowArcSVG({ size = 120, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M 10 70 Q 60 10 110 70" stroke="#E77A6A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 20 70 Q 60 20 100 70" stroke="#F3C6A8" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 30 70 Q 60 30 90 70" stroke="#FFD700" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 40 70 Q 60 40 80 70" stroke="#5A9B7A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 50 70 Q 60 50 70 70" stroke="#7FB6C4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Scribble
export function ScribbleSVG({ size = 80, className = '', color = '#E77A6A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 10 50 Q 20 20 40 30 T 70 50 T 90 20 Q 85 70 60 80 T 20 85 Q 15 60 35 65 T 80 70"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Book
export function BookSVG({ size = 80, className = '', color = '#5F8F9A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Book cover left */}
      <rect x="15" y="25" width="35" height="50" rx="2" fill={color} opacity="0.8" stroke={color} strokeWidth="2" />
      
      {/* Book cover right */}
      <rect x="50" y="25" width="35" height="50" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      
      {/* Spine */}
      <line x1="50" y1="25" x2="50" y2="75" stroke={color} strokeWidth="1" />
      
      {/* Text lines */}
      <line x1="25" y1="40" x2="40" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="25" y1="48" x2="40" y2="48" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="25" y1="56" x2="40" y2="56" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      
      {/* Bookmark */}
      <rect x="68" y="20" width="4" height="45" fill="#E77A6A" />
    </svg>
  );
}

// Pencil
export function PencilSVG({ size = 80, className = '' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body */}
      <rect x="38" y="20" width="24" height="80" rx="2" fill="#F3D89B" stroke="#999999" strokeWidth="1" />
      
      {/* Eraser */}
      <rect x="38" y="10" width="24" height="12" rx="1" fill="#FFB6C1" />
      
      {/* Tip */}
      <polygon points="50,100 40,115 60,115" fill="#333333" />
      <polygon points="50,100 45,110 55,110" fill="#666666" />
      
      {/* Wood grain detail */}
      <line x1="45" y1="40" x2="55" y2="40" stroke="#D4A574" strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="60" x2="55" y2="60" stroke="#D4A574" strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="80" x2="55" y2="80" stroke="#D4A574" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Gift/Present
export function GiftSVG({ size = 80, className = '', color = '#E77A6A' }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Box */}
      <rect x="20" y="40" width="60" height="50" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      
      {/* Top section */}
      <rect x="20" y="30" width="60" height="15" rx="2" fill={color} />
      
      {/* Ribbon vertical */}
      <rect x="45" y="25" width="10" height="65" fill="#FFD700" />
      
      {/* Ribbon horizontal */}
      <rect x="15" y="35" width="70" height="8" fill="#FFD700" />
      
      {/* Bow */}
      <circle cx="35" cy="32" r="6" fill="#FFD700" />
      <circle cx="65" cy="32" r="6" fill="#FFD700" />
      <circle cx="50" cy="32" r="5" fill="#FFD700" />
      
      {/* Shine */}
      <ellipse cx="40" cy="55" rx="8" ry="10" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
}
