import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import SirsChecklistPanel from '../components/SirsChecklistPanel';

const SirsKompetensiDetailPage = () => {
  const { id } = useParams();
  const { laporanSIRSKompetensi, masterFaskes } = useAppStore();
  const item = laporanSIRSKompetensi.find((x) => x.id === id);
  if (!item) return <div>Data tidak ditemukan.</div>;
  const faskes = masterFaskes.find((f) => f.id === item.faskesId);

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Detail Kelengkapan SIRS per RSAU - {faskes?.namaFaskes}</h2><div className="rounded-xl border bg-white p-4"><SirsChecklistPanel item={item} /></div></div>;
};

export default SirsKompetensiDetailPage;
