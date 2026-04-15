import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const IndicatorRecapChart = ({ data }) => <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#6366f1" /></BarChart></ResponsiveContainer></div>;
export default IndicatorRecapChart;
