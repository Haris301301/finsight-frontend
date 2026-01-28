import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Coffee, ShoppingCart, Zap, Car, ShoppingBag, Loader2 } from 'lucide-react';

// 1. Definisi Tipe Data dari Backend
interface Transaction {
  id: number;
  merchant_name: string;
  total_amount: number;
  category: string;
  date: string;
  items: string[];
}

const TransactionsPage: React.FC = () => {
  // 2. State untuk Data & Search
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 3. Ambil Data dari Python saat halaman dibuka
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal ambil transaksi:", err);
        setLoading(false);
      });
  }, []);

  // 4. Logika Search Filter
  const filteredTransactions = transactions.filter(tx => 
    tx.merchant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 5. Helper: Pilih Ikon berdasarkan Kategori (Sesuai desain kamu)
  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('food')) return <Coffee className="h-4 w-4 text-orange-600" />;
    if (c.includes('shop')) return <ShoppingCart className="h-4 w-4 text-blue-600" />;
    if (c.includes('util')) return <Zap className="h-4 w-4 text-yellow-600" />;
    if (c.includes('transport')) return <Car className="h-4 w-4 text-emerald-600" />;
    return <ShoppingBag className="h-4 w-4 text-gray-600" />;
  };

  // 6. Helper: Pilih Warna Background Ikon (Sesuai desain kamu)
  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('food')) return 'bg-orange-100';
    if (c.includes('shop')) return 'bg-blue-100';
    if (c.includes('util')) return 'bg-yellow-100';
    if (c.includes('transport')) return 'bg-emerald-100';
    return 'bg-gray-100';
  };

  // 7. Helper: Format Tanggal (Contoh: 2026-01-26 jadi Jan 26, 2026)
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tools (Sama Persis dengan codinganmu) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <p className="text-gray-500">Manage and categorize your expenses.</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Download className="h-4 w-4 mr-2" /> Export Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search Bar (Sudah dihidupkan dengan value & onChange) */}
        <div className="p-4 border-b border-gray-100 flex items-center">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="outline-none text-sm w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Merchant</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Amount</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Logic Loading */}
            {loading ? (
               <tr><td colSpan={5} className="text-center py-8 text-gray-500"><Loader2 className="animate-spin h-6 w-6 mx-auto mb-2"/>Loading data...</td></tr>
            ) : filteredTransactions.length === 0 ? (
               <tr><td colSpan={5} className="text-center py-8 text-gray-500">No transactions found.</td></tr>
            ) : (
              /* Logic Mapping Data */
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getCategoryColor(tx.category)}`}>
                        {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                        <span className="font-medium text-gray-800 block">{tx.merchant_name}</span>
                        {/* Menampilkan item belanja kecil di bawah nama toko */}
                        <span className="text-xs text-gray-400">{tx.items[0]} {tx.items.length > 1 ? `+${tx.items.length - 1} more` : ''}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{tx.category}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(tx.date)}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">
                    - Rp {tx.total_amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Success</span>
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

export default TransactionsPage;