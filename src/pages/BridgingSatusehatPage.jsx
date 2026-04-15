import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { withFaskesName } from './moduleUtils';
import BridgingStatusCard from '../components/BridgingStatusCard';
import BridgingReadinessBadge from '../components/BridgingReadinessBadge';
import BridgingSummaryChart from '../components/BridgingSummaryChart';

const BridgingSatusehatPage = () => {
  const { laporanBridgingSatusehat, masterFaskes } = useAppStore();
  const rows = useMemo(() => withFaskesName(laporanBridgingSatusehat, masterFaskes), [laporanBridgingSatusehat, masterFaskes]);
  const latestPerFacility = Object.values(rows.reduce((acc, row) => {
    if (!acc[row.faskesId] || row.periode > acc[row.faskesId].periode) acc[row.faskesId] = row;
    return acc;
  }, {}));
  const full = latestPerFacility.filter((r) => r.statusBridgingSatusehat === 'Aktif Penuh').length;
  const partial = latestPerFacility.filter((r) => r.statusBridgingSatusehat === 'Aktif Sebagian').length;
  const blocked = latestPerFacility.filter((r) => r.statusBridgingSatusehat === 'Terkendala').length;
  const chart = Object.entries(latestPerFacility.reduce((a, b) => ({ ...a, [b.statusBridgingSatusehat]: (a[b.statusBridgingSatusehat] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Monitoring Bridging SATUSEHAT</h2>
      <div className="grid gap-3 md:grid-cols-3"><BridgingStatusCard title="Aktif Penuh" value={full} /><BridgingStatusCard title="Aktif Sebagian" value={partial} /><BridgingStatusCard title="Terkendala" value={blocked} /></div>
      <div className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="mb-3 font-semibold">Chart Tingkat Kesiapan Bridging Nasional</h3><BridgingSummaryChart data={chart} /></div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="p-2 text-left">Faskes</th><th className="p-2 text-left">Kotama</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Aksi</th></tr></thead>
          <tbody>{latestPerFacility.map((r) => <tr key={r.id} className="border-t"><td className="p-2">{r.namaFaskes}</td><td className="p-2">{r.kotama}</td><td className="p-2"><BridgingReadinessBadge status={r.statusBridgingSatusehat} /></td><td className="p-2"><Link className="text-brand-700 underline" to={`/bridging-satusehat/${r.id}`}>Detail</Link></td></tr>)}</tbody></table>
      </div>
    </div>
  );
};

export default BridgingSatusehatPage;
