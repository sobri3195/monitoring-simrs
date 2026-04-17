import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import PageHeader from '../components/PageHeader';
import ComplianceStatCard from '../components/ComplianceStatCard';
import ComplianceScoreCard from '../components/ComplianceScoreCard';
import MonitoringFilterBar from '../components/MonitoringFilterBar';
import ModuleComplianceTable from '../components/ModuleComplianceTable';
import LateReportTable from '../components/LateReportTable';
import SupportNeedTable from '../components/SupportNeedTable';
import { buildLatestUpdateList, computeOverallCompliance, exportToCsv, getModuleStatus, latestByFacility, MODULE_KEYS } from '../utils/compliance';

const tabs = ['Ringkasan Kepatuhan', 'Bridging SATUSEHAT', 'PPRA', 'INM & IKP', 'SIRS Kompetensi', 'Keuangan Bulanan'];

const MonitoringKepatuhanPage = () => {
  const location = useLocation();
  const defaultTabMap = {
    '/monitoring-kepatuhan/bridging': tabs[1],
    '/monitoring-kepatuhan/ppra': tabs[2],
    '/monitoring-kepatuhan/inm-ikp': tabs[3],
    '/monitoring-kepatuhan/sirs-kompetensi': tabs[4],
    '/monitoring-kepatuhan/keuangan': tabs[5],
  };
  const [tab, setTab] = useState(defaultTabMap[location.pathname] || tabs[0]);
  const { masterFaskes, laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan } = useAppStore();
  const [filters, setFilters] = useState({ periode: '2026-03', kotama: 'ALL', statusUmum: 'ALL', statusLaporan: 'ALL', riskLevel: 'ALL', rsauId: 'ALL' });

  const periodList = useMemo(() => [...new Set(laporanBridgingSatusehat.map((r) => r.periode))], [laporanBridgingSatusehat]);
  const rsauList = useMemo(() => masterFaskes.filter((f) => f.tipeFaskes === 'RSAU'), [masterFaskes]);
  const facilityMap = useMemo(() => new Map(masterFaskes.map((f) => [f.id, f])), [masterFaskes]);

  const latest = useMemo(() => ({
    bridging: latestByFacility(laporanBridgingSatusehat, filters.periode),
    ppra: latestByFacility(laporanPPRA, filters.periode),
    inmIkp: latestByFacility(laporanINMIKP, filters.periode),
    sirs: latestByFacility(laporanSIRSKompetensi, filters.periode),
    finance: latestByFacility(laporanKeuanganBulanan, filters.periode),
  }), [filters.periode, laporanBridgingSatusehat, laporanINMIKP, laporanKeuanganBulanan, laporanPPRA, laporanSIRSKompetensi]);

  const complianceRows = useMemo(() => {
    const candidates = rsauList.map((f) => {
      const moduleRows = Object.fromEntries(MODULE_KEYS.map((k) => [k, latest[k].find((r) => r.faskesId === f.id)]));
      const overall = computeOverallCompliance(moduleRows);
      const supportSummary = [moduleRows.bridging?.kebutuhanPendampinganBridging, moduleRows.ppra?.ppraKebutuhanPendampingan, moduleRows.inmIkp?.inmKebutuhanPendampingan, moduleRows.sirs?.sirsKebutuhanPendampingan, moduleRows.finance?.financeKebutuhanPendampingan].filter(Boolean)[0] || '-';
      return {
        faskesId: f.id,
        namaFaskes: f.namaFaskes,
        kotama: f.kotama,
        supportSummary,
        ...overall,
        moduleRows,
      };
    });

    return candidates.filter((row) => {
      if (filters.kotama !== 'ALL' && row.kotama !== filters.kotama) return false;
      if (filters.statusUmum !== 'ALL' && row.statusUmum !== filters.statusUmum) return false;
      if (filters.riskLevel !== 'ALL') {
        const highestRisk = row.highRiskCount > 0 ? 'Tinggi' : row.risks.includes('Sedang') ? 'Sedang' : 'Rendah';
        if (highestRisk !== filters.riskLevel) return false;
      }
      if (filters.rsauId !== 'ALL' && row.faskesId !== filters.rsauId) return false;
      if (filters.statusLaporan !== 'ALL') {
        const hasStatus = MODULE_KEYS.some((k) => getModuleStatus(row.moduleRows[k], k) === filters.statusLaporan);
        if (!hasStatus) return false;
      }
      return true;
    });
  }, [filters, latest, rsauList]);

  const ringkasan = useMemo(() => ({
    total: complianceRows.length,
    patuh: complianceRows.filter((x) => x.statusUmum === 'Patuh').length,
    perhatian: complianceRows.filter((x) => x.statusUmum === 'Perlu Perhatian').length,
    tidakPatuh: complianceRows.filter((x) => x.statusUmum === 'Tidak Patuh').length,
    revisi: complianceRows.filter((x) => x.revisionCount > 0).length,
    risikoTinggi: complianceRows.filter((x) => x.highRiskCount > 0).length,
  }), [complianceRows]);

  const latestUpdates = useMemo(() => complianceRows.flatMap((row) => buildLatestUpdateList(row.moduleRows, facilityMap)).slice(0, 10), [complianceRows, facilityMap]);
  const lateRows = useMemo(() => complianceRows.filter((r) => r.notReportedCount > 0), [complianceRows]);
  const supportRows = useMemo(() => complianceRows.filter((r) => r.supportSummary !== '-'), [complianceRows]);

  const handleExport = () => {
    exportToCsv({
      filename: `rekap-monitoring-kepatuhan-${filters.periode}.csv`,
      rows: [
        ['RSAU', 'Kotama', 'Status Umum', 'Skor', 'Risiko Tinggi', 'Modul Belum Lapor'],
        ...complianceRows.map((r) => [r.namaFaskes, r.kotama, r.statusUmum, r.score, r.highRiskCount, r.notReportedCount]),
      ],
    });
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Monitoring Kepatuhan Aplikasi RSAU" description="Dashboard monitoring, rekap, review, validasi, dan audit trail lintas 5 modul utama RSAU." breadcrumbs={[{ label: 'Monitoring Kepatuhan RSAU' }]} />
      <MonitoringFilterBar
        filters={filters}
        onChange={(key, value) => setFilters((s) => ({ ...s, [key]: value }))}
        periods={periodList}
        kotamaList={[...new Set(rsauList.map((r) => r.kotama))]}
        rsauOptions={rsauList}
      />

      <div className="flex flex-wrap gap-2">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-sm ${tab === t ? 'bg-brand-700 text-white' : 'border bg-white'}`}>{t}</button>)}</div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <ComplianceStatCard title="Total RSAU" value={ringkasan.total} />
        <ComplianceStatCard title="Patuh" value={ringkasan.patuh} />
        <ComplianceStatCard title="Perlu Perhatian" value={ringkasan.perhatian} />
        <ComplianceStatCard title="Tidak Patuh" value={ringkasan.tidakPatuh} />
        <ComplianceStatCard title="Data Revisi" value={ringkasan.revisi} />
        <ComplianceStatCard title="Risiko Tinggi" value={ringkasan.risikoTinggi} />
      </div>

      <div className="flex justify-end"><button onClick={handleExport} className="rounded-lg bg-brand-700 px-4 py-2 text-sm text-white">Export CSV</button></div>
      <ModuleComplianceTable rows={complianceRows} />

      <div className="grid gap-4 xl:grid-cols-3">
        <LateReportTable rows={lateRows} />
        <SupportNeedTable rows={supportRows} />
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Update Terbaru</h3>
          {latestUpdates.length ? latestUpdates.map((item) => (
            <div key={item.id} className="rounded bg-slate-50 p-2 text-sm">
              <p className="font-medium text-slate-700">{item.facilityName} • {item.module}</p>
              <p className="text-xs text-slate-500">{item.updateLabel} • {item.updater}</p>
            </div>
          )) : <p className="text-sm text-slate-500">Belum ada update.</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {complianceRows.slice(0, 3).map((row) => <ComplianceScoreCard key={row.faskesId} score={row.score} status={row.statusUmum} />)}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Akses cepat modul: <Link className="text-brand-700 underline" to="/monitoring-kepatuhan/bridging">Bridging</Link>, <Link className="text-brand-700 underline" to="/monitoring-kepatuhan/ppra">PPRA</Link>, <Link className="text-brand-700 underline" to="/monitoring-kepatuhan/inm-ikp">INM & IKP</Link>, <Link className="text-brand-700 underline" to="/monitoring-kepatuhan/sirs-kompetensi">SIRS</Link>, <Link className="text-brand-700 underline" to="/monitoring-kepatuhan/keuangan">Keuangan</Link>.
      </div>
    </div>
  );
};

export default MonitoringKepatuhanPage;
