import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
interface TestimonialProps {
  quote: string;
  parent: string;
  child: string;
  program: string;
  delay: string;
}
function TestimonialCard({
  quote,
  parent,
  child,
  program,
  delay
}: TestimonialProps) {
  return <div className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 flex flex-col justify-between min-h-[280px] hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{
    animationDelay: delay
  }}>
      <div>
        <Quote className="w-8 h-8 text-[#2A372F] mb-6 group-hover:text-[#1a2720] transition-colors duration-300" />
        <p className="text-sm font-light text-[#2A372F]/70 leading-relaxed mb-6 group-hover:text-[#2A372F] transition-colors duration-300">
          "{quote}"
        </p>
      </div>

      <div className="border-t border-[#2A372F]/20 group-hover:border-[#2A372F]/40 pt-4 transition-colors duration-300">
        <p className="text-xs font-semibold tracking-wide uppercase text-[#2A372F] mb-1 group-hover:text-[#1a2720] transition-colors duration-300">
          {parent}
        </p>
        <p className="text-[10px] tracking-wide text-[#2A372F]/60 group-hover:text-[#2A372F]/80 transition-colors duration-300">
          Parent of {child} • {program}
        </p>
      </div>
    </div>;
}
export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [{
    quote: 'The qualified teachers at Apple Tree Tots have been exceptional. My daughter has flourished in their Montessori program, and her English has improved dramatically in just six months.',
    parent: 'Sanduni Perera',
    child: 'Amaya, Age 4',
    program: 'CASA Programs',
    delay: '0ms'
  }, {
    quote: 'As expats living in Ahangama, finding quality English-medium education was crucial. Apple Tree Tots exceeded our expectations with their professional approach and nurturing environment.',
    parent: 'James & Claire Wilson',
    child: 'Oliver, Age 3',
    program: 'Toddler Programs',
    delay: '150ms'
  }, {
    quote: "The small class sizes and individual attention have made all the difference. The teachers genuinely care about each child's development and communicate regularly with parents.",
    parent: 'Rohan Fernando',
    child: 'Dilan, Age 5',
    program: 'CASA Programs',
    delay: '300ms'
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
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return <AnimatedSection className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block" animation="fade-in-up">
      <div className="mb-16 text-center">
        <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
          Parent Voices
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
          What Families <span className="italic opacity-80">Are Saying</span>
        </h2>
        <p className="text-[#2A372F]/70 font-light max-w-2xl mx-auto text-sm">
          Hear from parents in our community about their experience with Apple
          Tree Tots Preschool
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(testimonial => <TestimonialCard key={testimonial.parent} {...testimonial} />)}
      </div>

      {/* Mobile Carousel with Pagination & Arrows */}
      <div className="md:hidden">
        <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map(testimonial => <div key={testimonial.parent} className="flex-shrink-0 w-full px-2">
                <TestimonialCard {...testimonial} />
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
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />)}
        </div>
      </div>
    </AnimatedSection>;
}
