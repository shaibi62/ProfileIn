import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { handleSuccessToast, handleErrorToast } from '../utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpCountdown, setOtpCountdown] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();
  useEffect(() => {
      let interval;
      if (resendCooldown > 0) {
        interval = setInterval(() => {
          setResendCooldown(prev => prev - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [resendCooldown]);
  
    // Count down OTP expiry
    useEffect(() => {
      let countdown;
      if (step === 2 && otpCountdown > 0) {
        countdown = setInterval(() => {
          setOtpCountdown(prev => prev - 1);
        }, 1000);
      }
      return () => clearInterval(countdown);
    }, [step, otpCountdown]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  const validatePassword = (password) => ({
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    strength: calculatePasswordStrength(password),
  });

  const passwordChecks = validatePassword(newPassword);

  const getPasswordStrength = () => {
    const strength = passwordChecks.strength;
    if (strength <= 1) return { color: 'bg-red-500', label: 'Very Weak' };
    if (strength === 2) return { color: 'bg-orange-500', label: 'Weak' };
    if (strength === 3) return { color: 'bg-yellow-500', label: 'Moderate' };
    if (strength === 4) return { color: 'bg-green-500', label: 'Strong' };
    return { color: 'bg-green-600', label: 'Very Strong' };
  };

  const strengthInfo = getPasswordStrength();

  const handleSendOTP = async () => {
    if (!email) {
      handleErrorToast('Please enter your email');
      return;
    }
    
    setResendCooldown(60); // ⏳ Start 30s cooldown
    setOtpCountdown(300);
    setIsSending(true);
    try {
      const response = await axios.post('http://localhost/Profilein-Backend/generate_send_otp.php', {
        email,
        type: 'reset',
      });

      if (response.data.success) {
        handleSuccessToast('OTP sent to your email');
        localStorage.setItem('otp_email', email);
        setStep(2);
      } else {
        handleErrorToast(` ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      handleErrorToast('Failed to send OTP');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      handleErrorToast('Please enter the OTP');
      return;
    }

    try {
      const response = await axios.post('http://localhost/Profilein-Backend/verify_otp.php', {
        email,
        otp,
        type: 'reset',
      });

      if (response.data.success) {
        handleSuccessToast('OTP verified. You can now reset your password.');
        setStep(3);
      } else {
        handleErrorToast(`${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      handleErrorToast('Failed to verify OTP');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      handleErrorToast('Please fill both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      handleErrorToast('Passwords do not match');
      return;
    }

    const failed = Object.values(passwordChecks).slice(0, 5).includes(false);
    if (failed) {
      handleErrorToast('Password does not meet requirements');
      return;
    }

    try {
      const response = await axios.post('http://localhost/Profilein-Backend/reset_password.php', {
        email,
        password: newPassword,
      });

      if (response.data.success) {
        handleSuccessToast('Password changed successfully. Redirecting...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        handleErrorToast(`${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      handleErrorToast('Failed to reset password');
    }
  };

  const PasswordRule = ({ isValid, text }) => (
    <li className={`flex items-center gap-2 ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
      {isValid ? (
        <CheckCircleIcon className="w-4 h-4" />
      ) : (
        <XCircleIcon className="w-4 h-4" />
      )}
      {text}
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Reset Password</h2>

       

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendOTP}
              disabled={isSending}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
                isSending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSending ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Verify OTP</h3>
               <p className="text-sm text-gray-600 mb-2">
              Enter the OTP sent to your email <strong>{email}</strong>.
            </p>
            <p className="text-sm text-red-500 mb-4">
              OTP expires in: {Math.floor(otpCountdown / 60)}:{String(otpCountdown % 60).padStart(2, '0')}
            </p>
            <input
              type="number"
              name='otp'
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify OTP            
            </button>
            <button
                type="button"
                onClick={handleSendOTP}
                disabled={resendCooldown > 0}
                className={`w-full text-blue-700 hover:bg-blue-700 hover:text-white py-2 rounded-lg transition duration-200 flex justify-center items-center gap-2 ${resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
              </button>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {newPassword && (
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Password Strength:</span>
                  <span className="font-medium">{strengthInfo.label}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${strengthInfo.color} h-2 rounded-full`}
                    style={{ width: `${(passwordChecks.strength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <ul className="text-sm mt-2 space-y-1 mb-4">
              <PasswordRule isValid={passwordChecks.length} text="At least 6 characters" />
              <PasswordRule isValid={passwordChecks.upper} text="At least one uppercase letter" />
              <PasswordRule isValid={passwordChecks.lower} text="At least one lowercase letter" />
              <PasswordRule isValid={passwordChecks.digit} text="At least one number" />
              <PasswordRule isValid={passwordChecks.special} text="At least one special character" />
            </ul>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
