import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const PpraTrendChart = ({ data }) => <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="periode" /><YAxis /><Tooltip /><Line type="monotone" dataKey="lengkap" stroke="#22c55e" /></LineChart></ResponsiveContainer></div>;
export default PpraTrendChart;
