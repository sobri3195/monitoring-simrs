import { formatPercent } from '../utils/formatters';

const ProgressBar = ({ value }) => (
  <div className="w-full">
    <div className="mb-1 flex justify-between text-xs text-slate-500">
      <span>Progress</span>
      <span>{formatPercent(value)}</span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div className="h-2 rounded-full bg-brand-500" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default ProgressBar;
