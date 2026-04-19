import { AlertTriangle } from 'lucide-react';
import StatCard from './StatCard';

const AlertStatCard = ({ title, value, subtitle, trend }) => (
  <StatCard
    title={title}
    value={value}
    subtitle={subtitle}
    trend={trend}
    tone="danger"
    icon={AlertTriangle}
  />
);

export default AlertStatCard;
