'use client'

import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Heart, Bookmark } from 'lucide-react';

const JobCard = ({ job }) => {
  const [isFavorited, setIsFavorited] = useState(job.isFavorited || false);
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        {/* Job Info */}
        <div className="flex-1">
          <div className="flex items-start space-x-4">
            {/* Company Logo */}
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">E</span>
            </div>

            {/* Job Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{job.title}</h3>
              <p className="text-blue-600 text-sm mb-3">{job.company}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
                
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Posted {job.postedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions (icons + button together) */}
        <div className="flex flex-col items-end space-y-12 ml-4 flex-shrink-0">
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

          {/* Details Button inline with actions */}
          <div className="mt-6 flex justify-end">
            <button 
             onClick={() => job.onDetails(job)}
             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
               Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
