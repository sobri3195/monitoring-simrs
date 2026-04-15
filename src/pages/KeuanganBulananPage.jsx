import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { withFaskesName } from './moduleUtils';
import FinanceSummaryCard from '../components/FinanceSummaryCard';
import FinanceTrendChart from '../components/FinanceTrendChart';
import FinanceReportTable from '../components/FinanceReportTable';

const KeuanganBulananPage = () => {
  const { laporanKeuanganBulanan, masterFaskes } = useAppStore();
  const rows = useMemo(() => withFaskesName(laporanKeuanganBulanan, masterFaskes), [laporanKeuanganBulanan, masterFaskes]);
  const latest = Object.values(rows.reduce((a, b) => ((!a[b.faskesId] || b.periode > a[b.faskesId].periode) ? { ...a, [b.faskesId]: b } : a), {}));
  const trend = ['2026-01', '2026-02', '2026-03'].map((p) => {
    const periodRows = rows.filter((r) => r.periode === p);
    return { periode: p, pendapatan: periodRows.reduce((a, b) => a + b.financeTotalPendapatan, 0), belanja: periodRows.reduce((a, b) => a + b.financeTotalBelanjaOperasional + b.financeTotalBelanjaModal, 0) };
  });

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Laporan Keuangan Bulanan & Rekap Keuangan Nasional</h2><div className="grid gap-3 md:grid-cols-4"><FinanceSummaryCard title="Faskes Sudah Lapor" value={latest.filter((x) => x.financeStatusPelaporan === 'Lengkap').length} /><FinanceSummaryCard title="Agregat Pendapatan" value={latest.reduce((a, b) => a + b.financeTotalPendapatan, 0).toLocaleString('id-ID')} /><FinanceSummaryCard title="Agregat Belanja" value={latest.reduce((a, b) => a + b.financeTotalBelanjaOperasional + b.financeTotalBelanjaModal, 0).toLocaleString('id-ID')} /><FinanceSummaryCard title="Rata-rata Realisasi" value={`${Math.round(latest.reduce((a, b) => a + b.financePersenRealisasiAnggaran, 0) / latest.length)}%`} /></div><div className="rounded-xl border bg-white p-4"><FinanceTrendChart data={trend} /></div><FinanceReportTable rows={latest} /><div className="rounded-xl border bg-white p-4 text-sm">Detail Keuangan per Faskes: {latest.slice(0, 8).map((r) => <Link key={r.id} className="mr-3 text-brand-700 underline" to={`/keuangan-bulanan/${r.id}`}>{r.namaFaskes}</Link>)}</div></div>;
};

export default KeuanganBulananPage;
