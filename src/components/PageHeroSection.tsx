import React from 'react';
import { Button } from './ui/Button';
import { Download } from 'lucide-react';

interface PageHeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showIcon?: boolean;
}

export function PageHeroSection({ title, description, imageUrl, imageAlt, buttonLabel, onButtonClick, showIcon = true }: PageHeroSectionProps) {
  return (
    <section className="max-w-[1400px] mx-auto mb-20 px-6 md:px-12 lg:px-0">
      <div className="flex gap-8 items-start mb-12 justify-between">
        {/* Title and Description */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#2A372F] mb-6 leading-tight">
            {title}
          </h1>
          <div className="w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent mb-8"></div>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl text-[#2A372F]/70">
            {description}
          </p>

          {/* Mobile button */}
          {buttonLabel && onButtonClick && (
            <div className="md:hidden mt-6">
              <Button
                variant="primary"
                size="md"
                onClick={onButtonClick}
                className={`flex ${showIcon ? 'gap-2' : ''} items-center`}
              >
                {buttonLabel}
                {showIcon && <Download size={18} />}
              </Button>
            </div>
          )}
        </div>

        {/* Right side button */}
        {buttonLabel && onButtonClick && (
          <div className="hidden md:flex flex-col items-center pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={onButtonClick}
              className={`flex ${showIcon ? 'gap-2' : ''} items-center whitespace-nowrap`}
            >
              {buttonLabel}
              {showIcon && <Download size={18} />}
            </Button>
          </div>
        )}
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg group">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
      </div>
    </section>
  );
}
