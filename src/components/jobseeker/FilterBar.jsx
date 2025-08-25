'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import apiService from '@/services/apiService';

const FilterBar = ({ onJobsFetched }) => {
  const [filters, setFilters] = useState({
    experience_level: '',
    location: '',
    job_type: '',
    status: 'active',
  });

  // Fetch jobs whenever filters change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let jobs;

        // ✅ If no filters selected → get all jobs
        const noFilters =
          !filters.experience_level &&
          !filters.location &&
          !filters.job_type &&
          (!filters.status || filters.status === 'active');

        if (noFilters) {
          jobs = await apiService.getAllJobPosts();
        } else {
          jobs = await apiService.filterJobs(filters);
        }

        if (onJobsFetched) onJobsFetched(jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, [filters]);

  // ✅ Reset all filters
  const clearFilters = () => {
    setFilters({
      experience_level: '',
      location: '',
      job_type: '',
      status: 'active',
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 overflow-x-auto">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter By :</span>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Experience Filter */}
          <div className="relative">
            <select
              value={filters.experience_level}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, experience_level: e.target.value }))
              }
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Experience</option>
              <option value="0-1yrs">0-1 yrs</option>
              <option value="2-4yrs">2-4 yrs</option>
              <option value="5-8yrs">5-8 yrs</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Location Filter (manual input) */}
          <div className="relative">
            <input
              type="text"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Enter location"
              className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Type Filter */}
          <div className="relative">
            <select
              value={filters.job_type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, job_type: e.target.value }))
              }
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="appearance-none bg-white border border-gray-700 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="expired">Expired</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            <X className="w-4 h-4 mr-1" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
