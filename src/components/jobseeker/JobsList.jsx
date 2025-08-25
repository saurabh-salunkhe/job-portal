'use client'

import React from 'react';
import JobCard from './JobCard';

const JobsList = ({ jobs, onSelectJob }) => {
  if (!jobs || jobs.length === 0) {
    return <p className="text-gray-600 text-center mt-8">No jobs found.</p>;
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDetails={() => onSelectJob(job.id)} 
        />
      ))}
    </div>
  );
};

export default JobsList;
