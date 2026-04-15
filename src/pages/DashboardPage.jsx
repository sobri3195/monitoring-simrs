import { AlertTriangle, Building2, CheckCircle2, CircleDashed, Hospital, Stethoscope } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import RiskBadge from '../components/RiskBadge';
import { formatDate } from '../utils/formatters';

const DashboardPage = () => {
  const { facilities } = useAppStore();
  const kpi = useMemo(() => {
    const total = facilities.length;
    const rsau = facilities.filter((f) => f.tipeFaskes === 'RSAU').length;
    const fktp = facilities.filter((f) => f.tipeFaskes === 'FKTP').length;
    const goLive = facilities.filter((f) => ['Go Live', 'Stabilisasi', 'Selesai'].includes(f.statusImplementasi)).length;
    const onProgress = facilities.filter((f) => !['Belum Mulai', 'Selesai'].includes(f.statusImplementasi)).length;
    const highRisk = facilities.filter((f) => f.levelRisiko === 'Tinggi').length;
    const avg = Math.round(facilities.reduce((a, b) => a + b.progressPersen, 0) / total);
    return { total, rsau, fktp, goLive, onProgress, highRisk, avg };
  }, [facilities]);

  const statusChart = useMemo(() => Object.entries(facilities.reduce((acc, f) => ({ ...acc, [f.statusImplementasi]: (acc[f.statusImplementasi] || 0) + 1 }), {})).map(([name, value]) => ({ name, value })), [facilities]);
  const kotamaChart = useMemo(() => Object.entries(facilities.reduce((acc, f) => ({ ...acc, [f.kotama]: (acc[f.kotama] || 0) + 1 }), {})).map(([name, total]) => ({ name, total })), [facilities]);
  const soonGoLive = [...facilities].sort((a, b) => new Date(a.targetGoLive) - new Date(b.targetGoLive)).slice(0, 8);
  const highRiskList = facilities.filter((f) => f.levelRisiko === 'Tinggi').slice(0, 8);
  const latestUpdate = [...facilities].sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)).slice(0, 8);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Fasilitas" value={kpi.total} icon={Building2} />
        <StatCard title="Total RSAU" value={kpi.rsau} icon={Hospital} />
        <StatCard title="Total FKTP" value={kpi.fktp} icon={Stethoscope} />
        <StatCard title="Sudah Go-Live" value={kpi.goLive} icon={CheckCircle2} />
        <StatCard title="On Progress" value={kpi.onProgress} icon={CircleDashed} />
        <StatCard title="Belum Mulai" value={kpi.total - kpi.onProgress - facilities.filter((f)=>f.statusImplementasi==='Selesai').length} icon={CircleDashed} />
        <StatCard title="Risiko Tinggi" value={kpi.highRisk} icon={AlertTriangle} />
        <StatCard title="Rata-rata Progress" value={`${kpi.avg}%`} icon={CheckCircle2} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-brand-900">Distribusi Status Implementasi</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChart} dataKey="value" nameKey="name" outerRadius={100}>
                  {statusChart.map((_, i) => <Cell key={i} fill={['#0ea5e9','#22c55e','#f59e0b','#ef4444','#6366f1','#14b8a6','#8b5cf6','#f97316','#10b981','#84cc16','#64748b'][i%11]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-brand-900">Fasilitas per Kotama/Jajaran</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kotamaChart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="total" fill="#173b6b" /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="mb-2 font-semibold">Segera Go-Live</h3>{soonGoLive.map((f)=><div key={f.id} className="mb-2 rounded bg-slate-50 p-2 text-sm"><p className="font-medium">{f.namaFaskes}</p><p className="text-xs text-slate-500">Target: {formatDate(f.targetGoLive)}</p></div>)}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="mb-2 font-semibold">Risiko Tinggi</h3>{highRiskList.map((f)=><div key={f.id} className="mb-2 flex items-center justify-between rounded bg-slate-50 p-2 text-sm"><span>{f.namaFaskes}</span><RiskBadge risk={f.levelRisiko} /></div>)}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="mb-2 font-semibold">Update Terbaru</h3>{latestUpdate.map((f)=><div key={f.id} className="mb-2 rounded bg-slate-50 p-2 text-sm"><p className="font-medium">{f.namaFaskes}</p><div className="flex items-center justify-between"><StatusBadge status={f.statusImplementasi} /><span className="text-xs text-slate-500">{formatDate(f.lastUpdate)}</span></div></div>)}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
