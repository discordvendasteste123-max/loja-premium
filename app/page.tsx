'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground, FloatingShape } from '@/components/animated-background';
import { LoginForm } from '@/components/login-form';

function HeroSection() {
  return (
    <div className="relative z-10 text-center animate-fade-in-up">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-baby-blue text-sm">
          <span className="w-2 h-2 rounded-full bg-baby-blue animate-pulse" />
          Enterprise Edition
        </div>
      </div>
      
      <h2 className="text-5xl font-light text-text-primary mb-6 tracking-tight">
        Access the <span className="text-gradient font-medium">future</span>
      </h2>
      
      <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
        Experience the next generation of enterprise technology. 
        Secure, seamless, and designed for the exceptional.
      </p>

      <div className="mt-12 flex items-center justify-center gap-8 text-text-secondary/60">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm">Bank-grade security</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm">Lightning fast</span>
        </div>
      </div>
    </div>
  );
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
  return (
    <div className="lg:hidden text-center mb-8 animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-baby-blue text-xs mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-baby-blue animate-pulse" />
        Enterprise
      </div>
    </div>
  );
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
    <div className="min-h-screen w-full flex bg-bg-deep">
      {/* Left Side - Cinematic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-16">
        <AnimatedBackground />
        
        <FloatingShape delay={0} />
        <FloatingShape delay={-3} />
        <FloatingShape delay={-5} />

        <HeroSection />
        <ScrollIndicator />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <div className="absolute inset-0 lg:hidden">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <MobileHeader />

          <div className="hidden lg:block mb-10 animate-fade-in-up">
            <Logo />
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-text-secondary/40 text-xs">
            © 2026 Nexus Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}