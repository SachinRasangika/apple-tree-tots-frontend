import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface IconWrapperProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square' | 'none';
  className?: string;
}

export function IconWrapper({
  icon,
  size = 'md',
  variant = 'circle',
  className
}: IconWrapperProps) {
  const { isDark } = useDarkMode();
  
  const bgColor = isDark ? 'bg-white/20 text-white' : 'bg-[#2d5555]/20 text-[#2d5555]';

  return <div className={clsx('flex items-center justify-center border border-white/10 shrink-0', bgColor, {
    // Variants
    'rounded-full': variant === 'circle',
    'rounded-sm': variant === 'square',
    'bg-transparent border-none': variant === 'none',
    // Sizes
    'w-8 h-8': size === 'sm',
    'w-12 h-12': size === 'md',
    'w-16 h-16': size === 'lg',
    'w-20 h-20': size === 'xl'
  }, className)}>
      {icon}
    </div>;
}
