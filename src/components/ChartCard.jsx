const ChartCard = ({ title, subtitle, action, children, summary }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {action || null}
    </div>
    {summary ? <div className="mb-3">{summary}</div> : null}
    {children}
  </section>
);

export default ChartCard;
