import { Link } from 'react-router-dom';

const PageHeader = ({ title, description, breadcrumbs = [], action, meta }) => (
  <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-brand-900 via-brand-900 to-brand-700 px-5 py-5 text-white shadow-md">
    {breadcrumbs.length ? (
      <nav className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-200/90">
        {breadcrumbs.map((crumb, idx) => (
          <span key={`${crumb.label}-${idx}`} className="inline-flex items-center gap-2">
            {crumb.path ? <Link className="transition hover:text-white" to={crumb.path}>{crumb.label}</Link> : <span className="font-medium text-white">{crumb.label}</span>}
            {idx < breadcrumbs.length - 1 ? <span>/</span> : null}
          </span>
        ))}
      </nav>
    ) : null}
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-200">{description}</p> : null}
        {meta ? <div className="mt-3">{meta}</div> : null}
      </div>
      {action || null}
    </div>
  </section>
);

export default PageHeader;
