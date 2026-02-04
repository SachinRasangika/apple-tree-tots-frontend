import React, { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: number;
}

export function AnimatedSection({
  children,
  className = ''
}: AnimatedSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
