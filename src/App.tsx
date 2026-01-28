import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIChatSidebar from './components/AIChatSidebar';
import SummaryCards from './components/SummaryCards';
import SpendingChart from './components/SpendingChart';
import TransactionsTable from './components/TransactionsTable';

// Import Semua Halaman
import UploadReceipt from './components/UploadReceipt';
import TransactionsPage from './components/TransactionsPage';
import AIInsightsPage from './components/AIInsightsPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage'; // Import Login Page

function App() {
  // Ubah default state jadi 'login' biar pertama buka langsung minta login
  const [activePage, setActivePage] = useState('login');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">Good morning, Haris!</h2>
                  <p className="text-gray-500">Welcome back to your financial dashboard</p>
               </div>
               <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600">
                  Tuesday, January 27, 2026
               </div>
            </div>
            <SummaryCards />
            <SpendingChart />
            <TransactionsTable />
          </div>
        );
      case 'transactions':
        return <TransactionsPage />;
      case 'upload':
        return <UploadReceipt />;
      case 'insights':
        return <AIInsightsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <div className="p-10 text-center">Page Not Found</div>;
    }
  };

  // LOGIKA KHUSUS: Kalau statusnya 'login', tampilkan Login Page Full Screen
  if (activePage === 'login') {
    return <LoginPage onLogin={() => setActivePage('dashboard')} />;
  }

  // Kalau sudah login, tampilkan Dashboard lengkap dengan Sidebar
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </main>
      </div>

      <div className="hidden lg:block border-l border-gray-200 bg-white">
        <AIChatSidebar />
      </div>
    </div>
  );
}

export default App;