import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import SpendingChart from './SpendingChart';
import TransactionsTable from './TransactionsTable';
import AIChatSidebar from './AIChatSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Header />
          <SummaryCards />
          <SpendingChart />
          <TransactionsTable />
        </div>
      </div>

      <AIChatSidebar />
    </div>
  );
};

export default DashboardLayout;
