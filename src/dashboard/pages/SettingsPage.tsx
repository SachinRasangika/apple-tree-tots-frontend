import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SettingsPage() {
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white px-4 py-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl md:text-4xl font-serif mb-6 md:mb-8">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* School Information */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
            <h2 className="text-base md:text-lg font-serif mb-4 md:mb-6">School Information</h2>
            <div className="space-y-6">
              <Input
                label="School Name"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button variant="primary" className="w-full">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Admin Accounts */}
          <div className="bg-[#2d5555]/10 border border-white/10 rounded p-4 md:p-6">
            <h2 className="text-base md:text-lg font-serif mb-4 md:mb-6">Admin Accounts</h2>
            <div className="space-y-3">
              <p className="text-white/70 text-sm">No admin accounts yet</p>
            </div>
            <Button variant="outline" className="w-full mt-6">
              Add New Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
