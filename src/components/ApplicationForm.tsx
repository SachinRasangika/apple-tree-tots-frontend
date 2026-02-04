import React, { useState, Fragment } from 'react';
import { Button } from './ui/Button';
import { Check, ChevronRight } from 'lucide-react';
import { submitWebsiteApplication } from '../services/applicationApi';
import { generateApplicationSubmissionPDF } from '../services/pdfGenerator';

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
  submittedBy?: 'website' | 'admin';
}

interface FormData {
  // Section A: Child's Information
  childFullName: string;
  childDOB: string;
  childGender: string;
  childNationality: string;
  homeAddress: string;
  languageAtHome: string;

  // Section B: Parent / Guardian Information
  parent1Name: string;
  parent1NIC: string;
  parent1Mobile: string;
  parent1Email: string;
  parent2Name: string;
  parent2NIC: string;
  parent2Mobile: string;

  // Section C: Program Enrollment
  programType: string;
  programLevel: string;

  // Section D: Medical & Emergency Information
  immunizationUpToDate: boolean;
  medicalConditions: string;
  emergencyContact1Name: string;
  emergencyContact1Phone: string;
  emergencyContact2Name: string;
  emergencyContact2Phone: string;
  authorizedPickupPersons: string;

  // Section E: Document Uploads
  birthCertificate: File[];
  childPhoto: File[];
  parentNICs: File[];
  immunizationRecord: File[];

  // Section F: Payment Receipt Upload
  paymentReceipt: File[];

  // Agreements
  termsAgreed: boolean;
  medicalConsentAgreed: boolean;
}

// For PDF generation - without File arrays and agreements
type FormDataForPDFGeneration = Omit<FormData, 'birthCertificate' | 'childPhoto' | 'parentNICs' | 'immunizationRecord' | 'paymentReceipt' | 'termsAgreed' | 'medicalConsentAgreed'>;

export function ApplicationForm({ onSubmitSuccess, submittedBy = 'website' }: ApplicationFormProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedApplicationData, setSubmittedApplicationData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    childFullName: '',
    childDOB: '',
    childGender: '',
    childNationality: '',
    homeAddress: '',
    languageAtHome: '',
    parent1Name: '',
    parent1NIC: '',
    parent1Mobile: '',
    parent1Email: '',
    parent2Name: '',
    parent2NIC: '',
    parent2Mobile: '',
    programType: '',
    programLevel: '',
    immunizationUpToDate: false,
    medicalConditions: '',
    emergencyContact1Name: '',
    emergencyContact1Phone: '',
    emergencyContact2Name: '',
    emergencyContact2Phone: '',
    authorizedPickupPersons: '',
    birthCertificate: [],
    childPhoto: [],
    parentNICs: [],
    immunizationRecord: [],
    paymentReceipt: [],
    termsAgreed: false,
    medicalConsentAgreed: false,
  });

  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: string | boolean | File[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: 'birthCertificate' | 'childPhoto' | 'parentNICs' | 'immunizationRecord' | 'paymentReceipt', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        [field]: fileArray
      }));
      // Clear validation error when files are uploaded
      if (submitError) {
        setSubmitError(null);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Clear validation error when moving to next step
      if (submitError) {
        setSubmitError(null);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const downloadApplicationData = async () => {
    if (!submittedApplicationData) return;
    const pdfData: any = {
      childFullName: submittedApplicationData.childFullName,
      childDOB: submittedApplicationData.childDOB,
      childGender: submittedApplicationData.childGender,
      childNationality: submittedApplicationData.childNationality,
      homeAddress: submittedApplicationData.homeAddress,
      languageAtHome: submittedApplicationData.languageAtHome,
      parent1Name: submittedApplicationData.parent1Name,
      parent1NIC: submittedApplicationData.parent1NIC,
      parent1Mobile: submittedApplicationData.parent1Mobile,
      parent1Email: submittedApplicationData.parent1Email,
      parent2Name: submittedApplicationData.parent2Name,
      parent2NIC: submittedApplicationData.parent2NIC,
      parent2Mobile: submittedApplicationData.parent2Mobile,
      programType: submittedApplicationData.programType,
      programLevel: submittedApplicationData.programLevel,
      immunizationUpToDate: submittedApplicationData.immunizationUpToDate,
      medicalConditions: submittedApplicationData.medicalConditions,
      emergencyContact1Name: submittedApplicationData.emergencyContact1Name,
      emergencyContact1Phone: submittedApplicationData.emergencyContact1Phone,
      emergencyContact2Name: submittedApplicationData.emergencyContact2Name,
      emergencyContact2Phone: submittedApplicationData.emergencyContact2Phone,
      authorizedPickupPersons: submittedApplicationData.authorizedPickupPersons,
      paymentReceiptFile: submittedApplicationData.paymentReceipt?.[0] || null,
    };
    await generateApplicationSubmissionPDF(pdfData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous errors before attempting new submission
    setSubmitError(null);
    setShowTermsPopup(true);
  };

  const handleFinalSubmit = async () => {
    if (formData.termsAgreed && formData.medicalConsentAgreed) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const submissionData = {
          ...formData,
          submittedBy: submittedBy,
        };
        await submitWebsiteApplication(submissionData);
        setShowTermsPopup(false);

        // Store the application data and show success popup
        setSubmittedApplicationData(formData);
        setShowSuccessPopup(true);

        // Call success callback if provided (for admin dashboard redirect)
        if (onSubmitSuccess) {
          onSubmitSuccess?.();
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';
        setSubmitError(errorMessage);
        alert(`Error: ${errorMessage}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return <div className="w-full">
      {/* Form Header */}
      <div className="mb-12 pb-8 border-b border-[#2A372F]/20">
        <h1 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4 text-[#2A372F]">
          Apple Tree Tots - Online Admission Form
        </h1>
        <p className="text-base text-[#2A372F]/80 mb-4 font-light">
          Nurturing confident, independent, and curious learners through AMI Montessori principles and the HEI approach.
        </p>
        <p className="text-sm text-[#2A372F]/70">
          <strong>Instructions:</strong> Please complete all sections below. To finalize admission, you must submit the required documents (Birth Certificate, Photos, and NIC copies) and pay the non-refundable admission fee.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map(step => <Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step < currentStep ? 'bg-[#2d5555] border-[#2d5555] text-white' : step === currentStep ? 'bg-transparent border-[#2A372F] text-[#2A372F]' : 'bg-transparent border-[#2A372F]/20 text-[#2A372F]/40'}`}>
                  {step < currentStep ? <Check size={20} /> : <span className="text-sm font-medium">{step}</span>}
                </div>
                <span className="text-[10px] tracking-widest uppercase mt-2 opacity-60">
                  {step === 1 && "Child's Info"}
                  {step === 2 && 'Parent Info'}
                  {step === 3 && 'Program'}
                  {step === 4 && 'Health & Docs'}
                  {step === 5 && 'Agreements'}
                  {step === 6 && 'Payment'}
                </span>
              </div>
              {step < 6 && <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${step < currentStep ? 'bg-[#2d5555]' : 'bg-[#2A372F]/10'}`} />}
            </Fragment>)}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Child's Information */}
        {currentStep === 1 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Section A: Child's Information
              </h3>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Full Name *
              </label>
              <input type="text" required value={formData.childFullName} onChange={e => updateFormData('childFullName', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter child's full name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Date of Birth *
                </label>
                <input type="date" required value={formData.childDOB} onChange={e => updateFormData('childDOB', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] focus:outline-none focus:border-[#2A372F] transition-colors" />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Gender *
                </label>
                <select required value={formData.childGender} onChange={e => updateFormData('childGender', e.target.value)} className="w-full bg-[#2d5555] border-b border-[#2A372F]/40 px-3 py-3 text-sm text-white focus:outline-none focus:border-[#2A372F] transition-colors">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Nationality *
              </label>
              <input type="text" required value={formData.childNationality} onChange={e => updateFormData('childNationality', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter nationality" />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Home Address *
              </label>
              <textarea required value={formData.homeAddress} onChange={e => updateFormData('homeAddress', e.target.value)} rows={3} className="w-full bg-transparent border border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors resize-none" placeholder="Enter full home address" />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Language Spoken at Home *
              </label>
              <input type="text" required value={formData.languageAtHome} onChange={e => updateFormData('languageAtHome', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter language(s)" />
              <p className="text-xs text-[#2A372F]/60 mt-1">Note: English is the main language of instruction</p>
            </div>
          </div>}

        {/* Step 2: Parent / Guardian Information */}
        {currentStep === 2 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Section B: Parent / Guardian Information
              </h3>
            </div>

            {/* Father/Guardian 1 */}
            <div className="pb-6 border-b border-[#2A372F]/20">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Father/Guardian 1</h4>
              
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Name *
                </label>
                <input type="text" required value={formData.parent1Name} onChange={e => updateFormData('parent1Name', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter name" />
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  NIC Number * (Copy required)
                </label>
                <input type="text" required value={formData.parent1NIC} onChange={e => updateFormData('parent1NIC', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter NIC number" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Mobile Number *
                  </label>
                  <input type="tel" required value={formData.parent1Mobile} onChange={e => updateFormData('parent1Mobile', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter mobile number" />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Email Address * (Used for receipts and reminders)
                  </label>
                  <input type="email" required value={formData.parent1Email} onChange={e => updateFormData('parent1Email', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter email" />
                </div>
              </div>
            </div>

            {/* Mother/Guardian 2 */}
            <div>
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Mother/Guardian 2 (Optional)</h4>
              
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Name
                </label>
                <input type="text" value={formData.parent2Name} onChange={e => updateFormData('parent2Name', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter name (optional)" />
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  NIC Number (Copy required)
                </label>
                <input type="text" value={formData.parent2NIC} onChange={e => updateFormData('parent2NIC', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter NIC number (optional)" />
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Mobile Number
                </label>
                <input type="tel" value={formData.parent2Mobile} onChange={e => updateFormData('parent2Mobile', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Enter mobile number (optional)" />
              </div>
            </div>
          </div>}

        {/* Step 3: Program Enrollment */}
        {currentStep === 3 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Section C: Program Enrollment
              </h3>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Select Program Type *
              </label>
              <select required value={formData.programType} onChange={e => updateFormData('programType', e.target.value)} className="w-full bg-[#2d5555] border-b border-[#2A372F]/40 px-3 py-3 text-sm text-white focus:outline-none focus:border-[#2A372F] transition-colors">
                <option value="">Select program</option>
                <option value="toddler">Toddler Programs</option>
                <option value="casa">CASA Programs</option>
              </select>
            </div>

            {formData.programType && <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Schedule Type *
              </label>
              <select required value={formData.programLevel} onChange={e => updateFormData('programLevel', e.target.value)} className="w-full bg-[#2d5555] border-b border-[#2A372F]/40 px-3 py-3 text-sm text-white focus:outline-none focus:border-[#2A372F] transition-colors">
                <option value="">Select schedule type</option>
                {formData.programType === 'toddler' ? (
                  <>
                    <option value="half-day">Half-day (4 hours)</option>
                    <option value="full-day">Full-day (Extended hours)</option>
                  </>
                ) : (
                  <>
                    <option value="half-day">Half-day (4 hours)</option>
                    <option value="full-day">Full-day (Extended hours)</option>
                  </>
                )}
              </select>
            </div>}
          </div>}

        {/* Step 4: Medical & Emergency Information & Documents */}
        {currentStep === 4 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Section D: Medical & Emergency Information
              </h3>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.immunizationUpToDate} onChange={e => updateFormData('immunizationUpToDate', e.target.checked)} className="w-5 h-5 accent-[#2d5555]" />
                <span className="text-sm text-[#2A372F]">
                  Immunization Record Up to Date? * (Copy of record required)
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Existing Medical Conditions/Allergies
              </label>
              <textarea value={formData.medicalConditions} onChange={e => updateFormData('medicalConditions', e.target.value)} rows={3} className="w-full bg-transparent border border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors resize-none" placeholder="List any medical conditions or allergies" />
            </div>

            <div className="border-t border-[#2A372F]/20 pt-6">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Emergency Contacts</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Emergency Contact 1 - Name & Phone *
                  </label>
                  <input type="text" required value={formData.emergencyContact1Name} onChange={e => updateFormData('emergencyContact1Name', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Name & Phone" />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Emergency Contact 2 - Name & Phone *
                  </label>
                  <input type="text" required value={formData.emergencyContact2Name} onChange={e => updateFormData('emergencyContact2Name', e.target.value)} className="w-full bg-transparent border-b border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors" placeholder="Name & Phone" />
                </div>
              </div>
            </div>

            <div className="border-t border-[#2A372F]/20 pt-6">
              <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                Authorized Pickup Persons *
              </label>
              <p className="text-xs text-[#2A372F]/60 mb-3">Note: Only individuals listed here may collect your child</p>
              <textarea required value={formData.authorizedPickupPersons} onChange={e => updateFormData('authorizedPickupPersons', e.target.value)} rows={3} className="w-full bg-transparent border border-[#2A372F]/40 px-3 py-3 text-sm text-[#2A372F] placeholder-[#2A372F]/60 focus:outline-none focus:border-[#2A372F] transition-colors resize-none" placeholder="List names and relationships of authorized pickup persons" />
            </div>

            <div className="border-t border-[#2A372F]/20 pt-6">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Section E: Document Uploads</h4>
              <p className="text-sm text-[#2A372F]/70 mb-6">Please upload clear scans or photos of the following:</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Child's Birth Certificate (Front page) *
                  </label>
                  <input type="file" multiple required onChange={e => handleFileUpload('birthCertificate', e.target.files)} className="w-full px-3 py-2 text-sm text-[#2A372F] border border-[#2A372F]/40 rounded focus:outline-none focus:border-[#2A372F] transition-colors" />
                  {formData.birthCertificate.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.birthCertificate.map((file, idx) => (
                        <div key={idx} className="text-xs text-[#2A372F]/70">
                          ✓ {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Child's Photograph (Clear headshot) *
                  </label>
                  <input type="file" multiple required onChange={e => handleFileUpload('childPhoto', e.target.files)} className="w-full px-3 py-2 text-sm text-[#2A372F] border border-[#2A372F]/40 rounded focus:outline-none focus:border-[#2A372F] transition-colors" />
                  {formData.childPhoto.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.childPhoto.map((file, idx) => (
                        <div key={idx} className="text-xs text-[#2A372F]/70">
                          ✓ {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Parents'/Guardians' NIC Copies *
                  </label>
                  <input type="file" multiple required onChange={e => handleFileUpload('parentNICs', e.target.files)} className="w-full px-3 py-2 text-sm text-[#2A372F] border border-[#2A372F]/40 rounded focus:outline-none focus:border-[#2A372F] transition-colors" />
                  {formData.parentNICs.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.parentNICs.map((file, idx) => (
                        <div key={idx} className="text-xs text-[#2A372F]/70">
                          ✓ {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                    Immunization Record *
                  </label>
                  <input type="file" multiple required onChange={e => handleFileUpload('immunizationRecord', e.target.files)} className="w-full px-3 py-2 text-sm text-[#2A372F] border border-[#2A372F]/40 rounded focus:outline-none focus:border-[#2A372F] transition-colors" />
                  {formData.immunizationRecord.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.immunizationRecord.map((file, idx) => (
                        <div key={idx} className="text-xs text-[#2A372F]/70">
                          ✓ {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>}

        {/* Step 5: Agreements & Terms */}
        {currentStep === 5 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Terms, Conditions & Agreements
              </h3>
            </div>

            {/* Payment Terms */}
            <div className="bg-[#2d5555]/5 border border-[#2d5555]/20 rounded-lg p-6 mb-6">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Payment Terms and Conditions</h4>
              <div className="space-y-3 text-sm text-[#2A372F]/80">
                <p><strong>Billing Cycle:</strong> Tuition fees are payable either Termly or Monthly.</p>
                <p><strong>Due Dates:</strong> Termly payments by the 2nd week of each term. Monthly payments by the 10th of each month.</p>
                <p><strong>Late Fees:</strong> Any fees not settled by the due date will incur a 10% surcharge per month until fully paid.</p>
                <p><strong>Grace Period:</strong> A 7-day grace period is provided from the due date before late fees apply.</p>
                <p><strong>Service Suspension:</strong> If fees remain unpaid 7 days after the "Final Notice" (issued 3 weeks from due date), the school reserves the right to suspend the child's attendance.</p>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="bg-[#2d5555]/5 border border-[#2d5555]/20 rounded-lg p-6 mb-6">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Refund Policy</h4>
              <div className="space-y-3 text-sm text-[#2A372F]/80">
                <p><strong>Admission Fee:</strong> The enrollment/admission fee is strictly non-refundable.</p>
                <p><strong>Withdrawal Before Term Start:</strong> A full refund of the term/monthly fee is provided (minus the admission fee).</p>
                <p><strong>Withdrawal Within First 2 Weeks:</strong> A 50% refund of the monthly fee is provided.</p>
                <p><strong>No Refunds:</strong> No refunds will be issued after the first two weeks of the term/month.</p>
                <p><strong>Activity/Field Trip Fees:</strong> Non-refundable unless canceled by the school.</p>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-4 border-t border-[#2A372F]/20 pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={e => updateFormData('termsAgreed', e.target.checked)}
                  required
                  className="w-5 h-5 mt-1 accent-[#2d5555]"
                />
                <span className="text-sm text-[#2A372F] leading-relaxed">
                  I have read and agree to the Terms and Conditions of Apple Tree Tots, including payment terms, refund policies, and all school procedures.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.medicalConsentAgreed}
                  onChange={e => updateFormData('medicalConsentAgreed', e.target.checked)}
                  required
                  className="w-5 h-5 mt-1 accent-[#2d5555]"
                />
                <span className="text-sm text-[#2A372F] leading-relaxed">
                  <strong>Medical Consent:</strong> In the event of a medical emergency, parents will be notified immediately, and the child will be taken to the closest medical hospital. I authorize the school to take appropriate emergency action if I cannot be reached.
                </span>
              </label>

              <div className="pt-4 text-xs text-[#2A372F]/70">
                <p><strong>Data Accuracy Disclaimer:</strong> I confirm that the information provided, including emergency contacts and immunization records, is accurate and up to date.</p>
              </div>
            </div>
          </div>}

        {/* Step 6: Payment Receipt Upload */}
        {currentStep === 6 && <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h3 className="text-2xl font-serif tracking-wide mb-6 text-[#2A372F]">
                Section F: Payment Receipt
              </h3>
              <p className="text-sm text-[#2A372F]/70 mb-4">
                Please upload a copy of your payment receipt to complete the admission process.
              </p>
            </div>

            <div className="bg-[#2d5555]/5 border border-[#2d5555]/20 rounded-lg p-6 mb-6">
              <h4 className="text-sm font-semibold text-[#2A372F] mb-4 uppercase">Admission Fee Payment</h4>
              <div className="space-y-3 text-sm text-[#2A372F]/80">
                <p><strong>Non-Refundable Admission Fee:</strong> A non-refundable admission fee is required at the time of enrollment. The amount varies based on the program level selected.</p>
                <p><strong>Payment Methods:</strong> Please make the payment and upload a clear scan or photo of the payment receipt.</p>
                <p><strong>Receipt Verification:</strong> Our admissions team will verify the payment receipt before finalizing your admission.</p>
              </div>
            </div>

            <div className="border-t border-[#2A372F]/20 pt-6">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 text-[#2A372F] font-semibold">
                  Payment Receipt *
                </label>
                <p className="text-xs text-[#2A372F]/60 mb-3">Upload a clear image or PDF of your payment receipt</p>
                <input
                  type="file"
                  multiple
                  required
                  onChange={e => handleFileUpload('paymentReceipt', e.target.files)}
                  className="w-full px-3 py-2 text-sm text-[#2A372F] border border-[#2A372F]/40 rounded focus:outline-none focus:border-[#2A372F] transition-colors"
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                />
                {formData.paymentReceipt.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-[#2A372F] uppercase">Uploaded Receipt:</p>
                    <div className="space-y-2">
                      {formData.paymentReceipt.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#2d5555]/5 p-3 rounded border border-[#2d5555]/20">
                          <span className="text-[#2d5555] text-lg">✓</span>
                          <div className="flex-1">
                            <p className="text-sm text-[#2A372F] font-medium">{file.name}</p>
                            <p className="text-xs text-[#2A372F]/60">{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#E77A6A]/10 border border-[#E77A6A]/30 rounded-lg p-6 mt-6">
              <p className="text-sm text-[#E77A6A] leading-relaxed">
                <strong>Important:</strong> Please ensure the payment receipt is clear and legible. This receipt will be used to verify your payment. Your application cannot be finalized without a valid payment receipt.
              </p>
            </div>
          </div>}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-[#2A372F]/40">
          {currentStep > 1 ? <button type="button" onClick={prevStep} className="text-xs uppercase tracking-widest text-[#2A372F]/60 hover:text-[#2A372F] transition-colors">
              ← Previous
            </button> : <div />}

          {currentStep < totalSteps ? <Button type="button" onClick={nextStep} variant="primary" className="flex items-center gap-2">
              Next Step
              <ChevronRight size={16} />
            </Button> : <Button type="submit" variant="primary">
              Review & Submit
            </Button>}
        </div>
      </form>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#CDD1CB] rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-[scaleIn_0.4s_ease-out]">
            {/* Success Content */}
            <div className="px-6 md:px-12 py-12">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-[#2d5555]/10 rounded-full flex items-center justify-center animate-[bounceIn_0.6s_ease-out]">
                  <Check size={40} className="text-[#2d5555]" strokeWidth={2.5} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-center mb-2 text-[#2A372F]">
                Application Submitted
              </h2>
              <p className="text-center text-[#2A372F]/70 font-light mb-8">
                Thank you for choosing Apple Tree Tots
              </p>

              {/* Child Name Highlight */}
              <div className="bg-white border-l-4 border-[#2d5555] rounded mb-8 p-6">
                <p className="text-xs uppercase tracking-widest text-[#2A372F]/60 mb-2 font-semibold">
                  Application Received For
                </p>
                <p className="text-2xl font-serif text-[#2d5555]">
                  {submittedApplicationData?.childFullName}
                </p>
              </div>

              {/* Key Information */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#2d5555]/5 rounded p-4">
                  <p className="text-xs uppercase tracking-widest text-[#2A372F]/60 font-semibold mb-2">Program</p>
                  <p className="text-sm text-[#2A372F] capitalize">
                    {submittedApplicationData?.programType} - {submittedApplicationData?.programLevel}
                  </p>
                </div>
                <div className="bg-[#2d5555]/5 rounded p-4">
                  <p className="text-xs uppercase tracking-widest text-[#2A372F]/60 font-semibold mb-2">Contact Email</p>
                  <p className="text-sm text-[#2A372F]">
                    {submittedApplicationData?.parent1Email}
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-[#2d5555]/10 rounded-lg p-6 mb-8 border border-[#2d5555]/20">
                <p className="text-sm uppercase tracking-widest text-[#2A372F] font-semibold mb-4">What Happens Next?</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#2d5555] font-bold mt-0.5">1</span>
                    <span className="text-sm text-[#2A372F] font-light">Our admissions team will review your application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2d5555] font-bold mt-0.5">2</span>
                    <span className="text-sm text-[#2A372F] font-light">We will contact you at the provided email and phone number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2d5555] font-bold mt-0.5">3</span>
                    <span className="text-sm text-[#2A372F] font-light">Confirmation will be sent within 2-3 business days</span>
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                {/* Download PDF Button */}
                <button
                  onClick={downloadApplicationData}
                  className="w-full bg-[#E77A6A] hover:bg-[#D66A5A] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download PDF Receipt
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowSuccessPopup(false);
                    setSubmittedApplicationData(null);
                    // Reset form
                    setFormData({
                      childFullName: '',
                      childDOB: '',
                      childGender: '',
                      childNationality: '',
                      homeAddress: '',
                      languageAtHome: '',
                      parent1Name: '',
                      parent1NIC: '',
                      parent1Mobile: '',
                      parent1Email: '',
                      parent2Name: '',
                      parent2NIC: '',
                      parent2Mobile: '',
                      programType: '',
                      programLevel: '',
                      immunizationUpToDate: false,
                      medicalConditions: '',
                      emergencyContact1Name: '',
                      emergencyContact1Phone: '',
                      emergencyContact2Name: '',
                      emergencyContact2Phone: '',
                      authorizedPickupPersons: '',
                      birthCertificate: [],
                      childPhoto: [],
                      parentNICs: [],
                      immunizationRecord: [],
                      paymentReceipt: [],
                      termsAgreed: false,
                      medicalConsentAgreed: false,
                    });
                    setCurrentStep(1);
                  }}
                  className="w-full bg-white border-2 border-[#2A372F]/20 text-[#2A372F] font-medium py-3 px-6 rounded-lg hover:bg-[#2A372F]/5 transition-all duration-300 uppercase text-xs tracking-widest"
                >
                  Submit Another Application
                </button>
              </div>

              <p className="text-xs text-[#2A372F]/60 text-center mt-6 font-light">
                A copy of your application data has been saved for download
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#CDD1CB] rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-6 text-[#2A372F]">
                Confirm Your <span className="italic opacity-80">Application</span>
              </h2>

              <div className="space-y-4 text-[#2A372F] mb-8">
                <div className="bg-[#2d5555]/10 border-l-4 border-[#2d5555] p-4 rounded">
                  <p className="text-sm font-light leading-relaxed">
                    <strong>Registration Fee:</strong> A non-refundable admission fee is required at the time of enrollment. The amount is determined based on the program level selected.
                  </p>
                </div>

                <div className="bg-[#2d5555]/10 border-l-4 border-[#2d5555] p-4 rounded">
                  <p className="text-sm font-light leading-relaxed">
                    <strong>Montessori Program:</strong> Monthly or Termly tuition fees apply based on your selected billing cycle.
                  </p>
                </div>

                <div className="bg-[#2d5555]/10 border-l-4 border-[#2d5555] p-4 rounded">
                  <p className="text-sm font-light leading-relaxed">
                    <strong>Additional Charges:</strong> School uniforms, late pickup fees, and activity fees may apply. Late pickup fees vary by program level.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#2A372F]/20 pt-6">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={formData.termsAgreed && formData.medicalConsentAgreed}
                    readOnly
                    className="w-5 h-5 mt-1 accent-[#2d5555]"
                  />
                  <span className="text-sm text-[#2A372F] leading-relaxed">
                    I acknowledge that I have reviewed all information, agree to the terms and conditions, and provide medical consent as outlined above.
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-8 justify-end">
                <button
                  onClick={() => {
                    setShowTermsPopup(false);
                    // Clear validation error when going back to upload documents
                    if (submitError) {
                      setSubmitError(null);
                    }
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm font-medium text-[#2A372F] border border-[#2A372F]/40 rounded hover:bg-[#2A372F]/5 transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!formData.termsAgreed || !formData.medicalConsentAgreed || isSubmitting}
                  className={`px-8 py-3 text-xs font-medium uppercase tracking-widest rounded transition-all duration-300 ${
                    formData.termsAgreed && formData.medicalConsentAgreed && !isSubmitting
                      ? 'bg-[#2A372F] text-[#CDD1CB] hover:bg-[#1a2720] cursor-pointer'
                      : 'bg-[#2A372F]/50 text-[#CDD1CB]/50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>;
}
