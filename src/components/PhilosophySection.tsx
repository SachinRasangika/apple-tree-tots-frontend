import React, { useState, useEffect } from 'react';
import { Leaf, Apple, Sparkles, Heart, Users, Flower2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  number: number;
}

function ValueCard({ icon, title, description, delay, number }: ValueCardProps) {
  return (
    <div
      className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] group"
      style={{ animationDelay: delay }}
    >
      <div className="relative h-full">
        {/* Card content */}
        <div className="relative border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm h-full flex flex-col overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12"></div>

          {/* Number accent */}
          <div className="absolute top-4 right-6 text-white/15 text-5xl font-serif">
            {String(number).padStart(2, '0')}
          </div>

          {/* Icon container */}
          <div className="relative mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>

          {/* Text content */}
          <h3 className="text-lg md:text-xl font-serif tracking-wide mb-3 text-white relative z-10">
            {title}
          </h3>

          <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed flex-grow relative z-10">
            {description}
          </p>

          {/* Bottom accent */}
          <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
            <div className="inline-block">
              <span className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold">
                ✦ Core Value
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhilosophySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 6); // 6 values total
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: <Leaf size={40} strokeWidth={1.5} />,
      title: 'Nature-based Learning',
      description: 'Connecting children with the earth, seasons, and life around them through meaningful outdoor exploration.',
      number: 1
    },
    {
      icon: <Apple size={40} strokeWidth={1.5} />,
      title: 'Holistic Growth',
      description: 'Nurturing emotional, physical, intellectual, and social development in our children.',
      number: 2
    },
    {
      icon: <Sparkles size={40} strokeWidth={1.5} />,
      title: 'Joyful Exploration',
      description: 'Learning through play, creativity, and meaningful experiences that spark curiosity.',
      number: 3
    },
    {
      icon: <Heart size={40} strokeWidth={1.5} />,
      title: 'Community and Kindness',
      description: 'Building respect, care, and cooperation through a culture of compassion and connection.',
      number: 4
    },
    {
      icon: <Users size={40} strokeWidth={1.5} />,
      title: 'Collaboration and Respect',
      description: 'Encouraging teamwork, sharing, and empathy in our learning community.',
      number: 5
    },
    {
      icon: <Flower2 size={40} strokeWidth={1.5} />,
      title: 'Cultural Connection',
      description: 'Introducing children to Sri Lankan traditions and outdoor activities that enrich their learning.',
      number: 6
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left - next slide
      setCurrentSlide((prev) => (prev + 1) % values.length);
    } else if (touchEnd - touchStart > 50) {
      // Swiped right - previous slide
      setCurrentSlide((prev) => (prev - 1 + values.length) % values.length);
    }
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + values.length) % values.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % values.length);
  };

  return (
    <AnimatedSection className="py-16 md:py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden block bg-[#2d5555]">

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          {/* Decorative line with label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/40"></div>
            <span className="text-xs tracking-[0.3em] uppercase font-bold text-white/60 whitespace-nowrap">
              Our Philosophy
            </span>
            <div className="flex-1 h-px bg-white/40"></div>
          </div>

          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-widest uppercase mb-4 text-white leading-tight">
            Six Core Values
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg font-light text-white/60 max-w-2xl mb-6">
            That Guide Our Journey
          </p>

          {/* Philosophy statement */}
          <div className="max-w-3xl">
            <p className="text-sm md:text-base font-light text-white/75 leading-relaxed">
              At Apple Tree Tots Preschool, we believe that learning should grow as naturally as a tree—rooted in care, nourished by curiosity, and strengthened through exploration. Our approach is inspired by AMI Montessori principles.
            </p>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {values.map((value) => (
                <div key={value.title} className="w-full flex-shrink-0">
                  <ValueCard
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                    number={value.number}
                    delay="0ms"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {values.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white w-6'
                      : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              number={value.number}
              delay={`${index * 100}ms`}
            />
          ))}
        </div>

        {/* Bottom section with decorative divider */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="mx-4 w-8 h-px bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
          
          <p className="text-center text-xs md:text-sm font-light text-white/50 max-w-3xl mx-auto">
            These values form the heart of Apple Tree Tots, shaping how we nurture and guide every child.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
