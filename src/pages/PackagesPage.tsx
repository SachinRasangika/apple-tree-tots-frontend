import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { PageHeroSection } from '../components/PageHeroSection';
import { Button } from '../components/ui/Button';
import { CTABox } from '../components/CTABox';
import { Check, Clock, Users, BookOpen, Heart, Star, Sparkles, Calendar, Shield, CreditCard, Gift, Plus, Minus } from 'lucide-react';
interface PackageCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  delay: string;
}
function PackageCard({
  name,
  price,
  period,
  description,
  features,
  icon,
  popular,
  delay
}: PackageCardProps) {
  return <div className={`relative flex flex-col h-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] ${popular ? 'bg-[#2A372F]/20 border-2 border-[#2A372F] shadow-xl scale-105' : 'bg-[#CDD1CB]/10 border border-[#2A372F]/20'}`} style={{
    animationDelay: delay
  }}>
      {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A372F] px-6 py-2 text-xs uppercase tracking-widest text-[#CDD1CB]">
          Most Popular
        </div>}

      <div className="p-8 flex flex-col flex-grow">
        {/* Icon & Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#2A372F]/20 border border-[#2A372F]/20 flex items-center justify-center text-[#2A372F]">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#2A372F]">{name}</h3>
            <p className="text-xs text-[#2A372F]/70">{description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-[#2A372F]/20">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-[#2d5555]">{price}</span>
            <span className="text-sm text-[#2A372F]/70">{period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, idx) => <li key={idx} className="flex items-start gap-3 text-sm">
              <Check size={16} className="text-[#2A372F] mt-0.5 shrink-0" />
              <span className="text-[#2A372F]/70 font-light">{feature}</span>
            </li>)}
        </ul>

        {/* CTA */}
        <Button variant={popular ? 'primary' : 'outline'} className="w-full">
          Enroll Now
        </Button>
      </div>
    </div>;
}
interface FAQItemProps {
  question: string;
  answer: string;
}
function FAQItem({
  question,
  answer
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between hover:bg-white/5 transition-colors px-4 text-left">
        <span className="text-sm font-medium tracking-wide pr-4">
          {question}
        </span>
        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {isOpen && <div className="px-4 pb-6 animate-[fadeIn_0.3s_ease-out]">
          <p className="text-sm text-[#2A372F]/70 leading-relaxed">{answer}</p>
        </div>}
    </div>;
}
export function PackagesPage() {
  const packages = [{
    name: 'Toddler Programs',
    price: 'Rs 25,000',
    period: 'per month',
    description: 'Ages 1.5 to 3 years',
    features: ['Half-day sessions (4 hours)', 'Sensory play and exploration', 'Small group activities (1:6 ratio)', 'Parent orientation included', 'Weekly progress updates', 'Snack time included'],
    icon: <Heart size={20} />,
    popular: false,
    delay: '0ms'
  }, {
    name: 'CASA Programs',
    price: 'Rs 30,000',
    period: 'per month',
    description: 'Ages 3 to 6 years',
    features: ['Full-day option available', 'Montessori curriculum', 'Structured learning environment', 'Teacher-child ratio 1:8', 'Lunch and snacks included', 'Monthly parent workshops', 'School readiness focus'],
    icon: <Star size={20} />,
    popular: false,
    delay: '150ms'
  }];
  const additionalOptions = [{
    name: 'Full-Time Care',
    price: 'Rs 35,000',
    period: 'per month',
    description: 'Extended hours (7:30 AM - 6:00 PM)',
    features: ['All age groups welcome', 'Flexible scheduling', 'All meals and snacks', 'Holiday care available'],
    icon: <Clock size={20} />,
    delay: '0ms'
  }, {
    name: 'Half-Day Program',
    price: 'Rs 20,000',
    period: 'per month',
    description: 'Morning sessions (8:00 AM - 12:00 PM)',
    features: ['All age groups', 'Core curriculum included', 'Flexible start dates', 'Snack included'],
    icon: <Users size={20} />,
    delay: '150ms'
  }, {
    name: 'Trial Week',
    price: 'Rs 8,000',
    period: 'one week',
    description: 'Experience our program risk-free',
    features: ['5-day trial period', 'No long-term commitment', 'Meet teachers and students', 'Full refund if not satisfied'],
    icon: <Sparkles size={20} />,
    delay: '300ms'
  }];
  const faqs = [{
    question: 'What is included in the monthly fee?',
    answer: 'All monthly fees include tuition, curriculum materials, snacks (or meals for full-day programs), and access to all regular activities and facilities. Field trips, special events, and optional add-ons may have additional costs.'
  }, {
    question: 'Do you offer sibling discounts?',
    answer: 'Yes! We offer 10% discount for the second child and 15% for the third child when multiple siblings are enrolled simultaneously. The discount applies to the monthly tuition fees.'
  }, {
    question: 'What are the payment options?',
    answer: 'We accept monthly payments via bank transfer, cash, or cheque. We also offer quarterly and annual payment plans with a 5% discount for upfront payment. Payment is due by the 1st of each month.'
  }, {
    question: 'Is there a registration fee?',
    answer: "Yes, there is a one-time registration fee of Rs 10,000 which covers administrative costs, materials, and your child's enrollment kit. This fee is non-refundable but is only paid once."
  }, {
    question: 'Can I switch between programs?',
    answer: "Yes, you can switch programs with one month's notice. We'll work with you to ensure a smooth transition based on your child's developmental needs and your family's schedule."
  }, {
    question: 'What is your refund policy?',
    answer: "We offer a full refund during the trial week if you're not satisfied. For enrolled students, we require one month's notice for withdrawal. Tuition for the current month is non-refundable, but we'll prorate if you provide advance notice."
  }];
  return <div className="min-h-screen bg-[#CDD1CB] text-[#2A372F] selection:bg-[#2A372F] selection:text-[#CDD1CB]">
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <PageHeroSection
          title="PACKAGES"
          description="Choose the program that best fits your child's developmental stage and your family's needs. All packages include our Montessori curriculum, qualified teachers, and nurturing environment."
          imageUrl="/apple-tree-tots/images/gallery/Gemini_Generated_Image_dcqagmdcqagmdcqa.png"
          imageAlt="Class packages"
        />

        {/* Main Packages */}
        <section className="max-w-[1400px] mx-auto mb-20">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2A372F] mb-2">
              Core <span className="text-[#2d5555] font-light">Programs</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent mb-4"></div>
            <p className="text-sm text-[#2A372F]/70 font-light">
              Our primary age-based programs designed for optimal development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {packages.map(pkg => <PackageCard key={pkg.name} {...pkg} />)}
          </div>
        </section>

        {/* Additional Options */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2A372F] mb-2">
              Additional <span className="text-[#2d5555] font-light">Options</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent mb-4"></div>
            <p className="text-sm text-[#2A372F]/70 font-light">
              Flexible scheduling and trial programs to fit your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalOptions.map(option => <PackageCard key={option.name} {...option} />)}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2A372F] mb-2">
              What's <span className="text-[#2d5555] font-light">Included</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent mx-auto mb-4"></div>
            <p className="text-sm text-[#2A372F]/70 font-light">
              Every package includes these essential benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6 text-center">
              <Shield className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-[#2A372F] mb-2">
                Qualified Teachers
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light">
                ECE certified educators with 1+ years experience
              </p>
            </div>

            <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6 text-center">
              <BookOpen className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-[#2A372F] mb-2">
                Montessori Curriculum
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light">
                Research-based, child-centered learning approach
              </p>
            </div>

            <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6 text-center">
              <Users className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-[#2A372F] mb-2">
                Small Class Sizes
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light">
                Maximum 1:8 teacher-to-child ratio
              </p>
            </div>

            <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6 text-center">
              <Heart className="w-10 h-10 text-[#2A372F] mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-[#2A372F] mb-2">
                Nurturing Environment
              </h3>
              <p className="text-xs text-[#2A372F]/70 font-light">
                Safe, welcoming space for growth and learning
              </p>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Discounts */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-8 h-8 text-[#2A372F]" />
                <h2 className="text-2xl font-serif tracking-widest uppercase">
                  Discounts & <span className="italic opacity-80">Savings</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Sibling Discount
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    10% off for 2nd child, 15% off for 3rd child
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#2A372F]">
                    <Check size={14} />
                    <span>Applies to monthly tuition</span>
                  </div>
                </div>

                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Annual Payment
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    5% discount for full year paid upfront
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#2A372F]">
                    <Check size={14} />
                    <span>Save up to Rs 18,000 per year</span>
                  </div>
                </div>

                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Referral Bonus
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    Refer a family and get one month 50% off
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#2A372F]">
                    <Check size={14} />
                    <span>Unlimited referrals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-8 h-8 text-[#2A372F]" />
                <h2 className="text-2xl font-serif tracking-widest uppercase">
                  Payment <span className="italic opacity-80">Options</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Monthly Payments
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    Pay month-to-month with flexible terms
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">
                        Bank transfer, cash, or cheque
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">
                        Due by 1st of each month
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Quarterly Payments
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    Pay every 3 months for convenience
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">
                        3% discount on total
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">
                        Fewer payment transactions
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-6">
                  <h3 className="text-sm font-medium tracking-wide mb-2">
                    Annual Payments
                  </h3>
                  <p className="text-xs text-[#2A372F]/70 mb-3">
                    Pay for the full year and save
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">5% discount applied</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <Check size={12} className="text-[#2A372F]" />
                      <span className="text-[#2A372F]/70">Priority enrollment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.2em] uppercase text-[#2A372F] font-bold mb-4 block">
                Common Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">
                Pricing <span className="italic opacity-80">FAQ</span>
              </h2>
            </div>

            <div className="bg-[#2A372F]/5 border border-[#2A372F]/20">
              {faqs.map(faq => <FAQItem key={faq.question} {...faq} />)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-12 text-center">
            <Calendar className="w-12 h-12 text-[#2A372F] mx-auto mb-6" />
            <h3 className="text-2xl font-serif tracking-widest uppercase mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-sm text-[#2A372F]/70 font-light mb-8 max-w-lg mx-auto">
              Schedule a campus tour to see our programs in action, meet our
              teachers, and find the perfect package for your family. We'd love
              to welcome you to Apple Tree Tots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTABox
                primaryText="Apply Now"
                secondaryText="Call Us"
                primaryHref="/application"
                secondaryHref="tel:+94743431488"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}
