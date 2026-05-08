'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export function PerfilSection() {
  const { user } = useAuth();
  const [avatarHover, setAvatarHover] = useState(false);

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuário';
  const initial = username[0]?.toUpperCase() || 'U';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Perfil</h2>
        <p className="text-xs text-text-secondary">Suas informações pessoais</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex flex-col items-center text-center">
          <div 
            className="relative mb-4"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center shadow-lg shadow-cyan-primary/20">
              <span className="text-3xl font-bold text-bg-deep">{initial}</span>
            </div>
            {avatarHover && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            )}
          </div>

          <h3 className="text-base font-semibold text-text-primary">{username}</h3>
          <p className="text-xs text-cyan-primary/80 flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Conta ativa
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-cyan-primary/10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Nome</span>
            <span className="text-xs font-medium text-text-primary">{username}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Email</span>
            <span className="text-xs font-medium text-text-primary truncate max-w-[180px]">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">ID</span>
            <span className="text-xs font-mono text-text-secondary/60 bg-cyan-primary/5 px-2 py-0.5 rounded">{user?.id?.slice(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  );
}