import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { ServicesGrid } from '../components/ServicesGrid';
import { FoundersSection } from '../components/FoundersSection';
import { CoastalEnvironmentSection } from '../components/CoastalEnvironmentSection';
import { StatementSection } from '../components/StatementSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { InteriorDesignSection } from '../components/InteriorDesignSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { DailyRoutineSection } from '../components/DailyRoutineSection';
import { InstagramSection } from '../components/InstagramSection';
import { PricingSection } from '../components/PricingSection';
import { JoinTeamSection } from '../components/JoinTeamSection';
import { AddressSection } from '../components/AddressSection';
import { EnrollmentOfficeSection } from '../components/EnrollmentOfficeSection';
import { Footer } from '../components/Footer';
import { FloatingActionBar } from '../components/FloatingActionBar';

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
