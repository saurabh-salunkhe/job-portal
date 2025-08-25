// src/services/apiService.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiService {
  // ---------------- JOB POSTS ----------------

  async createJobPost(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/create-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create job post");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating job post:", error);
      throw error;
    }
  }

  async getAllJobPosts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/get-all-posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const text = await response.text();
      console.log("Raw response:", text);

      try {
        return JSON.parse(text);
      } catch (jsonErr) {
        console.error("Not valid JSON, got HTML or error page instead.");
        throw jsonErr;
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
      throw error;
    }
  }

  async getJobPostById(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/job-post/${jobId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch job post");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching job post:", error);
      throw error;
    }
  }

  async updateJobPost(jobId, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/job-post/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update job post");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating job post:", error);
      throw error;
    }
  }

  async filterJobs(filters = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (filters.experience_level)
        queryParams.append("experience_level", filters.experience_level);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.job_type) queryParams.append("job_type", filters.job_type);
      if (filters.status) queryParams.append("status", filters.status);

      const url = `${API_BASE_URL}/api/jobs/filter?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch filtered jobs");
      }

      return await response.json();
    } catch (error) {
      console.error("Error filtering jobs:", error);
      throw error;
    }
  }

  // ---------------- APPLICATIONS ----------------

  async applyJob(applicationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/apply-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to apply for job");
      }

      return await response.json();
    } catch (error) {
      console.error("Error applying for job:", error);
      throw error;
    }
  }

  async getUserApplications(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch user applications");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user applications:", error);
      throw error;
    }
  }

  async getJobApplications(jobPostId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/job/${jobPostId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch job applications");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching job applications:", error);
      throw error;
    }
  }
}

export default new ApiService();
