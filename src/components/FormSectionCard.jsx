const FormSectionCard = ({ title, description, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {description ? <p className="text-xs text-slate-500">{description}</p> : null}
    </div>
    {children}
  </section>
);

export default FormSectionCard;
