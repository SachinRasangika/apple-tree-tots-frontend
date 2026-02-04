import React from 'react';
import { Footer, ApplicationForm } from '../components';

export function ApplicationPage() {
  return (
    <div className="min-h-screen bg-[#CDD1CB] text-[#2A372F] selection:bg-[#2A372F] selection:text-[#CDD1CB]">
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <section className="flex flex-col items-center justify-center mb-20 animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-12 text-center max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif tracking-widest uppercase text-[#2A372F] mb-6 leading-tight">
              Application Form
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-[#2A372F]/70">
              Welcome to Apple Tree Tots! Please complete all required fields below. We'll review your application and contact you within 5-7 business days.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <ApplicationForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
