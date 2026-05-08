'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

const UserIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

function Input({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <span className={`input-icon ${focused ? 'input-icon-focus' : ''}`}>{icon}</span>
      </div>
      <input
        className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-text-primary placeholder:text-text-secondary/50"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await signUp(username, password);
      if (error) {
        setError(error.message);
      } else {
        setError('');
        alert('Account created! Check your email for confirmation.');
        setIsSignUp(false);
      }
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 w-full animate-fade-in-up">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-text-primary mb-1">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h1>
        <p className="text-text-secondary text-xs">
          {isSignUp ? 'Choose your username and password' : 'Enter your credentials'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="username" className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
            icon={<UserIcon />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon={<LockIcon />}
          />
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              icon={<LockIcon />}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full py-3.5 rounded-xl text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (isSignUp ? 'Creating...' : 'Signing in...') : (isSignUp ? 'Create account' : 'Sign in')}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-baby-blue/10">
        <p className="text-center text-text-secondary text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-baby-blue hover:text-baby-blue-light font-medium"
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
}