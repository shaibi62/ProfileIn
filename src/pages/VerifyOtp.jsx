// VerifyOtp.jsx
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const verifyOtp = async () => {
    try {
      const email = localStorage.getItem('otp_email');
      const res = await axios.post('http://localhost/Profilein-Backend/verify_otp.php', { email, otp });

      if (res.data.success) {
        setMessage('✅ OTP Verified');
        // redirect to set new password page or complete signup
      } else {
        setMessage('❌ Invalid OTP');
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyOtp;
