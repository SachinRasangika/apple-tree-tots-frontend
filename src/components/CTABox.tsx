import React from 'react';
import { Phone } from 'lucide-react';

interface CTABoxProps {
  primaryText?: string;
  secondaryText?: string;
  primaryHref?: string;
  secondaryHref?: string;
  showPhoneIcon?: boolean;
}

export function CTABox({
  primaryText = 'Follow Instagram',
  secondaryText = 'Call Us',
  primaryHref = 'https://instagram.com/apple_tree_tots_preschool',
  secondaryHref = 'tel:+94743431488',
  showPhoneIcon = true
}: CTABoxProps) {
  return (
    <div className="flex items-center">
      <div className="flex w-full gap-3 p-3">
        <a
          href={primaryHref}
          className="inline-flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest font-medium text-xs px-4 py-2 flex-1 rounded bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720]"
        >
          {primaryText}
        </a>
        <a
          href={secondaryHref}
          className="inline-flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest font-medium text-xs px-4 py-2 flex-1 rounded bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720]"
        >
          {showPhoneIcon && <Phone size={14} />}
          {secondaryText}
        </a>
      </div>
    </div>
  );
}
