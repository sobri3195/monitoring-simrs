import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Activity, AlertTriangle, Building2, ClipboardCheck, Hospital, Layers3 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import BridgingStatusCard from '../components/BridgingStatusCard';
import PpraSummaryCard from '../components/PpraSummaryCard';
import IndicatorSummaryCard from '../components/IndicatorSummaryCard';
import SirsUpdateCard from '../components/SirsUpdateCard';
import FinanceSummaryCard from '../components/FinanceSummaryCard';
import StatCard from '../components/StatCard';
import AlertStatCard from '../components/AlertStatCard';
import ComplianceStatCard from '../components/ComplianceStatCard';
import FilterToolbar from '../components/FilterToolbar';
import ChartCard from '../components/ChartCard';
import ListCard from '../components/ListCard';
import RiskBadge from '../components/RiskBadge';
import StatusBadge from '../components/StatusBadge';
import ModuleBadge from '../components/ModuleBadge';
import { getModuleReports } from '../services/reportService';
import PageHeader from '../components/PageHeader';
import { CHART_SERIES, DASHBOARD_IMPLEMENTATION_COLORS, DASHBOARD_PERIOD_OPTIONS, DASHBOARD_STATUS_COLORS, DASHBOARD_TABS } from '../constants/appConstants';

const getProgressScore = (rows, key) => {
  if (!rows.length) return 0;
  const completed = rows.filter((row) => row[key] === 'Lengkap').length;
  return (completed / rows.length) * 100;
};

const DashboardPage = () => {
  const [tab, setTab] = useState(DASHBOARD_TABS[0]);
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
  const facilityIds = [...faskesIds];
  const laporanInti = getModuleReports({ store: { laporanPeriodikInti }, module: 'inti', period: filters.periode, facilityIds });
  const bridging = getModuleReports({ store: { laporanBridgingSatusehat }, module: 'bridging', period: filters.periode, facilityIds });
  const ppra = getModuleReports({ store: { laporanPPRA }, module: 'ppra', period: filters.periode, facilityIds });
  const inmikp = getModuleReports({ store: { laporanINMIKP }, module: 'inmikp', period: filters.periode, facilityIds });
  const sirs = getModuleReports({ store: { laporanSIRSKompetensi }, module: 'sirs', period: filters.periode, facilityIds });
  const finance = getModuleReports({ store: { laporanKeuanganBulanan }, module: 'keuangan', period: filters.periode, facilityIds });

  const periodLabel = useMemo(() => new Date(`${filters.periode}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric', timeZone: 'UTC' }), [filters.periode]);

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

    const rataRataProgres = (
      getProgressScore(bridging, 'statusPelaporan')
      + getProgressScore(ppra, 'ppraStatusPelaporan')
      + getProgressScore(inmikp, 'inmIkpStatusPelaporan')
      + getProgressScore(sirs, 'statusPelaporan')
      + getProgressScore(finance, 'financeStatusPelaporan')
    ) / 5;

    return {
      totalFaskes,
      rsau,
      fktp,
      totalLaporanPeriodeAktif,
      belumLapor,
      perluRevisi,
      tervalidasi,
      risikoTinggi: riskSet.size,
      rataRataProgres: Math.round(rataRataProgres || 0),
    };
  }, [bridging, finance, faskesFiltered, inmikp, laporanInti, ppra, sirs]);

  const statusPerKotamaData = useMemo(() => {
    const aggregated = new Map();

    laporanInti.forEach((report) => {
      const facility = faskesFiltered.find((f) => f.id === report.faskesId);
      if (!facility) return;
      const status = report.laporanIntiUtama?.statusPelaporan || 'Draft';
      const current = aggregated.get(facility.kotama) || { kotama: facility.kotama, 'Belum Lapor': 0, Draft: 0, Lengkap: 0, 'Perlu Revisi': 0 };
      if (current[status] !== undefined) current[status] += 1;
      aggregated.set(facility.kotama, current);
    });

    return [...aggregated.values()].sort((a, b) => (b.Lengkap || 0) - (a.Lengkap || 0)).slice(0, 8);
  }, [faskesFiltered, laporanInti]);

  const statusImplementasiData = useMemo(() => {
    const counts = faskesFiltered.reduce((acc, facility) => {
      acc[facility.statusImplementasi] = (acc[facility.statusImplementasi] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [faskesFiltered]);

  const kebutuhanPendampinganData = useMemo(() => ([
    { label: 'Bridging', count: bridging.filter((x) => x.kebutuhanPendampinganBridging).length },
    { label: 'PPRA', count: ppra.filter((x) => x.ppraKebutuhanPendampingan).length },
    { label: 'INM & IKP', count: inmikp.filter((x) => x.inmKebutuhanPendampingan).length },
    { label: 'SIRS', count: sirs.filter((x) => x.sirsKebutuhanPendampingan).length },
    { label: 'Keuangan', count: finance.filter((x) => x.financeKebutuhanPendampingan).length },
  ]), [bridging, finance, inmikp, ppra, sirs]);

  const faskesBelumUpdate = useMemo(() => sirs
    .filter((item) => item.sirsStatusUpdate === 'Belum Update' || item.sirsStatusUpdate === 'Terkendala')
    .slice(0, 5)
    .map((item) => {
      const facility = faskesFiltered.find((f) => f.id === item.faskesId);
      return {
        id: item.id,
        nama: facility?.namaFaskes || item.faskesId,
        kotama: facility?.kotama || '-',
        status: item.sirsStatusUpdate,
        lastUpdate: new Date(item.sirsTanggalUpdateTerakhir).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
    }), [faskesFiltered, sirs]);

  const daftarPrioritas = useMemo(() => issues
    .filter((issue) => faskesIds.has(issue.facilityId) && issue.status !== 'closed')
    .map((issue) => {
      const facility = faskesFiltered.find((f) => f.id === issue.facilityId);
      return {
        id: issue.id,
        nama: facility?.namaFaskes || issue.facilityName,
        kotama: facility?.kotama || '-',
        severity: issue.severity,
        issue: issue.title,
      };
    })
    .sort((a, b) => (a.severity < b.severity ? 1 : -1))
    .slice(0, 5), [faskesFiltered, faskesIds, issues]);

  const renderRingkasanDashboard = () => (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Faskes" value={ringkasanUtama.totalFaskes} subtitle="Jangkauan nasional" icon={Hospital} tone="info" />
        <StatCard title="Total RSAU" value={ringkasanUtama.rsau} subtitle="Rumah sakit AU" icon={Building2} tone="default" />
        <StatCard title="Total FKTP" value={ringkasanUtama.fktp} subtitle="Faskes tingkat pertama" icon={Layers3} tone="default" />
        <AlertStatCard title="Belum Lapor" value={ringkasanUtama.belumLapor} subtitle="Perlu follow-up cepat" trend={{ direction: ringkasanUtama.belumLapor > 0 ? 'up' : 'down', value: `${ringkasanUtama.belumLapor} kasus` }} />
        <AlertStatCard title="Risiko Tinggi" value={ringkasanUtama.risikoTinggi} subtitle="Prioritas pembinaan" trend={{ direction: ringkasanUtama.risikoTinggi > 0 ? 'up' : 'down', value: `${ringkasanUtama.risikoTinggi} faskes` }} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ComplianceStatCard title="Tervalidasi" value={ringkasanUtama.tervalidasi} subtitle={periodLabel} score={ringkasanUtama.rataRataProgres} />
        <StatCard title="Perlu Revisi" value={ringkasanUtama.perluRevisi} subtitle="Menunggu perbaikan" icon={AlertTriangle} tone="warning" />
        <StatCard title="Laporan Periode Aktif" value={ringkasanUtama.totalLaporanPeriodeAktif} subtitle={periodLabel} icon={ClipboardCheck} tone="success" />
        <StatCard title="Rata-rata Progres" value={`${ringkasanUtama.rataRataProgres}%`} subtitle="Kumulatif antar modul" icon={Activity} tone="info" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard title="Status laporan per Kotama" subtitle="Distribusi Belum Lapor, Draft, Lengkap, Perlu Revisi" action={<ModuleBadge module={tab} />}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusPerKotamaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="kotama" tick={{ fontSize: 11 }} interval={0} angle={-10} height={45} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {CHART_SERIES.map((seriesKey) => (
                  <Bar key={seriesKey} dataKey={seriesKey} stackId="status" fill={DASHBOARD_STATUS_COLORS[seriesKey]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Status implementasi" subtitle="Komposisi kesiapan implementasi sistem di faskes">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusImplementasiData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={95} label>
                  {statusImplementasiData.map((entry, index) => <Cell key={entry.name} fill={DASHBOARD_IMPLEMENTATION_COLORS[index % DASHBOARD_IMPLEMENTATION_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Kebutuhan pendampingan" subtitle="Agregasi kebutuhan pembinaan per modul" summary={<StatusBadge status="Direview" />}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kebutuhanPendampinganData} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="label" type="category" width={85} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Faskes belum update" subtitle="Monitor unit yang belum melakukan pembaruan SIRS">
          <div className="space-y-3">
            {faskesBelumUpdate.length
              ? faskesBelumUpdate.map((item) => (
                <ListCard
                  key={item.id}
                  color={item.status === 'Terkendala' ? 'border-rose-500' : 'border-amber-500'}
                  title={item.nama}
                  meta={`${item.kotama} • Update terakhir ${item.lastUpdate}`}
                  badges={<StatusBadge status={item.status === 'Terkendala' ? 'Perlu Revisi' : 'Draft'} />}
                />
              ))
              : <p className="text-sm text-slate-500">Semua faskes sudah update.</p>}
          </div>
        </ChartCard>

        <ChartCard title="Daftar prioritas" subtitle="Isu prioritas tinggi yang perlu eskalasi lintas fungsi">
          <div className="space-y-3">
            {daftarPrioritas.length
              ? daftarPrioritas.map((item) => (
                <ListCard
                  key={item.id}
                  color={item.severity === 'High' ? 'border-rose-500' : item.severity === 'Medium' ? 'border-amber-500' : 'border-emerald-500'}
                  title={item.nama}
                  meta={`${item.kotama} • Isu operasional`}
                  description={item.issue}
                  badges={<RiskBadge risk={item.severity} />}
                />
              ))
              : <p className="text-sm text-slate-500">Tidak ada prioritas terbuka.</p>}
          </div>
        </ChartCard>
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
    <div className="space-y-5">
      <PageHeader
        title="Dashboard Nasional"
        description="Monitoring kepatuhan, risiko, dan progres pelaporan faskes TNI AU secara terintegrasi."
        breadcrumbs={[{ label: 'Dashboard' }]}
        meta={<ModuleBadge module={tab} />}
      />

      <FilterToolbar onReset={() => setFilters({ kotama: 'ALL', tipe: 'ALL', periode: '2026-03' })}>
        <label className="space-y-1 text-xs font-semibold text-slate-500">
          Kotama
          <select className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700" value={filters.kotama} onChange={(e) => setFilters((s) => ({ ...s, kotama: e.target.value }))}>
            <option value="ALL">Semua Kotama</option>
            {[...new Set(masterFaskes.map((f) => f.kotama))].map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-500">
          Tipe Faskes
          <select className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700" value={filters.tipe} onChange={(e) => setFilters((s) => ({ ...s, tipe: e.target.value }))}>
            <option value="ALL">Semua Tipe</option>
            <option value="RSAU">RSAU</option>
            <option value="FKTP">FKTP</option>
          </select>
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-500">
          Periode
          <select className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700" value={filters.periode} onChange={(e) => setFilters((s) => ({ ...s, periode: e.target.value }))}>
            {DASHBOARD_PERIOD_OPTIONS.map((period) => <option key={period}>{period}</option>)}
          </select>
        </label>
      </FilterToolbar>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {DASHBOARD_TABS.map((t) => (
          <button
            key={t}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${tab === t ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {renderTab()}
    </div>
  );
};

export default DashboardPage;
