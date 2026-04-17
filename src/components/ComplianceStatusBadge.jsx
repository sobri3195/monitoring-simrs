import { statusClass } from '../utils/formatters';

const ComplianceStatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass(status)}`}>{status}</span>
);

export default ComplianceStatusBadge;
