import React from 'react';
import {
  HeroSection,
  PhilosophySection,
  ServicesGrid,
  FoundersSection,
  CoastalEnvironmentSection,
  StatementSection,
  WhyChooseSection,
  InteriorDesignSection,
  TestimonialsSection,
  DailyRoutineSection,
  InstagramSection,
  PricingSection,
  JoinTeamSection,
  AddressSection,
  EnrollmentOfficeSection,
  Footer,
  FloatingActionBar,
} from '../components';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#CDD1CB] text-[#2A372F] selection:bg-[#2A372F] selection:text-[#CDD1CB]">
      <FloatingActionBar />
      <main>
        <div data-hero-section>
          <HeroSection />
        </div>
        <ServicesGrid />
        <StatementSection />
        <PhilosophySection />
        <FoundersSection />
        <CoastalEnvironmentSection />
        <WhyChooseSection />
        <InteriorDesignSection />
        <TestimonialsSection />
        <DailyRoutineSection />
        <InstagramSection />
        <PricingSection />
        <JoinTeamSection />
        <AddressSection />
        <EnrollmentOfficeSection />
      </main>
      <Footer />
    </div>
  );
}
