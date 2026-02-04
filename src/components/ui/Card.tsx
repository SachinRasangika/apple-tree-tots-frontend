import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false
}: CardProps) {
  const { isDark } = useDarkMode();

  return <div className={clsx('transition-all duration-300 group', {
    // Default variant
    ...(variant === 'default' && isDark ? {
      'bg-white/10 border border-white/10': true
    } : {}),
    ...(variant === 'default' && !isDark ? {
      'bg-[#2A372F]/10 border border-[#2A372F]/20': true
    } : {}),
    // Bordered variant
    ...(variant === 'bordered' && isDark ? {
      'border border-white/10': true
    } : {}),
    ...(variant === 'bordered' && !isDark ? {
      'border border-[#2A372F]/20': true
    } : {}),
    // Elevated variant
    ...(variant === 'elevated' && isDark ? {
      'bg-white/10 border border-white/10 shadow-xl': true
    } : {}),
    ...(variant === 'elevated' && !isDark ? {
      'bg-[#2A372F]/20 border border-[#2A372F]/10 shadow-xl': true
    } : {}),
    // Glass variant
    ...(variant === 'glass' && isDark ? {
      'bg-white/10 border border-white/10 backdrop-blur-sm': true
    } : {}),
    ...(variant === 'glass' && !isDark ? {
      'bg-[#2A372F]/20 border border-[#2A372F]/10 backdrop-blur-sm': true
    } : {}),
    // Padding
    'p-0': padding === 'none',
    'p-4': padding === 'sm',
    'p-6 md:p-8': padding === 'md',
    'p-8 md:p-12': padding === 'lg',
    // Hover effect
    ...(hover && isDark ? {
      'hover:bg-white/20 cursor-pointer [&_h3]:hover:text-white [&_h4]:hover:text-white [&_p]:hover:text-white [&_svg]:hover:text-white [&_.icon-wrapper]:hover:bg-white/20 [&_.icon-wrapper]:hover:border-white/20': true
    } : {}),
    ...(hover && !isDark ? {
      'hover:bg-[#2A372F] cursor-pointer [&_h3]:hover:text-[#CDD1CB] [&_h4]:hover:text-[#CDD1CB] [&_p]:hover:text-[#CDD1CB] [&_svg]:hover:text-[#CDD1CB] [&_.icon-wrapper]:hover:bg-[#2A372F] [&_.icon-wrapper]:hover:border-[#2A372F]': true
    } : {})
  }, className)}>
      {children}
    </div>;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className
}: FeatureCardProps) {
  const { isDark } = useDarkMode();
  const iconBgColor = isDark ? 'bg-white/20 border-white/20 text-white' : 'bg-[#2A372F]/20 border-[#2A372F]/20 text-[#2A372F]';
  const descColor = isDark ? 'text-white/70' : 'text-[#2A372F]/70';

  return <Card variant="default" padding="lg" hover className={className}>
      <div className="flex items-start gap-4">
        <div className={`icon-wrapper w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${iconBgColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-serif tracking-wide mb-3 transition-colors duration-300">
            {title}
          </h3>
          <p className={`text-sm font-light leading-relaxed transition-colors duration-300 ${descColor}`}>
            {description}
          </p>
        </div>
      </div>
    </Card>;
}

interface ImageCardProps {
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

export function ImageCard({
  image,
  alt,
  title,
  subtitle,
  className,
  aspectRatio = 'video'
}: ImageCardProps) {
  const { isDark } = useDarkMode();
  const gradientColor = isDark ? 'from-[#1a3a3a]' : 'from-[#2A372F]';
  const overlayColor = isDark ? 'bg-[#1a3a3a]/20' : 'bg-[#CDD1CB]/20';
  const textColor = isDark ? 'text-white' : 'text-[#CDD1CB]';
  const subtitleColor = isDark ? 'text-white/80' : 'text-[#CDD1CB]/80';

  return <div className={clsx('relative group overflow-hidden border border-white/10', className)}>
      <div className={clsx('relative overflow-hidden', {
      'aspect-square': aspectRatio === 'square',
      'aspect-video': aspectRatio === 'video',
      'aspect-[3/4]': aspectRatio === 'portrait',
      'aspect-[4/3]': aspectRatio === 'landscape'
    })}>
        <div className={`absolute inset-0 ${overlayColor} group-hover:bg-transparent transition-colors duration-500 z-10`} />
        <img src={image} alt={alt} className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
        {(title || subtitle) && <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${gradientColor} to-transparent p-6 z-20`}>
            {subtitle && <span className={`text-[10px] tracking-widest uppercase ${subtitleColor} block mb-1`}>
                {subtitle}
              </span>}
            {title && <h3 className={`text-sm font-serif tracking-wide ${textColor}`}>
                {title}
              </h3>}
          </div>}
      </div>
    </div>;
}
