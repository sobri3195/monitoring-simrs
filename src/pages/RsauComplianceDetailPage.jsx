import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import PageHeader from '../components/PageHeader';
import ComplianceScoreCard from '../components/ComplianceScoreCard';
import RsaComplianceDetailCard from '../components/RsaComplianceDetailCard';
import ReviewerNotesCard from '../components/ReviewerNotesCard';
import ValidationNotesCard from '../components/ValidationNotesCard';
import ComplianceStatusBadge from '../components/ComplianceStatusBadge';
import { computeOverallCompliance, mergeAuditTrail } from '../utils/compliance';
import WorkflowStepper from '../components/WorkflowStepper';
import TimelinePanel from '../components/TimelinePanel';
import SummarySectionCard from '../components/SummarySectionCard';

const getLatest = (rows, facilityId) => rows.filter((r) => r.faskesId === facilityId).sort((a, b) => b.periode.localeCompare(a.periode))[0];

const RsauComplianceDetailPage = () => {
  const { id } = useParams();
  const { masterFaskes, laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan } = useAppStore();
  const facility = masterFaskes.find((f) => f.id === id);

  const moduleRows = useMemo(() => ({
    bridging: getLatest(laporanBridgingSatusehat, id),
    ppra: getLatest(laporanPPRA, id),
    inmIkp: getLatest(laporanINMIKP, id),
    sirs: getLatest(laporanSIRSKompetensi, id),
    finance: getLatest(laporanKeuanganBulanan, id),
  }), [id, laporanBridgingSatusehat, laporanINMIKP, laporanKeuanganBulanan, laporanPPRA, laporanSIRSKompetensi]);

  const overall = computeOverallCompliance(moduleRows);
  const auditTrail = mergeAuditTrail(moduleRows);
  const kendalaUtama = [moduleRows.bridging?.errorUtamaBridging, moduleRows.ppra?.ppraMasalahUtama, moduleRows.inmIkp?.inmMasalahUtama, moduleRows.sirs?.sirsMasalahUtama, moduleRows.finance?.financeMasalahUtama].filter(Boolean).join(' | ');
  const pendampingan = [moduleRows.bridging?.kebutuhanPendampinganBridging, moduleRows.ppra?.ppraKebutuhanPendampingan, moduleRows.inmIkp?.inmKebutuhanPendampingan, moduleRows.sirs?.sirsKebutuhanPendampingan, moduleRows.finance?.financeKebutuhanPendampingan].filter(Boolean).join(' | ');

  return (
    <div className="space-y-4">
      <PageHeader title="Detail Kepatuhan RSAU" description="Status kepatuhan umum, 5 modul utama, histori update, review, validasi, dan timeline perubahan status." breadcrumbs={[{ label: 'Monitoring Kepatuhan RSAU', href: '/monitoring-kepatuhan' }, { label: facility?.namaFaskes || id }]} />
      <div className="grid gap-4 xl:grid-cols-3">
        <RsaComplianceDetailCard facility={facility} statusUmum={overall.statusUmum} kendala={kendalaUtama || '-'} pendampingan={pendampingan || '-'} />
        <ComplianceScoreCard score={overall.score} status={overall.statusUmum} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Status 5 Modul Utama</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between"><span>Bridging SATUSEHAT</span><ComplianceStatusBadge status={moduleRows.bridging?.statusPelaporan || 'Belum Lapor'} /></div>
            <div className="flex items-center justify-between"><span>PPRA</span><ComplianceStatusBadge status={moduleRows.ppra?.ppraStatusPelaporan || 'Belum Lapor'} /></div>
            <div className="flex items-center justify-between"><span>INM & IKP</span><ComplianceStatusBadge status={moduleRows.inmIkp?.inmIkpStatusPelaporan || 'Belum Lapor'} /></div>
            <div className="flex items-center justify-between"><span>SIRS Kompetensi</span><ComplianceStatusBadge status={moduleRows.sirs?.statusPelaporan || 'Belum Lapor'} /></div>
            <div className="flex items-center justify-between"><span>Keuangan Bulanan</span><ComplianceStatusBadge status={moduleRows.finance?.financeStatusPelaporan || 'Belum Lapor'} /></div>
          </div>
        </div>
      </div>

      <WorkflowStepper currentStatus={auditTrail[0]?.event?.includes('validasi') ? 'Tervalidasi Puskesau' : moduleRows.finance?.financeStatusPelaporan || moduleRows.bridging?.statusPelaporan || 'Draft'} />

      <div className="grid gap-4 xl:grid-cols-2">
        <ReviewerNotesCard reviewerNotes={moduleRows.ppra?.reviewerNotes} validatorNotes={moduleRows.ppra?.validatorNotes} />
        <ValidationNotesCard notes={moduleRows.finance?.validatorNotes || moduleRows.bridging?.validatorNotes} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SummarySectionCard title="Audit Trail" subtitle="Riwayat aktivitas lintas 5 modul pelaporan.">
          <div className="max-h-80 overflow-auto">
            {auditTrail.length ? auditTrail.map((row) => (
              <div key={row.id} className="border-b border-slate-100 py-2 text-xs text-slate-600">
                <p className="font-medium text-slate-700">{row.event}</p>
                <p>{row.by} • {new Date(row.timestamp).toLocaleString('id-ID')}</p>
              </div>
            )) : <p className="text-sm text-slate-500">Belum ada audit trail.</p>}
          </div>
        </SummarySectionCard>
        <TimelinePanel rows={auditTrail} />
      </div>
    </div>
  );
};

export default RsauComplianceDetailPage;
