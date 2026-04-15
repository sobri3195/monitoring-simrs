const colorMap = {
  'Aktif Penuh': 'bg-emerald-100 text-emerald-700',
  'Aktif Sebagian': 'bg-amber-100 text-amber-700',
  Terkendala: 'bg-red-100 text-red-700',
};

const BridgingReadinessBadge = ({ status }) => (
  <span className={`rounded-full px-2 py-1 text-xs font-medium ${colorMap[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>
);

export default BridgingReadinessBadge;
