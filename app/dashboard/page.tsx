'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="text-text-secondary">Carregando...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="text-text-secondary">Verificando...</div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <header className="p-4 border-b border-baby-blue/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-baby-blue to-baby-blue-light flex items-center justify-center">
              <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-text-primary">Nexus</span>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-baby-blue/10 text-baby-blue text-sm hover:bg-baby-blue/20 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-text-primary mb-4">Dashboard</h1>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-text-secondary">
              Bem-vindo, <span className="text-baby-blue">{user.email?.split('@')[0]}</span>!
            </p>
            <p className="text-text-secondary/60 text-sm mt-2">
              ID: {user.id}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}