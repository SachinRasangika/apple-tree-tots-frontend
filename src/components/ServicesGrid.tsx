import React, { useState } from 'react';
import { Button } from './ui/Button';
import { AnimatedSection } from './AnimatedSection';
interface ServiceCardProps {
  title: string;
  date?: string;
  description?: string;
  cta?: string;
}
function ServiceCard({
  title,
  date,
  description,
  cta = 'BOOK'
}: ServiceCardProps) {
  return <div className="group bg-[#CDD1CB]/95 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[280px] hover:shadow-md transition-all duration-300 border border-[#2A372F]/20">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-base md:text-lg font-semibold text-[#2A372F] leading-tight max-w-[80%] group-hover:text-[#1a2720] transition-colors duration-300">
          {title}
        </h3>
        {date && <span className="text-[11px] tracking-wide text-[#2A372F]/60 group-hover:text-[#2A372F] transition-colors duration-300 flex-shrink-0 ml-2">
            {date}
          </span>}
      </div>

      <div className="mt-auto">
        {description && <p className="text-sm text-[#2A372F]/70 mb-6 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
            {description}
          </p>}
        <div className="flex justify-between items-center gap-4 pt-4 border-t border-[#2A372F]/10">
          <span className="text-[11px] uppercase tracking-wide text-[#2A372F]/60 cursor-pointer hover:text-[#2A372F] transition-colors duration-200">
            Explore
          </span>
          <button className="text-[11px] uppercase tracking-wide font-medium text-[#2A372F]/70 hover:text-[#2A372F] transition-colors duration-200 relative group/btn">
            {cta}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#2A372F] group-hover/btn:w-full transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </div>;
}
export function ServicesGrid() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const services = [{
    title: 'MONTESSORI CURRICULUM',
    description: 'Child-centered learning approach fostering independence'
  }, {
    title: 'ENGLISH MEDIUM',
    description: 'Comprehensive English language immersion program'
  }, {
    title: 'QUALIFIED TEACHERS',
    date: 'ECE Certified',
    description: 'Degree-holding educators with 1+ years experience'
  }, {
    title: 'SMALL CLASS SIZES',
    date: '1:8 ratio',
    description: 'Personalized attention for every child'
  }, {
    title: 'OUTDOOR LEARNING',
    date: 'daily',
    description: 'Nature-based activities in our garden space'
  }, {
    title: 'PARENT WORKSHOPS',
    date: 'monthly',
    description: 'Educational resources and community events'
  }, {
    title: 'CULTURAL PROGRAMS',
    date: 'year-round',
    description: 'Celebrating Sri Lankan heritage and traditions',
    cta: 'LEARN MORE'
  }, {
    title: 'SCHOOL READINESS',
    date: 'ages 4-5',
    description: 'Preparing children for primary school success'
  }];
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return <AnimatedSection className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block" animation="fade-in-up">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
          A Foundation for <br />
          <span className="italic opacity-80">Lifelong Learning</span>
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => <div key={index} className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: `${index * 100}ms` }}>
            <ServiceCard {...service} />
          </div>)}
      </div>

      {/* Mobile Carousel with Pagination & Arrows */}
      <div className="md:hidden">
        <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {services.map((service, index) => <div key={index} className="flex-shrink-0 w-full px-2">
                <ServiceCard {...service} />
              </div>)}
          </div>

          {/* Arrow Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#2A372F]/30 hover:bg-[#2A372F]/50 text-[#2A372F] rounded-full p-2 transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2A372F]/30 hover:bg-[#2A372F]/50 text-[#2A372F] rounded-full p-2 transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {services.map((_, index) => <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />)}
        </div>
      </div>
    </AnimatedSection>;
}
