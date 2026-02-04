import React, { useMemo } from 'react';
import { X } from 'lucide-react';

interface Event {
  date: number;
  month: number;
  title: string;
}

const EVENTS: Event[] = [
  // 1st Term (January – April)
  { date: 5, month: 1, title: '1st Term (Jan–Apr) | Jan 5: School Reopens' },
  { date: 15, month: 1, title: 'Jan 15: Thai Pongal Festival' },
  { date: 4, month: 2, title: 'Feb 4: Independence Day' },
  { date: 13, month: 3, title: 'Mar 13: Friendship Day' },
  { date: 10, month: 4, title: 'Apr 10: Sinhala & Tamil New Year (Awurudu)' },
  { date: 15, month: 4, title: 'Holidays: 1st Term Holidays Apr–May' },

  // 2nd Term (May – August)
  { date: 4, month: 5, title: '2nd Term (May–Aug) | May 4: 2nd Term Begins' },
  { date: 8, month: 5, title: "May 8: Mother's Day" },
  { date: 29, month: 5, title: 'May 29: Haj Festival' },
  { date: 5, month: 6, title: 'Jun 5: World Environment Day' },
  { date: 19, month: 6, title: "Jun 19: Father's Day" },
  { date: 26, month: 6, title: 'Jun 26: Poson Poya Day' },
  { date: 31, month: 7, title: 'Jul 31: Sports Day' },
  { date: 3, month: 8, title: "Aug 3–7: Parents' Meetings" },
  { date: 10, month: 8, title: 'Aug 10–14: Fun Activity Week' },
  { date: 14, month: 8, title: 'Aug 14: School Holiday' },

  // 3rd Term (September – December)
  { date: 7, month: 9, title: '3rd Term (Sep–Dec) | Sep 7: 3rd Term Begins' },
  { date: 25, month: 9, title: 'Sep 25: Field Trip' },
  { date: 2, month: 10, title: "Oct 2: Children's Day" },
  { date: 12, month: 10, title: 'Oct 12–16: Healthy Food Week' },
  { date: 16, month: 10, title: 'Oct 16: World Food Day' },
  { date: 30, month: 10, title: 'Oct 30: Sigithi Pola' },
  { date: 16, month: 11, title: "Nov 16–20: Parents' Observation Week" },
  { date: 28, month: 11, title: 'Nov 28: Graduation Ceremony' },

  // December Special Events
  { date: 7, month: 12, title: 'Dec 7–11 (Fun Week): PJ Day, Movie Day, Picnic Day, Book Day, Water Day' },
  { date: 11, month: 12, title: 'Dec 11: Christmas Party' },
  { date: 12, month: 12, title: 'Dec 12: Term Holiday Begins' },
  { date: 20, month: 12, title: 'Message for Parents: Check calendar regularly for updates' },
];

interface EventBannerProps {
  onClose: () => void;
}

export function EventBanner({ onClose }: EventBannerProps) {

  const currentTermEvents = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    let termMonths: number[] = [];

    // Determine which term we're in
    if (currentMonth >= 1 && currentMonth <= 4) {
      // 1st Term: January – April
      termMonths = [1, 2, 3, 4];
    } else if (currentMonth >= 5 && currentMonth <= 8) {
      // 2nd Term: May – August
      termMonths = [5, 6, 7, 8];
    } else if (currentMonth >= 9 && currentMonth <= 12) {
      // 3rd Term: September – December
      termMonths = [9, 10, 11, 12];
    }

    return EVENTS
      .filter(event => termMonths.includes(event.month))
      .sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.date - b.date;
      });
  }, []);

  const eventText = currentTermEvents.length > 0
    ? currentTermEvents.map(e => e.title).join('          ★          ')
    : `Welcome to Apple Tree Tots! Check our calendar for upcoming events.`;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#2A372F] to-[#1a4d4d] text-white h-12 md:h-14">
      <div className="flex items-center h-full px-4 md:px-6 gap-3 relative">
        {/* Marquee Text Container */}
        <div className="flex-1 min-w-0 overflow-hidden mask-gradient">
          <div className="inline-flex animate-scroll whitespace-nowrap" style={{ animation: `scroll 90s linear infinite` }}>
            {[0, 1].map((idx) => (
              <span key={idx} className="text-xs md:text-sm font-semibold tracking-widest px-8 flex-shrink-0">
                {eventText}
              </span>
            ))}
          </div>
        </div>

        {/* Close Button - Right Side */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors absolute right-4 md:right-6"
          aria-label="Close event banner"
        >
          <X size={18} />
        </button>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(50vw);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 90s linear infinite;
        }

        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </div>
  );
}
