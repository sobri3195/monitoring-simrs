const ComplianceScoreCard = ({ score, status }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-xs uppercase tracking-wide text-slate-500">Skor Kepatuhan</p>
    <div className="mt-2 flex items-baseline gap-2">
      <p className="text-3xl font-bold text-brand-700">{score}</p>
      <span className="text-sm text-slate-500">/100</span>
    </div>
    <p className="text-sm font-medium text-slate-700">Status umum: {status}</p>
  </div>
);

export default ComplianceScoreCard;
