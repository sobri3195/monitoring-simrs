const BridgingStatusCard = ({ title, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <p className="text-xs text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-brand-900">{value}</p>
  </div>
);

export default BridgingStatusCard;
