import React, { useState } from 'react';
import { Building2, Calendar, FileText, Users, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { AnimatedSection } from './AnimatedSection';

export function EnrollmentOfficeSection() {
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
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column: Info & Contact */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
              Admissions
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F] leading-tight">
              Enrollment & <br /> <span className="italic opacity-80">Admissions</span> Office
            </h2>
            <p className="text-[#2A372F]/70 font-light leading-relaxed text-sm mb-8">
              Our admissions team is here to guide you through every step of
              enrolling your child at Apple Tree Tots. We offer personalized
              consultations to discuss your child's needs and our educational
              approach.
            </p>
          </div>

          <div className="space-y-6 border-l border-[#2A372F]/20 pl-6">
            {' '}
            <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
              <Building2 className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
              <div className="text-sm font-light tracking-wide">
                <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                  Office Location
                </p>
                <p className="text-[#2A372F]/70">Ahangama</p>
                <p className="text-[#2A372F]/70">Galle District, Southern Province</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
              <Clock className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
              <div className="text-sm font-light tracking-wide">
                <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                  Office Hours
                </p>
                <p className="text-[#2A372F]/70">Mon - Fri: 09:00 - 17:00</p>
                <p className="text-[#2A372F]/70">Sat: By appointment only</p>
              </div>
            </div>{' '}
            <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
              <Mail className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
              <div className="text-sm font-light tracking-wide">
                <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                  Get in Touch
                </p>
                <p className="text-[#2A372F]/70">074 343 1488</p>
                <p className="text-[#2A372F]/70">@apple_tree_tots_preschool</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="primary" className="w-full sm:w-auto">
              Book Consultation
            </Button>
          </div>
        </div>

        {/* Right Column: Services & Visual */}
        <div className="w-full lg:w-2/3">
          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Cards */}
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <Users className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  New Family Consultations
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Personalized meetings to discuss your child's developmental
                  needs, our curriculum, and how we can support your family's
                  educational journey.
                </p>
              </div>

              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <FileText className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  Enrollment Assistance
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Dedicated support for registration paperwork, program selection,
                  and understanding our fee structure and payment options.
                </p>
              </div>

              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <Calendar className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  Parent Resources
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Access to parenting workshops, developmental milestone guides,
                  and community events for enrolled families.
                </p>
              </div>
            </div>

            {/* Visual Image */}
            <div className="relative h-full min-h-[300px] order-1 md:order-2 group overflow-hidden rounded-lg">
              <img src="/apple-tree-tots/images/testimonials/Gemini_Generated_Image_i6bhti6bhti6bhti.png" alt="Admissions Office" className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A372F] to-transparent p-6 z-20">
                <span className="text-[10px] tracking-wide uppercase text-white/80 font-semibold">
                  Admissions Office
                </span>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden flex flex-col gap-8">
            {/* Visual Image - Top on mobile */}
            <div className="relative h-64 group overflow-hidden rounded-lg">
              <img src="/apple-tree-tots/images/testimonials/Gemini_Generated_Image_i6bhti6bhti6bhti.png" alt="Admissions Office" className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A372F] to-transparent p-6 z-20">
                <span className="text-[10px] tracking-wide uppercase text-white/80 font-semibold">
                  Admissions Office
                </span>
              </div>
            </div>

            {/* Service Cards - Carousel on mobile */}
            <div className="md:hidden">
              <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  <div className="flex-shrink-0 w-full px-2 bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                    <Users className="w-6 h-6 text-[#2A372F] mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                      New Family Consultations
                    </h3>
                    <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                      Personalized meetings to discuss your child's developmental
                      needs, our curriculum, and how we can support your family's
                      educational journey.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-full px-2 bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                    <FileText className="w-6 h-6 text-[#2A372F] mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                      Enrollment Assistance
                    </h3>
                    <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                      Dedicated support for registration paperwork, program selection,
                      and understanding our fee structure and payment options.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-full px-2 bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                    <Calendar className="w-6 h-6 text-[#2A372F] mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                      Parent Resources
                    </h3>
                    <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                      Access to parenting workshops, developmental milestone guides,
                      and community events for enrolled families.
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
                  aria-label="New Family Consultations"
                />
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === 1 ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
                  }`}
                  aria-label="Enrollment Assistance"
                />
                <button
                  onClick={() => setCurrentSlide(2)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === 2 ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
                  }`}
                  aria-label="Parent Resources"
                />
              </div>
            </div>

            {/* Service Cards - Grid on tablet */}
            <div className="hidden md:flex lg:hidden flex-col gap-6">
              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <Users className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  New Family Consultations
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Personalized meetings to discuss your child's developmental
                  needs, our curriculum, and how we can support your family's
                  educational journey.
                </p>
              </div>

              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <FileText className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  Enrollment Assistance
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Dedicated support for registration paperwork, program selection,
                  and understanding our fee structure and payment options.
                </p>
              </div>

              <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <Calendar className="w-6 h-6 text-[#2A372F] mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#2A372F]">
                  Parent Resources
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Access to parenting workshops, developmental milestone guides,
                  and community events for enrolled families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>;
}
