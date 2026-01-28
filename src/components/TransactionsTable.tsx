import { useEffect, useState } from 'react';
import { ShoppingBag, Coffee, Zap, MoreHorizontal, ArrowRight } from 'lucide-react';

interface Transaction {
  id: number;
  merchant_name: string;
  merchant?: string;
  category: string;
  date: string;
  amount: number;
  total_amount?: number;
  status?: string;
}

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // 1. Definisikan URL secara dinamis (Cek Vercel env dulu, baru fallback ke HF)
    const apiUrl = import.meta.env.VITE_API_URL || 'https://riiisss-finsight-backend.hf.space';

    // 2. Ganti fetch agar tidak menembak ke 127.0.0.1 lagi
    fetch(`${apiUrl}/api/dashboard`)
      .then(res => res.json())
      .then(result => {
        // Ambil array recent_transactions dari response
        setTransactions(result.recent_transactions || []);
      })
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  // Helper untuk memilih icon dan warna tetap sama seperti kodinganmu
  const getIcon = (category: string) => {
    if (category?.toLowerCase().includes('food')) return <Coffee className="h-4 w-4 text-orange-600" />;
    if (category?.toLowerCase().includes('util')) return <Zap className="h-4 w-4 text-yellow-600" />;
    return <ShoppingBag className="h-4 w-4 text-blue-600" />;
  };

  const getBgColor = (category: string) => {
    if (category?.toLowerCase().includes('food')) return 'bg-orange-100';
    if (category?.toLowerCase().includes('util')) return 'bg-yellow-100';
    return 'bg-blue-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Recent Transactions</h3>
        <button className="text-sm text-emerald-600 font-medium flex items-center hover:underline">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Belum ada data transaksi. Coba upload struk dulu!
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${getBgColor(tx.category)}`}>
                        {getIcon(tx.category)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{tx.merchant_name || tx.merchant}</p>
                        <p className="text-xs text-gray-500">Payment via QRIS</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    - Rp {(tx.total_amount || tx.amount)?.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;