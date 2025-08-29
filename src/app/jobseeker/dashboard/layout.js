'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/jobseeker/Header';
import Sidebar from '@/components/jobseeker/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        isMobile &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.sidebar-toggle')
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, isMobile]);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"   // 🔹 full height, no scroll
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #93C5FD 0%, transparent 55%),
          radial-gradient(circle at bottom right, #93C5FD 0%, transparent 55%)
        `,
        backgroundColor: '#F9FAFB',
      }}
    >
      {/* Header */}
      <div className="h-16 flex-shrink-0">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            sidebar
            fixed md:static inset-y-0 left-0 z-50
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen && isMobile ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'translate-x-0'}
            w-80
          `}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
