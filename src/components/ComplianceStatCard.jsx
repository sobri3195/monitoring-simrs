import { ShieldCheck } from 'lucide-react';
import StatCard from './StatCard';
import ComplianceBadge from './ComplianceBadge';

const ComplianceStatCard = ({ title, value, subtitle, score }) => (
  <div className="space-y-2">
    <StatCard title={title} value={value} subtitle={subtitle} icon={ShieldCheck} tone="info" />
    {score !== undefined ? <ComplianceBadge score={score} /> : null}
  </div>
);

export default ComplianceStatCard;
