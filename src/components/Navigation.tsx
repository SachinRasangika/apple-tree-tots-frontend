import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

interface NavigationProps {
  bannerVisible?: boolean;
}

export function Navigation({ bannerVisible = true }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/' || location.pathname === '/apple-tree-tots/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navTop = bannerVisible ? 'top-12 md:top-14' : 'top-0';

  return <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${navTop} ${isScrolled ? 'bg-[#CDD1CB]/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/apple-tree-tots/images/apple-tree-tots-images/logo1.png" alt="Apple Tree Tots Logo" className="h-16 w-auto" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {[
            { label: 'Home', path: '/' },
            { label: 'Team', path: '/team' },
            { label: 'Packages', path: '/packages' },
            { label: 'Admissions', path: '/admissions' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => {
            const isActive = location.pathname === path || (path === '/' && location.pathname === '/apple-tree-tots/');
            let linkColor: string;
            let hoverColor: string;
            let underlineColor: string;

            // On home page: white when not scrolled, dark when scrolled
            if (isHomePage) {
              if (isScrolled) {
                linkColor = 'text-[#2A372F]';
                hoverColor = 'hover:text-[#2A372F]/70';
                underlineColor = 'bg-[#2A372F]';
              } else {
                linkColor = 'text-white';
                hoverColor = 'hover:text-white/70';
                underlineColor = 'bg-white';
              }
            } else {
              linkColor = isDark ? 'text-white' : 'text-[#2A372F]';
              hoverColor = isDark ? 'hover:text-white/70' : 'hover:text-[#2A372F]/70';
              underlineColor = isDark ? 'bg-white' : 'bg-[#2A372F]';
            }

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`text-xs uppercase tracking-widest transition-colors relative group ${linkColor} ${hoverColor}`}
              >
                {label}
                <span
                  className={`absolute -bottom-2 left-0 h-px ${underlineColor} transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`md:hidden ${isHomePage ? (isScrolled ? 'text-[#2A372F]' : 'text-white') : (isDark ? 'text-white' : 'text-[#2A372F]')}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 p-6 flex flex-col space-y-6 shadow-xl mx-6 md:mx-12 lg:mx-16 ${
          isScrolled
            ? (isDark ? 'bg-[#1a3a3a] border-t border-white/10' : 'bg-[#CDD1CB] border-t border-[#2A372F]/20')
            : 'bg-[#2A372F]/95 border-t border-white/20'
        }`}>
          {[
            { label: 'Home', path: '/' },
            { label: 'Team', path: '/team' },
            { label: 'Packages', path: '/packages' },
            { label: 'Admissions', path: '/admissions' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => {
            const isActive = location.pathname === path || (path === '/' && location.pathname === '/apple-tree-tots/');
            const isCurrentHomePage = location.pathname === '/' || location.pathname === '/apple-tree-tots/';

            // On home page: white when not scrolled, dark when scrolled
            // On other pages: always light color in mobile menu
            let textColor: string;
            let borderColor: string;

            if (isCurrentHomePage) {
              if (isScrolled) {
                textColor = 'text-[#2A372F]';
                borderColor = 'border-[#2A372F]/20';
              } else {
                textColor = 'text-white';
                borderColor = 'border-white/20';
              }
            } else {
              // Non-home pages: always use light text in mobile menu
              textColor = 'text-white';
              borderColor = 'border-white/10';
            }
            return (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm uppercase tracking-widest text-center py-2 border-b ${borderColor} ${textColor} ${
                  isActive ? 'font-semibold' : ''
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </nav>;
}
