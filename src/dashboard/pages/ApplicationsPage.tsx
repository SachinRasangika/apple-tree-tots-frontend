import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { fetchApplications } from '../../services/applicationApi';

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
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

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

  const handleViewMore = (app: Application) => {
    navigate(`/admin/applications/${app._id}`);
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
                  <th className="text-left py-4 px-4 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 font-semibold">Date</th>
                  <th className="text-center py-4 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app) => {
                    const childName = app.childFullName || app.childName || 'N/A';
                    const parentName = app.parent1Name || app.parentName || 'N/A';
                    const email = app.parent1Email || app.email || 'N/A';
                    const program = app.programType || app.program || 'N/A';

                    return (
                      <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4 px-4 font-medium">{childName}</td>
                        <td className="py-4 px-4">{parentName}</td>
                        <td className="py-4 px-4 text-white/80">{program}</td>
                        <td className="py-4 px-4 text-white/80">{email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded capitalize text-xs font-semibold ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white/60 text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewMore(app)}
                            className="flex items-center justify-center gap-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition mx-auto"
                            title="View details"
                          >
                            View More
                            <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-white/50">
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
              const program = app.programType || app.program || 'N/A';

              return (
                <div key={app._id} className="bg-[#2d5555]/10 border border-white/10 rounded p-4 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Child Name</p>
                    <p className="font-medium text-lg">{childName}</p>
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
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <p className="text-xs text-white/50 mb-1">Status</p>
                      <span className={`px-3 py-1 rounded capitalize text-xs font-semibold inline-block ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleViewMore(app)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded text-sm transition mt-4"
                  >
                    View More
                    <ChevronRight size={16} />
                  </button>
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
    </div>
  );
}
