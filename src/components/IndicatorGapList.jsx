const IndicatorGapList = ({ rows }) => <div className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="mb-2 font-semibold">Indikator Sering Tidak Tercapai</h3>{rows.map((r) => <div key={r.name} className="mb-2 rounded bg-slate-50 p-2 text-sm">{r.name} <span className="float-right font-semibold">{r.value}</span></div>)}</div>;
export default IndicatorGapList;
