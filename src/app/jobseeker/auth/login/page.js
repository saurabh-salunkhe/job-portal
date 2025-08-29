'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/lib/api'; 
import React from 'react';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile.trim());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formattedPhone = `+91${mobile.trim()}`;

    if (!validateMobileNumber(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await login(formattedPhone);

      if (res.data.success) {
        localStorage.setItem('phoneForVerification', formattedPhone);
        localStorage.setItem('sessionId', res.data.data.sessionId);
        localStorage.setItem('sessionType', 'login');
        router.push('/jobseeker/auth/login/verify');
      } else if (res.data.error === 'INCOMPLETE_SIGNUP') {
        localStorage.setItem('phoneForVerification', formattedPhone);
        localStorage.setItem('sessionId', res.data.data.sessionId);
        localStorage.setItem('sessionType', 'signup');
        router.push('/jobseeker/auth/complete-profile');
      } else {
        setError(res.data.message || 'Failed to initiate login. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setMobile(value);
      setError('');
    }
  };

  return (
    <div className="w-full max-w-md  rounded ">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <form onSubmit={handleLogin}>
        <label className="text-sm font-semibold mb-1 block">Phone number</label>
        <div className="flex items-center border p-2 mb-4 rounded bg-white">
          <span className="text-gray-500 mr-2">+91</span>
          <input
            type="text"
            placeholder="Enter 10-digit mobile number"
            className="w-full outline-none border-none focus:ring-0"
            value={mobile}
            onChange={handleMobileChange}
            disabled={isLoading}
            maxLength={10}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center "
          disabled={isLoading || mobile.trim().length !== 10}
        >
          {isLoading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
          ) : ( 
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
}
