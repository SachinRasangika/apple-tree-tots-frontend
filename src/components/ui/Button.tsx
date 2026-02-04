import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  className,
  variant = 'outline',
  size = 'md',
  ...props
}: ButtonProps) {
  const { isDark } = useDarkMode();

  return <button className={clsx('inline-flex items-center justify-center transition-all duration-300 uppercase tracking-widest font-medium text-xs', {
    // Outline variant
    ...(variant === 'outline' && isDark ? {
      'border border-white text-white hover:bg-white hover:text-[#1a3a3a] [&>svg]:hover:text-[#1a3a3a]': true
    } : {}),
    ...(variant === 'outline' && !isDark ? {
      'border border-[#2A372F] text-[#2A372F] hover:bg-[#2A372F] hover:text-[#CDD1CB] [&>svg]:hover:text-[#CDD1CB]': true
    } : {}),
    // Primary variant
    ...(variant === 'primary' && isDark ? {
      'bg-white text-[#1a3a3a] hover:bg-white/90': true
    } : {}),
    ...(variant === 'primary' && !isDark ? {
      'bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720]': true
    } : {}),
    // Text variant
    ...(variant === 'text' && isDark ? {
      'underline underline-offset-4 text-white hover:text-white/70': true
    } : {}),
    ...(variant === 'text' && !isDark ? {
      'underline underline-offset-4 hover:text-[#1a2720]': true
    } : {}),
    'px-4 py-2': size === 'sm',
    'px-8 py-3': size === 'md',
    'px-10 py-4': size === 'lg'
  }, className)} {...props}>
      {children}
    </button>;
}
