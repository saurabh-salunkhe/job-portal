import React from 'react';
import JobCard from './JobCard';

const JobsList = () => {
  const jobs = [
    {
      id: 1,
      title: 'Electrician',
      company: 'Esi Bus',
      location: 'Vashim',
      salary: '₹ 15,000- 20,000',
      postedTime: '2 weeks ago',
      isBookmarked: false,
      isFavorited: false
    },
    {
      id: 2,
      title: 'Electrician',
      company: 'Esi Bus',
      location: 'Vashim',
      salary: '₹ 15,000- 20,000',
      postedTime: '2 weeks ago',
      isBookmarked: false,
      isFavorited: false
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;