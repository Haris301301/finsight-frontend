import React from 'react';
import { User, Bell, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-500">Manage your account preferences and notifications.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        
        {/* Profile Section */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-gray-400" /> Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Haris Azhari Ramadhan" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="haris@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
           <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-gray-400" /> Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Email me weekly summary</span>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
            </div>
             <div className="flex items-center justify-between">
                <span className="text-gray-600">Alert me on unusual spending</span>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6 bg-gray-50 flex justify-end rounded-b-xl">
            <button className="flex items-center bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Save className="h-4 w-4 mr-2" /> Save Changes
            </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;