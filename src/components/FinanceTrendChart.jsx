import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const FinanceTrendChart = ({ data }) => <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="periode" /><YAxis /><Tooltip /><Line dataKey="pendapatan" stroke="#14b8a6" /><Line dataKey="belanja" stroke="#f97316" /></LineChart></ResponsiveContainer></div>;
export default FinanceTrendChart;
