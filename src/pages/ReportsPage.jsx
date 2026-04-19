import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SummarySectionCard from '../components/SummarySectionCard';
import ComplianceStatusBadge from '../components/ComplianceStatusBadge';
import { useAppStore } from '../store/useAppStore';

const ReportsPage = () => {
  const { laporanPeriodikInti, masterFaskes } = useAppStore();
  const [selectedId, setSelectedId] = useState(laporanPeriodikInti[0]?.id);

  const reviewQueue = useMemo(() => laporanPeriodikInti
    .filter((r) => ['Dikirim', 'Direview', 'Perlu Revisi'].includes(r.laporanIntiUtama?.statusPelaporan))
    .map((row) => ({
      ...row,
      facility: masterFaskes.find((f) => f.id === row.faskesId),
    })), [laporanPeriodikInti, masterFaskes]);

  const selected = reviewQueue.find((item) => item.id === selectedId) || reviewQueue[0];

  return (
    <div className="space-y-4">
      <PageHeader title="Review Kotama" description="Queue laporan masuk untuk review, catatan, dan aksi cepat persetujuan/revisi." breadcrumbs={[{ label: 'Review Kotama' }]} />
      <div className="grid gap-4 xl:grid-cols-5">
        <SummarySectionCard title="Laporan Masuk" subtitle="Panel kiri: daftar antrean review Kotama." >
          <div className="space-y-2">
            {reviewQueue.map((row) => (
              <button key={row.id} onClick={() => setSelectedId(row.id)} className={`w-full rounded-lg border p-3 text-left text-sm ${selected?.id === row.id ? 'border-brand-700 bg-brand-50' : 'border-slate-200 bg-white'}`}>
                <p className="font-semibold text-slate-700">{row.facility?.namaFaskes || row.faskesId}</p>
                <p className="text-xs text-slate-500">{row.facility?.kotama} • {row.periode}</p>
                <div className="mt-2"><ComplianceStatusBadge status={row.laporanIntiUtama?.statusPelaporan || 'Draft'} /></div>
              </button>
            ))}
          </div>
        </SummarySectionCard>

        <div className="space-y-4 xl:col-span-3">
          <SummarySectionCard title="Detail Ringkas" subtitle="Panel kanan: fokus verifikasi kelengkapan laporan.">
            {selected ? (
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-500">RSAU:</span> {selected.facility?.namaFaskes}</p>
                <p><span className="text-slate-500">Kotama:</span> {selected.facility?.kotama}</p>
                <p><span className="text-slate-500">Periode:</span> {selected.periode}</p>
                <p><span className="text-slate-500">Kelengkapan:</span> {selected.laporanIntiUtama?.persenKelengkapanData || 0}%</p>
                <p><span className="text-slate-500">Catatan reviewer:</span> {selected.reviewerNotes || '-'}</p>
              </div>
            ) : <p className="text-sm text-slate-500">Tidak ada antrean review.</p>}
          </SummarySectionCard>
          <SummarySectionCard title="Reviewer Notes" subtitle="Isi catatan agar operator bisa menindaklanjuti revisi dengan cepat.">
            <textarea className="w-full rounded-md border px-3 py-2 text-sm" rows={5} defaultValue={selected?.reviewerNotes || ''} placeholder="Contoh: lengkapi indikator IKP triwulan sebelum disetujui." />
          </SummarySectionCard>
        </div>

        <SummarySectionCard title="Aksi Cepat" subtitle="Keputusan reviewer Kotama.">
          <div className="space-y-2">
            <button className="w-full rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white">Minta Revisi</button>
            <button className="w-full rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white">Setujui</button>
            <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">Lihat Detail Penuh</button>
          </div>
        </SummarySectionCard>
      </div>
    </div>
  );
};

export default ReportsPage;
