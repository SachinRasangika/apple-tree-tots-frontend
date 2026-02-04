import React from 'react';
import { Button } from './ui/Button';
import { Instagram, Facebook, Twitter } from 'lucide-react';
export function Footer() {
  return <footer className="bg-[#152e2e] text-white pt-20 pb-10 px-6 md:px-12 lg:px-16 mt-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Newsletter */}
        <div className="mb-20 max-w-md">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-6">
            Follow us on Instagram:
          </h3>
          <a href="https://instagram.com/apple_tree_tots_preschool" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[#2d5555] transition-colors mb-8">
            <Instagram size={20} />
            <span>@apple_tree_tots_preschool</span>
          </a>
          <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
            Stay updated with daily activities, events, and announcements from
            our preschool community.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-70">
              Menu
            </h4>
            <ul className="space-y-3 text-xs tracking-wide opacity-80">
              {['Home', 'Programs', 'Admissions', 'Contact'].map(item => <li key={item}>
                  <a href="#" className="hover:text-white hover:opacity-100 transition-opacity">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-70">
              Contact
            </h4>
            <ul className="space-y-3 text-xs tracking-wide opacity-80">
              <li>Apple Tree Tots Preschool</li>
              <li>Ahangama, Galle District</li>
              <li>Southern Province, Sri Lanka</li>
              <li>074 343 1488</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-70">
              Programs
            </h4>
            <ul className="space-y-3 text-xs tracking-wide opacity-80">
              <li>
                <a href="#" className="hover:text-white hover:opacity-100 transition-opacity">
                  Toddler Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:opacity-100 transition-opacity">
                  CASA Programs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-70">
              Legal
            </h4>
            <ul className="space-y-3 text-xs tracking-wide opacity-80">
              <li>
                <a href="#" className="hover:text-white hover:opacity-100 transition-opacity">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:opacity-100 transition-opacity">
                  Privacy Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] tracking-widest opacity-40">
          <p>© 2025 APPLE TREE TOTS PRESCHOOL</p>
          <p className="mt-2 md:mt-0">NURTURING YOUNG MINDS IN AHANGAMA</p>
        </div>
      </div>
    </footer>;
}
