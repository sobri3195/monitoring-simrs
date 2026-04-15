const EmptyState = ({ title = 'Data belum tersedia', description = 'Silakan ubah filter atau tambahkan data.' }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
    <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
  </div>
);

export default EmptyState;
