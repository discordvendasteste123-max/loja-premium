'use client';

function GradientOrb({ className = '' }: { className?: string }) {
  return <div className={`gradient-orb ${className}`} />;
}

function Particle({ index }: { index: number }) {
  const positions = [
    { left: '10%', top: '20%', delay: '0s' },
    { left: '30%', top: '40%', delay: '1s' },
    { left: '50%', top: '15%', delay: '2s' },
    { left: '70%', top: '60%', delay: '3s' },
    { left: '85%', top: '25%', delay: '4s' },
    { left: '20%', top: '70%', delay: '1.5s' },
    { left: '40%', top: '85%', delay: '2.5s' },
    { left: '60%', top: '45%', delay: '3.5s' },
    { left: '80%', top: '80%', delay: '4.5s' },
    { left: '25%', top: '55%', delay: '0.5s' },
  ];

  const pos = positions[index % positions.length];

  return (
    <div
      className="absolute w-1 h-1 bg-baby-blue rounded-full opacity-30"
      style={{
        left: pos.left,
        top: pos.top,
        animation: `float ${8 + (index % 3)}s ease-in-out infinite`,
        animationDelay: pos.delay,
      }}
    />
  );
}

function GridLines() {
  return (
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
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <GradientOrb className="absolute top-1/4 left-1/4 w-96 h-96 animate-float" />
      <GradientOrb className="absolute bottom-1/4 right-1/4 w-80 h-80 animate-float-delayed opacity-60" />
      <GradientOrb className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-pulse-glow" />
      
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(137, 207, 240, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(137, 207, 240, 0.06) 0%, transparent 40%)
          `,
        }}
      />

      {[...Array(10)].map((_, i) => <Particle key={i} index={i} />)}

      <GridLines />
    </div>
  );
}

export function FloatingShape({ delay = 0 }: { delay?: number }) {
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