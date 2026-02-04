import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isDark } = useDarkMode();
  const borderColor = isDark ? 'border-white/10' : 'border-[#2A372F]/20';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-[#2A372F]/5';
  const iconBorder = isDark ? 'border-white/30' : 'border-[#2A372F]/30';
  const textColor = isDark ? 'text-white/70' : 'text-[#2A372F]/70';

  return <div className={`border-b ${borderColor}`}>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full py-6 flex items-center justify-between ${hoverBg} transition-colors px-4 text-left`}>
        <span className="text-sm font-medium tracking-wide pr-4">{title}</span>
        <div className={`w-6 h-6 rounded-full border ${iconBorder} flex items-center justify-center shrink-0`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {isOpen && <div className="px-4 pb-6 animate-[fadeIn_0.3s_ease-out]">
          <div className={`text-sm ${textColor} leading-relaxed`}>
            {children}
          </div>
        </div>}
    </div>;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  children,
  className
}: AccordionProps) {
  const { isDark } = useDarkMode();
  const bgColor = isDark ? 'bg-white/5 border-white/10' : 'bg-[#2A372F]/5 border-[#2A372F]/20';

  return <div className={clsx(`border ${bgColor}`, className)}>
      {children}
    </div>;
}
