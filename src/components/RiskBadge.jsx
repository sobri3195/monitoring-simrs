import { RISK_COLOR_MAP } from '../constants/appConstants';

const RiskBadge = ({ risk }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${RISK_COLOR_MAP[risk] || 'bg-slate-100 text-slate-700'}`}>
    {risk}
  </span>
);

export default RiskBadge;
