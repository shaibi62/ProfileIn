// SendOtp.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SendOtp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost/Profilein-Backend/send_otp.php', { email });
      if (res.data.success) {
        setMessage('✅ OTP sent to your email');
        localStorage.setItem('otp_email', email);
        // Redirect to verify OTP
      } else {
        setMessage('❌ ' + res.data.message);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div>
      <h2>Send OTP</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default SendOtp;
