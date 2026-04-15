import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import SatusehatResourceTable from '../components/SatusehatResourceTable';
import BridgingIssuePanel from '../components/BridgingIssuePanel';

const BridgingSatusehatDetailPage = () => {
  const { id } = useParams();
  const { laporanBridgingSatusehat, masterFaskes } = useAppStore();
  const item = laporanBridgingSatusehat.find((x) => x.id === id);
  if (!item) return <div>Data tidak ditemukan.</div>;
  const faskes = masterFaskes.find((f) => f.id === item.faskesId);

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Detail Bridging - {faskes?.namaFaskes}</h2><div className="rounded-xl border bg-white p-4"><SatusehatResourceTable item={item} /></div><BridgingIssuePanel issue={item.errorUtamaBridging} support={item.kebutuhanPendampinganBridging} /></div>;
};

export default BridgingSatusehatDetailPage;
