import { useEffect, useState } from 'react';
import { IndianRupeeIcon, FileText, Users, MapPin } from 'lucide-react';
import apiService from '@/services/apiService'; // Make sure this path is correct

export default function RecentJobPostingCard({ job, onDetailsClick }) {
  const [applicationCount, setApplicationCount] = useState('...');
  const [jobPostId, setJobPostId] = useState(job.job_post_id || job.id);

  // Use useEffect to fetch the application count when the component mounts
  useEffect(() => {
    
    if (job.id) {
      apiService.getJobApplications(job.id)
        .then(data => {
          
          setApplicationCount(data.total);
         
          if (data.applications && data.applications.length > 0) {
            setJobPostId(data.applications[0].job_post_id);
          }
        })
        .catch(error => {
          console.error("Error fetching application count:", error);
          setApplicationCount('N/A');
        });
    }
  }, [job.id]);

  const displayStatus =
    job.status.toLowerCase() === "expired" ? "Draft" : job.status;

  const statusClasses =
    displayStatus.toLowerCase() === "active"
      ? "bg-green-100 text-green-800"
      : displayStatus.toLowerCase() === "closed"
      ? "bg-red-100 text-red-800"
      : "bg-purple-100 text-purple-800"; // Draft

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">
            {job.title.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Job title + company */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {job.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {job.company || "Edit Role"}
          </p>

          {/* Middle Row */}
          <div className="flex items-center justify-between mt-2">
            {/* Left side */}
            <div className="flex space-x-8 text-sm text-gray-500">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  <span className="font-semibold">{job.location || ""}</span>
                </div>
                <div className="flex items-center">
                  <IndianRupeeIcon size={12} className="mr-1" />
                  <span className="font-semibold">
                    {job.salary || "₹ 15,000- 20,000"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                {/* Display dynamic Applications count */}
                <div className="flex items-center">
                  <Users size={12} className="mr-1" />
                  <span className="font-semibold">
                    {applicationCount} Applications
                  </span>
                </div>
                <div className="flex items-center">
                  <FileText size={12} className="mr-1" />
                  <span className="font-semibold">
                    Top Resume Match • {job.matchPercentage || "98 %"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3 ml-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses} whitespace-nowrap`}
              >
                {displayStatus}
              </span>

              {/* <button
                // Pass the stored jobPostId to the handler
                onClick={() => onDetailsClick(jobPostId)}
                  console.log("Sending job ID to modal:", job.id);
                  console.log("Job object:", job);
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Details
              </button> */}
              <button
              onClick={() => {
                console.log("Sending job ID to modal:", job.id);
                console.log("Job object:", job);
                onDetailsClick(jobPostId);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Details
            </button>

            </div>
          </div>

          {/* Posted date */}
          <p className="text-xs text-gray-400 mt-2">{job.postedDate}</p>
        </div>
      </div>
    </div>
  );
}