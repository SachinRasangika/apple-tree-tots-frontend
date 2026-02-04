import React, { Children } from 'react';
import { Waves, TreePine, Sun, Wind } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface EnvironmentFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

function EnvironmentFeature({
  icon,
  title,
  description,
  delay
}: EnvironmentFeatureProps) {
  return <div className="flex flex-col items-center text-center opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]" style={{
    animationDelay: delay
  }}>
      <div className="w-16 h-16 rounded-full bg-white/20 border border-white/10 flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-serif tracking-wide mb-2 text-white">{title}</h3>
      <p className="text-xs text-gray-300 font-light leading-relaxed max-w-[200px]">
        {description}
      </p>
    </div>;
}

export function CoastalEnvironmentSection() {
  const features = [{
    icon: <Waves size={24} />,
    title: 'Coastal Setting',
    description: "Ahangama's peaceful village atmosphere provides a calm, natural backdrop for learning",
    delay: '0ms'
  }, {
    icon: <TreePine size={24} />,
    title: 'Garden Learning',
    description: 'Outdoor play spaces and garden areas for nature-based exploration and discovery',
    delay: '150ms'
  }, {
    icon: <Sun size={24} />,
    title: 'Natural Light',
    description: 'Bright, airy classrooms that connect children with the outdoors throughout the day',
    delay: '300ms'
  }, {
    icon: <Wind size={24} />,
    title: 'Fresh Air',
    description: 'Daily outdoor activities in our coastal environment promote health and wellbeing',
    delay: '450ms'
  }];

  return <AnimatedSection className="py-20 bg-[#2d4a4a] block" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-white font-bold mb-4 block">
              Our Environment
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-white">
              Learning in{' '}
              <span className="italic opacity-80">Coastal Ahangama</span>
            </h2>
            <p className="text-white/70 font-light leading-relaxed mb-8 text-sm md:text-base">
              Nestled in Ahangama's quiet coastal village, our preschool
              embraces the natural beauty of the Southern Province. The serene
              atmosphere and outdoor spaces create an ideal environment for
              young children to explore, play, and grow.
            </p>
            <p className="text-white/70 font-light leading-relaxed text-sm">
              Our garden-based approach connects children with nature daily,
              fostering curiosity about the world around them while developing
              gross motor skills and environmental awareness.
            </p>
          </div>

          {/* Right: Features Grid */}
          <div className="grid grid-cols-2 gap-8">
            {features.map(feature => <EnvironmentFeature key={feature.title} {...feature} />)}
          </div>
        </div>

        {/* Image Banner */}
        <div className="mt-16 relative h-[300px] md:h-[400px] overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-[#1a3a3a]/30 group-hover:bg-[#1a3a3a]/10 transition-colors duration-700 z-10" />
          <img src="/apple-tree-tots/images/gallery/Gemini_Generated_Image_wqpza0wqpza0wqpz.png" alt="Children playing outdoors in Ahangama" className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#152e2e] to-transparent p-8 z-20">
            <p className="text-xs tracking-widest uppercase text-white/80">
              Outdoor Learning Spaces • Ahangama, Galle District
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>;
}
