import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from 'lucide-react';
import { Button } from './ui/Button';
import { clsx } from 'clsx';

interface ClassSession {
  name: string;
  teacher: string;
  level: string;
  capacity: string;
}

interface TimeSlot {
  time: string;
  sessions: {
    [key: string]: ClassSession | null;
  };
}

const ACTIVITY_COLORS: { [key: string]: { bg: string; accent: string } } = {
  'OMNI VINYASA': { bg: 'bg-white/10 border-white/30', accent: '#2d5555' },
  'DREAMY VINYASA': { bg: 'bg-white/10 border-white/30', accent: '#2d5555' },
  'PILATES': { bg: 'bg-white/10 border-white/30', accent: '#2d5555' },
  'SOUND & YIN YANG': { bg: 'bg-white/10 border-white/30', accent: '#2d5555' },
  'SOUND YIN YANG': { bg: 'bg-white/10 border-white/30', accent: '#2d5555' }
};

export function ClassScheduleSection() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState({
    time: 'all',
    activity: 'all',
    teacher: 'all',
    level: 'all'
  });

  const getTodayDayKey = () => {
    const today = new Date();
    const dayIndex = today.getDay();
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayKeys[dayIndex];
  };

  const todayKey = getTodayDayKey();

  const getWeekLabel = () => {
    const baseDate = new Date('2024-11-07');
    const startDate = new Date(baseDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    const format = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
    return `${format(startDate)} - ${format(endDate)}`;
  };

  const currentWeek = getWeekLabel();

  const getWeekDays = () => {
    const baseDate = new Date('2024-11-07');
    const startDate = new Date(baseDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);
    const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const keys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return dayNames.map((day, idx) => {
      const date = new Date(startDate.getTime() + idx * 24 * 60 * 60 * 1000);
      return {
        key: keys[idx],
        label: `${day} ${date.getDate()}/${date.getMonth() + 1}`
      };
    });
  };

  const weekDays = getWeekDays();

  const schedule: TimeSlot[] = [{
    time: '7:30-8:30',
    sessions: {
      monday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      tuesday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      wednesday: null,
      thursday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      friday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      saturday: null,
      sunday: null
    }
  }, {
    time: '8:30-9:30',
    sessions: {
      monday: null,
      tuesday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      wednesday: null,
      thursday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      friday: null,
      saturday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      sunday: {
        name: 'PILATES',
        teacher: 'Maxime Menten',
        level: 'All levels',
        capacity: '(20/26)'
      }
    }
  }, {
    time: '18:30-19:30',
    sessions: {
      monday: {
        name: 'PILATES',
        teacher: 'Maxime Menten',
        level: 'All levels',
        capacity: '(20/26)'
      },
      tuesday: null,
      wednesday: null,
      thursday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      friday: {
        name: 'SOUND & YIN YANG',
        teacher: 'Carolina Dorell',
        level: 'All levels',
        capacity: '(19/20)'
      },
      saturday: null,
      sunday: null
    }
  }, {
    time: '19:30-20:30',
    sessions: {
      monday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      tuesday: {
        name: 'SOUND YIN YANG',
        teacher: 'Carolina Dorell',
        level: 'All levels',
        capacity: '(19/20)'
      },
      wednesday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      thursday: null,
      friday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      saturday: {
        name: 'PILATES',
        teacher: 'Maxime Menten',
        level: 'All levels',
        capacity: '(20/26)'
      },
      sunday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      }
    }
  }, {
    time: '20:30-21:30',
    sessions: {
      monday: {
        name: 'DREAMY VINYASA',
        teacher: 'Rose-Meije Smit',
        level: 'All levels',
        capacity: '(17/26)'
      },
      tuesday: null,
      wednesday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      thursday: {
        name: 'PILATES',
        teacher: 'Maxime Menten',
        level: 'All levels',
        capacity: '(20/26)'
      },
      friday: null,
      saturday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      },
      sunday: null
    }
  }, {
    time: '21:30-22:30',
    sessions: {
      monday: null,
      tuesday: {
        name: 'DREAMY VINYASA',
        teacher: 'Rose-Meije Smit',
        level: 'All levels',
        capacity: '(17/26)'
      },
      wednesday: null,
      thursday: {
        name: 'DREAMY VINYASA',
        teacher: 'Rose-Meije Smit',
        level: 'All levels',
        capacity: '(17/26)'
      },
      friday: null,
      saturday: {
        name: 'DREAMY VINYASA',
        teacher: 'Rose-Meije Smit',
        level: 'All levels',
        capacity: '(17/26)'
      },
      sunday: {
        name: 'OMNI VINYASA',
        teacher: 'Yiwen Wang',
        level: 'All levels',
        capacity: '(23/26)'
      }
    }
  }];

  const bgColor = 'bg-[#2d4a4a]';
  const textColor = 'text-white';
  const mutedTextColor = 'text-white/70';
  const headingColor = 'text-white';
  const selectBg = 'bg-[#152e2e] border-white/20 text-white';
  const selectFocus = 'focus:ring-white/50';
  const navButtonBg = 'border-white/20 hover:bg-white/10 text-white';

  return <div className={`py-20 ${bgColor} block transition-colors duration-300`}>
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-12">
        <h2 className={`text-4xl md:text-5xl font-serif tracking-widest uppercase font-light mb-2 ${headingColor}`}>
          Class Schedule
        </h2>
        <p className={`${mutedTextColor} mb-8`}>Find and book your perfect class</p>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Week Navigation */}
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setWeekOffset(weekOffset - 1)} className={clsx('p-2 rounded-lg transition-colors border', navButtonBg)}>
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2 px-6 py-3 rounded-lg border bg-[#152e2e] border-white/20">
              <Calendar size={18} className="text-white/70" />
              <span className={clsx('text-sm font-semibold tracking-widest uppercase', textColor)}>
                {currentWeek}
              </span>
            </div>

            <button onClick={() => setWeekOffset(weekOffset + 1)} className={clsx('p-2 rounded-lg transition-colors border', navButtonBg)}>
              <ChevronRight size={20} />
            </button>

            <Button onClick={() => setWeekOffset(0)} variant="primary" size="sm">
              TODAY
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select value={selectedFilter.activity} onChange={e => setSelectedFilter({
            ...selectedFilter,
            activity: e.target.value
          })} className={clsx('px-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-xs uppercase tracking-widest transition-colors border', selectBg, selectFocus)}>
              <option value="all" className="bg-[#1a3a3a]">
                All Activities
              </option>
              <option value="vinyasa" className="bg-[#1a3a3a]">
                Vinyasa
              </option>
              <option value="pilates" className="bg-[#1a3a3a]">
                Pilates
              </option>
              <option value="yin" className="bg-[#1a3a3a]">
                Yin Yang
              </option>
            </select>

            <select value={selectedFilter.teacher} onChange={e => setSelectedFilter({
            ...selectedFilter,
            teacher: e.target.value
          })} className={clsx('px-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-xs uppercase tracking-widest transition-colors border', selectBg, selectFocus)}>
              <option value="all" className="bg-[#1a3a3a]">
                All Teachers
              </option>
              <option value="yiwen" className="bg-[#1a3a3a]">
                Yiwen Wang
              </option>
              <option value="maxime" className="bg-[#1a3a3a]">
                Maxime Menten
              </option>
              <option value="carolina" className="bg-[#1a3a3a]">
                Carolina Dorell
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 gap-3 mb-3 pb-4 border-b-2 border-white/10">
            <div className="flex items-center justify-center py-2">
              <span className={clsx('text-xs font-bold uppercase tracking-widest', mutedTextColor)}>
                TIME
              </span>
            </div>
            {weekDays.map(day => <div key={day.key} className={clsx('text-center py-2 rounded-lg transition-colors', day.key === todayKey ? 'bg-white/20' : '')}>
              <span className={clsx('text-xs font-bold uppercase tracking-widest', day.key === todayKey ? 'text-white' : textColor)}>
                {day.label}
              </span>
            </div>)}
          </div>

          {/* Schedule Rows */}
          {schedule.map((slot, index) => <div key={index} className="grid grid-cols-8 gap-3 mb-2">
            {/* Time Column */}
            <div className="flex items-start justify-center pt-2">
              <span className="text-sm font-semibold px-3 py-2 rounded-lg bg-white/10 text-white">
                <Clock size={14} className="inline mr-2" />
                {slot.time}
              </span>
            </div>

            {/* Day Columns */}
            {weekDays.map(day => {
          const session = slot.sessions[day.key];
          const shouldShow = session && (selectedFilter.activity === 'all' || 
            (selectedFilter.activity === 'vinyasa' && session.name.includes('VINYASA')) ||
            (selectedFilter.activity === 'pilates' && session.name.includes('PILATES')) ||
            (selectedFilter.activity === 'yin' && session.name.includes('YIN'))) &&
          (selectedFilter.teacher === 'all' || 
            (selectedFilter.teacher === 'yiwen' && session.teacher === 'Yiwen Wang') ||
            (selectedFilter.teacher === 'maxime' && session.teacher === 'Maxime Menten') ||
            (selectedFilter.teacher === 'carolina' && session.teacher === 'Carolina Dorell'));

          const colors = session ? ACTIVITY_COLORS[session.name] : null;

          const isToday = day.key === todayKey;

          return <div key={day.key} className={clsx('rounded-lg transition-colors', isToday ? 'bg-white/10' : '')}>
                  {shouldShow && session && colors ? <button className={clsx('w-full h-full min-h-[120px] p-3 text-left transition-all duration-300 rounded-lg border-2 hover:shadow-lg', colors.bg)} style={{}}>
                      <div className="space-y-2">
                        <h4 className={clsx('text-xs font-bold uppercase tracking-wider', textColor)}>
                          {session.name}
                        </h4>
                        <div className="space-y-2">
                          <p className={clsx('text-xs flex items-center gap-2', mutedTextColor)}>
                            <User size={14} />
                            {session.teacher}
                          </p>
                        </div>
                      </div>
                    </button> : <div className={clsx('w-full h-full min-h-[120px] border-2 border-dashed rounded-lg transition-colors', isToday ? 'bg-white/15 border-white/20' : 'bg-white/5 border-white/10')}></div>}
                </div>;
        })}
            </div>)}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 p-6 rounded-lg border bg-white/10 border-white/10">
        <h3 className="text-sm font-bold mb-4 tracking-widest uppercase text-white">
          Legend
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded border-2 bg-white/20 border-white/30"></div>
            <span className="text-sm text-white">= Class Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded border-2 border-dashed bg-white/5 border-white/10"></div>
            <span className="text-sm text-white">= No Class</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
