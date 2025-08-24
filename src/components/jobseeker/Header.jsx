'use client'

import React from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

const Header = ({ onMenuClick, sidebarOpen, isMobile }) => {
  return (
    <header className="  px-4 md:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="sidebar-toggle p-2 rounded-lg hover:bg-gray-100 md:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">t</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">tAskify</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Jobs</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Companies</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Candidates</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Resources</a>
        </nav>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-blue-600">
            <Search className="w-6 h-6" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">N</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;