import { RotateCcw } from 'lucide-react';

const FilterToolbar = ({ children, onReset }) => (
  <section className="sticky top-[76px] z-10 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-sm backdrop-blur">
    <div className="flex flex-wrap items-end gap-3">
      <div className="grid flex-1 gap-3 md:grid-cols-3">{children}</div>
      {onReset ? (
        <button onClick={onReset} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      ) : null}
    </div>
  </section>
);

export default FilterToolbar;
