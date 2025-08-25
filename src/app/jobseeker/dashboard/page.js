'use client'

import { useState, useEffect } from 'react';
import FilterBar from '@/components/jobseeker/FilterBar';
import JobTabs from '@/components/jobseeker/JobTabs';
import JobsList from '@/components/jobseeker/JobsList';
import JobDetailsSidebar from '@/components/jobseeker/JobDetailsSidebar';
import apiService from '@/services/apiService';

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);           // 🔹 store all/filtered jobs
  const [loading, setLoading] = useState(true);

  // Fetch all jobs initially
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

  // 🔹 Callback from FilterBar when filters change
  const handleJobsFetched = (filteredJobs) => {
    setJobs(filteredJobs);
  };

  // 🔹 Fetch full job details by ID
  const handleSelectJob = async (jobId) => {
    try {
      const jobData = await apiService.getJobPostById(jobId);
      setSelectedJob(jobData);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  return (
    <main className="min-h-screen">
      {/* 🔹 Full-width FilterBar */}
      <div>
        <FilterBar onJobsFetched={handleJobsFetched} />
      </div>

      {/* 🔹 Split View Container */}
      <div className="flex max-w-7xl mx-auto mt-4 h-[calc(100vh-120px)] gap-6 bg-transparent">
        {/* Left: Job Tabs + Job List */}
        <div
          className={`transition-all duration-300 overflow-y-auto ${
            selectedJob ? 'w-2/3' : 'w-full'
          } bg-white shadow-sm rounded-xl`}
        >
          <JobTabs />
          {loading ? (
            <p className="text-gray-600 text-center mt-8">Loading jobs...</p>
          ) : (
            <JobsList jobs={jobs} onSelectJob={handleSelectJob} />
          )}
        </div>

        {/* Right: Sidebar (only visible if job is selected) */}
        {selectedJob && (
          <div className="w-1/3 h-full overflow-y-auto bg-gray-50 shadow-sm rounded-xl">
            <JobDetailsSidebar
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
