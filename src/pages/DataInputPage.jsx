import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const moduleOptions = [
  { label: 'Bridging SATUSEHAT', key: 'laporanBridgingSatusehat' },
  { label: 'PPRA', key: 'laporanPPRA' },
  { label: 'INM & IKP', key: 'laporanINMIKP' },
  { label: 'SIRS Kompetensi', key: 'laporanSIRSKompetensi' },
  { label: 'Keuangan Bulanan', key: 'laporanKeuanganBulanan' },
];

const DataInputPage = () => {
  const { currentUser, masterFaskes, laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan, updateSubmoduleReport } = useAppStore();
  const [moduleKey, setModuleKey] = useState(moduleOptions[0].key);
  const [facilityId, setFacilityId] = useState(masterFaskes[0]?.id || '');
  const [periode, setPeriode] = useState('2026-03');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const sourceMap = { laporanBridgingSatusehat, laporanPPRA, laporanINMIKP, laporanSIRSKompetensi, laporanKeuanganBulanan };
  const currentReport = useMemo(() => sourceMap[moduleKey].find((x) => x.faskesId === facilityId && x.periode === periode), [sourceMap, moduleKey, facilityId, periode]);

  const submit = (e) => {
    e.preventDefault();
    if (!currentReport) return;
    updateSubmoduleReport(moduleKey, currentReport.id, {
      statusPelaporan: 'Draft',
      reviewerNotes: notes || currentReport.reviewerNotes,
      inputBy: currentUser.name,
    });
    setMessage('Draft laporan submodul tersimpan. Fitur ini khusus pelaporan/monitoring/rekap, bukan transaksi operasional.');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-4"><h2 className="text-lg font-semibold">Input Laporan Saya</h2><p className="text-sm text-slate-600">Input laporan periodik inti per submodul untuk review dan validasi berjenjang.</p><p className="mt-2 text-xs text-slate-500">Login: {currentUser.name} ({currentUser.role})</p></div>
      <form className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2" onSubmit={submit}>
        <label className="text-sm">Submodul<select className="mt-1 w-full rounded border px-2 py-2" value={moduleKey} onChange={(e) => setModuleKey(e.target.value)}>{moduleOptions.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}</select></label>
        <label className="text-sm">Faskes<select className="mt-1 w-full rounded border px-2 py-2" value={facilityId} onChange={(e) => setFacilityId(e.target.value)}>{masterFaskes.map((f) => <option key={f.id} value={f.id}>{f.namaFaskes}</option>)}</select></label>
        <label className="text-sm">Periode<select className="mt-1 w-full rounded border px-2 py-2" value={periode} onChange={(e) => setPeriode(e.target.value)}><option>2026-01</option><option>2026-02</option><option>2026-03</option></select></label>
        <label className="text-sm">Status Saat Ini<input readOnly className="mt-1 w-full rounded border bg-slate-50 px-2 py-2" value={currentReport?.statusPelaporan || '-'} /></label>
        <label className="text-sm md:col-span-2">Reviewer Notes<textarea rows={3} className="mt-1 w-full rounded border px-2 py-2" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={currentReport?.reviewerNotes || 'Masukkan catatan reviewer awal...'} /></label>
        <div className="md:col-span-2"><button className="rounded bg-brand-700 px-3 py-2 text-sm text-white">Simpan Draft</button>{message ? <p className="mt-2 text-sm text-emerald-700">{message}</p> : null}</div>
      </form>
    </div>
  );
};

export default DataInputPage;
