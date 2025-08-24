'use client'

import { useState } from 'react';
import FilterBar from '@/components/jobseeker/FilterBar';
import JobTabs from '@/components/jobseeker/JobTabs';
import JobsList from '@/components/jobseeker/JobsList';
import JobDetailsSidebar from '@/components/jobseeker/JobDetailsSidebar';

// export const metadata = {
//   title: 'Dashboard - tAskify',
//   description: 'Find your perfect job - Browse recommended jobs and opportunities',
// };

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <main className="min-h-screen">
      {/* 🔹 Full-width FilterBar */}
      <div>
        <FilterBar />
      </div>

      {/* 🔹 Centered Content */}
      <div className="max-w-6xl mx-auto bg-white shadow-sm mt-4 rounded-xl overflow-hidden">
        <JobTabs />
        {/* Pass setSelectedJob down to JobsList so JobCard “Details” works */}
        <JobsList onSelectJob={setSelectedJob} />
      </div>

      {/* 🔹 Sidebar for job details */}
      <JobDetailsSidebar
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </main>
  );
}
