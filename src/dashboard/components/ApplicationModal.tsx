import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { fetchApplicationById } from '../../services/applicationApi';

interface DocumentFile {
  fileName?: string;
  fileUrl?: string;
  uploadedAt?: string;
  name?: string;
  size?: number;
}

interface Documents {
  birthCertificate?: DocumentFile;
  childPhoto?: DocumentFile;
  parentNICs?: DocumentFile;
  immunizationRecord?: DocumentFile;
}

interface Application {
  _id: string;
  childFullName?: string;
  childName?: string;
  parentName?: string;
  parent1Name?: string;
  email?: string;
  parent1Email?: string;
  phone?: string;
  parent1Mobile?: string;
  program?: string;
  programType?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
  childDOB?: string;
  childGender?: string;
  childNationality?: string;
  homeAddress?: string;
  languageAtHome?: string;
  parent1NIC?: string;
  parent2Name?: string;
  parent2NIC?: string;
  parent2Mobile?: string;
  programLevel?: string;
  immunizationUpToDate?: boolean;
  medicalConditions?: string;
  emergencyContact1Name?: string;
  emergencyContact1Phone?: string;
  emergencyContact2Name?: string;
  emergencyContact2Phone?: string;
  authorizedPickupPersons?: string;
  termsAgreed?: boolean;
  medicalConsentAgreed?: boolean;
  submittedBy?: string;
  documents?: Documents;
  uploadedDocuments?: Documents;
}

interface ApplicationModalProps {
  isOpen: boolean;
  application: Application | null;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSave?: (application: Application) => Promise<void>;
}

export function ApplicationModal({
  isOpen,
  application,
  mode,
  onClose,
  onSave,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<Application | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (application && isOpen) {
      setIsLoading(true);
      // Fetch full application data to get documents
      fetchApplicationById(application._id)
        .then(response => {
          setFormData(response.data || application);
        })
        .catch(err => {
          console.error('Error fetching application:', err);
          setFormData(application);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [application, isOpen]);

  if (!isOpen || !formData) {
    return null;
  }

  const handleChange = (field: keyof Application, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (onSave && formData) {
      try {
        setIsSaving(true);
        await onSave(formData);
        onClose();
      } catch (error) {
        console.error('Error saving application:', error);
        alert('Failed to save application');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const childName = formData.childFullName || formData.childName || 'N/A';
  const parentName = formData.parent1Name || formData.parentName || 'N/A';
  const email = formData.parent1Email || formData.email || 'N/A';
  const phone = formData.parent1Mobile || formData.phone || 'N/A';
  const program = formData.programType || formData.program || 'N/A';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a3a3a] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="sticky top-0 bg-[#2d5555]/20 border-b border-white/10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-white">
            {mode === 'view' ? 'View Application' : 'Edit Application'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Child Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Child Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Full Name
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.childFullName || formData.childName || ''}
                    onChange={(e) =>
                      handleChange('childFullName', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{childName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Date of Birth
                </label>
                {mode === 'edit' ? (
                  <input
                    type="date"
                    value={formData.childDOB ? formData.childDOB.split('T')[0] : ''}
                    onChange={(e) => handleChange('childDOB', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">
                    {formData.childDOB ? new Date(formData.childDOB).toLocaleDateString() : 'N/A'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Gender
                </label>
                {mode === 'edit' ? (
                  <select
                    value={formData.childGender || ''}
                    onChange={(e) => handleChange('childGender', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-white">{formData.childGender || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Nationality
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.childNationality || ''}
                    onChange={(e) => handleChange('childNationality', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{formData.childNationality || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Guardian Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Name
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.parent1Name || formData.parentName || ''}
                    onChange={(e) => handleChange('parent1Name', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{parentName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  NIC/ID
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.parent1NIC || ''}
                    onChange={(e) => handleChange('parent1NIC', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{formData.parent1NIC || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Email
                </label>
                {mode === 'edit' ? (
                  <input
                    type="email"
                    value={formData.parent1Email || formData.email || ''}
                    onChange={(e) =>
                      handleChange('parent1Email', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Mobile
                </label>
                {mode === 'edit' ? (
                  <input
                    type="tel"
                    value={formData.parent1Mobile || formData.phone || ''}
                    onChange={(e) =>
                      handleChange('parent1Mobile', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Program
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Program Type
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.programType || formData.program || ''}
                    onChange={(e) =>
                      handleChange('programType', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{program}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Program Level
                </label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    value={formData.programLevel || ''}
                    onChange={(e) =>
                      handleChange('programLevel', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{formData.programLevel || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status & Notes */}
          {mode === 'edit' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Status & Notes
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs uppercase text-white/70 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleChange('status', e.target.value as any)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm h-24 resize-none"
                  placeholder="Add notes about this application..."
                />
              </div>
            </div>
          )}

          {/* Documents Section */}
          {(formData.documents || formData.uploadedDocuments) && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Birth Certificate */}
                {(formData.documents?.birthCertificate || formData.uploadedDocuments?.birthCertificate) && (
                  <div className="border border-white/10 rounded p-4 bg-[#2d5555]/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Birth Certificate</h4>
                    {formData.documents?.birthCertificate?.fileUrl && (
                      <>
                        {formData.documents.birthCertificate.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img
                            src={formData.documents.birthCertificate.fileUrl}
                            alt="Birth Certificate"
                            className="w-full h-48 object-cover rounded mb-3"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <a
                          href={formData.documents.birthCertificate.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          <Download size={14} />
                          {formData.documents.birthCertificate.fileName || 'Download'}
                        </a>
                      </>
                    )}
                    {formData.uploadedDocuments?.birthCertificate && !formData.documents?.birthCertificate?.fileUrl && (
                      <p className="text-white/60 text-sm">
                        {formData.uploadedDocuments.birthCertificate.name || 'Birth Certificate uploaded'}
                      </p>
                    )}
                  </div>
                )}

                {/* Child Photo */}
                {(formData.documents?.childPhoto || formData.uploadedDocuments?.childPhoto) && (
                  <div className="border border-white/10 rounded p-4 bg-[#2d5555]/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Child Photo</h4>
                    {formData.documents?.childPhoto?.fileUrl && (
                      <>
                        {formData.documents.childPhoto.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img
                            src={formData.documents.childPhoto.fileUrl}
                            alt="Child Photo"
                            className="w-full h-48 object-cover rounded mb-3"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <a
                          href={formData.documents.childPhoto.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          <Download size={14} />
                          {formData.documents.childPhoto.fileName || 'Download'}
                        </a>
                      </>
                    )}
                    {formData.uploadedDocuments?.childPhoto && !formData.documents?.childPhoto?.fileUrl && (
                      <p className="text-white/60 text-sm">
                        {formData.uploadedDocuments.childPhoto.name || 'Photo uploaded'}
                      </p>
                    )}
                  </div>
                )}

                {/* Parent NICs */}
                {(formData.documents?.parentNICs || formData.uploadedDocuments?.parentNICs) && (
                  <div className="border border-white/10 rounded p-4 bg-[#2d5555]/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Parent NICs</h4>
                    {formData.documents?.parentNICs?.fileUrl && (
                      <>
                        {formData.documents.parentNICs.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img
                            src={formData.documents.parentNICs.fileUrl}
                            alt="Parent NICs"
                            className="w-full h-48 object-cover rounded mb-3"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <a
                          href={formData.documents.parentNICs.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          <Download size={14} />
                          {formData.documents.parentNICs.fileName || 'Download'}
                        </a>
                      </>
                    )}
                    {formData.uploadedDocuments?.parentNICs && !formData.documents?.parentNICs?.fileUrl && (
                      <p className="text-white/60 text-sm">
                        {formData.uploadedDocuments.parentNICs.name || 'NIC uploaded'}
                      </p>
                    )}
                  </div>
                )}

                {/* Immunization Record */}
                {(formData.documents?.immunizationRecord || formData.uploadedDocuments?.immunizationRecord) && (
                  <div className="border border-white/10 rounded p-4 bg-[#2d5555]/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Immunization Record</h4>
                    {formData.documents?.immunizationRecord?.fileUrl && (
                      <>
                        {formData.documents.immunizationRecord.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img
                            src={formData.documents.immunizationRecord.fileUrl}
                            alt="Immunization Record"
                            className="w-full h-48 object-cover rounded mb-3"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <a
                          href={formData.documents.immunizationRecord.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          <Download size={14} />
                          {formData.documents.immunizationRecord.fileName || 'Download'}
                        </a>
                      </>
                    )}
                    {formData.uploadedDocuments?.immunizationRecord && !formData.documents?.immunizationRecord?.fileUrl && (
                      <p className="text-white/60 text-sm">
                        {formData.uploadedDocuments.immunizationRecord.name || 'Record uploaded'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#2d5555]/20 border-t border-white/10 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition"
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </button>
          {mode === 'edit' && (
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
