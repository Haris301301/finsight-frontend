import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertTriangle, Target, Lightbulb, Loader2 } from 'lucide-react';

// Tipe data dari Backend
interface Recommendation {
  type: string;
  title: string;
  desc: string;
}

interface InsightData {
  score: number;
  savings_potential: number;
  recommendations: Recommendation[];
}

const AIInsightsPage: React.FC = () => {
  const [data, setData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/insights')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal ambil insight:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mb-2 text-emerald-600" />
        <p>Sedang mengaudit keuanganmu...</p>
      </div>
    );
  }

  // Jika data kosong atau error
  if (!data) return <div>Data tidak tersedia.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">AI Financial Insights</h2>
        <p className="text-gray-500">Analisa mendalam kesehatan finansialmu oleh Gemini 2.5.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Score */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-indigo-100 font-medium mb-1">Financial Health Score</p>
              <h3 className="text-5xl font-bold">{data.score}<span className="text-2xl text-indigo-300">/100</span></h3>
            </div>
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="mt-6 relative z-10">
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${data.score > 70 ? 'bg-emerald-400' : 'bg-amber-400'}`} 
                style={{ width: `${data.score}%` }}
              ></div>
            </div>
            <p className="text-sm text-indigo-100 mt-2">
              {data.score > 80 ? "Sangat Sehat! Pertahankan." : "Perlu perbaikan pola belanja."}
            </p>
          </div>
        </div>

        {/* Savings Potential */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium">Potensi Hemat</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                Rp {data.savings_potential.toLocaleString('id-ID')}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Estimasi penghematan jika mengikuti saran AI di bawah ini.
          </p>
        </div>
      </div>

      {/* AI Recommendations List */}
      <h3 className="font-bold text-gray-800 text-lg">Saran Auditor AI</h3>
      <div className="space-y-4">
        {data.recommendations.map((item, idx) => (
          <div key={idx} className={`border rounded-xl p-4 flex items-start space-x-4 ${
            item.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'
          }`}>
            <div className={`p-2 rounded-full shrink-0 ${
              item.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
            }`}>
              {item.type === 'warning' ? (
                <AlertTriangle className={`h-5 w-5 ${item.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
              ) : (
                <Lightbulb className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsPage;