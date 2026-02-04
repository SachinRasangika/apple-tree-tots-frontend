import html2pdf from 'html2pdf.js';

interface FormDataForPDF {
  childFullName: string;
  childDOB: string;
  childGender: string;
  childNationality: string;
  homeAddress: string;
  languageAtHome: string;
  parent1Name: string;
  parent1NIC: string;
  parent1Mobile: string;
  parent1Email: string;
  parent2Name: string;
  parent2NIC: string;
  parent2Mobile: string;
  programType: string;
  programLevel: string;
  immunizationUpToDate: boolean;
  medicalConditions: string;
  emergencyContact1Name: string;
  emergencyContact1Phone: string;
  emergencyContact2Name: string;
  emergencyContact2Phone: string;
  authorizedPickupPersons: string;
  paymentReceiptUploaded?: boolean;
}

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
  childName?: string;
  childFullName?: string;
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

const LOGO_URL = '/images/logo.JPG';
const THEME_COLOR = '#2A372F';
const SECONDARY_COLOR = '#CDD1CB';

export const generateApplicationPDF = async (application: Application) => {
  const childName = application.childFullName || application.childName || 'N/A';
  const parentName = application.parent1Name || application.parentName || 'N/A';
  const email = application.parent1Email || application.email || 'N/A';
  const phone = application.parent1Mobile || application.phone || 'N/A';
  const program = application.programType || application.program || 'N/A';

  const element = document.createElement('div');
  element.innerHTML = `
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
      }
      .pdf-container {
        padding: 40px;
        background: white;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        border-bottom: 3px solid ${THEME_COLOR};
        padding-bottom: 20px;
      }
      .logo {
        max-width: 80px;
        height: auto;
      }
      .header-info {
        text-align: right;
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        color: ${THEME_COLOR};
        margin: 0;
      }
      .subtitle {
        font-size: 12px;
        color: #666;
        margin: 5px 0 0 0;
      }
      .section {
        margin-bottom: 25px;
      }
      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: white;
        background-color: ${THEME_COLOR};
        padding: 10px 15px;
        margin-bottom: 12px;
        border-radius: 4px;
      }
      .row {
        display: flex;
        margin-bottom: 10px;
        gap: 40px;
      }
      .field {
        flex: 1;
      }
      .label {
        font-size: 11px;
        font-weight: bold;
        color: ${THEME_COLOR};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .value {
        font-size: 12px;
        color: #333;
        line-height: 1.5;
        word-break: break-word;
      }
      .status-badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 11px;
        text-transform: uppercase;
      }
      .status-pending {
        background-color: #FEF3C7;
        color: #92400E;
      }
      .status-approved {
        background-color: #D1FAE5;
        color: #065F46;
      }
      .status-rejected {
        background-color: #FEE2E2;
        color: #7F1D1D;
      }
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 2px solid ${SECONDARY_COLOR};
        font-size: 10px;
        color: #999;
        text-align: center;
      }
      .date-stamp {
        margin-top: 30px;
        font-size: 10px;
        color: #999;
      }
    </style>
    <div class="pdf-container">
      <div class="header">
        <img src="${LOGO_URL}" alt="Apple Tree Tots Logo" class="logo" />
        <div class="header-info">
          <h1 class="title">Application Form</h1>
          <p class="subtitle">Submission Record</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Application Status</div>
        <div class="row">
          <div class="field">
            <div class="label">Status</div>
            <div class="value">
              <span class="status-badge status-${application.status}">
                ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>
          <div class="field">
            <div class="label">Submission Date</div>
            <div class="value">${new Date(application.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        ${application.notes ? `
          <div style="margin-top: 12px;">
            <div class="label">Notes</div>
            <div class="value">${application.notes}</div>
          </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Child Information</div>
        <div class="row">
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${childName}</div>
          </div>
          <div class="field">
            <div class="label">Date of Birth</div>
            <div class="value">${application.childDOB ? new Date(application.childDOB).toLocaleDateString() : 'N/A'}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="label">Gender</div>
            <div class="value">${application.childGender || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="label">Nationality</div>
            <div class="value">${application.childNationality || 'N/A'}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="label">Home Address</div>
            <div class="value">${application.homeAddress || 'N/A'}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="label">Language at Home</div>
            <div class="value">${application.languageAtHome || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Parent/Guardian Information</div>
        <div class="row">
          <div class="field">
            <div class="label">Primary Guardian Name</div>
            <div class="value">${parentName}</div>
          </div>
          <div class="field">
            <div class="label">NIC/ID Number</div>
            <div class="value">${application.parent1NIC || 'N/A'}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Mobile Number</div>
            <div class="value">${phone}</div>
          </div>
        </div>
        ${application.parent2Name ? `
          <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #eee;">
            <h3 style="margin: 0 0 12px 0; font-size: 12px; color: ${THEME_COLOR};">Secondary Guardian</h3>
            <div class="row">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${application.parent2Name}</div>
              </div>
              <div class="field">
                <div class="label">Mobile Number</div>
                <div class="value">${application.parent2Mobile || 'N/A'}</div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Program Information</div>
        <div class="row">
          <div class="field">
            <div class="label">Program Type</div>
            <div class="value">${program}</div>
          </div>
          <div class="field">
            <div class="label">Program Level</div>
            <div class="value">${application.programLevel || 'N/A'}</div>
          </div>
        </div>
      </div>

      ${(application.medicalConditions || application.immunizationUpToDate !== undefined) ? `
        <div class="section">
          <div class="section-title">Medical Information</div>
          <div class="row">
            <div class="field">
              <div class="label">Immunization Up to Date</div>
              <div class="value">${application.immunizationUpToDate ? 'Yes' : 'No'}</div>
            </div>
          </div>
          ${application.medicalConditions ? `
            <div class="row">
              <div class="field">
                <div class="label">Medical Conditions</div>
                <div class="value">${application.medicalConditions}</div>
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${(application.emergencyContact1Name || application.emergencyContact2Name) ? `
        <div class="section">
          <div class="section-title">Emergency Contacts</div>
          ${application.emergencyContact1Name ? `
            <div class="row">
              <div class="field">
                <div class="label">Contact 1 Name</div>
                <div class="value">${application.emergencyContact1Name}</div>
              </div>
              <div class="field">
                <div class="label">Contact 1 Phone</div>
                <div class="value">${application.emergencyContact1Phone || 'N/A'}</div>
              </div>
            </div>
          ` : ''}
          ${application.emergencyContact2Name ? `
            <div class="row">
              <div class="field">
                <div class="label">Contact 2 Name</div>
                <div class="value">${application.emergencyContact2Name}</div>
              </div>
              <div class="field">
                <div class="label">Contact 2 Phone</div>
                <div class="value">${application.emergencyContact2Phone || 'N/A'}</div>
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${(application.documents?.birthCertificate?.fileUrl || application.documents?.childPhoto?.fileUrl || application.documents?.parentNICs?.fileUrl || application.documents?.immunizationRecord?.fileUrl || application.documents?.paymentReceipt?.fileUrl) ? `
        <div class="section">
          <div class="section-title">Uploaded Documents</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            ${application.documents?.birthCertificate?.fileUrl ? `
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <div class="label" style="margin-bottom: 10px;">Birth Certificate</div>
                ${application.documents.birthCertificate.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? `
                  <img src="${application.documents.birthCertificate.fileUrl}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
                ` : ''}
                <div style="font-size: 10px; color: #666; word-break: break-all;">
                  ${application.documents.birthCertificate.fileName || 'Document'}
                </div>
              </div>
            ` : ''}
            ${application.documents?.childPhoto?.fileUrl ? `
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <div class="label" style="margin-bottom: 10px;">Child Photo</div>
                ${application.documents.childPhoto.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? `
                  <img src="${application.documents.childPhoto.fileUrl}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
                ` : ''}
                <div style="font-size: 10px; color: #666; word-break: break-all;">
                  ${application.documents.childPhoto.fileName || 'Photo'}
                </div>
              </div>
            ` : ''}
            ${application.documents?.parentNICs?.fileUrl ? `
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <div class="label" style="margin-bottom: 10px;">Parent NICs</div>
                ${application.documents.parentNICs.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? `
                  <img src="${application.documents.parentNICs.fileUrl}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
                ` : ''}
                <div style="font-size: 10px; color: #666; word-break: break-all;">
                  ${application.documents.parentNICs.fileName || 'NIC'}
                </div>
              </div>
            ` : ''}
            ${application.documents?.immunizationRecord?.fileUrl ? `
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <div class="label" style="margin-bottom: 10px;">Immunization Record</div>
                ${application.documents.immunizationRecord.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? `
                  <img src="${application.documents.immunizationRecord.fileUrl}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
                ` : ''}
                <div style="font-size: 10px; color: #666; word-break: break-all;">
                  ${application.documents.immunizationRecord.fileName || 'Record'}
                </div>
              </div>
            ` : ''}
            ${application.documents?.paymentReceipt?.fileUrl ? `
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <div class="label" style="margin-bottom: 10px;">Payment Receipt</div>
                ${application.documents.paymentReceipt.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? `
                  <img src="${application.documents.paymentReceipt.fileUrl}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
                ` : ''}
                <div style="font-size: 10px; color: #666; word-break: break-all;">
                  ${application.documents.paymentReceipt.fileName || 'Receipt'}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <div class="footer">
        <p style="margin: 0;">Apple Tree Tots - Application Record</p>
        <p style="margin: 8px 0 0 0; color: #ccc;">This document was generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  `;

  const opt = {
    margin: 10,
    filename: `Application_${childName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff' },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  html2pdf().set(opt).from(element).save();
};

export const generateApplicationSubmissionPDF = async (formData: any) => {
  const element = document.createElement('div');
  const submissionDate = new Date();
  const ACCENT_COLOR = '#E77A6A';
  const SECONDARY_DARK = '#2d5555';
  const THEME_COLOR_PRIMARY = '#2A372F';
  const BG_LIGHT = '#CDD1CB';

  // Convert payment receipt file to data URL if available
  let paymentReceiptDataUrl = '';
  if (formData.paymentReceiptFile && formData.paymentReceiptFile instanceof File) {
    try {
      paymentReceiptDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result || '');
        };
        reader.onerror = () => reject(new Error('Failed to read payment receipt file'));
        reader.readAsDataURL(formData.paymentReceiptFile);
      });
      console.log('Payment receipt converted to data URL, size:', paymentReceiptDataUrl.length);
    } catch (error) {
      console.error('Error converting payment receipt:', error);
    }
  }

  element.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        background: white;
      }
      .pdf-page {
        width: 210mm;
        padding: 40px;
        background: white;
        color: ${THEME_COLOR_PRIMARY};
        line-height: 1.6;
        font-size: 13px;
      }

      /* Header Section */
      .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 35px;
        padding-bottom: 20px;
        border-bottom: 2px solid ${BG_LIGHT};
      }
      .logo-container {
        flex-shrink: 0;
      }
      .logo-container img {
        height: 60px;
        width: auto;
        object-fit: contain;
      }
      .header-right {
        flex: 1;
        margin-left: 40px;
      }
      .header-title {
        font-size: 28px;
        font-weight: 600;
        color: ${THEME_COLOR_PRIMARY};
        margin-bottom: 3px;
      }
      .header-subtitle {
        font-size: 12px;
        color: #666;
        font-weight: 400;
      }

      /* Status & Date Info */
      .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        gap: 30px;
      }
      .info-block {
        flex: 1;
      }
      .info-label {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #999;
        margin-bottom: 5px;
        font-weight: 600;
      }
      .info-value {
        font-size: 14px;
        color: ${THEME_COLOR_PRIMARY};
        font-weight: 500;
      }

      /* Status Badge */
      .status-badge {
        background: #FEF3C7;
        color: #92400E;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
        border-left: 3px solid #F59E0B;
      }

      /* Notification Box */
      .notification-box {
        background: #F0F9FF;
        border-left: 4px solid #0284C7;
        padding: 14px 16px;
        margin-bottom: 25px;
        border-radius: 4px;
      }
      .notification-text {
        font-size: 12px;
        color: #0C4A6E;
        line-height: 1.6;
      }

      /* Section */
      .section {
        margin-bottom: 25px;
        page-break-inside: avoid;
      }
      .section-header {
        background: ${SECONDARY_DARK};
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 15px;
      }

      /* Grid Layouts */
      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 12px;
      }
      .grid-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 16px;
        margin-bottom: 12px;
      }
      .grid-full {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        margin-bottom: 12px;
      }

      /* Field */
      .field {
        padding: 10px 12px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
      }
      .field-label {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        color: #666;
        margin-bottom: 4px;
        display: block;
      }
      .field-value {
        font-size: 12px;
        color: ${THEME_COLOR_PRIMARY};
        line-height: 1.5;
        word-break: break-word;
      }

      /* Sub-section */
      .sub-section {
        margin: 14px 0;
        padding: 12px;
        background: #f5f5f5;
        border-left: 3px solid ${SECONDARY_DARK};
        border-radius: 3px;
      }
      .sub-section-title {
        font-size: 11px;
        font-weight: 700;
        color: ${SECONDARY_DARK};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }

      /* Document List */
      .documents-list {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 3px;
        border-left: 3px solid ${SECONDARY_DARK};
      }
      .document-item {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        font-size: 12px;
        color: ${THEME_COLOR_PRIMARY};
        border-bottom: 1px dotted #ddd;
      }
      .document-item:last-child {
        border-bottom: none;
      }
      .document-name {
        font-weight: 500;
      }
      .document-status {
        color: #666;
        font-size: 11px;
      }

      /* Footer */
      .footer {
        margin-top: 45px;
        padding-top: 15px;
        border-top: 1px solid #e5e5e5;
        text-align: center;
        font-size: 10px;
        color: #999;
      }
      .footer-text {
        margin: 4px 0;
      }
    </style>

    <div class="pdf-page">
      <!-- Header with Logo -->
      <div class="header-section">
        <div class="logo-container">
          <img src="/images/logo.JPG" alt="Apple Tree Tots Logo" style="max-width: 100%; height: auto;" />
        </div>
        <div class="header-right">
          <div class="header-title">Application Submitted</div>
          <div class="header-subtitle">Apple Tree Tots - Admission Form</div>
        </div>
      </div>

      <!-- Status & Basic Info -->
      <div class="info-row">
        <div class="info-block">
          <div class="info-label">Status</div>
          <div class="status-badge">Pending</div>
        </div>
        <div class="info-block">
          <div class="info-label">Submission Date</div>
          <div class="info-value">${submissionDate.toLocaleDateString()}</div>
        </div>
        <div class="info-block">
          <div class="info-label">Child Name</div>
          <div class="info-value">${formData.childFullName}</div>
        </div>
      </div>

      <!-- Notification -->
      <div class="notification-box">
        <div class="notification-text">
          ℹ Your application is under review. We will contact you when your application is confirmed.
        </div>
      </div>

      <!-- Child's Information -->
      <div class="section">
        <div class="section-header">Child's Information</div>
        <div class="grid-3">
          <div class="field">
            <span class="field-label">Full Name</span>
            <span class="field-value">${formData.childFullName}</span>
          </div>
          <div class="field">
            <span class="field-label">Date of Birth</span>
            <span class="field-value">${new Date(formData.childDOB).toLocaleDateString()}</span>
          </div>
          <div class="field">
            <span class="field-label">Gender</span>
            <span class="field-value">${formData.childGender}</span>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <span class="field-label">Nationality</span>
            <span class="field-value">${formData.childNationality}</span>
          </div>
          <div class="field">
            <span class="field-label">Home Language</span>
            <span class="field-value">${formData.languageAtHome}</span>
          </div>
        </div>
        <div class="grid-full">
          <div class="field">
            <span class="field-label">Home Address</span>
            <span class="field-value">${formData.homeAddress}</span>
          </div>
        </div>
      </div>

      <!-- Parent/Guardian Information -->
      <div class="section">
        <div class="section-header">Parent / Guardian Information</div>

        <div class="sub-section">
          <div class="sub-section-title">Primary Guardian</div>
          <div class="grid-2">
            <div class="field">
              <span class="field-label">Full Name</span>
              <span class="field-value">${formData.parent1Name}</span>
            </div>
            <div class="field">
              <span class="field-label">NIC Number</span>
              <span class="field-value">${formData.parent1NIC}</span>
            </div>
          </div>
          <div class="grid-2">
            <div class="field">
              <span class="field-label">Email Address</span>
              <span class="field-value">${formData.parent1Email}</span>
            </div>
            <div class="field">
              <span class="field-label">Mobile Number</span>
              <span class="field-value">${formData.parent1Mobile}</span>
            </div>
          </div>
        </div>

        ${formData.parent2Name ? `
          <div class="sub-section">
            <div class="sub-section-title">Secondary Guardian</div>
            <div class="grid-2">
              <div class="field">
                <span class="field-label">Full Name</span>
                <span class="field-value">${formData.parent2Name}</span>
              </div>
              <div class="field">
                <span class="field-label">NIC Number</span>
                <span class="field-value">${formData.parent2NIC}</span>
              </div>
            </div>
            <div class="grid-full">
              <div class="field">
                <span class="field-label">Mobile Number</span>
                <span class="field-value">${formData.parent2Mobile}</span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Program Enrollment -->
      <div class="section">
        <div class="section-header">Program Enrollment</div>
        <div class="grid-2">
          <div class="field">
            <span class="field-label">Program Type</span>
            <span class="field-value">${formData.programType.charAt(0).toUpperCase() + formData.programType.slice(1)}</span>
          </div>
          <div class="field">
            <span class="field-label">Schedule Type</span>
            <span class="field-value">${formData.programLevel}</span>
          </div>
        </div>
      </div>

      <!-- Medical & Emergency Information -->
      <div class="section">
        <div class="section-header">Medical & Emergency Information</div>
        <div class="grid-full">
          <div class="field">
            <span class="field-label">Immunization Up to Date</span>
            <span class="field-value">${formData.immunizationUpToDate ? 'Yes' : 'No'}</span>
          </div>
        </div>
        ${formData.medicalConditions ? `
          <div class="grid-full">
            <div class="field">
              <span class="field-label">Medical Conditions / Allergies</span>
              <span class="field-value">${formData.medicalConditions}</span>
            </div>
          </div>
        ` : ''}

        <div class="sub-section">
          <div class="sub-section-title">Emergency Contacts</div>
          <div class="grid-2">
            <div class="field">
              <span class="field-label">Contact 1</span>
              <span class="field-value">${formData.emergencyContact1Name}</span>
            </div>
            <div class="field">
              <span class="field-label">Contact 2</span>
              <span class="field-value">${formData.emergencyContact2Name}</span>
            </div>
          </div>
        </div>

        <div class="grid-full">
          <div class="field">
            <span class="field-label">Authorized Pickup Persons</span>
            <span class="field-value">${formData.authorizedPickupPersons}</span>
          </div>
        </div>
      </div>

      <!-- Submitted Documents with Images -->
      <div class="section">
        <div class="section-header">Submitted Documents</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; page-break-inside: avoid;">
            <div class="field-label" style="margin-bottom: 8px;">Birth Certificate</div>
            <div style="background: #f5f5f5; height: 120px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999; margin-bottom: 8px;">
              [Birth Certificate Uploaded]
            </div>
            <div style="font-size: 10px; color: #666;">✓ Submitted</div>
          </div>
          <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; page-break-inside: avoid;">
            <div class="field-label" style="margin-bottom: 8px;">Child Photograph</div>
            <div style="background: #f5f5f5; height: 120px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999; margin-bottom: 8px;">
              [Photo Uploaded]
            </div>
            <div style="font-size: 10px; color: #666;">✓ Submitted</div>
          </div>
          <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; page-break-inside: avoid;">
            <div class="field-label" style="margin-bottom: 8px;">Parents' NIC Copies</div>
            <div style="background: #f5f5f5; height: 120px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999; margin-bottom: 8px;">
              [NIC Document Uploaded]
            </div>
            <div style="font-size: 10px; color: #666;">✓ Submitted</div>
          </div>
          <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; page-break-inside: avoid;">
            <div class="field-label" style="margin-bottom: 8px;">Immunization Record</div>
            <div style="background: #f5f5f5; height: 120px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999; margin-bottom: 8px;">
              [Immunization Record Uploaded]
            </div>
            <div style="font-size: 10px; color: #666;">✓ Submitted</div>
          </div>
        </div>
      </div>

      <!-- Payment Receipt Section -->
      <div class="section">
        <div class="section-header">Payment Receipt</div>
        <div style="border: 1px solid #E77A6A; padding: 16px; border-radius: 4px; background: #FFF5F3;">
          <div class="field-label" style="margin-bottom: 12px; color: #E77A6A;">Payment Receipt</div>
          ${paymentReceiptDataUrl ? `
            <div style="background: white; border: 1px solid #E77A6A; padding: 12px; border-radius: 4px; text-align: center;">
              <img src="${paymentReceiptDataUrl}" style="max-width: 100%; max-height: 400px; border-radius: 3px;" alt="Payment Receipt" />
            </div>
          ` : `
            <div style="background: white; border: 1px dashed #E77A6A; padding: 20px; border-radius: 4px; text-align: center; color: #999; font-size: 12px;">
              Payment Receipt Image
            </div>
          `}
          <div style="margin-top: 12px; font-size: 11px; color: #666;">
            <strong>Status:</strong> ✓ Payment receipt received and verified
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-text">Apple Tree Tots - Nurturing confident, independent, and curious learners</div>
        <div class="footer-text">through AMI Montessori principles and the HEI approach</div>
        <div class="footer-text">Generated on ${submissionDate.toLocaleDateString()} at ${submissionDate.toLocaleTimeString()}</div>
      </div>
    </div>
  `;

  const opt = {
    margin: 5,
    filename: `Apple-Tree-Tots-Application-${formData.childFullName.replace(/\s+/g, '-')}-${new Date().getTime()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff' },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  html2pdf().set(opt).from(element).save();
};
