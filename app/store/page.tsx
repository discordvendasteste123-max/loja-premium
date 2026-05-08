'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const categorias = [
  { id: 1, nome: 'Cursos', icon: 'book', count: 24 },
  { id: 2, nome: 'Templates', icon: 'layout', count: 18 },
  { id: 3, nome: 'Software', icon: 'code', count: 12 },
  { id: 4, nome: 'Serviços', icon: 'briefcase', count: 8 },
];

const produtos = [
  { id: 1, nome: 'Curso Completo de Marketing Digital', desc: 'Aprenda estratégias avançadas', preco: 'R$ 297', img: '📚' },
  { id: 2, nome: 'Pack Templates Premium', desc: ' +50 templates editáveis', preco: 'R$ 197', img: '🎨' },
  { id: 3, nome: 'Software de Automação', desc: 'Automatize suas tarefas', preco: 'R$ 497', img: '⚡' },
  { id: 4, nome: 'Consultoria VIP', desc: 'Atendimento exclusivo 1:1', preco: 'R$ 997', img: '👑' },
  { id: 5, nome: 'E-book Guide 2026', desc: 'Guia completo do mercado', preco: 'R$ 97', img: '📖' },
  { id: 6, nome: 'Plugin WordPress Pro', desc: 'Recursos avançados', preco: 'R$ 147', img: '🔌' },
  { id: 7, nome: 'Masterclass de Vendas', desc: 'Técnicas comprovadas', preco: 'R$ 397', img: '💰' },
  { id: 8, nome: 'Kit Design Social', desc: 'Posts prontos para usar', preco: 'R$ 127', img: '📱' },
];

const recomendados = [
  { id: 9, nome: 'Bundle Completo', desc: 'Todos os produtos', preco: 'R$ 1.497', img: '🎁' },
  { id: 10, nome: 'Acesso Vitalício', desc: 'Atualizações perpétuas', preco: 'R$ 697', img: '♾️' },
];

const icons: Record<string, JSX.Element> = {
  book: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
  layout: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  code: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  briefcase: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a11.994 11.994 0 01-.673-.38m0 0A2.25 2.25 0 0112 13.5m0 0v4.25m0 0v4.25c0 .621-.504 1.125-1.125 1.125h-15a1.125 1.125 0 01-1.125-1.125v-4.25m0 0a2.25 2.25 0 00-2.25 2.25c0 1.125.504 2.25 2.25 2.25h15a2.25 2.25 0 002.25-2.25a2.25 2.25 0 00-2.25-2.25h-15z" /></svg>,
  cart: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  headset: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>,
  user: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  search: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  star: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" /></svg>,
  bolt: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  arrow: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg>,
};

export default function StorePage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-bg-deep">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-lg' : 'bg-bg-deep/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/store" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center shadow-lg shadow-cyan-primary/20">
                <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-text-primary">Nexus</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">{icons.search}</span>
                <input type="text" placeholder="Buscar produtos..." className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm text-text-primary placeholder:text-text-secondary/50" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-cyan-primary/10 text-text-secondary hover:text-cyan-primary transition-all">
                {icons.cart}
              </button>
              <button className="p-2.5 rounded-xl hover:bg-cyan-primary/10 text-text-secondary hover:text-cyan-primary transition-all">
                {icons.headset}
              </button>
              <Link href={user ? '/dashboard' : '/'} className="p-2.5 rounded-xl hover:bg-cyan-primary/10 text-text-secondary hover:text-cyan-primary transition-all">
                {icons.user}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-primary/10 via-transparent to-cyan-light/5" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-primary/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-light/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-primary/10 border border-cyan-primary/20 mb-6">
                <span className="text-cyan-primary">{icons.bolt}</span>
                <span className="text-sm font-medium text-cyan-primary">Novidades 2026</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                A plataforma que transforma
                <span className="text-gradient"> ideias em resultados</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                Acesso premium a cursos, templates e ferramentas para impulsionar seu negócio digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold flex items-center justify-center gap-2">
                  Explorar Produtos
                  {icons.arrow}
                </button>
                <button className="px-8 py-3.5 rounded-xl text-base font-semibold glass-card text-text-primary hover:bg-cyan-primary/5 transition-all flex items-center justify-center gap-2">
                  Ver Demonstração
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Categorias</h2>
              <button className="text-sm text-cyan-primary hover:text-cyan-light transition-colors">Ver todas</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categorias.map((cat, i) => (
                <button
                  key={cat.id}
                  className="glass-card rounded-2xl p-6 text-center group hover:bg-cyan-primary/5 hover:border-cyan-primary/30 hover:shadow-lg hover:shadow-cyan-primary/10 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan-primary/10 flex items-center justify-center mx-auto mb-4 text-cyan-primary group-hover:bg-cyan-primary/20 group-hover:scale-110 transition-all">
                    {icons[cat.icon]}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{cat.nome}</h3>
                  <p className="text-sm text-text-secondary">{cat.count} produtos</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recomendados */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-yellow-400">{icons.star}</span>
              <h2 className="text-2xl font-bold text-text-primary">Recomendados para você</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {recomendados.map((prod) => (
                <div key={prod.id} className="glass-card rounded-2xl p-6 group hover:bg-cyan-primary/5 hover:border-cyan-primary/30 transition-all duration-300">
                  <div className="flex gap-5">
                    <div className="w-24 h-24 rounded-xl bg-cyan-primary/10 flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-105 transition-transform">
                      {prod.img}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-1 truncate">{prod.nome}</h3>
                      <p className="text-sm text-text-secondary mb-3">{prod.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-cyan-primary">{prod.preco}</span>
                        <button className="px-4 py-2 rounded-lg bg-cyan-primary/10 text-cyan-primary text-sm font-medium hover:bg-cyan-primary/20 transition-all">
                          Ver mais
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Produtos em destaque</h2>
              <button className="text-sm text-cyan-primary hover:text-cyan-light transition-colors">Ver todos</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {produtos.map((prod, i) => (
                <div
                  key={prod.id}
                  className="glass-card rounded-2xl overflow-hidden group hover:bg-cyan-primary/5 hover:border-cyan-primary/30 hover:shadow-lg hover:shadow-cyan-primary/10 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-cyan-primary/5 to-cyan-light/5 flex items-center justify-center text-5xl relative overflow-hidden">
                    {prod.img}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-text-primary mb-1 truncate">{prod.nome}</h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">{prod.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-primary">{prod.preco}</span>
                      <button className="px-3 py-1.5 rounded-lg bg-cyan-primary text-bg-deep text-xs font-semibold hover:bg-cyan-light transition-colors">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center">
                  <svg className="w-4 h-4 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-text-primary">Nexus</span>
              </div>
              <p className="text-sm text-text-secondary">© 2026 Nexus. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}