import { CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../constants/workflowConstants';

const WorkflowStepper = ({ currentStatus = 'Draft' }) => {
  const currentIndex = Math.max(0, WORKFLOW_STEPS.indexOf(currentStatus));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow Pelaporan</p>
        <p className="text-xs text-slate-500">Status saat ini: <span className="font-semibold text-slate-700">{currentStatus}</span></p>
      </div>
      <div className="grid gap-2 md:grid-cols-6">
        {WORKFLOW_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step} className={`rounded-xl border px-3 py-2 text-xs transition ${isActive ? 'border-brand-700 bg-brand-50 text-brand-900 shadow-sm' : isDone ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <div className="mb-1 flex items-center gap-2">
                {isDone ? <CheckCircle2 size={14} /> : <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold">{index + 1}</span>}
                <span className="font-semibold">{step}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkflowStepper;
