import React from 'react';
import { RouteObject } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { ContactPage } from './pages/ContactPage';
import { PackagesPage } from './pages/PackagesPage';

export const websiteRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/team',
    element: <TeamPage />,
  },
  {
    path: '/admissions',
    element: <AdmissionsPage />,
  },
  {
    path: '/application',
    element: <ApplicationPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/packages',
    element: <PackagesPage />,
  },
];
