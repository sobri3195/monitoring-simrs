import { formatDate } from '../utils/formatters';

const IssueTable = ({ data }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50 text-slate-600">
        <tr>
          <th className="px-3 py-2 text-left">Issue</th>
          <th className="px-3 py-2 text-left">Faskes</th>
          <th className="px-3 py-2 text-left">Severity</th>
          <th className="px-3 py-2 text-left">Target</th>
          <th className="px-3 py-2 text-left">PIC</th>
          <th className="px-3 py-2 text-left">Status</th>
          <th className="px-3 py-2 text-left">Rekomendasi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((issue) => (
          <tr key={issue.id} className="border-t border-slate-100 align-top">
            <td className="px-3 py-2 font-medium">{issue.title}</td>
            <td className="px-3 py-2">{issue.facilityName || '-'}</td>
            <td className="px-3 py-2">{issue.severity}</td>
            <td className="px-3 py-2">{formatDate(issue.targetDate)}</td>
            <td className="px-3 py-2">{issue.pic}</td>
            <td className="px-3 py-2">{issue.status}</td>
            <td className="px-3 py-2">{issue.recommendation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default IssueTable;
