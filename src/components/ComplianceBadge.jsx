import { CheckCircle2, ShieldAlert } from 'lucide-react';

const ComplianceBadge = ({ score }) => {
  const numericScore = Number(score) || 0;
  const isGood = numericScore >= 80;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${isGood ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-orange-50 text-orange-700 ring-orange-200'}`}>
      {isGood ? <CheckCircle2 className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
      Kepatuhan {numericScore}%
    </span>
  );
};

export default ComplianceBadge;
