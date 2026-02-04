import React, { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#1a3a3a]">
      <Sidebar />
      <div className="flex-grow overflow-auto pt-20 md:pt-0">
        {children}
      </div>
    </div>
  );
}
