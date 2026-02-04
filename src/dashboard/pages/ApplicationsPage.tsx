import React, { useState, useEffect } from 'react';
import { Edit2, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ApplicationModal } from '../components/ApplicationModal';
import { fetchApplications, updateApplicationStatus, deleteApplication } from '../../services/applicationApi';
import { generateApplicationPDF } from '../../services/pdfGenerator';

interface Application {
  _id: string;
  childName: string;
  parentName: string;
  email: string;
  phone: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
}

export function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingStatusChanges, setPendingStatusChanges] = useState<{ [key: string]: 'pending' | 'approved' | 'rejected' }>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  // Fetch applications on component mount and when filters change
  useEffect(() => {
    loadApplications();
  }, [searchTerm, filterStatus]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchApplications(
        filterStatus === 'all' ? undefined : filterStatus,
        searchTerm || undefined
      );
      setApplications(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (app: Application) => {
    setSelectedApplication(app);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handlePreviewClick = (app: Application) => {
    setSelectedApplication(app);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (app: Application) => {
    try {
      generateApplicationPDF(app);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF');
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }
    try {
      setDeletingId(id);
      await deleteApplication(id);
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete application');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setPendingStatusChanges(prev => ({
      ...prev,
      [id]: newStatus
    }));
  };

  const handleSaveStatus = async (id: string) => {
    const newStatus = pendingStatusChanges[id];
    if (!newStatus) return;

    try {
      setSavingId(id);
      await updateApplicationStatus(id, newStatus);
      setApplications(applications.map(app =>
        app._id === id ? { ...app, status: newStatus } : app
      ));
      setPendingStatusChanges(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setSavingId(null);
    }
  };

  const handleCancelStatusChange = (id: string) => {
    setPendingStatusChanges(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSaveApplication = async (updatedApp: Application) => {
    try {
      await updateApplicationStatus(updatedApp._id, updatedApp.status, updatedApp.notes);
      setApplications(applications.map(app =>
        app._id === updatedApp._id ? updatedApp : app
      ));
    } catch (err) {
      throw err;
    }
  };

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
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-serif">Applications</h1>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:gap-4">
          <input
            type="text"
            placeholder="Search by child name, parent name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#2d5555]/30 border border-white/20 rounded px-4 py-2 text-sm md:text-base text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-[#2d5555]/30 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white/40 text-sm md:text-base md:min-w-40"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table (Desktop) - Hidden on mobile */}
        <div className="hidden md:block bg-[#2d5555]/10 border border-white/10 rounded overflow-hidden">
          {loading ? (
            <div className="py-12 px-4 text-center text-white/50">
              Loading applications...
            </div>
          ) : error ? (
            <div className="py-12 px-4 text-center text-red-400">
              Error: {error}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 bg-[#2d5555]/20">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Child Name</th>
                  <th className="text-left py-4 px-4 font-semibold">Parent Name</th>
                  <th className="text-left py-4 px-4 font-semibold">Program</th>
                  <th className="text-left py-4 px-4 font-semibold">Email</th>
                  <th className="text-left py-4 px-4 font-semibold">Phone</th>
                  <th className="text-left py-4 px-4 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app) => {
                    const childName = app.childFullName || app.childName || 'N/A';
                    const parentName = app.parent1Name || app.parentName || 'N/A';
                    const email = app.parent1Email || app.email || 'N/A';
                    const phone = app.parent1Mobile || app.phone || 'N/A';
                    const program = app.programType || app.program || 'N/A';
                    const hasStatusChange = pendingStatusChanges[app._id];
                    const newStatus = hasStatusChange ? pendingStatusChanges[app._id] : app.status;

                    return (
                      <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4 px-4 font-medium">{childName}</td>
                        <td className="py-4 px-4">{parentName}</td>
                        <td className="py-4 px-4 text-white/80">{program}</td>
                        <td className="py-4 px-4 text-white/80">{email}</td>
                        <td className="py-4 px-4 text-white/80">{phone}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={newStatus}
                              onChange={(e) => handleStatusChange(app._id, e.target.value as any)}
                              className={`text-xs px-3 py-1 rounded capitalize bg-transparent border cursor-pointer transition ${getStatusColor(newStatus)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            {hasStatusChange && (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleSaveStatus(app._id)}
                                  disabled={savingId === app._id}
                                  className="px-2 py-1 text-xs bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded transition disabled:opacity-50"
                                >
                                  {savingId === app._id ? '...' : 'Save'}
                                </button>
                                <button
                                  onClick={() => handleCancelStatusChange(app._id)}
                                  className="px-2 py-1 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white/60 text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handlePreviewClick(app)}
                              className="p-1 hover:bg-white/10 rounded transition"
                              title="Preview"
                            >
                              <Eye size={16} className="text-white/70" />
                            </button>
                            <button
                              onClick={() => handleEditClick(app)}
                              className="p-1 hover:bg-white/10 rounded transition"
                              title="Edit"
                            >
                              <Edit2 size={16} className="text-white/70" />
                            </button>
                            <button
                              onClick={() => handleDownloadPDF(app)}
                              className="p-1 hover:bg-white/10 rounded transition"
                              title="Download PDF"
                            >
                              <Download size={16} className="text-white/70" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(app._id)}
                              disabled={deletingId === app._id}
                              className="p-1 hover:bg-red-500/20 rounded transition disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={16} className={deletingId === app._id ? 'text-gray-400' : 'text-red-400'} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 px-4 text-center text-white/50">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Cards (Mobile) - Hidden on desktop */}
        <div className="md:hidden space-y-4">
          {loading ? (
            <div className="py-12 px-4 text-center text-white/50">
              Loading applications...
            </div>
          ) : error ? (
            <div className="py-12 px-4 text-center text-red-400">
              Error: {error}
            </div>
          ) : applications.length > 0 ? (
            applications.map((app) => {
              const childName = app.childFullName || app.childName || 'N/A';
              const parentName = app.parent1Name || app.parentName || 'N/A';
              const email = app.parent1Email || app.email || 'N/A';
              const phone = app.parent1Mobile || app.phone || 'N/A';
              const program = app.programType || app.program || 'N/A';
              const hasStatusChange = pendingStatusChanges[app._id];
              const newStatus = hasStatusChange ? pendingStatusChanges[app._id] : app.status;

              return (
                <div key={app._id} className="bg-[#2d5555]/10 border border-white/10 rounded p-4 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Child Name</p>
                    <p className="font-medium">{childName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Parent Name</p>
                    <p>{parentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Program</p>
                    <p className="text-sm">{program}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Email</p>
                    <p className="text-sm break-all">{email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Phone</p>
                    <p className="text-sm">{phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Date</p>
                    <p className="text-sm">{new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2">Status</p>
                    <div className="flex flex-col gap-2">
                      <select
                        value={newStatus}
                        onChange={(e) => handleStatusChange(app._id, e.target.value as any)}
                        className={`w-full text-sm px-3 py-2 rounded capitalize bg-transparent border cursor-pointer transition ${getStatusColor(newStatus)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {hasStatusChange && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveStatus(app._id)}
                            disabled={savingId === app._id}
                            className="flex-1 px-3 py-2 text-sm bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded transition disabled:opacity-50"
                          >
                            {savingId === app._id ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => handleCancelStatusChange(app._id)}
                            className="flex-1 px-3 py-2 text-sm bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded transition"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handlePreviewClick(app)}
                      className="flex-1 p-2 text-sm hover:bg-white/10 rounded transition"
                      title="Preview"
                    >
                      <Eye size={18} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleEditClick(app)}
                      className="flex-1 p-2 text-sm hover:bg-white/10 rounded transition"
                      title="Edit"
                    >
                      <Edit2 size={18} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(app)}
                      className="flex-1 p-2 text-sm hover:bg-white/10 rounded transition"
                      title="Download PDF"
                    >
                      <Download size={18} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(app._id)}
                      disabled={deletingId === app._id}
                      className="flex-1 p-2 text-sm hover:bg-red-500/20 rounded transition disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} className={`mx-auto ${deletingId === app._id ? 'text-gray-400' : 'text-red-400'}`} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center text-white/50">
              No applications found
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-[#2d5555]/20 border border-white/10 rounded p-3 md:p-4">
            <p className="text-white/70 text-xs md:text-sm mb-2">Total Applications</p>
            <p className="text-2xl md:text-3xl font-bold">{applications.length}</p>
          </div>
          <div className="bg-[#2d5555]/20 border border-white/10 rounded p-3 md:p-4">
            <p className="text-white/70 text-xs md:text-sm mb-2">Pending</p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-300">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-[#2d5555]/20 border border-white/10 rounded p-3 md:p-4 col-span-2 md:col-span-1">
            <p className="text-white/70 text-xs md:text-sm mb-2">Approved</p>
            <p className="text-2xl md:text-3xl font-bold text-green-300">
              {applications.filter(a => a.status === 'approved').length}
            </p>
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        application={selectedApplication}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSave={modalMode === 'edit' ? handleSaveApplication : undefined}
      />
    </div>
  );
}
