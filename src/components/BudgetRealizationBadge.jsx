const BudgetRealizationBadge = ({ value }) => <span className={`rounded-full px-2 py-1 text-xs ${value >= 85 ? 'bg-emerald-100 text-emerald-700' : value >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{value}%</span>;
export default BudgetRealizationBadge;
