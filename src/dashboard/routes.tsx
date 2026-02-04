import React from 'react';
import { RouteObject } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ApplicationForm } from '../components/ApplicationForm';

// Wrapper component for dashboard application form with redirect
function DashboardApplicationForm() {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    navigate('/admin/applications');
  };

  return <ApplicationForm onSubmitSuccess={handleSubmitSuccess} submittedBy="admin" />;
}

// Protected routes that require dashboard layout
const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <DashboardLayout><DashboardPage /></DashboardLayout>,
  },
  {
    path: 'applications',
    element: <DashboardLayout><ApplicationsPage /></DashboardLayout>,
  },
  {
    path: 'applications/new',
    element: <DashboardLayout><DashboardApplicationForm /></DashboardLayout>,
  },
  {
    path: 'settings',
    element: <DashboardLayout><SettingsPage /></DashboardLayout>,
  },
];

// Public admin routes
export const adminRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  ...dashboardRoutes,
];
