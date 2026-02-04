import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { DarkModeProvider } from '../context/DarkModeContext';
import { PageHeroSection } from '../components/PageHeroSection';
import { Input, TextArea, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock, Instagram, Send, MessageCircle, Calendar } from 'lucide-react';
export function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };
  return <div className="min-h-screen bg-[#CDD1CB] text-[#2A372F] selection:bg-[#2A372F] selection:text-[#CDD1CB]">
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <PageHeroSection
          title="CONTACT"
          description="We'd love to hear from you. Whether you're interested in enrolling your child, scheduling a campus tour, or have questions about our programs, our team is here to help."
          imageUrl="/apple-tree-tots/images/gallery/Gemini_Generated_Image_dcqagmdcqagmdcqa.png"
          imageAlt="Contact us"
        />

        {/* Contact Methods Grid */}
        <section className="max-w-[1400px] mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="tel:0743431488" className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 p-8 rounded-2xl hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]">
              <Phone className="w-8 h-8 text-[#2A372F] mb-4 group-hover:text-[#2A372F] transition-colors duration-300" />
              <h3 className="text-sm font-serif tracking-wide mb-2 group-hover:text-[#2A372F] transition-colors duration-300">
                Call Us
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
                074 343 1488
              </p>
              <p className="text-[10px] text-[#2A372F]/60 mt-2 group-hover:text-[#2A372F]/60 transition-colors duration-300">
                Mon - Fri: 9:00 - 17:00
              </p>
            </a>

            <a href="mailto:info@appletreetots.lk" className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 p-8 rounded-2xl hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]" style={{
            animationDelay: '150ms'
          }}>
              <Mail className="w-8 h-8 text-[#2A372F] mb-4 group-hover:text-[#2A372F] transition-colors duration-300" />
              <h3 className="text-sm font-serif tracking-wide mb-2 group-hover:text-[#2A372F] transition-colors duration-300">
                Email Us
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
                info@appletreetots.lk
              </p>
              <p className="text-[10px] text-[#2A372F]/60 mt-2 group-hover:text-[#2A372F]/60 transition-colors duration-300">
                Response within 24 hours
              </p>
            </a>

            <a href="https://instagram.com/apple_tree_tots_preschool" target="_blank" rel="noopener noreferrer" className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 p-8 rounded-2xl hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]" style={{
            animationDelay: '300ms'
          }}>
              <Instagram className="w-8 h-8 text-[#2A372F] mb-4 group-hover:text-[#2A372F] transition-colors duration-300" />
              <h3 className="text-sm font-serif tracking-wide mb-2 group-hover:text-[#2A372F] transition-colors duration-300">
                Message Us
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
                @apple_tree_tots_preschool
              </p>
              <p className="text-[10px] text-[#2A372F]/60 mt-2 group-hover:text-[#2A372F]/60 transition-colors duration-300">
                DM us on Instagram
              </p>
            </a>

            <button className="group bg-[#CDD1CB]/95 border border-[#2A372F]/20 p-8 rounded-2xl hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] text-left" style={{
            animationDelay: '450ms'
          }}>
              <Calendar className="w-8 h-8 text-[#2A372F] mb-4 group-hover:text-[#2A372F] transition-colors duration-300" />
              <h3 className="text-sm font-serif tracking-wide mb-2 group-hover:text-[#2A372F] transition-colors duration-300">
                Visit Us
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed group-hover:text-[#2A372F] transition-colors duration-300">
                Schedule a campus tour
              </p>
              <p className="text-[10px] text-[#2A372F]/60 mt-2 group-hover:text-[#2A372F]/60 transition-colors duration-300">
                See our facilities
              </p>
            </button>
          </div>
        </section>

        {/* Main Content: Form + Contact Info */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="mb-8">
                <span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block">
                  Send a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4">
                  Get in <span className="italic opacity-80">Touch</span>
                </h2>
                <p className="text-sm text-[#2A372F]/70 font-light">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" type="text" placeholder="Your first name" value={formData.firstName} onChange={e => updateFormData('firstName', e.target.value)} required />
                  <Input label="Last Name" type="text" placeholder="Your last name" value={formData.lastName} onChange={e => updateFormData('lastName', e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Email Address" type="email" placeholder="your@email.com" value={formData.email} onChange={e => updateFormData('email', e.target.value)} required />
                  <Input label="Phone Number" type="tel" placeholder="+94 XX XXX XXXX" value={formData.phone} onChange={e => updateFormData('phone', e.target.value)} />
                </div>

                <Select label="Subject" value={formData.subject} onChange={e => updateFormData('subject', e.target.value)} required options={[{
                value: '',
                label: 'Select a subject'
              }, {
                value: 'enrollment',
                label: 'Enrollment Inquiry'
              }, {
                value: 'tour',
                label: 'Campus Tour Request'
              }, {
                value: 'programs',
                label: 'Program Information'
              }, {
                value: 'employment',
                label: 'Employment Opportunity'
              }, {
                value: 'general',
                label: 'General Question'
              }, {
                value: 'other',
                label: 'Other'
              }]} />

                <TextArea label="Message" rows={6} placeholder="Tell us how we can help..." value={formData.message} onChange={e => updateFormData('message', e.target.value)} required />

                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="mb-8">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block">
                    Contact Information
                  </span>
                  <h2 className="text-2xl font-serif tracking-widest uppercase mb-6">
                    Apple Tree Tots <br />
                    <span className="italic opacity-80">Preschool</span>
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <MapPin className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                    <div className="text-sm font-light tracking-wide">
                      <p className="uppercase tracking-widest font-medium mb-2 text-[#2A372F]">
                        Address
                      </p>
                      <p className="text-[#2A372F]/70">Matara Road</p>
                      <p className="text-[#2A372F]/70">Ahangama, Galle District</p>
                      <p className="text-[#2A372F]/70">Southern Province, Sri Lanka</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Phone className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                    <div className="text-sm font-light tracking-wide">
                      <p className="uppercase tracking-widest font-medium mb-2 text-[#2A372F]">
                        Phone
                      </p>
                      <p className="text-[#2A372F]/70">074 343 1488</p>
                      <p className="text-xs text-[#2A372F]/50 mt-1">
                        Mon - Fri: 09:00 - 17:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Mail className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                    <div className="text-sm font-light tracking-wide">
                      <p className="uppercase tracking-widest font-medium mb-2 text-[#2A372F]">
                        Email
                      </p>
                      <p className="text-[#2A372F]/70">info@appletreetots.lk</p>
                      <p className="text-xs text-[#2A372F]/50 mt-1">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Instagram className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                    <div className="text-sm font-light tracking-wide">
                      <p className="uppercase tracking-widest font-medium mb-2 text-[#2A372F]">
                        Social Media
                      </p>
                      <p className="text-[#2A372F]/70">@apple_tree_tots_preschool</p>
                      <p className="text-xs text-[#2A372F]/50 mt-1">
                        Follow us for daily updates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Clock className="w-5 h-5 mt-1 shrink-0 text-[#2d5555]" />
                    <div className="text-sm font-light tracking-wide">
                      <p className="uppercase tracking-widest font-medium mb-2 text-[#2A372F]">
                        School Hours
                      </p>
                      <p className="text-[#2A372F]/70">Monday - Friday</p>
                      <p className="text-[#2A372F]/70">07:30 - 18:00</p>
                      <p className="text-xs text-[#2A372F]/50 mt-1">
                        Extended care available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#2A372F]/20 pt-6">
                  <Button variant="outline" className="w-full">
                    <MapPin size={16} className="mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DarkModeProvider isDark={true}>
          {/* Location Section */}
          <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4 hidden lg:block pointer-events-none" />
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-[#1a3a3a]/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop" alt="Apple Tree Tots Campus Location" className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 bg-[#1a3a3a] px-6 py-4 border-t border-r border-white/10 z-20">
                  <span className="text-xs tracking-widest uppercase flex items-center gap-2">
                    <MapPin size={14} />
                    Ahangama Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block">
                Visit Our Campus
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
                Located in <span className="italic opacity-80">Ahangama</span>
              </h2>
              <p className="text-[#2A372F]/70 font-light leading-relaxed mb-8 text-sm md:text-base">
                Our preschool is nestled in the peaceful coastal village of
                Ahangama, providing a safe and nurturing environment for your
                child's early education. The serene setting and natural
                surroundings create an ideal atmosphere for learning and growth.
              </p>

              <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6 mb-8">
                <h3 className="text-sm font-serif tracking-wide mb-4 flex items-center gap-2 text-[#2A372F]">
                  <MessageCircle size={18} className="text-[#2A372F]" />
                  Campus Tours
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed mb-4">
                  We welcome prospective families to visit our campus and see
                  our facilities firsthand. Tours are available by appointment
                  on weekday mornings.
                </p>
                <Button variant="outline" size="sm">
                  Schedule a Tour
                </Button>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#2A372F]/70">
                <MapPin size={16} className="text-[#2d5555] mt-0.5 shrink-0" />
                <p>
                  Easily accessible from Galle, Matara, and surrounding areas.
                  Free parking available on campus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1400px] mx-auto border-t border-[#2A372F]/20 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold mb-4 block">
                Quick Answers
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">
                Frequently Asked{' '}
                <span className="italic opacity-80">Questions</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-[#2d5555]/10 border border-[#2A372F]/20 p-6">
                <h3 className="text-sm font-medium tracking-wide mb-3 text-[#2A372F]">
                  What are your office hours?
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Our administrative office is open Monday through Friday, 9:00
                  AM to 5:00 PM. School hours are 7:30 AM to 6:00 PM with
                  extended care available.
                </p>
              </div>

              <div className="bg-[#2d5555]/10 border border-[#2A372F]/20 p-6">
                <h3 className="text-sm font-medium tracking-wide mb-3 text-[#2A372F]">
                  How quickly will I receive a response?
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  We aim to respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly at
                  074 343 1488.
                </p>
              </div>

              <div className="bg-[#2d5555]/10 border border-[#2A372F]/20 p-6">
                <h3 className="text-sm font-medium tracking-wide mb-3 text-[#2A372F]">
                  Can I schedule a campus tour?
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Yes! We encourage all prospective families to visit our
                  campus. Tours are available by appointment on weekday
                  mornings. Contact us to schedule your visit.
                </p>
              </div>

              <div className="bg-[#2d5555]/10 border border-[#2A372F]/20 p-6">
                <h3 className="text-sm font-medium tracking-wide mb-3 text-[#2A372F]">
                  Do you offer enrollment consultations?
                </h3>
                <p className="text-xs text-[#2A372F]/70 font-light leading-relaxed">
                  Absolutely. Our admissions team offers personalized
                  consultations to discuss your child's needs, our programs, and
                  answer any questions you may have about enrollment.
                </p>
              </div>
            </div>
          </div>
        </section>
        </DarkModeProvider>
      </main>

      <Footer />
    </div>;
}
