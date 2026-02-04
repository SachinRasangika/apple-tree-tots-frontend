import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingActionBar() {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the hero section
    const heroSection = document.querySelector('[data-hero-section]');
    if (!heroSection) return;

    // Create an observer to detect when hero section starts scrolling out
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero section is NOT visible (starts scrolling)
        setShowBar(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -50% 0px',
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.unobserve(heroSection);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-40 flex justify-center transition-all duration-300 ease-in-out ${
        showBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#CDD1CB]/95 rounded-none border border-[#2A372F]/20 max-w-sm w-full overflow-hidden">
        <div className="flex items-center">
          <div className="flex w-full gap-3 p-3">
            <button onClick={() => navigate('/application')} className="inline-flex items-center justify-center transition-all duration-300 ease-in-out uppercase tracking-widest font-medium text-xs bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720] px-4 py-2 flex-1 rounded">
              Apply Now
            </button>
            <a
              href="tel:+94743431488"
              className="inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out uppercase tracking-widest font-medium text-xs bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720] px-4 py-2 flex-1 rounded"
            >
              <Phone size={16} className="flex-shrink-0" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
