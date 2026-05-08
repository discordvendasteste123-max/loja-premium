'use client';

import { useEffect, useState, useMemo } from 'react';

function Particle({ 
  index, 
  count 
}: { 
  index: number; 
  count: number;
}) {
  const style = useMemo(() => {
    const angle = (index / count) * Math.PI * 2;
    const radius = 150 + Math.random() * 200;
    const x = 50 + Math.cos(angle) * radius * 0.3;
    const y = 50 + Math.sin(angle) * radius * 0.2;
    
    return {
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${(index * 0.5) % 5}s`,
      animationDuration: `${12 + Math.random() * 8}s`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      opacity: 0.2 + Math.random() * 0.3,
    };
  }, [index, count]);

  return (
    <div
      className="particle"
      style={style}
    />
  );
}

function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-drift"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(137, 207, 240, 0.08) 0%, rgba(137, 207, 240, 0.03) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] top-1/4 right-1/4 animate-orb-drift"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(137, 207, 240, 0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
          animationDelay: '-7s',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] bottom-1/4 left-1/4 animate-orb-drift"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(137, 207, 240, 0.04) 0%, transparent 60%)',
          filter: 'blur(50px)',
          animationDelay: '-14s',
        }}
      />
    </div>
  );
}

function GridOverlay() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#89CFF0" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  );
}

function AmbientLight() {
  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(137, 207, 240, 0.06) 0%, transparent 60%)',
      }}
    />
  );
}

function FloatingOrb({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="absolute w-32 h-32 rounded-full opacity-10 animate-float"
      style={{
        background: 'radial-gradient(circle, rgba(137, 207, 240, 0.4) 0%, transparent 70%)',
        animationDelay: `${delay}s`,
        filter: 'blur(20px)',
      }}
    />
  );
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const particleCount = 20;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-bg-deep" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <MeshGradient />
      <AmbientLight />
      <GridOverlay />
      
      <FloatingOrb delay={0} />
      <FloatingOrb delay={-3} />
      <FloatingOrb delay={-6} />

      {[...Array(particleCount)].map((_, i) => (
        <Particle key={i} index={i} count={particleCount} />
      ))}
    </div>
  );
}

export function FloatingShape({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="absolute w-20 h-20 rounded-2xl animate-float opacity-20"
      style={{
        background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.2), rgba(137, 207, 240, 0.05))',
        border: '1px solid rgba(137, 207, 240, 0.2)',
        animationDelay: `${delay}s`,
        filter: 'blur(2px)',
      }}
    />
  );
}