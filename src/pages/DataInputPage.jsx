import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SubmissionStatusCard from '../components/SubmissionStatusCard';
import ReviewerNotesCard from '../components/ReviewerNotesCard';
import AuditTrailTable from '../components/AuditTrailTable';
import EmptyState from '../components/EmptyState';
import WorkflowStepper from '../components/WorkflowStepper';
import ProgressBar from '../components/ProgressBar';
import FormSectionCard from '../components/FormSectionCard';
import SummarySectionCard from '../components/SummarySectionCard';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../utils/formatters';
import { canTransitionTo } from '../utils/workflow';
import { getCompletionState } from '../constants/workflowConstants';

const formSteps = ['Ringkasan', 'Bridging SATUSEHAT', 'PPRA', 'INM & IKP', 'SIRS Kompetensi', 'Keuangan Bulanan', 'Review & Submit'];

const moduleOptions = [
  { label: 'Bridging SATUSEHAT', key: 'laporanBridgingSatusehat' },
  { label: 'PPRA', key: 'laporanPPRA' },
  { label: 'INM & IKP', key: 'laporanINMIKP' },
  { label: 'SIRS Kompetensi', key: 'laporanSIRSKompetensi' },
  { label: 'Keuangan Bulanan', key: 'laporanKeuanganBulanan' },
];

const actionToStatusMap = {
  draft: 'Draft',
  submit: 'Dikirim',
  verify: 'Disetujui Kotama',
};

const DataInputPage = () => {
  const {
    currentUser,
    masterFaskes,
    laporanBridgingSatusehat,
    laporanPPRA,
    laporanINMIKP,
    laporanSIRSKompetensi,
    laporanKeuanganBulanan,
    updateSubmoduleReport,
  } = useAppStore();

  const [activeStep, setActiveStep] = useState(formSteps[0]);
  const [moduleKey, setModuleKey] = useState(moduleOptions[0].key);
  const [facilityId, setFacilityId] = useState(masterFaskes[0]?.id || '');
  const [periode, setPeriode] = useState('2026-03');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [validatorNotes, setValidatorNotes] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const sourceMap = { laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan };
  const storageKey = `draft:${moduleKey}:${facilityId}:${periode}:${currentUser.id}`;

  const selectedFacility = useMemo(() => masterFaskes.find((x) => x.id === facilityId), [masterFaskes, facilityId]);
  const currentReport = useMemo(
    () => sourceMap[moduleKey].find((x) => x.faskesId === facilityId && x.periode === periode),
    [sourceMap, moduleKey, facilityId, periode],
  );

  const completion = useMemo(() => {
    let filled = 0;
    if (selectedFacility) filled += 1;
    if (reviewerNotes.trim()) filled += 1;
    if (validatorNotes.trim()) filled += 1;
    if (currentReport?.statusPelaporan) filled += 1;
    return Math.round((filled / 4) * 100);
  }, [currentReport?.statusPelaporan, reviewerNotes, selectedFacility, validatorNotes]);

  const completionState = getCompletionState(completion);
  const incompleteItems = [
    !reviewerNotes.trim() ? 'Catatan reviewer belum diisi.' : null,
    !validatorNotes.trim() ? 'Catatan validator belum diisi.' : null,
  ].filter(Boolean);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      setReviewerNotes(currentReport?.reviewerNotes || '');
      setValidatorNotes(currentReport?.validatorNotes || '');
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      setReviewerNotes(parsed.reviewerNotes || '');
      setValidatorNotes(parsed.validatorNotes || '');
      setFeedback({ type: 'info', message: 'Draft otomatis dimuat dari penyimpanan lokal.' });
    } catch {
      setReviewerNotes(currentReport?.reviewerNotes || '');
      setValidatorNotes(currentReport?.validatorNotes || '');
    }
  }, [storageKey, currentReport]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify({ reviewerNotes, validatorNotes, savedAt: new Date().toISOString() }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [reviewerNotes, validatorNotes, storageKey]);

  const saveWithAction = (action) => {
    if (!currentReport) {
      setFeedback({ type: 'error', message: 'Data laporan belum tersedia untuk kombinasi faskes dan periode ini.' });
      return;
    }

    const nextStatus = actionToStatusMap[action];
    const currentStatus = currentReport.statusPelaporan || 'Draft';
    if (action !== 'draft' && !canTransitionTo(currentStatus, nextStatus)) {
      setFeedback({ type: 'error', message: `Status ${currentStatus} tidak bisa langsung diubah ke ${nextStatus}.` });
      return;
    }

    const newAuditItem = {
      id: `${currentReport.id}-${Date.now()}`,
      event: action === 'draft' ? 'draft diperbarui' : action === 'submit' ? 'laporan dikirim operator' : 'ajukan verifikasi kotama',
      timestamp: new Date().toISOString(),
      by: currentUser.name,
    };

    updateSubmoduleReport(moduleKey, currentReport.id, {
      statusPelaporan: nextStatus,
      reviewerNotes,
      validatorNotes,
      inputBy: currentUser.name,
      auditTrail: [...(currentReport.auditTrail || []), newAuditItem],
    });

    localStorage.removeItem(storageKey);
    setFeedback({ type: 'success', message: action === 'draft' ? 'Draft laporan berhasil disimpan.' : 'Status laporan berhasil diperbarui.' });
  };

  return (
    <div className="space-y-4 pb-24">
      <PageHeader
        title="Input Laporan Saya"
        description="Workflow input operator RSAU: simpan draft, kirim, review Kotama, dan validasi final Puskesau."
        breadcrumbs={[{ label: 'Laporan Saya', path: '/input-data' }, { label: 'Input Laporan' }]}
      />

      <SummarySectionCard title="Pengaturan Laporan" subtitle="Pilih modul, RSAU, dan periode pelaporan.">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm">Submodul
            <select className="mt-1 w-full rounded-md border px-2 py-2" value={moduleKey} onChange={(e) => setModuleKey(e.target.value)}>
              {moduleOptions.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
            </select>
          </label>
          <label className="text-sm">Faskes
            <select className="mt-1 w-full rounded-md border px-2 py-2" value={facilityId} onChange={(e) => setFacilityId(e.target.value)}>
              {masterFaskes.map((f) => <option key={f.id} value={f.id}>{f.namaFaskes}</option>)}
            </select>
          </label>
          <label className="text-sm">Periode
            <select className="mt-1 w-full rounded-md border px-2 py-2" value={periode} onChange={(e) => setPeriode(e.target.value)}>
              <option>2026-01</option><option>2026-02</option><option>2026-03</option>
            </select>
          </label>
        </div>
      </SummarySectionCard>

      {!currentReport ? <EmptyState title="Belum ada laporan" description="Pilih submodul/faskes/periode lain atau siapkan seed data laporan." /> : (
        <>
          <WorkflowStepper currentStatus={currentReport.statusPelaporan || 'Draft'} />

          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SubmissionStatusCard
                facility={selectedFacility?.namaFaskes || '-'}
                period={periode}
                status={currentReport.statusPelaporan || 'Draft'}
                lastUpdate={formatDate(currentReport.lastUpdate)}
              />
            </div>
            <SummarySectionCard title="Progress Pengisian" subtitle={completionState.label}>
              <ProgressBar value={completion} />
              {incompleteItems.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-amber-700">
                  {incompleteItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : <p className="mt-2 text-xs text-emerald-700">Semua bagian penting sudah terisi.</p>}
            </SummarySectionCard>
          </div>

          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            {formSteps.map((item) => (
              <button key={item} onClick={() => setActiveStep(item)} className={`rounded-full px-3 py-1 text-xs ${activeStep === item ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{item}</button>
            ))}
          </div>

          <FormSectionCard title={activeStep} description="Form ditampilkan bertahap agar operator lebih fokus dan tidak kelelahan.">
            <div className="space-y-3">
              <label className="block text-sm">Catatan Reviewer <span className="text-red-600">*</span>
                <textarea rows={4} className="mt-1 w-full rounded-md border px-3 py-2" value={reviewerNotes} onChange={(e) => setReviewerNotes(e.target.value)} placeholder="Isi catatan review dari operator/admin kotama..." />
              </label>
              <label className="block text-sm">Catatan Validator <span className="text-red-600">*</span>
                <textarea rows={4} className="mt-1 w-full rounded-md border px-3 py-2" value={validatorNotes} onChange={(e) => setValidatorNotes(e.target.value)} placeholder="Isi catatan validasi puskesau..." />
              </label>
            </div>
          </FormSectionCard>

          <div className="grid gap-4 xl:grid-cols-2">
            <ReviewerNotesCard reviewerNotes={reviewerNotes} validatorNotes={validatorNotes} />
            <SummarySectionCard title="Audit Trail" subtitle="Riwayat perubahan status dan catatan laporan.">
              <AuditTrailTable rows={currentReport.auditTrail || []} />
            </SummarySectionCard>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-72">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-end gap-2">
          <button className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('draft')}>Simpan Draft</button>
          <button className="rounded-md bg-brand-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('submit')}>Kirim Laporan</button>
          <button className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('verify')}>Ajukan Verifikasi</button>
          {feedback.message ? <p className={`self-center text-sm ${feedback.type === 'error' ? 'text-red-700' : feedback.type === 'success' ? 'text-emerald-700' : 'text-slate-700'}`}>{feedback.message}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default DataInputPage;
