'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import { verifyOtp, verifyLoginOtp, resendOtp, getSignupStatus } from '@/lib/api';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem('phoneForVerification');
    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');

    if (!storedPhone || !sessionId || !sessionType) {
      setMessage('No phone number or session found. Please start over.');
      setIsError(true);
      router.push(
        sessionType === 'login'
          ? '/jobseeker/auth/login'
          : '/jobseeker/auth/signup'
      );
      return;
    }

    setPhone(storedPhone);

    const checkSignupStatus = async () => {
      try {
        if (sessionType === 'signup') {
          const statusRes = await getSignupStatus(storedPhone);
          const status = statusRes.data;

          if (status.status === 'completed') {
            router.push('/jobseeker/auth/login');
          } else if (status.status === 'phone_verified') {
            localStorage.setItem('sessionId', status.session_id);
            router.push('/jobseeker/auth/complete-profile');
          } else if (status.status === 'new_user') {
            router.push('/jobseeker/auth/signup');
          }
        }
      } catch {
        setMessage('Failed to check signup status. Try again.');
        setIsError(true);
      }
    };

    checkSignupStatus();
  }, [router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');

    if (!sessionId || !sessionType) {
      setMessage('Session information missing. Please start over.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!otp.trim() || otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response =
        sessionType === 'login'
          ? await verifyLoginOtp(sessionId, otp.trim())
          : await verifyOtp(sessionId, otp.trim());

      if (response.data.success) {
        if (sessionType === 'login') {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          localStorage.removeItem('phoneForVerification');
          localStorage.removeItem('sessionId');
          localStorage.removeItem('sessionType');
          router.push('/jobseeker/dashboard');
        } else {
          localStorage.setItem(
            'sessionId',
            response.data.data?.sessionId || sessionId
          );
          router.push('/jobseeker/auth/complete-profile');
        }
      } else {
        setMessage(response.data.message || 'Invalid OTP. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'An error occurred. Please try again later.'
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    const sessionType = localStorage.getItem('sessionType');
    if (!sessionType || !phone) {
      setMessage('Session or phone number missing. Please start over.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await resendOtp(phone, sessionType);

      if (response.data.success) {
        localStorage.setItem('sessionId', response.data.data.sessionId);
        setMessage('OTP resent successfully. Check your phone.');
        setIsError(false);
      } else {
        setMessage(response.data.message || 'Failed to resend OTP. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'An error occurred while resending OTP.'
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setMessage('');
      setIsError(false);
    }
  };

  return (
    <div className="max-w-md w-full p-6  rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <form onSubmit={handleVerify}>
        <label className="block font-medium mb-1">OTP Code</label>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          value={otp}
          onChange={handleOtpChange}
          disabled={isLoading}
          maxLength={6}
        />
        <p className="text-sm mb-4">
          Didn't receive the OTP?{' '}
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-blue-600 font-medium hover:underline disabled:text-gray-400"
            disabled={isLoading}
          >
            Resend
          </button>
        </p>
        {message && (
          <p className={`mb-4 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-2 "
          disabled={isLoading || otp.trim().length !== 6}
        >
          {isLoading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></div>
          ) : (
            'Verify'
          )}
        </button>
      </form>
    </div>
  );
}
