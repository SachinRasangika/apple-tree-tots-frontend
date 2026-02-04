import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

const PHONE_NUMBERS = [
  { country: 'Sri Lanka', number: '+94 74 343 1488', tel: '+94743431488' },
  { country: 'UK', number: '+44 7588 828866', tel: '+447588828866' },
  { country: 'Sri Lanka', number: '+94 75 780 0822', tel: '+94757800822' },
];

export function FloatingCallButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-[#E77A6A] hover:bg-[#D4664F] text-[#FAF7F1] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Click to call us"
      >
        <Phone size={24} className={isOpen ? '' : 'group-hover:animate-pulse'} />
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Phone Numbers Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 bg-[#FAF7F1] rounded-lg shadow-2xl border border-[#D1D5DB] overflow-hidden w-72 animate-slideUp">
          {/* Header */}
          <div className="bg-[#5F8F9A] text-[#FAF7F1] px-6 py-4 flex items-center justify-between">
            <h3 className="font-serif tracking-wide text-sm uppercase">Call Us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#5F8F9A]/80 p-1 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Phone Numbers */}
          <div className="p-4 space-y-3">
            {PHONE_NUMBERS.map((item, index) => (
              <a
                key={index}
                href={`tel:${item.tel}`}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#5F8F9A]/10 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#E77A6A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E77A6A]/30 transition-colors">
                  <Phone size={16} className="text-[#E77A6A]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#5F8F9A] uppercase tracking-widest font-bold">
                    {item.country}
                  </p>
                  <p className="text-sm text-[#222222] font-light group-hover:text-[#E77A6A] transition-colors">
                    {item.number}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
