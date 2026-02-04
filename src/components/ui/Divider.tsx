import React from 'react';
import { clsx } from 'clsx';
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}
export function Divider({
  orientation = 'horizontal',
  className,
  label
}: DividerProps) {
  if (label) {
    return <div className={clsx('flex items-center gap-4 md:gap-8', className)}>
        <div className="h-px flex-1 bg-white/30"></div>
        <span className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
          {label}
        </span>
        <div className="h-px flex-1 bg-white/30"></div>
      </div>;
  }
  return <div className={clsx('bg-white/10', {
    'h-px w-full': orientation === 'horizontal',
    'w-px h-full': orientation === 'vertical'
  }, className)} />;
}