import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import BridgingStatusCard from '../components/BridgingStatusCard';
import PpraSummaryCard from '../components/PpraSummaryCard';
import IndicatorSummaryCard from '../components/IndicatorSummaryCard';
import SirsUpdateCard from '../components/SirsUpdateCard';
import FinanceSummaryCard from '../components/FinanceSummaryCard';

const tabs = ['Ringkasan Utama', 'Bridging SATUSEHAT', 'PPRA', 'INM & IKP', 'SIRS Kompetensi', 'Keuangan Bulanan'];

const DashboardPage = () => {
  const [tab, setTab] = useState(tabs[0]);
  const { masterFaskes, laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan } = useAppStore();
  const [filters, setFilters] = useState({ kotama: 'ALL', tipe: 'ALL', periode: '2026-03' });

  const faskesFiltered = useMemo(() => masterFaskes.filter((f) => (filters.kotama === 'ALL' || f.kotama === filters.kotama) && (filters.tipe === 'ALL' || f.tipeFaskes === filters.tipe)), [masterFaskes, filters]);
  const faskesIds = new Set(faskesFiltered.map((f) => f.id));
  const byPeriod = (rows) => rows.filter((r) => r.periode === filters.periode && faskesIds.has(r.faskesId));

  const bridging = byPeriod(laporanBridgingSatusehat);
  const ppra = byPeriod(laporanPPRA);
  const inmikp = byPeriod(laporanINMIKP);
  const sirs = byPeriod(laporanSIRSKompetensi);
  const finance = byPeriod(laporanKeuanganBulanan);

  const renderTab = () => {
    if (tab === 'Bridging SATUSEHAT') return <div className="grid gap-3 md:grid-cols-4"><BridgingStatusCard title="Laporan Lengkap" value={bridging.filter((x) => x.statusPelaporan === 'Lengkap').length} /><BridgingStatusCard title="Belum Lapor" value={bridging.filter((x) => x.statusPelaporan === 'Belum Lapor').length} /><BridgingStatusCard title="Faskes Risiko Tinggi" value={bridging.filter((x) => x.statusBridgingSatusehat === 'Terkendala').length} /><BridgingStatusCard title="Butuh Pendampingan" value={bridging.filter((x) => x.kebutuhanPendampinganBridging).length} /></div>;
    if (tab === 'PPRA') return <div className="grid gap-3 md:grid-cols-4"><PpraSummaryCard title="Laporan Lengkap" value={ppra.filter((x) => x.ppraStatusPelaporan === 'Lengkap').length} /><PpraSummaryCard title="Belum Lapor" value={ppra.filter((x) => x.ppraStatusPelaporan === 'Belum Lapor').length} /><PpraSummaryCard title="Risiko Tinggi" value={ppra.filter((x) => !x.ppraTimTersedia || !x.ppraAntibiogramTersedia).length} /><PpraSummaryCard title="Butuh Pendampingan" value={ppra.filter((x) => x.ppraKebutuhanPendampingan).length} /></div>;
    if (tab === 'INM & IKP') return <div className="grid gap-3 md:grid-cols-4"><IndicatorSummaryCard title="Laporan Lengkap" value={inmikp.filter((x) => x.inmIkpStatusPelaporan === 'Lengkap').length} /><IndicatorSummaryCard title="Belum Lapor" value={inmikp.filter((x) => x.inmIkpStatusPelaporan === 'Belum Lapor').length} /><IndicatorSummaryCard title="Capaian Rendah" value={inmikp.filter((x) => x.inmPersenKelengkapan < 75).length} /><IndicatorSummaryCard title="Butuh Pendampingan" value={inmikp.filter((x) => x.inmKebutuhanPendampingan).length} /></div>;
    if (tab === 'SIRS Kompetensi') return <div className="grid gap-3 md:grid-cols-4"><SirsUpdateCard title="Laporan Lengkap" value={sirs.filter((x) => x.statusPelaporan === 'Lengkap').length} /><SirsUpdateCard title="Belum Lapor" value={sirs.filter((x) => x.statusPelaporan === 'Belum Lapor').length} /><SirsUpdateCard title="Terkendala" value={sirs.filter((x) => x.sirsStatusUpdate === 'Terkendala').length} /><SirsUpdateCard title="Butuh Pendampingan" value={sirs.filter((x) => x.sirsKebutuhanPendampingan).length} /></div>;
    if (tab === 'Keuangan Bulanan') return <div className="grid gap-3 md:grid-cols-4"><FinanceSummaryCard title="Laporan Lengkap" value={finance.filter((x) => x.financeStatusPelaporan === 'Lengkap').length} /><FinanceSummaryCard title="Belum Lapor" value={finance.filter((x) => x.financeStatusPelaporan === 'Belum Lapor').length} /><FinanceSummaryCard title="Risiko Tinggi" value={finance.filter((x) => x.financePersenRealisasiAnggaran < 70).length} /><FinanceSummaryCard title="Butuh Pendampingan" value={finance.filter((x) => x.financeKebutuhanPendampingan).length} /></div>;
    return <div className="grid gap-3 md:grid-cols-4"><BridgingStatusCard title="Total Faskes" value={faskesFiltered.length} /><BridgingStatusCard title="RSAU" value={faskesFiltered.filter((f) => f.tipeFaskes === 'RSAU').length} /><BridgingStatusCard title="FKTP" value={faskesFiltered.filter((f) => f.tipeFaskes === 'FKTP').length} /><BridgingStatusCard title="Periode" value={filters.periode} /></div>;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dashboard Nasional</h2>
      <div className="grid gap-2 rounded-xl border bg-white p-3 md:grid-cols-3">
        <select className="rounded border px-2 py-2 text-sm" value={filters.kotama} onChange={(e) => setFilters((s) => ({ ...s, kotama: e.target.value }))}><option value="ALL">Semua Kotama</option>{[...new Set(masterFaskes.map((f) => f.kotama))].map((k) => <option key={k}>{k}</option>)}</select>
        <select className="rounded border px-2 py-2 text-sm" value={filters.tipe} onChange={(e) => setFilters((s) => ({ ...s, tipe: e.target.value }))}><option value="ALL">Semua Tipe Faskes</option><option value="RSAU">RSAU</option><option value="FKTP">FKTP</option></select>
        <select className="rounded border px-2 py-2 text-sm" value={filters.periode} onChange={(e) => setFilters((s) => ({ ...s, periode: e.target.value }))}><option>2026-01</option><option>2026-02</option><option>2026-03</option></select>
      </div>
      <div className="flex flex-wrap gap-2">{tabs.map((t) => <button key={t} className={`rounded-full px-3 py-1 text-sm ${tab === t ? 'bg-brand-700 text-white' : 'bg-white border'}`} onClick={() => setTab(t)}>{t}</button>)}</div>
      {renderTab()}
    </div>
  );
};

export default DashboardPage;
