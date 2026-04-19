const ListCard = ({ color = 'border-sky-500', title, meta, badges, description }) => (
  <article className={`rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${color ? `border-l-4 ${color}` : ''}`}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {meta ? <p className="text-xs text-slate-500">{meta}</p> : null}
      </div>
      {badges ? <div className="flex flex-wrap justify-end gap-1">{badges}</div> : null}
    </div>
    {description ? <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p> : null}
  </article>
);

export default ListCard;
