import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, User, Bot, Loader2 } from 'lucide-react';

const AIChatSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Halo! Saya FinSight AI. Ada yang bisa saya bantu soal keuanganmu hari ini?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Maaf, koneksi ke server terputus. Pastikan backend Python nyala." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNGSI BARU: PENERJEMAH FORMAT TEKS ---
  // Fungsi ini mengubah tanda **teks** menjadi <strong>teks</strong> (huruf tebal)
  const renderMessage = (text: string) => {
    // 1. Pecah teks berdasarkan baris baru (\n) biar paragrafnya rapi
    return text.split('\n').map((line, i) => (
      <p key={i} className={`mb-1 ${line.trim() === '' ? 'h-2' : ''}`}>
        {/* 2. Pecah baris berdasarkan tanda ** */}
        {line.split('**').map((part, j) => 
          // Jika urutan ganjil (di antara **), buat jadi tebal
          j % 2 === 1 ? <strong key={j} className="font-bold">{part}</strong> : part
        )}
      </p>
    ));
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all z-50"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 z-40 flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-emerald-50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h3 className="font-bold text-gray-800">FinSight Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-800' : 'bg-emerald-100'}`}>
              {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-emerald-600" />}
            </div>
            {/* Di sini kita pakai fungsi renderMessage tadi */}
            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-gray-800 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>
              {renderMessage(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-emerald-600" />
             </div>
             <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Sedang mengetik...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya soal keuangan..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatSidebar;