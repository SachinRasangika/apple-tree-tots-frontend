import React from 'react';
import { AnimatedSection } from './AnimatedSection';

interface ValueCardProps {
  emoji: string;
  title: string;
  description: string;
  delay: string;
}

function ValueCard({ emoji, title, description, delay }: ValueCardProps) {
  return (
    <div
      className="group opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] h-full"
      style={{ animationDelay: delay }}
    >
      <div className="h-full bg-white/40 backdrop-blur-sm border border-[#2d5555]/10 rounded-2xl p-8 md:p-10 hover:bg-white/60 hover:border-[#2d5555]/20 transition-all duration-300 flex flex-col">
        <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>
        
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#2A372F] group-hover:text-[#1a2720] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm md:text-base font-light text-[#2A372F]/70 group-hover:text-[#2A372F] transition-colors duration-300 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
}

export function CoreValuesSection() {
  const values = [
    {
      emoji: '🌿',
      title: 'Nature-based Learning',
      description: 'Connecting children with the earth, seasons, and life around them.',
      delay: '0ms'
    },
    {
      emoji: '🍎',
      title: 'Holistic Growth',
      description: 'Nurturing emotional, physical, intellectual, and social development.',
      delay: '150ms'
    },
    {
      emoji: '⭐',
      title: 'Joyful Exploration',
      description: 'Learning through play, creativity, and meaningful experiences.',
      delay: '300ms'
    },
    {
      emoji: '❤️',
      title: 'Community and Kindness',
      description: 'Building respect, care, and cooperation from the beginning.',
      delay: '450ms'
    },
    {
      emoji: '🤝',
      title: 'Collaboration and Respect',
      description: 'Encouraging teamwork, sharing, and empathy.',
      delay: '600ms'
    },
    {
      emoji: '🌺',
      title: 'Cultural Connection',
      description: 'Introducing children to Sri Lankan traditions, nature experiences, and outdoor activities that enrich and deepen their learning.',
      delay: '750ms'
    }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block">
      <div className="text-center mb-16">
        <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
          What Guides Us
        </span>
        
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-8 text-[#2A372F]">
          Our Core Values
        </h2>
        
        <div className="w-16 h-1 bg-gradient-to-r from-[#2d5555] via-[#3d6666] to-transparent mx-auto mb-8"></div>
        
        <p className="text-base md:text-lg font-light text-[#2A372F]/75 max-w-2xl mx-auto leading-relaxed">
          At the heart of everything we do, these six values shape how we nurture, teach, and guide our children.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {values.map((value) => (
          <ValueCard
            key={value.title}
            emoji={value.emoji}
            title={value.title}
            description={value.description}
            delay={value.delay}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}
