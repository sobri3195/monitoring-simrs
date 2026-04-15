import { formatDate } from '../utils/formatters';

const TimelineList = ({ timeline }) => (
  <ol className="relative border-s border-slate-200">
    {timeline.map((item, idx) => (
      <li key={idx} className="mb-6 ms-4 last:mb-0">
        <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-brand-500" />
        <time className="text-xs text-slate-500">{formatDate(item.tanggal)}</time>
        <p className="text-sm font-semibold text-slate-700">{item.aktivitas}</p>
        <p className="text-xs text-slate-500">{item.status}</p>
      </li>
    ))}
  </ol>
);

export default TimelineList;
