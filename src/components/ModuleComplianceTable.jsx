import { Link } from 'react-router-dom';
import ComplianceStatusBadge from './ComplianceStatusBadge';

const ModuleComplianceTable = ({ rows = [], detailBasePath = '/monitoring-kepatuhan/rsau' }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
        <tr>
          <th className="p-3">RSAU</th>
          <th className="p-3">Kotama</th>
          <th className="p-3">Status Umum</th>
          <th className="p-3">Skor</th>
          <th className="p-3">Risiko</th>
          <th className="p-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.faskesId} className="border-t border-slate-100">
            <td className="p-3 font-medium text-slate-700">{row.namaFaskes}</td>
            <td className="p-3 text-slate-600">{row.kotama}</td>
            <td className="p-3"><ComplianceStatusBadge status={row.statusUmum} /></td>
            <td className="p-3">{row.score}</td>
            <td className="p-3">{row.highRiskCount > 0 ? 'Tinggi' : 'Rendah'}</td>
            <td className="p-3"><Link to={`${detailBasePath}/${row.faskesId}`} className="text-brand-700 underline">Detail</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ModuleComplianceTable;
