import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import BridgingStatusCard from '../components/BridgingStatusCard';
import PpraSummaryCard from '../components/PpraSummaryCard';
import IndicatorSummaryCard from '../components/IndicatorSummaryCard';
import SirsUpdateCard from '../components/SirsUpdateCard';
import FinanceSummaryCard from '../components/FinanceSummaryCard';
import StatCard from '../components/StatCard';

const tabs = ['Ringkasan Utama', 'Bridging SATUSEHAT', 'PPRA', 'INM & IKP', 'SIRS Kompetensi', 'Keuangan Bulanan'];

const DASHBOARD_STATUS_COLORS = {
  'Belum Lapor': '#ef4444',
  Draft: '#f59e0b',
  Lengkap: '#22c55e',
  'Perlu Revisi': '#a855f7',
};

const CHART_SERIES = ['Belum Lapor', 'Draft', 'Lengkap', 'Perlu Revisi'];
const RISK_COLORS = ['#ef4444', '#f59e0b', '#22c55e'];

const getProgressScore = (rows, key) => {
  if (!rows.length) return 0;
  const completed = rows.filter((row) => row[key] === 'Lengkap').length;
  return (completed / rows.length) * 100;
};

const DashboardPage = () => {
  const [tab, setTab] = useState(tabs[0]);
  const {
    masterFaskes,
    laporanPeriodikInti,
    laporanBridgingSatusehat,
    laporanPPRA,
    laporanINMIKP,
    laporanSIRSKompetensi,
    laporanKeuanganBulanan,
    issues,
  } = useAppStore();
  const [filters, setFilters] = useState({ kotama: 'ALL', tipe: 'ALL', periode: '2026-03' });

  const faskesFiltered = useMemo(
    () => masterFaskes.filter((f) => (filters.kotama === 'ALL' || f.kotama === filters.kotama) && (filters.tipe === 'ALL' || f.tipeFaskes === filters.tipe)),
    [masterFaskes, filters],
  );
  const faskesIds = new Set(faskesFiltered.map((f) => f.id));
  const byPeriod = (rows) => rows.filter((r) => r.periode === filters.periode && faskesIds.has(r.faskesId));

  const laporanInti = byPeriod(laporanPeriodikInti);
  const bridging = byPeriod(laporanBridgingSatusehat);
  const ppra = byPeriod(laporanPPRA);
  const inmikp = byPeriod(laporanINMIKP);
  const sirs = byPeriod(laporanSIRSKompetensi);
  const finance = byPeriod(laporanKeuanganBulanan);

  const periodLabel = useMemo(() => {
    const [year, month] = filters.periode.split('-');
    return new Date(`${filters.periode}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric', timeZone: 'UTC' }) || `${month}/${year}`;
  }, [filters.periode]);

  const ringkasanUtama = useMemo(() => {
    const totalFaskes = faskesFiltered.length;
    const rsau = faskesFiltered.filter((f) => f.tipeFaskes === 'RSAU').length;
    const fktp = totalFaskes - rsau;

    const totalLaporanPeriodeAktif = laporanInti.length;
    const belumLapor = laporanInti.filter((x) => x.laporanIntiUtama?.statusPelaporan === 'Belum Lapor').length;
    const perluRevisi = laporanInti.filter((x) => x.laporanIntiUtama?.statusPelaporan === 'Perlu Revisi').length;
    const tervalidasi = laporanInti.filter((x) => x.laporanIntiUtama?.statusPelaporan === 'Lengkap').length;

    const riskSet = new Set([
      ...bridging.filter((x) => x.statusBridgingSatusehat === 'Terkendala').map((x) => x.faskesId),
      ...ppra.filter((x) => !x.ppraTimTersedia || !x.ppraAntibiogramTersedia).map((x) => x.faskesId),
      ...inmikp.filter((x) => x.inmPersenKelengkapan < 75).map((x) => x.faskesId),
      ...sirs.filter((x) => x.sirsStatusUpdate === 'Terkendala').map((x) => x.faskesId),
      ...finance.filter((x) => x.financePersenRealisasiAnggaran < 70).map((x) => x.faskesId),
    ]);

    const rataRataProgres =
      (getProgressScore(bridging, 'statusPelaporan')
        + getProgressScore(ppra, 'ppraStatusPelaporan')
        + getProgressScore(inmikp, 'inmIkpStatusPelaporan')
        + getProgressScore(sirs, 'statusPelaporan')
        + getProgressScore(finance, 'financeStatusPelaporan'))
      / 5;

    return {
      totalFaskes,
      rsau,
      fktp,
      totalLaporanPeriodeAktif,
      belumLapor,
      perluRevisi,
      tervalidasi,
      risikoTinggi: riskSet.size,
      rataRataProgres: `${Math.round(rataRataProgres || 0)}%`,
    };
  }, [bridging, finance, faskesFiltered, inmikp, laporanInti, ppra, sirs]);

  const statusPerKotamaData = useMemo(() => {
    const aggregated = new Map();

    laporanInti.forEach((report) => {
      const facility = faskesFiltered.find((f) => f.id === report.faskesId);
      if (!facility) return;
      const status = report.laporanIntiUtama?.statusPelaporan || 'Draft';
      const initialValue = { kotama: facility.kotama, 'Belum Lapor': 0, Draft: 0, Lengkap: 0, 'Perlu Revisi': 0 };
      const current = aggregated.get(facility.kotama) || initialValue;
      if (current[status] !== undefined) current[status] += 1;
      aggregated.set(facility.kotama, current);
    });

    return [...aggregated.values()]
      .sort((a, b) => (b.Lengkap || 0) - (a.Lengkap || 0))
      .slice(0, 8);
  }, [faskesFiltered, laporanInti]);

  const statusImplementasiData = useMemo(() => {
    const counts = faskesFiltered.reduce((acc, facility) => {
      acc[facility.statusImplementasi] = (acc[facility.statusImplementasi] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [faskesFiltered]);

  const kebutuhanPendampinganData = useMemo(() => {
    const categories = [
      { label: 'Bridging', count: bridging.filter((x) => x.kebutuhanPendampinganBridging).length },
      { label: 'PPRA', count: ppra.filter((x) => x.ppraKebutuhanPendampingan).length },
      { label: 'INM & IKP', count: inmikp.filter((x) => x.inmKebutuhanPendampingan).length },
      { label: 'SIRS', count: sirs.filter((x) => x.sirsKebutuhanPendampingan).length },
      { label: 'Keuangan', count: finance.filter((x) => x.financeKebutuhanPendampingan).length },
    ];

    return categories;
  }, [bridging, finance, inmikp, ppra, sirs]);

  const faskesBelumUpdate = useMemo(
    () => sirs
      .filter((item) => item.sirsStatusUpdate === 'Belum Update' || item.sirsStatusUpdate === 'Terkendala')
      .slice(0, 6)
      .map((item) => {
        const facility = faskesFiltered.find((f) => f.id === item.faskesId);
        return {
          id: item.id,
          nama: facility?.namaFaskes || item.faskesId,
          kotama: facility?.kotama || '-',
          status: item.sirsStatusUpdate,
          lastUpdate: new Date(item.sirsTanggalUpdateTerakhir).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
      }),
    [faskesFiltered, sirs],
  );

  const daftarPrioritas = useMemo(() => {
    const byFacilityIssue = issues
      .filter((issue) => faskesIds.has(issue.facilityId) && issue.status !== 'closed')
      .map((issue) => {
        const facility = faskesFiltered.find((f) => f.id === issue.facilityId);
        const severityScore = issue.severity === 'High' ? 3 : issue.severity === 'Medium' ? 2 : 1;
        return {
          id: issue.id,
          nama: facility?.namaFaskes || issue.facilityName,
          kotama: facility?.kotama || '-',
          severity: issue.severity,
          severityScore,
          issue: issue.title,
        };
      })
      .sort((a, b) => b.severityScore - a.severityScore)
      .slice(0, 6);

    return byFacilityIssue;
  }, [faskesFiltered, faskesIds, issues]);

  const renderRingkasanDashboard = () => (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard title="Total Faskes" value={ringkasanUtama.totalFaskes} subtitle="Jangkauan nasional" />
        <StatCard title="Total RSAU" value={ringkasanUtama.rsau} subtitle="Rumah sakit angkatan udara" />
        <StatCard title="Total FKTP" value={ringkasanUtama.fktp} subtitle="Klinik/faskes tingkat pertama" />
        <StatCard title="Laporan Periode Aktif" value={ringkasanUtama.totalLaporanPeriodeAktif} subtitle={periodLabel} />
        <StatCard title="Belum Lapor" value={ringkasanUtama.belumLapor} subtitle="Perlu follow up" />
        <StatCard title="Perlu Revisi" value={ringkasanUtama.perluRevisi} subtitle="Menunggu perbaikan" />
        <StatCard title="Tervalidasi" value={ringkasanUtama.tervalidasi} subtitle="Status lengkap" />
        <StatCard title="Risiko Tinggi" value={ringkasanUtama.risikoTinggi} subtitle="Perlu perhatian prioritas" />
        <StatCard title="Rata-rata Progres" value={ringkasanUtama.rataRataProgres} subtitle="Kumulatif antar modul" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-2">
          <h3 className="text-sm font-semibold text-slate-700">Status laporan per Kotama</h3>
          <p className="mb-3 text-xs text-slate-500">Distribusi Belum Lapor, Draft, Lengkap, dan Perlu Revisi.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusPerKotamaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="kotama" tick={{ fontSize: 11 }} interval={0} angle={-15} height={50} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                {CHART_SERIES.map((seriesKey) => (
                  <Bar key={seriesKey} dataKey={seriesKey} stackId="status" fill={DASHBOARD_STATUS_COLORS[seriesKey]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Status implementasi</h3>
          <p className="mb-3 text-xs text-slate-500">Komposisi kesiapan implementasi sistem di faskes.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusImplementasiData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                  {statusImplementasiData.map((entry, index) => <Cell key={entry.name} fill={RISK_COLORS[index % RISK_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Kebutuhan pendampingan</h3>
          <p className="mb-3 text-xs text-slate-500">Agregasi per modul pada periode aktif.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kebutuhanPendampinganData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Faskes belum update</h3>
          <div className="space-y-3">
            {faskesBelumUpdate.length ? faskesBelumUpdate.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                <p className="text-sm font-medium text-slate-700">{item.nama}</p>
                <p className="text-xs text-slate-500">{item.kotama} • {item.status}</p>
                <p className="text-xs text-slate-500">Update terakhir: {item.lastUpdate}</p>
              </div>
            )) : <p className="text-sm text-slate-500">Semua faskes sudah update.</p>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Daftar prioritas</h3>
          <div className="space-y-3">
            {daftarPrioritas.length ? daftarPrioritas.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                <p className="text-sm font-medium text-slate-700">{item.nama}</p>
                <p className="text-xs text-slate-500">{item.kotama} • Severity: {item.severity}</p>
                <p className="text-xs text-slate-500">{item.issue}</p>
              </div>
            )) : <p className="text-sm text-slate-500">Tidak ada prioritas terbuka.</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    if (tab === 'Ringkasan Utama') return renderRingkasanDashboard();
    if (tab === 'Bridging SATUSEHAT') return <div className="grid gap-3 md:grid-cols-4"><BridgingStatusCard title="Laporan Lengkap" value={bridging.filter((x) => x.statusPelaporan === 'Lengkap').length} /><BridgingStatusCard title="Belum Lapor" value={bridging.filter((x) => x.statusPelaporan === 'Belum Lapor').length} /><BridgingStatusCard title="Faskes Risiko Tinggi" value={bridging.filter((x) => x.statusBridgingSatusehat === 'Terkendala').length} /><BridgingStatusCard title="Butuh Pendampingan" value={bridging.filter((x) => x.kebutuhanPendampinganBridging).length} /></div>;
    if (tab === 'PPRA') return <div className="grid gap-3 md:grid-cols-4"><PpraSummaryCard title="Laporan Lengkap" value={ppra.filter((x) => x.ppraStatusPelaporan === 'Lengkap').length} /><PpraSummaryCard title="Belum Lapor" value={ppra.filter((x) => x.ppraStatusPelaporan === 'Belum Lapor').length} /><PpraSummaryCard title="Risiko Tinggi" value={ppra.filter((x) => !x.ppraTimTersedia || !x.ppraAntibiogramTersedia).length} /><PpraSummaryCard title="Butuh Pendampingan" value={ppra.filter((x) => x.ppraKebutuhanPendampingan).length} /></div>;
    if (tab === 'INM & IKP') return <div className="grid gap-3 md:grid-cols-4"><IndicatorSummaryCard title="Laporan Lengkap" value={inmikp.filter((x) => x.inmIkpStatusPelaporan === 'Lengkap').length} /><IndicatorSummaryCard title="Belum Lapor" value={inmikp.filter((x) => x.inmIkpStatusPelaporan === 'Belum Lapor').length} /><IndicatorSummaryCard title="Capaian Rendah" value={inmikp.filter((x) => x.inmPersenKelengkapan < 75).length} /><IndicatorSummaryCard title="Butuh Pendampingan" value={inmikp.filter((x) => x.inmKebutuhanPendampingan).length} /></div>;
    if (tab === 'SIRS Kompetensi') return <div className="grid gap-3 md:grid-cols-4"><SirsUpdateCard title="Laporan Lengkap" value={sirs.filter((x) => x.statusPelaporan === 'Lengkap').length} /><SirsUpdateCard title="Belum Lapor" value={sirs.filter((x) => x.statusPelaporan === 'Belum Lapor').length} /><SirsUpdateCard title="Terkendala" value={sirs.filter((x) => x.sirsStatusUpdate === 'Terkendala').length} /><SirsUpdateCard title="Butuh Pendampingan" value={sirs.filter((x) => x.sirsKebutuhanPendampingan).length} /></div>;
    if (tab === 'Keuangan Bulanan') return <div className="grid gap-3 md:grid-cols-4"><FinanceSummaryCard title="Laporan Lengkap" value={finance.filter((x) => x.financeStatusPelaporan === 'Lengkap').length} /><FinanceSummaryCard title="Belum Lapor" value={finance.filter((x) => x.financeStatusPelaporan === 'Belum Lapor').length} /><FinanceSummaryCard title="Risiko Tinggi" value={finance.filter((x) => x.financePersenRealisasiAnggaran < 70).length} /><FinanceSummaryCard title="Butuh Pendampingan" value={finance.filter((x) => x.financeKebutuhanPendampingan).length} /></div>;
    return null;
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
