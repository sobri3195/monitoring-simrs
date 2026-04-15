import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';
import ProgressBar from './ProgressBar';
import { formatDate } from '../utils/formatters';

const Row = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-700">{value || '-'}</p>
  </div>
);

const FacilityDetailCard = ({ facility }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <h2 className="text-lg font-bold text-brand-900">{facility.namaFaskes}</h2>
      <StatusBadge status={facility.statusImplementasi} />
      <RiskBadge risk={facility.levelRisiko} />
    </div>
    <div className="grid gap-3 md:grid-cols-3">
      <Row label="Tipe" value={facility.tipeFaskes} />
      <Row label="Jenis Aplikasi" value={facility.jenisAplikasi} />
      <Row label="Kategori" value={facility.kategori} />
      <Row label="Kotama" value={facility.kotama} />
      <Row label="Lanud/Satuan" value={facility.lanudSatuan} />
      <Row label="Vendor" value={facility.vendor} />
      <Row label="PIC" value={`${facility.namaPIC} (${facility.jabatanPIC})`} />
      <Row label="Kontak" value={facility.kontakPIC} />
      <Row label="Target Go-Live" value={formatDate(facility.targetGoLive)} />
    </div>
    <div className="mt-4">
      <ProgressBar value={facility.progressPersen} />
    </div>
  </div>
);

export default FacilityDetailCard;
