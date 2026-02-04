import React from 'react';
import { Instagram, Camera, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { CTABox } from './CTABox';
import { AnimatedSection } from './AnimatedSection';

export function InstagramSection() {
  return <AnimatedSection className="py-20 block" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
            Follow Our <span className="italic opacity-80">Daily Journey</span>
          </h2>
          <p className="text-[#2A372F]/70 font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base mb-8">
            Instagram is our primary hub for sharing daily activities, events,
            and updates. See what's happening in our classrooms and connect with
            our community.
          </p>

          {/* Instagram Handle */}
          <a href="https://instagram.com/apple_tree_tots_preschool" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#2d5555]/10 border border-[#2d5555]/20 rounded-lg px-8 py-4 hover:bg-[#2d5555]/20 hover:border-[#2d5555]/40 transition-all duration-300 group">
            <Instagram size={24} className="text-[#2d5555] group-hover:text-[#1a3a3a] transition-colors" />
            <span className="text-sm tracking-wide text-[#2A372F]">
              @apple_tree_tots_preschool
            </span>
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 text-center opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] hover:shadow-md transition-all duration-300">
            <Camera className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
            <h3 className="text-sm font-semibold mb-3 text-[#2A372F]">
              Daily Updates
            </h3>
            <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
              See photos and videos of classroom activities, outdoor play, and
              special events
            </p>
          </div>

          <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 text-center opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] hover:shadow-md transition-all duration-300" style={{
          animationDelay: '150ms'
        }}>
            <MessageCircle className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
            <h3 className="text-sm font-semibold mb-3 text-[#2A372F]">
              Direct Messaging
            </h3>
            <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
              DM us to schedule campus tours, ask questions, or inquire about
              enrollment
            </p>
          </div>

          <div className="bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 text-center opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] hover:shadow-md transition-all duration-300" style={{
          animationDelay: '300ms'
        }}>
            <Heart className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
            <h3 className="text-sm font-semibold mb-3 text-[#2A372F]">
              Community Connection
            </h3>
            <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
              Join our parent community and stay informed about announcements
              and events
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-[#2A372F]">
            Ready to Learn More?
          </h3>
          <p className="text-sm text-[#2A372F]/70 font-light mb-8 max-w-lg mx-auto">
            The best way to experience Apple Tree Tots is to visit us in person
            or connect with us on Instagram. We'd love to show you around!
          </p>
          <CTABox
            primaryText="Follow Instagram"
            secondaryText="Call Us"
            primaryHref="https://instagram.com/apple_tree_tots_preschool"
            secondaryHref="tel:+94743431488"
          />
        </div>
      </div>
    </AnimatedSection>;
}
