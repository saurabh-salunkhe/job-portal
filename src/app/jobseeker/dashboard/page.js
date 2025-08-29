'use client'

import { useState, useEffect } from 'react';
import FilterBar from '@/components/jobseeker/FilterBar';
import JobTabs from '@/components/jobseeker/JobTabs';
import JobsList from '@/components/jobseeker/JobsList';
import JobDetailsSidebar from '@/components/jobseeker/JobDetailsSidebar';
import apiService from '@/services/apiService';

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await apiService.getAllJobPosts();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobsFetched = (filteredJobs) => setJobs(filteredJobs);
  const handleSelectJob = async (jobId) => {
    try {
      const jobData = await apiService.getJobPostById(jobId);
      setSelectedJob(jobData);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top Filter */}
      <div className="shrink-0">
        <FilterBar onJobsFetched={handleJobsFetched} />
      </div>

      {/* Split layout */}
      <div className="flex flex-1 gap-6 mt-4 overflow-hidden">
        {/* Left: Tabs + Jobs */}
        <div
          className={`flex flex-col overflow-hidden bg-white shadow-sm rounded-xl transition-all duration-300 ${
            selectedJob ? 'w-2/3' : 'w-full'
          }`}
        >
          <div className="shrink-0">
            <JobTabs />
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <p className="text-gray-600 text-center mt-8">Loading jobs...</p>
            ) : (
              <JobsList jobs={jobs} onSelectJob={handleSelectJob} />
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        {selectedJob && (
          <div className="w-1/3 flex flex-col bg-gray-50 shadow-sm rounded-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <JobDetailsSidebar
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
