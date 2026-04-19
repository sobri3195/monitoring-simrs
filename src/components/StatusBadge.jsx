import { AlertCircle, CheckCircle2, Clock3, Info, XCircle } from 'lucide-react';

const STATUS_STYLE_MAP = {
  Lengkap: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: CheckCircle2 },
  'Tervalidasi Puskesau': { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: CheckCircle2 },
  'Disetujui Kotama': { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: CheckCircle2 },
  Draft: { className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: Clock3 },
  Dikirim: { className: 'bg-sky-50 text-sky-700 ring-sky-200', icon: Info },
  Direview: { className: 'bg-yellow-50 text-yellow-700 ring-yellow-200', icon: Clock3 },
  'Perlu Revisi': { className: 'bg-orange-50 text-orange-700 ring-orange-200', icon: AlertCircle },
  'Belum Lapor': { className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: XCircle },
};

const StatusBadge = ({ status, className = '' }) => {
  const badgeConfig = STATUS_STYLE_MAP[status] || { className: 'bg-slate-100 text-slate-700 ring-slate-200', icon: Info };
  const Icon = badgeConfig.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeConfig.className} ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
};

export default StatusBadge;
