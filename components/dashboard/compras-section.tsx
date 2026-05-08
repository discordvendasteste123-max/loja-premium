'use client';

const comprasMock = [
  { id: '1', produto: 'Curso Premium', data: '15/04/2026', valor: 'R$ 297,00', status: 'Concluído' },
  { id: '2', produto: 'Acesso Vitalício', data: '10/03/2026', valor: 'R$ 497,00', status: 'Concluído' },
  { id: '3', produto: 'Bônus Exclusivo', data: '01/05/2026', valor: 'R$ 97,00', status: 'Pendente' },
];

const statusColors: Record<string, string> = {
  'Concluído': 'bg-green-500/10 text-green-400',
  'Pendente': 'bg-yellow-500/10 text-yellow-400',
  'Cancelado': 'bg-red-500/10 text-red-400',
};

export function ComprasSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Compras</h2>
        <p className="text-xs text-text-secondary">Histórico de suas aquisições</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-text-primary">3</p>
          <p className="text-[10px] text-text-secondary mt-1">Total</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-lg font-bold text-text-primary">R$ 891</p>
          <p className="text-[10px] text-text-secondary mt-1">Gasto</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-yellow-400">1</p>
          <p className="text-[10px] text-text-secondary mt-1">Pendente</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-text-primary px-1">Histórico</h3>
        <div className="glass-card rounded-xl overflow-hidden divide-y divide-cyan-primary/5">
          {comprasMock.map((compra) => (
            <div key={compra.id} className="p-4 flex items-center justify-between hover:bg-cyan-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-cyan-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">{compra.produto}</p>
                  <p className="text-xs text-text-secondary/60">{compra.data}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold text-text-primary">{compra.valor}</span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusColors[compra.status]}`}>
                  {compra.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}