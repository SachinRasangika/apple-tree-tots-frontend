import React from 'react';
import { BookOpen, Globe, Beaker, TreePine, Palette, Heart, Users, Music } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
interface CurriculumCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
  delay: string;
}
function CurriculumCard({
  icon,
  title,
  description,
  highlights,
  delay
}: CurriculumCardProps) {
  return <div className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 rounded-2xl p-8 hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]" style={{
    animationDelay: delay
  }}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[#2A372F] flex items-center justify-center text-[#CDD1CB] mb-6 group-hover:bg-[#1a2720] transition-all duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-3 text-[#2A372F] group-hover:text-[#1a2720] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-[#2A372F]/70 font-light leading-relaxed mb-6">
        {description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2">
        {highlights.map((highlight, idx) => <li key={idx} className="flex items-start gap-2 text-xs text-[#2A372F]/60">
            <div className="w-1 h-1 rounded-full bg-[#2A372F] mt-1.5 shrink-0" />
            <span>{highlight}</span>
          </li>)}
      </ul>
    </div>;
}
export function ClassesSection() {
  const curriculum = [{
    icon: <BookOpen size={24} />,
    title: 'Montessori Method',
    description: 'Child-led exploration with specialized materials designed to foster independence and natural curiosity.',
    highlights: ['Self-paced learning environment', 'Hands-on discovery activities', 'Mixed-age peer learning', 'Development of concentration'],
    delay: '0ms'
  }, {
    icon: <Globe size={24} />,
    title: 'English Language Immersion',
    description: 'Full English-medium instruction with qualified native and bilingual teachers for comprehensive language development.',
    highlights: ['Daily conversation practice', 'Phonics and early literacy', 'Vocabulary through play', 'Cultural exposure'],
    delay: '100ms'
  }, {
    icon: <Beaker size={24} />,
    title: 'STEAM Learning',
    description: 'Integrated Science, Technology, Engineering, Arts, and Mathematics through hands-on projects and experiments.',
    highlights: ['Science experiments', 'Basic coding introduction', 'Mathematical thinking', 'Problem-solving skills'],
    delay: '200ms'
  }, {
    icon: <TreePine size={24} />,
    title: 'Outdoor Education',
    description: 'Nature-based learning in our garden space, connecting children with the environment through daily outdoor activities.',
    highlights: ['Garden exploration', 'Gross motor development', 'Environmental awareness', 'Sensory experiences'],
    delay: '300ms'
  }, {
    icon: <Palette size={24} />,
    title: 'Creative Arts',
    description: 'Artistic expression through various mediums including painting, music, drama, and creative movement.',
    highlights: ['Visual arts exploration', 'Music and rhythm', 'Creative storytelling', 'Fine motor skills'],
    delay: '400ms'
  }, {
    icon: <Music size={24} />,
    title: 'Cultural Studies',
    description: 'Celebrating Sri Lankan heritage while fostering global awareness through stories, festivals, and traditions.',
    highlights: ['Traditional celebrations', 'Local art and craft', 'Sinhala language basics', 'Diverse cultural stories'],
    delay: '500ms'
  }, {
    icon: <Heart size={24} />,
    title: 'Social-Emotional Learning',
    description: 'Building emotional intelligence, empathy, and positive relationships through guided activities and play.',
    highlights: ['Conflict resolution', 'Emotional vocabulary', 'Cooperative teamwork', 'Self-regulation strategies'],
    delay: '600ms'
  }, {
    icon: <Users size={24} />,
    title: 'School Readiness',
    description: 'Comprehensive preparation for primary school including academic skills, independence, and social confidence.',
    highlights: ['Pre-reading and writing', 'Number sense foundation', 'Classroom routines', 'Social confidence building'],
    delay: '700ms'
  }];
  return <AnimatedSection className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto block" animation="fade-in-up">
      <div className="mb-16 text-center">
        <span className="text-xs tracking-wide uppercase text-[#2d5555] font-semibold mb-4 block">
          Learning Philosophy
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
          Our <span className="italic opacity-80">Curriculum</span>
        </h2>
        <p className="text-[#2A372F]/70 font-light max-w-2xl mx-auto text-sm">
          A holistic approach to early childhood education combining Montessori
          principles with modern pedagogy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {curriculum.map(item => <CurriculumCard key={item.title} {...item} />)}
      </div>
    </AnimatedSection>;
}
