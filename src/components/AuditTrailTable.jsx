import { formatDate } from '../utils/formatters';
import EmptyState from './EmptyState';

const AuditTrailTable = ({ rows = [] }) => {
  if (!rows.length) return <EmptyState title="Belum ada histori" description="Audit trail akan tampil setelah ada aktivitas pelaporan." compact />;

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Waktu</th>
            <th className="px-3 py-2">Aktivitas</th>
            <th className="px-3 py-2">Pelaksana</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-3 py-2 text-slate-600">{formatDate(row.timestamp)}</td>
              <td className="px-3 py-2 font-medium text-slate-700">{row.event}</td>
              <td className="px-3 py-2 text-slate-600">{row.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrailTable;
