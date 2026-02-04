import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function InteriorGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const allImages = [{
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8433 03.16.45.jpg',
    alt: 'Apple Tree Tots classroom',
    className: 'col-span-1 md:col-span-2 row-span-2'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8434 03.16.45.jpg',
    alt: 'Children learning activity',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8435 03.16.45.jpg',
    alt: 'Preschool environment',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8436 03.16.45.jpg',
    alt: 'Apple Tree Tots facilities',
    className: 'col-span-1 md:col-span-2 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8439 03.16.45.jpg',
    alt: 'Learning spaces',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8440 03.16.45.jpg',
    alt: 'Indoor activities and learning',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8441 03.16.45.jpg',
    alt: 'Play and development area',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8443 03.16.45.jpg',
    alt: 'Creative learning space',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8444 03.16.45.jpg',
    alt: 'Student engagement',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8445 03.16.45.jpg',
    alt: 'Preschool activities',
    className: 'col-span-1 md:col-span-2 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8454 03.16.45.jpg',
    alt: 'Outdoor learning',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }, {
    url: '/apple-tree-tots/images/apple-tree-tots-images/IMG_8456 03.16.45.jpg',
    alt: 'Children playing',
    className: 'col-span-1 md:col-span-1 row-span-1'
  }];

  const imagesPerSlide = 4;
  const totalSlides = Math.ceil(allImages.length / imagesPerSlide);
  const images = allImages.slice(currentSlide * imagesPerSlide, (currentSlide + 1) * imagesPerSlide);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  return <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
            Our <span className="italic opacity-80">Facilities</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrev} className="p-2 hover:bg-[#2A372F]/10 rounded-lg transition-colors" aria-label="Previous">
            <ChevronLeft size={24} className="text-[#2A372F]" />
          </button>
          <button onClick={handleNext} className="p-2 hover:bg-[#2A372F]/10 rounded-lg transition-colors" aria-label="Next">
            <ChevronRight size={24} className="text-[#2A372F]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
        {images.map((img, idx) => <div key={idx} className={`relative group overflow-hidden rounded-lg ${img.className}`}>
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <span className="text-xs uppercase tracking-wide border border-white px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Gallery
              </span>
            </div>
          </div>)}
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="text-[10px] uppercase tracking-wide text-[#2A372F]/50">
          <span>Apple Tree Tots Preschool</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-wide text-[#2A372F]/50">
          <span>Ahangama, Galle</span>
        </div>
      </div>
    </section>;
}
