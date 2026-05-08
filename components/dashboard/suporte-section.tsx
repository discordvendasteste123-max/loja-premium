'use client';

import { useState } from 'react';

const faqs = [
  { q: 'Como funciona o Nexus?', a: 'O Nexus é uma plataforma premium de conteúdo e serviços.' },
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim, você pode cancelar quando quiser.' },
  { q: 'Como recebo suporte?', a: 'Clique no botão abaixo para abrir um ticket.' },
];

export function SuporteSection() {
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Suporte</h2>
        <p className="text-xs text-text-secondary">Estamos aqui para ajudar</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex flex-col items-center text-center py-4">
          <button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-primary to-cyan-light flex items-center justify-center shadow-lg shadow-cyan-primary/30 hover:scale-105 transition-transform"
          >
            <svg className="w-7 h-7 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
          <h3 className="text-sm font-semibold text-text-primary mt-4">Precisa de ajuda?</h3>
          <p className="text-xs text-text-secondary mb-4">Clique no botão para abrir um ticket</p>
          <button onClick={() => setChatOpen(true)} className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            Abrir Suporte
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Perguntas Frequentes</h4>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-cyan-primary/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-cyan-primary/5 transition-colors"
              >
                <span className="text-sm font-medium text-text-primary">{faq.q}</span>
                <svg className={`w-4 h-4 text-text-secondary transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-3">
                  <p className="text-sm text-text-secondary">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setChatOpen(false)}>
          <div className="glass-card rounded-xl w-full max-w-sm p-5 animate-fade-in-scale" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">Abrir Ticket de Suporte</h3>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-cyan-primary/10 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-text-secondary/60 uppercase block mb-1.5">Assunto</label>
                <input type="text" placeholder="Qual o problema?" className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary/60 uppercase block mb-1.5">Mensagem</label>
                <textarea rows={3} placeholder="Descreva seu problema..." className="w-full px-3 py-2.5 rounded-lg bg-cyan-primary/5 border border-cyan-primary/10 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-cyan-primary/30 resize-none" />
              </div>
              <button className="btn-primary w-full py-3 rounded-lg text-sm font-semibold">Enviar Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}