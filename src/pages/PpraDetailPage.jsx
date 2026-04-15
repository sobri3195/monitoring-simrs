import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import PpraChecklistPanel from '../components/PpraChecklistPanel';

const PpraDetailPage = () => {
  const { id } = useParams();
  const { laporanPPRA, masterFaskes } = useAppStore();
  const item = laporanPPRA.find((x) => x.id === id);
  if (!item) return <div>Data tidak ditemukan.</div>;
  const faskes = masterFaskes.find((f) => f.id === item.faskesId);

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Detail PPRA per Faskes - {faskes?.namaFaskes}</h2><div className="rounded-xl border bg-white p-4"><PpraChecklistPanel item={item} /></div><div className="rounded-xl border bg-white p-4 text-sm"><p><b>Temuan:</b> {item.ppraTemuanUtama}</p><p><b>Masalah:</b> {item.ppraMasalahUtama}</p><p><b>Tindak Lanjut:</b> {item.ppraTindakLanjut}</p></div></div>;
};

export default PpraDetailPage;
