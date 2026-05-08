'use client';

import { useState, useEffect, useCallback } from 'react';

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) => visible ? (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

function Input({ 
  icon, 
  type = 'text',
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
  ...props 
}: {
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <span className={`input-icon transition-all duration-300 ${focused ? 'input-icon-focus' : ''}`}>
          {icon}
        </span>
      </div>
      <input
        type={showPasswordToggle && isPasswordVisible ? 'text' : type}
        className="glass-input w-full pl-12 pr-12 py-4 rounded-xl text-text-primary placeholder:text-text-secondary/40 text-sm transition-all duration-300"
        style={{
          transform: focused ? 'translateY(-2px)' : 'translateY(0)',
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-secondary transition-colors duration-200"
        >
          <EyeIcon visible={isPasswordVisible} />
        </button>
      )}
    </div>
  );
}

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = useCallback((tab: 'login' | 'signup') => {
    if (tab !== (isSignUp ? 'signup' : 'login')) {
      setError('');
      setFormKey(prev => prev + 1);
      setIsSignUp(tab === 'signup');
    }
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (isSignUp && password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isSignUp) {
      setError('');
      setLoading(false);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError('Credenciais inválidas');
      setLoading(false);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  if (!mounted) {
    return (
      <div className="glass-card rounded-3xl p-10 w-full max-w-md animate-fade-in-scale" style={{ minHeight: '500px' }} />
    );
  }

  return (
    <div 
      className="glass-card rounded-3xl p-8 w-full max-w-md animate-fade-in-up form-container"
      style={{ 
        animationDelay: '0.1s',
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
    >
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div 
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-baby-blue/20 to-baby-blue-light/10 flex items-center justify-center mx-auto"
            style={{
              boxShadow: '0 0 40px rgba(137, 207, 240, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <svg className="w-8 h-8 text-baby-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2 tracking-tight">
          {isSignUp ? 'Criar Conta' : 'Bem-vindo de Volta'}
        </h1>
        <p className="text-text-secondary text-sm">
          {isSignUp ? 'Junte-se a nós e comece sua jornada' : 'Entre para continuar'}
        </p>
      </div>

      <div className="relative mb-8 rounded-2xl p-1 bg-gradient-to-r from-baby-blue/5 via-baby-blue/10 to-baby-blue/5 border border-baby-blue/10">
        <div 
          className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-baby-blue/15 to-baby-blue/10 border border-baby-blue/20 transition-all duration-400 ease-out"
          style={{ 
            width: 'calc(50% - 2px)',
            left: isSignUp ? 'calc(50% + 2px)' : '2px',
          }}
        />
        <div className="relative flex">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 z-10 ${
              !isSignUp 
                ? 'text-text-primary' 
                : 'text-text-secondary/60 hover:text-text-secondary'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => handleTabChange('signup')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 z-10 ${
              isSignUp 
                ? 'text-text-primary' 
                : 'text-text-secondary/60 hover:text-text-secondary'
            }`}
          >
            Cadastrar
          </button>
        </div>
      </div>

      <form key={formKey} className="form-content space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary/80 uppercase tracking-wider">
            Usuário
          </label>
          <Input
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={handleInputChange(setUsername)}
            icon={<UserIcon />}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary/80 uppercase tracking-wider">
            Senha
          </label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handleInputChange(setPassword)}
            icon={<LockIcon />}
            showPasswordToggle
            isPasswordVisible={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>

        {isSignUp && (
          <div 
            className="space-y-2 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <label className="text-xs font-medium text-text-secondary/80 uppercase tracking-wider">
              Confirmar Senha
            </label>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              icon={<LockIcon />}
              showPasswordToggle
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-end">
            <button 
              type="button" 
              className="text-xs text-baby-blue/80 hover:text-baby-blue transition-colors duration-200"
            >
              Esqueceu a senha?
            </button>
          </div>
        )}

        {error && (
          <div 
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in-up error-shake"
          >
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full py-4 rounded-xl text-sm font-semibold relative overflow-hidden transition-all duration-300 disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="loading-spinner" />
              Processando...
            </span>
          ) : (
            isSignUp ? 'Criar Conta' : 'Entrar'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-text-secondary/5">
        <p className="text-center text-text-secondary/60 text-xs">
          {isSignUp ? 'Já tem uma conta?' : "Não tem uma conta?"}{' '}
          <button 
            onClick={() => handleTabChange(isSignUp ? 'login' : 'signup')}
            className="text-baby-blue hover:text-baby-blue-light transition-all duration-200 font-medium"
          >
            {isSignUp ? 'Entrar' : 'Cadastre-se'}
          </button>
        </p>
      </div>
    </div>
  );
}