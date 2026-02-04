import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className
}: BadgeProps) {
  const { isDark } = useDarkMode();

  return <span className={clsx('inline-flex items-center justify-center uppercase tracking-widest font-medium', {
    // Default variant
    ...(variant === 'default' && isDark ? {
      'bg-white/20 border border-white/20 text-white': true
    } : {}),
    ...(variant === 'default' && !isDark ? {
      'bg-[#2A372F]/20 border border-[#2A372F]/20 text-[#2A372F]': true
    } : {}),
    // Outline variant
    ...(variant === 'outline' && isDark ? {
      'border border-white/30 text-white': true
    } : {}),
    ...(variant === 'outline' && !isDark ? {
      'border border-[#2A372F]/30 text-[#2A372F]': true
    } : {}),
    // Solid variant
    ...(variant === 'solid' && isDark ? {
      'bg-white text-[#1a3a3a]': true
    } : {}),
    ...(variant === 'solid' && !isDark ? {
      'bg-[#2A372F] text-[#CDD1CB]': true
    } : {}),
    // Sizes
    'text-[8px] px-2 py-1': size === 'sm',
    'text-[10px] px-3 py-1.5': size === 'md',
    'text-xs px-4 py-2': size === 'lg'
  }, className)}>
      {children}
    </span>;
}

interface LabelProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Label({
  children,
  icon,
  className
}: LabelProps) {
  const { isDark } = useDarkMode();
  const iconColor = isDark ? 'text-white' : 'text-[#2A372F]';

  return <div className={clsx('inline-flex items-center gap-2 text-[10px] tracking-widest uppercase', className)}>
      {icon && <span className={iconColor}>{icon}</span>}
      <span>{children}</span>
    </div>;
}
