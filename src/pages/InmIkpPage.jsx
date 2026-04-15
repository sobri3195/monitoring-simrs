import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { withFaskesName } from './moduleUtils';
import IndicatorSummaryCard from '../components/IndicatorSummaryCard';
import IndicatorRecapChart from '../components/IndicatorRecapChart';
import IndicatorGapList from '../components/IndicatorGapList';

const InmIkpPage = () => {
  const { laporanINMIKP, masterFaskes } = useAppStore();
  const rows = useMemo(() => withFaskesName(laporanINMIKP, masterFaskes), [laporanINMIKP, masterFaskes]);
  const latest = Object.values(rows.reduce((a, b) => ((!a[b.faskesId] || b.periode > a[b.faskesId].periode) ? { ...a, [b.faskesId]: b } : a), {}));
  const chart = [{ name: 'Sudah Lapor', value: latest.filter((x) => x.inmIkpStatusPelaporan === 'Lengkap').length }, { name: 'Belum Lengkap', value: latest.filter((x) => x.inmIkpStatusPelaporan !== 'Lengkap').length }];
  const gap = Object.entries(latest.flatMap((x) => x.indikatorDinamis).filter((i) => i.statusCapaian !== 'Tercapai').reduce((a, b) => ({ ...a, [b.namaIndikator]: (a[b.namaIndikator] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Pelaporan INM & IKP</h2><div className="grid gap-3 md:grid-cols-4"><IndicatorSummaryCard title="Jumlah Faskes Sudah Lapor" value={chart[0].value} /><IndicatorSummaryCard title="Rata-rata Kelengkapan" value={`${Math.round(latest.reduce((a, b) => a + b.inmPersenKelengkapan, 0) / latest.length)}%`} /><IndicatorSummaryCard title="Faskes Capaian Rendah" value={latest.filter((x) => x.inmPersenKelengkapan < 75).length} /><IndicatorSummaryCard title="Rekap Kotama" value={new Set(latest.map((x) => x.kotama)).size} /></div><div className="grid gap-4 lg:grid-cols-2"><div className="rounded-xl border bg-white p-4"><IndicatorRecapChart data={chart} /></div><IndicatorGapList rows={gap.slice(0, 6)} /></div><div className="rounded-xl border bg-white p-4 text-sm">Detail Capaian Indikator per Faskes: {latest.slice(0, 8).map((r) => <Link key={r.id} className="mr-3 text-brand-700 underline" to={`/inm-ikp/${r.id}`}>{r.namaFaskes}</Link>)}</div></div>;
};

export default InmIkpPage;
