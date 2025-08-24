'use client'

import { X } from 'lucide-react';

export default function JobDetailsSidebar({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-full sm:w-[400px] md:w-[500px] bg-white h-full shadow-xl p-6 overflow-y-auto">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Job content */}
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-blue-600 font-medium mb-4">{job.company}</p>
        
        <div className="space-y-4">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Posted:</strong> {job.postedTime}</p>
          <p className="text-gray-700">{job.description}</p>
        </div>
      </div>
    </div>
  );
}
