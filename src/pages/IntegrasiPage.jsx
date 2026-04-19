import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SummarySectionCard from '../components/SummarySectionCard';
import ComplianceStatusBadge from '../components/ComplianceStatusBadge';
import { useAppStore } from '../store/useAppStore';

const IntegrasiPage = () => {
  const { laporanPeriodikInti, masterFaskes } = useAppStore();
  const [selectedId, setSelectedId] = useState(laporanPeriodikInti[0]?.id);

  const queue = useMemo(() => laporanPeriodikInti
    .filter((r) => ['Disetujui Kotama', 'Direview'].includes(r.laporanIntiUtama?.statusPelaporan))
    .map((row) => ({
      ...row,
      facility: masterFaskes.find((f) => f.id === row.faskesId),
    })), [laporanPeriodikInti, masterFaskes]);

  const selected = queue.find((q) => q.id === selectedId) || queue[0];

  return (
    <div className="space-y-4">
      <PageHeader title="Validasi Puskesau" description="Final validation queue untuk memastikan kepatuhan nasional dan eskalasi prioritas." breadcrumbs={[{ label: 'Validasi Puskesau' }]} />
      <div className="grid gap-4 xl:grid-cols-4">
        <SummarySectionCard title="Queue Validasi" subtitle="Pilih laporan untuk validasi final.">
          <div className="space-y-2">
            {queue.map((item) => (
              <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-lg border p-3 text-left text-sm ${selected?.id === item.id ? 'border-brand-700 bg-brand-50' : 'border-slate-200 bg-white'}`}>
                <p className="font-semibold text-slate-700">{item.facility?.namaFaskes || item.faskesId}</p>
                <p className="text-xs text-slate-500">{item.facility?.kotama} • {item.periode}</p>
              </button>
            ))}
          </div>
        </SummarySectionCard>

        <div className="space-y-4 xl:col-span-2">
          <SummarySectionCard title="Detail Laporan" subtitle="Ringkasan status dan catatan validasi.">
            {selected ? (
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-500">RSAU:</span> {selected.facility?.namaFaskes}</p>
                <p><span className="text-slate-500">Status:</span> <ComplianceStatusBadge status={selected.laporanIntiUtama?.statusPelaporan || 'Draft'} /></p>
                <p><span className="text-slate-500">Skor kepatuhan:</span> {selected.laporanIntiUtama?.persenKelengkapanData || 0}%</p>
                <p><span className="text-slate-500">Catatan validator:</span> {selected.validatorNotes || '-'}</p>
              </div>
            ) : <p className="text-sm text-slate-500">Tidak ada queue validasi.</p>}
          </SummarySectionCard>
          <SummarySectionCard title="Validator Notes" subtitle="Catatan final untuk nasional dashboard dan audit.">
            <textarea className="w-full rounded-md border px-3 py-2 text-sm" rows={5} defaultValue={selected?.validatorNotes || ''} placeholder="Contoh: validasi disetujui, butuh pendampingan teknis bridging pada periode berikutnya." />
          </SummarySectionCard>
        </div>

        <SummarySectionCard title="Final Action Panel" subtitle="Aksi eksekutif validasi nasional.">
          <div className="space-y-2">
            <button className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white">Eskalasi Prioritas</button>
            <button className="w-full rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white">Validasi Final</button>
            <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">Kembalikan ke Kotama</button>
          </div>
        </SummarySectionCard>
      </div>
    </div>
  );
};

export default IntegrasiPage;
