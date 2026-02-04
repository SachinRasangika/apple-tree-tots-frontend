import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#2d5555] border-b border-white/10 p-4 flex items-center justify-between z-40">
        <h2 className="text-lg font-serif text-white">Apple Tree</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded transition text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav className={`md:hidden fixed left-0 right-0 top-16 bg-[#2d5555] border-b border-white/10 z-40 transform transition-all duration-300 origin-top ${
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 border-b border-white/5 transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/applications"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 border-b border-white/5 transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <FileText size={18} />
            <span className="text-sm">Applications</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 border-b border-white/5 transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </NavLink>

          <button className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition text-left w-full">
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#2d5555] border-r border-white/10 p-6 h-screen flex-col sticky top-0 z-40">
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-white">Admin</h2>
          <p className="text-xs text-white/50 mt-1">Apple Tree Tots</p>
        </div>

        <nav className="space-y-2 flex-grow">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/applications"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <FileText size={18} />
            <span className="text-sm">Applications</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
          >
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </NavLink>
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition text-white/70 hover:text-white w-full text-left">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </aside>
    </>
  );
}
