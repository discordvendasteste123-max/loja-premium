'use client';

import { useState } from 'react';

export function AfiliadosSection() {
  const [copied, setCopied] = useState(false);
  const linkPadrao = 'https://nexus.com/ref=user123';

  const handleCopy = () => {
    navigator.clipboard.writeText(linkPadrao);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Afiliados</h2>
        <p className="text-xs text-text-secondary">Ganhe comissões indicando usuários</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Seu Link de Afiliado</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <input type="text" value={linkPadrao} readOnly className="flex-1 px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary" />
          <button onClick={handleCopy} className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap">
            {copied ? '✓ Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-text-primary">1.234</p>
          <p className="text-xs text-text-secondary mt-1">Cliques</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-text-primary">89</p>
          <p className="text-xs text-text-secondary mt-1">Conversões</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">R$ 2.450</p>
          <p className="text-xs text-text-secondary mt-1">Ganhos</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-text-primary">7.2%</p>
          <p className="text-xs text-text-secondary mt-1">Taxa</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Como Funciona</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-cyan-primary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-cyan-primary">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Compartilhe seu link</p>
              <p className="text-xs text-text-secondary mt-0.5">Copie e envie para amigos</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-cyan-primary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-cyan-primary">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Amigos se cadastram</p>
              <p className="text-xs text-text-secondary mt-0.5">Quando clicam no seu link</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-cyan-primary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-cyan-primary">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Você ganha comissões</p>
              <p className="text-xs text-text-secondary mt-0.5">7% em todas as compras</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}