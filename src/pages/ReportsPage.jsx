import { Download, Printer } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const ReportsPage = () => {
  const { facilities } = useAppStore();

  const exportCsv = () => {
    const header = ['id','namaFaskes','tipeFaskes','kotama','statusImplementasi','progressPersen','targetGoLive'];
    const rows = facilities.map((f) => header.map((h) => f[h]).join(','));
    const blob = new Blob([[header.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rekap-monitoring-simrs.csv';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold text-brand-900">Rekap Nasional & Per Kotama</h2>
        <p className="text-sm text-slate-600">Laporan ringkas siap print dan ekspor CSV untuk kebutuhan rapat monitoring.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm text-white"><Download size={16} /> Export CSV</button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm"><Printer size={16} /> Print Friendly</button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
