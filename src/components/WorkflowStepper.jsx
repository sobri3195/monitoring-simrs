import { CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../constants/workflowConstants';

const WorkflowStepper = ({ currentStatus = 'Draft' }) => {
  const currentIndex = WORKFLOW_STEPS.indexOf(currentStatus);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow Pelaporan</p>
      <div className="mt-4 grid gap-2 md:grid-cols-6">
        {WORKFLOW_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div
              key={step}
              className={`rounded-lg border p-2 text-xs ${isActive ? 'border-brand-700 bg-brand-50 text-brand-900' : isDone ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
            >
              <div className="mb-1 flex items-center gap-1">
                {isDone ? <CheckCircle2 size={14} /> : <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px]">{index + 1}</span>}
                <span className="font-semibold">{step}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepper;
