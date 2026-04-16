import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SubmissionStatusCard from '../components/SubmissionStatusCard';
import ReviewerNotesCard from '../components/ReviewerNotesCard';
import AuditTrailTable from '../components/AuditTrailTable';
import EmptyState from '../components/EmptyState';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../utils/formatters';
import { canTransitionTo } from '../utils/workflow';

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

  const [step, setStep] = useState(1);
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

    setFeedback({ type: 'success', message: action === 'draft' ? 'Draft laporan berhasil disimpan.' : 'Status laporan berhasil diperbarui.' });
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Input Laporan Saya"
        description="Form pelaporan periodik terstandar untuk review kotama dan validasi Puskesau."
        breadcrumbs={[{ label: 'Laporan Inti', path: '/input-data' }, { label: 'Input Laporan Saya' }]}
      />

      <section className="rounded-xl border bg-white p-4 shadow-sm">
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
      </section>

      {!currentReport ? <EmptyState title="Belum ada laporan" description="Pilih submodul/faskes/periode lain atau siapkan seed data laporan." /> : (
        <>
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SubmissionStatusCard
                facility={selectedFacility?.namaFaskes || '-'}
                period={periode}
                status={currentReport.statusPelaporan || 'Draft'}
                lastUpdate={formatDate(currentReport.lastUpdate)}
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">Langkah Form</p>
              <div className="mt-2 flex gap-2 text-xs">
                {[1, 2, 3].map((item) => (
                  <button key={item} onClick={() => setStep(item)} className={`rounded-md px-3 py-1.5 ${step === item ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}>Step {item}</button>
                ))}
              </div>
            </div>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {step === 1 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Data Review</h3>
                <label className="block text-sm">Catatan Reviewer
                  <textarea required rows={4} className="mt-1 w-full rounded-md border px-3 py-2" value={reviewerNotes} onChange={(e) => setReviewerNotes(e.target.value)} placeholder="Isi catatan review dari operator/admin kotama..." />
                </label>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Data Validasi</h3>
                <label className="block text-sm">Catatan Validator
                  <textarea rows={4} className="mt-1 w-full rounded-md border px-3 py-2" value={validatorNotes} onChange={(e) => setValidatorNotes(e.target.value)} placeholder="Isi catatan validasi puskesau..." />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-3 text-sm">
                <h3 className="text-sm font-semibold text-slate-700">Ringkasan Sebelum Submit</h3>
                <p><span className="text-slate-500">Faskes:</span> {selectedFacility?.namaFaskes}</p>
                <p><span className="text-slate-500">Submodul:</span> {moduleOptions.find((x) => x.key === moduleKey)?.label}</p>
                <p><span className="text-slate-500">Reviewer Notes:</span> {reviewerNotes || '-'}</p>
                <p><span className="text-slate-500">Validator Notes:</span> {validatorNotes || '-'}</p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('draft')}>Simpan Draft</button>
              <button className="rounded-md bg-brand-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('submit')}>Kirim Laporan</button>
              <button className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white" onClick={() => saveWithAction('verify')}>Ajukan Verifikasi</button>
            </div>

            {feedback.message ? <p className={`mt-3 text-sm ${feedback.type === 'error' ? 'text-red-700' : feedback.type === 'success' ? 'text-emerald-700' : 'text-slate-700'}`}>{feedback.message}</p> : null}
          </section>

          <div className="grid gap-4 xl:grid-cols-2">
            <ReviewerNotesCard reviewerNotes={reviewerNotes} validatorNotes={validatorNotes} />
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Audit Trail</h3>
              <AuditTrailTable rows={currentReport.auditTrail || []} />
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default DataInputPage;
