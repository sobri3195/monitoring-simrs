const color = { Tercapai: 'bg-emerald-100 text-emerald-700', 'Belum Tercapai': 'bg-red-100 text-red-700', 'Tidak Ada Data': 'bg-slate-100 text-slate-700' };
const IndicatorAchievementBadge = ({ status }) => <span className={`rounded-full px-2 py-1 text-xs ${color[status] || color['Tidak Ada Data']}`}>{status}</span>;
export default IndicatorAchievementBadge;
