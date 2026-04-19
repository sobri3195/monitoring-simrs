import { formatDate } from '../utils/formatters';

const TimelinePanel = ({ rows = [] }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-700">Timeline Status</h3>
    <div className="mt-3 space-y-3">
      {rows.length ? rows.map((item) => (
        <div key={item.id} className="relative border-l-2 border-slate-200 pl-3 text-xs text-slate-600">
          <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-brand-700" />
          <p className="font-medium text-slate-700">{item.event}</p>
          <p>{item.by || '-'} • {formatDate(item.timestamp)}</p>
        </div>
      )) : <p className="text-sm text-slate-500">Belum ada timeline perubahan.</p>}
    </div>
  </section>
);

export default TimelinePanel;
