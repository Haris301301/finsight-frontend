import { Calendar } from 'lucide-react';

const Header = () => {
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Good morning, Haris!
        </h1>
        <p className="text-gray-500">Welcome back to your financial dashboard</p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <Calendar className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{getCurrentDate()}</span>
      </div>
    </div>
  );
};

export default Header;
