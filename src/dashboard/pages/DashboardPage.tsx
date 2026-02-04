import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { fetchApplications } from '../../services/applicationApi';

interface Application {
  _id: string;
  childFullName: string;
  parent1Name: string;
  programType: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchApplications();
      setApplications(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalApplications = applications.length;
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  const programCounts = {
    toddler: applications.filter(a => a.programType === 'toddler').length,
    casa: applications.filter(a => a.programType === 'casa').length,
    preschool: applications.filter(a => a.programType === 'preschool').length,
  };

  const recentApplications = applications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a3a3a] text-white px-4 py-4 md:p-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-2xl md:text-4xl font-serif mb-6 md:mb-8">Dashboard</h1>
          <div className="bg-red-500/20 border border-red-500 rounded p-4 text-red-300">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white px-4 py-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl md:text-4xl font-serif mb-6 md:mb-8">Dashboard</h1>

        {loading ? (
          <div className="text-center text-white/50">Loading dashboard data...</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {/* Total Applications */}
              <div className="bg-[#2d5555]/20 border border-white/10 rounded p-4 md:p-6 hover:border-white/20 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/60 mb-2">Total Applications</p>
                    <p className="text-2xl md:text-4xl font-bold">{totalApplications}</p>
                  </div>
                  <FileText size={28} className="text-[#7dd3c0] opacity-50" />
                </div>
              </div>

              {/* Pending */}
              <div className="bg-[#2d5555]/20 border border-white/10 rounded p-4 md:p-6 hover:border-yellow-500/30 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/60 mb-2">Pending</p>
                    <p className="text-2xl md:text-4xl font-bold text-yellow-300">{pendingCount}</p>
                  </div>
                  <Clock size={28} className="text-yellow-400 opacity-50" />
                </div>
              </div>

              {/* Approved */}
              <div className="bg-[#2d5555]/20 border border-white/10 rounded p-4 md:p-6 hover:border-green-500/30 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/60 mb-2">Approved</p>
                    <p className="text-2xl md:text-4xl font-bold text-green-300">{approvedCount}</p>
                  </div>
                  <CheckCircle size={28} className="text-green-400 opacity-50" />
                </div>
              </div>

              {/* Rejected */}
              <div className="bg-[#2d5555]/20 border border-white/10 rounded p-4 md:p-6 hover:border-red-500/30 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/60 mb-2">Rejected</p>
                    <p className="text-2xl md:text-4xl font-bold text-red-300">{rejectedCount}</p>
                  </div>
                  <XCircle size={28} className="text-red-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* Program Types */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
                <h2 className="text-base md:text-lg font-serif mb-6 text-white">Programs Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#2d5555]/20 rounded">
                    <div>
                      <p className="text-sm font-medium capitalize">Toddler Program</p>
                      <p className="text-xs text-white/50">{programCounts.toddler} enrollments</p>
                    </div>
                    <p className="text-2xl font-bold text-[#7dd3c0]">{programCounts.toddler}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#2d5555]/20 rounded">
                    <div>
                      <p className="text-sm font-medium capitalize">Casa Program</p>
                      <p className="text-xs text-white/50">{programCounts.casa} enrollments</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-300">{programCounts.casa}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#2d5555]/20 rounded">
                    <div>
                      <p className="text-sm font-medium capitalize">Preschool Program</p>
                      <p className="text-xs text-white/50">{programCounts.preschool} enrollments</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-300">{programCounts.preschool}</p>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="lg:col-span-2 bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
                <h2 className="text-base md:text-lg font-serif mb-4 text-white">Recent Applications</h2>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {recentApplications.length > 0 ? (
                    recentApplications.map((app) => (
                      <div key={app._id} className="flex items-center justify-between p-3 bg-[#2d5555]/20 rounded hover:bg-[#2d5555]/40 transition text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{app.childFullName}</p>
                          <p className="text-xs text-white/50 capitalize">{app.programType}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className={`text-xs px-2 py-1 rounded capitalize font-medium ${
                            app.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                            app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/50 text-center py-4">No applications yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
                <h3 className="text-sm md:text-base font-serif mb-4 text-white/70">Application Rate</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-xs">
                      <span>Approval Rate</span>
                      <span className="font-semibold">{totalApplications > 0 ? Math.round((approvedCount / totalApplications) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-[#2d5555]/40 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${totalApplications > 0 ? (approvedCount / totalApplications) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
                <h3 className="text-sm md:text-base font-serif mb-4 text-white/70">Status Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Pending:</span>
                    <span className="font-semibold">{pendingCount} ({totalApplications > 0 ? Math.round((pendingCount / totalApplications) * 100) : 0}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Approved:</span>
                    <span className="font-semibold">{approvedCount} ({totalApplications > 0 ? Math.round((approvedCount / totalApplications) * 100) : 0}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-300">Rejected:</span>
                    <span className="font-semibold">{rejectedCount} ({totalApplications > 0 ? Math.round((rejectedCount / totalApplications) * 100) : 0}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
