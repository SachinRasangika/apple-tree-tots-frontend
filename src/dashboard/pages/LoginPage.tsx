import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement admin login logic
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a3a3a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Admin Login</h1>
          <p className="text-sm text-white/60">Apple Tree Tots Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="admin@appletreetots.lk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="primary" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-white/50 mt-6">
          Apple Tree Tots Admin Panel
        </p>
      </div>
    </div>
  );
}
