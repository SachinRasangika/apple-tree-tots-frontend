import React from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingBottomNavbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center">
      <div className="bg-[#CDD1CB]/95 rounded-none border border-[#2A372F]/20 max-w-sm w-full overflow-hidden transition-all duration-300">
        <div className="flex items-center">
          <div className="flex w-full gap-3 p-3">
            <button onClick={() => navigate('/application')} className="inline-flex items-center justify-center transition-all duration-300 uppercase tracking-widest font-medium text-xs bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720] px-4 py-2 flex-1 rounded">
              Apply Now
            </button>
            <a href="tel:+94743431488" className="inline-flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest font-medium text-xs bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720] px-4 py-2 flex-1 rounded">
              <Phone size={16} />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
