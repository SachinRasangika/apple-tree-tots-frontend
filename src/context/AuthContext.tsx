import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'appletree@To';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUser(authData);
      } catch (error) {
        localStorage.removeItem('adminAuth');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = { email };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('adminAuth', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
