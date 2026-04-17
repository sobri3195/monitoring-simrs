const SupportNeedTable = ({ rows = [] }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="mb-2 text-sm font-semibold text-slate-700">RSAU Memerlukan Pendampingan</h3>
    <div className="space-y-2 text-sm">{rows.length ? rows.map((r) => <div key={r.faskesId} className="rounded bg-slate-50 p-2">{r.namaFaskes} • {r.supportSummary}</div>) : <p className="text-slate-500">Tidak ada kebutuhan pendampingan prioritas.</p>}</div>
  </div>
);

export default SupportNeedTable;
