'use client';
import { useState, useEffect } from 'react';
import StatCard from '@/components/recruiter/StatCard';
import RecentJobPostingCard from '@/components/recruiter/RecentJobPostingCard';
import CandidateFilters from '@/components/recruiter/CandidateFilters';
import CreateJobModal from '@/components/recruiter/CreateJobModal';
import TopApplicantsModal from '@/components/recruiter/TopApplicantsModal';
import ApiService from '@/services/apiService';

export default function DashboardPage() {
  // ✅ separate modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      setLoading(true);
      const posts = await ApiService.getAllJobPosts();

      const transformedPosts = posts.map(post => ({
        id: post.id,
        job_post_id: post.job_post_id,
        title: post.title,
        company: post.company,
        salary: post.salary_min && post.salary_max
          ? `₹${post.salary_min.toLocaleString()} - ₹${post.salary_max.toLocaleString()}`
          : 'Salary not specified',
        status: post.status.charAt(0).toUpperCase() + post.status.slice(1),
        type: post.job_type,
        postedDate: formatPostedDate(post.posted_date),
        location: post.location,
        description: post.description,
        requirements: post.requirements,
        experience_level: post.experience_level
      }));

      setJobPostings(transformedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPostedDate = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleCreateJob = async (jobData) => {
    try {
      setCreateLoading(true);
      const jobWithRecruiter = {
        ...jobData,
        recruiter_id: localStorage.getItem("recruiter_id"),
      };

      const newJobPost = await ApiService.createJobPost(jobWithRecruiter);

      const transformedPost = {
        id: newJobPost.id,
        job_post_id: newJobPost.job_post_id,
        title: newJobPost.title,
        company: newJobPost.company,
        salary: newJobPost.salary_min && newJobPost.salary_max
          ? `₹${newJobPost.salary_min.toLocaleString()} - ₹${newJobPost.salary_max.toLocaleString()}`
          : 'Salary not specified',
        status: newJobPost.status.charAt(0).toUpperCase() + newJobPost.status.slice(1),
        type: newJobPost.job_type,
        postedDate: 'Just now',
        location: newJobPost.location,
        description: newJobPost.description,
        requirements: newJobPost.requirements,
        experience_level: newJobPost.experience_level
      };

      setJobPostings(prev => [transformedPost, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  // ✅ open TopApplicantsModal
  const handleOpenApplicants = (jobId) => {
    setSelectedJobId(jobId);
    setIsApplicantsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={createLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          {createLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </>
          ) : (
            <span>Create New Job Posting</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-6 bg-gray-50">
        <div className="flex flex-col h-full gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
            <StatCard
              title="Active Job Postings"
              description="Currently open job listings"
              value={jobPostings.filter(job => job.status.toLowerCase() === 'active').length.toString()}
              color="blue"
            />
            <StatCard
              title="Total Job Posts"
              description="All job posts created"
              value={jobPostings.length.toString()}
              color="green"
            />
            <StatCard
              title="Draft Posts"
              description="Posts in draft status"
              value={jobPostings.filter(job => job.status.toLowerCase() === 'expired').length.toString()}
              color="purple"
            />
          </div>

          {/* Job Postings + Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
            {/* Recent Jobs */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Recent Job Postings</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-600">Loading job posts...</span>
                  </div>
                ) : jobPostings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No job posts found. Create your first job posting!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobPostings.map((job) => (
                      <RecentJobPostingCard 
                        key={job.id} 
                        job={job} 
                        onDetailsClick={handleOpenApplicants} // ✅ pass handler
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Candidate Filters */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Candidate Filters</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <CandidateFilters />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateJob}
        loading={createLoading}
      />

      {/* Top Applicants Modal */}
      <TopApplicantsModal
        isOpen={isApplicantsModalOpen}
        jobId={selectedJobId}
        onClose={() => {
          setIsApplicantsModalOpen(false);
          setSelectedJobId(null);
        }}
      />
    </div>
  );
}
