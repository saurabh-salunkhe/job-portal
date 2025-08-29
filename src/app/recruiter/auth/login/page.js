"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { recruiterLogin, recruiterSignupStatus } from "@/lib/api"; // add recruiterSignupStatus API call
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Call backend login API
      const res = await recruiterLogin(email, password);
      const { access_token, refresh_token } = res.data;

      // 2️⃣ Decode the JWT access token to extract user ID
      const decoded = jwtDecode(access_token); // { sub: "user_id", ... }
      const recruiterId = decoded.sub;

      // 3️⃣ Store tokens in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("recruiter_id", recruiterId);

      console.log("Login success:", res.data);

      // 4️⃣ Call recruiter signup status API
      const statusRes = await recruiterSignupStatus(email);
      const { next_step } = statusRes.data;

      // 5️⃣ Redirect based on signup status
      if (next_step === "fill-company-details") {
        router.push("/recruiter/auth/company-profile");
      } else if (next_step === "create-job-post-dashboard") {
        router.push("/recruiter/dashboard");
      } else {
        // fallback
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #A5E3FF 0%, transparent 40%),
          radial-gradient(circle at bottom right, #A5E3FF 0%, transparent 40%)
        `,
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

         <button
           type="submit"
           disabled={loading}
           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
           {loading ? (
             <>
               <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
               Logging in...
              </>
           ) : (
             "Continue"
           )}
          </button>

        </form>
      </div>
    </div>
  );
}
