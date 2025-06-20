import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PageStyles.css";
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Bars } from 'react-loader-spinner';

const SignUp = () => {
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

  const navigate = useNavigate();

  // Calculate password strength score (0-4)
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

  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setSignupError("");
    
    try {
      const response = await signup(formData.name, formData.email, formData.password);
      
      if (response.success) {
        setIsSignedup(true);
        setTimeout(() => navigate("/templates"), 1000);
      } else {
        // Handle specific error cases
        if (response.message.includes("email already in use")) {
          setSignupError("This email is already registered. Please use a different email or login.");
        } else if (response.message.includes("weak password")) {
          setSignupError("Password is too weak. Please use a stronger password.");
        } else {
          setSignupError(response.message || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 429) {
          setSignupError("Too many attempts. Please try again later.");
        } else {
          setSignupError(error.response.data.message || "Something went wrong. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response received
        setSignupError("Network error. Please check your connection.");
      } else {
        // Other errors
        setSignupError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = validatePassword(formData.password);

  // Get password strength color and label
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
            ✅ Signup successful!
          </p>
        )}

        {signupError && (
          <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ❌ {signupError}
          </p>
        )}

        <form
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
            autoComplete="off"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
            autoComplete="off"
          />
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
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Meter */}
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
              autoComplete="off"
            />
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
                <Bars
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 hover:underline">
            Sign in
          </Link>
        </p>
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