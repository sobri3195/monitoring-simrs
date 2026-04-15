const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-sm text-slate-500">{title}</p>
      {Icon ? <Icon className="h-5 w-5 text-brand-500" /> : null}
    </div>
    <p className="text-2xl font-bold text-brand-900">{value}</p>
    {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
  </div>
);

export default StatCard;
