// src/components/DashboardHeader.js
import { Search, User, Briefcase } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo + Title */}
        <div className="flex items-center space-x-4">
          <div className="bg-white text-blue-600 p-2 rounded">
            <Briefcase size={24} />
          </div>
          <span className="text-xl font-bold">Recruiter</span>
        </div>

        {/* Search bar */}
        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder=""
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer">
            <User size={16} />
          </div>
          <span className="text-sm">Recruiter</span>
        </div>
      </div>
    </header>
  );
}
