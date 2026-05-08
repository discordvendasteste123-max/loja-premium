'use client';

import { useState, useEffect } from 'react';

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full gradient-orb animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full gradient-orb animate-float-delayed opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-orb animate-pulse-glow" />
      
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(137, 207, 240, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(137, 207, 240, 0.06) 0%, transparent 40%)
        `
      }} />

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-baby-blue rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#89CFF0" stopOpacity="0" />
            <stop offset="50%" stopColor="#89CFF0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#89CFF0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={10 + i * 10}
            y1="0"
            x2={10 + i * 10}
            y2="100"
            stroke="url(#line-gradient)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

function FloatingShape({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="absolute w-20 h-20 rounded-2xl border border-baby-blue/20 glass-card animate-float"
      style={{
        animationDelay: `${delay}s`,
        transform: 'rotate(15deg)',
      }}
    />
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-3xl p-10 w-full max-w-md animate-fade-in-up">
      <div className="text-center mb-8">
<h1 className="text-3xl font-semibold text-text-primary mb-2 tracking-tight">
            Welcome back 👋
          </h1>
        <p className="text-text-secondary text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className={`w-5 h-5 input-icon ${isFocused === 'email' ? 'input-icon-focus' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused('email')}
              onBlur={() => setIsFocused(null)}
              className="glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-text-primary placeholder:text-text-secondary/50"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className={`w-5 h-5 input-icon ${isFocused === 'password' ? 'input-icon-focus' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused('password')}
              onBlur={() => setIsFocused(null)}
              className="glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-text-primary placeholder:text-text-secondary/50"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-baby-blue/30 bg-input-bg text-baby-blue focus:ring-baby-blue/50" />
            <span className="text-text-secondary">Remember me</span>
          </label>
          <a href="#" className="text-baby-blue hover:text-baby-blue-light transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3.5 rounded-xl text-base font-medium"
        >
          Sign in
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-baby-blue/10">
        <p className="text-center text-text-secondary text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-baby-blue hover:text-baby-blue-light transition-colors font-medium">
            Create one
          </a>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-baby-blue/10" />
        <span className="text-text-secondary/50 text-xs">or</span>
        <div className="h-px flex-1 bg-baby-blue/10" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="glass-input py-2.5 rounded-xl flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary hover:border-baby-blue/30 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm">Google</span>
        </button>
        <button className="glass-input py-2.5 rounded-xl flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary hover:border-baby-blue/30 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-sm">GitHub</span>
        </button>
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-secondary/40 text-sm animate-fade-in-up-delay-2">
          <span>Scroll to explore</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <div className="absolute inset-0 lg:hidden">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-baby-blue text-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-baby-blue animate-pulse" />
              Enterprise
            </div>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:block mb-10 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-baby-blue to-baby-blue-light flex items-center justify-center">
                <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-text-primary">Nexus</span>
            </div>
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