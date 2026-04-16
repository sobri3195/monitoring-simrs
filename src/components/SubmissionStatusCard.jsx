import StatusBadge from './StatusBadge';

const SubmissionStatusCard = ({ status, lastUpdate, period, facility }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-700">Status Pengiriman</h3>
    <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
      <p><span className="text-slate-500">Faskes:</span> <span className="font-medium text-slate-700">{facility}</span></p>
      <p><span className="text-slate-500">Periode:</span> <span className="font-medium text-slate-700">{period}</span></p>
      <p><span className="text-slate-500">Status:</span> <span className="ml-1"><StatusBadge status={status} /></span></p>
      <p><span className="text-slate-500">Pembaruan:</span> <span className="font-medium text-slate-700">{lastUpdate || '-'}</span></p>
    </div>
  </section>
);

export default SubmissionStatusCard;
