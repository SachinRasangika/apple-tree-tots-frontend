import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  className
}: SectionHeaderProps) {
  const { isDark } = useDarkMode();
  const titleColor = isDark ? 'text-white' : 'text-[#2A372F]';
  const accentColor = isDark ? 'text-gray-400' : 'text-[#2d5555]';
  const subtitleColor = isDark ? 'text-gray-400' : 'text-[#2A372F]/70';

  return <div className={clsx('mb-12', {
    'text-left': align === 'left',
    'text-center': align === 'center',
    'text-right': align === 'right'
  }, className)}>
      {label && <span className={`text-xs tracking-wide uppercase ${accentColor} font-semibold mb-4 block`}>
          {label}
        </span>}
      <div className="flex items-center gap-4">
        <div>
          <h2 className={`text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 ${titleColor}`}>
            {title}
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent ${align === 'center' ? 'mx-auto' : ''}`}></div>
        </div>
      </div>
      {subtitle && <p className={`${subtitleColor} font-light leading-relaxed max-w-2xl mx-auto text-sm mt-6`}>
          {subtitle}
        </p>}
    </div>;
}

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({
  label,
  title,
  subtitle,
  className
}: PageHeaderProps) {
  const { isDark } = useDarkMode();
  const titleColor = isDark ? 'text-white' : 'text-[#2A372F]';

  return <div className={clsx('text-center max-w-3xl mx-auto', className)}>
      {label && <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="h-px w-12 md:w-24 bg-[#2d5555]/30"></div>
          <span className="text-xs md:text-sm tracking-wide uppercase text-[#2d5555] font-semibold">
            {label}
          </span>
          <div className="h-px w-12 md:w-24 bg-[#2d5555]/30"></div>
        </div>}

      <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif tracking-widest uppercase ${titleColor} mb-8 leading-tight`}>
        {title}
      </h1>

      {subtitle && <p className="text-sm md:text-base font-light text-[#2A372F]/70 leading-relaxed">
          {subtitle}
        </p>}
    </div>;
}
