'use client'

import React, { useState } from 'react';
import { MapPin, Clock, Heart, Bookmark, IndianRupee } from 'lucide-react';

const JobCard = ({ job, onDetails }) => {   // <-- accept onDetails as prop
  const [isFavorited, setIsFavorited] = useState(job.isFavorited || false);
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);

  // Format posted date
  const formatPostedTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full">
      
      {/* Header Section */}
      <div className="flex justify-between items-start">
        {/* Left: Logo + Title + Company */}
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {job.company?.[0] || 'C'}
            </span>
          </div>

          {/* Job Title & Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              {job.company}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-full transition-colors ${
              isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-200 mt-3"></div>

      {/* Middle: Job Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <IndianRupee className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>
            {job.salary_min && job.salary_max
              ? `₹${job.salary_min.toLocaleString()} - ₹${job.salary_max.toLocaleString()}`
              : job.salary_min
              ? `₹${job.salary_min.toLocaleString()}`
              : job.salary_max
              ? `₹${job.salary_max.toLocaleString()}`
              : 'Not specified'
            }
          </span>
       </div>

        {/* Bottom Row: Posted Date + Details Button */}
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center text-gray-400 text-xs">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Posted {formatPostedTime(job.created_at)}</span>
          </div>

          <button 
            onClick={() => onDetails(job.id)}   // <-- call prop here
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
