// src/components/RecentJobPostingCard.js
import { Eye } from 'lucide-react';

export default function RecentJobPostingCard({ job }) {
  // Map expired -> Draft for UI
  const displayStatus = job.status.toLowerCase() === "expired" ? "Draft" : job.status;

  // Pick badge color
  const statusClasses =
    displayStatus.toLowerCase() === "active"
      ? "bg-green-100 text-green-800"
      : displayStatus.toLowerCase() === "closed"
      ? "bg-red-100 text-red-800"
      : "bg-purple-100 text-purple-800"; // Draft

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-500">Salary: {job.salary}</span>
          <span className="text-sm text-gray-500">Type: {job.type}</span>
          <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses}`}
        >
          {displayStatus}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-1">
          <Eye size={16} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}
