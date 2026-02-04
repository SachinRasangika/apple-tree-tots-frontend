import React from 'react';
import { MapPin, Phone, Clock, Users } from 'lucide-react';
import { Button } from './ui/Button';
interface CampusProps {
  name: string;
  ages: string;
  address: string;
  postal: string;
  phone: string;
  hours: string;
  image: string;
  delay: string;
}
function CampusCard({
  name,
  ages,
  address,
  postal,
  phone,
  hours,
  image,
  delay
}: CampusProps) {
  return <div className="flex flex-col opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{
    animationDelay: delay
  }}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden mb-6 group rounded-lg">
        <img src={image} alt={`${name} building`} className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
        <div className="absolute bottom-0 left-0 bg-[#2A372F]/90 px-4 py-2 z-20 rounded-tr-lg">
          <span className="text-[10px] tracking-wide uppercase flex items-center gap-2 text-white font-semibold">
            <Users size={12} />
            Ages {ages}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-xl mb-4 min-h-[3.5rem] text-[#2A372F]">
          {name}
        </h3>

        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#2d5555]" />
            <div className="text-xs font-light leading-relaxed text-[#2A372F]/70">
              <p>{address}</p>
              <p>{postal}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 shrink-0 text-[#2d5555]" />
            <span className="text-xs font-light text-[#2A372F]/70">{hours}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 shrink-0 text-[#2d5555]" />
            <span className="text-xs font-light text-[#2A372F]/70">{phone}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Campus Details
        </Button>
      </div>
    </div>;
}
export function CampusLocationsSection() {
  const campuses = [{
    name: 'Ahangama Campus',
    ages: '2-5',
    address: 'Ahangama',
    postal: 'Galle District, Southern Province',
    phone: '074 343 1488',
    hours: 'Mon - Fri: 07:30 - 18:00',
    image: '/apple-tree-tots/images/hero/homehero.png',
    delay: '0ms'
  }];
  return <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
      <div className="mb-16 text-center">
        <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
          Visit Us
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
          Our <span className="italic opacity-80">Campus</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-md mx-auto">
        {campuses.map(campus => <CampusCard key={campus.name} {...campus} />)}
      </div>
    </section>;
}
