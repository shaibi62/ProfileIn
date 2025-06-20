import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PageStyles.css";
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Bars } from 'react-loader-spinner';

const SignUp = () => {
  const [step, setStep] = useState("step1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");
  const [isSignedup, setIsSignedup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpCountdown, setOtpCountdown] = useState(300); // 5 minutes = 300 seconds

  // Count down cooldown
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
    if (step === "step2" && otpCountdown > 0) {
      countdown = setInterval(() => {
        setOtpCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [step, otpCountdown]);

  // Auto clear error message
  useEffect(() => {
    if (signupError) {
      const timer = setTimeout(() => setSignupError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [signupError]);


  function renderSteps() {
    switch (step) {
      case "step1":
        return (
          <><form
            onSubmit={handleSubmit}
            className="space-y-4 text-gray-800 w-[90%] md:w-[60%] flex flex-col mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 py-2 mt-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
              autoComplete="off" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
              autoComplete="off" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
                autoComplete="off" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {formData.password && (
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

            <ul className="text-sm mt-2 space-y-1">
              <PasswordRule isValid={passwordChecks.length} text="At least 6 characters" />
              <PasswordRule isValid={passwordChecks.upper} text="At least one uppercase letter" />
              <PasswordRule isValid={passwordChecks.lower} text="At least one lowercase letter" />
              <PasswordRule isValid={passwordChecks.digit} text="At least one number" />
              <PasswordRule isValid={passwordChecks.special} text="At least one special character" />
            </ul>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
                required
                autoComplete="off" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Bars height="20" width="20" color="#ffffff" visible={true} />
                  Processing...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form><p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-sky-600 hover:underline">
                Sign in
              </Link>
            </p></>
        );
        break;
      case "step2":
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Verify OTP</h3>
            <p className="text-sm text-gray-600 mb-2">
              Enter the OTP sent to your email <strong>{formData.email}</strong>.
            </p>
            <p className="text-sm text-red-500 mb-4">
              OTP expires in: {Math.floor(otpCountdown / 60)}:{String(otpCountdown % 60).padStart(2, '0')}
            </p>

            <form onSubmit={handleVerifyOTP}
              className="space-y-4 text-gray-800 w-[90%] md:w-[60%] flex flex-col mx-auto">
              <input
                type="number"
                value={otp}
                minLength={6}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
              />

              <input type="submit" value="Verify" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 flex justify-center items-center gap-2"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={resendCooldown > 0}
                className={`w-full text-blue-700 hover:bg-blue-700 hover:text-white py-2 rounded-lg transition duration-200 flex justify-center items-center gap-2 ${resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
              </button>

            </form>
          </div>
        );
    }

  }


  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 6,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      strength: calculatePasswordStrength(password),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const updatedErrors = { ...errors };

    if (name === "password") {
      updatedErrors.password = validatePassword(value);
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        updatedErrors.confirmPassword = "Passwords do not match";
      } else {
        delete updatedErrors.confirmPassword;
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        updatedErrors.confirmPassword = "Please confirm your password";
      } else if (value !== formData.password) {
        updatedErrors.confirmPassword = "Passwords do not match";
      } else {
        delete updatedErrors.confirmPassword;
      }
    }

    setErrors(updatedErrors);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordChecks = validatePassword(formData.password);
    if (Object.values(passwordChecks).slice(0, 5).includes(false)) {
      newErrors.password = passwordChecks;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const { sendSignupOTP, verifySignupOTP } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResendCooldown(30); // ⏳ Start 30s cooldown
    setOtpCountdown(300);  // 🔄 Restart 5 min OTP countdown

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSignupError("");

    try {
      const response = await sendSignupOTP(formData.name, formData.email, formData.password);

      if (response.success) {
        setStep("step2");
      } else {
        setSignupError(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const resp = await verifySignupOTP(formData.email, otp);

      if (resp.success) {
        alert("✅ OTP Verified! Signup complete.");
        navigate("/login");
      }

    }
    catch (error) {
      console.error("Signup error:", error);
      setSignupError("Something went wrong. Please try again.");
    }


  }
  const passwordChecks = validatePassword(formData.password);
  const getPasswordStrength = () => {
    const strength = passwordChecks.strength;
    if (strength <= 1) return { color: "bg-red-500", label: "Very Weak" };
    if (strength === 2) return { color: "bg-orange-500", label: "Weak" };
    if (strength === 3) return { color: "bg-yellow-500", label: "Moderate" };
    if (strength === 4) return { color: "bg-green-500", label: "Strong" };
    return { color: "bg-green-600", label: "Very Strong" };
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
        <h2 className="text-3xl my-10 font-bold mb-6 text-center text-blue-600">
          Create Your ProfileIn Account
        </h2>

        {isSignedup && (
          <p className="text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ✅ OTP sent to your email!
          </p>
        )}

        {signupError && (
          <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ❌ {signupError}
          </p>
        )}
        {renderSteps()}

      </div>
    </div>
  );
};

const PasswordRule = ({ isValid, text }) => {
  return (
    <li className={`flex items-center gap-2 ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
      {isValid ? (
        <CheckCircleIcon className="w-4 h-4 text-green-600" />
      ) : (
        <XCircleIcon className="w-4 h-4 text-gray-400" />
      )}
      {text}
    </li>
  );
};



export default SignUp;
