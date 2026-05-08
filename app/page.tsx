'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground } from '@/components/animated-background';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bg-deep">
        <div className="glass-card rounded-3xl w-full max-w-md animate-fade-in-scale" style={{ minHeight: '600px' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-deep relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
        <p 
          className="mt-8 text-center text-text-secondary/30 text-xs tracking-wide animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          © 2026 Nexus. Todos os direitos reservados.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-secondary/10 to-transparent" />
    </div>
  );
}