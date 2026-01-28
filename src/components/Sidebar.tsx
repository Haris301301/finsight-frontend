import { LayoutDashboard, Receipt, Upload, Sparkles, Settings } from 'lucide-react';

// 1. Kita tambahkan Interface biar Typescript tidak marah
interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

// 2. Terima props activePage & setActivePage di sini
const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  
  // 3. Kita ubah navItems jadi lebih sederhana, logika active-nya kita pindah ke bawah
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'upload', icon: Upload, label: 'Upload Receipt' },
    { id: 'insights', icon: Sparkles, label: 'AI Insights' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col hidden md:flex">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">FinSight AI</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Cek apakah item ini sedang aktif
            const isActive = activePage === item.id;

            return (
              <li key={item.id}>
                <button
                  // 4. Tambahkan fungsi onClick di sini
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-medium">
            H
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Haris</p>
            <p className="text-xs text-gray-500">haris@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;