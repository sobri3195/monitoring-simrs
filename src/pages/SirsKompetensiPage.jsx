import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { withFaskesName } from './moduleUtils';
import SirsUpdateCard from '../components/SirsUpdateCard';
import SirsRecapTable from '../components/SirsRecapTable';

const SirsKompetensiPage = () => {
  const { laporanSIRSKompetensi, masterFaskes } = useAppStore();
  const rows = useMemo(() => withFaskesName(laporanSIRSKompetensi, masterFaskes).filter((x) => x.tipeFaskes === 'RSAU'), [laporanSIRSKompetensi, masterFaskes]);
  const latest = Object.values(rows.reduce((a, b) => ((!a[b.faskesId] || b.periode > a[b.faskesId].periode) ? { ...a, [b.faskesId]: b } : a), {}));
  const withCompleteness = latest.map((x) => ({ ...x, completeness: Math.round(([x.sirsDataProfilRsLengkap, x.sirsDataTempatTidurLengkap, x.sirsDataSdMlengkap, x.sirsDataLayananSpesialistikLengkap, x.sirsDataPeralatanLengkap, x.sirsDataKompetensiLayananLengkap, x.sirsDataRujukanLengkap].filter(Boolean).length / 7) * 100) }));

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Update SIRS RS Berbasis Kompetensi</h2><div className="grid gap-3 md:grid-cols-4"><SirsUpdateCard title="RS Sudah Update" value={latest.filter((x) => x.sirsStatusUpdate === 'Sudah Update').length} /><SirsUpdateCard title="RS Belum Update" value={latest.filter((x) => x.sirsStatusUpdate === 'Belum Update').length} /><SirsUpdateCard title="RS Terkendala" value={latest.filter((x) => x.sirsStatusUpdate === 'Terkendala').length} /><SirsUpdateCard title="Rekap Per Kotama" value={new Set(latest.map((x) => x.kotama)).size} /></div><SirsRecapTable rows={withCompleteness} /><div className="rounded-xl border bg-white p-4 text-sm">Detail Kelengkapan SIRS per RSAU: {latest.slice(0, 8).map((r) => <Link key={r.id} className="mr-3 text-brand-700 underline" to={`/sirs-kompetensi/${r.id}`}>{r.namaFaskes}</Link>)}</div></div>;
};

export default SirsKompetensiPage;
