import React from 'react';
import { X, MapPin, IndianRupee, Briefcase, Clock } from 'lucide-react';

const JobDetailsSidebar = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="h-full w-full bg-white border-l shadow-sm p-6 relative flex flex-col">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto pr-2 flex-1">
        {/* Header */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold">{job.title || 'Untitled Job'}</h2>
          <p className="text-sm text-gray-500">{job.company || 'Unknown Company'}</p>
          <hr className="mt-2" />
        </div>

        <div className="space-y-6 text-sm text-gray-700">
          {/* Row 1: Job Type + Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-gray-500">
                <Briefcase className="w-4 h-4 mr-2" />
                Job Type
              </div>
              <p className="font-semibold ml-6">{job.job_type || 'Full Time'}</p>
            </div>

            <div>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Experience
              </div>
              <p className="font-semibold ml-6">{job.experience_level || 'N/A'}</p>
            </div>
          </div>

          {/* Row 2: Location + Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </div>
              <p className="font-semibold ml-6">{job.location || 'Not specified'}</p>
            </div>

            {job.salary_min && job.salary_max && (
              <div>
                <div className="flex items-center text-gray-500">
                  <IndianRupee className="w-4 h-4 mr-2" />
                  Salary
                </div>
                <p className="font-semibold ml-6">
                  ₹{job.salary_min} - ₹{job.salary_max}
                </p>
              </div>
            )}
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Skills</h3>
          <p className="text-sm text-gray-600">
            {job.requirements || 'No requirements provided'}
          </p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Description</h3>
          <p className="text-sm text-gray-600">
            {job.description || 'No description provided'}
          </p>
        </div>
      </div>

      {/* Footer Apply Button */}
      <div className="pt-4 border-t mt-auto flex justify-center">
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsSidebar;
