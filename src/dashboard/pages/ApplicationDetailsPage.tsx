import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Download, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { fetchApplicationById, updateApplication, deleteApplication } from '../../services/applicationApi';
import { uploadToSupabase } from '../../services/supabaseService';
import { DocumentCard } from '../components/DocumentCard';
import { generateApplicationPDF } from '../../services/pdfGenerator';

interface DocumentFile {
  fileName?: string;
  fileUrl?: string;
  uploadedAt?: string;
  filePath?: string;
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

export function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<Application | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadApplication();
    }
  }, [id]);

  const loadApplication = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const response = await fetchApplicationById(id);
      console.log('Application data received:', response.data);
      console.log('Documents:', response.data?.documents);
      setApplication(response.data);
      setFormData(response.data);
    } catch (err) {
      console.error('Error loading application:', err);
      alert('Failed to load application');
      navigate('/admin/applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof Application, value: any) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!formData || !id) return;
    try {
      setIsSaving(true);
      await updateApplication(id, formData);
      setApplication(formData);
      setIsEditing(false);
      alert('Application updated successfully');
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Failed to save application');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }
    try {
      setIsDeleting(true);
      await deleteApplication(id);
      alert('Application deleted successfully');
      navigate('/admin/applications');
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
    } finally {
      setIsDeleting(false);
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
    const data = isEditing ? formData : application;
    if (!data) return null;

    let doc: any = null;

    // 1. Check in documents object (primary location)
    if (data.documents && typeof data.documents === 'object') {
      doc = (data.documents as any)[docType];
      if (doc && (doc.fileUrl || doc.url)) {
        console.log(`Found ${docType} in documents:`, doc);
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
        console.log(`Found ${docType} in uploadedDocuments:`, doc);
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
      // If it's an array
      if (Array.isArray(rootDoc) && rootDoc.length > 0) {
        const first = rootDoc[0];
        if (first && (first.url || first.fileUrl)) {
          doc = {
            fileUrl: first.url || first.fileUrl,
            fileName: first.fileName || first.name || (first.url || first.fileUrl)?.split('/').pop(),
            uploadedAt: first.uploadedAt || first.createdAt,
            size: first.size,
            filePath: first.path || first.filePath
          };
          console.log(`Found ${docType} in root (array):`, doc);
          return doc;
        }
      }
      // If it's an object
      else if (typeof rootDoc === 'object' && rootDoc !== null) {
        if (rootDoc.fileUrl || rootDoc.url) {
          doc = {
            fileUrl: rootDoc.fileUrl || rootDoc.url,
            fileName: rootDoc.fileName || rootDoc.name || (rootDoc.fileUrl || rootDoc.url)?.split('/').pop(),
            uploadedAt: rootDoc.uploadedAt || rootDoc.createdAt,
            size: rootDoc.size,
            filePath: rootDoc.path || rootDoc.filePath
          };
          console.log(`Found ${docType} in root (object):`, doc);
          return doc;
        }
      }
    }

    console.log(`No document found for ${docType}`);
    return null;
  };

  const hasImages = !!(
    getDocument('childPhoto') ||
    getDocument('birthCertificate') ||
    getDocument('parentNICs')
  );

  const hasDocs = !!(
    getDocument('immunizationRecord') ||
    getDocument('paymentReceipt')
  );

  const displayData = isEditing ? formData : application;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a3a3a] text-white flex items-center justify-center">
        <p className="text-white/60">Loading application...</p>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="min-h-screen bg-[#1a3a3a] text-white flex items-center justify-center">
        <p className="text-white/60">Application not found</p>
      </div>
    );
  }

  const childName = displayData.childFullName || displayData.childName || 'N/A';
  const parentName = displayData.parent1Name || displayData.parentName || 'N/A';
  const email = displayData.parent1Email || displayData.email || 'N/A';
  const phone = displayData.parent1Mobile || displayData.phone || 'N/A';
  const program = displayData.programType || displayData.program || 'N/A';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-300';
      case 'rejected':
        return 'bg-red-500/20 text-red-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white px-4 py-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/applications')}
              className="p-2 hover:bg-white/10 rounded transition"
              title="Back to applications"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-serif text-white">{childName}</h1>
              <p className="text-sm text-white/60 mt-1">Application Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <button
                  onClick={() => generateApplicationPDF(displayData)}
                  className="p-2 hover:bg-white/10 rounded transition"
                  title="Download PDF"
                >
                  <Download size={20} className="text-white/70" />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-white/10 rounded transition"
                  title="Edit application"
                >
                  <Edit2 size={20} className="text-white/70" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 hover:bg-red-500/20 rounded transition disabled:opacity-50"
                  title="Delete application"
                >
                  <Trash2 size={20} className={isDeleting ? 'text-gray-400' : 'text-red-400'} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            {isEditing ? (
              <select
                value={formData?.status || 'pending'}
                onChange={(e) => handleChange('status', e.target.value as any)}
                className={`px-4 py-2 rounded capitalize text-sm font-semibold bg-transparent border cursor-pointer transition ${getStatusColor(formData?.status || 'pending')}`}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            ) : (
              <span className={`px-4 py-2 rounded capitalize text-sm font-semibold ${getStatusColor(displayData.status)}`}>
                {displayData.status}
              </span>
            )}
            <p className="text-xs text-white/60">
              Submitted {new Date(displayData.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Child Information */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
              Child Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.childFullName || formData?.childName || ''}
                    onChange={(e) => handleChange('childFullName', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{childName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData?.childDOB ? formData.childDOB.split('T')[0] : ''}
                    onChange={(e) => handleChange('childDOB', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">
                    {displayData.childDOB ? new Date(displayData.childDOB).toLocaleDateString() : 'N/A'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={formData?.childGender?.toLowerCase() || ''}
                    onChange={(e) => handleChange('childGender', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-white">{displayData.childGender || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Nationality</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.childNationality || ''}
                    onChange={(e) => handleChange('childNationality', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.childNationality || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Home Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.homeAddress || ''}
                    onChange={(e) => handleChange('homeAddress', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.homeAddress || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Language at Home</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.languageAtHome || ''}
                    onChange={(e) => handleChange('languageAtHome', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.languageAtHome || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
              Guardian Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.parent1Name || formData?.parentName || ''}
                    onChange={(e) => handleChange('parent1Name', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{parentName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">NIC/ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.parent1NIC || ''}
                    onChange={(e) => handleChange('parent1NIC', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.parent1NIC || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData?.parent1Email || formData?.email || ''}
                    onChange={(e) => handleChange('parent1Email', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white break-all">{email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Mobile</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData?.parent1Mobile || formData?.phone || ''}
                    onChange={(e) => handleChange('parent1Mobile', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
              Program Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Program Type</label>
                {isEditing ? (
                  <select
                    value={formData?.programType || formData?.program || ''}
                    onChange={(e) => handleChange('programType', e.target.value)}
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
                <label className="block text-xs uppercase text-white/70 mb-2">Program Level</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.programLevel || ''}
                    onChange={(e) => handleChange('programLevel', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.programLevel || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical & Emergency Information */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
              Medical & Emergency Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Immunization Up to Date</label>
                {isEditing ? (
                  <select
                    value={formData?.immunizationUpToDate ? 'yes' : 'no'}
                    onChange={(e) => handleChange('immunizationUpToDate', e.target.value === 'yes')}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                ) : (
                  <p className="text-white">{displayData.immunizationUpToDate ? 'Yes' : 'No'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Medical Conditions</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.medicalConditions || ''}
                    onChange={(e) => handleChange('medicalConditions', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.medicalConditions || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Emergency Contact 1 Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.emergencyContact1Name || ''}
                    onChange={(e) => handleChange('emergencyContact1Name', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.emergencyContact1Name || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Emergency Contact 1 Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData?.emergencyContact1Phone || ''}
                    onChange={(e) => handleChange('emergencyContact1Phone', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.emergencyContact1Phone || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Emergency Contact 2 Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.emergencyContact2Name || ''}
                    onChange={(e) => handleChange('emergencyContact2Name', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.emergencyContact2Name || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase text-white/70 mb-2">Emergency Contact 2 Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData?.emergencyContact2Phone || ''}
                    onChange={(e) => handleChange('emergencyContact2Phone', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm"
                  />
                ) : (
                  <p className="text-white">{displayData.emergencyContact2Phone || 'N/A'}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase text-white/70 mb-2">Authorized Pickup Persons</label>
                {isEditing ? (
                  <textarea
                    value={formData?.authorizedPickupPersons || ''}
                    onChange={(e) => handleChange('authorizedPickupPersons', e.target.value)}
                    className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm h-20 resize-none"
                  />
                ) : (
                  <p className="text-white whitespace-pre-wrap">{displayData.authorizedPickupPersons || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Uploaded Images */}
          {(hasImages || isEditing) && (
            <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
                Uploaded Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard
                  label="Child Photo"
                  icon="📷"
                  document={getDocument('childPhoto')}
                  docType="childPhoto"
                  mode={isEditing ? 'edit' : 'view'}
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
                  mode={isEditing ? 'edit' : 'view'}
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
                  mode={isEditing ? 'edit' : 'view'}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'parentNICs'}
                />
              </div>
            </div>
          )}

          {/* Uploaded Documents */}
          {(hasDocs || isEditing) && (
            <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
                Uploaded Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard
                  label="Immunization Record"
                  icon="💉"
                  document={getDocument('immunizationRecord')}
                  docType="immunizationRecord"
                  mode={isEditing ? 'edit' : 'view'}
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
                  mode={isEditing ? 'edit' : 'view'}
                  onImageClick={setLightboxImage}
                  onDownload={downloadDocument}
                  onUpload={handleDocumentUpload}
                  isUploading={uploadingDocument === 'paymentReceipt'}
                />
              </div>
            </div>
          )}

          {/* Notes */}
          {isEditing && (
            <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
                Notes
              </h2>
              <textarea
                value={formData?.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full bg-[#2d5555]/30 border border-white/20 rounded px-3 py-2 text-white text-sm h-24 resize-none"
                placeholder="Add notes about this application..."
              />
            </div>
          )}

          {displayData.notes && !isEditing && (
            <div className="bg-[#2d5555]/10 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
                Notes
              </h2>
              <p className="text-white whitespace-pre-wrap">{displayData.notes}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {isEditing && (
          <div className="flex gap-3 mt-8 pb-8">
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData(application);
              }}
              className="px-6 py-3 rounded border border-white/20 text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
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
    </div>
  );
}
