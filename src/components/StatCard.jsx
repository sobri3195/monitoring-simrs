import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  tone = 'default',
}) => {
  const toneClass = {
    default: 'from-white to-slate-50/60 border-slate-200',
    info: 'from-sky-50 to-white border-sky-100',
    success: 'from-emerald-50 to-white border-emerald-100',
    warning: 'from-amber-50 to-white border-amber-100',
    danger: 'from-rose-50 to-white border-rose-100',
  };

  return (
    <article className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${toneClass[tone] || toneClass.default}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        {Icon ? <span className="rounded-lg bg-white/90 p-2 text-brand-700 ring-1 ring-slate-200"><Icon className="h-4 w-4" /></span> : null}
      </div>
      <p className="text-3xl font-bold leading-none text-slate-900">{value}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : <span />}
        {trend ? (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${trend.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.direction === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {trend.value}
          </span>
        ) : null}
      </div>
    </article>
  );
};

export default StatCard;
