'use client'

import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const FilterBar = () => {
  const [filters, setFilters] = useState({
    experience: '0-1 yrs',
    location: 'Any Location',
    posting: 'Posting',
    environment: 'Workplace Environment'
  });

  return (
    <div className=" p-4 ">
      <div className="flex items-center space-x-4 overflow-x-auto">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter By :</span>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Experience Filter */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>0-1 yrs</option>
              <option>1-3 yrs</option>
              <option>3-5 yrs</option>
              <option>5+ yrs</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Any Location</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Posting Filter */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Posting</option>
              <option>Last 24 hours</option>
              <option>Last week</option>
              <option>Last month</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Environment Filter */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Workplace Environment</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
