import { statusClass } from '../utils/formatters';

const StatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(status)}`}>
    {status}
  </span>
);

export default StatusBadge;
