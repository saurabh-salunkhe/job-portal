'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { completeProfile } from '@/lib/api';

export default function CompleteProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');
    if (!sessionId || sessionType !== 'signup') {
      setError('No valid session found. Please start over from signup.');
      router.push('/jobseeker/auth/signup'); 
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      setError('Session ID not found. Please start over from signup.');
      setIsLoading(false);
      return;
    }

    const { name, street, city, state, pincode, country } = formData;

    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !pincode.trim() || !country.trim()) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await completeProfile({
        sessionId,
        name: name.trim(),
        address: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          country: country.trim(),
        },
      });

      if (res.data.success) {
        localStorage.setItem('userId', res.data.data.user.id); 
        localStorage.removeItem('phoneForVerification');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('sessionType');
        router.push('/jobseeker/auth/email-verification'); 
      } else {
        const msg =
          res.data.details && typeof res.data.details === 'object'
            ? Object.values(res.data.details).join(', ')
            : res.data.message || 'Failed to complete profile. Please try again.';
        setError(msg);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-8 rounded-md w-full max-w-md "
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Complete Profile</h2>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Name"
          disabled={isLoading}
          required
        />
      </div>

      {/* Address Section */}
      <label className="block text-gray-700 mb-2">Address</label>
      {['street', 'city', 'state', 'pincode', 'country'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          id={field}
          value={formData[field]}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          disabled={isLoading}
          required
        />
      ))}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition "
        disabled={
          isLoading ||
          !formData.name.trim() ||
          !formData.street.trim() ||
          !formData.city.trim() ||
          !formData.state.trim() ||
          !formData.pincode.trim() ||
          !formData.country.trim()
        }
      >
        {isLoading ? (
          <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></div>
        ) : ( 
          'Submit'
        )}
      </button>
    </form>
  );
}
