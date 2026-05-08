'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { PerfilSection } from '@/components/dashboard/perfil-section';
import { ComprasSection } from '@/components/dashboard/compras-section';
import { DadosSection } from '@/components/dashboard/dados-section';
import { AfiliadosSection } from '@/components/dashboard/afiliados-section';
import { SuporteSection } from '@/components/dashboard/suporte-section';

const menuItems = [
  { id: 'perfil', label: 'Perfil', icon: 'user' },
  { id: 'compras', label: 'Compras', icon: 'package' },
  { id: 'dados', label: 'Dados', icon: 'database' },
  { id: 'afiliados', label: 'Afiliados', icon: 'link' },
  { id: 'suporte', label: 'Suporte', icon: 'headset' },
];

const icons: Record<string, JSX.Element> = {
  user: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  package: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  database: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
  link: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  headset: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>,
  logout: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>,
};

const sections: Record<string, React.ComponentType> = {
  perfil: PerfilSection,
  compras: ComprasSection,
  dados: DadosSection,
  afiliados: AfiliadosSection,
  suporte: SuporteSection,
};

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('perfil');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionChange = (section: string) => {
    if (section === 'logout') {
      signOut();
      if (typeof window !== 'undefined') window.location.href = '/';
      return;
    }
    setIsTransitioning(true);
    setMobileMenuOpen(false);
    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
    }, 200);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-primary/20 border-t-cyan-primary animate-spin" />
          <p className="text-text-secondary text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/';
    return null;
  }

  const ActiveSection = sections[activeSection] || PerfilSection;

  return (
    <div className="min-h-screen bg-bg-deep">
      {/* Header Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-b border-cyan-primary/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center">
              <svg className="w-4 h-4 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-text-primary">Nexus</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-cyan-primary/10 transition-colors">
            <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Tab Navigation Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-card rounded-none border-t border-cyan-primary/10">
        <div className="flex justify-around py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                activeSection === item.id ? 'text-cyan-primary' : 'text-text-secondary'
              }`}
            >
              {icons[item.icon]}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-56 glass-card rounded-none border-r border-cyan-primary/10 z-50 flex-col">
        <div className="p-4 border-b border-cyan-primary/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center shadow-md shadow-cyan-primary/20">
              <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-text-primary">Nexus</h1>
              <p className="text-[10px] text-text-secondary/60">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2.5 space-y-0.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all ${
                activeSection === item.id ? 'bg-cyan-primary/15 text-cyan-primary' : 'text-text-secondary hover:text-text-primary hover:bg-cyan-primary/5'
              }`}
            >
              {icons[item.icon]}
              <span className="text-sm font-medium">{item.label}</span>
              {activeSection === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-primary animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="p-2.5 border-t border-cyan-primary/10">
          <div className="p-2.5 rounded-lg bg-cyan-primary/5 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-primary/30 to-cyan-light/20 flex items-center justify-center">
                <span className="text-[10px] font-semibold text-cyan-primary">
                  {user?.user_metadata?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <p className="text-xs font-medium text-text-primary truncate">
                {user?.user_metadata?.username || user?.email?.split('@')[0]}
              </p>
            </div>
          </div>
          <button onClick={() => handleSectionChange('logout')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all">
            {icons.logout}
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-64 glass-card rounded-none border-l border-cyan-primary/10 p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center">
                  <svg className="w-4 h-4 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-text-primary">Nexus</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4 p-3 rounded-lg bg-cyan-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-primary/30 to-cyan-light/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-cyan-primary">
                    {user?.user_metadata?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {user?.user_metadata?.username || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-[10px] text-text-secondary/60">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeSection === item.id ? 'bg-cyan-primary/15 text-cyan-primary' : 'text-text-secondary hover:text-text-primary hover:bg-cyan-primary/5'
                  }`}
                >
                  {icons[item.icon]}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
              <button onClick={() => handleSectionChange('logout')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                {icons.logout}
                <span className="text-sm font-medium">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pt-0 lg:pb-0 lg:pl-56 min-h-screen">
        <div className="p-4 lg:p-6">
          <div className={`max-w-2xl mx-auto transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <ActiveSection key={activeSection} />
          </div>
        </div>
      </main>
    </div>
  );
}