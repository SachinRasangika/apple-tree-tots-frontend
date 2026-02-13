import React from 'react';
import { Phone, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FeaturedPackagesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 block bg-[#2d4a4a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-wide uppercase text-white/80 font-semibold mb-4 block">
            Investment in Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-white">
            Our <span className="italic opacity-80">Programs</span>
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed">
            Choose the program that best fits your child's needs and your family's schedule. All programs include our Montessori curriculum, qualified teachers, and nurturing environment.
          </p>
        </div>

        {/* Additional Fees & Special Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Additional Fees
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <div>
                  <span className="text-white/90 font-light">
                    One-Time Enrollment Fee –{' '}
                    <span className="font-semibold text-white">USD 200</span>
                  </span>
                  <span className="text-xs text-white/60 ml-1">(≈ LKR 62,000)</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <div>
                  <span className="text-white/90 font-light">
                    Annual Building Fund –{' '}
                    <span className="font-semibold text-white">USD 65</span>
                  </span>
                  <span className="text-xs text-white/60 ml-1">(≈ LKR 20,150)</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 rounded-2xl p-8">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="w-6 h-6 text-[#FF6B6B] shrink-0" />
              <h3 className="text-lg font-semibold text-white">
                Special Offer
              </h3>
            </div>
            <p className="text-sm text-white/90 font-light leading-relaxed">
              The first <span className="font-semibold">5 children</span> to enroll will get{' '}
              <span className="font-semibold text-[#FF6B6B]">FREE admission!</span>
            </p>
          </div>
        </div>

        {/* Sibling Discounts Section */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">
            Sibling Discounts Available
          </h3>
          <p className="text-sm text-white/70 font-light mb-8 max-w-2xl mx-auto">
            We offer <span className="font-semibold text-white">10% discount for the second child</span> and{' '}
            <span className="font-semibold text-white">15% for the third child</span> when multiple siblings are enrolled
            simultaneously. Contact us to learn more about our flexible payment options.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/application')}
              className="inline-flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest font-medium text-xs px-4 py-2 flex-1 rounded bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720]"
            >
              Apply Now
            </button>
            <a
              href="tel:+94743431488"
              className="inline-flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest font-medium text-xs px-4 py-2 flex-1 rounded bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720]"
            >
              <Phone size={14} />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
