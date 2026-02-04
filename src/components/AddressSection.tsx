import React from 'react';
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { AnimatedSection } from './AnimatedSection';

export function AddressSection() {
  return <AnimatedSection className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block" animation="fade-in-up">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left Column: Visual/Map Representation */}
        <div className="w-full md:w-1/2 relative min-h-[400px]">
          {/* Decorative border frame */}
          <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4 hidden md:block" />

          <div className="relative h-full w-full bg-[#2d5555]/20 border border-white/10 overflow-hidden group">
            {/* Placeholder for Map or Building Image */}
            <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop" alt="Apple Tree Tots Campus" className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105" />

            {/* Overlay Label */}
            <div className="absolute bottom-0 left-0 bg-[#1a3a3a] px-6 py-4 border-t border-r border-white/10">
              <span className="text-xs tracking-widest uppercase flex items-center gap-2">
                <MapPin size={14} />
                Main Campus
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block">
              Visit Us
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
              Apple Tree Tots <br />
              <span className="italic opacity-80">Preschool</span>
            </h2>
            <p className="text-[#2A372F]/70 font-light leading-relaxed max-w-md">
              Located in the heart of Ahangama, our campus provides a safe,
              nurturing environment for your child's first steps into learning.
              We welcome you to visit and experience our space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            {/* Address */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                <div className="text-sm font-light tracking-wide">
                  <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                    Address
                  </p>
                  <p className="text-[#2A372F]/70">Matara Road</p>
                  <p className="text-[#2A372F]/70">Ahangama, Galle District</p>
                  <p className="text-[#2A372F]/70">Southern Province</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                <div className="text-sm font-light tracking-wide">
                  <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                    Contact
                  </p>
                  <p className="text-[#2A372F]/70">074 343 1488</p>
                  <p className="text-[#2A372F]/70">@apple_tree_tots_preschool</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <Clock className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                <div className="text-sm font-light tracking-wide">
                  <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                    School Hours
                  </p>
                  <p className="text-[#2A372F]/70">Mon - Fri: 07:30 - 18:00</p>
                  <p className="text-[#2A372F]/70">Sat - Sun: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <Calendar className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                <div className="text-sm font-light tracking-wide">
                  <p className="uppercase tracking-widest font-medium mb-1 text-[#2A372F]">
                    Campus Tours
                  </p>
                  <p className="text-[#2A372F]/70">By appointment</p>
                  <p className="text-[#2A372F]/70">Weekday mornings preferred</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="w-full sm:w-auto">
              Schedule a Tour
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>;
}
