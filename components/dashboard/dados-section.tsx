'use client';

import { useState } from 'react';

export function DadosSection() {
  const [activeTab, setActiveTab] = useState<'dados' | 'seguranca'>('dados');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Dados</h2>
        <p className="text-xs text-text-secondary">Suas informações e configurações</p>
      </div>

      <div className="flex gap-1 p-1 glass-card rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('dados')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'dados' ? 'bg-cyan-primary/15 text-cyan-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Dados
        </button>
        <button
          onClick={() => setActiveTab('seguranca')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'seguranca' ? 'bg-cyan-primary/15 text-cyan-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Segurança
        </button>
      </div>

      {activeTab === 'dados' && (
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">Nome Completo</label>
            <input type="text" defaultValue="Usuário Nexus" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">Telefone</label>
            <input type="tel" placeholder="(00) 00000-0000" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">CPF</label>
            <input type="text" placeholder="000.000.000-00" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <button className="btn-primary w-full py-3 rounded-lg text-sm font-semibold">Salvar Alterações</button>
        </div>
      )}

      {activeTab === 'seguranca' && (
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">Senha Atual</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">Nova Senha</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-text-secondary/60 uppercase block mb-1.5">Confirmar Senha</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 transition-all" />
          </div>
          <button className="btn-primary w-full py-3 rounded-lg text-sm font-semibold">Atualizar Senha</button>
        </div>
      )}
    </div>
  );
}