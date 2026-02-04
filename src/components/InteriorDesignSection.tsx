import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

export function InteriorDesignSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const images = [
    {
      src: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8433 03.16.45.jpg',
      alt: 'Bright classroom with learning materials'
    },
    {
      src: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8434 03.16.45.jpg',
      alt: 'Outdoor learning and nature exploration'
    },
    {
      src: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8435 03.16.45.jpg',
      alt: 'Campus facilities and spaces'
    },
    {
      src: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8437 03.16.45.jpg',
      alt: 'Teacher engagement with children'
    },
    {
      src: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8439 03.16.45.jpg',
      alt: 'Happy children and families'
    }
  ];

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
      setCurrentSlide((prev) => (prev + 1) % 5);
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + 5) % 5);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
  };

  const handleFullscreenPrev = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  const handleFullscreenNext = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) => (prev! + 1) % images.length);
    }
  };
  return <AnimatedSection className="bg-[#2d4a4a] text-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden block" animation="fade-in-up">
      <div className="max-w-7xl mx-auto">
        {/* Statement Text */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide uppercase">
            A nurturing environment designed for growth, creativity, and exploration. Every space at Apple Tree Tots fosters learning through play and nature.
          </h2>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-light tracking-widest uppercase">
            Our Spaces & Facilities
          </h3>
        </div>

        {/* Gallery Grid */}
        <div className="relative">
          {/* Desktop Layout - Asymmetric Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-4">
            {/* Row 1 */}
            {/* Image 1 - Left */}
            <button
              onClick={() => setFullscreenIndex(0)}
              className="md:col-span-3 aspect-[3/4] overflow-hidden cursor-pointer group"
            >
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                </svg>
              </div>
            </button>

            {/* Image 2 - Middle Left */}
            <button
              onClick={() => setFullscreenIndex(1)}
              className="md:col-span-3 aspect-[3/4] overflow-hidden cursor-pointer group relative"
            >
              <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                </svg>
              </div>
            </button>

            {/* Spacer / Text Area */}
            <div className="md:col-span-3 flex items-end justify-center pb-4 md:pb-8">
              <div className="text-white flex items-baseline gap-2">
                <span className="text-xs opacity-70">at</span>
                <span className="text-2xl tracking-widest uppercase font-light">
                  APPLE TREE TOTS
                </span>
              </div>
            </div>

            {/* Image 3 - Right */}
            <button
              onClick={() => setFullscreenIndex(2)}
              className="md:col-span-3 aspect-[3/4] overflow-hidden cursor-pointer group relative"
            >
              <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                </svg>
              </div>
            </button>

            {/* Row 2 */}
            {/* Spacer Left */}
            <div className="hidden md:block md:col-span-3">
              <div className="h-full flex items-end pb-2">
                <span className="text-xs tracking-wider opacity-80">
                  Ahangama Preschool
                </span>
              </div>
            </div>

            {/* Image 4 - Center Left */}
            <button
              onClick={() => setFullscreenIndex(3)}
              className="md:col-span-3 aspect-[3/4] overflow-hidden cursor-pointer group relative"
            >
              <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                </svg>
              </div>
            </button>

            {/* Image 5 - Center Right */}
            <button
              onClick={() => setFullscreenIndex(4)}
              className="md:col-span-3 aspect-[3/4] overflow-hidden cursor-pointer group relative"
            >
              <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                </svg>
              </div>
            </button>

            {/* Spacer Right */}
            <div className="hidden md:block md:col-span-3">
              <div className="h-full flex items-end justify-end pb-2">
                <span className="text-xs tracking-wider opacity-80">
                  Photography: Sien Koolen
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Carousel with Pagination & Arrows */}
          <div className="md:hidden mb-4">
            <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <button
                  onClick={() => setFullscreenIndex(0)}
                  className="flex-shrink-0 w-full aspect-[3/4] overflow-hidden px-2 cursor-pointer group relative"
                >
                  <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => setFullscreenIndex(1)}
                  className="flex-shrink-0 w-full aspect-[3/4] overflow-hidden px-2 cursor-pointer group relative"
                >
                  <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => setFullscreenIndex(2)}
                  className="flex-shrink-0 w-full aspect-[3/4] overflow-hidden px-2 cursor-pointer group relative"
                >
                  <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => setFullscreenIndex(3)}
                  className="flex-shrink-0 w-full aspect-[3/4] overflow-hidden px-2 cursor-pointer group relative"
                >
                  <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => setFullscreenIndex(4)}
                  className="flex-shrink-0 w-full aspect-[3/4] overflow-hidden px-2 cursor-pointer group relative"
                >
                  <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Arrow Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === 0 ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label="Gallery image 1"
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === 1 ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label="Gallery image 2"
              />
              <button
                onClick={() => setCurrentSlide(2)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === 2 ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label="Gallery image 3"
              />
              <button
                onClick={() => setCurrentSlide(3)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === 3 ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label="Gallery image 4"
              />
              <button
                onClick={() => setCurrentSlide(4)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === 4 ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label="Gallery image 5"
              />
            </div>
          </div>

          {/* Mobile Credits (visible only on small screens) */}
          <div className="flex justify-between md:hidden mt-4 text-xs opacity-80">
            <span>Apple Tree Tots</span>
            <span>Photography: Sien Koolen</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {fullscreenIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setFullscreenIndex(null)}
        >
          <button
            onClick={() => setFullscreenIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[fullscreenIndex].src}
              alt={images[fullscreenIndex].alt}
              className="w-full h-full object-contain"
            />

            {/* Previous Button */}
            <button
              onClick={handleFullscreenPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-200"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleFullscreenNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-200"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {fullscreenIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>;
}
