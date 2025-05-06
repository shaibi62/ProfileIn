import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageStyles.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    setCredentials((prev) => ({ ...prev, [name]: value }));

    const updatedErrors = { ...formErrors };

    if (name === 'password') {
      const checks = validatePassword(value);
      if (!value) {
        updatedErrors.password = 'Password is required';
      } else if (Object.values(checks).includes(false)) {
        updatedErrors.password = 'Password does not meet all criteria';
      } else {
        delete updatedErrors.password;
      }
    }

    setFormErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost/Profilein/login.php', credentials)
      .then((response) => {
        if (response.data.success) {
          setIsLoggedIn(true);
          setLoginError('');
          setTimeout(() => {
            navigate('/templates');
          }, 1500);
        } else {
          setLoginError(response.data.message || 'Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginError('Something went wrong. Please try again.');
      });
  };

  const passwordChecks = validatePassword(credentials.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
        {isLoggedIn && (
          <p className="text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ✅ Login successful!
          </p>
        )}

        {loginError && (
          <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ❌ {loginError}
          </p>
        )}

        <h2 className="text-3xl my-10 font-bold mb-6 text-center text-blue-600">
          Welcome Back to ProfileIn
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-gray-800 w-[90%] md:w-[60%] flex flex-col mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-2 py-2 mt-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* ✅ Password Guidelines Checklist */}
          <ul className="text-sm mt-2 space-y-1">
            <PasswordRule
              isValid={passwordChecks.length}
              text="At least 6 characters"
            />
            <PasswordRule
              isValid={passwordChecks.upper}
              text="At least one uppercase letter"
            />
            <PasswordRule
              isValid={passwordChecks.lower}
              text="At least one lowercase letter"
            />
            <PasswordRule
              isValid={passwordChecks.digit}
              text="At least one number"
            />
            <PasswordRule
              isValid={passwordChecks.special}
              text="At least one special character"
            />
            
          </ul>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-sky-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

// ✅ Helper component to display each password rule
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

export default Login;
