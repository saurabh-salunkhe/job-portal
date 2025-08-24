// src/app/dashboard/layout.js
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import Sidebar from '@/components/recruiter/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}