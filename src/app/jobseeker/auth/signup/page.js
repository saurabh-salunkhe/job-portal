'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { verifyPhone, getSignupStatus } from '@/lib/api'; 

export default function SignupPage() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateMobileNumber = (mobile) => /^\d{10}$/.test(mobile.trim());

  const handleContinue = async (e) => {
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
      const statusResponse = await getSignupStatus(formattedPhone);
      const statusData = statusResponse.data;

      if (statusData.status === 'completed') {
        router.push('/jobseeker/auth/login');
        return;
      }

      if (statusData.status === 'phone_verified' && statusData.session_id) {
        localStorage.setItem('sessionId', statusData.session_id);
        localStorage.setItem('phoneForVerification', formattedPhone);
        router.push('/jobseeker/auth/complete-profile');
        return;
      }

      if (
        statusData.status === 'phone_verification_pending' ||
        statusData.status === 'expired' ||
        statusData.status === 'new_user'
      ) {
        const verifyResponse = await verifyPhone(formattedPhone);
        if (verifyResponse.data.success) {
          localStorage.setItem('phoneForVerification', formattedPhone);
          localStorage.setItem('sessionType', 'signup');
          localStorage.setItem('sessionId', verifyResponse.data.data?.sessionId || '');
          router.push('/jobseeker/auth/verify');
        } else {
          setError(verifyResponse.data.message || 'Failed to send OTP. Please try again.');
        }
        return;
      }

      setError('Unexpected status. Please try again.');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
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
    <div className="max-w-md w-full p-6  rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form onSubmit={handleContinue}>
        <label className="block mb-2 font-medium text-sm">Phone number</label>
        <div className="flex items-center border-2 p-2 mb-4 rounded bg-white">
          <span className="text-gray-500 mr-2">+91</span>
          <input
            type="text"
            placeholder="Enter 10-digit mobile number"
            className="w-full outline-none"
            value={mobile}
            onChange={handleMobileChange}
            disabled={isLoading}
            maxLength={10}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded "
          disabled={isLoading || mobile.trim().length !== 10}
        >
          {isLoading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></div>
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
}
