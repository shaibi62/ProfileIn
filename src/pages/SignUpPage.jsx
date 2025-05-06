import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PageStyles.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";


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

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      length: password.length >= 6,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
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
    if (Object.values(passwordChecks).includes(false)) {
      newErrors.password = passwordChecks;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://localhost/Profilein/signup.php", formData)
      .then((response) => {
        if (response.data.success) {
          setIsSignedup(true);
          setSignupError("");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setSignupError(response.data.message || "Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setSignupError("Something went wrong. Please try again.");
      });
  };

  const passwordChecks = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
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

        <h2 className="text-3xl my-10 font-bold mb-6 text-center text-blue-600">
          Create Your ProfileIn Account
        </h2>

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
              className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Sign Up
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
