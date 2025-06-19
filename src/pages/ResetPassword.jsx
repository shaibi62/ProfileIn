import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    setMessage('');
    const email = localStorage.getItem('otp_email');

    if (!email) {
      setMessage('❌ Email not found. Start from forgot password page.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost/Profilein-Backend/reset_password.php', {
        email,
        password,
      });

      if (res.data.success) {
        setMessage('✅ Password updated successfully!');
        localStorage.removeItem('otp_email');
      } else {
        setMessage('❌ Failed to update password');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Reset Your Password</h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              message.includes('✅')
                ? 'text-green-600'
                : message.includes('❌')
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="password"
          value={password}
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-sky-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          onClick={handleReset}
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
