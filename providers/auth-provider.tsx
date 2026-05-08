'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth, useAuthReturn } from '@/hooks/use-auth';

const AuthContext = createContext<useAuthReturn | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}