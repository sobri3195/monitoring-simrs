import { AlertOctagon, AlertTriangle, ShieldCheck } from 'lucide-react';

const RISK_CONFIG = {
  Rendah: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: ShieldCheck },
  Sedang: { className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: AlertTriangle },
  Tinggi: { className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: AlertOctagon },
  High: { className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: AlertOctagon },
  Medium: { className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: AlertTriangle },
  Low: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: ShieldCheck },
};

const RiskBadge = ({ risk, className = '' }) => {
  const config = RISK_CONFIG[risk] || { className: 'bg-slate-100 text-slate-700 ring-slate-200', icon: ShieldCheck };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.className} ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {risk}
    </span>
  );
};

export default RiskBadge;
