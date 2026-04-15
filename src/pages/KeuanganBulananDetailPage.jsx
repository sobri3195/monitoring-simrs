import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import BudgetRealizationBadge from '../components/BudgetRealizationBadge';
import FinancialIssuePanel from '../components/FinancialIssuePanel';

const KeuanganBulananDetailPage = () => {
  const { id } = useParams();
  const { laporanKeuanganBulanan, masterFaskes } = useAppStore();
  const item = laporanKeuanganBulanan.find((x) => x.id === id);
  if (!item) return <div>Data tidak ditemukan.</div>;
  const faskes = masterFaskes.find((f) => f.id === item.faskesId);

  return <div className="space-y-4"><h2 className="text-lg font-semibold">Detail Keuangan per Faskes - {faskes?.namaFaskes}</h2><div className="rounded-xl border bg-white p-4 text-sm"><p>Status: {item.financeStatusPelaporan}</p><p>Realisasi: <BudgetRealizationBadge value={item.financePersenRealisasiAnggaran} /></p><p>Pendapatan layanan: {Math.round(item.pendapatanLayanan).toLocaleString('id-ID')}</p><p>Belanja pegawai: {Math.round(item.belanjaPegawai).toLocaleString('id-ID')}</p></div><FinancialIssuePanel issue={item.financeMasalahUtama} risk={item.financeRisikoUtama} support={item.financeKebutuhanPendampingan} /></div>;
};

export default KeuanganBulananDetailPage;
