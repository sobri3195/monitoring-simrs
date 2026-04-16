import { Link } from 'react-router-dom';

const PageHeader = ({ title, description, breadcrumbs = [], action }) => (
  <section className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
    {breadcrumbs.length ? (
      <nav className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {breadcrumbs.map((crumb, idx) => (
          <span key={`${crumb.label}-${idx}`} className="inline-flex items-center gap-2">
            {crumb.path ? <Link className="hover:text-brand-700" to={crumb.path}>{crumb.label}</Link> : <span className="text-slate-700">{crumb.label}</span>}
            {idx < breadcrumbs.length - 1 ? <span>/</span> : null}
          </span>
        ))}
      </nav>
    ) : null}
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {action || null}
    </div>
  </section>
);

export default PageHeader;
