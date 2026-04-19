const MODULE_COLORS = {
  'Ringkasan Utama': 'bg-sky-50 text-sky-700 ring-sky-200',
  'Bridging SATUSEHAT': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  PPRA: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'INM & IKP': 'bg-violet-50 text-violet-700 ring-violet-200',
  'SIRS Kompetensi': 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  'Keuangan Bulanan': 'bg-amber-50 text-amber-700 ring-amber-200',
};

const ModuleBadge = ({ module }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${MODULE_COLORS[module] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
    {module}
  </span>
);

export default ModuleBadge;
