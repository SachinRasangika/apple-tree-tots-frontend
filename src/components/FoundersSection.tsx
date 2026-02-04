import React, { useState } from 'react';
import { Button } from './ui/Button';
import { AnimatedSection } from './AnimatedSection';

export function FoundersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      setCurrentSlide((prev) => (prev + 1) % 3);
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + 3) % 3);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };
  return <AnimatedSection className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block" animation="fade-in-up">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
          Our Learning
          <br />
          <span className="italic opacity-80">Approach</span>
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1: Play-Based Learning */}
        <div className="group">
          <div className="aspect-square overflow-hidden rounded-lg mb-6">
            <img src="https://images.pexels.com/photos/8618062/pexels-photo-8618062.jpeg" alt="Children learning through play and interaction" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
          </div>
          <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
            Learning Through Play
          </h3>
          <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
            We believe children learn best when they're having fun! Our play-based curriculum encourages curiosity, creativity, and discovery every day.
          </p>
        </div>

        {/* Feature 2: Creative Spaces */}
        <div className="group">
          <div className="aspect-square overflow-hidden rounded-lg mb-6">
            <img src="https://images.pexels.com/photos/9534281/pexels-photo-9534281.jpeg" alt="Colorful creative art and handprints" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
          </div>
          <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
            Creative Spaces
          </h3>
          <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
            Bright, colorful classrooms filled with art supplies, building blocks, and engaging materials designed to spark imagination and self-expression.
          </p>
        </div>

        {/* Feature 3: Caring Teachers */}
        <div className="group">
          <div className="aspect-square overflow-hidden rounded-lg mb-6">
            <img src="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg" alt="Caring teacher with happy children" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
          </div>
          <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
            Caring Professionals
          </h3>
          <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
            Our trained and compassionate teachers provide a warm, safe, and nurturing environment where every child feels loved and valued.
          </p>
        </div>
      </div>

      {/* Mobile Carousel with Pagination & Arrows */}
      <div className="md:hidden">
        <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {/* Feature 1: Play-Based Learning */}
            <div className="flex-shrink-0 w-full px-2 group">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img src="https://images.pexels.com/photos/8618062/pexels-photo-8618062.jpeg" alt="Children learning through play and interaction" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
                Learning Through Play
              </h3>
              <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
                We believe children learn best when they're having fun! Our play-based curriculum encourages curiosity, creativity, and discovery every day.
              </p>
            </div>

            {/* Feature 2: Creative Spaces */}
            <div className="flex-shrink-0 w-full px-2 group">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img src="https://images.pexels.com/photos/9534281/pexels-photo-9534281.jpeg" alt="Colorful creative art and handprints" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
                Creative Spaces
              </h3>
              <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
                Bright, colorful classrooms filled with art supplies, building blocks, and engaging materials designed to spark imagination and self-expression.
              </p>
            </div>

            {/* Feature 3: Caring Teachers */}
            <div className="flex-shrink-0 w-full px-2 group">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img src="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg" alt="Caring teacher with happy children" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-lg font-semibold text-[#2A372F] mb-3">
                Caring Professionals
              </h3>
              <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm">
                Our trained and compassionate teachers provide a warm, safe, and nurturing environment where every child feels loved and valued.
              </p>
            </div>
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
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === 0 ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
            }`}
            aria-label="Learning Through Play"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === 1 ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
            }`}
            aria-label="Creative Spaces"
          />
          <button
            onClick={() => setCurrentSlide(2)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === 2 ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
            }`}
            aria-label="Caring Professionals"
          />
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button>Our Team</Button>
      </div>
    </AnimatedSection>;
}
