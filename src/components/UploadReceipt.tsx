import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// PERBAIKAN 1: Kita definisikan tipe datanya, jangan pakai 'any'
interface ReceiptData {
  merchant_name: string;
  total_amount: number;
  date: string;
  category: string;
  items: string[];
}

const UploadReceipt: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  // PERBAIKAN 2: Kita pasang tipe datanya di sini
  const [scanResult, setScanResult] = useState<ReceiptData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');
    setScanResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/scan-receipt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setScanResult(result.data);
      } else {
        setErrorMsg(result.error || "Gagal memproses gambar");
      }
    } catch (err) {
      // PERBAIKAN 3: Kita pakai variabel 'err' untuk logging
      console.error("Upload Error:", err);
      setErrorMsg("Error koneksi ke server. Pastikan backend nyala.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Upload Receipt (AI Vision)</h2>
        <p className="text-gray-500">Upload foto struk belanja, biarkan AI mengekstrak datanya.</p>
      </div>

      <div className="relative border-2 border-dashed border-emerald-500/30 rounded-xl p-12 bg-emerald-50/50 text-center hover:bg-emerald-50 transition-colors group">
        <input 
          type="file" 
          onChange={handleFileUpload} 
          accept="image/*"
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            ) : (
              <Upload className="h-8 w-8 text-emerald-600" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isUploading ? "AI is analyzing receipt..." : "Click to upload receipt image"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
          </div>
        </div>
      </div>

      {scanResult && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            <h3 className="font-bold text-lg text-gray-800">Scan Success!</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs uppercase">Merchant</p>
              <p className="font-bold text-gray-900 text-lg">{scanResult.merchant_name}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs uppercase">Total Amount</p>
              <p className="font-bold text-emerald-600 text-lg">Rp {scanResult.total_amount?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs uppercase">Date</p>
              <p className="font-medium text-gray-900">{scanResult.date}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs uppercase">Category</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold mt-1">
                {scanResult.category}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 uppercase">Items Detected</p>
            <ul className="list-disc list-inside text-gray-700">
              {scanResult.items?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-3 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default UploadReceipt;