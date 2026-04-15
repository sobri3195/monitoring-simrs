import { useAppStore } from '../store/useAppStore';
import TimelineList from '../components/TimelineList';

const TimelinePage = () => {
  const { facilities } = useAppStore();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {facilities.slice(0, 10).map((f) => (
        <div key={f.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-brand-900">{f.namaFaskes}</h3>
          <TimelineList timeline={f.timeline} />
        </div>
      ))}
    </div>
  );
};

export default TimelinePage;
