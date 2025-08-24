'use client'

import React from 'react';
import { Home, Briefcase, Building2, X } from 'lucide-react';

const Sidebar = ({ onClose, isMobile }) => {
  return (
    <aside className="w-70 bg-white shadow-lg border-2 border-gray-200 min-h-screen 
                      my-4 ml-4 md:ml-6 rounded-2xl overflow-hidden">
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end p-4 border-b border-gray-200 md:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}

      {/* Profile Section */}
      {/* <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-4 border-blue-500">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-2xl font-bold">N</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Nohal Godse</h3>
          <p className="text-sm text-gray-600 text-center mb-1">Bachelor in Design,</p>
          <p className="text-sm text-gray-600 text-center">@ Delhi Technological University</p>
          <p className="text-xs text-blue-500 mt-2">Updated 6 weeks ago</p>
          
          <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors">
            Complete profile
          </button>
        </div>
      </div> */}

      {/* Performance Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <h4 className="text-sm font-semibold text-gray-900">Your Performance</h4>
          <div className="ml-2 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center cursor-help">
            <span className="text-gray-600 text-xs">i</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Connections Today</p>
            <p className="text-2xl font-bold text-blue-600">28</p>
            <p className="text-xs text-gray-400">↗</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Recruitment Offers</p>
            <p className="text-2xl font-bold text-blue-600">129</p>
            <p className="text-xs text-gray-400">↗</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-6">
        <ul className="space-y-2">
          <li>
            <a 
              href="#" 
              className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={isMobile ? onClose : undefined}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center space-x-3 py-2 px-3 rounded-lg bg-blue-50 text-blue-600"
              onClick={isMobile ? onClose : undefined}
            >
              <Briefcase className="w-5 h-5" />
              <span>Jobs</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={isMobile ? onClose : undefined}
            >
              <Building2 className="w-5 h-5" />
              <span>Companies</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
