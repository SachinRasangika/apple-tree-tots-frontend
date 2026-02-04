import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const HERO_IMAGES = [
  'images/apple-tree-tots-images/IMG_8433 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8437 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8439 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8440 03.16.45.jpg',
];

const FEATURE_IMAGES = [
  'images/apple-tree-tots-images/IMG_8434 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8441 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8443 03.16.45.jpg',
];

const FEATURE_IMAGES_2 = [
  'images/apple-tree-tots-images/IMG_8435 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8444 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8445 03.16.45.jpg',
];

const FEATURE_IMAGES_3 = [
  'images/apple-tree-tots-images/IMG_8436 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8454 03.16.45.jpg',
  'images/apple-tree-tots-images/IMG_8456 03.16.45.jpg',
];

const HERO_CONTENT = [
  {
    heading: 'Where Little Hands Grow Big Dreams',
    description: 'A safe, nurturing, and joyful environment where children explore, play with nature, and grow with love every single day.',
  },
  {
    heading: 'Learning Through Play & Discovery',
    description: 'We believe in the power of outdoor play and nature-based learning to spark curiosity and build confidence in every child.',
  },
  {
    heading: 'Growing Together in Nature',
    description: 'Our apple tree environment provides the perfect space for children to develop friendships, social skills, and a love for the natural world.',
  },
  {
    heading: 'Building Tomorrow\'s Leaders Today',
    description: 'With compassionate guidance and hands-on experiences, we nurture curious minds and nurturing hearts in every child.',
  },
];

const FEATURE_CONTENT = {
  planting: {
    heading: 'Planting & Caring',
    description: 'We nurture young minds through hands-on gardening and nature exploration. Our children learn responsibility, patience, and environmental stewardship.',
    images: FEATURE_IMAGES,
  },
  exploring: {
    heading: 'Exploring Outdoors',
    description: 'Discovery awaits in every corner of nature. Children develop confidence and curiosity through outdoor adventures and nature-based play.',
    images: FEATURE_IMAGES_2,
  },
  growing: {
    heading: 'Growing with Confidence',
    description: 'We foster self-esteem and social growth through supportive play and shared experiences. Each child blooms in their own unique way.',
    images: FEATURE_IMAGES_3,
  },
};

export function HeroSection() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [featureImageIndex1, setFeatureImageIndex1] = useState(0);
  const [featureImageIndex2, setFeatureImageIndex2] = useState(0);
  const [featureImageIndex3, setFeatureImageIndex3] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [heroImageOpacity, setHeroImageOpacity] = useState(1);

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
      if (selectedFeature === 'planting') setSelectedFeature('exploring');
      else if (selectedFeature === 'exploring') setSelectedFeature('growing');
      else setSelectedFeature('planting');
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      if (selectedFeature === 'planting') setSelectedFeature('growing');
      else if (selectedFeature === 'growing') setSelectedFeature('exploring');
      else setSelectedFeature('planting');
    }
  };

  // Auto-rotate hero background image every 8 seconds (only if no feature is selected)
  useEffect(() => {
    if (selectedFeature !== null) return; // Don't auto-rotate if user has selected a feature

    const heroInterval = setInterval(() => {
      setHeroImageOpacity(0); // Start fade out
      setTimeout(() => {
        setHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        setHeroImageOpacity(1); // Fade in new image
      }, 350); // Half of the transition duration
    }, 8000);
    return () => clearInterval(heroInterval);
  }, [selectedFeature]);

  // Smooth fade transition when feature is selected or hero image changes
  useEffect(() => {
    if (selectedFeature !== null) {
      setHeroImageOpacity(0);
      setTimeout(() => {
        setHeroImageOpacity(1);
      }, 100);
    }
  }, [selectedFeature]);

  // Auto-rotate feature card images every 7-8 seconds
  useEffect(() => {
    const featureInterval1 = setInterval(() => {
      setFeatureImageIndex1((prev) => (prev + 1) % FEATURE_IMAGES.length);
    }, 7500);
    return () => clearInterval(featureInterval1);
  }, []);

  useEffect(() => {
    const featureInterval2 = setInterval(() => {
      setFeatureImageIndex2((prev) => (prev + 1) % FEATURE_IMAGES_2.length);
    }, 8000);
    return () => clearInterval(featureInterval2);
  }, []);

  useEffect(() => {
    const featureInterval3 = setInterval(() => {
      setFeatureImageIndex3((prev) => (prev + 1) % FEATURE_IMAGES_3.length);
    }, 8500);
    return () => clearInterval(featureInterval3);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background Image - Auto Rotating with smooth crossfade */}
      <img
        src={encodeURI(
          selectedFeature === 'planting'
            ? FEATURE_CONTENT.planting.images[featureImageIndex1]
            : selectedFeature === 'exploring'
            ? FEATURE_CONTENT.exploring.images[featureImageIndex2]
            : selectedFeature === 'growing'
            ? FEATURE_CONTENT.growing.images[featureImageIndex3]
            : HERO_IMAGES[heroImageIndex]
        )}
        alt="Hero"
        className="absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: heroImageOpacity }}
      />
      {/* Secondary image layer for ultra-smooth crossfade */}
      <img
        src={encodeURI(
          selectedFeature === 'planting'
            ? FEATURE_CONTENT.planting.images[(featureImageIndex1 + 1) % FEATURE_IMAGES.length]
            : selectedFeature === 'exploring'
            ? FEATURE_CONTENT.exploring.images[(featureImageIndex2 + 1) % FEATURE_IMAGES_2.length]
            : selectedFeature === 'growing'
            ? FEATURE_CONTENT.growing.images[(featureImageIndex3 + 1) % FEATURE_IMAGES_3.length]
            : HERO_IMAGES[(heroImageIndex + 1) % HERO_IMAGES.length]
        )}
        alt="Hero Next"
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-0"
        aria-hidden="true"
      />
      {/* Gradient Overlay - Darker on left for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1a3a3a]/70 via-[#1a3a3a]/40 to-transparent sm:via-[#1a3a3a]/20" />

      {/* Content Container */}
      <div
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-32 pb-12 sm:px-12 lg:px-20 cursor-pointer"
        onClick={() => selectedFeature && setSelectedFeature(null)}
      >
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-white transition-opacity duration-[3000ms] ease-in-out">
            {selectedFeature ? (
              <>
                {selectedFeature === 'planting'
                  ? FEATURE_CONTENT.planting.heading
                  : selectedFeature === 'exploring'
                  ? FEATURE_CONTENT.exploring.heading
                  : FEATURE_CONTENT.growing.heading}
              </>
            ) : (
              <>
                Learning in <span className="italic opacity-80">Coastal Ahangama</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-300 sm:text-lg transition-opacity duration-[3000ms] ease-in-out">
            {selectedFeature === 'planting'
              ? FEATURE_CONTENT.planting.description
              : selectedFeature === 'exploring'
              ? FEATURE_CONTENT.exploring.description
              : selectedFeature === 'growing'
              ? FEATURE_CONTENT.growing.description
              : HERO_CONTENT[heroImageIndex].description}
          </p>

          {/* Location */}
          <div className="mb-10 flex items-center space-x-2 text-gray-300">
            <MapPin className="h-5 w-5 text-[#3d6666]" />
            <span className="text-base font-medium">Ahangama, Sri Lanka</span>
          </div>

          {/* CTAs */}
          <div className="mb-16 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button className="rounded-sm bg-[#3d6666] px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#2d5555] focus:outline-none focus:ring-2 focus:ring-[#3d6666] focus:ring-offset-2 focus:ring-offset-[#1a3a3a]">
              Enroll Now
            </button>
            <button className="rounded-sm border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a3a3a]">
              Book a Visit
            </button>
          </div>

          {/* Bottom Feature Section */}
          <div>
            <h3 className="mb-6 font-serif text-xl font-semibold text-white tracking-wide">
              Learning Through Play & Nature
            </h3>

            {/* Desktop: 3 cards grid, Mobile: 1 card carousel */}
            <div className="hidden sm:grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Feature 1 - Auto Rotating */}
              <div
                onClick={() => setSelectedFeature('planting')}
                className="group relative h-40 w-full overflow-hidden rounded-sm bg-[#2d5555]/20 sm:h-48 cursor-pointer"
              >
                <img
                  src={encodeURI(FEATURE_IMAGES[featureImageIndex1])}
                  alt="Children playing and learning"
                  className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/80 via-[#1a3a3a]/20 to-transparent transition-colors duration-500 ease-in-out group-hover:from-[#1a3a3a]/60 group-hover:via-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium text-white sm:text-sm">
                  Planting & Caring
                </span>
              </div>

              {/* Feature 2 - Auto Rotating */}
              <div
                onClick={() => setSelectedFeature('exploring')}
                className="group relative h-40 w-full overflow-hidden rounded-sm bg-[#2d5555]/20 sm:h-48 cursor-pointer"
              >
                <img
                  src={encodeURI(FEATURE_IMAGES_2[featureImageIndex2])}
                  alt="Children exploring outdoors"
                  className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/80 via-[#1a3a3a]/20 to-transparent transition-colors duration-500 ease-in-out group-hover:from-[#1a3a3a]/60 group-hover:via-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium text-white sm:text-sm">
                  Exploring Outdoors
                </span>
              </div>

              {/* Feature 3 - Auto Rotating */}
              <div
                onClick={() => setSelectedFeature('growing')}
                className="group relative h-40 w-full overflow-hidden rounded-sm bg-[#2d5555]/20 sm:h-48 cursor-pointer"
              >
                <img
                  src={encodeURI(FEATURE_IMAGES_3[featureImageIndex3])}
                  alt="Children growing with confidence"
                  className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/80 via-[#1a3a3a]/20 to-transparent transition-colors duration-500 ease-in-out group-hover:from-[#1a3a3a]/60 group-hover:via-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium text-white sm:text-sm">
                  Growing with Confidence
                </span>
              </div>
            </div>

            {/* Mobile: Single card carousel with dots and arrows */}
            <div className="sm:hidden">
              <div className="relative h-40 w-full overflow-hidden rounded-sm bg-[#2d5555]/20 cursor-pointer group" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img
                  src={encodeURI(
                    selectedFeature === 'planting'
                      ? FEATURE_IMAGES[featureImageIndex1]
                      : selectedFeature === 'exploring'
                      ? FEATURE_IMAGES_2[featureImageIndex2]
                      : FEATURE_IMAGES_3[featureImageIndex3]
                  )}
                  alt="Learning through play and nature"
                  className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/80 via-[#1a3a3a]/20 to-transparent transition-colors duration-500 ease-in-out group-hover:from-[#1a3a3a]/60 group-hover:via-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium text-white">
                  {selectedFeature === 'planting'
                    ? 'Planting & Caring'
                    : selectedFeature === 'exploring'
                    ? 'Exploring Outdoors'
                    : 'Growing with Confidence'}
                </span>

                {/* Arrow Buttons */}
                <button
                  onClick={() => {
                    if (selectedFeature === 'planting') setSelectedFeature('growing');
                    else if (selectedFeature === 'growing') setSelectedFeature('exploring');
                    else setSelectedFeature('planting');
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all duration-200"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (selectedFeature === 'planting') setSelectedFeature('exploring');
                    else if (selectedFeature === 'exploring') setSelectedFeature('growing');
                    else setSelectedFeature('planting');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all duration-200"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setSelectedFeature('planting')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedFeature === 'planting' || selectedFeature === null
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label="Planting & Caring"
                />
                <button
                  onClick={() => setSelectedFeature('exploring')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedFeature === 'exploring'
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label="Exploring Outdoors"
                />
                <button
                  onClick={() => setSelectedFeature('growing')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedFeature === 'growing'
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label="Growing with Confidence"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
