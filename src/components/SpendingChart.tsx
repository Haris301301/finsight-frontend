// 1. Perbaikan TS6133: Hapus 'React' karena tidak dipanggil secara eksplisit
import { useEffect, useState } from 'react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BackendTrendItem {
  name: string;
  amount: number;
}

const SpendingChart = () => {
  const [data, setData] = useState([
    { week: 'Week 1', spending: 0 },
    { week: 'Week 2', spending: 0 },
    { week: 'Week 3', spending: 0 },
    { week: 'Week 4', spending: 0 },
  ]);

  useEffect(() => {
    // 2. Gunakan Environment Variable atau Direct URL Hugging Face kamu
    // Jangan gunakan 127.0.0.1 agar bisa jalan di Vercel
    const apiUrl = import.meta.env.VITE_API_URL || 'https://riiisss-finsight-backend.hf.space';

    fetch(`${apiUrl}/api/dashboard`)
      .then(res => res.json())
      .then(result => {
        if (result.spending_trend) {
          const formattedData = result.spending_trend.map((item: BackendTrendItem) => ({
            week: item.name,
            spending: item.amount
          }));
          setData(formattedData);
        }
      })
      .catch(err => console.error("Error fetching chart data:", err));
  }, []);

  const formatCurrency = (value: number) => {
    return `Rp ${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Spending Trend per Week
        </h2>
        <p className="text-sm text-gray-500">Real-time Data</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            formatter={(value: number | string | Array<number | string> | undefined) => {
              if (value === undefined) return ['', 'Spending'];
              return [
                `Rp ${typeof value === 'number' ? value.toLocaleString('id-ID') : value}`,
                'Spending'
              ];
            }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey="spending" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;