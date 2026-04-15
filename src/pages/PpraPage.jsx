import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { withFaskesName } from './moduleUtils';
import PpraSummaryCard from '../components/PpraSummaryCard';
import PpraComplianceTable from '../components/PpraComplianceTable';
import PpraTrendChart from '../components/PpraTrendChart';

const PpraPage = () => {
  const { laporanPPRA, masterFaskes } = useAppStore();
  const rows = useMemo(() => withFaskesName(laporanPPRA, masterFaskes), [laporanPPRA, masterFaskes]);
  const latest = Object.values(rows.reduce((a, b) => ((!a[b.faskesId] || b.periode > a[b.faskesId].periode) ? { ...a, [b.faskesId]: b } : a), {}));
  const trend = ['2026-01', '2026-02', '2026-03'].map((p) => ({ periode: p, lengkap: rows.filter((r) => r.periode === p && r.ppraStatusPelaporan === 'Lengkap').length }));

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Pelaporan PPRA & Rekap PPRA Nasional</h2><div className="grid gap-3 md:grid-cols-4"><PpraSummaryCard title="Sudah Lapor PPRA" value={latest.filter((x) => x.ppraStatusPelaporan === 'Lengkap').length} /><PpraSummaryCard title="Tim PPRA Aktif" value={latest.filter((x) => x.ppraTimTersedia).length} /><PpraSummaryCard title="Tanpa Antibiogram" value={latest.filter((x) => !x.ppraAntibiogramTersedia).length} /><PpraSummaryCard title="Butuh Pendampingan" value={latest.filter((x) => x.ppraKebutuhanPendampingan).length} /></div><div className="rounded-xl border bg-white p-4"><PpraTrendChart data={trend} /></div><PpraComplianceTable rows={latest.map((r) => ({ ...r, id: r.id + '-x' }))} /><div className="rounded-xl border bg-white p-4 text-sm">Detail PPRA per Faskes: {latest.slice(0, 8).map((r) => <Link key={r.id} className="mr-3 text-brand-700 underline" to={`/ppra/${r.id}`}>{r.namaFaskes}</Link>)}</div></div>;
};

export default PpraPage;
