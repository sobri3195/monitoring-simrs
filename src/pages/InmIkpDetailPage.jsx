import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import IndicatorTable from '../components/IndicatorTable';

const InmIkpDetailPage = () => {
  const { id } = useParams();
  const { laporanINMIKP, masterFaskes } = useAppStore();
  const item = laporanINMIKP.find((x) => x.id === id);
  if (!item) return <div>Data tidak ditemukan.</div>;
  const faskes = masterFaskes.find((f) => f.id === item.faskesId);

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Detail Capaian Indikator per Faskes - {faskes?.namaFaskes}</h2><IndicatorTable rows={item.indikatorDinamis} /></div>;
};

export default InmIkpDetailPage;
