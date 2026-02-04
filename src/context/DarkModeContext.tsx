import React, { createContext, useContext } from 'react';

interface DarkModeContextType {
  isDark: boolean;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children, isDark = false }: { children: React.ReactNode; isDark?: boolean }) {
  return (
    <DarkModeContext.Provider value={{ isDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    return { isDark: false };
  }
  return context;
}
