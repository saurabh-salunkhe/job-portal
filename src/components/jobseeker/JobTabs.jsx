'use client'

import React, { useState } from 'react';

const JobTabs = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  const tabs = [
    { id: 'recommended', label: 'Recommended', active: true },
    { id: 'preferred', label: 'preferred', active: false },
    { id: 'you-might-like', label: 'You might like', active: false }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Jobs for you</h2>
        
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobTabs;