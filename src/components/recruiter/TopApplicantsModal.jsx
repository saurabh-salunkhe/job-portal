"use client";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";

export default function TopApplicantsModal({ isOpen, onClose, jobId }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔍 Modal open state:", isOpen, "Job ID:", jobId);

    if (isOpen && jobId) {
      console.log("⚡ Fetching applicants for job:", jobId);
      setApplicants([]); // ✅ clear old data before fetching
      setLoading(true);

      apiService
        .getTopApplicants(jobId)
        .then((data) => {
          console.log("✅ Applicants fetched:", data);
          setApplicants(data || []);
        })
        .catch((err) => {
          console.error("❌ Error fetching applicants:", err);
        })
        .finally(() => {
          console.log("⏳ Finished fetching applicants");
          setLoading(false);
        });
    }
  }, [isOpen, jobId]);

  if (!isOpen) {
    console.log("🚪 Modal closed, not rendering UI");
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => {
            console.log("❎ Modal closed by user");
            onClose();
          }}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Top Applicants</h2>

        {/* Loading state */}
        {loading && <p className="text-gray-600">Loading applicants...</p>}

        {/* No applicants */}
        {!loading && applicants.length === 0 && (
          <p className="text-gray-600">No applicants found for this job.</p>
        )}

        {/* Applicants List */}
        <ul className="space-y-3">
          {applicants.map((applicant, index) => {
            console.log(`👤 Rendering applicant #${index + 1}:`, applicant);
            return (
              <li
                key={applicant.user_id}
                className="border p-3 rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="font-medium">{applicant.applicant_name}</p>
                <p className="text-sm text-gray-600">
                  Match Score: {applicant.match_score}%
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                  {applicant.summary}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
