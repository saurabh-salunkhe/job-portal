import axios from 'axios';


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
//jobseeker API 
// Signup: Send OTP to phone
export const verifyPhone = (phone) =>
  axios.post(`${API_BASE}/api/auth/verify-phone`, { phone });

// Signup: Complete user profile
export const completeProfile = (data) =>
  axios.post(`${API_BASE}/api/auth/complete-profile`, data);

// Login: Send OTP to phone
export const login = (phone) =>
  axios.post(`${API_BASE}/api/auth/login`, { phone });

// Login: Verify OTP for login
export const verifyLoginOtp = (sessionId, otp) =>
  axios.post(`${API_BASE}/api/auth/verify-login-otp`, { sessionId, otp });

// Signup: Verify OTP for signup
export const verifyOtp = (sessionId, otp) =>
  axios.post(`${API_BASE}/api/auth/verify-otp`, { sessionId, otp });

// Resend OTP (for both signup and login)
export const resendOtp = (phone, sessionType) =>
  axios.post(`${API_BASE}/api/auth/resend-otp`, { phone, sessionType });

// Check signup status
export const getSignupStatus = (phone) =>
  axios.post(`${API_BASE}/api/auth/signup-status`, { phone });


export const sendVerificationEmail = async (userId, email) => {
  return await axios.post(`${API_BASE}/api/auth/send-verification-email`, {
    user_id: userId, 
    email,
  });
};


export const verifyEmail = async (token) => {
  return await axios.get(`${API_BASE}/api/auth/verify-email?token=${token}`);
};

// Recruiter login API
export const recruiterLogin = async (email, password) => {
  return axios.post(`${API_BASE}/auth/recruiter/login`, {
    email,
    password
  });
};

export const recruiterSignupStatus = (email) => {
  return axios.post(`${API_BASE}/auth/recruiter/recruiter-signup-status`, {
    email,
  });
};




// Axios instance
export const api = axios.create({
  baseURL: API_BASE,
});

// ---- Request interceptor: attach access token ----
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// ---- Response interceptor: handle refresh token ----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        // Call refresh token endpoint
        const res = await axios.post(`${API_BASE}/auth/recruiter/refresh-token`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;

        // Save new access token
        localStorage.setItem("access_token", newAccessToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/recruiter/auth/login"; 
      }
    }

    return Promise.reject(error);
  }
);


export const createCompany = (FormData) => {
  return api.post(`/api/company/create`, FormData, {
   
  });
};

