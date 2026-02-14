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
  const [activeTab, setActiveTab] = useState('programs');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const pricingTiers = [
    // Preschool Programs
    {
      title: '1 Month Plan',
      price: 'USD 450',
      period: '≈ LKR 139,500',
      features: ['1 Month enrollment', 'Full Montessori curriculum', 'Flexible commitment'],
      icon: <BookOpen size={20} />,
      highlighted: false,
      delay: '0ms'
    },
    {
      title: '3 Months Plan',
      price: 'USD 385/mo',
      period: '≈ LKR 119,350',
      features: ['3 Months enrollment', '10% savings', 'Montessori curriculum'],
      icon: <BookOpen size={20} />,
      highlighted: false,
      delay: '50ms'
    },
    {
      title: '6 Months Plan',
      price: 'USD 330/mo',
      period: '≈ LKR 102,300',
      features: ['6 Months enrollment', '26% savings', 'Montessori curriculum'],
      icon: <BookOpen size={20} />,
      highlighted: false,
      delay: '100ms'
    },
    {
      title: 'Full School Year',
      price: 'USD 300/mo',
      period: '≈ LKR 93,000',
      features: ['12 Months enrollment', '33% savings', 'Best value plan'],
      icon: <Star size={20} />,
      highlighted: true,
      delay: '150ms'
    },
    // Daycare Services
    {
      title: 'Monthly Daycare',
      price: 'USD 300',
      period: '≈ LKR 93,000',
      features: ['Pay monthly', 'Flexible scheduling', 'Qualified caregivers'],
      icon: <Heart size={20} />,
      highlighted: false,
      delay: '200ms'
    },
    {
      title: 'Weekly Daycare',
      price: 'USD 100',
      period: '≈ LKR 31,000',
      features: ['Pay weekly', 'No long-term commitment', 'Flexible scheduling'],
      icon: <Heart size={20} />,
      highlighted: false,
      delay: '250ms'
    },
    {
      title: 'Hourly Daycare',
      price: 'USD 10',
      period: '≈ LKR 3,100',
      features: ['Hourly rate', 'Maximum flexibility', 'Drop-in service'],
      icon: <Heart size={20} />,
      highlighted: false,
      delay: '300ms'
    },
    {
      title: '3+ Hours Rate',
      price: 'USD 8/hr',
      period: '≈ LKR 2,480',
      features: ['Extended session rate', 'More than 3 hours', 'Best hourly rate'],
      icon: <Heart size={20} />,
      highlighted: false,
      delay: '350ms'
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

  return <AnimatedSection className="py-20 block bg-[#2d4a4a]" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs tracking-wide uppercase text-white/80 font-semibold mb-4 block">
            Investment in Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-white">
            Our <span className="italic opacity-80">Programs</span>
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed">
            Complete pricing for Apple Tree Tots Preschool Programs and Daycare Services. Flexible enrollment options with competitive rates and full Montessori education.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-8 py-3 rounded-lg font-semibold uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'programs'
                ? 'bg-white text-[#2d4a4a] shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => setActiveTab('daycare')}
            className={`px-8 py-3 rounded-lg font-semibold uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'daycare'
                ? 'bg-white text-[#2d4a4a] shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Daycare
          </button>
        </div>

        {/* Desktop Pricing Grid */}
        <div className="hidden md:block mb-16">
          {/* Preschool Programs Section */}
          {activeTab === 'programs' && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingTiers.slice(0, 4).map(tier => <div key={`${tier.title}-${tier.period}`}><PricingTier {...tier} /></div>)}
              </div>
            </div>
          )}

          {/* Daycare Services Section */}
          {activeTab === 'daycare' && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingTiers.slice(4, 8).map(tier => <div key={`${tier.title}-${tier.period}`}><PricingTier {...tier} /></div>)}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Carousel with Pagination & Arrows */}
        <div className="md:hidden mb-16">
          {/* Preschool Programs Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Preschool Programs</h3>
            <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(currentSlide % 4) * 100}%)` }}>
                {pricingTiers.slice(0, 4).map(tier => <div key={`${tier.title}-${tier.period}`} className="flex-shrink-0 w-full px-2">
                    <PricingTier {...tier} />
                  </div>)}
              </div>
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
            <div className="flex justify-center gap-2 mt-4">
              {Array(4).fill(0).map((_, index) => <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    (currentSlide % 4) === index ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                  aria-label={`Go to preschool program ${index + 1}`}
                />)}
            </div>
          </div>

          {/* Daycare Services Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Daycare Services</h3>
            <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${((currentSlide - 4) % 4) * 100}%)` }}>
                {pricingTiers.slice(4, 8).map(tier => <div key={`${tier.title}-${tier.period}`} className="flex-shrink-0 w-full px-2">
                    <PricingTier {...tier} />
                  </div>)}
              </div>
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
            <div className="flex justify-center gap-2 mt-4">
              {Array(4).fill(0).map((_, index) => <button
                  key={index}
                  onClick={() => setCurrentSlide(index + 4)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    ((currentSlide - 4) % 4) === index ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                  aria-label={`Go to daycare service ${index + 1}`}
                />)}
            </div>
          </div>
        </div>

        {/* Additional Fees & Special Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Additional Fees */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-6">
              Additional Fees
            </h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-white/20">
                <p className="text-sm font-medium text-white mb-1">One-Time Enrollment Fee</p>
                <p className="text-sm text-white/80">USD 200 <span className="text-xs text-white/60">(≈ LKR 62,000)</span></p>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Annual Building Fund</p>
                <p className="text-sm text-white/80">USD 65 <span className="text-xs text-white/60">(≈ LKR 20,150)</span></p>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-br from-orange-400/20 to-orange-300/10 border-2 border-orange-400 rounded-2xl p-8 shadow-md flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              ✨ Special Offer
            </h3>
            <p className="text-sm text-white font-light leading-relaxed mb-3">
              <strong className="text-orange-300">The first 5 children will get FREE admission!</strong>
            </p>
            <p className="text-xs text-white/70">
              Limited time offer. Enrollment fee waived for the first 5 children enrolled. Don't miss this exclusive opportunity to enroll your child at Apple Tree Tots with complimentary admission processing.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">
            Ready to Enroll?
          </h3>
          <p className="text-sm text-white/70 font-light mb-8 max-w-2xl mx-auto">
            Choose the perfect program for your child. Contact us for more information about flexible payment plans and enrollment options.
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
