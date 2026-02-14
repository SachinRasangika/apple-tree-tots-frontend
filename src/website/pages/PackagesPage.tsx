import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, PageHeroSection, CTABox } from '../components';
import { Button } from '../../components/ui/Button';
import { Check, Clock, Users, BookOpen, Heart, Star, Sparkles, Calendar, Shield, CreditCard, Gift, Plus, Minus, Package } from 'lucide-react';
import html2pdf from 'html2pdf.js';
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
  const navigate = useNavigate();

  const handleDownloadPackages = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="background: #CDD1CB; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2A372F; line-height: 1.6;">
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #2A372F 0%, #2d5555 100%); color: #CDD1CB; padding: 50px 40px; text-align: center;">
          <h1 style="font-size: 42px; margin: 0 0 10px 0; font-weight: 700; letter-spacing: 2px;">APPLE TREE TOTS</h1>
          <h2 style="font-size: 28px; margin: 0; font-weight: 300; letter-spacing: 1px;">Package Options</h2>
          <div style="height: 3px; width: 100px; background: #CDD1CB; margin: 20px auto; border-radius: 2px;"></div>
          <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.9;">Montessori Education for Every Child</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px; background: #CDD1CB;">
          <!-- Preschool Program Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 24px; color: #2A372F; margin: 0 0 5px 0; font-weight: 700; letter-spacing: 1px;">PRESCHOOL</h2>
            <h3 style="font-size: 20px; color: #2d5555; margin: 0 0 25px 0; font-weight: 300; letter-spacing: 0.5px;">Program</h3>

            <!-- Package Card 1 -->
            <div style="background: white; border-left: 4px solid #2d5555; padding: 25px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
              <h4 style="font-size: 18px; color: #2A372F; margin: 0 0 10px 0; font-weight: 700;">1 Month</h4>
              <p style="color: #2d5555; font-size: 20px; margin: 5px 0; font-weight: 700;">USD 450 <span style="font-size: 14px; color: #666;">(≈ LKR 139,500)</span></p>
              <ul style="margin: 0; padding-left: 20px; list-style-position: inside; margin-top: 15px;">
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Full Montessori curriculum</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Qualified ECE teachers</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Age-appropriate materials</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Parent updates included</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Safe learning environment</li>
                <li style="color: #444; font-size: 13px;">Snack time included</li>
              </ul>
            </div>

            <!-- Package Card 2 -->
            <div style="background: white; border-left: 4px solid #2d5555; padding: 25px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
              <h4 style="font-size: 18px; color: #2A372F; margin: 0 0 10px 0; font-weight: 700;">3 Months</h4>
              <p style="color: #2d5555; font-size: 20px; margin: 5px 0; font-weight: 700;">USD 385/mo <span style="font-size: 14px; color: #666;">(≈ LKR 119,350)</span></p>
              <ul style="margin: 0; padding-left: 20px; list-style-position: inside; margin-top: 15px;">
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Full Montessori curriculum</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Qualified ECE teachers</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Age-appropriate materials</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Parent updates included</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Safe learning environment</li>
                <li style="color: #444; font-size: 13px;">Snack time included</li>
              </ul>
            </div>

            <!-- Package Card 3 -->
            <div style="background: white; border-left: 4px solid #2d5555; padding: 25px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
              <h4 style="font-size: 18px; color: #2A372F; margin: 0 0 10px 0; font-weight: 700;">6 Months</h4>
              <p style="color: #2d5555; font-size: 20px; margin: 5px 0; font-weight: 700;">USD 330/mo <span style="font-size: 14px; color: #666;">(≈ LKR 102,300)</span></p>
              <ul style="margin: 0; padding-left: 20px; list-style-position: inside; margin-top: 15px;">
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Full Montessori curriculum</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Qualified ECE teachers</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Age-appropriate materials</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Parent updates included</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Safe learning environment</li>
                <li style="color: #444; font-size: 13px;">Snack time included</li>
              </ul>
            </div>

            <!-- Package Card 4 -->
            <div style="background: white; border-left: 4px solid #2d5555; padding: 25px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
              <h4 style="font-size: 18px; color: #2A372F; margin: 0 0 10px 0; font-weight: 700;">Full School Year</h4>
              <p style="color: #2d5555; font-size: 20px; margin: 5px 0; font-weight: 700;">USD 300/mo <span style="font-size: 14px; color: #666;">(≈ LKR 93,000)</span></p>
              <ul style="margin: 0; padding-left: 20px; list-style-position: inside; margin-top: 15px;">
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Full Montessori curriculum</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Qualified ECE teachers</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Age-appropriate materials</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Parent updates included</li>
                <li style="margin-bottom: 6px; color: #444; font-size: 13px;">Safe learning environment</li>
                <li style="color: #444; font-size: 13px;">Snack time included</li>
              </ul>
            </div>
          </div>

          <!-- Daycare Services Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 24px; color: #2A372F; margin: 0 0 5px 0; font-weight: 700; letter-spacing: 1px;">DAYCARE</h2>
            <h3 style="font-size: 20px; color: #2d5555; margin: 0 0 25px 0; font-weight: 300; letter-spacing: 0.5px;">Services</h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">Monthly</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 300</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 93,000)</p>
              </div>

              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">Weekly</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 100</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 31,000)</p>
              </div>

              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">Hourly</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 10</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 3,100)</p>
              </div>

              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">More than 3 hours</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 8/hr</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 2,480)</p>
              </div>
            </div>
          </div>

          <!-- Additional Fees Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 24px; color: #2A372F; margin: 0 0 5px 0; font-weight: 700; letter-spacing: 1px;">ADDITIONAL</h2>
            <h3 style="font-size: 20px; color: #2d5555; margin: 0 0 25px 0; font-weight: 300; letter-spacing: 0.5px;">Fees</h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">One-Time Enrollment Fee</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 200</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 62,000)</p>
              </div>

              <div style="background: white; border-left: 4px solid #2d5555; padding: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(42, 55, 47, 0.1);">
                <h4 style="font-size: 16px; color: #2A372F; margin: 0 0 8px 0; font-weight: 700;">Annual Building Fund</h4>
                <p style="color: #2d5555; font-size: 18px; margin: 5px 0; font-weight: 700;">USD 65</p>
                <p style="color: #666; font-size: 12px; margin: 5px 0;">(≈ LKR 20,150)</p>
              </div>
            </div>
          </div>

          <!-- Special Offer Section -->
          <div style="margin-bottom: 40px; background: linear-gradient(135deg, rgba(231, 122, 106, 0.1) 0%, rgba(231, 122, 106, 0.05) 100%); border: 2px solid #E77A6A; padding: 25px; border-radius: 4px;">
            <h2 style="font-size: 24px; color: #E77A6A; margin: 0 0 15px 0; font-weight: 700;">✨ SPECIAL OFFER</h2>
            <p style="color: #2A372F; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">The first 5 children will get FREE admission!</p>
            <p style="color: #2A372F; font-size: 13px; margin: 0; line-height: 1.6;">Limited time offer. Don't miss this exclusive opportunity to enroll your child at Apple Tree Tots with complimentary admission processing. Offer valid for enrollment done in the current period.</p>
          </div>


          <!-- Footer -->
          <div style="border-top: 2px solid #2A372F; padding-top: 20px; text-align: center;">
            <p style="margin: 0 0 5px 0; color: #2A372F; font-size: 14px; font-weight: 700;">For More Information</p>
            <p style="margin: 0; color: #666; font-size: 13px;">Phone: +94 74 343 1488</p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">Apple Tree Tots | Montessori Education</p>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: 'Apple_Tree_Tots_Packages.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const faqs = [{
    question: 'What does the Preschool Program include?',
    answer: 'All preschool programs include full Montessori curriculum, qualified ECE teachers, age-appropriate learning materials, safe learning environment, snack time, and regular parent updates.'
  }, {
    question: 'Are there additional fees beyond the program fees?',
    answer: 'Yes, there is a one-time enrollment fee of USD 200 (≈ LKR 62,000) and an annual building fund of USD 65 (≈ LKR 20,150). However, the first 5 children get FREE admission!'
  }, {
    question: 'What is the special FREE admission offer?',
    answer: 'We are offering FREE admission processing (waiving the USD 200 enrollment fee) for the first 5 children enrolled. This is a limited-time offer - enroll now to take advantage of this exclusive benefit!'
  }, {
    question: 'When should I pay for my enrollment?',
    answer: 'Payment should be made according to your selected plan. For the 1-month plan, you pay upfront. For longer plans (3, 6 months, or full year), you can arrange a payment schedule with our admissions team.'
  }, {
    question: 'What if I want flexibility with daycare?',
    answer: 'Perfect! We offer flexible daycare services with multiple options: Monthly (USD 300), Weekly (USD 100), Hourly (USD 10), or more than 3 hours (USD 8/hour) - choose what works best for your family.'
  }, {
    question: 'Can I upgrade my enrollment plan later?',
    answer: 'Yes! You can change your enrollment plan by providing one month notice. If you upgrade from a shorter plan to a longer one, the monthly rate may adjust accordingly.'
  }];
  return <div className="min-h-screen bg-[#CDD1CB] text-[#2A372F] selection:bg-[#2A372F] selection:text-[#CDD1CB]">
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <PageHeroSection
          title="PACKAGES"
          description="Choose the program that best fits your child's developmental stage and your family's needs. All packages include our Montessori curriculum, qualified teachers, and nurturing environment."
          imageUrl="/images/gallery/Gemini_Generated_Image_dcqagmdcqagmdcqa.png"
          imageAlt="Class packages"
          buttonLabel="Download Packages"
          onButtonClick={handleDownloadPackages}
          showIcon={false}
        />

        {/* Fee Structure Information */}
        <section className="max-w-[1400px] mx-auto mb-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-2 text-[#2A372F]">
              Preschool Program – <span className="italic opacity-80">Fee Structure</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2d5555] to-transparent mb-6"></div>
          </div>

          {/* Preschool Program Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Plan 1 */}
            <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2A372F] mb-1">Preschool Program</h3>
                <p className="text-sm text-[#2A372F]/60 mb-6">1 Month</p>
                <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                  <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 450</p>
                  <p className="text-xs text-[#2A372F]/60">≈ LKR 139,500</p>
                </div>
              </div>
              <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                Enroll Now
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2A372F] mb-1">Preschool Program</h3>
                <p className="text-sm text-[#2A372F]/60 mb-6">3 Months</p>
                <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                  <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 385<span className="text-lg">/mo</span></p>
                  <p className="text-xs text-[#2A372F]/60">≈ LKR 119,350</p>
                </div>
              </div>
              <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                Enroll Now
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2A372F] mb-1">Preschool Program</h3>
                <p className="text-sm text-[#2A372F]/60 mb-6">6 Months</p>
                <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                  <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 330<span className="text-lg">/mo</span></p>
                  <p className="text-xs text-[#2A372F]/60">≈ LKR 102,300</p>
                </div>
              </div>
              <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                Enroll Now
              </button>
            </div>

            {/* Plan 4 */}
            <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2A372F] mb-1">Preschool Program</h3>
                <p className="text-sm text-[#2A372F]/60 mb-6">Full School Year</p>
                <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                  <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 300<span className="text-lg">/mo</span></p>
                  <p className="text-xs text-[#2A372F]/60">≈ LKR 93,000</p>
                </div>
              </div>
              <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                Enroll Now
              </button>
            </div>
          </div>

          {/* Daycare Services */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#2A372F] mb-8 mt-8">
              Daycare <span className="text-[#2d5555] font-light">Services</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Daycare Plan 1 */}
              <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-[#2A372F] mb-1">Daycare Services</h4>
                  <p className="text-sm text-[#2A372F]/60 mb-6">Monthly</p>
                  <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                    <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 300</p>
                    <p className="text-xs text-[#2A372F]/60">≈ LKR 93,000</p>
                  </div>
                </div>
                <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                  Enroll Now
                </button>
              </div>

              {/* Daycare Plan 2 */}
              <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-[#2A372F] mb-1">Daycare Services</h4>
                  <p className="text-sm text-[#2A372F]/60 mb-6">Weekly</p>
                  <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                    <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 100</p>
                    <p className="text-xs text-[#2A372F]/60">≈ LKR 31,000</p>
                  </div>
                </div>
                <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                  Enroll Now
                </button>
              </div>

              {/* Daycare Plan 3 */}
              <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-[#2A372F] mb-1">Daycare Services</h4>
                  <p className="text-sm text-[#2A372F]/60 mb-6">Hourly</p>
                  <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                    <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 10</p>
                    <p className="text-xs text-[#2A372F]/60">≈ LKR 3,100</p>
                  </div>
                </div>
                <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                  Enroll Now
                </button>
              </div>

              {/* Daycare Plan 4 */}
              <div className="bg-white border-2 border-[#2A372F]/20 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-[#2A372F] mb-1">Daycare Services</h4>
                  <p className="text-sm text-[#2A372F]/60 mb-6">More than 3 hours</p>
                  <div className="mb-6 pb-6 border-b-2 border-[#2d5555]/30">
                    <p className="text-4xl font-bold text-[#2d5555] mb-1">USD 8<span className="text-lg">/hr</span></p>
                    <p className="text-xs text-[#2A372F]/60">≈ LKR 2,480</p>
                  </div>
                </div>
                <button onClick={() => navigate('/application')} className="mt-8 w-full bg-[#2d5555] text-white py-3 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm hover:bg-[#2A372F] transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Additional Fees */}
            <div className="bg-[#2A372F]/10 border border-[#2A372F]/20 p-8 rounded-lg">
              <h3 className="text-lg font-semibold text-[#2A372F] mb-6 flex items-center gap-3">
                <CreditCard size={20} />
                Additional Fees
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-[#2A372F]/10">
                  <p className="text-sm font-medium text-[#2A372F] mb-1">One-Time Enrollment Fee</p>
                  <p className="text-sm text-[#2d5555] font-semibold">USD 200 <span className="text-xs text-[#2A372F]/70">(≈ LKR 62,000)</span></p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2A372F] mb-1">Annual Building Fund</p>
                  <p className="text-sm text-[#2d5555] font-semibold">USD 65 <span className="text-xs text-[#2A372F]/70">(≈ LKR 20,150)</span></p>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-br from-[#E77A6A]/20 to-[#E77A6A]/10 border-2 border-[#E77A6A] p-8 rounded-lg flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-[#E77A6A]" />
                <h3 className="text-lg font-semibold text-[#E77A6A]">Special Offer</h3>
              </div>
              <p className="text-sm text-[#2A372F] font-light leading-relaxed">
                <strong className="text-[#E77A6A]">The first 5 children will get FREE admission!</strong>
              </p>
              <p className="text-xs text-[#2A372F]/70 mt-3">
                Limited time offer. Don't miss this exclusive opportunity to enroll your child at Apple Tree Tots with complimentary admission processing.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-[#2A372F]/20 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.2em] uppercase text-[#2A372F] font-bold mb-4 block">
                Questions About Our Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">
                Fee <span className="italic opacity-80">Structure</span>
              </h2>
            </div>

            <div className="bg-[#2A372F]/5 border border-[#2A372F]/20">
              {faqs.map(faq => <FAQItem key={faq.question} {...faq} />)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto border-t border-[#2A372F]/20 pt-20">
          <div className="bg-gradient-to-br from-[#2d5555]/20 to-[#2d5555]/10 border-2 border-[#2d5555] p-12 text-center rounded-lg">
            <Sparkles className="w-12 h-12 text-[#2d5555] mx-auto mb-6" />
            <h3 className="text-3xl font-serif tracking-widest uppercase mb-4">
              Don't Miss Out!
            </h3>
            <p className="text-lg text-[#2A372F] font-bold mb-2">
              The first 5 children get FREE admission!
            </p>
            <p className="text-sm text-[#2A372F]/70 font-light mb-8 max-w-lg mx-auto">
              Choose your perfect program from our flexible Preschool and Daycare options, and get your enrollment fee waived. Limited time offer!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTABox
                primaryText="Enroll Now"
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
