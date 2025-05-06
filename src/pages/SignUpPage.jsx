import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import "./PageStyles.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

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

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Must contain at least one digit";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) return "Must include a special character";
    if (/^([a-zA-Z0-9!@#$%^&*])\1*$/.test(password)) return "Password characters must not all be the same";
    return "";
  };

  const getPasswordRules = (password) => ({
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
    notAllSame: !/^([a-zA-Z0-9!@#$%^&*])\1*$/.test(password),
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

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
        setSignupError("Server error. Try again.");
      });
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-4/5 md:w-1/3 flex flex-col justify-center items-center">
        {isSignedup && (
          <p className="text-green-600 bg-green-100 border border-green-400 p-2 rounded-md font-semibold text-center">
            ✅ Signup successful
          </p>
        )}
        {signupError && (
          <p className="text-red-600 bg-red-100 border border-red-400 mt-2 p-2 rounded-md text-center font-semibold">
            ❌ {signupError}
            ❌ {signupError}
          </p>
        )}
        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Create Your ProfileIn Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-sky-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-sky-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-sky-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-600"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Password Rules */}
          <div className="text-sm text-left w-full p-2 bg-gray-50 border rounded">
            {Object.entries(getPasswordRules(formData.password)).map(([rule, passed]) => (
              <p key={rule} className={`flex items-center gap-1 ${passed ? "text-green-600" : "text-gray-500"}`}>
                {passed ? "✅" : "❌"}{" "}
                {{
                  length: "At least 6 characters",
                  uppercase: "One uppercase letter (A-Z)",
                  lowercase: "One lowercase letter (a-z)",
                  number: "One number (0-9)",
                  specialChar: "One special character (!@#$...)",
                  notAllSame: "Not all characters same",
                }[rule]}
              </p>
            ))}
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border border-sky-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-600"
            >
              {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
