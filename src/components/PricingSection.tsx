import React, { useState } from 'react';
import { BookOpen, Star, Heart } from 'lucide-react';
import { Button } from './ui/Button';
import { CTABox } from './CTABox';
import { AnimatedSection } from './AnimatedSection';
interface PricingTierProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  icon: React.ReactNode;
  image?: string;
  highlighted?: boolean;
  delay: string;
}
function PricingTier({
  title,
  price,
  period,
  features,
  icon,
  image,
  highlighted,
  delay
}: PricingTierProps) {
  return <div className={`group relative rounded-2xl overflow-hidden opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] transition-all duration-300 border ${highlighted ? 'bg-[#CDD1CB]/95 border-[#2A372F]/40 scale-105 shadow-lg' : 'bg-[#CDD1CB]/95 border-[#2A372F]/20 hover:shadow-md'}`} style={{
    animationDelay: delay
  }}>
      {/* Icon Badge */}
      <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-[#2A372F] flex items-center justify-center text-[#CDD1CB] transition-all duration-300`}>
        {icon}
      </div>

      <div className="p-8">
        {/* Title & Price */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-[#2A372F]">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-[#2A372F]">
              {price}
            </span>
            <span className="text-xs text-[#2A372F]/60">
              {period}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => <li key={idx} className="flex items-start gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2A372F] mt-2 shrink-0" />
              <span className="text-[#2A372F]/70 font-light leading-relaxed">
                {feature}
              </span>
            </li>)}
        </ul>

        {/* CTA */}
        <Button variant={highlighted ? 'primary' : 'outline'} className="w-full">
          Enroll Now
        </Button>
      </div>
    </div>;
}
export function PricingSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const pricingTiers = [{
    title: 'Toddler Programs',
    price: 'Rs 25,000',
    period: 'per month',
    features: ['Ages 1.5 to 3 years', 'Half-day sessions (4 hours)', 'Sensory play and exploration', 'Parent orientation included', 'Small group activities'],
    icon: <Heart size={20} />,
    highlighted: false,
    delay: '0ms'
  }, {
    title: 'CASA Programs',
    price: 'Rs 30,000',
    period: 'per month',
    features: ['Ages 3 to 6 years', 'Full-day option available', 'Montessori curriculum', 'Structured learning environment', 'School readiness focus'],
    icon: <Star size={20} />,
    highlighted: false,
    delay: '100ms'
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
      setCurrentSlide((prev) => (prev + 1) % pricingTiers.length);
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + pricingTiers.length) % pricingTiers.length);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pricingTiers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pricingTiers.length) % pricingTiers.length);
  };

  return <AnimatedSection className="py-20 block" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
            Investment in Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
            Our <span className="italic opacity-80">Programs</span>
          </h2>
          <p className="text-sm text-[#2A372F]/70 font-light leading-relaxed">
            Choose the program that best fits your child's needs and your
            family's schedule. All programs include our Montessori curriculum,
            qualified teachers, and nurturing environment.
          </p>
        </div>

        {/* Desktop Pricing Grid */}
        <div className="hidden md:flex md:justify-center gap-6 mb-12">
          {pricingTiers.map(tier => <div key={tier.title} className="w-full md:w-80"><PricingTier {...tier} /></div>)}
        </div>

        {/* Mobile Carousel with Pagination & Arrows */}
        <div className="md:hidden mb-12">
          <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {pricingTiers.map(tier => <div key={tier.title} className="flex-shrink-0 w-full px-2">
                  <PricingTier {...tier} />
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
            {pricingTiers.map((_, index) => <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-[#2A372F] w-8' : 'bg-[#2A372F]/30 w-2 hover:bg-[#2A372F]/50'
                }`}
                aria-label={`Go to pricing tier ${index + 1}`}
              />)}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 text-center shadow-md">
          <h3 className="text-lg font-semibold text-[#2A372F] mb-4">
            Sibling Discounts Available
          </h3>
          <p className="text-sm text-[#2A372F]/70 font-light mb-8 max-w-2xl mx-auto">
            We offer 10% discount for the second child and 15% for the third
            child when multiple siblings are enrolled simultaneously. Contact us
            to learn more about our flexible payment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTABox
              primaryText="Apply Now"
              secondaryText="Call Us"
              primaryHref="/application"
              secondaryHref="tel:+94743431488"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>;
}
