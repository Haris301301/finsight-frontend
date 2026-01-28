import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, Receipt, Loader2 } from 'lucide-react';

const SummaryCards: React.FC = () => {
  const [data, setData] = useState({
    total_spending: 0,
    items_scanned: 0,
    most_expensive_category: "Loading..."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ambil URL secara dinamis dari Environment Variable Vercel
    const apiUrl = import.meta.env.VITE_API_URL || 'https://riiisss-finsight-backend.hf.space';

    // 2. Ganti fetch agar tidak menembak ke 127.0.0.1 lagi
    fetch(`${apiUrl}/api/dashboard`)
      .then(res => res.json())
      .then(result => {
        setData({
          total_spending: result.total_spending || 0,
          items_scanned: result.items_scanned || 0,
          most_expensive_category: "Food & Beverage" 
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal ambil data summary:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400 flex justify-center">
        <Loader2 className="animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* CARD 1: TOTAL SPENDING (LIVE) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">Live</span>
        </div>
        <p className="text-gray-500 text-sm font-medium">Total Spending</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          Rp {data.total_spending.toLocaleString('id-ID')}
        </h3>
      </div>

      {/* CARD 2: TOP CATEGORY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium">Top Category</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">Food & Beverage</h3>
        <p className="text-xs text-gray-400 mt-1">Based on recent scans</p>
      </div>

      {/* CARD 3: RECEIPTS SCANNED (LIVE) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-orange-50 rounded-xl">
            <Receipt className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium">Receipts Scanned</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {data.items_scanned} Items
        </h3>
        <p className="text-xs text-gray-400 mt-1">Saved in database</p>
      </div>
    </div>
  );
};

export default SummaryCards;