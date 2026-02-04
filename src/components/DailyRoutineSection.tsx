import React from 'react';
import { Clock, Sun, Coffee, BookOpen, Palette, Music, Utensils, TreePine, Home } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface RoutineItemProps {
  time: string;
  activity: string;
  description: string;
  icon: React.ReactNode;
}

function RoutineItem({
  time,
  activity,
  description,
  icon
}: RoutineItemProps) {
  return <div className="flex-shrink-0 w-80 bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors duration-300">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-white/20 border border-white/10 flex items-center justify-center text-white mb-4">
        {icon}
      </div>

      {/* Content */}
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-white block mb-2">
          {time}
        </span>
        <h3 className="text-base font-serif tracking-wide text-white mb-3">{activity}</h3>
        <p className="text-sm text-gray-300 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>;
}

export function DailyRoutineSection() {
  const routine = [{
    time: '07:30',
    activity: 'Morning Arrival',
    description: 'Warm welcome and free play as children settle in',
    icon: <Sun size={20} />,
    delay: '0ms'
  }, {
    time: '08:30',
    activity: 'Circle Time',
    description: 'Morning songs, calendar, weather, and sharing time',
    icon: <Music size={20} />,
    delay: '100ms'
  }, {
    time: '09:00',
    activity: 'Montessori Work Period',
    description: 'Self-directed learning with specialized materials',
    icon: <BookOpen size={20} />,
    delay: '200ms'
  }, {
    time: '10:00',
    activity: 'Snack & Story Time',
    description: 'Healthy snack followed by storytelling in English',
    icon: <Coffee size={20} />,
    delay: '300ms'
  }, {
    time: '10:30',
    activity: 'Outdoor Learning',
    description: 'Garden exploration, physical play, and nature activities',
    icon: <TreePine size={20} />,
    delay: '400ms'
  }, {
    time: '11:30',
    activity: 'Creative Arts',
    description: 'Art, music, or hands-on STEAM projects',
    icon: <Palette size={20} />,
    delay: '500ms'
  }, {
    time: '12:30',
    activity: 'Lunch Time',
    description: 'Nutritious meal and social development',
    icon: <Utensils size={20} />,
    delay: '600ms'
  }, {
    time: '13:30',
    activity: 'Quiet Time & Activities',
    description: 'Rest period followed by afternoon learning centers',
    icon: <BookOpen size={20} />,
    delay: '700ms'
  }, {
    time: '15:30',
    activity: 'Afternoon Snack',
    description: 'Light refreshment and group activities',
    icon: <Coffee size={20} />,
    delay: '800ms'
  }, {
    time: '16:00',
    activity: 'Departure',
    description: 'Closing circle and parent pickup (extended care until 18:00)',
    icon: <Home size={20} />,
    delay: '900ms'
  }];

  return <AnimatedSection className="py-20 bg-[#2d4a4a] block" animation="fade-in-up">
      <div className="max-w-full">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-white font-bold mb-4 block">
            A Day in the Life
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-white">
            Daily <span className="italic opacity-80">Routine</span>
          </h2>
          <p className="text-gray-300 font-light leading-relaxed text-sm mb-6 max-w-2xl">
            Our structured yet flexible schedule balances learning, play,
            and rest. Each day is thoughtfully designed to nurture your
            child's development across all domains.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-300">
            <Clock size={16} className="text-white" />
            <span>Monday - Friday, 7:30 AM - 6:00 PM</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlay left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#2d4a4a] to-transparent z-10 pointer-events-none"></div>

          {/* Gradient overlay right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#2d4a4a] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="flex animate-scrollLeft hover:[animation-play-state:paused] gap-6 px-6 md:px-12 lg:px-20 py-4">
            {/* First set */}
            {routine.map(item => <RoutineItem key={`${item.time}-1`} {...item} />)}

            {/* Duplicate set for seamless loop */}
            {routine.map(item => <RoutineItem key={`${item.time}-2`} {...item} />)}
          </div>
        </div>
      </div>
    </AnimatedSection>;
}
