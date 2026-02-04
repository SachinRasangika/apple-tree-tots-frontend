const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApplicationData {
  id?: string;
  childName: string;
  childAge?: number;
  parentName: string;
  email: string;
  phone: string;
  program: string;
  startDate?: string;
  specialNeeds?: string;
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
  submissionDate?: string;
}

// Get all applications
export const fetchApplications = async (status?: string, search?: string) => {
  try {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const queryString = params.toString();
    const url = queryString ? `${API_BASE_URL}/applications?${queryString}` : `${API_BASE_URL}/applications`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

// Get single application
export const fetchApplicationById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);
    if (!response.ok) throw new Error('Failed to fetch application');
    return await response.json();
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
};

// Create new application (simple JSON submission)
export const createApplication = async (data: ApplicationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

// Create application from website form (handles comprehensive form data with file uploads)
export const submitWebsiteApplication = async (formData: any) => {
  try {
    // Validate required fields before submission
    const requiredFields = {
      childFullName: 'Child Full Name',
      parent1Name: 'Parent Name',
      parent1Email: 'Parent Email',
      parent1Mobile: 'Parent Mobile',
      programType: 'Program Type',
    };

    const missingFields: string[] = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      throw new Error(`Please fill in: ${missingFields.join(', ')}`);
    }

    // Validate file uploads
    const fileFields = {
      birthCertificate: 'Birth Certificate',
      childPhoto: 'Child Photo',
      parentNICs: 'Parent NICs',
      immunizationRecord: 'Immunization Record',
      paymentReceipt: 'Payment Receipt',
    };

    const missingFiles: string[] = [];
    for (const [field, label] of Object.entries(fileFields)) {
      if (!formData[field] || formData[field].length === 0) {
        missingFiles.push(label);
      }
    }

    if (missingFiles.length > 0) {
      throw new Error(`Please upload: ${missingFiles.join(', ')}`);
    }

    // Create FormData object to handle file uploads
    const form = new FormData();

    // Add all form fields
    form.append('childFullName', formData.childFullName);
    form.append('childDOB', formData.childDOB || '');
    form.append('childGender', formData.childGender || '');
    form.append('childNationality', formData.childNationality || '');
    form.append('homeAddress', formData.homeAddress || '');
    form.append('languageAtHome', formData.languageAtHome || '');

    // Parent/Guardian 1
    form.append('parent1Name', formData.parent1Name);
    form.append('parent1NIC', formData.parent1NIC || '');
    form.append('parent1Mobile', formData.parent1Mobile);
    form.append('parent1Email', formData.parent1Email);

    // Parent/Guardian 2
    form.append('parent2Name', formData.parent2Name || '');
    form.append('parent2NIC', formData.parent2NIC || '');
    form.append('parent2Mobile', formData.parent2Mobile || '');

    // Program
    form.append('programType', formData.programType);
    form.append('programLevel', formData.programLevel || '');

    // Medical & Emergency
    form.append('immunizationUpToDate', String(formData.immunizationUpToDate));
    form.append('medicalConditions', formData.medicalConditions || '');
    form.append('emergencyContact1Name', formData.emergencyContact1Name || '');
    form.append('emergencyContact1Phone', formData.emergencyContact1Phone || '');
    form.append('emergencyContact2Name', formData.emergencyContact2Name || '');
    form.append('emergencyContact2Phone', formData.emergencyContact2Phone || '');
    form.append('authorizedPickupPersons', formData.authorizedPickupPersons || '');

    // Agreements
    form.append('termsAgreed', String(formData.termsAgreed));
    form.append('medicalConsentAgreed', String(formData.medicalConsentAgreed));

    // Submission source
    form.append('submittedBy', formData.submittedBy || 'website');

    // Add files
    if (formData.birthCertificate && formData.birthCertificate.length > 0) {
      form.append('birthCertificate', formData.birthCertificate[0]);
    }
    if (formData.childPhoto && formData.childPhoto.length > 0) {
      form.append('childPhoto', formData.childPhoto[0]);
    }
    if (formData.parentNICs && formData.parentNICs.length > 0) {
      form.append('parentNICs', formData.parentNICs[0]);
    }
    if (formData.immunizationRecord && formData.immunizationRecord.length > 0) {
      form.append('immunizationRecord', formData.immunizationRecord[0]);
    }
    if (formData.paymentReceipt && formData.paymentReceipt.length > 0) {
      form.append('paymentReceipt', formData.paymentReceipt[0]);
    }

    console.log('Submitting application with fields:', {
      childFullName: form.get('childFullName'),
      parent1Name: form.get('parent1Name'),
      parent1Email: form.get('parent1Email'),
      parent1Mobile: form.get('parent1Mobile'),
      programType: form.get('programType'),
    });

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      body: form,
      // Note: Don't set Content-Type header - browser will set it with multipart/form-data boundary
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.message || `Failed to submit application (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting website application:', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (id: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, notes }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

// Delete application
export const deleteApplication = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete application');
    return await response.json();
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

// Get applications statistics
export const fetchApplicationStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/stats/summary`);
    if (!response.ok) throw new Error('Failed to fetch statistics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
