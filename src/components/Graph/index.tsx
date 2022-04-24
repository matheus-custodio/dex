import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { TradeList } from '../../../data';
function Graph() {
  return (
    <ResponsiveContainer width="100%" height="90%" className="my-2">
      <LineChart data={TradeList}>
        <Line type="monotone" dataKey="amount" stroke="#94A3B8" />
        <XAxis dataKey="time" />
        <YAxis dataKey="amount" />
        <CartesianGrid stroke="#1E293B" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
