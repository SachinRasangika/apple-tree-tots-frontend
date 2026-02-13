import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { fetchApplicationById } from '../../services/applicationApi';
import { uploadToSupabase } from '../../services/supabaseService';
import { DocumentCard } from './DocumentCard';

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
  paymentReceipt?: DocumentFile;
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);

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

  const handleDocumentUpload = async (docType: string, file: File) => {
    if (!formData) return;

    try {
      setUploadingDocument(docType);
      const bucket = docType === 'childPhoto' ? 'images' : 'documents';

      const result = await uploadToSupabase({
        bucket,
        file,
        folder: docType,
      });

      if (result.success && result.url) {
        const updatedDocuments = formData.documents || {};
        updatedDocuments[docType as keyof Documents] = {
          fileName: file.name,
          fileUrl: result.url,
          filePath: result.path,
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        setFormData({
          ...formData,
          documents: updatedDocuments,
        });

        alert('Document updated successfully');
      } else {
        alert(`Failed to upload document: ${result.error}`);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    } finally {
      setUploadingDocument(null);
    }
  };

  const downloadDocument = (fileUrl: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getDocument = (docType: keyof Documents | string) => {
    const data = formData;
    if (!data) return null;

    let doc: any = null;

    // 1. Check in documents object (primary location)
    if (data.documents && typeof data.documents === 'object') {
      doc = (data.documents as any)[docType];
      if (doc && (doc.fileUrl || doc.url)) {
        return {
          ...doc,
          fileUrl: doc.fileUrl || doc.url,
          fileName: doc.fileName || doc.name || (doc.fileUrl || doc.url)?.split('/').pop()
        };
      }
    }

    // 2. Check in uploadedDocuments object (secondary location)
    if ((data as any).uploadedDocuments && typeof (data as any).uploadedDocuments === 'object') {
      doc = (data as any).uploadedDocuments[docType];
      if (doc && (doc.fileUrl || doc.url)) {
        return {
          ...doc,
          fileUrl: doc.fileUrl || doc.url,
          fileName: doc.fileName || doc.name || (doc.fileUrl || doc.url)?.split('/').pop()
        };
      }
    }

    // 3. Check at root level (backward compatibility)
    const rootDoc = (data as any)[docType];
    if (rootDoc) {
      if (Array.isArray(rootDoc) && rootDoc.length > 0) {
        const first = rootDoc[0];
        if (first && (first.url || first.fileUrl)) {
          return {
            fileUrl: first.url || first.fileUrl,
            fileName: first.fileName || first.name || (first.url || first.fileUrl)?.split('/').pop(),
            uploadedAt: first.uploadedAt || first.createdAt,
            size: first.size,
            filePath: first.path || first.filePath
          };
        }
      } else if (typeof rootDoc === 'object' && rootDoc !== null) {
        if (rootDoc.fileUrl || rootDoc.url) {
          return {
            fileUrl: rootDoc.fileUrl || rootDoc.url,
            fileName: rootDoc.fileName || rootDoc.name || (rootDoc.fileUrl || rootDoc.url)?.split('/').pop(),
            uploadedAt: rootDoc.uploadedAt || rootDoc.createdAt,
            size: rootDoc.size,
            filePath: rootDoc.path || rootDoc.filePath
          };
        }
      }
    }

    return null;
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
                    value={formData.childGender?.toLowerCase() || ''}
                    onChange={(e) => handleChange('childGender', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                  <select
                    value={formData.programType || formData.program || ''}
                    onChange={(e) =>
                      handleChange('programType', e.target.value)
                    }
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="">Select Program</option>
                    <option value="toddler">Toddler</option>
                    <option value="casa">CASA</option>
                    <option value="preschool">Preschool</option>
                  </select>
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

          {/* Images Section */}
          {(getDocument('childPhoto') || getDocument('birthCertificate') || getDocument('parentNICs') || mode === 'edit') && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Uploaded Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard
                  label="Child Photo"
                  icon="📷"
                  document={getDocument('childPhoto')}
                  docType="childPhoto"
                  mode={mode}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'childPhoto'}
                />
                <DocumentCard
                  label="Birth Certificate"
                  icon="📄"
                  document={getDocument('birthCertificate')}
                  docType="birthCertificate"
                  mode={mode}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'birthCertificate'}
                />
                <DocumentCard
                  label="Parent NICs"
                  icon="🆔"
                  document={getDocument('parentNICs')}
                  docType="parentNICs"
                  mode={mode}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'parentNICs'}
                />
              </div>
            </div>
          )}

          {/* Documents Section */}
          {(getDocument('immunizationRecord') || getDocument('paymentReceipt') || mode === 'edit') && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard
                  label="Immunization Record"
                  icon="💉"
                  document={getDocument('immunizationRecord')}
                  docType="immunizationRecord"
                  mode={mode}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'immunizationRecord'}
                />
                <DocumentCard
                  label="Payment Receipt"
                  icon="💳"
                  document={getDocument('paymentReceipt')}
                  docType="paymentReceipt"
                  mode={mode}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'paymentReceipt'}
                />
              </div>
            </div>
          )}

          {/* Lightbox Modal */}
          {lightboxImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <div className="max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="p-2 hover:bg-white/10 rounded transition"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
                <img
                  src={lightboxImage}
                  alt="Document Preview"
                  className="w-full h-auto max-h-[80vh] object-contain rounded"
                />
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
