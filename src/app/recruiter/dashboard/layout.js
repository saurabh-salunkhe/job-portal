// src/app/dashboard/layout.js
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import Sidebar from '@/components/recruiter/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header fixed at top */}
      <DashboardHeader />

      {/* Main content flex */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixed height */}
        <Sidebar />

        {/* Dashboard content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
