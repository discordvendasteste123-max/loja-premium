'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground, FloatingShape } from '@/components/animated-background';
import { LoginForm } from '@/components/login-form';

function HeroSection() {
  return null;
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-secondary/40 text-sm animate-fade-in-up-delay-2">
      <span>Scroll to explore</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}

function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-baby-blue to-baby-blue-light flex items-center justify-center">
        <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className="text-xl font-semibold text-text-primary">Nexus</span>
    </div>
  );
}

function MobileHeader() {
  return null;
}

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-deep">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="mb-8 text-center">
          <Logo className="justify-center" />
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-text-secondary/40 text-xs">
          © 2026 Loja Premium. All rights reserved.
        </p>
      </div>
    </div>
  );
}