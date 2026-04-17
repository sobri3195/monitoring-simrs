const ComplianceStatCard = ({ title, value, subtitle }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
    <p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p>
    {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
  </div>
);

export default ComplianceStatCard;
